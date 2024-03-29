import { formatDate } from '@/utils/format';
import { ColumnsType } from 'antd/es/table';

export interface FeedSummaryDataType {
  // 场号
  siteNo: string;
  // 类别
  type?: '新' | '老';
  // 面积
  area?: number;
  // key
  key: string;
  // 每一天的数据
  dataList: Array<any>;
  // 总投料
  totalFeed: number;
  // 总消耗
  totalLoss: number;
  // 总消耗重量
  totalLossWeight?: number;
}
export function getFeedSummaryColumn(): ColumnsType<FeedSummaryDataType> {
  const columnList: ColumnsType<FeedSummaryDataType> = [
    {
      title: '场号',
      dataIndex: 'siteNo',
      key: 'siteNo',
      align: 'center',
      fixed: 'left',
      // 合计行合并
      // TODO: 15其实是数据数组的length
      onCell: (_, index: number) => ({
        colSpan: index >= 18 ? 3 : 1,
        rowSpan: index >= 18 ? 1 : index % 2 === 0 ? 2 : 0,
      }),
      className: 'first-column',
    },
    {
      title: '面积（亩）',
      dataIndex: 'area',
      key: 'area',
      align: 'center',
      fixed: 'left',
      onCell: (_, index: number) => ({
        colSpan: index >= 18 ? 0 : 1,
        rowSpan: index >= 18 ? 1 : index % 2 === 0 ? 2 : 0,
      }),
    },
    {
      title: '新/老',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      fixed: 'left',
      onCell: (_, index: number) => ({ colSpan: index >= 18 ? 0 : 1 }),
    },
  ];
  let date = Date.now();
  // 生成具体行
  // Todo：真实数据
  for (let i = 0; i < 18; i++) {
    const dateStr = formatDate(date + 86400000 * i);
    columnList.push({
      title: dateStr,
      key: dateStr,
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: ['dataList', i, `${'feed' + i}`], key: `${'feed' + i}`, align: 'center' },
        { title: '损耗（尾）', dataIndex: ['dataList', i, `${'loss' + i}`], key: `${'loss' + i}`, align: 'center' },
      ],
    });
  }
  // 生成合计行
  columnList.push({
    title: '半月合计',
    key: 'total',
    align: 'center',
    children: [
      { title: '饲料（kg）', dataIndex: 'totalFeed', key: 'totalFeed', align: 'center' },
      { title: '损耗（尾）', dataIndex: 'totalLoss', key: 'totalLoss', align: 'center' },
      { title: '损耗重量（kg）', dataIndex: 'totalLossWeight', key: 'totalLossWeight', align: 'center' },
    ],
  });
  return columnList;
}
/**
 * 生成具体数据
 * Todo:真实数据
 * @returns DataType[]
 * */
export function getFeedSummaryData() {
  let siteNo = 1;
  const sheetData: FeedSummaryDataType[] = [];
  // 合计的投料量/损耗/损耗重量
  let allTotalFeed = 0;
  let allTotalLoss = 0;
  let allTotalLossWeight = 0;
  // 新鳗的投料量/损耗/损耗重量
  let newTotalFeed = 0;
  let newTotalLoss = 0;
  let newTotalLossWeight = 0;
  // 老鳗的投料量/损耗/损耗重量
  let oldTotalFeed = 0;
  let oldTotalLoss = 0;
  let oldTotalLossWeight = 0;
  /**
   * 随机生成新老
   * @returns '新' | '老'
   */
  function getType(index) {
    if (index % 2 === 0) return '新';
    return '老';
  }
  /**
   * 生成具体数据
   * Todo:真实数据
   * @returns DataType[]
   * */
  function getDateDetailData() {
    const dateDetailData: FeedSummaryDataType[] = [];
    for (let i = 0; i < 18; i++) {
      const dataList: any = [];
      let totalFeed = 0;
      let totalLoss = 0;
      const type = getType(i);
      for (let j = 0; j < 18; j++) {
        const obj = {};
        const feed = siteNo + j * 100 + 1;
        const loss = siteNo + j * 10 + 2;
        obj[`${'feed' + j}`] = feed;
        obj[`${'loss' + j}`] = loss;
        dataList.push(obj);
        totalFeed += feed;
        totalLoss += loss;
      }
      allTotalFeed += totalFeed;
      allTotalLoss += totalLoss;
      if (type === '新') {
        newTotalFeed += totalFeed;
        newTotalLoss += totalLoss;
      } else {
        oldTotalFeed += totalFeed;
        oldTotalLoss += totalLoss;
      }
      dateDetailData.push({
        key: siteNo + Math.random().toString(),
        siteNo: siteNo + '',
        type,
        dataList,
        totalFeed,
        totalLoss,
      });
      if (i % 2 !== 0) {
        siteNo++;
      }
    }
    return dateDetailData;
  }
  sheetData.push(...getDateDetailData());
  // 生成合计数据
  sheetData.push({
    key: '合计',
    siteNo: '合计',
    dataList: [],
    totalFeed: allTotalFeed,
    totalLoss: allTotalLoss,
    totalLossWeight: allTotalLossWeight,
  });
  // 生成本期新鳗数据
  sheetData.push({
    key: '本期新鳗',
    siteNo: '本期新鳗',
    dataList: [],
    totalFeed: newTotalFeed,
    totalLoss: newTotalLoss,
    totalLossWeight: newTotalLossWeight,
  });
  // 生成本期老鳗数据
  sheetData.push({
    key: '本期老鳗',
    siteNo: '本期老鳗',
    dataList: [],
    totalFeed: oldTotalFeed,
    totalLoss: oldTotalLoss,
    totalLossWeight: oldTotalLossWeight,
  });
  return sheetData;
}
