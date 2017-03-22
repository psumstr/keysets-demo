import * as React from 'react';
import { Menu, Checkbox, Spinner, Intent, Button, Dialog } from "@blueprintjs/core";
import { observer, inject } from "mobx-react";
import {IWidgetStore, MenuItems} from "./WidgetContainer";
import { IZoomdata } from "../stores/Zoomdata";
import { application, credentials } from "../zoomdata";
import { fromPromise } from "mobx-utils";
import { ISecurityKey } from "ZoomdataSDK";
import { IObservableArray, observable, action } from "mobx";
import { IFilter } from "ZoomdataSDK";

@inject(stores => ({
  zoomdata: stores.zoomdata as IZoomdata,
  widgetStore: stores.widgetStore as IWidgetStore
}))
@observer
export default class AttributeValuesMenu extends React.Component<{zoomdata?: IZoomdata, widgetStore?: IWidgetStore}, {}> {
  fetchAttributeValues: any;
  selectedValues: IObservableArray<string | number| null> = observable([]);
  currentFilter: IFilter;
  @observable applyFilterButtonDisabled = true;
  constructor(props: IZoomdata) {
    super(props);
    const { zoomdata,  widgetStore } = this.props;
    if (zoomdata && widgetStore) {
      const source = widgetStore.source;
      const currentFilters = widgetStore.menu.filters.list;
      const selectedField = widgetStore.menu.filters.selectedField;
      const fieldFilter = currentFilters.find((filter: any) => filter.path === selectedField.name);
      if (fieldFilter) {
        this.currentFilter = fieldFilter;
      }
      const attribute = widgetStore.menu.filters.selectedField.name;
      const home = zoomdata.client.getHomePath(application);
      const endpoint = `/service/sources/${source.id}/attributes/${attribute}/values?key=${(credentials as ISecurityKey).key}`;
      this.fetchAttributeValues = fromPromise(fetch(home + endpoint)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then(data => Promise.reject(data));
          }
        })
      );
    }
  }

  @action('show the add filter menu')
  onBackButtonClick = () => {
    const { widgetStore } = this.props;
    if (widgetStore) {
      widgetStore.menu.active = MenuItems.ADD_FILTER;
    }
  };

  @action('add/remove to list of selected values')
  onCheckboxChange = (event: React.FormEvent<HTMLInputElement>) => {
    const checkboxElement = event.currentTarget;
    const attributeValue = (checkboxElement.parentElement && checkboxElement.parentElement.textContent) ?
      checkboxElement.parentElement.textContent :
      '';
    if (checkboxElement.checked) {
      this.selectedValues.push(attributeValue);
    } else {
      this.selectedValues.splice(this.selectedValues.findIndex(element => element === attributeValue), 1);
    }

    this.applyFilterButtonDisabled = this.selectedValues.length === 0 || // Enable if something is 'checked', but
      (this.currentFilter ? // if a filter for the same attribute is already applied,
        (this.selectedValues.length === this.currentFilter.value.length && // make sure the checked values length are not the same as the filter values length, or
        this.currentFilter.value.sort().every((v,i) => v === this.selectedValues.sort()[i])) : // make sure the checked values are not the same filter values
        false)
  };

  getDefaultChecked = (value: string) => {
    if (this.currentFilter) {
      return this.currentFilter.value.indexOf(value) >= 0;
    } else {
      return false;
    }
  };

  checkboxRefHandler = (checkbox: HTMLInputElement, value: string) => {
    if (checkbox) {
      checkbox.checked ? this.selectedValues.push(value) : null;
    }
  };

  createCheckbox = (value:string) => {
    return (
      <Checkbox
        key={value}
        label={value}
        inputRef={(checkbox) => this.checkboxRefHandler(checkbox, value)}
        defaultChecked={this.getDefaultChecked(value)}
        onChange={this.onCheckboxChange}/>
    )
  };

  createHeader = () => {
    const { widgetStore } = this.props;
    if (widgetStore) {
      const attribute = widgetStore && widgetStore.menu.filters.selectedField.name;
      return (
        <h6>
          <Button
            className="pt-minimal"
            intent={Intent.PRIMARY}
            onClick={this.onBackButtonClick}
            iconName="chevron-left" >
          </Button>
          {attribute}
        </h6>
      )
    } else {
      return <div></div>
    }
  };

  @action applyFilter = () => {
    const { widgetStore } = this.props;
    if (widgetStore) {
      const selectedField = widgetStore.menu.filters.selectedField;
      const attributeName = selectedField.name;
      const { query } = widgetStore.visualization;
      const newFilter = {
        path: attributeName,
        operation: 'IN',
        value: this.selectedValues.peek()
      };
      const currentFilters = query.getFilters();
      const indexOfFilter = currentFilters.findIndex((filter:any) => filter.path === newFilter.path);
      if (indexOfFilter >= 0) {
        query.changeFilter(currentFilters[indexOfFilter], newFilter);
      } else {
        query.addFilters(newFilter);
      }
      setTimeout(action('store active filters and show active filters menu',
        () => {
        widgetStore.menu.filters.list = query.getFilters();
        widgetStore.menu.active = MenuItems.FILTERS;
      }), 100);
    }
  };

  createApplyFilterButton = () => {
    return (
      <Button
        intent={Intent.SUCCESS}
        className="pt-fill"
        onClick={this.applyFilter}
        disabled={this.applyFilterButtonDisabled}
        text="Apply Filter" />
    );
  };

  render() {
    switch(this.fetchAttributeValues.state) {
      case "pending": return (
        <Menu>
          {this.createHeader()}
          <Spinner className="pt-small menu-spinner" />
          <span>Loading...</span>
        </Menu>
      );
      case "rejected": return (
        <Dialog
          iconName="error"
          isOpen={true}
          title="Error Fetching Values"
        >
          <div className="pt-dialog-body">
            {this.fetchAttributeValues.value.details ?
              this.fetchAttributeValues.value.details :
              this.fetchAttributeValues.value.error
            }
          </div>
        </Dialog>
      );
      case "fulfilled": return (
        <Menu className="menu-container">
          {this.createHeader()}
          {this.fetchAttributeValues.value.peek().map(this.createCheckbox)}
          {this.createApplyFilterButton()}
        </Menu>
      );
      default: return <div>Ooops... something went wrong</div>
    }
  }
}
