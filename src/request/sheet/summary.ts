import instance from '../instance';
function getPoolSummarySheetData(data: { poolNos?: string[]; date: string[] }) {
  return instance.post('/summary/pool', data);
}
export default { getPoolSummarySheetData };
