import SitePoolSelector from '@/components/SitePoolSelector';
import request from '@/request';
import { IPoolBasicRangeSearchParams } from '@/request/sheet/typing';
import { flatRecordRes } from '@/utils/record';
import exportTableToExcel from '@/utils/sheet/exportXlsx';
import { Button, DatePicker, Form, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

interface ISheetData {
  // 发生日期
  date: string;
  // 上报日期
  reportDate: string;
  // 上报人
  reporter: string;
  // 塘号
  poolNo: string;
  // 投料
  feed: number;
  // 消耗
  loss: number;
  // 消耗重量
  lossWeight?: number;
}

const DivideRecord = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [sheetData, setSheetData]: [ISheetData[], any] = useState([]);
  const [dateRange, setDateRange]: [string[], any] = useState([
    // 默认当天前十五天数据
    dayjs().subtract(14, 'day').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD'),
  ]);
  useEffect(() => {
    setShowLoading(true);
    request.record
      .getDivideRecordData({ date: dateRange })
      .then((res) => {
        const sheetData: ISheetData[] = [];
        for (let i = 0; i < res.data.length; i++) {
          const item = flatRecordRes(res.data[i]);
          item['key'] = res.data[i].reportBasic.poolNo + '/' + res.data[i].reportBasic.date;
          sheetData.push(item);
        }
        setSheetData(sheetData);
      })
      .finally(() => setShowLoading(false));
  }, []);

  const SearchBar: React.FC = () => {
    const onFinish = (values: IPoolBasicRangeSearchParams) => {
      setShowLoading(true);
      const dateArr = values.dateRange.map((value) => {
        return value.format('YYYY-MM-DD');
      });
      let poolNos = [];
      if (values.sitePool) values.sitePool;
      request.record
        .getDivideRecordData({ poolNos, date: dateArr })
        .then((res) => {
          const sheetData: ISheetData[] = [];
          for (let i = 0; i < res.data.length; i++) {
            const item = flatRecordRes(res.data[i]);
            item['key'] = res.data[i].reportBasic.poolNo + '/' + res.data[i].reportBasic.date;
            sheetData.push(item);
          }
          setSheetData(sheetData);
          setDateRange(dateArr);
        })
        .finally(() => setShowLoading(false));
    };

    return (
      <Form name="customized_form_controls" layout="inline" onFinish={onFinish} className="content-box search-bar">
        <SitePoolSelector type="pool" />
        <Form.Item name="dateRange" label="日期" rules={[{ required: true, message: '该项必填' }]}>
          <RangePicker placeholder={['开始时间', '结束时间']} />
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

  const TableContainer = () => {
    const columns: ColumnsType<ISheetData> = [
      {
        title: '塘号',
        dataIndex: 'poolNo',
        key: 'poolNo',
        align: 'center',
        fixed: 'left',
        className: 'first-column',
      },
      {
        title: '上报人',
        dataIndex: 'reporter',
        key: 'reporter',
        align: 'center',
      },
      {
        title: '发生日期',
        dataIndex: 'date',
        key: 'date',
        align: 'center',
      },
      {
        title: '分入塘号',
        dataIndex: 'poolNoIn',
        key: 'poolNoIn',
        align: 'center',
      },
      {
        title: '分出塘号',
        dataIndex: 'poolNoOut',
        key: 'poolNoOut',
        align: 'center',
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center',
      },
      {
        title: '上报日期',
        dataIndex: 'reportDate',
        key: 'reportDate',
        align: 'center',
      },
    ];
    return (
      <div className="content-box">
        <Table
          dataSource={sheetData}
          bordered
          pagination={{ pageSize: 100 }}
          size="small"
          columns={columns}
          id="transfer-table"
          rowKey={'key'}
          title={() => {
            return `总共匹配到：${sheetData.length}条数据`;
          }}
          loading={showLoading}
        />
      </div>
    );
  };

  return (
    <div>
      <SearchBar />
      <TableContainer />
    </div>
  );
};
export default DivideRecord;
