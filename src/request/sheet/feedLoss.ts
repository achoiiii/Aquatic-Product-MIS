import instance from '../instance';
import { FeedSheetDataType } from './typing';
// TODO: 改成数组
function getFeedSheetData(data: { poolNo?: string; date: string[] }): Promise<FeedSheetDataType> {
  return instance.post('/feedLoss', data);
}
export default { getFeedSheetData };
