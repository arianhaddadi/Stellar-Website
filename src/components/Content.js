import React from 'react';
import contents from '../contents';
import {modeObjectReversed} from '../stateObjects';
import $ from 'jquery';


class Content extends React.Component {
    componentDidMount() {
        const content = contents[this.props.title];
        if (content) {
            $(".content-bottom").html(content[this.props.language]);
        }
    }

    componentDidUpdate() {
        const content = contents[this.props.title];
        if (content) {
            $(".content-bottom").html(content[this.props.language]);
        }  
    }

    renderTitle = () => {
        const title = modeObjectReversed[this.props.title];
        if (title) {
            return title[this.props.language];
        }
    }

    render () {
        let {language} = this.props;
        return (
            <>
                <div className={`content-top ${language}-me`}>
                    <i onClick={() => this.props.onClick("contentHome")} className="fas fa-home Home" >
                        {/* <div>خانه</div> */}
                    </i>
                    <p className={`content-top-content`}>
                        {this.renderTitle()}
                        <div className="content-top-underline"></div>
                    </p>
                </div>
                <div className={`content-bottom ${language}-me`}>
                    
                </div>
            </>
        );
    }
}

export default Content;