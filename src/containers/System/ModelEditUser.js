import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Form,
    FormGroup,
} from 'reactstrap';
import { emitter } from '../../utils/emitter';
import './Model.scss';
import _ from 'lodash';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: ''
        }
    }


    componentDidMount() {
        let { userCurrent } = this.props;
        if (userCurrent && !_.isEmpty(userCurrent)) {
            this.setState({
                id: userCurrent.id,
                email: userCurrent.email,
                password: 'harcode',
                firstName: userCurrent.firstName,
                lastName: userCurrent.lastName,
                address: userCurrent.address,
                phoneNumber: userCurrent.phoneNumber
            })
        }
        console.log('mounting modal', this.props.userCurrent);
    }


    toggle = () => {
        this.props.toggleUserModel()
    }

    handleOnChangeInput = (e, id) => {
        let coppyState = { ...this.state };
        coppyState[id] = e.target.value;

        this.setState({
            ...coppyState
        });
    }

    handleValidate = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber'];
        for (let index = 0; index < arrInput.length; index++) {
            if (!this.state[arrInput[index]]) {
                isValid = false;
                alert('Missing parameter' + " " + arrInput[index]);
                break;
            }

        }
        return isValid;

    }

    handleSaveUser = () => {
        let isValid = this.handleValidate();
        if (isValid === true) {
            this.props.editUser(this.state);
        }
    }


    render() {
        console.log('check props from parent :', this.props);
        return (
            <div className="text-center" >
                <Modal
                    isOpen={this.props.isOpenModel}
                    toggle={() => this.toggle()}
                    className={'className'}
                    size='lg'
                    centered
                >
                    <ModalHeader toggle={() => this.toggle()}>Edit a User</ModalHeader>
                    <ModalBody>
                        <div class="container">
                            <div className='email-row'>
                                <div className='row'>
                                    <label htmlFor="" >Email</label>
                                    <input value={this.state.email}
                                        placeholder='Enter your Email'
                                        type="email"
                                        onChange={(e) => { this.handleOnChangeInput(e, "email") }}
                                        disabled

                                    />

                                </div>

                                <div className='row'>
                                    <label htmlFor="">Password</label>
                                    <input
                                        value={this.state.password}
                                        placeholder='Enter your Password'
                                        type="password"
                                        onChange={(e) => { this.handleOnChangeInput(e, "password") }}
                                        disabled

                                    />
                                </div>
                            </div>

                            <div className='name-row'>
                                <div className='row'>
                                    <label htmlFor="">First Name</label>
                                    <input value={this.state.firstName}
                                        placeholder='Enter your first name'
                                        type="text"
                                        onChange={(e) => { this.handleOnChangeInput(e, "firstName") }}
                                    />
                                </div>

                                <div className='row'>
                                    <label htmlFor="">Last Name</label>
                                    <input value={this.state.lastName}
                                        placeholder='Enter your last name'
                                        type="text"
                                        onChange={(e) => { this.handleOnChangeInput(e, "lastName") }}
                                    />
                                </div>
                            </div>


                            <div className='three-row'>
                                <span>
                                    <div className='address-row'>
                                        <div className='row'>
                                            <label htmlFor="">Address</label>
                                            <input value={this.state.address}
                                                type="text"
                                                placeholder='Enter your Address'
                                                onChange={(e) => { this.handleOnChangeInput(e, "address") }}
                                            />
                                        </div>
                                        <div className='row'>
                                            <label htmlFor="">Phone Number</label>
                                            <input value={this.state.phoneNumber}
                                                type="text"
                                                placeholder='Enter your phone number'
                                                onChange={(e) => { this.handleOnChangeInput(e, "phoneNumber") }}
                                            />
                                        </div>

                                        <div className='row'>
                                            <label htmlFor="">Role</label>
                                            <select name="gender" id="inputState" class="form-control">
                                                <option value="1">Admin</option>
                                                <option value="2">Doctor</option>
                                                <option value="3">Patient</option>
                                            </select>
                                        </div>

                                    </div>
                                </span>
                            </div>

                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            className='btn'
                            color="primary"
                            onClick={() => this.handleSaveUser()}>
                            Save
                        </Button>{' '}
                        <Button className='btn' color="secondary" onClick={() => this.toggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);


