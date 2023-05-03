import React from "react";

const ChatbotCard = (props) => {
  return (
    <div style={{ height: 500, width: 261 }}>
      <div className="card">
        <div className="card-image" style={{ width: 261 }}>
          <img src={props.payload.fields.image.stringValue} alt="" />
          <span className="card-title">
            {props.payload.fields.title.stringValue}
          </span>
          <div className="card-content">
            <p>Author: {props.payload.fields.author.stringValue}</p>
            <p>Year: {props.payload.fields.year.stringValue}</p>
          </div>
          {/* <div className="card-action">
          <a href="#">This is a link</a>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatbotCard;
