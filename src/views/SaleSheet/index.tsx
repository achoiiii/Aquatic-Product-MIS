import React, { useEffect, useState } from 'react';
import { Button, Form, Table, DatePicker, Switch } from 'antd';
import exportTableToExcel from '@/utils/exportXlsx';
import { Dayjs } from 'dayjs';
import SitePoolSelector from '@/components/SitePoolSelector';
import { TransferSheetDataType, getTransferSheetColumn, getTransferSheetData } from '@/request/mock/transferSheet';

const { RangePicker } = DatePicker;
interface IProps {
  data?: TransferSheetDataType[];
}

const sheetData: TransferSheetDataType[] = getTransferSheetData();

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
        <RangePicker placeholder={['开始时间','结束时间']} />
      </Form.Item>
      <Form.Item name="isA" label="是/否为A鳗">
        <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked={false} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
      <Button
        type="primary"
        style={{ backgroundColor: '#18bc69' }}
        onClick={() => exportTableToExcel('sale-table', 'sale-table')}
      >
        导出
      </Button>
    </Form>
  );
};

const TableContainer = (props: IProps) => {
  const columns = getTransferSheetColumn();
  const { data } = props;
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowLoading(false);
    }, 2e3);
  }, []);
  return (
    <div className="content-box">
      <Table
        dataSource={data}
        bordered
        pagination={{ pageSize: 100 }}
        size="small"
        scroll={{ x: 3000,y: 600 }}
        columns={columns}
        id="sale-table"
        rowKey={'key'}
        title={() => {
          return `总共匹配到：${15}条数据`;
        }}
        loading={showLoading}
      />
    </div>
  );
};

const SaleSheet: React.FC = () => {
  return (
    <>
      <SearchBar />
      <TableContainer data={sheetData} />
    </>
  );
};
export default SaleSheet;
