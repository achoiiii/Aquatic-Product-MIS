import instance from '../instance';
// TODO: 改成数组
function getFeedSheetData(data: { poolNo?: string; date: string[] }) {
  return instance.post('/feedLoss', data);
}
export default { getFeedSheetData };
