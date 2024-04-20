import * as XLSX from 'xlsx';

function exportTableToExcel(tableId, fileName = '') {
  const table = document.getElementById(tableId);
  const ws = XLSX.utils.table_to_sheet(table);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* 生成XLSX文件并保存 */
  XLSX.writeFile(wb, fileName + '.xlsx' || 'spreadsheet.xlsx');
}
export default exportTableToExcel;
