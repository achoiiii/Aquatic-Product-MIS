import SitePoolSelector from '@/components/SitePoolSelector';
import { FeedSummaryDataType, getFeedSummaryColumn, getFeedSummaryData } from '@/request/mock/feedSummary';
import { getPoolSummaryColumn, getPoolSummaryData } from '@/request/mock/poolSummary';
import exportTableToExcel from '@/utils/exportXlsx';
import { Button, DatePicker, Form, Select, Table } from 'antd';
import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
interface IProps {
  data?: FeedSummaryDataType[];
}
const { RangePicker } = DatePicker;
const PoolSummarySheet = () => {
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
        <SitePoolSelector />
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
          onClick={() => exportTableToExcel('loss-table', 'loss-table')}
        >
          导出
        </Button>
      </Form>
    );
  };

  const SummaryTabelContainer = (props: IProps) => {
    const [showLoading, setShowLoading] = useState(true);
    const columns = getPoolSummaryColumn();
    const sheetData = getPoolSummaryData();
    // TODO: 当查询时更换type，然后重新拉取数据
    useEffect(() => {
      setTimeout(() => {
        setShowLoading(false);
      }, 2e3);
    }, []);
    return (
      <div className="content-box">
        <Table
          dataSource={sheetData}
          bordered
          pagination={{ pageSize: 100 }}
          size="small"
          scroll={{ x: 3000 }}
          columns={columns}
          id="summary-table"
          rowKey={'key'}
          title={() => {
            return `总共匹配到：${15}条数据`;
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
export default PoolSummarySheet;
