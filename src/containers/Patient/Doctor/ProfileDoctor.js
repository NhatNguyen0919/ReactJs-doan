import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService'
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errorCode === 0) {
                result = res.data
            }
        }

        return result;
    }



    async componentDidUpdate(prevProps, prevStates) {
        if (this.props.doctorId !== prevProps) {
            // this.getInforDoctor(this.props.doctorId);
        }

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    renderTime = (dataScheduleModal) => {
        let { language } = this.props;

        if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataScheduleModal.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataScheduleModal.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            let time = language === LANGUAGES.VI ?
                dataScheduleModal.timeTypeData.valueVi :
                dataScheduleModal.timeTypeData.valueEn

            return (
                <>
                    <div>{time} {this.capitalizeFirstLetter(date)}</div>
                    <div>Mien phi dat lich</div>
                </>
            )
        }
        return <></>
    }


    render() {
        let { dataProfile } = this.state;
        let { language, isShowProfile, dataScheduleModal } = this.props;
        let nameEn = '', nameVi = ''
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`;
        }

        return (
            <>
                <div className='profile-container'>
                    <div className='intro-doctor'>
                        <div
                            className='content-left'
                        >
                            <div className='image-doctor' style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}> </div>
                        </div>
                        <div className='content-right'>
                            <div className="content-right-container">
                                <div className='up'>
                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                </div>
                                <div className='down'>
                                    {isShowProfile === true ?

                                        <>
                                            {
                                                dataProfile &&
                                                dataProfile.Markdown
                                                && dataProfile.Markdown.description
                                                && <span>
                                                    {dataProfile.Markdown.description}
                                                </span>

                                            }
                                        </>

                                        :
                                        <>
                                            {this.renderTime(dataScheduleModal)}
                                        </>
                                    }
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="price">
                        <FormattedMessage id="patients.booking-modal.price" />
                        {
                            dataProfile &&
                                dataProfile.Doctor_Infor
                                && language === LANGUAGES.VI ?

                                <NumberFormat
                                    className='currency'
                                    value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />
                                : ''

                        }
                        {
                            dataProfile &&
                                dataProfile.Doctor_Infor
                                && language === LANGUAGES.EN ?
                                <NumberFormat
                                    className='currency'
                                    value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}
                                />
                                : ''

                        }

                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
