import instance from '../instance';
import { IPoolBasicRequestRangeData } from './typing';
function getPoolLossSheetData(data: IPoolBasicRequestRangeData) {
  return instance.post('/clearLoss', data);
}
export default { getPoolLossSheetData };
