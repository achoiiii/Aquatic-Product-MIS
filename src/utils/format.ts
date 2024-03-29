import { store } from '@/store';
import dayjs from 'dayjs';

export function formatDate(timestamp: number): string {
  const date = dayjs(timestamp);
  return date.format('YYYY-MM-DD');
}

export function formatPoolNos(sitePool: string[][]) {
  const sites = store.getState().app.sites;
  const poolNos: string[] = [];
  sitePool.forEach((option) => {
    if (option.length === 2) poolNos.push(option[1]);
    else if (option.length === 1) {
      const site = sites.find((site) => site.siteNo === option[0]);
      site?.pools.forEach((pool) => poolNos.push(pool.poolNo));
    }
  });
  return poolNos;
}
