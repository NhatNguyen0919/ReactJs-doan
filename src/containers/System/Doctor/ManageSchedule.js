import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userService';


class ManageSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleHours();
    }


    componentDidUpdate(prevProps, prevStates) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map((item) => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }


    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);

            })
        }
        return result;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption })

    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date
        })
    }


    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map((item) => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                    return item;
                }

                this.setState({
                    rangeTime: rangeTime
                })
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];

        if (!selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.warn("🦄 Invalid Selected Doctor !");
            return;

        }
        if (!currentDate) {
            toast.warn("🦄 Invalid Date !");
            return;

        }


        // let formattedDate = moment(currentDate[0]).format(dateFormat.SEND_TO_SERVER)
        let formattedDate = new Date(currentDate[0]).getTime();

        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.timeType = item.keyMap;
                    result.push(object);

                })
            }
            else {
                toast.error("🦄 Invalid Selected Doctor !");
                return;
            }
        }

        let res = await saveBulkScheduleDoctor({
            arraySchedule: result,
            doctorId: selectedDoctor.value,
            date: formattedDate

        })
        console.log("check response : ", res);


    }

    render() {
        let { language } = this.props;
        let { rangeTime } = this.state;
        return (
            <>
                <div className='manage-schedule-container'>
                    <div className="m-s-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className='col-6 form-group'>
                                <label htmlFor=""><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctor}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label htmlFor=""><FormattedMessage id="manage-schedule.choose-day" /></label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    minDate={new Date()}
                                    value={this.state.currentDate[0]}

                                />
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                    return (
                                        <button className=
                                            {
                                                item.isSelected === true ?
                                                    "btn btn-schedule active" :
                                                    " btn btn-schedule"
                                            }
                                            key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}

                            </div>
                        </div>
                        <button class="btn btn-primary btn-lg btn-save-schedule" type="submit"
                            onClick={() => this.handleSaveSchedule()}
                        ><FormattedMessage id="manage-schedule.save-in4" /></button>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctor: state.admin.allDoctor,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleHours: () => dispatch(actions.fetchAllScheduleHours()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
