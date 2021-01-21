import React, { useState, useEffect } from "react";
import { Select, Button, message, Row, Col } from "antd";
import { DrugForm, DrugsItem } from "../components/drugs";
import { createDrug, getDrug } from "../db/controllers";
import { DrugStore } from "../store/drugStore";

const { Option } = Select;

export const DrugsScreen = (props) => {

  const colors = ['#008891', '#ef4f4f', '#ff9a00', '#1fab89', '#d72323', '#0c056d'];
  const randomColor = (color) => {
    return color[Math.floor((Math.random() * color.length))];
  }

  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [addLoading, setAddLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  let {
    name,
    color,
    setName,
    setColor
  } = DrugStore();

  useEffect(() => {
    loadData();
  }, [page]);
  const loadData = () => {
    setLoading(true);
    getDrug(page, (result) => {
      if (result.status) {
        setLoading(false);
        setData(result.drugs);
        setCount(result.total);
        setPages(result.pages);
      }
    });
  };


  const addDrug = () => {
    color = randomColor(colors);
    let data = { name, color };
    createDrug(data, (status) => {
      if (status) {
        setAddLoading(false);
        setName(null);
        setColor(null);
        loadData();
        message.success("Insert successfully .");
      } else {
        setAddLoading(false);
        message.error("The process is not complete!");
      }
    });
    setIsModalVisible(false); // close modal after add
  };


  const handleDeleteDrug = (id) => {
    deleteDrug(id, (result) => {
      if (result.status) {
        message.success("delete drug succefully");
      } else {
        message.error("error");
      }
    });
  }

  return (
    <div className="page">
      <section className="app-flex patients-list-header">
        <div>
          <span>Drug List</span>
        </div>
        <Button size="large" type="link" onClick={() => setIsModalVisible(true)}>
          + New Drug
        </Button>
      </section>
      <section className="drugs-list">
        <Row gutter={[20, 20]}>
          {data.map((item) => (
            <Col key={item.id} md={12} lg={8}>
              <DrugsItem item={item} />
            </Col>
          ))}
        </Row>
      </section>
      <DrugForm visible={isModalVisible} loading={addLoading} onSubmit={addDrug} onClose={() => setIsModalVisible(false)} />
    </div>
  );
};
