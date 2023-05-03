import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import {
  AppBar,
  Box,
  TextField,
  IconButton,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  Toolbar,
} from "@mui/material";
import Message from "./Message";
import ChatbotCard from "./ChatbotCard";
import { MdAndroid } from "react-icons/md";

const cookies = new Cookies();

class Chatbot extends Component {
  messagesEnd;
  talkInput;

  constructor(props) {
    super(props);

    this._handleInputKeyDown = this._handleInputKeyDown.bind(this);
    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);
    this.state = {
      messages: [],
      isOpen: true,
      showBot: false,
    };

    if (cookies.get("userID") === undefined) {
      cookies.set("userID", uuid(), { path: "/" });
    }
    console.log(cookies.get("userID"));
  }

  async df_text_query(text) {
    let says = {
      speaks: "me",
      msg: {
        text: {
          text: text,
        },
      },
    };

    this.setState({ messages: [...this.state.messages, says] });
    const res = await axios.post("api/df_text_query", {
      text,
      userID: cookies.get("userID"),
    });

    for (let msg of res.data.fulfillmentMessages) {
      says = {
        speaks: "bot",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }

  async df_event_query(event) {
    const res = await axios.post("api/df_event_query", {
      event,
      userID: cookies.get("userID"),
    });

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }

  componentDidMount() {
    this.df_event_query("Welcome");
  }

  componentDidUpdate() {
    if (!this.state.showBot) {
      // If the chatbot is closed, do nothing
      return;
    }

    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    if (this.talkInput) {
      this.talkInput.focus();
    }
  }

  show(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showBot: true });
  }

  hide(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showBot: false });
  }

  renderCards(cards) {
    return cards.map((card, i) => (
      <ChatbotCard key={i} payload={card.structValue} />
    ));
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.cards
    ) {
      return (
        <Grid key={i} item xs={12}>
          <Card variant="outlined">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Button
                    href="/"
                    variant="contained"
                    color="success"
                    size="large"
                  >
                    {message.speaks}
                  </Button>
                </Grid>
                <Grid item xs={10}>
                  <div style={{ height: 500, overflowY: "scroll" }}>
                    {this.renderCards(
                      message.msg.payload.fields.cards.listValue.values
                    )}
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      );
    }
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }
  _handleInputKeyDown(e) {
    if (e.key === "Enter") {
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  }
  render() {
    if (this.state.showBot) {
      return (
        <Box
          id="chatbot-container"
          sx={{
            position: "fixed",
            bottom: "70px",
            right: "20px",
            height: "500px",
            width: "400px",
            border: "1px solid transparent",
            borderRadius: "16px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            backgroundColor: "#fff",
          }}
        >
          <AppBar position="static">
            <Toolbar sx={{ bgcolor: "black" }}>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MdAndroid size={32} color="#0aee15" />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "white" }}
              >
                ChatBot
              </Typography>
              <ul className="right hide-on-med-and-down">
                <li>
                  <a href="/" onClick={this.hide} className="white-text">
                    Close
                  </a>
                </li>
              </ul>
            </Toolbar>
          </AppBar>

          <Box
            id="chatbot"
            sx={{
              height: 388,
              width: "100%",
              overflow: "auto",
            }}
          >
            {this.renderMessages(this.state.messages)}
            <Box
              ref={(el) => {
                this.messagesEnd = el;
              }}
              sx={{
                float: "left",
                clear: "both",
              }}
            />
          </Box>

          <Box className="col s12" sx={{ width: "398px" }}>
            <TextField
              type="text"
              inputRef={(input) => {
                this.talkInput = input;
              }}
              placeholder="type a message"
              onKeyDown={this._handleInputKeyDown}
              sx={{
                backgroundColor: "white",
                width: "398px",
                border: "1px solid black",
                "&:hover": {
                  backgroundColor: "lightgrey",
                },
              }}
            />
          </Box>
        </Box>
      );
    } else {
      return (
        <Box
          id="chatbot-container"
          sx={{
            position: "fixed",
            bottom: "70px",
            right: "20px",
            height: "500px",
            width: "400px",
            border: "1px solid transparent",
            borderRadius: "16px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
            backgroundColor: "transparent",
          }}
        >
          <AppBar position="static">
            <Toolbar sx={{ bgcolor: "black" }}>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MdAndroid size={32} color="#0aee15" />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, color: "white" }}
              >
                ChatBot
              </Typography>
              <ul className="right hide-on-med-and-down">
                <li>
                  <a href="/" onClick={this.show} className="white-text">
                    Show
                  </a>
                </li>
              </ul>
            </Toolbar>
          </AppBar>
          <Box
            ref={(el) => {
              this.messagesEnd = el;
            }}
            style={{ float: "left", clear: "both" }}
          ></Box>
        </Box>
      );
    }
  }
}

export default Chatbot;
