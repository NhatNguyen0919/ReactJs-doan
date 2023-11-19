import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
        }
    }

    async componentDidMount() {
        let language = this.props
        this.setArrayDays(language)

    }

    setArrayDays = (language) => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            }
            else {
                object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            allDays.push(object);
        }


        this.setState({
            allDays: allDays,
        })
    }

    componentDidUpdate(prevProps, prevStates) {
        if (this.props.language !== prevProps.language) {
            this.setArrayDays(this.props.language)

        }

    }

    handleOnchangeSelect = async (e) => {
        let doctorId = this.props.doctorId;
        if (doctorId && doctorId !== -1) {
            let date = e.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            console.log("check response from me", res);
        }
    }

    render() {
        let { allDays } = this.state;

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
