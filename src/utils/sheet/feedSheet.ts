import { formatDate } from '@/utils/format';
import { ColumnsType } from 'antd/es/table';
import { FeedSheetDataType } from '../../request/sheet/typing';
import dayjs from 'dayjs';

export function getFeedSheetColumn(dateRange: string[], dataLength: number): ColumnsType<FeedSheetDataType> {
  const columnList: ColumnsType<FeedSheetDataType> = [
    {
      title: '塘号',
      dataIndex: 'poolNo',
      key: 'poolNo',
      align: 'center',
      fixed: 'left',
      // 合计行合并，sheetData包含最后三行合计数据，所以-3
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
      width: 100,
      onCell: (_, index: number) => ({ colSpan: index >= dataLength - 3 ? 0 : 1 }),
    },
  ];
  let date: any = new Date(dateRange[0]);
  const endDate: any = new Date(dateRange[1]);
  const diffDays = (endDate - date) / (1000 * 60 * 60 * 24) + 1;
  // 生成具体行
  for (let i = 0; i < diffDays; i++) {
    const dateStr = formatDate(date.valueOf() + 86400000 * i);
    columnList.push({
      title: dateStr,
      key: dateStr,
      align: 'center',
      width: 300,
      children: [
        {
          title: '当日新/老',
          dataIndex: ['dataMap', dayjs(date.valueOf() + 86400000 * i).format('YYYY-MM-DD'), `${'type'}`],
          key: `${'type' + i}`,
          align: 'center',
          width: 100,
          render: (type) => (type === 0 ? '空塘' : type === 1 ? '新' : type === 2 ? '老' : undefined),
        },
        {
          title: '饲料（kg）',
          dataIndex: ['dataMap', dayjs(date.valueOf() + 86400000 * i).format('YYYY-MM-DD'), `${'feed'}`],
          key: `${'feed' + i}`,
          align: 'center',
          width: 100,
        },
        {
          title: '损耗（尾）',
          dataIndex: ['dataMap', dayjs(date.valueOf() + 86400000 * i).format('YYYY-MM-DD'), `${'loss'}`],
          key: `${'loss' + i}`,
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
    width: 300,
    children: [
      { title: '饲料（kg）', dataIndex: 'totalFeed', key: 'totalFeed', align: 'center', width: 100 },
      { title: '损耗（尾）', dataIndex: 'totalLoss', key: 'totalLoss', align: 'center', width: 100 },
      { title: '损耗重量（kg）', dataIndex: 'totalLossWeight', key: 'totalLossWeight', align: 'center', width: 100 },
    ],
  });
  return columnList;
}
/**
 * 通过后端返回的数据计算合计数据
 * @param resData
 * @returns
 */
export function getFeedSheetData(resData: FeedSheetDataType[], dateRange: string[]) {
  const sheetData: FeedSheetDataType[] = resData;
  let date: any = new Date(dateRange[0]);
  const endDate: any = new Date(dateRange[1]);
  const diffDays = (endDate - date) / (1000 * 60 * 60 * 24) + 1;
  // 合计的投料量/损耗/损耗重量/dataMap
  let allTotalFeed = 0;
  let allTotalLoss = 0;
  let allTotalLossWeight = 0;
  let allTotalDataMap = {};
  // 新鳗的投料量/损耗/损耗重量/dataMap
  let newTotalFeed = 0;
  let newTotalLoss = 0;
  let newTotalLossWeight = 0;
  let newTotalDataMap = {};
  // 老鳗的投料量/损耗/损耗重量/dataMap
  let oldTotalFeed = 0;
  let oldTotalLoss = 0;
  let oldTotalLossWeight = 0;
  let oldTotalDataMap = {};
  // 构建dataMap对象
  for (let i = 0; i < diffDays; i++) {
    const dateStr = formatDate(date.valueOf() + 86400000 * i);
    allTotalDataMap[dateStr] = {
      loss: 0,
      feed: 0,
    };
    newTotalDataMap[dateStr] = {
      loss: 0,
      feed: 0,
    };
    oldTotalDataMap[dateStr] = {
      loss: 0,
      feed: 0,
    };
  }
  for (let i = 0; i < resData.length; i++) {
    // 获取dataMap中的日期，也就是key
    const resDataMapKeys = Object.keys(resData[i].dataMap);
    // 每个日期的数据都加到合计里面去
    for (let j = 0; j < resDataMapKeys.length; j++) {
      const date = resDataMapKeys[j];
      const detailItem = resData[i].dataMap[date];
      if (detailItem) {
        if (detailItem.type === 0) {
          newTotalFeed += detailItem.feed;
          newTotalLoss += detailItem.loss;
          newTotalLossWeight += detailItem.lossWeight;
          newTotalDataMap[date].feed += detailItem.feed;
          newTotalDataMap[date].loss += detailItem.loss;
        } else {
          oldTotalFeed += detailItem.feed;
          oldTotalLoss += detailItem.loss;
          oldTotalLossWeight += detailItem.lossWeight;
          oldTotalDataMap[date].feed += detailItem.feed;
          oldTotalDataMap[date].loss += detailItem.loss;
        }
        allTotalFeed += detailItem.feed;
        allTotalLoss += detailItem.loss;
        allTotalLossWeight += detailItem.lossWeight;
        allTotalDataMap[date].feed += detailItem.feed;
        allTotalDataMap[date].loss += detailItem.loss;
      }
    }
  }
  // 合计数据
  sheetData.push({
    key: '合计',
    poolNo: '合计',
    dataMap: allTotalDataMap,
    totalFeed: allTotalFeed,
    totalLoss: allTotalLoss,
    totalLossWeight: allTotalLossWeight,
  });
  // 本期新鳗数据
  sheetData.push({
    key: '本期新鳗',
    poolNo: '本期新鳗',
    dataMap: newTotalDataMap,
    totalFeed: newTotalFeed,
    totalLoss: newTotalLoss,
    totalLossWeight: newTotalLossWeight,
  });
  // 本期老鳗数据
  sheetData.push({
    key: '本期老鳗',
    poolNo: '本期老鳗',
    dataMap: oldTotalDataMap,
    totalFeed: oldTotalFeed,
    totalLoss: oldTotalLoss,
    totalLossWeight: oldTotalLossWeight,
  });
  return sheetData;
}
