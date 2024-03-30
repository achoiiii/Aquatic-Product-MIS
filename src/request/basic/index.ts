import instance from '../instance';

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
export default { getSite, addSite, addPool, deleteSite, deletePool };
