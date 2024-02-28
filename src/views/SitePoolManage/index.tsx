import React from 'react';
import type { TableColumnsType } from 'antd';
import { Space, Table, Modal, Button } from 'antd';
import './index.scss';
import { PoolItem, SiteItem } from '@/store/models/app/typings';
import { dispatch, useSelector } from '@/store';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const SearchBar = () => {
  return (
    <div className="content-box">
      <Button type="primary">新增</Button>
    </div>
  );
};

const handleDelete = (item: SiteItem | PoolItem) => {
  confirm({
    title: '确认删除该数据项吗',
    icon: <ExclamationCircleFilled />,
    content: '删除后数据将无法恢复',
    onOk() {
      console.log(item);
    },
    onCancel() {
      console.log(item);
    },
  });
};

const TableContainer: React.FC = () => {
  const typeMap = {
    0: '新',
    1: '老',
  };
  const siteData: SiteItem[] = useSelector((state) => state.app.sites);
  const expandedRowRender = (props: SiteItem) => {
    const { pools } = props;
    const poolsWithType = pools.map((pool) => {
      return {
        ...pool,
        type: typeMap[pool.type],
      };
    });

    const columns: TableColumnsType<PoolItem> = [
      { title: '塘号', dataIndex: 'poolNo', key: 'poolNo' },
      { title: '新/老', dataIndex: 'type', key: 'type' },
      { title: '塘的面积（亩）', dataIndex: 'area', key: 'area' },
      { title: '数量（尾）', dataIndex: 'quantity', key: 'quantity' },
      { title: '重量（kg）', dataIndex: 'weight', key: 'weight' },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (_, record: PoolItem) => (
          <Space className="operation">
            <a className="operation-item">编辑</a>
            <a className="operation-item delete" onClick={() => handleDelete(record)}>
              删除
            </a>
          </Space>
        ),
      },
    ];
    return <Table rowKey={'poolNo'} columns={columns} dataSource={poolsWithType} pagination={false} />;
  };

  const columns: TableColumnsType<SiteItem> = [
    { title: '场名', dataIndex: 'name', key: 'name' },
    { title: '场号', dataIndex: 'siteNo', key: 'siteNo' },
    { title: '负责人', dataIndex: 'custodian', key: 'custodian' },
    {
      title: '操作',
      key: 'operation',
      render: (_, record: SiteItem) => (
        <Space className="operation">
          <a className="operation-item">编辑</a>
          <a className="operation-item delete" onClick={() => handleDelete(record)}>
            删除
          </a>
        </Space>
      ),
    },
  ];
  return (
    <Table
      className="content-box"
      rowKey={'siteNo'}
      columns={columns}
      expandable={{ expandedRowRender }}
      dataSource={siteData}
      size="small"
    />
  );
};

const SitePoolManage: React.FC = () => {
  return (
    <div id="SitePoolManage">
      <SearchBar />
      <TableContainer />
    </div>
  );
};

export default SitePoolManage;
