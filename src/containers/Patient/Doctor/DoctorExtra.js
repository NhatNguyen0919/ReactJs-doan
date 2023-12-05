import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtra.scss';
import { getExtraInforDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';


class DoctorExtra extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            extraInfor: {}
        }
    }

    async componentDidMount() {

    }



    async componentDidUpdate(prevProps, prevStates) {
        if (this.props.doctorId !== prevProps.doctorId) {
            let res = await getExtraInforDoctorById(this.props.doctorId);
            if (res && res.errorCode === 0) {
                this.setState({
                    extraInfor: res.data
                })

            }
        }

    }

    showHideInfor = (status) => {
        this.setState({
            isShow: status
        })
    }


    render() {
        let { isShow, extraInfor } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="doctor-extra-container">
                    <div className="content-up">
                        <div className='text-address'><FormattedMessage id="patients.extra-infor-doctors.text-address" /></div>
                        <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}  </div>
                        <div className='detail-address'>{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ""}</div>
                    </div>
                    <div className="content-down">

                        {isShow === false ?
                            <div className='short-infor' ><FormattedMessage id="patients.extra-infor-doctors.price" />
                                {extraInfor && extraInfor.priceTypeData
                                    && language === LANGUAGES.VI &&

                                    <NumberFormat
                                        className='currency'
                                        value={extraInfor.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'đ'}
                                    />

                                }

                                {extraInfor && extraInfor.priceTypeData
                                    && language === LANGUAGES.EN &&
                                    <NumberFormat
                                        className='currency'
                                        value={extraInfor.priceTypeData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                    />

                                }

                                <span onClick={() => { this.showHideInfor(true) }} className='more-detail'>
                                    <FormattedMessage id="patients.extra-infor-doctors.detail" />
                                </span></div>
                            :
                            <div>
                                <div className="title-price"><FormattedMessage id="patients.extra-infor-doctors.price" /></div>
                                <div className='detail-infor'>
                                    <div className='price'>
                                        <span className='left'><FormattedMessage id="patients.extra-infor-doctors.price" /></span>
                                        <span className='right'>
                                            {extraInfor && extraInfor.priceTypeData
                                                && language === LANGUAGES.VI &&

                                                <NumberFormat
                                                    className='currency'
                                                    value={extraInfor.priceTypeData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'đ'}
                                                />

                                            }

                                            {extraInfor && extraInfor.priceTypeData
                                                && language === LANGUAGES.EN &&
                                                <NumberFormat
                                                    className='currency'
                                                    value={extraInfor.priceTypeData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'$'}
                                                />

                                            }

                                        </span>
                                    </div>

                                    <div className='note'>
                                        {extraInfor && extraInfor.note ? extraInfor.note : ""}
                                    </div>
                                </div>
                                <div className='payment'>
                                    <FormattedMessage id="patients.extra-infor-doctors.payment" />
                                    {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI ?
                                        extraInfor.paymentTypeData.valueVi : ""}
                                    {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN ?
                                        extraInfor.paymentTypeData.valueEn : ""}
                                </div>
                                <div className='hide-price'>
                                    <span onClick={() => { this.showHideInfor(false) }}>
                                        <FormattedMessage id="patients.extra-infor-doctors.hide-price" />
                                    </span>
                                </div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtra);
