import React from 'react';
import {servicesList, modesList} from '../stateObjects';

class Menu extends React.Component {

    renderMenu = (object, cln) => {
        const {language} = this.props;
        return object.map(item => {
            return (
                <div onClick={() => this.props.onClick(item.en)} className={`${cln}`}>
                    {item[language]} 
                    <div className={`menu-hr ${language}-me`} />
                </div>
            );
        });
    }


    render() {
        return (
            <>
            <div className={`services ${this.props.language}-me`}>
                {this.renderMenu(servicesList, 'service')}
            </div>
            <div className={`menu-items ${this.props.language}-me`}>
                {this.renderMenu(modesList, 'menu-item')}
            </div>
            <div className={`lang-sel ${this.props.language}-me`}>
                <div onClick={() => this.props.onLangChange("en")}>EN</div>
                <div onClick={() => this.props.onLangChange("fa")}>FA</div>
            </div>
            <i onClick={() => this.props.onClick("menuBack")} className={`fas ${this.props.language === 'en' ? "fa-arrow-left" : "fa-arrow-right"} arrow ${this.props.language}-me`} />
            </>
        );   
    }
}

export default Menu;
