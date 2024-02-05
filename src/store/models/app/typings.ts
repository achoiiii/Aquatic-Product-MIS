export type PoolItem = {
  poolNo: number;
  area: number;
  type: 0 | 1 | string;
  weight: number;
  quantity: number;
};
export type SiteItem = {
  siteNo: number;
  name: string;
  pools: PoolItem[];
  custodian: string;
};
export interface IInitialData {
  sites: SiteItem[];
  oldCoefficient: number;
  newCoefficient: number;
}
