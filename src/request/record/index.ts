import { AxiosResponse } from 'axios';
import instance from '../instance';
import { IClearLossRecordData, IDivideRecordData, IFeedLossRecordData, IPutRecordData } from './typing';

function getFeedLossRecordData(data: {
  poolNos?: string[];
  date: string[];
}): Promise<AxiosResponse<IFeedLossRecordData[], any>> {
  return instance.post('/feedLoss/record', data);
}
function getDivideRecordData(data: {
  poolNos?: string[];
  date: string[];
}): Promise<AxiosResponse<IDivideRecordData[], any>> {
  return instance.post('/divide/record', data);
}
function getClearLossRecordData(data: {
  poolNos?: string[];
  date: string[];
}): Promise<AxiosResponse<IClearLossRecordData[], any>> {
  return instance.post('/clearLoss/record', data);
}
function getSaleRecordData(data: {
  poolNos?: string[];
  date: string[];
  saleType: 0 | 1;
}): Promise<AxiosResponse<IFeedLossRecordData[], any>> {
  return instance.post('/sale/record', data);
}
function getPutRecordData(data: { poolNos?: string[]; date: string[] }): Promise<AxiosResponse<IPutRecordData[], any>> {
  return instance.post('/put/record', data);
}
export default {
  getFeedLossRecordData,
  getDivideRecordData,
  getClearLossRecordData,
  getSaleRecordData,
  getPutRecordData,
};
