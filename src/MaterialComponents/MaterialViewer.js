import React from "react";
import Table from "react-bootstrap/Table";

function MaterialViewer(materials) {
  const downloadFile = (index) => {
    // download file
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
      <h2 className="header">Materials</h2>

      {materials.length > 0 ? 
      (<Table striped hover responsive>
        <thead>
          <th>#</th>
          <th>Description</th>
          <th>Date</th>
        </thead>
        <tbody>{materials.map(renderMaterial)}</tbody>
      </Table>) : (
        <h4>No materials yet!</h4>
      )}

    </div>
  );
}

export default MaterialViewer;
