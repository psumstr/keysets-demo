{/*import * as React from 'react';*/}
{/*import { WidthProvider, Responsive, ILayoutItem } from 'react-grid-layout';*/}
{/*import Widget from './Widget';*/}
{/*import * as ZoomdataSDK from 'ZoomdataSDK';*/}
{/*import { credentials, application } from '../zoomdata';*/}

{/*const ResponsiveReactGridLayout = WidthProvider(Responsive);*/}

{/*interface ILayoutItemConfig extends ILayoutItem {*/}
  {/*id: string,*/}
  {/*template: string,*/}
  {/*sourceName: string*/}
{/*}*/}

{/*interface IWidgetGridState {*/}
  {/*zd: any;*/}
{/*}*/}

{/*export default class WidgetGrid extends React.Component<any, IWidgetGridState> {*/}
  {/*static defaultProps: any = {*/}
    {/*className: 'layout',*/}
    {/*breakpoints: {lg: 1200},*/}
    {/*cols: {lg: 12},*/}
    {/*rowHeight: 100,*/}
    {/*margin: [5, 5]*/}
  {/*};*/}

  {/*constructor() {*/}
    {/*super();*/}
    {/*this.state = {*/}
      {/*zd: {}*/}
    {/*};*/}
    {/*async function getZoomdata(instance: WidgetGrid) {*/}
      {/*try {*/}
        {/*const sourceNames = ['Patients', 'Visit Drugs'];*/}
        {/*const client = await ZoomdataSDK.createClient({credentials, application});*/}
        {/*await client.sources.update({name: sourceNames[0]});*/}
        {/*await client.sources.update({name: sourceNames[1]});*/}
        {/*const sources = await client.sources.fetch();*/}
        {/*instance.setState({*/}
          {/*zd: {*/}
            {/*client: client,*/}
            {/*sources: sources*/}
          {/*}*/}
        {/*});*/}
      {/*} catch(err) {*/}
        {/*console.log(err.message);*/}
      {/*}*/}
    {/*}*/}
    {/*getZoomdata(this);*/}
  {/*}*/}

  {/*onWidgetReady = (visualization: any) => {*/}

  {/*};*/}

  {/*createElement = (el: ILayoutItemConfig): JSX.Element => {*/}
    {/*const { i, id, template, sourceName } = el;*/}
    {/*if (this.state.zd.client) {*/}
      {/*return (*/}
        {/*<div key={i}*/}
             {/*data-grid={el}>*/}
          {/*<Widget id={id}*/}
                  {/*zd={this.state.zd}*/}
                  {/*template={template}*/}
                  {/*sourceName={sourceName}*/}
          {/*/>*/}
        {/*</div>*/}
      {/*);*/}
    {/*} else {*/}
      {/*return <div key={i}*/}
                  {/*data-grid={el}*/}
      {/*>*/}
      {/*</div>*/}
    {/*}*/}
  {/*};*/}

  {/*onLayoutChange = (layout: ILayoutItem) => {*/}

  {/*};*/}

  {/*onBreakpointChange = (breakpoint: string, cols: object) => {*/}

  {/*};*/}

  {/*onResize = (params: any) => {*/}
    {/*console.log(params);*/}
  {/*};*/}

  {/*onWidthChange = (params: any) => {*/}
    {/*console.log(params);*/}
  {/*};*/}

  {/*render() {*/}
    {/*const layouts: Array<ILayoutItemConfig> = [*/}
      {/*{i: '1', x: 0, y: 0, w: 6, h: 6, id: 'chart1', template: 'Pie', sourceName: 'Patients'},*/}
      {/*{i: '2', x: 6, y: 0, w: 6, h: 6, id: 'chart2', template: 'Packed Bubbles', sourceName: 'Visit Drugs'}*/}
    {/*];*/}
    {/*return (*/}
      {/*<ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange}*/}
                                 {/*onBreakpointChange={this.onBreakpointChange}*/}
                                 {/*onResize={this.onResize}*/}
                                 {/*onWidthChange={this.onWidthChange}*/}
        {/*{...this.props}*/}
      {/*>*/}
        {/*{layouts.map(this.createElement, this)}*/}
      {/*</ResponsiveReactGridLayout>*/}
    {/*)*/}
  {/*}*/}
{/*}*/}
