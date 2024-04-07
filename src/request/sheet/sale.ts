import instance from '../instance';
import { IPoolBasicRequestRangeData } from './typing';
function getPoolSaleSheetData(data: IPoolBasicRequestRangeData & { saleType: 0 | 1 }) {
  return instance.post('/sale', data);
}
export default { getPoolSaleSheetData };
