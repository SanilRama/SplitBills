import React, { Component } from "react";
import "./App.css";

import Splitter from "./components/Splitter.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: "center", padding: "50px 0px 50px 0px" }}>
          <img src="./splitbills.png" alt="Split Bills Logo" width="250" />
        </div>
        <Splitter />
      </div>
    );
  }
}

export default App;
