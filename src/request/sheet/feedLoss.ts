import instance from '../instance';
import { IPoolBasicRequestRangeData, ISiteBasicRequestRangeData } from './typing';
function getPoolFeedSheetData(data: IPoolBasicRequestRangeData) {
  return instance.post('/feedLoss', data);
}
function getSiteFeedSheetData(data: ISiteBasicRequestRangeData) {
  return instance.post('feedLoss/site', data);
}
export default { getPoolFeedSheetData, getSiteFeedSheetData };
