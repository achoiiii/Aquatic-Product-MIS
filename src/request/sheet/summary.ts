import instance from '../instance';
import { IPoolBasicRequestRangeData } from './typing';
function getPoolSummarySheetData(data: IPoolBasicRequestRangeData) {
  return instance.post('/summary/pool', data);
}
export default { getPoolSummarySheetData };
