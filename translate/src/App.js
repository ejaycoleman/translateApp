import React, { Component } from 'react';
import './App.css';

var timer;

class Tooltip extends Component {
  render() {
    return (
      <span>
        yes
      </span>
    )
  }
}

class Word extends Component {
  constructor() {
		super();

    this.handleHoverOn = this.handleHoverOn.bind(this);

		this.state = {
      currentWord: -1
		}
	}

  handleHoverOn = (uid) => {
    timer = setTimeout(() => {
      this.setState({
        currentWord: uid
      });
      console.log(uid);
    }, 500)
	}

  handleHoverOff = (evt) => {
    clearTimeout(timer);
    this.setState({
      currentWord: -1
    });
  }

  render() {
    return (
      <span uid={this.props.uid} onMouseOver={() => this.handleHoverOn(this.props.uid)} onMouseLeave={() => this.handleHoverOff()}>
        {this.props.contents}
        {this.state.currentWord == this.props.uid? <Tooltip />: ""}
      </span>
    )
  }
}

class App extends Component {
  render() {
    var str = "This is an amazing sentence.";
    var words = str.split(" ");

    var rowsArr = [];
    for (var i = 0; i < words.length; i++) {
				rowsArr.push(
					<Word key={i} contents={words[i]} uid={i}/>, " "
				);
		}

    return (
      <div className="App">
        {rowsArr}
      </div>
    );
  }
}

export default App;
