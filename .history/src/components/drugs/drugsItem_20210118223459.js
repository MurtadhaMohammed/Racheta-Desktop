import React from "react";
import { Button } from "antd";
import { FiTrash2 } from "react-icons/fi";

export const DrugsItem = ({ item }) => {
  return (
    <div className="drugs-item">
      <div style={{display: 'inline-flex'}}>
      <span style={{backgroundColor: item.color}}></span>
      <div >
        <h4 style={{ fontSize: 18 }}>{item.name}</h4>
        <small style={{ color: "gray" }}>Created at {item.createdAt}</small>
      </div>
      </div>
      <Button type="text" icon={<FiTrash2/>} />
    </div>
  );
};
