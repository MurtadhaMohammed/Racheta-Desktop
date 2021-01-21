import React from "react";
var fs = require('fs');
const { shell } = require('electron');
var path = require('path');
const handleOpenFile = () => {
  const distDir = './attach/'; // attachements folder path
  if (fs.existsSync(distDir)) {
    let fullPath = path.resolve(distDir);
    shell.openPath(fullPath + "\\" + item.name);
  }
}

export const AttachmentItem = ({ item,user }) => {
  return (
    <div className="attachment-item" onClick={handleOpenFile}>
      <span className={`fiv-viv fiv-icon-${item.name.split('.').pop().toLowerCase()}`}></span>
      <div>
        <h4 style={{ fontSize: 18 }}>{item.name.split('.').slice(0, -1).join('.')}</h4>
        <span style={{ fontSize: 14 }}>{user}</span>
        <small style={{ color: "gray" }}>Created at {item.createdAt}</small>
      </div>
    </div>
  );
};
