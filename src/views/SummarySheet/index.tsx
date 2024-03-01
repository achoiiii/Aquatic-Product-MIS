import exportTableToExcel from '@/utils/exportXlsx';
import { Button, DatePicker, Form, Select } from 'antd';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
const { RangePicker } = DatePicker;
const SearchBar = () => {
  interface searchParams {
    type: 'sh' | 'ft' | 'xs' | 'xs-a' | 'qt' | 'total';
    dateRange: Dayjs[];
  }
  const [disabled, setDisabled] = useState(true);
  const options = [
    { label: '投料损耗表', value: 'sh' },
    { label: '分塘表', value: 'ft' },
    { label: '销售表', value: 'xs' },
    { label: 'A鳗销售表', value: 'xs-a' },
    { label: '清塘损耗表', value: 'qt' },
    { label: '汇总表', value: 'total' },
  ];
  const onSelectChange = (value: searchParams['type']) => {
    setDisabled(false);
  };
  const onFinish = (values: searchParams) => {
    const timestampArr = values.dateRange.map((value) => {
      return value.valueOf();
    });
    values['timestampArr'] = timestampArr;
    console.log('Received values from form: ', values);
  };
  return (
    <Form name="customized_form_controls" layout="inline" onFinish={onFinish} className="content-box search-bar">
      <Form.Item name="type" label="查看表格类型">
        <Select style={{ width: '200px' }} options={options} onChange={onSelectChange} />
      </Form.Item>
      <Form.Item name="dateRange" label="日期">
        <RangePicker disabled={disabled} />
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

const SummarySheet = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
};
export default SummarySheet;
