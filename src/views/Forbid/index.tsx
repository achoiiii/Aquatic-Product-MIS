import React from 'react';
import './index.scss';
import { useLocation } from 'react-router-dom';

function Forbid() {
  const { prePathname } = useLocation().state;

  return (
    <div id="forbid">
      <p className="forbid-title">您无权访问 {prePathname} 页面</p>
      <p>如需申请访问，请联系管理员</p>
      <div className="forbid-bg" />
    </div>
  );
}
export default Forbid;
