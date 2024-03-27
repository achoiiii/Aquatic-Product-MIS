import instance from '../instance';
import { IBasicSearchParams } from './typing';

function getSiteStock(data?: IBasicSearchParams) {
  return instance.post('/site/stats', data);
}
function getPoolStock(data?: IBasicSearchParams) {
  return instance.post('/pool/stats', data);
}
export default { getSiteStock, getPoolStock };
