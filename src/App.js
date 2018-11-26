import React, { Component } from "react";

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()<>?:\"|{}_+1234567890§±-=[];',./\\".split(
  ""
);
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      step: "1",
      isCalcVisible: false,
      cipher: "",
      _step: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.eval = this.eval.bind(this);
    this.shift = this.shift.bind(this);
  }
  handleChange(env) {
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
    let index = -1;
    if (shiftUp) {
      index = chars.findIndex(l => l === letter);
      index += step;
      result = chars[index];
    }
    return result;
  }
  eval() {
    const { input, _step } = this.state;
    let resultChars = [];
    let inputChars = input.split("");
    resultChars = inputChars.map(char => {
      return this.shift(char, _step, true);
    });
    this.setState({ cipher: resultChars.join("") });
  }
  render() {
    return (
      <div className="app">
        <input
          type="text"
          name="input"
          value={this.state.input}
          onChange={this.handleChange}
          placeholder="Enter Text..."
        />
        <input
          type="number"
          name="step"
          value={this.state.step}
          onChange={this.handleChange}
          placeholder="0"
        />
        <button onClick={() => this.eval()}>Convert</button>
        <h3>{"The encrypted text is : "}</h3>
        <h5>{this.state.cipher}</h5>
      </div>
    );
  }
}