import SitePoolSelector from '@/components/SitePoolSelector';
import request from '@/request';
import { store, useSelector } from '@/store';
import { SiteItem } from '@/store/models/app/typings';
import exportTableToExcel from '@/utils/sheet/exportXlsx';
import { formatDate, formatPoolNos } from '@/utils/format';
import { Button, DatePicker, Form } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

interface IPoolStockData {
  key: string;
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
        key: pool.poolNo + '',
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
  const [showLoading, setShowLoading] = useState(false);
  const [date, setDate] = useState(formatDate(Date.now()));
  const sites = useSelector((state) => state.app.sites);
  const [dataSource, setDataSource] = useState(getData(sites));
  const TableContainer = () => {
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
    const onFinish = (values: { date: string; sitePool: string[][] }) => {
      setShowLoading(true);
      const { sitePool } = values;
      const poolNos = formatPoolNos(sitePool || []);
      request.sheet.stock
        .getPoolStock({ poolNos, date: values.date })
        .then((res) => {
          const dataSource = res.data.map((item) => {
            return {
              ...item,
              key: item.poolNo,
              type: item.type === 0 ? '新' : '老',
            };
          });
          setDataSource(dataSource);
          setDate(values.date);
        })
        .catch((err) => {})
        .finally(() => {
          setShowLoading(false);
        });
    };

    return (
      <Form name="customized_form_controls" layout="inline" onFinish={onFinish} className="content-box search-bar">
        <SitePoolSelector type="pool" />
        <Form.Item
          name="date"
          label="日期"
          rules={[{ required: true, message: '请选择日期' }]}
          getValueProps={(value) => {
            return {
              value: value ? dayjs(value) : null,
            };
          }}
          getValueFromEvent={(value) => {
            return value ? value.format('YYYY-MM-DD') : '';
          }}
        >
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
