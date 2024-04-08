import instance from '../instance';
import { IPoolBasicRequestRangeData, ISiteBasicRequestRangeData } from './typing';
function getPoolSummarySheetData(data: IPoolBasicRequestRangeData) {
  return instance.post('/summary/pool', data);
}
function getSiteSummarySheetData(data: ISiteBasicRequestRangeData) {
  return instance.post('/summary/site', data);
}
export default { getPoolSummarySheetData, getSiteSummarySheetData };
