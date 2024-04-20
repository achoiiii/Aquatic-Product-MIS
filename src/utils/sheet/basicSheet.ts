import { formatDate } from '@/utils/format';
import { ColumnsType } from 'antd/es/table';
import { BasicSheetDataType } from '../../request/sheet/typing';
import dayjs from 'dayjs';

export function getBasicSheetColumn(dateRange: string[], dataLength: number): ColumnsType<BasicSheetDataType> {
  const columnList: ColumnsType<BasicSheetDataType> = [
    {
      title: '塘号',
      dataIndex: 'poolNo',
      key: 'poolNo',
      align: 'center',
      fixed: 'left',
      // 合计行合并
      // TODO: 15其实是数据数组的length
      onCell: (_, index: number) => ({ colSpan: index >= dataLength - 3 ? 2 : 1 }),
      className: 'first-column',
      width: 100,
    },
    {
      title: '面积（亩）',
      dataIndex: 'area',
      key: 'area',
      align: 'center',
      fixed: 'left',
      onCell: (_, index: number) => ({ colSpan: index >= dataLength - 3 ? 0 : 1 }),
      width: 100,
    },
  ];
  let date: any = new Date(dateRange[0]);
  const endDate: any = new Date(dateRange[1]);
  const diffDays = (endDate - date) / (1000 * 60 * 60 * 24) + 1;
  // 生成具体行
  // Todo：真实数据
  for (let i = 0; i < diffDays; i++) {
    const dateStr = formatDate(date.valueOf() + 86400000 * i);
    columnList.push({
      title: dateStr,
      key: dateStr,
      width: 300,
      align: 'center',
      children: [
        {
          title: '当日新/老',
          dataIndex: ['dataMap', dayjs(date.valueOf() + 86400000 * i).format('YYYY-MM-DD'), 'type'],
          key: `${'type' + i}`,
          align: 'center',
          width: 100,
          render: (type) => (type === 0 ? '空塘' : type === 1 ? '新' : type === 2 ? '老' : undefined),
        },
        {
          title: '数量（尾）',
          dataIndex: ['dataMap', dayjs(date.valueOf() + 86400000 * i).format('YYYY-MM-DD'), 'quantity'],
          key: `${'quantity' + i}`,
          align: 'center',
          width: 100,
        },
        {
          title: '重量（kg）',
          dataIndex: ['dataMap', dayjs(date.valueOf() + 86400000 * i).format('YYYY-MM-DD'), 'weight'],
          key: `${'weight' + i}`,
          align: 'center',
          width: 100,
        },
      ],
    });
  }
  // 生成合计行
  columnList.push({
    title: '合计',
    key: 'total',
    align: 'center',
    width: 200,
    children: [
      { title: '数量（尾）', dataIndex: 'totalQuantity', key: 'totalQuantity', align: 'center', width: 100 },
      { title: '重量（kg）', dataIndex: 'totalWeight', key: 'totalWeight', align: 'center', width: 100 },
    ],
  });
  return columnList;
}
/**
 * 通过后端返回的数据计算合计数据
 * @param resData
 * @returns
 */
export function getBasicSheetData(resData: BasicSheetDataType[], dateRange: string[]) {
  const sheetData: BasicSheetDataType[] = resData;
  let date: any = new Date(dateRange[0]);
  const endDate: any = new Date(dateRange[1]);
  const diffDays = (endDate - date) / (1000 * 60 * 60 * 24) + 1;
  // 合计的数量/重量
  let allTotalQuantity = 0;
  let allTotalWeight = 0;
  let allTotalDataMap = {};
  // 新鳗的数量/重量
  let newTotalQuantity = 0;
  let newTotalWeight = 0;
  let newTotalDataMap = {};
  // 老鳗的数量/重量
  let oldTotalQuantity = 0;
  let oldTotalWeight = 0;
  let oldTotalDataMap = {};
  // 构建dataMap对象
  for (let i = 0; i < diffDays; i++) {
    const dateStr = formatDate(date.valueOf() + 86400000 * i);
    allTotalDataMap[dateStr] = {
      quantity: 0,
      weight: 0,
    };
    newTotalDataMap[dateStr] = {
      quantity: 0,
      weight: 0,
    };
    oldTotalDataMap[dateStr] = {
      quantity: 0,
      weight: 0,
    };
  }
  for (let i = 0; i < resData.length; i++) {
    // 获取dataMap中的日期，也就是key
    const resDataMapKeys = Object.keys(resData[i].dataMap);
    for (let j = 0; j < resDataMapKeys.length; j++) {
      const date = resDataMapKeys[j];
      const detailItem = resData[i].dataMap[date];
      if (detailItem) {
        if (detailItem.type === 1) {
          newTotalQuantity += detailItem.quantity;
          newTotalWeight += detailItem.weight;
          newTotalDataMap[date].quantity += detailItem.quantity;
          newTotalDataMap[date].weight += detailItem.weight;
        } else if (detailItem.type === 2) {
          oldTotalQuantity += detailItem.quantity;
          oldTotalWeight += detailItem.weight;
          oldTotalDataMap[date].quantity += detailItem.quantity;
          oldTotalDataMap[date].weight += detailItem.weight;
        }
        allTotalQuantity += detailItem.quantity;
        allTotalWeight += detailItem.weight;
        allTotalDataMap[date].quantity += detailItem.quantity;
        allTotalDataMap[date].weight += detailItem.weight;
      }
    }
  }
  // 合计数据
  sheetData.push({
    key: '合计',
    poolNo: '合计',
    dataMap: allTotalDataMap,
    totalQuantity: allTotalQuantity,
    totalWeight: allTotalWeight,
  });
  // 本期新鳗数据
  sheetData.push({
    key: '本期新鳗',
    poolNo: '本期新鳗',
    dataMap: newTotalDataMap,
    totalQuantity: newTotalQuantity,
    totalWeight: newTotalWeight,
  });
  // 本期老鳗数据
  sheetData.push({
    key: '本期老鳗',
    poolNo: '本期老鳗',
    dataMap: oldTotalDataMap,
    totalQuantity: oldTotalQuantity,
    totalWeight: oldTotalWeight,
  });
  return sheetData;
}
