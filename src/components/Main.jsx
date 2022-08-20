import React, { useState, useEffect } from "react";
import Devices from "./Devices";
import "./main.css";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useParams } from "react-router-dom";
import picRouter from "../assets/router.png";
import picSwitch from "../assets/switch.png";

function Main() {
  const { id } = useParams();

  useEffect(() => {
    fetch("http://localhost:8000/project/templates/all")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  const [data, setData] = useState([]);
  const [bool, setBool] = useState(true);
  const [bool2, setBool2] = useState(true);

  const handleNodes = () => {
    const element1 = document.getElementById("i1");
    const element2 = document.getElementById("i2");

    element1.classList.add("active");
    element2.classList.remove("active");
  };
  const handleLinks = () => {
    const element1 = document.getElementById("i1");
    const element2 = document.getElementById("i2");

    element1.classList.remove("active");
    element2.classList.add("active");
  };

  const handleTemp = (name) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ template: name }),
    };
    fetch("http://127.0.0.1:8000/project/nodes/" + id, requestOptions).then(
      (response) => {
        console.log(response);
        setBool2(!bool2);
      }
    );
  };

  return (
    <div className="page">
      <div className="sidebar">
      <div className="menulist">
            <div
              className="item2 active "
              id="i1"
              onClick={() => {
                handleNodes();
                setBool(true);
              }}
            >
              Nodes
            </div>
            <div
              className="item2"
              id="i2"
              onClick={() => {
                handleLinks();
                setBool(false);
              }}
            >
              Links
            </div>
          </div>
        <div className="text-title">
          <h3 className="title"> Devices </h3>
        </div>

        <div className="sidebarmenu">
          <div className="menulistDevices ">
            {data.map((item, k) =>
              item.name === "vios" ? (
                <div key={k} className="item">
                  <div className="sidebarimg">
                    <img className="switch" src={picSwitch} />
                  </div>
                  <div className="txt-icon1">
                    <p>{item.name}</p>
                    <AddCircleOutlineRoundedIcon
                      className="icon"
                      onClick={() => {
                        handleTemp(item.name);
                      }}
                    />
                  </div>
                </div>
              ) : item.name === "c7200" ? (
                <div key={k} className="item">
                  <div className="sidebarimg">
                    <img className="router" src={picRouter} />
                  </div>
                  <div className="txt-icon2">
                    <p>{item.name}</p>

                    <AddCircleOutlineRoundedIcon
                      className="icon"
                      onClick={() => {
                        handleTemp(item.name);
                      }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
          
        </div>
      </div>
      <div className="cadre">
        <Devices id={id} bool2={bool2} bool={bool} setBool={setBool} />
      </div>
    </div>
  );
}

export default Main;
