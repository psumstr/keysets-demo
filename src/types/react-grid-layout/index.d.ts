declare module "react-grid-layout" {
  import * as React from 'react';

  interface IGridItemProps {
    // Children must be only a single element
    children: React.ReactElement<any>;

    // General grid attributes
    cols: number;
    containerWidth: number;
    rowHeight: number;
    margin: Array<any>;
    containerPadding: Array<any>;

    // These are all in grid units
    x: number;
    y: number;
    w: number;
    h: number;

    // All optional
    minW?: (props: IGridItemProps, propName: keyof IGridItemProps) => void;
    maxW?: (props: IGridItemProps, propName: keyof IGridItemProps) => void;
    minH?: (props: IGridItemProps, propName: keyof IGridItemProps) => void;
    maxH?: (Gprops: IGridItemProps, propName: keyof IGridItemProps) => void;

    // ID is nice to have for callbacks
    i: string

    // Functions
    onDragStop?: Function;
    onDragStart?: Function;
    onDrag?: Function;
    onResizeStop?: Function;
    onResizeStart?: Function;
    onResize?: Function;

    // Flags
    isDraggable: boolean;
    isResizable: boolean;

    // Use CSS transforms instead of top/left
    useCSSTransforms: boolean;

    // Others
    className?: string;
    // Selector for draggable handle
    handle?: string;
    // Selector for draggable cancel (see react-draggable)
    cancel?: string
  }

  interface IGridItemState {
    resizing?: {width: number, height: number};
    dragging?: {top: number, left: number};
    className: string;
  }

  interface IPosition {
    left: number;
    top: number;
    width: number;
    height: number;
  }

  interface IDragCallbackData {
    node: HTMLElement;
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
    lastX: number;
    lastY: number;
  }

  class GridItem<P, IGridItemState> extends React.Component<IGridItemProps, IGridItemState> {
    calcColWidth(): number;
    calcPosition(x: number, y: number, w: number, h: number, state?: IGridItemState): IPosition;
    calcXY(top: number, left: number):{x: number,y: number};
    calcWH({height, width}: {height: number, width: number}): {w: number,h: number};
    createStyle(pos: IPosition): {[key: string]: string};
    mixinDraggable(child: React.ReactElement<P>): React.ReactElement<P>;
    mixinResizable(child: React.ReactElement<P>, position: IPosition): React.ReactElement<P>;
    onDragHandler(handlerName: string): (e:Event, {node, deltaX, deltaY}: IDragCallbackData) => void;
    onResizeHandler(handlerName: string): (e:Event, {node, size}: {node: HTMLElement, size: IPosition}) => void;
  }

  interface IReactGridLayoutProps {
    //
    // Basic props
    //
    className: string;
    style: object;

    // This can be set explicitly. If it is not set, it will automatically
    // be set to the container width. Note that resizes will *not* cause this to adjust.
    // If you need that behavior, use WidthProvider.
    width: number;

    // If true, the container height swells and contracts to fit contents
    autoSize: boolean;
    // # of cols.
    cols: number;

    // A selector that will not be draggable.
    draggableCancel: string;
    // A selector for the draggable handler
    draggableHandle: string;

    // If true, the layout will compact vertically
    verticalCompact: boolean;

    // layout is an array of object with the format:
    // {x: Number, y: Number, w: Number, h: Number, i: String}
    layout: (props: IReactGridLayoutProps)=> void;

    //
    // Grid Dimensions
    //

    // Margin between items [x, y] in px
    margin: Array<number>;
    // Padding inside the container [x, y] in px
    containerPadding: Array<number>;
    // Rows have a static height, but you can change this based on breakpoints if you like
    rowHeight: number;
    // Default Infinity, but you can specify a max here if you like.
    // Note that this isn't fully fleshed out and won't error if you specify a layout that
    // extends beyond the row capacity. It will, however, not allow users to drag/resize
    // an item past the barrier. They can push items beyond the barrier, though.
    // Intentionally not documented for this reason.
    maxRows: number;

    //
    // Flags
    //
    isDraggable: boolean;
    isResizable: boolean;
    // Use CSS transforms instead of top/left
    useCSSTransforms: boolean;

    //
    // Callbacks
    //

    // Callback so you can save the layout.
    // Calls back with (currentLayout, allLayouts). allLayouts are keyed by breakpoint.
    onLayoutChange: Function;

    // Calls when drag starts. Callback is of the signature (layout, oldItem, newItem, placeholder, e).
    // All callbacks below have the same signature. 'start' and 'stop' callbacks omit the 'placeholder'.
    onDragStart: Function;
    // Calls on each drag movement.
    onDrag: Function;
    // Calls when drag is complete.
    onDragStop: Function;
    //Calls when resize starts.
    onResizeStart: Function;
    // Calls when resize movement happens.
    onResize: Function;
    // Calls when resize is complete.
    onResizeStop: Function;

    //
    // Other validations
    //

    // Children must not have duplicate keys.
    children: (props: IReactGridLayoutProps, propName: keyof IReactGridLayoutProps, componentName: string) => void;
  }

  interface ILayoutItem {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW?: number;
    minH?: number;
    maxW?: number;
    maxH?: number;
    moved?: boolean;
    static?: boolean;
    isDraggable?: boolean;
    isResizable?: boolean;
  }

  type Layout = Array<ILayoutItem>;

  interface IReactGridLayouState {
    activeDrag?: ILayoutItem;
    layout: Layout;
    mounted: boolean;
    oldDragItem: ILayoutItem;
    oldLayout: Layout;
    oldResizeItem: ILayoutItem;
  }

  type DragEvent = {e: Event} & IDragCallbackData;
  type Size = {width: number, height: number};
  type ResizeEvent = {e: Event, node: HTMLElement, size: Size};

  class ReactGridLayout extends React.Component<IReactGridLayoutProps, IReactGridLayouState> {
    containerHeight(): void;
    onDragStart(i: number, x: number, y: number, {e, node}: DragEvent): void;
    onDrag(i: number, x: number, y: number, {e, node}: DragEvent): void;
    onDragStop(i: number, x: number, y: number, {e, node}: DragEvent): void;
    onLayoutMaybeChanged(newLayout: Layout, oldLayout?: Layout): void;
    onResizeStart(i: number, w: number, h: number, {e, node}: ResizeEvent): void;
    onResize(i: number, w: number, h: number, {e, node}: ResizeEvent): void;
    onResizeStop(i: number, w: number, h: number, {e, node}: ResizeEvent): void;
    placeholder(): React.ReactElement<IReactGridLayoutProps>;
    processGridItem(child: React.ReactElement<IReactGridLayoutProps>): React.ReactElement<IReactGridLayoutProps>;
  }

  interface IResponsiveReactGridLayoutProps {
    //
    // Basic props
    //

    // Optional, but if you are managing width yourself you may want to set the breakpoint
    // yourself as well.
    breakpoint: string;

    // {name: pxVal}, e.g. {lg: 1200, md: 996, sm: 768, xs: 480}
    breakpoints: Object;

    // # of cols. This is a breakpoint -> cols map
    cols: Object;

    // layouts is an object mapping breakpoints to layouts.
    // e.g. {lg: Layout, md: Layout, ...}
    layouts: (props: IResponsiveReactGridLayoutProps, propName: keyof IResponsiveReactGridLayoutProps, componentName: string) => void;

    width: number;

    //
    // Callbacks
    //

    // Calls back with breakpoint and new # cols
    onBreakpointChange: Function,

    // Callback so you can save the layout.
    // Calls back with (currentLayout, allLayouts). allLayouts are keyed by breakpoint.
    onLayoutChange: Function

    // Calls back with (containerWidth, margin, cols, containerPadding)
    onWidthChange: Function
  }

  interface IResponsiveReactGridLayoutState {
    layout: Layout;
    breakpoint: string;
    cols: number;
  }

  class Responsive extends React.Component<IResponsiveReactGridLayoutProps, IResponsiveReactGridLayoutState> {
    onLayoutChange(layout: Layout): void;
    onWidthChange(nextProps: IResponsiveReactGridLayoutProps): void;
  }

  interface IWidthProviderProps {
    // If true, will not render children until mounted. Useful for getting the exact width before
    // rendering, to prevent any unsightly resizing.
    measureBeforeMount: boolean;
  }

  interface IWidthProviderState {
    width: number;
  }

  type Provider = (ComposedComponent: React.ReactType) => React.ReactType;

  const WidthProvider: Provider;

  // class WidthProvider<Provider, IWidthProviderState> extends React.Component<Provider, IWidthProviderState> {
  //   onWindowResize(event?: Event): void;
  // }

}
