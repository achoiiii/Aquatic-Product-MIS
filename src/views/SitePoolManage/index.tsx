import React, { useEffect, useState } from 'react';
import type { TableColumnsType } from 'antd';
import { Space, Table, Modal, Button, Form, Input, Card, Typography, Radio, InputNumber, Popconfirm } from 'antd';
import './index.scss';
import { PoolItem, SiteItem } from '@/store/models/app/typings';
import { dispatch, useSelector } from '@/store';
import { CloseOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { IAddSiteData } from '@/request/basic';
import request from '@/request';

const { confirm } = Modal;

const SitePoolManage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const SearchBar = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const InsertFormModal = () => {
      function handleOk() {
        setConfirmLoading(true);
        form
          .validateFields()
          .then((res: IAddSiteData) => {
            const addPoolRequests: any[] = [];
            let area = 0;
            for (const pool of res.pools) {
              area += pool.area;
              addPoolRequests.push(request.basic.addPool({ ...pool, siteNo: res.siteNo }));
            }
            Promise.all([
              request.basic.addSite({
                area: area,
                siteNo: res.siteNo,
                siteName: res.siteName,
                location: res.location,
                custodianId: res.custodianId,
              }),
              ...addPoolRequests,
            ]).then((res) => {
              dispatch.app.getInitialData();
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setConfirmLoading(false);
            setOpen(false);
          });
      }

      function handleCancel() {
        console.log('Clicked cancel button');
        setOpen(false);
      }

      return (
        <Modal
          title="新增塘池"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          cancelText="取消"
          okText="确认修改"
        >
          <Form
            style={{ padding: '20px' }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="newSite"
            autoComplete="off"
            initialValues={{ items: [{}] }}
          >
            <Form.Item label="场号" name="siteNo" rules={[{ required: true, message: '场号为空或不规范' }]}>
              <Input placeholder="请填写场号" allowClear={true} />
            </Form.Item>
            <Form.Item
              label="场名"
              name="siteName"
              rules={[{ required: true, message: '场名为空或不规范，参考“一场”、“二场”', type: 'string' }]}
            >
              <Input placeholder="请填写场名" allowClear={true} />
            </Form.Item>
            <Form.Item
              label="负责人手机号"
              name="custodianId"
              rules={[{ required: true, message: '负责人手机号为空或不规范', len: 11 }]}
            >
              <Input placeholder="请填写负责人手机号" allowClear={true} />
            </Form.Item>
            <Form.Item label="场址" name="location">
              <Input placeholder="请填写场址，该项选填" allowClear={true} />
            </Form.Item>
            <Form.List name="pools">
              {(fields, { add, remove }) => (
                <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                  {fields.map((field) => (
                    <Card
                      title={`塘池 ${field.name + 1}`}
                      key={field.key}
                      bordered={true}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item
                        label="塘号"
                        name={[field.name, 'poolNo']}
                        rules={[{ required: true, message: '塘号为空或不规范', type: 'string' }]}
                      >
                        <Input placeholder="请填写塘号" allowClear={true} />
                      </Form.Item>
                      <Form.Item
                        label="面积（亩）"
                        name={[field.name, 'area']}
                        rules={[{ required: true, message: '面积为空或不规范', type: 'number' }]}
                      >
                        <InputNumber placeholder="请填写塘池面积" style={{ width: '100%' }} />
                      </Form.Item>
                      {/* <Form.Item
                      label="类型"
                      name={[field.name, 'type']}
                      rules={[{ required: true, message: '类型为空或不规范', type: 'number' }]}
                    >
                      <Radio.Group>
                        <Radio value={0} defaultChecked>
                          新
                        </Radio>
                        <Radio value={1}>老</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      label="鳗鱼数量（尾）"
                      name={[field.name, 'quantity']}
                      rules={[{ required: true, message: '数量为空或不规范', type: 'number' }]}
                    >
                      <InputNumber type="number" placeholder="请填写数量" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                      label="鳗鱼重量（kg）"
                      name={[field.name, 'weight']}
                      rules={[{ required: true, message: '重量为空或不规范', type: 'number' }]}
                    >
                      <InputNumber type="number" placeholder="请填写重量" style={{ width: '100%' }} />
                    </Form.Item> */}
                    </Card>
                  ))}

                  <Button type="dashed" onClick={() => add()} block>
                    +添加塘池
                  </Button>
                </div>
              )}
            </Form.List>
          </Form>
        </Modal>
      );
    };
    return (
      <div className="content-box">
        <Button type="primary" onClick={() => setOpen(true)}>
          新增场
        </Button>
        <InsertFormModal />
      </div>
    );
  };

  const handleDeleteSite = (item: SiteItem) => {
    confirm({
      title: '确认删除该数据项吗',
      icon: <ExclamationCircleFilled />,
      content: `删除后\n${item.siteName}\n的数据将无法恢复`,
      onOk() {
        request.basic.deleteSite(item.siteNo).then(() => dispatch.app.getInitialData());
        setLoading(false);
      },
      onCancel() {
        setLoading(false);
        console.log(item);
      },
    });
  };
  const handleDeletePool = (item: PoolItem) => {
    confirm({
      title: '确认删除该数据项吗',
      icon: <ExclamationCircleFilled />,
      content: `删除后\n${item.poolNo}\n的数据将无法恢复`,
      onOk() {
        request.basic.deletePool(item.poolNo).then(() => dispatch.app.getInitialData());
      },
      onCancel() {},
    });
  };

  const TableContainer: React.FC = () => {
    const [form] = Form.useForm();
    const [addPoolModalOpen, setAddPoolModalOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [operationSite, setOperationSite]: [string, any] = useState('');
    const typeMap = {
      0: '空塘',
      1: '新',
      2: '老',
    };
    const siteData: SiteItem[] = useSelector((state) => state.app.sites);

    const handleAddPool = (record: SiteItem) => {
      setOperationSite(record.siteNo);
      setAddPoolModalOpen(true);
    };

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
              <Popconfirm title="Sure to cancel?" onConfirm={() => handleDeletePool(record)}>
                <a className="operation-item delete">删除</a>
              </Popconfirm>
            </Space>
          ),
        },
      ];
      return <Table rowKey={'poolNo'} columns={columns} dataSource={poolsWithType} pagination={false} />;
    };

    const AddPoolModal = () => {
      function handleOk() {
        setConfirmLoading(true);
        form
          .validateFields()
          .then((res: IAddSiteData) => {
            const addPoolRequests: any[] = [];
            console.log(res);

            for (const pool of res.pools) {
              addPoolRequests.push(request.basic.addPool({ ...pool, siteNo: operationSite }));
            }
            Promise.all([...addPoolRequests]).then((res) => {
              dispatch.app.getInitialData();
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setConfirmLoading(false);
            setAddPoolModalOpen(false);
            setOperationSite('');
          });
      }

      return (
        <Modal
          title="新增塘池"
          open={addPoolModalOpen}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={() => setAddPoolModalOpen(false)}
          cancelText="取消"
          okText="确认"
        >
          <Form
            style={{ padding: '20px' }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="newSite"
            autoComplete="off"
            initialValues={{ items: [{}] }}
          >
            <Form.List name="pools">
              {(fields, { add, remove }) => (
                <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                  {fields.map((field) => (
                    <Card
                      title={`塘池 ${field.name + 1}`}
                      key={field.key}
                      bordered={true}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item
                        label="塘号"
                        name={[field.name, 'poolNo']}
                        rules={[{ required: true, message: '塘号为空或不规范', type: 'string' }]}
                      >
                        <Input placeholder="请填写塘号" allowClear={true} />
                      </Form.Item>
                      <Form.Item
                        label="面积（亩）"
                        name={[field.name, 'area']}
                        rules={[{ required: true, message: '面积为空或不规范', type: 'number' }]}
                      >
                        <InputNumber placeholder="请填写塘池面积" style={{ width: '100%' }} />
                      </Form.Item>
                    </Card>
                  ))}

                  <Button type="dashed" onClick={() => add()} block>
                    +添加塘池
                  </Button>
                </div>
              )}
            </Form.List>
          </Form>
        </Modal>
      );
    };

    const columns: TableColumnsType<SiteItem> = [
      { title: '场名', dataIndex: 'siteName', key: 'siteName' },
      { title: '场号', dataIndex: 'siteNo', key: 'siteNo' },
      { title: '负责人', dataIndex: 'name', key: 'name' },
      {
        title: '操作',
        key: 'operation',
        render: (_, record: SiteItem) => (
          <Space className="operation">
            <a className="operation-item insert" onClick={() => handleAddPool(record)}>
              新增塘
            </a>
            <a className="operation-item edit">编辑</a>
            <Popconfirm title="Sure to cancel?" onConfirm={() => handleDeleteSite(record)}>
              <a className="operation-item delete">删除</a>
            </Popconfirm>
          </Space>
        ),
      },
    ];
    return (
      <>
        <Table
          className="content-box"
          loading={loading}
          rowKey={'siteNo'}
          columns={columns}
          expandable={{ expandedRowRender }}
          dataSource={siteData}
          size="small"
        />
        <AddPoolModal />
      </>
    );
  };

  return (
    <div id="SitePoolManage">
      <SearchBar />
      <TableContainer />
    </div>
  );
};

export default SitePoolManage;
