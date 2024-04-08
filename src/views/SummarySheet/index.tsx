import request from '@/request';
import { FeedSummaryDataType, getFeedSummaryColumn, getFeedSummaryData } from '@/request/mock/feedSummary';
import { getSummaryColumn } from '@/request/mock/totalSummary';
import { getBasicSummaryColumn, getBasicSummaryData } from '@/request/mock/basicSummary';
import { ISiteBasicRangeSearchParams, SiteFeedSheetDataType } from '@/request/sheet/typing';
import exportTableToExcel from '@/utils/sheet/exportXlsx';
import { Button, DatePicker, Form, Select, Table } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import SitePoolSelector from '@/components/SitePoolSelector';
interface IProps {
  data?: FeedSummaryDataType[];
}
const options = [
  { label: '投料损耗表', value: 'sh' },
  { label: '分塘表', value: 'ft' },
  { label: '销售表', value: 'xs' },
  { label: 'A鳗销售表', value: 'xs-a' },
  { label: '清塘损耗表', value: 'qt' },
  { label: '汇总表', value: 'total' },
];
const getDataFuncMap = {
  sh: request.sheet.feedLoss.getSiteFeedSheetData,
  ft: request.sheet.transfer.getSiteDivideSheetData,
  xs: request.sheet.sale.getSiteSaleSheetData,
  'xs-a': request.sheet.sale.getSiteSaleSheetData,
  qt: request.sheet.clearLoss.getSiteLossSheetData,
  total: request.sheet.summary.getSiteSummarySheetData,
};
const getColumnFuncMap = {
  sh: getFeedSummaryColumn,
  ft: getBasicSummaryColumn,
  xs: getBasicSummaryColumn,
  'xs-a': getBasicSummaryColumn,
  qt: getBasicSummaryColumn,
  total: getSummaryColumn,
};
const getSheetDataFuncMap = {
  sh: getFeedSummaryData,
  ft: getBasicSummaryData,
  xs: getBasicSummaryData,
  'xs-a': getBasicSummaryData,
  qt: getBasicSummaryData,
  total: getSummaryColumn,
};
const { RangePicker } = DatePicker;
const SummarySheet = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [sheetData, setSheetData]: [FeedSummaryDataType[], any] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sheetType, setSheetType] = useState('sh');
  const [dateRange, setDateRange]: [string[], any] = useState([
    // 默认当天前十五天数据
    dayjs().subtract(14, 'day').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD'),
  ]);

  useEffect(() => {
    setShowLoading(true);
    getDataFuncMap[sheetType]({
      date: dateRange,
    })
      .then((res) => {
        const sheetData = getSheetDataFuncMap[sheetType](res.data, dateRange);
        setSheetData(sheetData);
      })
      .finally(() => setShowLoading(false));
  }, []);

  useEffect(() => {
    const columns = getColumnFuncMap[sheetType](dateRange, sheetData.length);
    setColumns(columns);
  }, [sheetData]);

  const SearchBar = () => {
    const [disabled, setDisabled] = useState(true);
    const onSelectChange = (value) => {
      setDisabled(false);
    };
    const onFinish = (values: ISiteBasicRangeSearchParams & { type: 'sh' | 'ft' | 'xs' | 'xs-a' | 'qt' | 'total' }) => {
      setShowLoading(true);
      const dateArr = values.dateRange.map((value) => {
        return value.format('YYYY-MM-DD');
      });
      const sheetType = values.type;
      const siteNos = values.siteNos;
      getDataFuncMap[sheetType]({
        date: dateArr,
        siteNos,
      })
        .then((res) => {
          setDateRange(dateArr);
          const sheetData = getSheetDataFuncMap[sheetType](res.data, dateRange);
          setSheetData(sheetData);
          setSheetType(sheetType);
        })
        .finally(() => setShowLoading(false));
    };
    return (
      <Form name="customized_form_controls" layout="inline" onFinish={onFinish} className="content-box search-bar">
        <SitePoolSelector type="site" />
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
    useEffect(() => {}, [sheetType]);
    return (
      <div className="content-box">
        <Table
          dataSource={sheetData}
          bordered
          pagination={{ pageSize: 100 }}
          size="small"
          scroll={{ x: 'max-content' }}
          columns={columns}
          id="summary-table"
          rowKey={'key'}
          title={() => {
            return `总共匹配到：${sheetData.length}条数据，现在是${options.find((item) => item.value === sheetType)
              ?.label}`;
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
