import { useSelector } from '@/store';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, InputNumber, Modal } from 'antd';
import React from 'react';

const { confirm } = Modal;

const CoefficientManage = () => {
  const { oldCoefficient, newCoefficient } = useSelector((state) => state.app);
  const handleUpdate = () => {
    confirm({
      title: '确认修改系数吗',
      icon: <ExclamationCircleFilled />,
      content: '修改后数据将无法恢复',
      onOk() {
        console.log();
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
