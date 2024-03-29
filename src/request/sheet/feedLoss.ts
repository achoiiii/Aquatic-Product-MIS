import instance from '../instance';
function getPoolFeedSheetData(data: { poolNos?: string[]; date: string[] }) {
  return instance.post('/feedLoss', data);
}
export default { getPoolFeedSheetData };
