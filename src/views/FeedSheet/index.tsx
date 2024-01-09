import React, { useState } from 'react';
import { Button, Form, Input, Select, Table, DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
import exportTableToExcel from '@/utils/exportXlsx';
import { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;
interface DataType {
  id: string;
  area?: number;
  newOrOld?: string;
  forage: number;
  loss: number;
}
interface IProps {
  data?: DataType[];
}

const sharedData: DataType[] = [
  {
    id: '1',
    newOrOld: '新',
    forage: 1290,
    loss: 2,
  },
  {
    id: '1',
    newOrOld: '老',
    forage: 220,
    loss: 14,
  },
  {
    id: '3',
    newOrOld: '新',
    forage: 2080,
    loss: 0,
  },
  {
    id: '3',
    newOrOld: '老',
    forage: 640,
    loss: 0,
  },
  {
    id: '4',
    newOrOld: '新',
    forage: 1420,
    loss: 0,
  },
  {
    id: '4',
    newOrOld: '老',
    forage: 220,
    loss: 0,
  },
  {
    id: '5',
    newOrOld: '新',
    forage: 1290,
    loss: 2,
  },
  {
    id: '5',
    newOrOld: '老',
    forage: 220,
    loss: 14,
  },
  {
    id: '6',
    newOrOld: '新',
    forage: 1290,
    loss: 2,
  },
  {
    id: '6',
    newOrOld: '老',
    forage: 220,
    loss: 14,
  },
  {
    id: '8',
    newOrOld: '新',
    forage: 1290,
    loss: 2,
  },
  {
    id: '8',
    newOrOld: '老',
    forage: 220,
    loss: 14,
  },
  {
    id: '9',
    newOrOld: '新',
    forage: 1860,
    loss: 1,
  },
  {
    id: '9',
    newOrOld: '老',
    forage: 235,
    loss: 3,
  },
];
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

const TableContainer = (props: IProps) => {
  const columns: ColumnsType<DataType> = [
    {
      title: '塘号',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      fixed: 'left',
      onCell: (_, index) => {
        if (index !== undefined && index % 2 === 0) {
          return { rowSpan: 2 };
        } else {
          return { colSpan: 0 };
        }
      },
    },
    {
      title: '面积（亩）',
      dataIndex: 'area',
      key: 'area',
      align: 'center',
      fixed: 'left',
      onCell: (_, index) => {
        if (index !== undefined && index % 2 === 0) {
          return { rowSpan: 2 };
        } else {
          return { colSpan: 0 };
        }
      },
    },
    { title: '新/老', dataIndex: 'newOrOld', key: 'newOrOld', align: 'center', fixed: 'left' },
    {
      title: '1',
      key: '1',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '2',
      key: '2',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '3',
      key: '3',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '4',
      key: '4',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '5',
      key: '5',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '6',
      key: '6',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '7',
      key: '7',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '8',
      key: '8',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '9',
      key: '9',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '10',
      key: '10',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '11',
      key: '11',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '12',
      key: '12',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '13',
      key: '13',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '14',
      key: '14',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '15',
      key: '15',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
  ];
  const { data } = props;
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

const SummaryTable = (props: IProps) => {
  const columns: ColumnsType<Pick<DataType, 'forage' | 'loss'>> = [
    {
      title: '',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      rowScope: 'row',
      fixed: 'left',
    },
    {
      title: '1',
      key: '1',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '2',
      key: '2',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '3',
      key: '3',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '4',
      key: '4',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '5',
      key: '5',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '6',
      key: '6',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '7',
      key: '7',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '8',
      key: '8',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '9',
      key: '9',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '10',
      key: '10',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '11',
      key: '11',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '12',
      key: '12',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '13',
      key: '13',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '14',
      key: '14',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
    {
      title: '15',
      key: '15',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: 'forage', key: 'forage', align: 'center' },
        { title: '损耗（尾）', dataIndex: 'loss', key: 'loss', align: 'center' },
      ],
    },
  ];
  const { data } = props;
  const dataSource = [
    {
      title: '合计',
      forage: 12815,
      loss: 50,
    },
    {
      title: '本期新鳗',
      forage: 10285,
      loss: 10,
    },
    {
      title: '本期老鳗',
      forage: 2530,
      loss: 40,
    },
  ];
  return (
    <div className="content-box">
      <Table
        dataSource={dataSource}
        bordered
        pagination={false}
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
      <TableContainer data={sharedData} />
      <SummaryTable data={sharedData} />
    </>
  );
};
export default FeedSheet;
