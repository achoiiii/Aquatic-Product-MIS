export interface IFeedLossRecordData {
  reportBasic: IReportBasic;
  // 投料
  feed: number;
  // 消耗
  loss: number;
  // 消耗重量
  lossWeight?: number;
}
export interface IClearLossRecordData {
  reportBasic: IReportBasic;
  // 投料
  quantity: number;
  // 消耗
  weight: number;
}
export interface IDivideRecordData {
  reportBasic: IReportBasic;
  // 分出塘号
  poolNoOut: number;
  // 分进塘号
  poolNoIn: number;
  // 重量
  weight?: number;
  // 数量
  quantity: number;
}
export interface IPutRecordData {
  reportBasic: IReportBasic;
  // 投料
  weight: number;
  // 消耗
  quantity: number;
}
export interface ISaleRecordData {
  reportBasic: IReportBasic;
  // 投料
  feed: number;
  // 消耗
  loss: number;
  // 消耗重量
  lossWeight?: number;
}
export interface IReportBasic {
  // 发生日期
  date: string;
  // 上报日期
  reportDate: string;
  // 上报人
  reporter: string;
  // 塘号
  poolNo: string;
}
