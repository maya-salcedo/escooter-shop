import React from 'react';

const MobileTable = (props) => {
  return (
    <table>
      <thead>
        <th>{props}</th>
      </thead>
      <tbody>
        <td>{props}</td>
      </tbody>
    </table>
  );
};

export default MobileTable;
