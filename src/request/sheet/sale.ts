import instance from '../instance';
function getPoolSaleSheetData(data: { poolNos?: string[]; date: string[]; saleType: 0 | 1 }) {
  return instance.post('/sale', data);
}
export default { getPoolSaleSheetData };
