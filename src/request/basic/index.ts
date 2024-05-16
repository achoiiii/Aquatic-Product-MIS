import { AxiosResponse } from 'axios';
import instance from '../instance';
import { IUserState } from '@/store/models/user/typings';

export interface IAddSiteData {
  siteNo: string;
  siteName: string;
  area: number;
  location: string;
  custodianId: String;
  pools: IAddPoolData[];
}
export interface IAddPoolData {
  poolNo: string;
  area: number;
  siteNo: string;
}

function getSite() {
  return instance.get('/site');
}
function addSite(data: Omit<IAddSiteData, 'pools'>) {
  return instance.post('/site/add', data);
}
function addPool(data: IAddPoolData & { siteNo: string }) {
  return instance.post('/pool/add', data);
}
function deleteSite(siteNo: string) {
  return instance.post(`/site/delete?siteNo=${siteNo}`);
}
function deletePool(poolNo: string) {
  return instance.post(`/pool/delete?poolNo=${poolNo}`);
}
function updateNewCoefficient(value: string) {
  return instance.post('/baseData/update', { name: 'coefficient1', value });
}
function updateOldCoefficient(value: string) {
  return instance.post('/baseData/update', { name: 'coefficient2', value });
}
function selectBaseData() {
  return instance.post('/baseData/select');
}
function updateCustodian(data: { siteNo: string; custodianId: string }) {
  return instance.post('/site/updateCustodian', data);
}
function login(
  userNo: string,
  password: string,
  token?: string,
): Promise<AxiosResponse<Omit<IUserState, 'isLogin'>, any>> {
  return instance.post('/user/login/0', { userNo, password, token });
}
function logout() {
  return instance.post('/user/logout');
}
export default {
  getSite,
  addSite,
  addPool,
  deleteSite,
  deletePool,
  login,
  logout,
  updateNewCoefficient,
  updateOldCoefficient,
  selectBaseData,
  updateCustodian,
};
