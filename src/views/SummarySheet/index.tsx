import { FeedSummaryDataType, getFeedSummaryColumn, getFeedSummaryData } from '@/request/mock/feedSummary';
import { getSummaryColumn, getSummaryData } from '@/request/mock/totalSummary';
import { getTransferSummaryColumn, getTransferSummaryData } from '@/request/mock/transferSummary';
import exportTableToExcel from '@/utils/sheet/exportXlsx';
import { Button, DatePicker, Form, Select, Table } from 'antd';
import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
interface IProps {
  data?: FeedSummaryDataType[];
}
interface searchParams {
  type: 'sh' | 'ft' | 'xs' | 'xs-a' | 'qt' | 'total';
  dateRange: Dayjs[];
}
const { RangePicker } = DatePicker;
const SummarySheet = () => {
  const [sheetType, setSheetType] = useState('sh');
  const SearchBar = () => {
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
      setSheetType(values.type);
      console.log('Received values from form: ', values);
    };
    return (
      <Form name="customized_form_controls" layout="inline" onFinish={onFinish} className="content-box search-bar">
        <Form.Item name="type" label="查看表格类型">
          <Select style={{ width: '200px' }} options={options} onChange={onSelectChange} />
        </Form.Item>
        <Form.Item
          name="dateRange"
          label="日期"
          rules={[
            { required: true, message: '请选择日期' },
            { type: 'array', warningOnly: true },
          ]}
        >
          <RangePicker placeholder={['开始时间', '结束时间']} disabled={disabled} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
        <Button
          type="primary"
          style={{ backgroundColor: '#18bc69' }}
          onClick={() => exportTableToExcel('summary-table', 'summary-table')}
        >
          导出
        </Button>
      </Form>
    );
  };

  const SummaryTabelContainer = (props: IProps) => {
    const [showLoading, setShowLoading] = useState(true);
    const [sheetData, setSheetData]: [FeedSummaryDataType[], any] = useState([]);
    const [columns, setColumns] = useState([]);
    const getDataFuncMap = {
      sh: getFeedSummaryData,
      ft: getTransferSummaryData,
      xs: getTransferSummaryData,
      'xs-a': getTransferSummaryData,
      qt: getTransferSummaryData,
      total: getSummaryData,
    };
    const getColumnFuncMap = {
      sh: getFeedSummaryColumn,
      ft: getTransferSummaryColumn,
      xs: getTransferSummaryColumn,
      'xs-a': getTransferSummaryColumn,
      qt: getTransferSummaryColumn,
      total: getSummaryColumn,
    };
    // TODO: 当查询时更换type，然后重新拉取数据
    useEffect(() => {
      setTimeout(() => {
        setShowLoading(false);
      }, 2e3);
      const columns = getColumnFuncMap[sheetType]();
      const data = getDataFuncMap[sheetType]();
      setColumns(columns);
      setSheetData(data);
    }, [sheetType]);
    return (
      <div className="content-box">
        <Table
          dataSource={sheetData}
          bordered
          pagination={{ pageSize: 100 }}
          size="small"
          scroll={{ x: 'max-content', y: 600 }}
          columns={columns}
          id="summary-table"
          rowKey={'key'}
          title={() => {
            return `总共匹配到：${sheetData.length}条数据，现在是${sheetType}表`;
          }}
          loading={showLoading}
        />
      </div>
    );
  };

  return (
    <div>
      <SearchBar />
      <SummaryTabelContainer />
    </div>
  );
};
export default SummarySheet;
