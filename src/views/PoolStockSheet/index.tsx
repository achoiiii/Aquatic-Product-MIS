import SitePoolSelector from '@/components/SitePoolSelector';
import { useSelector } from '@/store';
import { SiteItem } from '@/store/models/app/typings';
import exportTableToExcel from '@/utils/exportXlsx';
import { formatDate } from '@/utils/formatDate';
import { Button, DatePicker, Form } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

interface IPoolStockData {
  poolNo: string;
  type: '新' | '老';
  area: number;
  quantity: number;
  weight: number;
}

function getData(sites: SiteItem[]) {
  const dataList: IPoolStockData[] = [];
  sites.forEach((site) => {
    site.pools.forEach((pool) => {
      dataList.push({
        poolNo: pool.poolNo + '',
        type: pool.type === 0 ? '新' : '老',
        area: pool.area,
        quantity: pool.quantity,
        weight: pool.weight,
      });
    });
  });
  return dataList;
}

const PoolStockSheet = () => {
  const [date, setDate] = useState(formatDate(Date.now()));
  const TableContainer = () => {
    const sites = useSelector((state) => state.app.sites);
    const columns: ColumnsType<IPoolStockData> = [
      {
        title: '塘号',
        dataIndex: 'poolNo',
        key: 'poolNo',
        align: 'center',
      },
      {
        title: '新/老',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
      },
      {
        title: '面积',
        dataIndex: 'area',
        key: 'area',
        align: 'center',
      },
      {
        title: '存量数量（尾）',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center',
      },
      {
        title: '存塘重量（kg）',
        dataIndex: 'weight',
        key: 'weight',
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
          id="pool-stock-table"
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
      poolNo: string;
      date: Dayjs;
    }
    const onFinish = (values: searchParams) => {
      console.log('Received values from form: ', values);
      setDate(formatDate(Number(values.date)));
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
          onClick={() => exportTableToExcel('pool-stock-table', 'pool-stock-table')}
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
export default PoolStockSheet;
