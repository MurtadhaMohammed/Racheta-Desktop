import React, { useState, useEffect } from "react";
import { Select, Button, Empty, Spin, message, Row, Col, Input } from "antd";
import { PatientItem, PatientForm } from "../components/home";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { DrugItem, FileItem } from "../components/chekup";
import { DropZon } from "../components";
import { FileStore } from "../store/fileStore";
import { VisitStore } from "../store/visitStore";
import { AddFile, createVisit, getDrug, getFile } from "../db/controllers";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const fs = require('fs');

const { Option } = Select;
const { TextArea } = Input;

const InputFiled = (label, input) => (
  <div className="text-input" style={{ width: "100%" }}>
    <p style={{ marginBottom: 8 }}>{label}</p>
    <div style={{ display: "flex" }}>{input}</div>
  </div>
);

// const selectedDrugs = [
//   {
//     id: 34,
//     name: "New Test Drug name",
//     note: "this is just test note",
//   },
//   {
//     id: 56,
//     name: "Drug name for test only",
//     note: "this is a test",
//   },
//   {
//     id: 43,
//     name: "Foo Bar",
//     note: "just test note",
//   },
// ];

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
  const [drugData, setDrugData] = useState([]);
  const [selectedDrugs, setSelectedDrugs] = useState([]);
  const [drugName, setDrugName] = useState("");
  const [drugNote, setDrugNote] = useState("");

  const distDir = './attach/'; // attachements folder path
  let { id } = useParams(); // get patient id 
  // let {
  //   name,
  //   patientId,
  //   setName,
  //   setPatientId
  // } = FileStore();

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

  // date
  // diagnosis
  // pres
  // PatientId
  // setDate
  // setDiagnosis
  // setPres
  // setPatientId

  const createCheckup = () => {
    let date = new Date().toString;
    let pres = JSON.stringify(selectedDrugs);
    let patientId = id;
    let diagnosis = visitStore.diagnosis;
    let data = { date, diagnosis, pres, patientId };
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
  // }

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
                  <DrugItem key={item.id} item={item} />
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
            fileData.map(item => <FileItem key={item.id} item={item} />)
          }
        </Col>
      </Row>
    </div>
  );
};
