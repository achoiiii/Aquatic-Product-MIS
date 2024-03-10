import { formatDate } from '@/utils/formatDate';
import { ColumnsType } from 'antd/es/table';

export interface FeedSheetDataType {
  // 塘号
  poolNo: string;
  // 面积
  area?: number;
  // 数据key = 塘号
  key: string;
  // 每一天的数据
  dataList?: Array<any>;
  // 总投料
  totalFeed: number;
  // 总消耗
  totalLoss: number;
  // 总消耗重量
  totalLossWeight?: number;
}

export function getFeedSheetColumn(): ColumnsType<FeedSheetDataType> {
  const columnList: ColumnsType<FeedSheetDataType> = [
    {
      title: '塘号',
      dataIndex: 'poolNo',
      key: 'poolNo',
      align: 'center',
      fixed: 'left',
      // 合计行合并
      // TODO: 15其实是数据数组的length
      onCell: (_, index: number) => ({ colSpan: index >= 15 ? 2 : 1 }),
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
      onCell: (_, index: number) => ({ colSpan: index >= 15 ? 0 : 1 }),
    },
  ];
  let date = Date.now();
  // 生成具体行
  // Todo：真实数据
  for (let i = 0; i < 15; i++) {
    const dateStr = formatDate(date + 86400000 * i);
    columnList.push({
      title: dateStr,
      key: dateStr,
      align: 'center',
      width: 300,
      children: [
        {
          title: '当日新/老',
          dataIndex: ['dataList', i, `${'type' + i}`],
          key: `${'type' + i}`,
          align: 'center',
          width: 100,
        },
        {
          title: '饲料（kg）',
          dataIndex: ['dataList', i, `${'feed' + i}`],
          key: `${'feed' + i}`,
          align: 'center',
          width: 100,
        },
        {
          title: '损耗（尾）',
          dataIndex: ['dataList', i, `${'loss' + i}`],
          key: `${'loss' + i}`,
          align: 'center',
          width: 100,
        },
      ],
    });
  }
  // 生成合计行
  columnList.push({
    title: '半月合计',
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
export function getFeedSheetData() {
  let poolNo = 1101;
  const sheetData: FeedSheetDataType[] = [];
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
  function getType() {
    const flag = Math.random();
    if (flag > 0.5) return '新';
    return '老';
  }
  /**
   * 生成具体数据
   * Todo:真实数据
   * @returns DataType[]
   * */
  function getDateDetailData() {
    const dateDetailData: FeedSheetDataType[] = [];
    for (let i = 0; i < 15; i++) {
      const dataList: any = [];
      let totalFeed = 0;
      let totalLoss = 0;
      for (let j = 0; j < 15; j++) {
        const obj = {};
        const type = getType();
        const feed = poolNo + j * 100 + 1;
        const loss = poolNo + j * 10 + 2;
        obj[`${'type' + j}`] = type;
        obj[`${'feed' + j}`] = feed;
        obj[`${'loss' + j}`] = loss;
        dataList.push(obj);
        totalFeed += feed;
        totalLoss += loss;
        if (type === '新') {
          newTotalFeed += totalFeed;
          newTotalLoss += totalLoss;
        } else {
          oldTotalFeed += totalFeed;
          oldTotalLoss += totalLoss;
        }
      }
      allTotalFeed += totalFeed;
      allTotalLoss += totalLoss;
      dateDetailData.push({
        key: poolNo + '',
        poolNo: poolNo + '',
        dataList,
        totalFeed,
        totalLoss,
      });
      poolNo++;
    }
    return dateDetailData;
  }
  sheetData.push(...getDateDetailData());
  // 生成合计数据
  sheetData.push({
    key: '合计',
    poolNo: '合计',
    dataList: [],
    totalFeed: allTotalFeed,
    totalLoss: allTotalLoss,
    totalLossWeight: allTotalLossWeight,
  });
  // 生成本期新鳗数据
  sheetData.push({
    key: '本期新鳗',
    poolNo: '本期新鳗',
    dataList: [],
    totalFeed: newTotalFeed,
    totalLoss: newTotalLoss,
    totalLossWeight: newTotalLossWeight,
  });
  // 生成本期老鳗数据
  sheetData.push({
    key: '本期老鳗',
    poolNo: '本期老鳗',
    dataList: [],
    totalFeed: oldTotalFeed,
    totalLoss: oldTotalLoss,
    totalLossWeight: oldTotalLossWeight,
  });
  return sheetData;
}
