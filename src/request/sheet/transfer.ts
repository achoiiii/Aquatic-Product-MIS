import instance from '../instance';
function getPoolDivideSheetData(data: { poolNos?: string[]; date: string[] }) {
  return instance.post('/divide', data);
}
export default { getPoolDivideSheetData };
