import instance from '../instance';
import { IPoolBasicRequestRangeData, ISiteBasicRequestRangeData } from './typing';
function getPoolLossSheetData(data: IPoolBasicRequestRangeData) {
  return instance.post('/clearLoss', data);
}
function getSiteLossSheetData(data: ISiteBasicRequestRangeData) {
  return instance.post('/clearLoss/site', data);
}
export default { getPoolLossSheetData, getSiteLossSheetData };
