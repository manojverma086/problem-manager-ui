import React from "react";
import "./../App.css";

export default class Option extends React.Component {
    optionChangeHandler = (e) => {
        this.props.optionChangeHandler(e.target.value, this.props.index);
    }
    render() {
    
    return (
      <>
        <div className="option_wrapper">
            <div className="option_lable">
                Option {String.fromCharCode(65 + this.props.index)}  
                {this.props.isAnswer && 
                <span className="correct_answer_lable" >(CORRECT ANSWER)</span>}
            </div>
            {!this.props.isAnswer &&
            <button type="button" className="correct_option_btn" onClick={this.props.setCorrectOptionHandler} value={this.props.index}>Set correct answer</button>}
            <button type="button" className="delete_option_btn" onClick={this.props.deleteOptionHandler} value={this.props.index}> Delete option</button>
            <input type="text" className="option_input" name="option" value={this.props.option} onChange={this.optionChangeHandler}></input>
        </div>
      </>
    );
  }
}
