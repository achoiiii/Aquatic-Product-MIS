import { store, useSelector } from '@/store';
import { Cascader, Select, Space } from 'antd';
import Form from 'antd/es/form';
import React, { useState } from 'react';
interface Option {
  value: string | number;
  label: string;
  children?: Option[];
  disableCheckbox?: boolean;
}

const SitePoolSelector = (props: { type: 'site' | 'pool' }) => {
  const { sites } = store.getState().app;
  const { type = 'site' } = props;
  if (type === 'pool') {
    const sitePoolOption: Option[] = sites.map((item) => {
      return {
        value: item.siteNo,
        label: item.siteName,
        children: item.pools.map((pool) => {
          return {
            value: pool.poolNo,
            label: pool.poolNo + '',
          };
        }),
      };
    });
    return (
      <Space wrap>
        <Form.Item label="场/塘号" name="sitePool" rules={[{ required: true, message: '该项必填' }]}>
          <Cascader style={{ width: '200px' }} options={sitePoolOption} multiple maxTagCount="responsive" />
        </Form.Item>
      </Space>
    );
  } else {
    const sitePoolOption: Option[] = sites.map((item) => {
      return {
        value: item.siteNo,
        label: item.siteName,
      };
    });
    return (
      <Space wrap>
        <Form.Item label="场/塘号" name="siteNos" rules={[{ required: true, message: '该项必填' }]}>
          <Select style={{ width: '200px' }} options={sitePoolOption} mode="multiple" maxTagCount="responsive" />
        </Form.Item>
      </Space>
    );
  }
};
export default SitePoolSelector;
