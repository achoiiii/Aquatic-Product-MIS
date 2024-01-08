import React, { useState } from 'react';
import { Button, Form, Input, Select, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

const { Option } = Select;

type Currency = 'rmb' | 'dollar';

interface PriceValue {
  number?: number;
  currency?: Currency;
}

interface PriceInputProps {
  value?: PriceValue;
  onChange?: (value: PriceValue) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);
  const [currency, setCurrency] = useState<Currency>('rmb');

  const triggerChange = (changedValue: { number?: number; currency?: Currency }) => {
    onChange?.({ number, currency, ...value, ...changedValue });
  };

  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('number' in value)) {
      setNumber(newNumber);
    }
    triggerChange({ number: newNumber });
  };

  const onCurrencyChange = (newCurrency: Currency) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({ currency: newCurrency });
  };

  return (
    <span>
      <Input type="text" value={value.number || number} onChange={onNumberChange} style={{ width: 100 }} />
      <Select value={value.currency || currency} style={{ width: 80, margin: '0 8px' }} onChange={onCurrencyChange}>
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
    </span>
  );
};

const SearchBar: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values from form: ', values);
  };

  const checkPrice = (_: any, value: { number: number }) => {
    if (value.number > 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Price must be greater than zero!'));
  };

  return (
    <Form
      name="customized_form_controls"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        price: {
          number: 0,
          currency: 'rmb',
        },
      }}
      className="content-box search-bar"
    >
      <Form.Item name="price" label="Price" rules={[{ validator: checkPrice }]}>
        <PriceInput />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const TableContainer: React.FC = () => {
  interface DataType {
    key: React.Key;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    tags: string[];
  }

  const data: DataType[] = [
    {
      key: '1',
      firstName: 'John',
      lastName: 'Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      firstName: 'Jim',
      lastName: 'Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '4',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '5',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '6',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
    {
      key: '7',
      firstName: 'Joe',
      lastName: 'Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];
  const columns: ColumnsType<DataType> = [
    { title: '塘号', dataIndex: 'age', key: 'age', align: 'center' },
    { title: '面积（亩）', dataIndex: 'age', key: 'age', align: 'center' },
    { title: '新/老', dataIndex: 'age', key: 'age', align: 'center' },
    {
      title: '1',
      key: '1',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '2',
      key: '2',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '3',
      key: '3',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '4',
      key: '4',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '5',
      key: '5',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '6',
      key: '6',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '7',
      key: '7',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '8',
      key: '8',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '9',
      key: '9',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '10',
      key: '10',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '11',
      key: '11',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '12',
      key: '12',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '13',
      key: '13',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '14',
      key: '14',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
    {
      title: '15',
      key: '15',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: 'firstName', key: 'firstName', align: 'center' },
        { title: '重量（kg）', dataIndex: 'lastName', key: 'lastName', align: 'center' },
      ],
    },
  ];
  return (
    <div className="content-box">
      <div className="table-result-text">总共匹配到：{11111}条数据</div>
      <Table dataSource={data} bordered size="middle" scroll={{ x: 3000, y: 235 }} columns={columns} />
    </div>
  );
};

const FeedLog: React.FC = () => {
  return (
    <>
      <SearchBar />
      <TableContainer />
    </>
  );
};
export default FeedLog;
