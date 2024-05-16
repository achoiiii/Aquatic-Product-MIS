import { Dayjs } from 'dayjs';

export interface FeedSheetDataType {
  // 塘号
  poolNo: string;
  // 面积
  area?: number;
  // 数据key = 塘号
  key: string;
  // 每一天的数据
  dataMap?: any;
  // 总投料
  totalFeed: number;
  // 总消耗
  totalLoss: number;
  // 总消耗重量
  totalLossWeight?: number;
}
export interface SiteFeedSheetDataType {
  // 塘号
  siteNo: string;
  // 面积
  area?: number;
  // 类型
  type?: 0 | 1 | string;
  // 数据key = 塘号
  key: string;
  // 每一天的数据
  dataMap?: any;
  // 总投料
  totalFeed: number;
  // 总消耗
  totalLoss: number;
  // 总消耗重量
  totalLossWeight?: number;
}

export interface BasicSheetDataType {
  // 塘号
  poolNo: string;
  // 面积
  area?: number;
  // 数据key = 塘号
  key: string;
  // 每一天的数据
  dataMap?: any;
  // 总数量
  totalQuantity: number;
  // 总重量
  totalWeight: number;
}

export interface SiteBasicSheetDataType {
  // 塘号
  siteNo: string;
  // 面积
  area?: number;
  // 数据key = 塘号
  key: string;
  // 每一天的数据
  dataMap?: any;
  // 总数量
  totalQuantity: number;
  // 总重量
  totalWeight: number;
}

export interface IPoolBasicSearchParams {
  date: string;
  sitePool: string[][];
}
export interface IPoolBasicRangeSearchParams {
  dateRange: Dayjs[];
  sitePool: string[][];
}
export interface ISiteBasicSearchParams {
  date: string;
  siteNos: string[];
}
export interface ISiteBasicRangeSearchParams {
  dateRange: Dayjs[];
  siteNos: string[];
}
export interface IPoolBasicRequestRangeData {
  date: string[];
  poolNos?: string[];
}
export interface ISiteBasicRequestRangeData {
  date: string[];
  siteNos?: string[];
}
export interface IPoolBasicRequestData {
  date: string;
  poolNos?: string[];
}
export interface ISiteBasicRequestData {
  date: string;
  siteNos?: string[];
}
