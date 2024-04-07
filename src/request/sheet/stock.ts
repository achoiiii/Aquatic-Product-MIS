import instance from '../instance';
import { IPoolBasicRequestData, ISiteBasicRequestData } from './typing';

function getSiteStock(data?: ISiteBasicRequestData) {
  return instance.post('/site/stats', data);
}
function getPoolStock(data?: IPoolBasicRequestData) {
  return instance.post('/pool/stats', data);
}
export default { getSiteStock, getPoolStock };
