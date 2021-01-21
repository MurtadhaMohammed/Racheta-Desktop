import React, { useState, useEffect } from "react";
import { Select, Button, Empty, Spin, message, Row, Col, Input } from "antd";
import { PatientItem, PatientForm } from "../components/home";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { DrugItem, FileItem } from "../components/chekup";
import { DropZon } from "../components";
import { FileStore } from "../store/fileStore";
import { VisitStore } from "../store/visitStore";
import { AddFile, createVisit, deleteFile, getDrug, getFile } from "../db/controllers";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

var path = require('path');
const fs = require('fs');

const { Option } = Select;
const { TextArea } = Input;

const InputFiled = (label, input) => (
  <div className="text-input" style={{ width: "100%" }}>
    <p style={{ marginBottom: 8 }}>{label}</p>
    <div style={{ display: "flex" }}>{input}</div>
  </div>
);

export const ChekupScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [count, setCount] = useState(0);
  const [fileData, setFileData] = useState([]);
  const [drugData, setDrugData] = useState([]);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [drugName, setDrugName] = useState("");
  const [drugNote, setDrugNote] = useState("");

  const distDir = './attach/'; // attachements folder path
  let { id } = useParams(); // get patient id 

  let fileStore = FileStore();

  let visitStore = VisitStore();

  useEffect(() => {
    setDrugName("");
    setDrugNote("");
    console.log(JSON.stringify(selectedDrugs));

    loadDrug(); // get drugs 
    loadData();
  }, [page, selectedDrugs]);

  // file block
  // =======================================
  const loadData = () => {
    setLoading(true);
    getFile(page, id, (result) => {
      if (result.status) {
        setLoading(false);
        setFileData(result.files);
        setCount(result.total);
        setPages(result.pages);
      }
    });
  };

  const createFile = (name, PatientId) => {
    let data = { name, PatientId };
    AddFile(data, (status) => {
      if (status) {
        fileStore.setName(null);
        fileStore.setPatientId(null);
        loadData();
        message.success("Insert successfully .");
      } else {
        message.error("The process is not complete!");
      }
    });
  };

  const uploadFile = (file) => {
    var sourceFile = file.path;
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir);
      console.log("folder created : " + distDir)
    }
    fs.copyFile(sourceFile, distDir + file.name, (err) => {
      if (err) throw err;
      console.log(file.name + ' was copied to attachments folder ' + distDir);
    });
  };

  const handleFileUpload = (file) => {
    try {
      uploadFile(file);
      createFile(file.name, id);
    } catch (error) {
      message.error("The process is not complete! " + error);
    }
  };

  const handleDeleteFile = (id, fileName) => {
    let fullPath = path.resolve(distDir);
    deleteFile(id, (result) => {
      if (result.status) {
        message.success("delte successfully .");
        loadData();
        fs.unlinkSync(fullPath +"\\"+ fileName);
      }
    })
  }
  // =============================================
  // ============================================
  // drug block
  const loadDrug = () => {
    setLoading(true);
    getDrug(page, (result) => {
      if (result.status) {
        setLoading(false);
        setDrugData(result.drugs);
        // setCount(result.total);
        // setPages(result.pages);
        // console.log(result.drugs);
      }
    });
  }
  const handleDrugAdd = () => {
    setSelectedDrugs([
      ...selectedDrugs,
      {
        id: uuidv4(),
        name: drugName,
        note: drugNote,
      },
    ]);
  };

  const handlRemoveDrug = (id) => {
    setSelectedDrugs(selectedDrugs.filter((el) => el.id !== id));
  };

  const createCheckup = () => {
    let date = new Date().toString();
    let pres = JSON.stringify(selectedDrugs);
    let diagnosis = visitStore.diagnosis;
    let PatientId = id;
    let data = { date, diagnosis, pres, PatientId };
    // console.log(data);
    createVisit(data, (status) => {
      if (status) {
        visitStore.setDate(null);
        visitStore.setDiagnosis(null);
        visitStore.setPres(null);
        visitStore.setPatientId(null);

        message.success("Insert successfully .");
      } else {
        message.error("The process is not complete!");
      }
    });
  };


  return (
    <div className="page" style={{ paddingTop: 25 }}>
      <Row gutter={[50, 50]}>
        <Col span={16}>
          <Row gutter={[20, 40]}>
            <Col span={24}>
              {InputFiled(
                "The diagnosis",
                <TextArea
                  value={visitStore.diagnosis}
                  onChange={(e) => visitStore.setDiagnosis(e.target.value)}
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
                value={drugName}
                style={{ width: "100%" }}
                placeholder="Chose Drug . . ."
                onChange={(val) => setDrugName(val)}
              >
                {drugData.map(item => <Option value={item.name} key={item.id}>{item.name}</Option>)}
              </Select>
            </Col>

            <Col span={9} style={{ display: "flex", alignItems: "flex-end" }}>
              <Input value={drugNote}
                onChange={(e) => setDrugNote(e.target.value)}
                size="large" placeholder="Note" />
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
                onClick={handleDrugAdd}
                icon={<PlusOutlined />}
              />
            </Col>
            <Col span={24}>
              <div className="selected-drugs">
                {selectedDrugs.map((item) => (
                  <DrugItem key={item.id} item={item} onRemove={handlRemoveDrug} />
                ))}
              </div>
            </Col>
            <Col span={24}>
              <Button
                type="link"
                className="add-btn"
                size="large"
                onClick={createCheckup}
                icon={<SaveOutlined />}
              >
                Save & Print
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <h4>Attachments</h4>
          <DropZon onChange={file => handleFileUpload(file)} />
          {
            fileData.map(item => <FileItem key={item.id} item={item} onRemove={handleDeleteFile} />)
          }
        </Col>
      </Row>
    </div>
  );
};
