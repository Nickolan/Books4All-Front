import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const ChatbotCard = (props) => {
  return (
    <div style={{ height: 500, width: 261 }}>
      <Card>
        <CardMedia
          component="img"
          height="350"
          image={props.payload.fields.image.stringValue}
          alt=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.payload.fields.title.stringValue}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {props.payload.fields.author.stringValue}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Year: {props.payload.fields.year.stringValue}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatbotCard;
