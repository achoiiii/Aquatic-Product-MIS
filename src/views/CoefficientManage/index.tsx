import request from '@/request';
import { dispatch, useSelector } from '@/store';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, InputNumber, Modal, message } from 'antd';
import React, { useState } from 'react';

const { confirm } = Modal;

const CoefficientManage = () => {
  const [oldCoefficient, setOldCoefficient] = useState(useSelector((state) => state.app.oldCoefficient));
  const [newCoefficient, setNewCoefficient] = useState(useSelector((state) => state.app.newCoefficient));
  const handleUpdate = () => {
    confirm({
      title: '确认修改系数吗',
      icon: <ExclamationCircleFilled />,
      content: '修改后数据将无法恢复',
      onOk() {
        return new Promise((resolve, reject) => {
          Promise.all([
            request.basic.updateNewCoefficient(newCoefficient + ''),
            request.basic.updateOldCoefficient(oldCoefficient + ''),
          ]).then((res) => {
            if (res[0].code === 200 && res[1].code === 200) {
              resolve(res);
              dispatch.app.getInitialData();
              message.success({
                duration: 2,
                content: '修改成功',
              });
            } else {
              message.error({
                duration: 2,
                content: '修改失败',
              });
              resolve(res);
            }
          });
        });
      },
      onCancel() {
        console.log();
      },
    });
  };
  return (
    <div className="content-box">
      新鳗塘块系数：
      <InputNumber
        min={0}
        max={999.9}
        precision={1}
        step={0.1}
        defaultValue={newCoefficient}
        onChange={(value: any) => setNewCoefficient(value)}
        style={{ marginBottom: '20px' }}
      />
      <br />
      老鳗塘块系数：
      <InputNumber
        min={0}
        max={999}
        precision={1}
        step={0.1}
        defaultValue={oldCoefficient}
        onChange={(value: any) => setOldCoefficient(value)}
        style={{ marginBottom: '20px' }}
      />
      <br />
      <Button type="primary" onClick={handleUpdate}>
        确认修改
      </Button>
    </div>
  );
};
export default CoefficientManage;
