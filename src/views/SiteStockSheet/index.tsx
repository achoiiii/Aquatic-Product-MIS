import SitePoolSelector from '@/components/SitePoolSelector';
import { ISiteStockData } from '@/request/basic/typing';
import { ISiteBasicSearchParams } from '@/request/sheet/typing';
import { useSelector } from '@/store';
import { SiteItem } from '@/store/models/app/typings';
import exportTableToExcel from '@/utils/sheet/exportXlsx';
import { formatDate } from '@/utils/format';
import { Button, DatePicker, Form } from 'antd';
import dayjs from 'dayjs';
import Table, { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import request from '@/request';

function getData(sites: SiteItem[]) {
  const dataList: ISiteStockData[] = [];
  sites.forEach((site) => {
    let totalNewQuantity = 0;
    let totalOldQuantity = 0;
    let area = 0;
    let totalNewWeight = 0;
    let totalOldWeight = 0;
    const pools = site.pools;
    pools.forEach((pool) => {
      if (pool.type === 1) {
        totalNewQuantity += pool.quantity;
        totalNewWeight += pool.weight;
      } else if (pool.type === 2) {
        totalOldQuantity += pool.quantity;
        totalOldWeight += pool.weight;
      }
      area += pool.area;
    });
    dataList.push({
      key: site.siteNo + '',
      siteNo: site.siteNo + '',
      area,
      totalNewQuantity,
      totalNewWeight,
      totalOldQuantity,
      totalOldWeight,
    });
  });
  return dataList;
}

const SiteStockSheet = () => {
  const [date, setDate] = useState(formatDate(Date.now()));
  const sites = useSelector((state) => state.app.sites);
  const [showLoading, setShowLoading] = useState(false);
  const [dataSource, setDataSource] = useState(getData(sites));
  const TableContainer = () => {
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
        dataIndex: 'totalNewQuantity',
        key: 'totalNewQuantity',
        align: 'center',
      },
      {
        title: '新鳗存塘重量（kg）',
        dataIndex: 'totalNewWeight',
        key: 'totalNewWeight',
        align: 'center',
      },
      {
        title: '老鳗存量数量（尾）',
        dataIndex: 'totalOldQuantity',
        key: 'totalOldQuantity',
        align: 'center',
      },
      {
        title: '老鳗存塘重量（kg）',
        dataIndex: 'totalOldWeight',
        key: 'totalOldWeight',
        align: 'center',
      },
    ];
    return (
      <div className="content-box">
        <Table
          dataSource={dataSource}
          bordered
          pagination={{ pageSize: 1000 }}
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
    const onFinish = (values: ISiteBasicSearchParams) => {
      setShowLoading(true);
      request.sheet.stock
        .getSiteStock({ ...values })
        .then((res) => {
          const dataSource = res.data.map((item) => {
            return {
              ...item,
              key: item.siteNo,
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
        <SitePoolSelector type="site" />
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
          <DatePicker
            placeholder="请选择日期"
            disabledDate={(date) => {
              return date && date > dayjs().endOf('day');
            }}
          />
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
