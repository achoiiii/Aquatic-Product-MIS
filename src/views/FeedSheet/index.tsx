import React, { useState } from 'react';
import { Button, Form, Input, Select, Table, DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
import exportTableToExcel from '@/utils/exportXlsx';
import { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

const SearchBar: React.FC = () => {
  interface searchParams {
    poolId: string;
    dateRange: Dayjs[];
  }
  const onFinish = (values: searchParams) => {
    const timestampArr = values.dateRange.map((value) => {
      return value.valueOf();
    });
    values['timestampArr'] = timestampArr;
    console.log('Received values from form: ', values);
  };

  return (
    <Form name="customized_form_controls" layout="inline" onFinish={onFinish} className="content-box search-bar">
      <Form.Item name="poolId" label="场号">
        <Input style={{ width: 100 }} />
      </Form.Item>
      <Form.Item name="poolId" label="塘号">
        <Input style={{ width: 100 }} />
      </Form.Item>
      <Form.Item name="dateRange" label="日期">
        <RangePicker />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
      <Button
        type="primary"
        style={{ backgroundColor: '#18bc69' }}
        onClick={() => exportTableToExcel('feedlog-table', 'feedlog-table')}
      >
        导出
      </Button>
    </Form>
  );
};

const TableContainer: React.FC = () => {
  interface DataType {
    key: React.Key;
    quantity: string;
    weight: string;
    age: number;
    address: string;
    tags: string[];
  }

  const data: DataType[] = [
    {
      key: '1',
      quantity: 'John',
      weight: 'Brown',
      age: 1,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      quantity: 'Jim',
      weight: 'Green',
      age: 2,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      quantity: 'Joe',
      weight: 'Black',
      age: 3,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '4',
      quantity: 'Joe',
      weight: 'Black',
      age: 4,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '5',
      quantity: 'Joe',
      weight: 'Black',
      age: 5,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '6',
      quantity: 'Joe',
      weight: 'Black',
      age: 6,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '7',
      quantity: 'Joe',
      weight: 'Black',
      age: 7,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '8',
      quantity: 'Joe',
      weight: 'Black',
      age: 8,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '9',
      quantity: 'Joe',
      weight: 'Black',
      age: 9,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '10',
      quantity: 'Joe',
      weight: 'Black',
      age: 10,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '11',
      quantity: 'Joe',
      weight: 'Black',
      age: 11,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '12',
      quantity: 'Joe',
      weight: 'Black',
      age: 12,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '13',
      quantity: 'Joe',
      weight: 'Black',
      age: 13,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '14',
      quantity: 'Joe',
      weight: 'Black',
      age: 14,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: '塘号',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      onCell: (_, index) => {
        if (index !== undefined && index % 2 === 0) {
          return { rowSpan: 2 };
        }
        return {};
      },
    },
    {
      title: '面积（亩）',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
      onCell: (_, index) => {
        if (index !== undefined && index % 2 === 0) {
          return { rowSpan: 2 };
        }
        return {};
      },
    },
    { title: '新/老', dataIndex: 'age', key: 'age', align: 'center' },
    {
      title: '1',
      key: '1',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '2',
      key: '2',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '3',
      key: '3',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '4',
      key: '4',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '5',
      key: '5',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '6',
      key: '6',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '7',
      key: '7',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '8',
      key: '8',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '9',
      key: '9',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '10',
      key: '10',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '11',
      key: '11',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '12',
      key: '12',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '13',
      key: '13',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '14',
      key: '14',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
    {
      title: '15',
      key: '15',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity', align: 'center' },
        { title: '重量（kg）', dataIndex: 'weight', key: 'weight', align: 'center' },
      ],
    },
  ];
  return (
    <div className="content-box">
      <div className="table-result-text">总共匹配到：{11111}条数据</div>
      <Table
        dataSource={data}
        bordered
        pagination={{ pageSize: 10 }}
        size="small"
        scroll={{ x: 3000 }}
        columns={columns}
        id="feedlog-table"
      />
    </div>
  );
};

const FeedSheet: React.FC = () => {
  return (
    <>
      <SearchBar />
      <TableContainer />
    </>
  );
};
export default FeedSheet;
