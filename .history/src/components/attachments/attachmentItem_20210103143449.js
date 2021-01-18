import React from "react";

export const AttachmentItem = ({ item }) => {
  return (
    <div className="attachment-item">
      <span className={`fiv-viv fiv-icon-${item.type}`}></span>
      <div>
        <h4 style={{ fontSize: 18 }}>{item.title}</h4>
        <span style={{ fontSize: 14 }}>{item.name}</span>
        <small style={{ color: "gray" }}>Created at {item.date}</small>
      </div>
    </div>
  );
};
