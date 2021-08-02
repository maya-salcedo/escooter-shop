import React from 'react';

const MobileRow = ({ title, tableData = [] }) => {
  return (
    <>
      <thead>
        <th>{title}</th>
      </thead>
      <tbody>
        <td>{tableData}</td>
      </tbody>
    </>
  );
};

export default MobileRow;
