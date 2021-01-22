import React from "react";
import { Modal, Button, Space } from 'antd';
import {
  ExclamationCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
const { confirm } = Modal;
import { FaMapMarkerAlt, FaCopy } from "react-icons/fa";
import Avatar from "antd/lib/avatar/avatar";
import { useHistory } from "react-router-dom";
var getAge = require('get-age')

export const PatientItem = ({ item, onRemove }) => {
  let history = useHistory();

  function showDeleteConfirm() {
    confirm({
      title: 'Are you sure delete this patient?',
      icon: <ExclamationCircleOutlined />,
      content: 'if you delete patient will delete everything associated with him! ',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // onRemove(item.id)
        console.log('Cancel');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

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
        <Button onClick={showDeleteConfirm} type="text" danger icon={<DeleteOutlined />} />
      </div>
    </div>
  );
};
