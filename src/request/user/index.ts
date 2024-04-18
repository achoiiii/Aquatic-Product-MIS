import { AxiosResponse } from 'axios';
import instance from '../instance';
import { IUser } from './typing';

function getCustodian(): Promise<AxiosResponse<IUser[], any>> {
  return instance.post('/user/all', { types: [2] });
}
function getManager(): Promise<AxiosResponse<IUser[], any>> {
  return instance.post('/user/all', { types: [0, 1] });
}
function deleteUser(userId: string) {
  return instance.post(`/user/delete/${userId}`);
}
function addUser(data: { phone: string; userId: string; name: string; type: 0 | 1 | 2 }) {
  return instance.post('/user/register', data);
}
function modifyPassword() {}
export default { getCustodian, getManager, deleteUser, addUser };
