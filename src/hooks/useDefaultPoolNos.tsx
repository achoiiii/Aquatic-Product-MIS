import { useSelector } from '@/store';
import { useEffect, useState } from 'react';

export default function useDefaultPoolNos() {
  const [defaultPoolNos, setDefaultPoolNos]: [string[], any] = useState([]);
  const defaultSite = useSelector((state) => state.app.sites)?.[0] || { pools: [] };

  useEffect(() => {
    let defaultPoolNos: string[] = [];
    for (const pool of defaultSite.pools) {
      defaultPoolNos.push(pool.poolNo);
    }
    setDefaultPoolNos(defaultPoolNos);
  }, [defaultSite]);
  return defaultPoolNos;
}
