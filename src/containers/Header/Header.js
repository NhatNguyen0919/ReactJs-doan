import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AiFillCaretDown } from "react-icons/ai";
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from 'react-intl';

class Header extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }
    render() {
        const { processLogout, userInfo } = this.props;


        return (
            <>
                <div className="header-container">
                    {/* thanh navigator */}
                    <div className="header-tabs-container">
                        <Navigator menus={adminMenu} />
                    </div>

                    <div className='menu-language'>
                        <span className='welcome'><FormattedMessage id="homeheader.welcome" /> {userInfo && userInfo.firstName ? userInfo.firstName + " " + userInfo.lastName : ""}</span>
                        <span className='language-choosed'>Languages <AiFillCaretDown /> <ul className='dropdown'>
                            <li className={this.props.language === LANGUAGES.VI ? "language-vi active" : "language-vi"} onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}><span>VN</span></li>
                            <li className={this.props.language === LANGUAGES.EN ? "language-en active" : "language-en"} onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}><span>EN</span></li>
                        </ul></span>


                        <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>

                    </div>

                    {/* nút logout */}
                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo

    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
