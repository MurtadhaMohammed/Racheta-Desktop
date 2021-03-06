import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "./components";
import { FaArrowLeft } from "react-icons/fa";

import "./css/app.css";
import "./css/custom.css";
import {
  HomeScreen,
  AttachmentsScreen,
  ChekupScreen,
  DrugsScreen,
} from "./screens";
import { Button } from "antd";

import { HashRouter as Router, Switch, Route, useLocation } from "react-router-dom";

import { updatePatient,deletePatient, createVisit, getVisits, updateVisit, deleteVisit } from "../src/db/controllers"

const SreachComponent = () => (
  <div className="search-box">
    <img src={require("./assets/search.svg")} />
    <input placeholder="Search for list . . ." />
  </div>
);

const GoBackComponent = () => (
  <div style={{ display: "inline-block" }}>
    <Button type="text" icon={<FaArrowLeft />} />
    <span
      style={{
        fontSize: 18,
        fontWeight: "bold",
        marginLeft: 20,
        marginTop: -5,
      }}
    >
      مصطفى سلام نوري
    </span>
  </div>
);

function App() {
  //let location = useLocation();
  useEffect(() => {

    // Patient

    // const patient = {
    //   phone: '5456465',
    // }
    // updatePatient(2, patient, (resp) => {
    //   if (resp.status) {
    //     alert("Update patient succefully");
    //   } else {
    //     alert("error");
    //   }
    // });

    deletePatient(4, (resp) => {
      if (resp.status) {
        alert("delete patient succefully");
      } else {
        alert("error");
      }
    });
    // ==================================================

    // Visit test

    // const visit1 = {
    //   id: 1,
    //   date: '2/1/2020',
    //   diagnosis: 'blaaedde blaa blaa',
    //   pres: '-baracetol tab 1*3 -imprazole tab 1*1',
    //   PatientId: 1
    // }
    // const visit2 = {
    //   id: 2,
    //   date: '3/1/2020',
    //   diagnosis: 'blaaedde blaa blaa',
    //   pres: '-baracetol tab 1*3 -imprazole tab 1*1',
    //   PatientId: 1
    // }
    // const visit3 = {
    //   id: 3,
    //   date: '4/1/2020',
    //   diagnosis: 'blaaedde blaa blaa',
    //   pres: '-baracetol tab 1*3 -imprazole tab 1*1',
    //   PatientId: 1
    // }
    // const visit4 = {
    //   id: 4,
    //   date: '2/1/2020',
    //   diagnosis: 'blaaedde blaa blaa',
    //   pres: '-baracetol tab 1*3 -imprazole tab 1*1',
    //   PatientId: 2
    // }

    // createVisit(visit1,(resp)=> {
    //     if (resp) {
    //             alert("create visit succefully");
    //           } else {
    //             alert("error");
    //           }
    //         });
    // createVisit(visit2,(resp)=> {
    //     if (resp) {
    //             alert("create visit succefully");
    //           } else {
    //             alert("error");
    //           }
    //         });
    // createVisit(visit3,(resp)=> {
    //     if (resp) {
    //             alert("create visit succefully");
    //           } else {
    //             alert("error");
    //           }
    //         });
    // createVisit(visit4,(resp)=> {
    //     if (resp) {
    //             alert("create visit succefully");
    //           } else {
    //             alert("error");
    //           }
    //         });


    // get visit by patient id with pagenation
    // getVisits(1,1,(resp) => {
    //           if (resp.status) {
    //             console.log(resp.visits);
    //           } else {
    //             alert("error");
    //           }
    //         });

    // const visit1 = {
    //   date: '2/1/2020',
    // }
    // updateVisit(2, visit1, (resp) => {
    //   if (resp.status) {
    //     alert("Update visit succefully");
    //   } else {
    //     alert("error");
    //   }
    // });

    // deleteVisit(4, (resp) => {
    //   if (resp.status) {
    //     alert("delete visit succefully");
    //   } else {
    //     alert("error");
    //   }
    // });
    // ================================================

    

    console.log(location.hash)
  }, [location.hash])
  return (
    <Router>
      <AppContainer head={SreachComponent()}>
        <Switch>
          <Route path="/patients/:id">
            <ChekupScreen />
          </Route>
          <Route path="/drugs">
            <DrugsScreen />
          </Route>
          <Route path="/attachements">
            <AttachmentsScreen />
          </Route>
          <Route path="/">
            <HomeScreen />
          </Route>
        </Switch>
      </AppContainer>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
