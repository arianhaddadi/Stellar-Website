import React from 'react';
import Bar from './Bar';
import {connect} from 'react-redux';
import {modeActionCreator, pageActionCreator, languageActionCreator} from '../actions';
import logo from '../resources/3.jpg';
import ContactUs from './ContactUs';
import Menu from './Menu';
import Content from './Content';
import $ from 'jquery';
import {servicesList as services} from '../stateObjects';
import Page from './Page';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.imageList = ["./resources/4.jpg", "./resources/6.jpg"];
        this.imageIndex = 0;
        this.prevLang = "fa";
        this.isLoaded = false;
    }

    onTouchEnd = () => {    
        if (!this.rememberToSwitch && this.previousTouchedPoint && this.swipe && this.props.mode === "Home") {
            this.rememberToSwitch = true;
            setTimeout(() => {this.rememberToSwitch = undefined;}, 900);
            this.switchPage(this.swipe);
        }
    }

    onSwipe = (event) => {
        if (window.innerWidth > 479 || this.rememberToSwitch) return;
        const {clientX, clientY} = event.targetTouches['0'], {page} = this.props;
        if (this.previousTouchedPoint) {
            const x = this.previousTouchedPoint[0];
            if (clientX < x && page < 3) this.swipe = 1;
            else if (clientX > x && page > 0) this.swipe = -1;
            else this.swipe = undefined;
        }
        else {
            this.previousTouchedPoint = [clientX, clientY]
        }
    }

    switchPage = (offset) => {
        if(this.doNotSwitch) return;
        const {page} = this.props, newPage = page + offset, width = window.innerWidth;
        var lef, animation_name, animation_delay, animation_duration;
        if (width <= 479) {
            if (offset > 0) [lef, animation_name] = ["42%", "HP3M"];
            else [lef, animation_name] = ["2%", "HP2M"];
            [animation_delay, animation_duration] = ["0.2s", 0.6];
        }
        else {
            if (offset > 0) [lef, animation_name] = ["10%", "HP3"];
            else [lef, animation_name] = ["-10%", "HP2"];
            [animation_delay, animation_duration] = ["0.89s", 1.5];
        }
        $(".page-content-bar").eq(newPage).css("animation", "shade2 0.02s forwards");
        $(".next-page").eq(newPage).css("animation", "shade2 0.02s forwards");
        $(".previous-page").eq(newPage).css("animation", "shade2 0.02s forwards");
        $(".main-home-bar").eq(newPage).css("left", lef);
        $(".main-home-bar").eq(newPage).css("animation", animation_name + " 0.8s " +  animation_delay + " forwards");
        $(".page-content-bar").eq(page).css("animation", "shade4 0.5s forwards");
        $(".next-page").eq(page).css("animation", "shade4 0.5s forwards");
        $(".previous-page").eq(page).css("animation", "shade4 0.5s forwards");
        $(".home-page").css({"animation": "none", "display":"initial"});
        const elems = document.getElementsByClassName("home-page");
        if (offset > 0) {
            elems[page].style.animation = `swipeLH ${animation_duration}s forwards`;
            elems[page + offset].style.animation = `swipeL ${animation_duration}s forwards`;
        }
        else {
            elems[page].style.animation = `swipeRH ${animation_duration}s forwards`;
            elems[page + offset].style.animation = `swipeR ${animation_duration}s forwards`;
        }
        $(".indicators li").eq(page).removeClass("active");
        this.changeBackground();
        setTimeout(() => {
            $(".indicators li").eq(page + offset).addClass("active");
        }, 500);
        this.doNotSwitch = true;
        setTimeout(() => {
            this.doNotSwitch = false;
            this.props.pageActionCreator(offset);
        }, animation_duration * 1000);
    }

    handleClicks = (newState) => {
        if (newState === "Services") {
            $(".menu-items").addClass("onservice");
            $(".menu-item").not(":eq(2)").css("visibility", "hidden");
            $(".services").addClass("onservice");
            $(".service").css("visibility", "visible"); 
            $(".arrow").css("display", "block");
        }
        else if (newState === "menuBack") {
            $(".menu-items").removeClass("onservice");
            $(".menu-item").css("visibility", "visible");
            $(".services").removeClass("onservice");
            $(".service").css("visibility", "hidden"); 
            $(".arrow").css("display", "none");
        }
        else if (newState === "contentHome") {
            window.scrollTo({top: 0, left:0, behavior:"smooth"});
            setTimeout(() => this.onScrollingHome(), 700);
        }
        else {
            this.props.modeActionCreator(newState);
        }
    }

    showPages = () => {
        return (
            <>
                <Page language={this.props.lang} switch={this.switchPage} onClick={this.handleClicks} id={1} content={services[0]} next={services[1]} prev={undefined} />
                <Page language={this.props.lang} switch={this.switchPage} onClick={this.handleClicks} id={2} content={services[1]} next={services[2]} prev={services[0]} />
                <Page language={this.props.lang} switch={this.switchPage} onClick={this.handleClicks} id={3} content={services[2]} next={services[3]} prev={services[1]} />
                <Page language={this.props.lang} switch={this.switchPage} onClick={this.handleClicks} id={4} content={services[3]} next={undefined}   prev={services[2]} />
            </>
        );
    }

    changeLang = (newLang) => {
        if (newLang !== this.props.lang) {
            $(".loader div").css("transform", "scale(1)");
            $(".loader div:last-child").css("width", "0");
            $(".loader").css("display", "initial");
            this.isLoaded = false;
            this.props.languageActionCreator(newLang);
        }
    }

    renderRest = () => {
        if (this.props.mode === "Menu") {
           return (
                <div className="menu">
                    <Menu language={this.props.lang} onLangChange={this.changeLang} onClick={this.handleClicks} />
                </div>
            )
        }
        else {
            return (
                <>
                    <i onClick={() => this.props.modeActionCreator("Contact-Us")} className={`far fa-envelope mail ${this.props.lang}-me`} />
                    {this.showPages()}
                </>
            );

        }
    }

    onBarClick = () => {
        if (this.props.mode === "Menu") {
            document.getElementsByClassName("menu")[0].style.animationName = "enlighten";
            setTimeout(() => this.props.modeActionCreator("Home"), 600);
        }
        else {
            this.props.modeActionCreator("Menu");
        }
    }

    changeLayer = (value) => {
        if (value === "visible") {
            $(".layer").css("z-index", "120");
            $(".layer").css("animation", "shade3 0.9s forwards");
        }
        else {
            $(".layer").css("animation", "enlighten 0.6s forwards");
        }
    }

    changeBackground = () => {
        this.imageIndex = (this.imageIndex + 1) % this.imageList.length;
        $(".bg").css("background-image", `url(${this.imageList[this.imageIndex]})`);
    }
    
    componentDidUpdate() {
        const {mode} = this.props;
        if (mode !== "Menu" && mode !== "Home" && mode !== "Contact-Us") {
            $("#root").css({"height":"200%"});
            $(".main-page, svg").css("height", "50%");
            $(".home-page").css({"height": "45%", "top":"5%", "visibility":"hidden"});
            $(".home-page").eq(this.props.page).css("visibility", "visible");
            $(".indicators").css("visibility", "hidden");
            $("html").css("overflow", "auto");
            this.changeLayer("visible");
            setTimeout(() => {
                $(".content").css({"display":"block", "height":"50%"});
                window.scrollTo({top:window.innerHeight, left:0, behavior:"smooth"});
            }, 900);
        }
        else {
            $(".layer").css("z-index", "-1");
            $(".home-page").css({"height": "90%", "top": "10%" , "visibility":"hidden"});
            $("#root").css({"height":"100%"});
            $(".main-page, svg").css("height", "100%");
            $(".content").css({"display":"none"});
            $("html").css("overflow", "hidden");
            $(".home-page").eq(this.props.page).css({"visibility": "visible"});
            $(".home-page").not(`:eq(${this.props.page})`).css("display", "none");
            if (window.innerWidth <= 479 && mode === "Home") $(".indicators").css("visibility", "visible");
            else $(".indicators").css("visibility", "hidden");
        }
        this.previousTouchedPoint = undefined;
        if (!this.isLoaded) {
            this.wipeOutLoader();
        }
    }

    wipeOutLoader = () => {
        setTimeout(() => {$(".loader div").css("transform", "scale(1.2)");}, 2000);
        setTimeout(() => {$(".loader").css("display", "none"); this.isLoaded = true;}, 2400);
    }
    

    onScrollingHome = () => {
        if ($(".content").css("display") === "none") return;
        const {mode} = this.props;
        if (mode !== "Menu" && mode !== "Home") { 
            this.changeLayer();
            setTimeout(() => this.props.modeActionCreator("Home"), 600);
        }
    }

    onMouseMove = (pureEvent) => {
        if (this.props.mode === "Home") {
            const X = (pureEvent.nativeEvent.clientX - window.innerWidth/2)/2000;
            $(".home-page").eq(this.props.page).css("transform", `translateX(${X}%)`);
        }
    }

    componentDidMount = () => {
        const ref = this;
        $(window).scroll(function() {
            if ($(window).scrollTop() === 0) {
                ref.onScrollingHome();
            }
        });
        this.wipeOutLoader();
    }

    handleIndicatorsClick = (newPage) => {
        if (newPage !== this.props.page) {
            this.switchPage(newPage - this.props.page);
        }
    }

    prepareSVG = () => {
        return (
            <svg width="100%" height="100%">
                <line x1="0" y1="14.28%" x2="100%" y2="14.28%"></line>
                <line x1="0" y1="28.57%" x2="100%" y2="28.57%"></line>
                <line x1="0" y1="42.85%" x2="100%" y2="42.85%"></line>
                <line x1="0" y1="57.14%" x2="100%" y2="57.14%"></line>
                <line x1="0" y1="71.42%" x2="100%" y2="71.42%"></line>
                <line x1="0" y1="85.71%" x2="100%" y2="85.71%"></line>
            </svg>
        );
    }
 

    handleWheel = (pureEvent) => {
        if (this.props.mode === "Home" && !this.rememberToSwitch) {
            const {deltaY, deltaX} = pureEvent;
            if ( this.props.page < 3 && ((deltaX === 0 && deltaY < 0) || (deltaX >= 1)) ) this.rememberToSwitch = 1;
            else if (this.props.page > 0 && ((deltaX === 0 && deltaY > 0) || (deltaX <= -1)))  this.rememberToSwitch = -1;
            if (this.rememberToSwitch) {
                setTimeout(() => {
                if (this.rememberToSwitch) this.switchPage(this.rememberToSwitch);
                }, 100);
                setTimeout(() => {
                    if (this.rememberToSwitch) this.rememberToSwitch = undefined;
                }, 2000);
            }
        }
    }

    prepareLoader = () => {
        if (!this.isLoaded) {
            return (
                <div className="loader">
                    <div></div>
                    <div></div>
                </div>
            );
        }
        
    }

    render() {
        if(this.prevLang !== this.props.lang) {
            this.prevLang = this.props.lang;
            this.props.modeActionCreator("Home");
        }
        switch(this.props.mode) {
            case "Contact-Us":
                    return (
                        <>
                            {this.prepareSVG()}
                            <ContactUs language={this.props.lang} onClick={() => this.props.modeActionCreator("Home")} />
                            {this.pages}
                        </>
                    );
            default:
                    return (
                        <>
                            {this.prepareLoader()}
                            <div onTouchEnd={this.onTouchEnd} onTouchMove={(event) => this.onSwipe(event.nativeEvent)} onWheel={(event) => this.handleWheel(event.nativeEvent)} onMouseMove={(event) => this.onMouseMove(event)} className="main-page">
                                {this.prepareSVG()}
                                <Bar language={this.props.lang} onClick={this.onBarClick} mode={this.props.mode}/>
                                <img alt="" onClick={() => this.props.modeActionCreator("Home")} className={`logo ${this.props.lang}`} src={logo} />
                                {this.renderRest()}
                            </div>
                            <div className="content">
                                {<Content language={this.props.lang} onClick={this.handleClicks} title={this.props.mode}/>}
                            </div>
                            <ul className="indicators">
                                <li onClick={() => this.handleIndicatorsClick(0)} className="active" ></li>
                                <li onClick={() => this.handleIndicatorsClick(1)}></li>
                                <li onClick={() => this.handleIndicatorsClick(2)}></li>
                                <li onClick={() => this.handleIndicatorsClick(3)}></li>
                            </ul>
                        </>
                    );
        }
    }
}

const mapStateToProps = (state) => {
    return {
       mode:state.mode,
       page:state.page,
       lang:state.language
    }
}

export default connect(mapStateToProps, {modeActionCreator, pageActionCreator, languageActionCreator})(App);