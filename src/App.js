import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./css/index.css";

//Chinese Version
const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()<>?:|{}_+1234567890§±-=[];,.".split(
  ""
);
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      step: "1",
      isEncrypt: true,
      cipher: "",
      _step: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.eval = this.eval.bind(this);
    this.shift = this.shift.bind(this);
  }
  handleChange(env) {
    if (env.target.name === "select") {
      this.setState({ isEncrypt: env.target.value === "encrypt" });
    }
    if (this.state.input === "") this.setState({ cipher: "" });
    if (env.target.name === "step") {
      let temp = env.target.value === "" ? 0 : Number(env.target.value);
      this.setState({ [env.target.name]: env.target.value, _step: temp });
      return;
    }
    this.setState({ [env.target.name]: env.target.value });
  }
  shift(letter, step, shiftUp) {
    let result = letter;
    if (
      letter === " " ||
      letter === "/" ||
      letter === "\\" ||
      letter === "'" ||
      letter === '"'
    )
      return result;
    let index = -1;
    index = chars.findIndex(l => l === letter);
    if (shiftUp) {
      console.log("encrypt");
      index += step;
      if (index > chars.length - 1) {
        index += chars.length;
      }
    } else {
      console.log("decrypt");
      index -= step;
      if (index < 0) {
        index -= chars.length;
      }
    }
    result = chars[index];
    return result;
  }
  eval() {
    const { input, _step, isEncrypt } = this.state;
    let resultChars = [];
    let inputChars = input.split("");
    resultChars = inputChars.map(char => {
      return this.shift(char, _step, isEncrypt);
    });
    this.setState({ cipher: resultChars.join("") });
  }
  render() {
    console.log(this.state.cipher);
    return (
      <div className={styles.app}>
        <Link className={styles.link} to="/en">
          EN
        </Link>
        <input
          type="text"
          name="input"
          value={this.state.input}
          onChange={this.handleChange}
          placeholder="输入文本"
        />
        <input
          type="number"
          name="step"
          value={this.state.step}
          onChange={this.handleChange}
          placeholder="0"
        />
        <select
          name="select"
          onChange={this.handleChange}
          value={this.state.isEncrypt ? "encrypt" : "decrypt"}
        >
          <option value="encrypt">加密</option>
          <option value="decrypt">解密</option>
        </select>
        <button onClick={() => this.eval()}>转换</button>
        <h3>{"加密的文本是,"}</h3>
        <h5>{this.state.cipher}</h5>
      </div>
    );
  }
}
