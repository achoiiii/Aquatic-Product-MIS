import SitePoolSelector from '@/components/SitePoolSelector';
import request from '@/request';
import { PoolSummaryDataType, getPoolSummaryColumn, getPoolSummaryData } from '@/utils/sheet/poolSummary';
import { IPoolBasicRangeSearchParams } from '@/request/sheet/typing';
import { formatPoolNos } from '@/utils/format';
import exportTableToExcel from '@/utils/sheet/exportXlsx';
import { Button, DatePicker, Form, Table } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import useDefaultPoolNos from '@/hooks/useDefaultPoolNos';
const { RangePicker } = DatePicker;
const PoolSummarySheet = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [dateRange, setDateRange]: [string[], any] = useState([
    // 默认当天前十五天数据
    dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD'),
  ]);
  const [sheetData, setSheetData]: [PoolSummaryDataType[], any] = useState([]);
  useEffect(() => {
    const defaultPoolNos = useDefaultPoolNos();
    request.sheet.summary.getPoolSummarySheetData({ date: dateRange, poolNos: defaultPoolNos }).then((res) => {
      setSheetData(getPoolSummaryData(res.data));
    });
  }, []);
  const SearchBar: React.FC = () => {
    const onFinish = (values: IPoolBasicRangeSearchParams) => {
      setShowLoading(true);
      const dateArr = values.dateRange.map((value) => {
        return value.format('YYYY-MM-DD');
      });
      const poolNos = formatPoolNos(values.sitePool || []);
      request.sheet.summary
        .getPoolSummarySheetData({ date: dateArr, poolNos })
        .then((res) => {
          setSheetData(getPoolSummaryData(res.data));
          setDateRange(dateArr);
        })
        .finally(() => setShowLoading(false));
    };

    return (
      <Form name="customized_form_controls" layout="inline" onFinish={onFinish} className="content-box search-bar">
        <SitePoolSelector type="pool" />
        <Form.Item name="dateRange" label="日期">
          <RangePicker
            disabledDate={(date) => {
              return date && date > dayjs().endOf('day');
            }}
            placeholder={['开始时间', '结束时间']}
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
          onClick={() => exportTableToExcel('summary-table', 'summary-table')}
        >
          导出
        </Button>
      </Form>
    );
  };

  const SummaryTabelContainer = () => {
    const columns = getPoolSummaryColumn(sheetData.length);
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
          pagination={{ pageSize: 1000 }}
          size="small"
          scroll={{ x: 3000, y: 600 }}
          columns={columns}
          id="summary-table"
          rowKey={'key'}
          title={() => {
            return `总共匹配到：${sheetData.length}条数据，期初时间是：${dateRange[0]}，期末时间是：${dateRange[1]}`;
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
