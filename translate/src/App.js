import React, { Component } from 'react';



import './App.css';
import { Layout, Menu, Icon } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

var timer;

class Tooltip extends Component {



  render() {
    var translatedStr = "Esta es un asombroso oración"
    var translatedArr = translatedStr.split(" ");
    return (
      <span>
        {translatedArr[this.props.word]}
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
      <span uid={this.props.uid} onMouseOver={() => this.handleHoverOn(this.props.uid)} onMouseLeave={() => this.handleHoverOff()} >

        {this.props.contents}
        {this.state.currentWord === this.props.uid? <Tooltip word={this.state.currentWord}/>: ""}
      </span>
    )
  }
}

class App extends Component {
  render() {
    var str = "This is an amazing sentence";
    var words = str.split(" ");

    var rowsArr = [];
    for (var i = 0; i < words.length; i++) {
				rowsArr.push(
					<Word key={i} contents={words[i]} uid={i}/>, " "
				);
		}


    return (
      <div className="App">
      <Layout>
          <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
            <h1 style={{color: 'white'}}>
              Hover over a word
            </h1>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: '#fff', padding: 0 }}>
              <h1>
                TranslatR
              </h1>
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
                {rowsArr}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2016 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
