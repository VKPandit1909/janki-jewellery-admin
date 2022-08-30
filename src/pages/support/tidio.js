import { Card, message, Switch } from "antd";
import Item from "antd/lib/list/Item";
import { Button } from "antd/lib/radio";
import React, { useCallback, useEffect, useState } from "react";
import "./index.css";

const Tidio = () => {
  const [status, setStatus] = useState(false);

  const getTidioStatus = useCallback(async () => {
    fetch("http://localhost:5001/admin/contact/tidio/status", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data, "results");
        if (result.status == "ok") {
          setStatus(result.data[0].status);
        } else {
          message.error("Error fetching the reviews");
        }
      });
  }, []);

  useEffect(() => {
    getTidioStatus();
  }, []);

  const updateStatus = () => {
    fetch("http://localhost:5001/admin/contact/tidio/update", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + window.localStorage.getItem("token"),
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        status: status
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result, "results");
        if (result.status == "ok") {
          message.success("Tidio Status Updated Successfully.");
        } else {
          message.error("Error fetching the status");
        }
      });
  };

  return (
    <div className="mt-40">
      <div className="d-block">
        <h2 className="section-title">Tidio</h2>
      </div>
      <Card title="Tidio Status" className="main-attr-container">
        <Item title="Status" name={"status"}>
          <Switch checked={status} onChange={(val) => setStatus(val)} />
        </Item>
        <Item>
          <Button type="submit" onClick={updateStatus} className="login-form-button">
            Update Status
          </Button>
        </Item>
      </Card>
    </div>
  );
};
export default Tidio;
