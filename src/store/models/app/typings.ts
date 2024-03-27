export type PoolItem = {
  id: number;
  year: string;
  poolNo: string;
  area: number;
  date: string;
  type: 0 | 1 | string;
  weight: number;
  quantity: number;
  siteNo: string;
};
export type SiteItem = {
  id: number;
  area: number;
  siteNo: string;
  siteName: string;
  pools: PoolItem[];
  name: string;
  custodianId: string;
  location: string;
};
export interface IInitialData {
  sites: SiteItem[];
  isInitial: boolean;
  oldCoefficient: number;
  newCoefficient: number;
}
