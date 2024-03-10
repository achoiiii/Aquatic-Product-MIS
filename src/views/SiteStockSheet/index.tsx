import SitePoolSelector from '@/components/SitePoolSelector';
import { useSelector } from '@/store';
import { SiteItem } from '@/store/models/app/typings';
import exportTableToExcel from '@/utils/exportXlsx';
import { formatDate } from '@/utils/formatDate';
import { Button, DatePicker, Form } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

interface ISiteStockData {
  siteNo: string;
  area: number;
  newQuantity: number;
  newWeight: number;
  oldQuantity: number;
  oldWeight: number;
}

function getData(sites: SiteItem[]) {
  const dataList: ISiteStockData[] = [];
  sites.forEach((site) => {
    let newQuantity = 0;
    let oldQuantity = 0;
    let area = 0;
    let newWeight = 0;
    let oldWeight = 0;
    const pools = site.pools;
    pools.forEach((pool) => {
      if (pool.type === 0) {
        newQuantity += pool.quantity;
        newWeight += pool.weight;
      } else {
        oldQuantity += pool.quantity;
        oldWeight += pool.weight;
      }
      area += pool.area;
    });
    dataList.push({
      siteNo: site.siteNo + '',
      area,
      newQuantity,
      newWeight,
      oldQuantity,
      oldWeight,
    });
  });
  return dataList;
}

const SiteStockSheet = () => {
  const [date, setDate] = useState(formatDate(Date.now()));
  const TableContainer = () => {
    const sites = useSelector((state) => state.app.sites);
    const columns: ColumnsType<ISiteStockData> = [
      {
        title: '场号',
        dataIndex: 'siteNo',
        key: 'siteNo',
        align: 'center',
      },
      {
        title: '面积（亩）',
        dataIndex: 'area',
        key: 'area',
        align: 'center',
      },
      {
        title: '新鳗存量数量（尾）',
        dataIndex: 'newQuantity',
        key: 'newQuantity',
        align: 'center',
      },
      {
        title: '新鳗存塘重量（kg）',
        dataIndex: 'newWeight',
        key: 'newWeight',
        align: 'center',
      },
      {
        title: '老鳗存量数量（尾）',
        dataIndex: 'oldQuantity',
        key: 'oldQuantity',
        align: 'center',
      },
      {
        title: '老鳗存塘重量（kg）',
        dataIndex: 'oldWeight',
        key: 'oldWeight',
        align: 'center',
      },
    ];
    const dataSource = getData(sites);
    const [showLoading, setShowLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setShowLoading(false);
      }, 2e3);
    }, []);
    return (
      <div className="content-box">
        <Table
          dataSource={dataSource}
          bordered
          pagination={{ pageSize: 100 }}
          size="small"
          columns={columns}
          id="site-stock-table"
          rowKey={'key'}
          title={() => {
            return `总共匹配到：${dataSource.length}条数据，数据截止至${date}。`;
          }}
          loading={showLoading}
        />
      </div>
    );
  };
  const SearchBar: React.FC = () => {
    interface searchParams {
      siteNo: string;
      date: number;
    }
    const onFinish = (values: searchParams) => {
      console.log('Received values from form: ', values);
      setDate(formatDate(values.date));
    };

    return (
      <Form name="customized_form_controls" layout="inline" onFinish={onFinish} className="content-box search-bar">
        <SitePoolSelector />
        <Form.Item name="date" label="日期" rules={[{ required: true, message: '请选择日期' }]}>
          <DatePicker placeholder="请选择日期" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form.Item>
        <Button
          type="primary"
          style={{ backgroundColor: '#18bc69' }}
          onClick={() => exportTableToExcel('site-stock-table', 'site-stock-table')}
        >
          导出
        </Button>
      </Form>
    );
  };
  return (
    <div>
      <SearchBar />
      <TableContainer />
    </div>
  );
};
export default SiteStockSheet;
