import instance from '../instance';
function getSite() {
  return instance.get('/site');
}
export default { getSite };
