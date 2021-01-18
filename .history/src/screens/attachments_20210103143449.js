import React, { useState, useEffect } from "react";
import { Select, Button, Empty, Spin, Drawer, Row, Col } from "antd";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AttachmentItem } from "../components/attachments";

const { Option } = Select;

const files = [
  {
    id: 1,
    title: 'Test DH results doers Foo Yees',
    name:'مرتضى محمد علاء',
    date: 'Nov 20, 2020',
    type: 'pdf'
  },
  {
    id: 3,
    title: 'Test DH results doers Bar Noo This Test Only',
    name: 'ِAli Salam',
    date: 'Nov 20, 2020',
    type: 'xls'
  },
  {
    id: 89,
    title: 'Test DH results doers',
    name: 'Marwa Salam',
    date: 'Nov 20, 2020',
    type: 'pdf'
  },
  {
    id: 4,
    title: 'Test DH results doers',
    name: 'Yasser Ali',
    date: 'Nov 20, 2020',
    type: 'wav'
  },
  {
    id: 5,
    title: 'Test DH results doers',
    name: 'Noor Jasim Abed',
    date: 'Nov 20, 2020',
    type: 'doc'
  },
  {
    id: 6,
    title: 'Test DH results doers Foo Yees',
    name:'مرتضى محمد علاء',
    date: 'Nov 20, 2020',
    type: 'pdf'
  },
  {
    id: 7,
    title: 'Test DH results doers Bar Noo This Test Only',
    name: 'ِAli Salam',
    date: 'Nov 20, 2020',
    type: 'xls'
  },
];

export const AttachmentsScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="page">
      <section className="app-flex patients-list-header">
        <div>
          <span>List of Attachments for </span>
          <Select defaultValue="1" bordered={false}>
            <Option value={"1"}>This Day</Option>
            <Option value={"2"}>Last Week</Option>
            <Option value={"3"}>All </Option>
          </Select>
        </div>
        {/* <Button size="large" type="link" onClick={()=> setIsNew(true)}>
          + New Patient
        </Button> */}
      </section>
      <section className="attachment-list">
        <Row gutter={[20,20]}>
          {
            files.map(item=> <Col key={item.id}  md={12} lg={8}>
              <AttachmentItem item={item}/>
           </Col>)
          }
         
        </Row>
      </section>
     
    </div>
  );
};
