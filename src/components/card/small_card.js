import { Card } from "antd";
import React from "react";
import "./small_card.css";

const SmallCard = (props) => {
  return (
    <Card bordered={false} className="small_card-container">
      <div className="flex-grow">
        <label className="label-card text-muted">{props.label}</label><br />
        <span className="desc-card">{props.value}</span>
      </div>
      <div className="rounded-circle">
        {props.icon}
      </div>
    </Card>
  );
};

export default SmallCard;