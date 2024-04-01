import React, { useEffect, useState } from 'react';
import { Button, Form, Table, DatePicker } from 'antd';
import exportTableToExcel from '@/utils/sheet/exportXlsx';
import dayjs, { Dayjs } from 'dayjs';
import SitePoolSelector from '@/components/SitePoolSelector';
import { getBasicSheetColumn, getBasicSheetData } from '@/utils/sheet/basicSheet';
import { BasicSheetDataType, IPoolBasicRangeSearchParams } from '@/request/sheet/typing';
import { ColumnsType } from 'antd/es/table';
import request from '@/request';
import { formatPoolNos } from '@/utils/format';

const { RangePicker } = DatePicker;
interface IProps {
  data?: BasicSheetDataType[];
}
const LossSheet: React.FC = () => {
  const [sheetData, setSheetData]: [BasicSheetDataType[], any] = useState([]);
  const [dateRange, setDateRange]: [string[], any] = useState([
    // 默认当天前十五天数据
    dayjs().subtract(14, 'day').format('YYYY-MM-DD'),
    dayjs().format('YYYY-MM-DD'),
  ]);
  const [showLoading, setShowLoading] = useState(false);
  const [columns, setColumns]: [ColumnsType<BasicSheetDataType>, any] = useState([]);

  useEffect(() => {
    setShowLoading(true);
    request.sheet.clearLoss
      .getPoolLossSheetData({
        date: dateRange,
      })
      .then((res) => {
        const sheetData: BasicSheetDataType[] = getBasicSheetData(res.data, dateRange);
        setSheetData(sheetData);
      })
      .finally(() => setShowLoading(false));
  }, []);

  useEffect(() => {
    setColumns(getBasicSheetColumn(dateRange, sheetData.length));
  }, [sheetData]);

  const SearchBar: React.FC = () => {
    const onFinish = (values: IPoolBasicRangeSearchParams) => {
      setShowLoading(true);
      const dateArr = values.dateRange.map((value) => {
        return value.format('YYYY-MM-DD');
      });
      const poolNos = formatPoolNos(values.sitePool || []);
      request.sheet.clearLoss
        .getPoolLossSheetData({
          date: dateArr,
          poolNos,
        })
        .then((res) => {
          setDateRange(dateArr);
          const sheetData: BasicSheetDataType[] = getBasicSheetData(res.data, dateRange);
          setSheetData(sheetData);
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
          onClick={() => exportTableToExcel('feedlog-table', 'feedlog-table')}
        >
          导出
        </Button>
      </Form>
    );
  };

  const TableContainer = (props: IProps) => {
    const { data } = props;
    return (
      <div className="content-box">
        <Table
          dataSource={data}
          bordered
          pagination={{ pageSize: 100 }}
          size="small"
          scroll={{ x: 'max-content', y: 600 }}
          columns={columns}
          id="transfer-table"
          rowKey={'key'}
          title={() => {
            return `总共匹配到：${sheetData.length > 3 ? sheetData.length - 3 : sheetData.length}条数据`;
          }}
          loading={showLoading}
        />
      </div>
    );
  };

  return (
    <>
      <SearchBar />
      <TableContainer data={sheetData} />
    </>
  );
};
export default LossSheet;
