import React, { useState } from "react";
import "./attachmentItem.css";
import dayjs from "dayjs";
import { Button, Image, Popconfirm, Space, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { apiCall } from "../../../lib/services";
import qc from "../../../lib/queryClient";
import ImageViewer from "../../../components/ImageViewer/ImageViewer";

export const AttachmentItem = ({ item }) => {
  const [flag, setFlag] = useState(false);

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) =>
      apiCall({ url: `file/v1/delete/${item?.id}`, method: "DELETE", data }),
    onSuccess: () => {
      message.success("Delete Successfully.");
      qc.invalidateQueries("files");
    },
    onError: () => message.error("Error !"),
  });

  return (
    <div className="attachment-item" onClick={(e) => {
      e.stopPropagation();
      setFlag(true);
    }}>
      <div className="icon">
        <span className={`fiv-viv fiv-icon-${item.type || "png"}`}></span>
      </div>
      <div className="body flex-1">
        <h4 className="truncate w-[60vw]  md:w-[15vw]">{item.name}</h4>
        <span style={{ fontSize: 14 }}>{item?.patient?.name}</span>
        <small style={{ color: "gray" }}>
          {dayjs(item.createdAt).format("YYYY , dddd MM  hh:mm A")}
        </small>
      </div>

      <ImageViewer flag={flag} setFlag={setFlag} url={item?.name} />

      <div className="action">
        <Popconfirm
          title="Delete this file"
          description="Are you sure to delete this file?"
          onConfirm={() => mutate()}
          okText="Yes"
          cancelText="No"
        >
          <Button
            onClick={(e) => e.stopPropagation()}
            loading={isLoading}
            style={{ marginRight: -4 }}
            type="text"
            danger
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      </div>
    </div>
  );
};
