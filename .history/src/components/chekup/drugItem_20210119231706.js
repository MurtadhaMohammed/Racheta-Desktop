import React from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { FaMapMarkerAlt, FaCopy } from "react-icons/fa";
import Avatar from "antd/lib/avatar/avatar";

export const DrugItem = ({ item}) => {
  return (
    <div className="drug-item">
      <div className="item-drug">
  <span style={{ fontWeight: "bold" }}>{item.name}</span>
      </div>
      <div className="item-note">
  <span style={{ fontSize: 12 }}>{item.note}</span>
      </div>
      <div className="item-actions">
        <span>
          <Button
            style={{ marginRight: -4 }}
            danger
            // onClick={onDelete(item.id)}
            type="text"
            icon={<CloseOutlined />}
          />
        </span>
      </div>
    </div>
  );
};
