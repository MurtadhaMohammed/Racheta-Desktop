import React from "react";
import { Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { FaMapMarkerAlt, FaCopy } from "react-icons/fa";
import Avatar from "antd/lib/avatar/avatar";
import { useHistory } from "react-router-dom";
var getAge = require('get-age')

export const PatientItem = ({ item }) => {
  let history = useHistory();
  return (
    <div className="patient-item">
      <div className="item-name">
        <Avatar
          style={{ background: item.gender === "male" ? "#7265e6" : "#e91e63" }}
        >
          {item.name.substr(0, 1).toUpperCase()}
        </Avatar>
        <div className="name-info">
          <span>{item.name}</span>
          <small>
            <FaCopy style={{ fontSize: 10, color: "gray" }} /> {item.phone}
          </small>
        </div>
      </div>
      <div className="item-age">
        {getAge(item.age)}
        <span>Years Old</span>
      </div>
      <div className="item-address">
        <FaMapMarkerAlt style={{ fontSize: 26 }} />
        <div className="address-info">
          <span>{item.address}</span>
          <small>Address</small>
        </div>
      </div>
      <div className="item-new">
        <Button
          type="link"
          size="small"
          onClick={() => history.push(`/patients/${item.id}`)}
        >
          + New Chekup
        </Button>
      </div>

      <div className="item-actions">
        <Button type="text" icon={<HistoryOutlined />} />
        <Button type="text" icon={<EditOutlined />} />
        <Button type="text" danger icon={<DeleteOutlined />} />
      </div>
    </div>
  );
};
