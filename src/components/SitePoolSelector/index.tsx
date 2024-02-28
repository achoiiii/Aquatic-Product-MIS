import { store, useSelector } from '@/store';
import { Cascader, Space } from 'antd';
import Form from 'antd/es/form';
import React from 'react';

const { sites } = store.getState().app;

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
  disableCheckbox?: boolean;
}
const sitePoolOption: Option[] = sites.map((item) => {
  return {
    value: item.siteNo,
    label: item.name,
    children: item.pools.map((pool) => {
      return {
        value: pool.poolNo,
        label: pool.poolNo + '',
      };
    }),
  };
});

const onChange = (value: string[][]) => {
  console.log(value);
};
const SitePoolSelector = () => {
  return (
    <Space wrap>
      <Form.Item label="场/塘号" name="sitePoolId">
        <Cascader
          style={{ width: '200px' }}
          options={sitePoolOption}
          onChange={onChange}
          multiple
          maxTagCount="responsive"
        />
      </Form.Item>
    </Space>
  );
};
export default SitePoolSelector;
