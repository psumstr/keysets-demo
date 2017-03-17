import * as React from 'react';
import WidgetHeader from './WidgetHeader';
import WidgetBody from './WidgetBody';
import { IWidgetProps } from "./Widget";
import WidgetSpinner from "./WidgetSpinner";
import { IFilter } from "ZoomdataSDK";
import { observable } from "mobx";
import {observer, Provider} from "mobx-react";

export enum MenuItems {
  NONE,
  FILTERS,
  ADDFILTER,
  KEYSETS
}

export interface IFiltersMenu {
  list: Array<IFilter>;
}
export interface IWidgetStore {
  source: any
  className: string;
  selected: MenuItems;
  filters: IFiltersMenu;
}

interface IWidgetContainerProps extends IWidgetProps{
  className: string;
}

@observer
export default class WidgetContainer extends React.Component<IWidgetContainerProps, {}> {
  @observable widgetStore: IWidgetStore = {
    source: observable.shallow({}),
    className: '',
    selected: MenuItems.NONE,
    filters: {
      list: observable.shallow([])
    }
  };
  constructor(props: IWidgetContainerProps) {
    super(props);
    this.widgetStore.className = props.className;
  }
  render() {
    const  { className, template, sourceName } = this.props;

    return (
      <Provider widgetStore={this.widgetStore}>
        <div className={`box ${className}`}>
          <WidgetSpinner />
            <WidgetHeader
              title={sourceName} />
          <WidgetBody
            template={template}
            sourceName={sourceName} />
        </div>
      </Provider>
    );
  }
}
