import * as React from 'react';
import { WidthProvider, Responsive, ILayoutItem } from 'react-grid-layout';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface ILayoutItemConfig extends ILayoutItem {
  id: string
}

export default class WidgetGrid extends React.Component<any, {}> {
  static defaultProps: any = {
    className: 'layout',
    breakpoints: {lg: 1200},
    cols: {lg: 12},
    rowHeight: 100,
    margin: [5, 5]
  };

  createElement = (el: ILayoutItemConfig): JSX.Element => {
    const { i, id } = el;
    return (
      <div key={i}
           id={id}
           data-grid={el}>
      </div>
    );
  };

  onLayoutChange = (layout: ILayoutItem) => {

  };

  onBreakpointChange = (breakpoint: string, cols: object) => {

  };

  render() {
    const layouts: Array<ILayoutItemConfig> = [
      {i: '1', x: 0, y: 0, w: 6, h: 6, id: 'chart1'},
      {i: '2', x: 6, y: 0, w: 6, h: 6, id: 'chart2'}
    ];

    return (
      <ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange}
                                 onBreakpointChange={this.onBreakpointChange}
        {...this.props}
      >
        {layouts.map(this.createElement)}
      </ResponsiveReactGridLayout>
    )
  }
}
