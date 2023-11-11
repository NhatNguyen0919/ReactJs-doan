import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import '../HomePage.scss';
import * as actions from '../../../store/actions';
import { LANGUAGES } from "../../../utils"
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
        
        
    }

    handleViewDetailDoctor = (doctor) => {
        this.props.history.push(`/detail-doctor/${doctor.id}`)
    }

    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        return (
            <>
                <div>
                    <div className='section-wrapper section-outstanding-doctor'>
                        <div className='section-container'>
                            <div className="section-header">
                                <h3><FormattedMessage id="homepage.out-standing-doctors" /></h3>
                                <button><FormattedMessage id="homepage.more-info" /></button>
                            </div>

                            <div className="section-body">
                                <Slider {...this.props.settings}>
                                    {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                        }
                                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                        let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                                        return (
                                            <>
                                                <div className='section-customize' key={index} onClick={() => this.handleViewDetailDoctor(item)} >
                                                    <div className="customize-border">
                                                        <div className="outer-bg">
                                                            <div className='bg-image section-outstanding-doctor'
                                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                                            ></div>
                                                        </div>
                                                        <div className="outer-text text-center">
                                                            <div className='custom-text'>{language === LANGUAGES.VI ? nameVi : nameEn} </div>
                                                            <div className='custom-text'> </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </>
                                        )
                                    })}

                                </Slider>
                            </div>

                        </div>
                    </div>
                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
