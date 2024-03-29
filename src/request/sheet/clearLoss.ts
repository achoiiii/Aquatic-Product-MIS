import instance from '../instance';
function getPoolLossSheetData(data: { poolNos?: string[]; date: string[] }) {
  return instance.post('/clearLoss', data);
}
export default { getPoolLossSheetData };
