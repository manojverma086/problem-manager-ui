import React from "react";
import "./../App.css";
import Option from './Option';
import emitter from "../service";
import {QUESTION_SELECT, QUESTION_ADD, QUESTION_SAVE, QUESTION_UPDATE, QUESTION_DELETE} from './../constants';

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: {
                _id: null,
                description: "",
                title: "",
                options: [],
                answer: null
            },
            default_question: {
                _id: null,
                description: "",
                title: "",
                options: [],
                answer: null
            }
        }
        emitter.on(QUESTION_SELECT, this.questionSelectListener);
        emitter.on(QUESTION_ADD, this.questionAddListener);
    }
    questionSelectListener = (question) => {
        if(question._id) {
            this.setState({
                question: question
            })
        }
    }
    questionAddListener = () => {
        this.setState({
            question: this.state.default_question
        })
    }

    titleChangeHandler = (e) => {
        let title = e.target.value;
        console.log("titleChangeHandler called with value ", title);
        this.setState(prevState => ({
            question: {                   // object that we want to update
                ...prevState.question,    // keep all other key-value pairs
                title: title              // update the value of specific key
            }
        }))
    }
    descriptionChangeHandler = (e) => {
        let description = e.target.value;
        console.log("descriptionChangeHandler called with value ", description);
        this.setState(prevState => ({
            question: {                   // object that we want to update
                ...prevState.question,    // keep all other key-value pairs
                description: description  // update the value of specific key
            }
        }))
    }
    setCorrectOptionHandler = (e) => {
        let answer = e.target.value;
        console.log("setCorrectOptionHandler called with value ", answer);
        this.setState(prevState => ({
            question: {                   // object that we want to update
                ...prevState.question,    // keep all other key-value pairs
                answer: parseInt(answer)  // update the value of specific key
            }
        }))
    }
    deleteOptionHandler = (e) => {
        console.log(e.target.value);
        let options = this.state.question.options;
        options.splice(e.target.value, 1);
        this.setState(prevState => ({
            question: {
              ...prevState.question,
              options: options
            }
        }))
    }
    addOptionHandler = () => {
        let options = this.state.question.options;
        options.push("");
        this.setState(prevState => ({
            question: {
                ...prevState.question,
                options: options
            }
        }))
    }
    optionChangeHandler = (value, index) => {
        console.log(value, index);
        let options = this.state.question.options;
        options[index] = value;
        this.setState(prevState => ({
            question: {
                ...prevState.question,
                options: options
            }
        }))
    }
    saveQuestionHandler = () => {
        let event = this.state.question._id ? QUESTION_UPDATE : QUESTION_SAVE;
        emitter.emit(event, this.state.question);
    }
    deleteQuestionHandler = () => {
        emitter.emit(QUESTION_DELETE, this.state.question);
    }

  render() {
    return (
      <>
        <div className="question_wrapper">
            {this.state.question._id && <div className="edit_question_label">Edit Question</div>}
            {!this.state.question._id && <div className="add_question_label">Add Question</div>}
           <div className="question_title mt">
               <span className="question_title_label">Title</span>
               <input className="question_title_input" onChange={this.titleChangeHandler} value={this.state.question.title} placeholder="Title"/>
           </div>
           <div className="question_description mt">
               <span className="question_description_label">
                   Question
               </span>
               <textarea className="question_description_input" onChange={this.descriptionChangeHandler} value={this.state.question.description} placeholder="Question description here...">
               </textarea>
           </div>
           {
               this.state.question.options.map((option, index) => 
               <Option 
               key={index}
               index={index}
               isAnswer={this.state.question.answer === index}
               option={option}
               setCorrectOptionHandler={this.setCorrectOptionHandler}
               deleteOptionHandler={this.deleteOptionHandler}
               optionChangeHandler={this.optionChangeHandler}
               />)
           }
           <button type="button" className="add_option_btn mt" onClick={this.addOptionHandler} >
           <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 9.36429V6.63571C14 6.16071 13.6656 5.77857 13.25 5.77857H8.94375V0.857143C8.94375 0.382143 8.60938 0 8.19375 0H5.80625C5.39062 0 5.05625 0.382143 5.05625 0.857143V5.77857H0.75C0.334375 5.77857 0 6.16071 0 6.63571V9.36429C0 9.83929 0.334375 10.2214 0.75 10.2214H5.05625V15.1429C5.05625 15.6179 5.39062 16 5.80625 16H8.19375C8.60938 16 8.94375 15.6179 8.94375 15.1429V10.2214H13.25C13.6656 10.2214 14 9.83929 14 9.36429Z" fill="#002CFC"/>
</svg>
          <span className="add_option_btn_text">Add Option</span> 
           </button>
           <div>
            <button type="button" className="save_question_btn" onClick={this.saveQuestionHandler}>Save</button>
            <button type="button" onClick={this.deleteQuestionHandler} className="delete_question_btn">Delete</button>
           </div>
          
      </div>
      </>
    );
  }
}
