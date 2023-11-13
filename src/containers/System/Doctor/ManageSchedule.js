import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }


    componentDidUpdate(prevProps, prevStates) {
        if (prevProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }
        // if (prevProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelect(this.props.allDoctor)
        //     this.setState({
        //         listDoctor: dataSelect
        //     })
        // }
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

    render() {

        console.log("Check with state :", this.state);
        return (
            <>
                <div className='manage-schedule-container'>
                    <div className="m-s-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className='col-6 form-group'>
                                <label htmlFor="">Chọn bác sĩ</label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctor}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label htmlFor="">Chọn ngày</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className="form-control"
                                    minDate={new Date()}
                                    value={this.state.currentDate[0]}

                                />
                            </div>
                            <div className='col-12 pick-hour-container'>

                            </div>
                        </div>
                        <button class="btn btn-primary btn-lg" type="submit">Button</button>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
