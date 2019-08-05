import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Question from './components/Question';
import emitter from './service';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import {API_URL, QUESTIONS_GET_ALL, QUESTION_SAVE, QUESTION_UPDATE, QUESTION_DELETE, ERROR_INFO, ERROR_MESSAGES} from './constants';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      isLoading: true
    }
    emitter.on(QUESTION_SAVE, this.saveQuestionHandler);
    emitter.on(QUESTION_UPDATE, this.updateQuestionHandler);
    emitter.on(QUESTION_DELETE, this.deleteQuestionHandler);
    emitter.on(ERROR_INFO, this.showError);
  }
  componentDidMount = () => {
    this.getAllQuestions();
  }
  showError = (info) => {
    if(info)
    alert(info);
  }
  showLoader = () => {
    this.setState({
      isLoading: true
    })
  }
  hideLoader = () => {
    this.setState({
      isLoading: false
    })
  }
  getAllQuestions = () => {
    this.showLoader();
    axios.get(API_URL)
    .then((response) => {
      this.hideLoader();
      if(response.status === 200){
        this.setState({
          questions: response.data,
          isLoading: false
        })
        emitter.emit(QUESTIONS_GET_ALL, response.data);
      }
    })
    .catch((error) => {
      this.hideLoader();
      this.showError(error);
    })
  }
  saveQuestionHandler = (message) => {
    console.log("add question handler called with value", message);
    if(this.validatQuestion(message)) {
      let self = this;
      this.showLoader();
      axios.post(API_URL, message)
      .then(function (response) {
        self.hideLoader();
        self.getAllQuestions();
      })
      .catch(function (error) {
        self.hideLoader();
        self.showError(error);
      });
    }
  }
  updateQuestionHandler = (message) => {
    console.log("update question handler called with value", message);
    if(this.validatQuestion(message)) {
      let self = this;
      this.showLoader();
      axios.put(API_URL, message)
      .then(function (response) {
        self.hideLoader();
        self.getAllQuestions();
      })
      .catch(function (error) {
        self.hideLoader();
        self.showError(error);
      });
    }
  }
  deleteQuestionHandler = (message) => {
    console.log("delete question handler called with value", message);
    if(this.validatQuestion(message)) {
      let self = this;
      this.showLoader();
      axios.delete(API_URL + message._id)
      .then(function (response) {
        self.hideLoader();
        self.getAllQuestions();
      })
      .catch(function (error) {
        self.hideLoader();
        self.showError(error);
      });
    }
  }

  validatQuestion = (question) => {
    if(question.description === "") {
      this.showError(ERROR_MESSAGES.emptyDescription);
      return false;
    }
    if(question.title === "") {
      this.showError(ERROR_MESSAGES.emptyTitle);
      return false;
    }
    if(question.options.length === 0) {
      this.showError(ERROR_MESSAGES.noOption);
      return false;
    }
    if(question.options.length > 0) {
      question.options.forEach((option, index) => {
        if(option === "") {
          this.showError(ERROR_MESSAGES.emptyOption);
          return false;
        }
      });
    }
    if(question.answer === null) {
      this.showError(ERROR_MESSAGES.noAnswer);
      return false;
    }
    return true;
  }
  
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <Sidebar/>
        <Question />
        {this.state.isLoading && 
        <Loader
          className="loader"
          type="TailSpin"
          color="#00BFFF"
          height="100"
          width="100"
        />
        }
      </div>
    )
  }
}
