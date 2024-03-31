import { ColumnsType } from 'antd/es/table';
import { store } from '@/store';

export interface PoolSummaryDataType {
  // 场号
  poolNo: string;
  // 面积
  area?: number;
  // 类别
  beginType?: 0 | 1;
  // 类别
  endType?: 0 | 1;
  // key
  key: string;
  // 期初数
  beginning: {
    // 规格
    size?: number;
    // 数量
    amount: number;
    // 重量
    weight: number;
  };
  // 本期喂料增重
  feedGainWeight: {
    // 饲料
    feed: number;
    // 系数
    coefficient: number | '';
    // 增重
    gainWeight: number;
  };
  // 新苗投塘
  newSeedLings: {
    // 规格
    size: number | '';
    // 数量
    amount: number;
    // 重量
    weight: number;
  };
  // 本期发生
  happenedInPeriod: {
    // 分进分出
    transfer: {
      // 进出
      outOrIn: string;
      // 来源/去向
      comeFrom: string;
      // 数量
      amount: number;
      // 重量
      weight: number;
    };
    // 活鳗出售
    summarySale: {
      // 规格
      size: number | '';
      // 数量
      amount: number;
      // 重量
      weight: number;
    };
    // A鳗出售
    saleA: {
      // 数量
      amount: number;
      // 重量
      weight: number;
    };
  };
  // 日常损耗
  dailyLoss: {
    // 数量
    amount: number;
    // 重量
    weight: number;
  };
  // 清塘亏损
  cleanLoss: {
    // 数量
    amount: number;
    // 重量
    weight: number;
  };
  // 期末存塘
  ending: {
    // 规格
    size: number | '';
    // 数量
    amount: number;
    // 重量
    weight: number;
  };
}
export function getPoolSummaryColumn(resDataLength) {
  const columnList: ColumnsType<PoolSummaryDataType> = [
    {
      title: '塘号',
      dataIndex: 'poolNo',
      key: 'poolNo',
      align: 'center',
      fixed: 'left',
      // 合计行合并
      // TODO: 15其实是数据数组的length
      onCell: (_, index: number) => ({
        colSpan: index >= resDataLength - 3 ? 4 : 1,
      }),
      className: 'first-column',
      width: '50px',
    },
    {
      title: '面积（亩）',
      dataIndex: 'area',
      key: 'area',
      align: 'center',
      fixed: 'left',
      onCell: (_, index: number) => ({
        colSpan: index >= resDataLength - 3 ? 0 : 1,
      }),
      width: '100px',
    },
    {
      title: '期初新/老',
      dataIndex: 'beginType',
      key: 'beginType',
      align: 'center',
      fixed: 'left',
      onCell: (_, index: number) => ({ colSpan: index >= resDataLength - 3 ? 0 : 1 }),
      width: '50px',
      render: (value) => (value === 0 ? '新' : '老'),
    },
    {
      title: '期末新/老',
      dataIndex: 'endType',
      key: 'beginType',
      align: 'center',
      fixed: 'left',
      onCell: (_, index: number) => ({ colSpan: index >= resDataLength - 3 ? 0 : 1 }),
      width: '50px',
      render: (value) => (value === 0 ? '新' : '老'),
    },
    {
      title: '期初数',
      key: '期初数',
      align: 'center',
      children: [
        {
          title: '规格',
          dataIndex: ['beginning', 'size'],
          key: 'beginningSize',
          align: 'center',
          render: (value) => {
            if (typeof value === 'number') return value.toFixed(1);
            return value;
          },
        },
        { title: '数量（尾）', dataIndex: ['beginning', 'amount'], key: 'beginningAmount', align: 'center' },
        { title: '重量（kg）', dataIndex: ['beginning', 'weight'], key: 'beginningWeight', align: 'center' },
      ],
    },
    {
      title: '本期喂料增重',
      key: '本期喂料增重',
      align: 'center',
      children: [
        { title: '饲料（kg）', dataIndex: ['feedGainWeight', 'feed'], key: 'feedGainWeightFeed', align: 'center' },
        {
          title: '系数',
          dataIndex: ['feedGainWeight', 'coefficient'],
          key: 'feedGainWeightCoefficient',
          align: 'center',
        },
        {
          title: '增重（kg）',
          dataIndex: ['feedGainWeight', 'gainWeight'],
          key: 'feedGainWeightGainWeight',
          align: 'center',
        },
      ],
    },
    {
      title: '新苗投塘',
      key: '新苗投塘',
      align: 'center',
      children: [
        {
          title: '规格',
          dataIndex: ['newSeedLings', 'size'],
          key: 'newSeedLingsSize',
          align: 'center',
          render: (value) => {
            if (typeof value === 'number') return value.toFixed(1);
            return value;
          },
        },
        { title: '数量（尾）', dataIndex: ['newSeedLings', 'amount'], key: 'newSeedLingsAmount', align: 'center' },
        { title: '重量（kg）', dataIndex: ['newSeedLings', 'weight'], key: 'newSeedLingsWeight', align: 'center' },
      ],
    },
    {
      title: '本期发生',
      key: '本期发生',
      align: 'center',
      children: [
        {
          title: '分进分出',
          key: '分进分出',
          align: 'center',
          children: [
            {
              title: '±',
              dataIndex: ['happenedInPeriod', 'transfer', 'outOrIn'],
              key: 'happenedInPeriodTransferOutOrIn',
              align: 'center',
            },
            {
              title: '来源去向',
              dataIndex: ['happenedInPeriod', 'transfer', 'comeFrom'],
              key: 'happenedInPeriodTransferComeFrom',
              align: 'center',
            },
            {
              title: '数量',
              dataIndex: ['happenedInPeriod', 'transfer', 'amount'],
              key: 'happenedInPeriodTransferAmount',
              align: 'center',
            },
            {
              title: '重量（kg）',
              dataIndex: ['happenedInPeriod', 'transfer', 'weight'],
              key: 'happenedInPeriodTransferWeight',
              align: 'center',
            },
          ],
        },
        {
          title: '活鳗出售',
          key: '活鳗出售',
          align: 'center',
          children: [
            {
              title: '规格',
              dataIndex: ['happenedInPeriod', 'summarySale', 'size'],
              key: 'happenedInPeriodSaleSize',
              align: 'center',
              render: (value) => {
                if (typeof value === 'number') return value.toFixed(1);
                return value;
              },
            },
            {
              title: '数量',
              dataIndex: ['happenedInPeriod', 'summarySale', 'amount'],
              key: 'happenedInPeriodSaleAmount',
              align: 'center',
            },
            {
              title: '重量（kg）',
              dataIndex: ['happenedInPeriod', 'summarySale', 'weight'],
              key: 'happenedInPeriodSaleWeight',
              align: 'center',
            },
          ],
        },
        {
          title: 'A鳗出售',
          key: 'A鳗出售',
          align: 'center',
          children: [
            {
              title: '数量',
              dataIndex: ['happenedInPeriod', 'saleA', 'amount'],
              key: 'happenedInPeriodSaleAAmount',
              align: 'center',
            },
            {
              title: '重量（kg）',
              dataIndex: ['happenedInPeriod', 'saleA', 'weight'],
              key: 'happenedInPeriodSaleAWeight',
              align: 'center',
            },
          ],
        },
      ],
    },
    {
      title: '日常损耗',
      key: '日常损耗',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: ['dailyLoss', 'amount'], key: 'dailyLossAmount', align: 'center' },
        { title: '重量（kg）', dataIndex: ['dailyLoss', 'weight'], key: 'dailyLossWeight', align: 'center' },
      ],
    },
    {
      title: '清塘亏损',
      key: '清塘亏损',
      align: 'center',
      children: [
        { title: '数量（尾）', dataIndex: ['cleanLoss', 'amount'], key: 'cleanLossAmount', align: 'center' },
        { title: '重量（kg）', dataIndex: ['cleanLoss', 'weight'], key: 'cleanLossWeight', align: 'center' },
      ],
    },
    {
      title: '期末存储',
      key: '期末存储',
      align: 'center',
      children: [
        {
          title: '规格',
          dataIndex: ['ending', 'size'],
          key: 'endingSize',
          align: 'center',
          render: (value) => {
            if (typeof value === 'number') return value.toFixed(1);
            return value;
          },
        },
        { title: '数量（尾）', dataIndex: ['ending', 'amount'], key: 'endingAmount', align: 'center' },
        { title: '重量（kg）', dataIndex: ['ending', 'weight'], key: 'endingWeight', align: 'center' },
      ],
    },
  ];
  return columnList;
}

export function getPoolSummaryData(resData: PoolSummaryDataType[]) {
  const { newCoefficient, oldCoefficient } = store.getState().app;
  const sheetData: PoolSummaryDataType[] = resData;
  // 期初数的合计数量/重量
  let totalBeginningAmount = 0;
  let totalBeginningWeight = 0;
  let oldBeginningAmount = 0;
  let newBeginningAmount = 0;
  let oldBeginningWeight = 0;
  let newBeginningWeight = 0;
  // 本期喂料增重的合计饲料/增重量
  let totalFeed = 0;
  let totalGainWeight = 0;
  let oldFeed = 0;
  let newFeed = 0;
  let oldGainWeight = 0;
  let newGainWeight = 0;
  // 新苗投塘的合计数量/重量
  let totalNewSeedlingsAmount = 0;
  let totalNewSeedlingsWeight = 0;
  let newNewSeedlingsAmount = 0;
  let oldNewSeedlingsAmount = 0;
  let newNewSeedlingsWeight = 0;
  let oldNewSeedlingsWeight = 0;
  // 分进分出的的合计数量/重量
  let totalTransferAmount = 0;
  let totalTransferWeight = 0;
  let oldTransferAmount = 0;
  let newTransferAmount = 0;
  let oldTransferWeight = 0;
  let newTransferWeight = 0;
  // 活鳗出售的合计数量/重量
  let totalSaleAmount = 0;
  let totalSaleWeight = 0;
  let oldSaleAmount = 0;
  let newSaleAmount = 0;
  let oldSaleWeight = 0;
  let newSaleWeight = 0;
  // A鳗出售的合计数量/重量
  let totalSaleAAmount = 0;
  let totalSaleAWeight = 0;
  let newSaleAAmount = 0;
  let oldSaleAAmount = 0;
  let newSaleAWeight = 0;
  let oldSaleAWeight = 0;
  // 日常损耗的合计数量/重量
  let totalDailyLossAmount = 0;
  let totalDailyLossWeight = 0;
  let newDailyLossAmount = 0;
  let oldDailyLossAmount = 0;
  let newDailyLossWeight = 0;
  let oldDailyLossWeight = 0;
  // 清塘损耗的合计数量/重量
  let totalCleanLossAmount = 0;
  let totalCleanLossWeight = 0;
  let oldCleanLossAmount = 0;
  let newCleanLossAmount = 0;
  let oldCleanLossWeight = 0;
  let newCleanLossWeight = 0;
  // 期末存塘的合计数量/重量
  let totalEndingAmount = 0;
  let totalEndingWeight = 0;
  let newEndingAmount = 0;
  let oldEndingAmount = 0;
  let newEndingWeight = 0;
  let oldEndingWeight = 0;
  if (resData) {
    for (let i = 0; i < resData.length; i++) {
      const item = resData[i];
      totalBeginningAmount += item.beginning.amount;
      totalBeginningWeight += item.beginning.weight;
      totalFeed += item.feedGainWeight.feed;
      totalGainWeight += item.feedGainWeight.gainWeight;
      totalNewSeedlingsAmount += item.newSeedLings.amount;
      totalNewSeedlingsWeight += item.newSeedLings.weight;
      totalTransferAmount += item.happenedInPeriod.transfer.amount;
      totalTransferWeight += item.happenedInPeriod.transfer.weight;
      totalSaleAmount += item.happenedInPeriod.summarySale?.amount;
      totalSaleWeight += item.happenedInPeriod.summarySale?.weight;
      totalSaleAAmount += item.happenedInPeriod.saleA.amount;
      totalSaleAWeight += item.happenedInPeriod.saleA.weight;
      totalDailyLossAmount += item.dailyLoss.amount;
      totalDailyLossWeight += item.dailyLoss.weight;
      totalCleanLossAmount += item.cleanLoss.amount;
      totalCleanLossWeight += item.cleanLoss.weight;
      totalEndingAmount += item.ending.amount;
      totalEndingWeight += item.ending.weight;

      if (item.beginType === 0) {
        newBeginningAmount += item.beginning.amount;
        newBeginningWeight += item.beginning.weight;
        newFeed += item.feedGainWeight.feed;
        newGainWeight += item.feedGainWeight.gainWeight;
        newNewSeedlingsAmount += item.newSeedLings.amount;
        newNewSeedlingsWeight += item.newSeedLings.weight;
        newTransferAmount += item.happenedInPeriod.transfer.amount;
        newTransferWeight += item.happenedInPeriod.transfer.weight;
        newSaleAmount += item.happenedInPeriod.summarySale?.amount;
        newSaleWeight += item.happenedInPeriod.summarySale?.weight;
        newSaleAAmount += item.happenedInPeriod.saleA.amount;
        newSaleAWeight += item.happenedInPeriod.saleA.weight;
        newDailyLossAmount += item.dailyLoss.amount;
        newDailyLossWeight += item.dailyLoss.weight;
        newCleanLossAmount += item.cleanLoss.amount;
        newCleanLossWeight += item.cleanLoss.weight;
        newEndingAmount += item.ending.amount;
        newEndingWeight += item.ending.weight;
      } else {
        oldBeginningAmount += item.beginning.amount;
        oldBeginningWeight += item.beginning.weight;
        oldFeed += item.feedGainWeight.feed;
        oldGainWeight += item.feedGainWeight.gainWeight;
        oldNewSeedlingsAmount += item.newSeedLings.amount;
        oldNewSeedlingsWeight += item.newSeedLings.weight;
        oldTransferAmount += item.happenedInPeriod.transfer.amount;
        oldTransferWeight += item.happenedInPeriod.transfer.weight;
        oldSaleAmount += item.happenedInPeriod.summarySale?.amount;
        oldSaleWeight += item.happenedInPeriod.summarySale?.weight;
        oldSaleAAmount += item.happenedInPeriod.saleA.amount;
        oldSaleAWeight += item.happenedInPeriod.saleA.weight;
        oldDailyLossAmount += item.dailyLoss.amount;
        oldDailyLossWeight += item.dailyLoss.weight;
        oldCleanLossAmount += item.cleanLoss.amount;
        oldCleanLossWeight += item.cleanLoss.weight;
        oldEndingAmount += item.ending.amount;
        oldEndingWeight += item.ending.weight;
      }
    }
  }

  sheetData.push({
    poolNo: '合计',
    key: '合计',
    beginning: {
      amount: totalBeginningAmount,
      weight: totalBeginningAmount,
    },
    feedGainWeight: {
      feed: totalFeed,
      coefficient: '',
      gainWeight: totalGainWeight,
    },
    newSeedLings: {
      size: '',
      amount: totalNewSeedlingsAmount,
      weight: totalNewSeedlingsWeight,
    },
    happenedInPeriod: {
      transfer: {
        outOrIn: '',
        comeFrom: '',
        amount: totalTransferAmount,
        weight: totalTransferWeight,
      },
      summarySale: {
        size: '',
        amount: totalSaleAmount,
        weight: totalSaleWeight,
      },
      saleA: {
        amount: totalSaleAAmount,
        weight: totalSaleAWeight,
      },
    },
    dailyLoss: {
      amount: totalDailyLossAmount,
      weight: totalDailyLossWeight,
    },
    cleanLoss: {
      amount: totalCleanLossAmount,
      weight: totalCleanLossWeight,
    },
    ending: {
      size: '',
      amount: totalEndingAmount,
      weight: totalEndingWeight,
    },
  });

  sheetData.push({
    poolNo: '本期新鳗',
    key: '本期新鳗',
    beginning: {
      amount: newBeginningAmount,
      weight: newBeginningAmount,
    },
    feedGainWeight: {
      feed: newFeed,
      coefficient: newCoefficient,
      gainWeight: newGainWeight,
    },
    newSeedLings: {
      size: '',
      amount: newNewSeedlingsAmount,
      weight: newNewSeedlingsWeight,
    },
    happenedInPeriod: {
      transfer: {
        outOrIn: '',
        comeFrom: '',
        amount: newTransferAmount,
        weight: newTransferWeight,
      },
      summarySale: {
        size: '',
        amount: newSaleAmount,
        weight: newSaleWeight,
      },
      saleA: {
        amount: newSaleAAmount,
        weight: newSaleAWeight,
      },
    },
    dailyLoss: {
      amount: newDailyLossAmount,
      weight: newDailyLossWeight,
    },
    cleanLoss: {
      amount: newCleanLossAmount,
      weight: newCleanLossWeight,
    },
    ending: {
      size: '',
      amount: newEndingAmount,
      weight: newEndingWeight,
    },
  });

  sheetData.push({
    poolNo: '本期老鳗',
    key: '本期老鳗',
    beginning: {
      amount: oldBeginningAmount,
      weight: oldBeginningAmount,
    },
    feedGainWeight: {
      feed: oldFeed,
      coefficient: oldCoefficient,
      gainWeight: oldGainWeight,
    },
    newSeedLings: {
      size: '',
      amount: oldNewSeedlingsAmount,
      weight: oldNewSeedlingsWeight,
    },
    happenedInPeriod: {
      transfer: {
        outOrIn: '',
        comeFrom: '',
        amount: oldTransferAmount,
        weight: oldTransferWeight,
      },
      summarySale: {
        size: '',
        amount: oldSaleAmount,
        weight: oldSaleWeight,
      },
      saleA: {
        amount: oldSaleAAmount,
        weight: oldSaleAWeight,
      },
    },
    dailyLoss: {
      amount: oldDailyLossAmount,
      weight: oldDailyLossWeight,
    },
    cleanLoss: {
      amount: oldCleanLossAmount,
      weight: oldCleanLossWeight,
    },
    ending: {
      size: '',
      amount: oldEndingAmount,
      weight: oldEndingWeight,
    },
  });

  return sheetData;
}
