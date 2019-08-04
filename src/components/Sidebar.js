import React from "react";
import "./../App.css";
import emitter from './../service';
import {QUESTIONS_GET_ALL, QUESTION_SELECT} from '../constants';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            selectedIndex: null
        }
        emitter.on(QUESTIONS_GET_ALL, this.getAllQuestions);
    }
    getAllQuestions = (questions) => {
        console.log("this event triggered", questions);
        this.setState({
            questions: questions,
            selectedIndex: 0
        });
        emitter.emit(QUESTION_SELECT, this.state.questions[0]);
    }
    selectQuestionHandler = (e) => {
        this.setState({
            selectedIndex: parseInt(e.target.value)
        });
        emitter.emit(QUESTION_SELECT, this.state.questions[e.target.value]);
    }
    render() {
        return (
        <>
            <div className="sidebar">
                {this.state.questions.length === 0 && 
                <span className="no_q_text">
                    We got nothing here folks
                </span>}
                {
                    this.state.questions.map((question, index) => 
                        <div key={index}>
                            <div>
                                <button type="button" className={this.state.selectedIndex === index ? "sidebar_question_name_active": "sidebar_question_name"} onClick={this.selectQuestionHandler} value={index}>{question.title}</button>
                            </div>
                            <div className="sidebar_question_separator"></div>
                        </div>
                    )
                }
            </div>
            <div className="sidebar_separator">
            </div>
        </>
        );
    }
}
