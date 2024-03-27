export interface FeedSheetDataType {
  // 塘号
  poolNo: string;
  // 面积
  area?: number;
  // 数据key = 塘号
  key: string;
  // 每一天的数据
  dataList?: Array<IFeedSheetDataListItem>;
  // 总投料
  totalFeed: number;
  // 总消耗
  totalLoss: number;
  // 总消耗重量
  totalLossWeight?: number;
}
export interface IFeedSheetDataListItem {
  feed: number;
  loss: number;
  date: string;
  type: 1 | 0;
}

export interface IBasicSearchParams {
  poolNos: string[];
  date: string;
}
export interface IBasicRangeSearchParams {
  poolNos: string[];
  date: string[];
}
