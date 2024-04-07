import instance from '../instance';
import { IPoolBasicRequestRangeData } from './typing';
function getPoolDivideSheetData(data: IPoolBasicRequestRangeData) {
  return instance.post('/divide', data);
}
export default { getPoolDivideSheetData };
