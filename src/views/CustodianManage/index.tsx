import request from '@/request';
import { IUser } from '@/request/user/typing';
import exportTableToExcel from '@/utils/sheet/exportXlsx';
import { Button, Form, Input, Modal, Popconfirm, Space, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';

interface ISheetData extends IUser {
  key: string;
}

const CustodianManage = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [sheetData, setSheetData]: [ISheetData[], any] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    setShowLoading(true);
    request.user
      .getCustodian()
      .then((res) => {
        const resData = res.data;
        for (const item of resData) {
          item['key'] = item.userId;
        }
        setSheetData(resData);
      })
      .finally(() => setShowLoading(false));
  }, []);

  const OperationBar: React.FC = () => {
    const [form] = Form.useForm();
    function handleCreate() {
      setConfirmLoading(true);
      form.validateFields().then((res: { phone: string; userId: string; name: string }) => {
        request.user.addUser({ ...res, type: 2 }).then((res) => {
          if (res.code === 200) {
            request.user.getCustodian().then((res) => {
              const resData = res.data;
              for (const item of resData) {
                item['key'] = item.userId;
              }
              setSheetData(resData);
              message.success('新增成功', 2);
            });
          } else if (res.code === 201) {
            message.error('新增失败，账号已存在', 2);
          }
        });
      });
      setConfirmLoading(false);
      setModalOpen(false);
    }
    return (
      <div className="content-box">
        <Button type="primary" onClick={() => setModalOpen(true)}>
          新增场长
        </Button>
        <Button
          type="primary"
          style={{ backgroundColor: '#18bc69', marginLeft: '40px' }}
          onClick={() => exportTableToExcel('custodian-table', 'custodian-table')}
        >
          导出
        </Button>
        <Modal
          title="新增场长"
          open={modalOpen}
          onOk={handleCreate}
          confirmLoading={confirmLoading}
          cancelText="取消"
          okText="确认新增"
          onCancel={() => setModalOpen(false)}
        >
          <Form name="registerUser" style={{ padding: '20px' }} form={form}>
            <Form.Item label="用户名" name="userId" rules={[{ required: true, message: '用户名为空' }]}>
              <Input placeholder="请输入用户名" allowClear={true} />
            </Form.Item>
            <Form.Item label="账号持有者姓名" name="name" rules={[{ required: true, message: '账号持有者姓名为空' }]}>
              <Input placeholder="请输入账号持有者姓名" allowClear={true} />
            </Form.Item>
            <Form.Item
              label="账号持有者联系方式"
              name="phone"
              rules={[{ required: true, message: '账号持有者联系方式为空' }]}
            >
              <Input placeholder="请输入账号持有者联系方式" allowClear={true} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  };

  const TableContainer = () => {
    const columns: ColumnsType<ISheetData> = [
      {
        title: '登录账号',
        dataIndex: 'userId',
        key: 'userId',
        align: 'center',
        fixed: 'left',
        className: 'first-column',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: '身份',
        dataIndex: 'authority',
        key: 'authority',
        align: 'center',
      },
      {
        title: '联系方式',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        render: (_, record: ISheetData) => (
          <Space className="operation">
            <Popconfirm title="确认删除该条数据？" onConfirm={() => handleDelete(record)}>
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    function handleDelete(record: ISheetData) {
      setShowLoading(true);
      request.user.deleteUser(record.userId).then((res) => {
        if (res.code === 200) {
          request.user.getCustodian().then((res) => {
            const resData = res.data;
            for (const item of resData) {
              item['key'] = item.userId;
            }
            setSheetData(resData);
          });
        }
        setShowLoading(false);
      });
      message.success({
        duration: 2,
        content: '删除成功',
      });
    }

    return (
      <div className="content-box">
        <Table
          dataSource={sheetData}
          bordered
          pagination={{ pageSize: 1000 }}
          size="small"
          columns={columns}
          id="custodian-table"
          rowKey={'key'}
          title={() => {
            return `总共匹配到：${sheetData.length}条数据`;
          }}
          loading={showLoading}
        />
      </div>
    );
  };

  return (
    <div>
      <OperationBar />
      <TableContainer />
    </div>
  );
};
export default CustodianManage;
