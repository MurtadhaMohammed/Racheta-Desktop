import React, { useState, useEffect } from "react";
import { Select, Button, Empty, Spin, Drawer, message } from "antd";
import { PatientItem, PatientForm } from "../components/home";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PatientStore } from "../store/patinetStore";
import { createPatient, getPatients } from "../db/controllers";

const { Option } = Select;

const patients = [
  {
    id: 1,
    name: "Murtadha M.Abed",
    gender: "male",
    phone: "077108756002",
    age: 35,
    address: "Baghdad - Al-shaab",
  },
  {
    id: 2,
    name: "مروه احمد ستار",
    gender: "female",
    phone: "078108756983",
    age: 28,
    address: "بغداد - البلديات",
  },
  {
    id: 3,
    name: "Ali M.Salim",
    gender: "male",
    phone: "077190756553",
    age: 26,
    address: "Baghdad - Al-Mansoor",
  },
  {
    id: 4,
    name: "Zainab Ali",
    gender: "female",
    phone: "078108756553",
    age: 16,
    address: "Baghdad",
  },
  {
    id: 5,
    name: "سارة علي سلام",
    gender: "female",
    phone: "078108756120",
    age: 23,
    address: "بغداد - شارع فلسطين",
  },
  {
    id: 6,
    name: "حامد سلوم سلمان",
    gender: "male",
    phone: "078108756121",
    age: 23,
    address: "بغداد - شارع فلسطين",
  },
];

export const HomeScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [query, setQuery] = useState("");

  let {
    name,
    age,
    address,
    gender,
    phone,
    setName,
    setAge,
    setGender,
    setPhone,
    setAddress,
  } = PatientStore();

  useEffect(() => {
    loadData();
  }, [page, query]);

  const loadData = () => {
    setLoading(true);
    getPatients(page, query, (result) => {
      if (result.status) {
        setLoading(false);
        setData(result.patients);
        setCount(result.total);
        setPages(result.pages);
      }
    });
  };

  const addPatient = () => {
    let data = { name, age, address, gender, phone };
    setAddLoading(true);
    createPatient(data, (status) => {
      if (status) {
        setAddLoading(false);
        setName(null);
        setAge(null);
        setGender(null);
        setPhone(null);
        setAddress(null);
        setIsNew(false);
        loadData();
        message.success("Insert successfully .");
      } else {
        setAddLoading(false);
        message.error("The process is not complete!");
      }
    });
  };

  return (
    <div className="page">
      <section className="app-flex patients-list-header">
        <div>
          <span>Patient List for</span>
          <Select defaultValue="1" bordered={false}>
            <Option value={"1"}>This Day</Option>
            <Option value={"2"}>Last Week</Option>
            <Option value={"3"}>All </Option>
          </Select>
        </div>
        <Button size="large" type="link" onClick={() => setIsNew(true)}>
          + New Patient
        </Button>
      </section>
      <section className="patients-list">
        <Spin tip="Loading..." spinning={loading}>
          {data.length > 0 ? (
            data.map((item) => <PatientItem key={item.id} item={item} />)
          ) : (
            <Empty
              style={{ padding: 50 }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
          <div className="patient-item list-footer">
            <div className="left">{count} Patients for search results</div>
            <div className="right">
              <Button
                type="text"
                icon={<FaArrowLeft style={{ fontSize: 12 }} />}
                disabled={page === 1 ? true : false}
                onClick={() => setPage(pages + 1)}
              />
              <span>
                {page}/{pages}
              </span>
              <Button
                type="text"
                icon={<FaArrowRight style={{ fontSize: 12 }} />}
                disabled={page === pages ? true : false}
                onClick={() => setPage(pages - 1)}
              />
            </div>
          </div>
        </Spin>
      </section>
      <Drawer
        title={<span>New Patient</span>}
        placement="right"
        closable={true}
        width={440}
        onClose={() => setIsNew(false)}
        visible={isNew}
      >
        <PatientForm loading={addLoading} onSubmit={addPatient} />
      </Drawer>
    </div>
  );
};
