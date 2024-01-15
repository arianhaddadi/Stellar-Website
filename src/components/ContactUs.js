import React from 'react';


class ContactUs extends React.Component {


    goHome = () => {
        document.getElementsByClassName("contact-us")[0].style.animationName = "scrollUp";
        setTimeout(this.props.onClick, 1200);
    }


    render() {
        let language = this.props.language;
       return (
        <div className="contact-us" >
                <div className="contact-container" onClick={this.goHome}>
                    <div className="contact-bar first"></div>
                    <div className="contact-bar second"></div>
                </div>
               <div className={`info ${this.props.language}-me`}>
                    <b className="contact">{language === "fa" ? "اطلاعات تماس" : "Contact Info"}</b><br />
                    <hr />
                    {language === "fa" ? "نشانی :تهران، ولنجک، دانشگاه شهید بهشتی، مرکز رشد، شتاب دهنده فارابی" : "Address: Tehran, Velenjak, Shahid Beheshti, Roshd, Farabi"}
                    
                    <br />
                   <p>
                       {language === "fa" ? "تلفن تماس: 221419418" : "Phone Number:221419418"}
                    
                    </p> 
                    <b>
                        info@stellarmac.com
                    </b>
                </div> 
                <div className={`active-hours ${this.props.language}-me`}>
                    <b >{language === "fa" ? "ساعات کاری" : "Active Hours"} </b><br />
                    <hr />
                    {language === "fa" ? "شنبه تا چهارشنبه: ۰۹:۰۰ الی ۱۸:۰۰" : "Saturdays to Wednsdays: 9:00 - 18:00"}
                    <br />
                    <p className="thursday" >
                    {language === "fa" ? "پنجشنبه: ۰۹:۰۰ الی ۱۴:۰۰" : "Thursdays: 9:00 - 14:00"}
                    </p>
                    <p className="friday" >
                    {language === "fa" ? "جمعه: تعطیل" : "Fridays: Closed"}   
                    </p>
                    <br />
                </div>
        </div>
       ) 
    }
}

export default ContactUs;