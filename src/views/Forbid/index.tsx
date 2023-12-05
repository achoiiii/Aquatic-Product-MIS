import React from 'react';
import './index.scss';
import { useLocation } from 'react-router-dom';

function Forbid() {
  const { prePathname } = useLocation().state;

  return (
    <div id="forbid">
      {prePathname}
      <div className="forbid-bg" />
    </div>
  );
}
export default Forbid;
