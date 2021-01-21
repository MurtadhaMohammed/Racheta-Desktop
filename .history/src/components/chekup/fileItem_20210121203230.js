import React from "react";
import { Button, message } from "antd";
import { CloseOutlined, DeleteOutlined } from "@ant-design/icons";
import { FaMapMarkerAlt, FaCopy } from "react-icons/fa";
import Avatar from "antd/lib/avatar/avatar";
import { deleteFile } from "../../db/controllers";
const { shell } = require('electron')
var fs = require('fs');
var path = require('path');
export const FileItem = ({ item }) => {

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
          deleteFile(item.id,(result) => {
            if (result.status) {
              message.destroy("delte successfully .");
            }
          }
          )
        }}
        icon={<DeleteOutlined />}
      />
    </div>
  );
};
