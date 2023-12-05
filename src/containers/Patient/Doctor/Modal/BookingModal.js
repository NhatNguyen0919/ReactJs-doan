import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../../utils';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { FaTimes } from "react-icons/fa";
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postPatientAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import {
    Modal,
} from 'reactstrap';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            genders: '',
            selectedGenders: '',
            sex: '',
            doctorId: '',
            timeType: '',
            dayBooking: ''

        }
    }

    async componentDidMount() {
        this.props.fetchGender()
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object)
            })
        }

        return result;
    }


    async componentDidUpdate(prevProps, prevStates) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.dataScheduleModal !== prevProps.dataScheduleModal) {
            if (this.props.dataScheduleModal && !_.isEmpty(this.props.dataScheduleModal)) {
                let doctorId = this.props.dataScheduleModal.doctorId
                let timeType = this.props.dataScheduleModal.timeType
                let dayBooking = this.props.dataScheduleModal.date
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                    dayBooking: dayBooking
                })
            }
        }

    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let coppyState = { ...this.state }
        coppyState[id] = valueInput
        this.setState({
            ...coppyState
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedGenders) => {
        this.setState({
            selectedGenders: selectedGenders
        })
    }

    handleConfirm = async () => {
        // vaalidat input
        // !data.email || !data.doctorId || !data.timeType || !data.date
        console.log("check dayBooking", this.state);
        let date = new Date(this.state.birthday).getTime();
        let res = await postPatientAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            selectedGenders: this.state.selectedGenders.value,
            sex: this.state.sex,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            dayBooking: this.state.dayBooking
        })
        if (res && res.errorCode === 0) {
            toast.success('Booking successful !')
            this.props.handleCloseModal();
        } else {
            toast.error('Booking failed !')
        }
    }


    render() {
        let { isOpen, handleCloseModal, dataScheduleModal } = this.props
        let doctorId = '';
        if (dataScheduleModal && !_.isEmpty(dataScheduleModal)) {
            doctorId = dataScheduleModal.doctorId
        }

        // fullName: '',
        //     phoneNumber: '',
        //     email: '',
        //     address: '',
        //     reason: '',
        //     birthday: '',
        //     sex: '',
        //     doctorId: ''
        return (
            <>
                <Modal
                    isOpen={isOpen}
                    className={'booking-modal-container'}
                    size="lg"
                    centered>

                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className='left'><FormattedMessage id="patients.booking-modal.title" /></span>
                            <span className='right'
                                onClick={handleCloseModal}
                            ><i><FaTimes /></i></span>
                        </div>
                        <div className="booking-modal-body">
                            {/* {JSON.stringify(dataScheduleModal)} */}
                            <div className="doctor-infor">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowProfile={false}
                                    dataScheduleModal={dataScheduleModal}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label htmlFor=""><FormattedMessage id="patients.booking-modal.name" /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.fullName}
                                        onChange={(e) => this.handleOnChangeInput(e, 'fullName')}

                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor=""><FormattedMessage id="patients.booking-modal.phone-number" /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor=""><FormattedMessage id="patients.booking-modal.birthday" /></label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className="form-control"
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor="">Email </label>
                                    <input type="text" className='form-control'
                                        value={this.state.email}
                                        onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label htmlFor=""><FormattedMessage id="patients.booking-modal.reasons" /> </label>
                                    <input type="text" className='form-control'
                                        value={this.state.reason}
                                        onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor=""><FormattedMessage id="patients.booking-modal.address" /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.address}
                                        onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label htmlFor=""><FormattedMessage id="patients.booking-modal.gender" /> </label>
                                    <Select
                                        value={this.state.selectedGenders}
                                        options={this.state.genders}
                                        onChange={this.handleChangeSelect}
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className='btn-booking-confirm' onClick={this.handleConfirm}><FormattedMessage id="patients.booking-modal.confirm" /></button>
                            <button className='btn-booking-cancel' onClick={handleCloseModal} ><FormattedMessage id="patients.booking-modal.cancel" /></button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGender: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
