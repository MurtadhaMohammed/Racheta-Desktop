import React from "react";
import { Button } from "antd";
import {DeleteOutlined } from "@ant-design/icons";
const { shell } = require('electron')
var fs = require('fs');
var path = require('path');
export const FileItem = ({ item, onRemove }) => {

  const handleOpenFile = () => {
    const distDir = './attach/'; // attachements folder path
    if (fs.existsSync(distDir)) {
      let fullPath = path.resolve(distDir);
      shell.openPath(fullPath+"\\"+item.name);
    }
  }

  return (
    <div className="file-item" onClick={handleOpenFile}>
      <div className="file-info">
        <span className={`fiv-viv fiv-icon-${item.name.split('.').pop().toLowerCase()}`}></span>
        <div className="file-text">
          <span>{item.name.split('.').slice(0, -1).join('.')
          }</span>
          <small>{item.createdAt}</small>
        </div>
      </div>
      <Button
        style={{ marginRight: -4 }}
        type="text"
        danger
        onClick={(e) =>{
          e.stopPropagation();
          onRemove(item.id,item.name)
        }}
        icon={<DeleteOutlined />}
      />
    </div>
  );
};
