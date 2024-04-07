import instance from '../instance';
import { IPoolBasicRequestRangeData } from './typing';
function getPoolFeedSheetData(data: IPoolBasicRequestRangeData) {
  return instance.post('/feedLoss', data);
}
export default { getPoolFeedSheetData };
