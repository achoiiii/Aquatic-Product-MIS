import instance from '../instance';
import { IPoolBasicRequestRangeData, ISiteBasicRequestRangeData } from './typing';
function getPoolDivideSheetData(data: IPoolBasicRequestRangeData) {
  return instance.post('/divide', data);
}
function getSiteDivideSheetData(data: ISiteBasicRequestRangeData) {
  return instance.post('/divide/site', data);
}
export default { getPoolDivideSheetData, getSiteDivideSheetData };
