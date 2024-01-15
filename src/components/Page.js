import React from 'react';

const mapNumberToWords = {
    1:"one",
    2:"two",
    3:"three",
    4:"four"
}

class Page extends React.Component {

    showNext = () => {
        let next = this.props.next;
        if (next) {
            return next[this.props.language];
        }
    }

    showPrev = () => {
        let prev = this.props.prev;
        if (prev) {
            return prev[this.props.language]
        }
    }

    render() {
        const {content, language} = this.props;
        return (
            <div className={this.props.id === 1 ? "home-page main" :"home-page"}>
                <div className="layer"></div>
                <div onClick = {() => this.props.switch(-1)} className={`previous-page ${language}-me ${mapNumberToWords[this.props.id]}`}>
                    <div className="page-switch-content">{this.showPrev()}</div>
                    <div className={`home-bar`}></div>
                </div> 
                <div onClick={() => this.props.switch(1)} className={`next-page ${language}-me ${mapNumberToWords[this.props.id]}`}>
                    <div className="page-switch-content">{this.showNext()}</div>
                    <div className={`home-bar`}></div>
                </div>
                <div className="page-content-bar" > 
                    <div className={`home-page-content ${language}-me`}>
                        {content[language]}
                    </div>
                    <div className="main-home-bar"></div>
                </div>
                <div onClick={() => this.props.onClick(content.en)}  className={`clickAndDiscover ${language}-me`}>
                    <div>
                        {language === 'fa' ? "نمایش توضیحات بیشتر" : "Click and Discover"}   
                       <i className="far fa-circle" />
                    </div>
                </div>
                
            </div>
        );
    }

}

export default Page;