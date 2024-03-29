import * as XLSX from 'xlsx';

// TODO：该方法导出文件只有页面展示的部分，要想一下怎么合并表格，包括详细信息和总计
function exportTableToExcel(tableId, fileName = '') {
  const table = document.getElementById(tableId);
  const ws = XLSX.utils.table_to_sheet(table);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* 生成XLSX文件并保存 */
  XLSX.writeFile(wb, fileName + '.xlsx' || 'spreadsheet.xlsx');
}
export default exportTableToExcel;
