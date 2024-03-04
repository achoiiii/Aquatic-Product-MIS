import { formatDate } from '@/utils/formatDate';
import { ColumnsType } from 'antd/es/table';

export interface TransferSummaryDataType {
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
  totalAmount: number;
  // 总消耗
  totalWeight: number;
}
export function getTransferSummaryColumn(): ColumnsType<TransferSummaryDataType> {
  const columnList: ColumnsType<TransferSummaryDataType> = [
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
        { title: '数量（尾）', dataIndex: ['dataList', i, `${'amount' + i}`], key: `${'amount' + i}`, align: 'center' },
        { title: '重量（kg）', dataIndex: ['dataList', i, `${'weight' + i}`], key: `${'weight' + i}`, align: 'center' },
      ],
    });
  }
  // 生成合计行
  columnList.push({
    title: '半月合计',
    key: 'total',
    align: 'center',
    children: [
      { title: '数量（尾）', dataIndex: 'totalAmount', key: 'totalAmount', align: 'center' },
      { title: '重量（kg）', dataIndex: 'totalWeight', key: 'totalWeight', align: 'center' },
    ],
  });
  return columnList;
}
/**
 * 生成具体数据
 * Todo:真实数据
 * @returns DataType[]
 * */
export function getTransferSummaryData() {
  let siteNo = 1;
  const sheetData: TransferSummaryDataType[] = [];
  // 合计的数量/重量
  let allTotalAmount = 0;
  let allTotalWeight = 0;
  // 新鳗的数量/重量
  let newTotalAmount = 0;
  let newTotalWeight = 0;
  // 老鳗的数量/重量
  let oldTotalAmount = 0;
  let oldTotalWeight = 0;
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
    const dateDetailData: TransferSummaryDataType[] = [];
    for (let i = 0; i < 18; i++) {
      const dataList: any = [];
      let totalAmount = 0;
      let totalWeight = 0;
      const type = getType(i);
      for (let j = 0; j < 18; j++) {
        const obj = {};
        const amount = siteNo + j * 100 + 1;
        const weight = siteNo + j * 10 + 2;
        obj[`${'amount' + j}`] = amount;
        obj[`${'weight' + j}`] = weight;
        dataList.push(obj);
        totalAmount += amount;
        totalWeight += weight;
      }
      allTotalAmount += totalAmount;
      allTotalWeight += totalWeight;
      if (type === '新') {
        newTotalAmount += totalAmount;
        newTotalWeight += totalWeight;
      } else {
        oldTotalAmount += totalAmount;
        oldTotalWeight += totalWeight;
      }
      dateDetailData.push({
        key: siteNo + Math.random().toString(),
        siteNo: siteNo + '',
        type,
        dataList,
        totalAmount,
        totalWeight,
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
    totalAmount: allTotalAmount,
    totalWeight: allTotalWeight,
  });
  // 生成本期新鳗数据
  sheetData.push({
    key: '本期新鳗',
    siteNo: '本期新鳗',
    dataList: [],
    totalAmount: newTotalAmount,
    totalWeight: newTotalWeight,
  });
  // 生成本期老鳗数据
  sheetData.push({
    key: '本期老鳗',
    siteNo: '本期老鳗',
    dataList: [],
    totalAmount: oldTotalWeight,
    totalWeight: oldTotalWeight,
  });
  return sheetData;
}
