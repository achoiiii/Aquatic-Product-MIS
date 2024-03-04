import { store } from '@/store';
import { ColumnsType } from 'antd/es/table';

export interface SummaryDataType {
  // 场号
  siteNo: string;
  // 面积
  area?: number;
  // 类别
  type?: '新' | '老';
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
  newSeedlings: {
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
    sale: {
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
export function getSummaryColumn() {
  const columnList: ColumnsType<SummaryDataType> = [
    {
      title: '塘号',
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
      width: '50px',
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
      width: '100px',
    },
    {
      title: '新/老',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      fixed: 'left',
      onCell: (_, index: number) => ({ colSpan: index >= 18 ? 0 : 1 }),
      width: '50px',
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
        { title: '规格', dataIndex: ['newSeedlings', 'size'], key: 'newSeedlingsSize', align: 'center' },
        { title: '数量（尾）', dataIndex: ['newSeedlings', 'amount'], key: 'newSeedlingsAmount', align: 'center' },
        { title: '重量（kg）', dataIndex: ['newSeedlings', 'weight'], key: 'newSeedlingsWeight', align: 'center' },
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
              dataIndex: ['happenedInPeriod', 'sale', 'size'],
              key: 'happenedInPeriodSaleSize',
              align: 'center',
            },
            {
              title: '数量',
              dataIndex: ['happenedInPeriod', 'sale', 'amount'],
              key: 'happenedInPeriodSaleAmount',
              align: 'center',
            },
            {
              title: '重量（kg）',
              dataIndex: ['happenedInPeriod', 'sale', 'weight'],
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
        { title: '规格', dataIndex: ['ending', 'size'], key: 'endingSize', align: 'center' },
        { title: '数量（尾）', dataIndex: ['ending', 'amount'], key: 'endingAmount', align: 'center' },
        { title: '重量（kg）', dataIndex: ['ending', 'weight'], key: 'endingWeight', align: 'center' },
      ],
    },
  ];
  return columnList;
}

export function getSummaryData() {
  const { oldCoefficient, newCoefficient } = store.getState().app;
  const sheetData: SummaryDataType[] = [];
  let siteNo = 1;
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
  /**
   * 随机生成新老
   * @returns '新' | '老'
   */
  function getType(index) {
    if (index % 2 === 0) return '新';
    return '老';
  }
  /**
   * 生成随机数
   * @returns number
   */
  function getRandom(min, max?) {
    if (!max) max = 0;
    if (min > max) {
      [min, max] = [max, min];
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  for (let i = 0; i < 18; i++) {
    // 生成假数据
    // TODO：真数据替换
    const type = getType(i);
    const beginningAmount = getRandom(600000);
    const beginningWeight = getRandom(100000);
    const beginningSize = Number((beginningAmount / beginningWeight).toFixed(1));
    const feedGainWeightFeed = getRandom(40000);
    const feedGainWeightCoefficient = type === '新' ? oldCoefficient : newCoefficient;
    const feedGainWeightGainWeight = Math.ceil(feedGainWeightFeed * feedGainWeightCoefficient);
    const newSeedlingsAmount = 0;
    const newSeedlingsWeight = 0;
    const newSeedlingsSize = 0;
    const happenedInPeriodTransferOutOrIn = '';
    const happenedInPeriodTransferComeFrom = '';
    const happenedInPeriodTransferAmount = getRandom(-80000, 80000);
    const happenedInPeriodTransferWeight = getRandom(6000);
    const happenedInPeriodSaleAmount = getRandom(110000);
    const happenedInPeriodSaleWeight = getRandom(50000);
    const happenedInPeriodSaleSize = Number((happenedInPeriodSaleAmount / happenedInPeriodSaleWeight).toFixed(1));
    const happenedInPeriodSaleAAmount = getRandom(2000);
    const happenedInPeriodSaleAWeight = getRandom(300);
    const dailyLossAmount = getRandom(600);
    const dailyLossWeight = getRandom(500);
    const cleanLossAmount = getRandom(30000);
    const cleanLossWeight = getRandom(20000);
    const endingAmount = getRandom(700000);
    const endingWeight = getRandom(200000);
    const endingSize = Number((endingAmount / endingWeight).toFixed(1));

    const data: SummaryDataType = {
      siteNo: siteNo + '',
      type,
      beginning: {
        amount: beginningAmount,
        size: beginningWeight,
        weight: beginningSize,
      },
      key: siteNo + '' + type,
      feedGainWeight: {
        feed: feedGainWeightFeed,
        coefficient: feedGainWeightCoefficient,
        gainWeight: feedGainWeightGainWeight,
      },
      newSeedlings: {
        size: newSeedlingsSize,
        amount: newSeedlingsAmount,
        weight: newSeedlingsWeight,
      },
      happenedInPeriod: {
        transfer: {
          outOrIn: happenedInPeriodTransferOutOrIn,
          comeFrom: happenedInPeriodTransferComeFrom,
          amount: happenedInPeriodTransferAmount,
          weight: happenedInPeriodTransferWeight,
        },
        sale: {
          size: happenedInPeriodSaleSize,
          amount: happenedInPeriodSaleAmount,
          weight: happenedInPeriodSaleWeight,
        },
        saleA: {
          amount: happenedInPeriodSaleAAmount,
          weight: happenedInPeriodSaleAWeight,
        },
      },
      dailyLoss: {
        amount: dailyLossAmount,
        weight: dailyLossWeight,
      },
      cleanLoss: {
        amount: cleanLossAmount,
        weight: cleanLossWeight,
      },
      ending: {
        size: endingSize,
        amount: endingAmount,
        weight: endingWeight,
      },
    };
    sheetData.push(data);

    totalBeginningAmount += beginningAmount;
    totalBeginningWeight += beginningWeight;
    totalFeed += feedGainWeightFeed;
    totalGainWeight += feedGainWeightGainWeight;
    totalNewSeedlingsAmount += newSeedlingsAmount;
    totalNewSeedlingsWeight += newSeedlingsWeight;
    totalTransferAmount += happenedInPeriodTransferAmount;
    totalTransferWeight += happenedInPeriodTransferWeight;
    totalSaleAmount += happenedInPeriodSaleAmount;
    totalSaleWeight += happenedInPeriodSaleWeight;
    totalSaleAAmount += happenedInPeriodSaleAAmount;
    totalSaleAWeight += happenedInPeriodSaleAWeight;
    totalDailyLossAmount += dailyLossAmount;
    totalDailyLossWeight += dailyLossWeight;
    totalCleanLossAmount += cleanLossAmount;
    totalCleanLossWeight += cleanLossWeight;
    totalEndingAmount += endingAmount;
    totalEndingWeight += endingWeight;

    if (type === '新') {
      newBeginningAmount += beginningAmount;
      newBeginningWeight += beginningWeight;
      newFeed += feedGainWeightFeed;
      newGainWeight += feedGainWeightGainWeight;
      newNewSeedlingsAmount += newSeedlingsAmount;
      newNewSeedlingsWeight += newSeedlingsWeight;
      newTransferAmount += happenedInPeriodTransferAmount;
      newTransferWeight += happenedInPeriodTransferWeight;
      newSaleAmount += happenedInPeriodSaleAmount;
      newSaleWeight += happenedInPeriodSaleWeight;
      newSaleAAmount += happenedInPeriodSaleAAmount;
      newSaleAWeight += happenedInPeriodSaleAWeight;
      newDailyLossAmount += dailyLossAmount;
      newDailyLossWeight += dailyLossWeight;
      newCleanLossAmount += cleanLossAmount;
      newCleanLossWeight += cleanLossWeight;
      newEndingAmount += endingAmount;
      newEndingWeight += endingWeight;
    } else {
      oldBeginningAmount += beginningAmount;
      oldBeginningWeight += beginningWeight;
      oldFeed += feedGainWeightFeed;
      oldGainWeight += feedGainWeightGainWeight;
      oldNewSeedlingsAmount += newSeedlingsAmount;
      oldNewSeedlingsWeight += newSeedlingsWeight;
      oldTransferAmount += happenedInPeriodTransferAmount;
      oldTransferWeight += happenedInPeriodTransferWeight;
      oldSaleAmount += happenedInPeriodSaleAmount;
      oldSaleWeight += happenedInPeriodSaleWeight;
      oldSaleAAmount += happenedInPeriodSaleAAmount;
      oldSaleAWeight += happenedInPeriodSaleAWeight;
      oldDailyLossAmount += dailyLossAmount;
      oldDailyLossWeight += dailyLossWeight;
      oldCleanLossAmount += cleanLossAmount;
      oldCleanLossWeight += cleanLossWeight;
      oldEndingAmount += endingAmount;
      oldEndingWeight += endingWeight;
      siteNo++;
    }
  }

  sheetData.push({
    siteNo: '合计',
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
    newSeedlings: {
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
      sale: {
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
    siteNo: '本期新鳗',
    key: '本期新鳗',
    beginning: {
      amount: newBeginningAmount,
      weight: newBeginningAmount,
    },
    feedGainWeight: {
      feed: newFeed,
      coefficient: '',
      gainWeight: newGainWeight,
    },
    newSeedlings: {
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
      sale: {
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
    siteNo: '本期老鳗',
    key: '本期老鳗',
    beginning: {
      amount: oldBeginningAmount,
      weight: oldBeginningAmount,
    },
    feedGainWeight: {
      feed: oldFeed,
      coefficient: '',
      gainWeight: oldGainWeight,
    },
    newSeedlings: {
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
      sale: {
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
