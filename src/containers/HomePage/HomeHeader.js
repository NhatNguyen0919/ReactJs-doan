import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { AiOutlineMenu, AiOutlineQuestionCircle, AiOutlineSearch, AiFillCaretDown } from "react-icons/ai";
import { BsHospital, BsFillPhoneFill } from "react-icons/bs";
import { BiTask, BiSolidDonateBlood } from "react-icons/bi";
import { FaHeadSideVirus, FaTeethOpen } from "react-icons/fa";
import { FormattedMessage } from 'react-intl';
import logo from "../../assets/logo.svg"
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
import { withRouter } from 'react-router';

class HomeHeader extends Component {

    changLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        // fire edux event:actions
    }


    returnHome = () => {
        this.props.history.push('/home');

    }

    render() {
        let language = this.props.language;
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i><AiOutlineMenu /></i>
                            <img className="logo-header" src={logo} onClick={() => this.returnHome()} alt="" />
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div><b> <FormattedMessage id="homeheader.speciality" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.health-facility" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.select-room" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.doctors" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.select-doctors" /></div>
                            </div>
                            <div className="child-content">
                                <div><b><FormattedMessage id="homeheader.fee" /></b></div>
                                <div className='sub-title'><FormattedMessage id="homeheader.check-health" /></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support"><i><AiOutlineQuestionCircle /></i><a href=""><FormattedMessage id="homeheader.support" /></a> </div>
                            <div className='menu-language'><FormattedMessage id="homeheader.language" /> <AiFillCaretDown />
                                <ul className='dropdown'>
                                    <li className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}><span onClick={() => this.changLanguage(LANGUAGES.VI)}>VN</span></li>
                                    <li className={language === LANGUAGES.EN ? "language-en active" : "language-en"}><span onClick={() => this.changLanguage(LANGUAGES.EN)}>EN</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className="home-header-banner">
                        <div className="linear-img">
                            <div className="content-up">
                                <div className='title1'><FormattedMessage id="banner.title1" /></div>
                                <div className='title2'><FormattedMessage id="banner.title2" /></div>
                                <div className='search'>
                                    <i><AiOutlineSearch /></i>
                                    <input type="text" placeholder="Tìm gói khám tổng quát" />
                                </div>
                            </div>
                            <div className="content-down">
                                <div className="linear-white">
                                    <div className='options'>
                                        <div className="option-child">
                                            <div className='image-child'><i><BsHospital /></i></div>
                                            <div className='text-child'><FormattedMessage id="banner.child1" /></div>
                                        </div>
                                        <div className="option-child">
                                            <div className='image-child'><i><BsFillPhoneFill /></i></div>
                                            <div className='text-child'><FormattedMessage id="banner.child2" /></div>
                                        </div>
                                        <div className="option-child">
                                            <div className='image-child'><i><BiTask /></i></div>
                                            <div className='text-child'><FormattedMessage id="banner.child3" /></div>
                                        </div>
                                        <div className="option-child">
                                            <div className='image-child'><i><BiSolidDonateBlood /></i></div>
                                            <div className='text-child'><FormattedMessage id="banner.child4" /></div>
                                        </div>
                                        <div className="option-child">
                                            <div className='image-child'><i><FaHeadSideVirus /></i></div>
                                            <div className='text-child'><FormattedMessage id="banner.child5" /></div>
                                        </div>
                                        <div className="option-child">
                                            <div className='image-child'><i><FaTeethOpen /></i></div>
                                            <div className='text-child'><FormattedMessage id="banner.child6" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
