import React from 'react';

import {
  ChartContainer, RowChart, BubbleChart,
  DataTable, PieChart, DataCount, BarChart, LineChart
} from '../../../../common/DC/components/index';

import * as crossfilter from 'crossfilter2';
import d3 from 'd3';
import dc from 'dc';

import {
  Row,
  Col,
  Card,
  Button
} from 'antd';

class CrossfilterContext {
  constructor(data) {
    this.data = data;

    this.json = [{"line": "completed", "date": "2016-05-15T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-15T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-05-15T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-05-15T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-15T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-15T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-05-15T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-15T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-15T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-05-15T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-16T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-16T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-16T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-16T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-16T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-16T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-16T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-16T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-16T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-16T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-05-17T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-17T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-17T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-17T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-17T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-17T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-05-17T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-17T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-17T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-17T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-05-18T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-18T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-18T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-18T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-05-18T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-18T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-18T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-18T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-18T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-18T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-19T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-05-19T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-19T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-19T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-05-19T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-05-19T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-05-19T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-19T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-19T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-19T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-20T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-20T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-05-20T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-05-20T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-05-20T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-05-20T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-20T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-20T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-05-20T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-20T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-21T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-21T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-21T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-21T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-05-21T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-21T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-21T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-21T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-21T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-21T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-05-22T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-22T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-22T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-05-22T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-22T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-22T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-22T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-22T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-05-22T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-22T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-23T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-05-23T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-23T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-23T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-23T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-23T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-23T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-23T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-23T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-23T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-24T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-05-24T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-05-24T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-24T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-24T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-05-24T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-24T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-05-24T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-05-24T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-24T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-25T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-25T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-05-25T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-25T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-25T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-25T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-05-25T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-25T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-25T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-25T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-05-26T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-26T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-05-26T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-26T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-26T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-05-26T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-05-26T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-26T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-26T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-26T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-27T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-27T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-05-27T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-27T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-05-27T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-27T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-27T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-05-27T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-27T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-27T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-05-28T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-28T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-05-28T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-28T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-28T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-28T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-28T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-28T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-05-28T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-28T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-05-29T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-29T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-29T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-29T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-05-29T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-29T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-05-29T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-29T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-05-29T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-29T22:00:00.000Z"
    }, {"line": "new", "date": "2016-05-30T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-30T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-30T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-30T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-05-30T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-05-30T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-30T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-30T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-05-30T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-05-30T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-31T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-31T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-31T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-31T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-31T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-31T22:00:00.000Z"
    }, {"line": "active", "date": "2016-05-31T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-05-31T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-05-31T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-05-31T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-01T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-01T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-01T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-01T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-01T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-01T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-01T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-01T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-01T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-01T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-02T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-02T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-02T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-02T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-02T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-02T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-02T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-02T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-02T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-02T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-03T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-03T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-03T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-03T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-03T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-03T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-03T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-03T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-03T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-03T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-04T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-04T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-04T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-04T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-04T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-04T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-04T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-04T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-04T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-04T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-05T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-05T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-05T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-05T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-05T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-05T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-05T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-05T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-05T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-05T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-06T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-06T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-06T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-06T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-06T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-06T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-06T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-06T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-06T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-06T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-07T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-07T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-07T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-07T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-07T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-07T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-07T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-07T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-07T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-07T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-08T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-08T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-08T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-08T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-08T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-08T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-08T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-08T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-08T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-08T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-09T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-09T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-09T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-09T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-09T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-09T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-09T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-09T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-09T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-09T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-10T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-10T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-10T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-10T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-10T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-10T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-10T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-10T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-10T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-10T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-11T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-11T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-11T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-11T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-11T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-11T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-11T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-11T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-11T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-11T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-12T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-12T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-12T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-12T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-12T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-12T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-12T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-12T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-12T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-12T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-13T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-13T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-13T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-13T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-13T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-13T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-13T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-13T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-13T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-13T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-14T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-14T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-14T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-14T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-14T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-14T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-14T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-14T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-14T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-14T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-15T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-15T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-15T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-15T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-15T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-15T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-15T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-15T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-15T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-15T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-16T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-16T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-16T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-16T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-16T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-16T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-16T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-16T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-16T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-16T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-17T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-17T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-17T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-17T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-17T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-17T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-17T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-17T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-17T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-17T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-18T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-18T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-18T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-18T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-18T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-18T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-18T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-18T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-18T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-18T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-19T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-19T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-19T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-19T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-19T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-19T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-19T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-19T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-19T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-19T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-20T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-20T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-20T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-20T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-20T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-20T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-20T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-20T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-20T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-20T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-21T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-21T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-21T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-21T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-21T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-21T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-21T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-21T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-21T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-21T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-22T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-22T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-22T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-22T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-22T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-22T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-22T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-22T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-22T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-22T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-23T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-23T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-23T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-23T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-23T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-23T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-23T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-23T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-23T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-23T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-24T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-24T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-24T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-24T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-24T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-24T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-24T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-24T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-24T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-24T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-25T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-25T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-25T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-25T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-25T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-25T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-25T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-25T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-25T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-25T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-26T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-26T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-26T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-26T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-26T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-26T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-26T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-26T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-26T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-26T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-27T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-27T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-27T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-27T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-27T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-27T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-27T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-27T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-27T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-27T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-28T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-06-28T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-28T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-28T22:00:00.000Z"
    }, {"line": "active", "date": "2016-06-28T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-28T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-28T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-28T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-28T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-28T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-29T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-29T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-29T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-29T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-29T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-29T22:00:00.000Z"
    }, {"line": "new", "date": "2016-06-29T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-06-29T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-29T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-29T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-30T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-30T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-30T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-06-30T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-06-30T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-06-30T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-06-30T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-30T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-06-30T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-06-30T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-01T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-01T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-01T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-01T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-01T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-01T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-01T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-01T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-01T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-01T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-02T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-02T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-02T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-02T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-02T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-02T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-02T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-02T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-02T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-02T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-03T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-03T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-03T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-03T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-03T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-03T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-03T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-03T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-03T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-03T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-04T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-04T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-04T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-04T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-04T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-04T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-04T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-04T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-04T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-04T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-05T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-05T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-05T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-05T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-05T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-05T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-05T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-05T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-05T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-05T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-06T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-06T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-06T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-06T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-06T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-06T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-06T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-06T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-06T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-06T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-07T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-07T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-07T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-07T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-07T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-07T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-07T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-07T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-07T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-07T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-08T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-08T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-08T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-08T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-08T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-08T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-08T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-08T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-08T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-08T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-09T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-09T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-09T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-09T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-09T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-09T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-09T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-09T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-09T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-09T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-10T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-10T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-10T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-10T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-10T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-10T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-10T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-10T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-10T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-10T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-11T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-11T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-11T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-11T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-11T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-11T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-11T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-11T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-11T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-11T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-12T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-12T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-12T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-12T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-12T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-12T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-12T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-12T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-12T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-12T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-13T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-13T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-13T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-13T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-13T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-13T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-13T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-13T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-13T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-13T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-14T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-14T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-14T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-14T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-14T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-14T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-14T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-14T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-14T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-14T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-15T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-15T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-15T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-15T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-15T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-15T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-15T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-15T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-15T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-15T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-16T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-16T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-16T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-16T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-16T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-16T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-16T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-16T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-16T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-16T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-17T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-17T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-17T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-17T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-17T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-17T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-17T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-17T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-17T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-17T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-18T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-18T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-18T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-18T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-18T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-18T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-18T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-18T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-18T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-18T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-19T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-19T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-19T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-19T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-19T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-19T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-19T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-19T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-19T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-19T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-20T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-20T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-20T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-20T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-20T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-20T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-20T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-20T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-20T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-20T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-21T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-21T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-21T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-21T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-21T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-21T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-21T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-21T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-21T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-21T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-22T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-22T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-22T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-22T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-22T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-22T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-22T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-22T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-22T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-22T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-23T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-23T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-23T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-23T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-23T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-23T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-23T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-23T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-23T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-23T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-24T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-24T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-24T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-24T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-24T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-24T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-24T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-24T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-24T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-24T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-25T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-25T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-25T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-25T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-25T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-25T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-25T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-25T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-25T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-25T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-26T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-26T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-26T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-26T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-26T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-26T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-26T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-26T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-26T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-26T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-27T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-27T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-27T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-27T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-27T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-27T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-27T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-27T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-27T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-27T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-28T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-28T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-28T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-28T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-28T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-28T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-28T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-28T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-28T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-28T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-29T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-29T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-29T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-29T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-29T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-29T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-29T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-07-29T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-29T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-29T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-30T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-07-30T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-30T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-30T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-30T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-30T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-30T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-30T22:00:00.000Z"
    }, {"line": "active", "date": "2016-07-30T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-30T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-07-31T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-07-31T22:00:00.000Z"
    }, {"line": "new", "date": "2016-07-31T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-07-31T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-31T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-31T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-07-31T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-31T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-07-31T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-07-31T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-01T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-01T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-01T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-01T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-01T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-01T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-01T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-01T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-01T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-01T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-02T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-02T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-02T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-02T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-02T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-02T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-02T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-02T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-02T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-02T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-03T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-03T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-03T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-03T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-03T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-03T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-03T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-03T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-03T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-03T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-04T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-04T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-04T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-04T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-04T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-04T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-04T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-04T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-04T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-04T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-05T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-05T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-05T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-05T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-05T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-05T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-05T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-05T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-05T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-05T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-06T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-06T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-06T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-06T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-06T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-06T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-06T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-06T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-06T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-06T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-07T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-07T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-07T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-07T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-07T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-07T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-07T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-07T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-07T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-07T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-08T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-08T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-08T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-08T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-08T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-08T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-08T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-08T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-08T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-08T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-09T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-09T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-09T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-09T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-09T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-09T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-09T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-09T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-09T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-09T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-10T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-10T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-10T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-10T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-10T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-10T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-10T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-10T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-10T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-10T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-11T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-11T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-11T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-11T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-11T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-11T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-11T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-11T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-11T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-11T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-12T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-12T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-12T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-12T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-12T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-12T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-12T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-12T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-12T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-12T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-13T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-13T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-13T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-13T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-13T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-13T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-13T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-13T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-13T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-13T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-14T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-14T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-14T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-14T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-14T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-14T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-14T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-14T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-14T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-14T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-15T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-15T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-15T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-15T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-15T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-15T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-15T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-15T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-15T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-15T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-16T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-16T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-16T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-16T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-16T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-16T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-16T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-16T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-16T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-16T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-17T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-17T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-17T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-17T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-17T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-17T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-17T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-17T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-17T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-17T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-18T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-18T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-18T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-18T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-18T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-18T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-18T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-18T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-18T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-18T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-19T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-19T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-19T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-19T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-19T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-19T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-19T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-19T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-19T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-19T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-20T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-20T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-20T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-20T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-20T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-20T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-20T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-20T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-20T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-20T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-21T22:00:00.000Z"}, {
      "line": "temp",
      "date": "2016-08-21T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-21T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-21T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-21T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-21T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-21T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-21T22:00:00.000Z"
    }, {"line": "new", "date": "2016-08-21T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-21T22:00:00.000Z"
    }, {"line": "active", "date": "2016-08-22T22:00:00.000Z"}, {
      "line": "completed",
      "date": "2016-08-22T22:00:00.000Z"
    }, {"line": "completed", "date": "2016-08-22T22:00:00.000Z"}, {
      "line": "active",
      "date": "2016-08-22T22:00:00.000Z"
    }, {"line": "temp", "date": "2016-08-22T22:00:00.000Z"}, {
      "line": "assigned",
      "date": "2016-08-22T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-22T22:00:00.000Z"}, {
      "line": "new",
      "date": "2016-08-22T22:00:00.000Z"
    }, {"line": "assigned", "date": "2016-08-22T22:00:00.000Z"}, {"line": "new", "date": "2016-08-22T22:00:00.000Z"}];

    this.json = this.json.map(function (c) {
      c.date = d3.time.format.iso.parse(c.date);
      return c;
    });
    this.data = crossfilter(this.json);
    this.days = this.data.dimension(function (d) {
      return d.date;
    });
    this.minDate = this.days.bottom(1)[0].date;
    this.maxDate = this.days.top(1)[0].date;

    this.lineValues = this.days.group().reduce(function (acc, cur) {
      acc[cur.line] = (acc[cur.line] || 0) + 1
      return acc;
    }, function (acc, cur) {
      acc[cur.line] = (acc[cur.line] || 0) - 1
      return acc;
    }, function () {
      return {};
    });

    this.categories = this.data.dimension(function (d) {
      return d.line;
    });

    this.categories2 = this.data.dimension(function (d) {
      return d.line;
    });






    /*this.crossfilter = crossfilter(data);
    this.groupAll = this.crossfilter.groupAll();

    this.genderDimension = this.crossfilter.dimension(d => d.gender);
    this.genderGroup = this.genderDimension.group();

    this.ageDimension = this.crossfilter.dimension(d => d.age);
    this.ageGroup = this.ageDimension.group();*/
  }
}

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {'filter': []};
  }

  crossfilterContext = (callback) => {
    if (!callback) {
      return this._crossfilterContext;
    }


    this._crossfilterContext = new CrossfilterContext();
    callback(this._crossfilterContext);
  };

  testFilter() {
    this._crossfilterContext.categories2.filter('completed');
    dc.redrawAll();
  }

  testFilter2() {
    this._crossfilterContext.categories2.filter('assigned');
    dc.redrawAll();
  }

  testFilter3() {
    this._crossfilterContext.categories2.filterAll();
    dc.redrawAll();
  }



  render() {

    var colorScale = ['#719bce', '#7a51ef', '#b768e7', '#f3458a', '#f9513f', '#feba3f', '#ffdf33', '#23b20d', '#0ba368', '#28b9aa'];


    return (

      <div>

        <Button onClick={this.testFilter.bind(this)}>Show Completed</Button>
        <Button onClick={this.testFilter2.bind(this)}>Show assigned</Button>

        <Button onClick={this.testFilter3.bind(this)}>Clear</Button>


        <ChartContainer className="container" crossfilterContext={this.crossfilterContext}>

          <Row>
            <Col>

              <div style={{'height': '200px'}}>

                <LineChart

                  dimension={ctx => ctx.days}
                  group={ctx => [ctx.lineValues, 'completed']}
                  stack={ctx => [ctx.lineValues, 'assigned', (d) => { return d.value.assigned || 0; }]}
                  valueAccessor={d => d.value.completed || 0}
                  turnOnControls={true}
                  width={340}
                  height={180}
                  elasticY={true}
                  renderArea={true}
                  x={d3.time.scale().domain([new Date('19 May 2016'), new Date('1 June 2016')])}
                  ordinalColors={colorScale}
                />

                {/*  { <BarChart
                    dimension={ctx => ctx.ageDimension}
                    group={ctx => ctx.ageGroup}
                    width={180}
                    height={180}
                    elasticY={true}
                    centerBar={true}
                    gap={1}
                    alwaysUseRounding={true}
                    x={d3.scale.ordinal().domain([1, 5])}
                    renderHorizontalGridLines={false}
                  />
                  }*/}
              </div>
            </Col>
          </Row>

          <Row>
            <Col>

              <div style={{'height': '200px'}}>

                 <PieChart
                    dimension={ctx => ctx.categories}
                    group={ctx => ctx.categories.group()}
                    width={180} height={180}
                    radius={80}
                  />


              </div>

            </Col>
          </Row>

        </ChartContainer>


      </div>


    );
  }
}
