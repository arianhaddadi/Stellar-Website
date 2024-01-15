import React from 'react';
import $ from 'jquery';

class Bar extends React.Component {

    onBarHover = (action) => {
        if (this.props.mode !== "Menu") {
            if (action === 'over') {
                $(".bar").css(
                    {
                        "margin-top":"5px", 
                        "margin-bottom":"5px",
                        "backgroundColor":"white" 
                    }
                );
                $(".bar.first").css("margin-top", "7px");
                $(".bar.third").css({"width": "30px", "margin-left": "initial"});
            }
            else {
                $(".bar").css(
                    {
                        "margin-top":"7px", 
                        "margin-bottom":"7px",
                        "backgroundColor":"rgb(184, 193, 194)"
                    }
                );
                $(".bar.third").css({"width": "20px", "margin-left": this.props.language === "fa" ? "50%" : "0%"});
            }  
        }
        else {
            if (action === "over") {
                $(".bar.first").css("transform", "translate(0px, 6px) rotate(135deg)");
                $(".bar.third").css("transform", "translate(0px, -10px) rotate(45deg)");
            }
            else {
                $(".bar.first").css("transform", "translate(0px, 6px) rotate(45deg)");
                $(".bar.third").css("transform", "translate(0px, -10px) rotate(-45deg)");
            }
        }
    }

    formBars = () => {
        if (this.props.mode === "Menu") {
            $('.bar.first').css("transform", "translate(0px, 6px) rotate(135deg)");
            $('.bar.second').css("opacity", "0");
            $('.bar.third').css("transform","translate(0px, -10px) rotate(45deg)");
        }
        else {
            $('.bar.first').css("transform", "rotate(0deg) translate(0px, 0px)");
            $('.bar.second').css("opacity", "10");
            $('.bar.third').css("transform", "rotate(0deg) translate(0px, 0px)");
            this.onBarHover();
        }
    }

    componentDidUpdate() {
        this.formBars();
    }

    onBarClick = () => {
        this.onBarHover("over");
        this.props.onClick();
    }

    render() {
        return (
            <div className={`container ${this.props.language}`} onClick={this.onBarClick} onMouseOver={() => this.onBarHover("over")} onMouseOut={this.onBarHover}>
                <div className="bar first"></div>
                <div className="bar second"></div>
                <div className="bar third"></div>
            </div>
        )
    }
}

export default Bar;