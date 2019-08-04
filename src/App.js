import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Question from './components/Question';
import emitter from './service';
import axios from 'axios';
import {API_URL, QUESTIONS_GET_ALL, QUESTION_SAVE, QUESTION_UPDATE, QUESTION_DELETE} from './constants';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
    emitter.on(QUESTION_SAVE, this.saveQuestionHandler);
    emitter.on(QUESTION_UPDATE, this.updateQuestionHandler);
    emitter.on(QUESTION_DELETE, this.deleteQuestionHandler);
  }
  componentDidMount = () => {
    this.getAllQuestions();
  }
  getAllQuestions = () => {
    axios.get(API_URL)
    .then((response) => {
      if(response.status === 200){
        this.setState({
          questions: response.data
        })
        emitter.emit(QUESTIONS_GET_ALL, response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
  saveQuestionHandler = (message) => {
    console.log("add question handler called with value", message);
    let self = this;
    axios.post(API_URL, message)
    .then(function (response) {
      console.log(response);
      self.getAllQuestions();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  updateQuestionHandler = (message) => {
    console.log("update question handler called with value", message);
    let self = this;
    axios.put(API_URL, message)
    .then(function (response) {
      console.log(response);
      self.getAllQuestions();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  deleteQuestionHandler = (message) => {
    console.log("delete question handler called with value", message);
    let self = this;
    axios.delete(API_URL + message._id)
    .then(function (response) {
      console.log(response);
      self.getAllQuestions();
    })
    .catch(function (error) {
      console.log(error);
    });
  }
 
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <Sidebar/>
        <Question />
      </div>
    )
  }
}
