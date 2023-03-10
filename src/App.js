import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {

  state = {
    progress: 10,
    apiKey: process.env.REACT_APP_NEWS_API
  }

  setProgress = (progress) =>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <Router>
        <Navbar/>
        <LoadingBar
          color='#f11946'
          progress={this.state.progress}
        />
        <Routes>
          <Route exact path="/" element={<News apiKey={this.state.apiKey} setProgress={this.setProgress} key="general" pageSize={6} country={"in"} category={"general"}/>}/>
          <Route exact path="/business" element={<News apiKey={this.state.apiKey} setProgress={this.setProgress} key="business" pageSize={6} country={"in"} category={"business"}/>}/>
          <Route exact path="/health" element={<News apiKey={this.state.apiKey} setProgress={this.setProgress} key="health" pageSize={6} country={"in"} category={"health"}/>}/>
          <Route exact path="/science" element={<News apiKey={this.state.apiKey} setProgress={this.setProgress} key="science" pageSize={6} country={"in"} category={"science"}/>}/>
          <Route exact path="/technology" element={<News apiKey={this.state.apiKey} setProgress={this.setProgress} key="technology" pageSize={6} country={"in"} category={"technology"}/>}/>
          <Route exact path="/sports" element={<News apiKey={this.state.apiKey} setProgress={this.setProgress} key="sports" pageSize={6} country={"in"} category={"sports"}/>}/>
          <Route exact path="/entertainment" element={<News apiKey={this.state.apiKey} setProgress={this.setProgress} key="entertainment" pageSize={6} country={"in"} category={"entertainment"}/>}/>
        </Routes>
      </Router>
    )
  }
}
