import React, { Component } from 'react';



import './App.css';
import { Layout } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

var timer;


class Word extends Component {
  constructor() {
		super();

    this.handleHoverOn = this.handleHoverOn.bind(this);

		this.state = {
      currentWord: -1
		}
	}

  handleHoverOn = (uid) => {
    var translatedStr = "Esta es un asombroso oración"
    var translatedArr = translatedStr.split(" ");

    timer = setTimeout(() => {
      this.props.whenHoverOn(translatedArr[uid])
    }, 500)
	}

  handleClickOn = (uid) => {
    var translatedStr = "Esta es un asombroso oración"
    var translatedArr = translatedStr.split(" ");

      this.props.whenHoverOn(translatedArr[uid])

	}

  handleHoverOff = (evt) => {
    clearTimeout(timer);

    this.props.whenHoverOff()
  }

  render() {
    return (
      <span uid={this.props.uid} onMouseOver={() => this.handleHoverOn(this.props.uid)} onClick={() => this.handleClickOn(this.props.uid)} onMouseLeave={() => this.handleHoverOff()} >
        {this.props.contents}
      </span>
    )
  }
}

class App extends Component {
  constructor() {
		super();

		this.state = {
      display: "",
      title: "",
      content: ""
		}
	}

  componentDidMount() {
    this.fetchBookContent();
  }

  fetchBookContent() {
    fetch('http://localhost:8000/collection/5a8c2f042a98acfc228ed65f')
    .then((result) => {
      return result.json();
    }).then((jsonResult) => {
      this.setState({ title: jsonResult.title, content: jsonResult.content })
    })



    // fetch('https://mywebsite.com/endpoint/', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     firstParam: 'yourValue',
    //     secondParam: 'yourOtherValue',
    //   }),
    // });
  }

  whenHoverOn = (value) => {
    this.setState({
      display: value
    });
  }

  whenHoverOff = () => {
    this.setState({
      display: ""
    });
  }


  render() {
    //var str = "This is an amazing sentence";
    var str = this.state.content;
    // get from localhost:8000/collection/5a8c2f042a98acfc228ed65f
    var words = str.split(" ");

    var rowsArr = [];
    for (var i = 0; i < words.length; i++) {
				rowsArr.push(
					<Word key={i} whenHoverOn={this.whenHoverOn} whenHoverOff={this.whenHoverOff} contents={words[i]} uid={i}/>, " "
				);
		}


    return (
      <div className="App">
      <Layout>
          <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
            <h1 style={{color: 'white'}}>
              You are reading: {this.state.title}
            </h1>
            <h2 style={{color: 'white'}}>
              Hover over a word for its definition <br />
              {this.state.display === ""? "": this.state.display}
            </h2>
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
              Elliott Coleman © 2018
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
