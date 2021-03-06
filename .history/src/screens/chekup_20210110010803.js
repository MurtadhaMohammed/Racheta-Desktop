import React, { useState, useEffect } from "react";
import { Select, Button, Empty, Spin, message, Row, Col, Input } from "antd";
import { PatientItem, PatientForm } from "../components/home";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { DrugItem, FileItem } from "../components/chekup";
import { DropZon } from "../components";
import { FileStore } from "../store/fileStore";
import { AddFile, getFile } from "../db/controllers";
import { useParams } from "react-router-dom";

const fs = require('fs');

const { Option } = Select;
const { TextArea } = Input;

const InputFiled = (label, input) => (
  <div className="text-input" style={{ width: "100%" }}>
    <p style={{ marginBottom: 8 }}>{label}</p>
    <div style={{ display: "flex" }}>{input}</div>
  </div>
);

const selectedDrugs = [
  {
    id: 34,
    name: "New Test Drug name",
    note: "this is just test note",
  },
  {
    id: 56,
    name: "Drug name for test only",
    note: "this is a test",
  },
  {
    id: 43,
    name: "Foo Bar",
    note: "just test note",
  },
];

// const files = [
//   {
//     id: 1,
//     title: 'Test DH results doers Foo Yees',
//     name: 'مرتضى محمد علاء',
//     date: 'Nov 20, 2020',
//     type: 'pdf'
//   },
//   {
//     id: 3,
//     title: 'Test DH results doers Bar Noo This Test Only',
//     name: 'ِAli Salam',
//     date: 'Nov 20, 2020',
//     type: 'xls'
//   },
//   {
//     id: 89,
//     title: 'Test DH results doers',
//     name: 'Marwa Salam',
//     date: 'Nov 20, 2020',
//     type: 'pdf'
//   },
// ]


export const ChekupScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [count, setCount] = useState(0);
  const [fileData, setFileData] = useState([]);
  const [fileDataItem, setFileDataItem] = useState([]);

  let {
    name,
    patientId,
    setName,
    setPatientId
  } = FileStore();

  let { id } = useParams(); // get patient id 

  useEffect(() => {
    // console.log("patient id : " + id)
    // console.log("files  : " + fileData);
    loadData();
  }, [page]);
  const loadData = () => {
    setLoading(true);
    getFile(page, id, (result) => {
      if (result.status) {
        setLoading(false);
        setFileData(result.files);
        setCount(result.total);
        setPages(result.pages);
        // console.log(result.files)
      }
    });
  };

  const createFile = (name, PatientId) => {
    let data = { name, PatientId };
    // console.log(data);
    AddFile(data, (status) => {
      if (status) {
        setName(null);
        setPatientId(null);
        loadData();
        message.success("Insert successfully .");
      } else {
        message.error("The process is not complete!");
      }
    });
  };

  const distDir = './attach/';

  const uploadFile = (file) => {

    // console.log(file.name);
    var sourceFile = file.path;

    // console.log(sourceFile);
    // console.log(distDir);
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir);
      console.log("folder created : " + distDir)
    }
    fs.copyFile(sourceFile, distDir + file.name, (err) => {
      if (err) throw err;
      console.log(file.name + ' was copied to attachments folder ' + distDir);
    });
  }

  const handleFileUpload = (file) => {

    const fileName = file.name;

    try {
      // if (uploadFile(file)) {
      uploadFile(file);
      createFile(fileName, id);
      // }
    } catch (error) {
      message.error("The process is not complete! " + error);
    }

    // else{
    //   message.error("The process is not complete!");
    // }
  };

  const handleFileGet = () => {
    // get file name and date 
    let fileItem ={};
    // let fileN = fileData.map(file=>{file.name[1]})
    // console.log(fileData);
    fileData.map((item) => {
      // console.log("files  : " + item.name);
      // var fileType = item.name.split('.').pop();
      fileItem.name = item.name;
      fileItem.type = item.name.split('.').pop();
      fileItem.date = item.createdAt;
      console.log("files name  : " + fileItem.name);
      console.log("files type  : " + fileItem.type);
      console.log("files date  : " + fileItem.date);

    })
    setFileDataItem(fileItem);

  }

  return (
    <div className="page" style={{ paddingTop: 25 }}>
      <Row gutter={[50, 50]}>
        <Col span={16}>
          <Row gutter={[20, 40]}>
            <Col span={24}>
              {InputFiled(
                "The diagnosis",
                <TextArea
                  style={{ width: "100%" }}
                  rows={6}
                  placeholder="Write The diagnosis hire . . ."
                />
              )}
            </Col>
            <Col span={24}></Col>
            <Col span={12}>
              {InputFiled("Prescription")}
              <Select
                size="large"
                showSearch
                allowClear
                style={{ width: "100%" }}
                placeholder="Chose Drug . . ."
              >
                <Option>One</Option>
                <Option>Two</Option>
              </Select>
            </Col>

            <Col span={9} style={{ display: "flex", alignItems: "flex-end" }}>
              <Input size="large" placeholder="Note" />
            </Col>
            <Col
              span={3}
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Button
                size="large"
                block
                className="add-btn"
                icon={<PlusOutlined />}
              />
            </Col>
            <Col span={24}>
              <div className="selected-drugs">
                {selectedDrugs.map((item) => (
                  <DrugItem key={item.id} item={item} />
                ))}
              </div>
            </Col>
            <Col span={24}>
              <Button
                type="link"
                className="add-btn"
                size="large"
                icon={<SaveOutlined />}
              >
                Save & Print
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <h4>Attachments</h4>
          <DropZon onChange={file => handleFileGet()} />
          {/* <DropZon onChange={file => handleFileUpload(file)} /> */}
          {
            fileData.map(item => <FileItem key={item.id} item={item.name} />)
          }

        </Col>
      </Row>
    </div>
  );
};
