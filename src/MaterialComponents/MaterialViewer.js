import React from "react";
import Table from "react-bootstrap/Table";

const Materials = [
  ["1", "Math HW", "1/23/2021", "http://url"],
  ["2", "Science HW", "1/23/2021", "http://url"],
  ["3", "History HW", "1/23/2021", "http://url"],
];

function MaterialViewer() {
  const downloadFile = (index) => {
    
  };

  const renderMaterial = (material, index) => {
    return (
      <tr key={index} onClick={() => downloadFile(index)}>
        <td>{material[0]}</td>
        <td>{material[1]}</td>
        <td>{material[2]}</td>
      </tr>
    );
  };

  return (
    <div>
      <h2>Materials</h2>

      <Table striped hover responsive>
        <thead>
          <th>#</th>
          <th>Description</th>
          <th>Date</th>
        </thead>
        <tbody>{Materials.map(renderMaterial)}</tbody>
      </Table>
    </div>
  );
}

export default MaterialViewer;
