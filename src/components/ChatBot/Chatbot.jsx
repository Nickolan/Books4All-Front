import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
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
        <div key={i}>
          <div className="card-panel grey lighten-5 z-depth-1">
            <div style={{ overflow: "hidden" }}></div>
            <div className="col s2">
              <a
                href="/"
                className="btn-floating btn-large waves-effect waves-light light-green accent-3"
              >
                {message.speaks}
              </a>
            </div>
            <div style={{ overflow: "auto", overFlowY: "scroll" }}>
              <div
                style={{
                  height: 500,
                  // width:
                  //   message.msg.payload.fields.cards.listValue.values.length *
                  //   261,
                }}
              >
                {this.renderCards(
                  message.msg.payload.fields.cards.listValue.values
                )}
              </div>
            </div>
          </div>
        </div>
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
        <div
          id="chatbot-container"
          style={{
            position: "fixed",
            bottom: "64px",
            right: "20px",
            height: "500px",
            width: "400px",
            border: "1px solid lightgrey",
          }}
        >
          <nav>
            <div className="nav-wrapper black">
              <a href="/" className="brand-logo white-text">
                <MdAndroid size={32} color="#0aee15" /> ChatBot
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a href="/" onClick={this.hide} className="white-text">
                    Close
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div
            id="chatbot"
            style={{ height: 388, width: "100%", overflow: "auto" }}
          >
            {this.renderMessages(this.state.messages)}
            <div
              ref={(el) => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            ></div>
          </div>
          <div className="col s12">
            <input
              style={{ backgroundColor: "lightgrey" }} // added style here
              type="text"
              ref={(input) => {
                this.talkInput = input;
              }}
              placeholder="type a message"
              onKeyDown={this._handleInputKeyDown}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            minHeight: 40,
            maxHeight: 500,
            width: 400,
            position: "absolute",
            bottom: 0,
            right: 0,
            border: "1px solid lightgray",
          }}
        >
          <nav>
            <div className="nav-wrapper black">
              <a href="/" className="brand-logo white-text">
                <MdAndroid size={32} color="#0aee15" /> ChatBot
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a href="/" onClick={this.show} className="white-text">
                    Show
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
            style={{ float: "left", clear: "both" }}
          ></div>
        </div>
      );
    }
  }
}

export default Chatbot;
