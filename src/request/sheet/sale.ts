import instance from '../instance';
import { IPoolBasicRequestRangeData, ISiteBasicRequestRangeData } from './typing';
function getPoolSaleSheetData(data: IPoolBasicRequestRangeData & { saleType?: 0 | 1 }) {
  return instance.post('/sale', data);
}
function getSiteSaleSheetData(data: ISiteBasicRequestRangeData & { saleType?: 0 | 1 }) {
  return instance.post('/sale/site', data);
}
export default { getPoolSaleSheetData, getSiteSaleSheetData };
