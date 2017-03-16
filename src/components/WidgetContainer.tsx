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
  KEYSETS
}

export interface IFiltersWidgetMenu {
  list: Array<IFilter>;
}
export interface IWidgetMenu {
  className: string;
  selected: MenuItems;
  filters: IFiltersWidgetMenu;
}

interface IWidgetContainerProps extends IWidgetProps{
  className: string;
}

@observer
export default class WidgetContainer extends React.Component<IWidgetContainerProps, {}> {
  @observable menuStore: IWidgetMenu = {
    className: '',
    selected: MenuItems.NONE,
    filters: {
      list: observable.shallow([])
    }
  };
  constructor(props: IWidgetContainerProps) {
    super(props);
    this.menuStore.className = props.className;
  }
  render() {
    const  { className, template, sourceName } = this.props;

    return <div className={`box ${className}`}>
      <WidgetSpinner />
      <Provider menuStore={this.menuStore}>
        <WidgetHeader
          title={sourceName} />
      </Provider>
      <WidgetBody
        template={template}
        sourceName={sourceName} />
    </div>;
  }
}
