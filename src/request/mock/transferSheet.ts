import { formatDate } from '@/utils/format';
import { ColumnsType } from 'antd/es/table';
import { TransferSheetDataType } from '../sheet/typing';

export function getTransferSheetColumn(): ColumnsType<TransferSheetDataType> {
  const columnList: ColumnsType<TransferSheetDataType> = [
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
      onCell: (_, index: number) => ({ colSpan: index >= 15 ? 0 : 1 }),
      width: 100,
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
      children: [
        {
          title: '当日新/老',
          dataIndex: ['dataList', i, `${'type' + i}`],
          key: `${'type' + i}`,
          align: 'center',
          width: 100,
        },
        {
          title: '数量（尾）',
          dataIndex: ['dataList', i, `${'amount' + i}`],
          key: `${'amount' + i}`,
          align: 'center',
          width: 100,
        },
        {
          title: '重量（kg）',
          dataIndex: ['dataList', i, `${'weight' + i}`],
          key: `${'weight' + i}`,
          align: 'center',
          width: 100,
        },
      ],
      width: 300,
    });
  }
  // 生成合计行
  columnList.push({
    title: '半月合计',
    key: 'total',
    align: 'center',
    width: 200,
    children: [
      { title: '数量（尾）', dataIndex: 'totalAmount', key: 'totalAmount', align: 'center', width: 100 },
      { title: '重量（kg）', dataIndex: 'totalWeight', key: 'totalWeight', align: 'center', width: 100 },
    ],
  });
  return columnList;
}
export function getTransferSheetData() {
  let poolNo = 1101;
  const sheetData: TransferSheetDataType[] = [];
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
    const dateDetailData: TransferSheetDataType[] = [];
    for (let i = 0; i < 15; i++) {
      const dataList: any = [];
      let totalAmount = 0;
      let totalWeight = 0;
      for (let j = 0; j < 15; j++) {
        const type = getType();
        const obj = {};
        const amount = poolNo + j * 100 + 1;
        const weight = poolNo + j * 10 + 2;
        obj[`${'type' + j}`] = type;
        obj[`${'amount' + j}`] = amount;
        obj[`${'weight' + j}`] = weight;
        dataList.push(obj);
        totalAmount += amount;
        totalWeight += weight;
        if (type === '新') {
          newTotalAmount += totalAmount;
          newTotalWeight += totalWeight;
        } else {
          oldTotalAmount += totalAmount;
          oldTotalWeight += totalWeight;
        }
      }
      allTotalAmount += totalAmount;
      allTotalWeight += totalWeight;
      dateDetailData.push({
        key: poolNo + '',
        poolNo: poolNo + '',
        dataList,
        totalAmount,
        totalWeight,
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
    totalAmount: allTotalAmount,
    totalWeight: allTotalWeight,
  });
  // 生成本期新鳗数据
  sheetData.push({
    key: '本期新鳗',
    poolNo: '本期新鳗',
    dataList: [],
    totalAmount: newTotalAmount,
    totalWeight: newTotalWeight,
  });
  // 生成本期老鳗数据
  sheetData.push({
    key: '本期老鳗',
    poolNo: '本期老鳗',
    dataList: [],
    totalAmount: oldTotalAmount,
    totalWeight: oldTotalWeight,
  });
  return sheetData;
}
