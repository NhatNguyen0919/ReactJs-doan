import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { BsCalendar2Date } from "react-icons/bs";
import { FormattedMessage } from 'react-intl';
import { FaHandPointUp } from "react-icons/fa";

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allTime: []
        }
    }

    async componentDidMount() {
        let language = this.props
        let allDays = this.setArrayDays(language)
        this.setState({
            allDays: allDays,
        })
    }

    setArrayDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Hôm nay - ${ddMM}`
                    object.label = today;


                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(labelVi);
                }
            }

            else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }

        return allDays;

    }

    async componentDidUpdate(prevProps, prevStates) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.setArrayDays(this.props.language)
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let allDays = this.setArrayDays(this.props.language)
            let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value)
            this.setState({
                allTime: res.data ? res.data : []
            })
        }

    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleOnchangeSelect = async (e) => {
        let doctorId = this.props.doctorId;
        if (doctorId && doctorId !== -1) {
            let date = e.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errorCode === 0) {
                this.setState({
                    allTime: res.data ? res.data : []
                })
            } else {

            }
            console.log("check response from me", res);
        }
    }

    render() {
        let { allDays, allTime } = this.state;
        let { language } = this.props
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select name="" id="" onChange={(e) => this.handleOnchangeSelect(e)}>
                            {
                                allDays
                                && allDays.length > 0
                                && allDays.map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="all-available-time">
                        <div className="text-calender">
                            <i className='calender-icon-bs'><BsCalendar2Date /><span><FormattedMessage id="patients.detail-doctor.schedule" /></span></i>
                        </div>
                        <div className='time-content'>
                            {allTime && allTime.length > 0
                                ?
                                <>
                                    <div className='time-content-btns'>
                                        {allTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ?
                                                item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                            return (
                                                <>
                                                    <button key={index}
                                                        className={language === LANGUAGES.VI ? 'btn=vi' : 'btn-en'}
                                                    >{timeDisplay}</button>
                                                </>
                                            )
                                        })}
                                    </div>


                                    <div className='book-free'>
                                        <span><FormattedMessage id="patients.detail-doctor.choose-book" /><i><FaHandPointUp /></i></span>
                                    </div>
                                </>
                                :
                                <div className='no-schedule'>
                                    <FormattedMessage id="patients.detail-doctor.no-schedule" />
                                </div>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
