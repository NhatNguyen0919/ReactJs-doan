import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { GrFacebook, GrInstagram, GrGithub, GrGoogle } from "react-icons/gr";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { handleLogin } from '../../services/userService';

import { FormattedMessage } from 'react-intl';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPass: false,
            errMsg: ''
        }
    }

    handleOnChangeUserName = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleOnSubmit = async () => {
        this.setState({
            errMsg: ''
        })
        try {
            let data = await handleLogin(this.state.username, this.state.password)

            if (data && data.errorCode !== 0) {
                this.setState({
                    errMsg: data.message
                })
            }
            if (data && data.errorCode === 0) {
                // todo
                this.props.userLoginSuccess(data.user)
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMsg: error.response.data.message,
                    })
                }
            }
        }
    }



    handleShowHidePass = () => {
        this.setState({
            isShowPass: !this.state.isShowPass
        })
    }

    handleKeydown = (event) => {
        if (event.key === 'Enter') {
            this.handleOnSubmit();
        }
    }

    render() {

        return (

            <div>
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content row"  >
                            <div className='col-12 login-text'>Login</div>
                            <div className="col-12 form-group login-input">
                                <label htmlFor="">UserName :</label>
                                <input type="text" value={this.state.username}
                                    onChange={(event) => this.handleOnChangeUserName(event)}
                                    className='form-control' placeholder='Enter your Username/Email'
                                    onKeyDown={(event) => this.handleKeydown(event)}

                                />
                            </div>
                            <div className="col-12 form-group login-input">
                                <label htmlFor="">Password :</label>
                                <div className='custom-input-pass'>
                                    <input type={this.state.isShowPass ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnChangePassword(event)}
                                        className='form-control' placeholder='Enter your password'
                                        onKeyDown={(event) => this.handleKeydown(event)}
                                    />
                                    <span
                                        onClick={() => { this.handleShowHidePass() }}
                                    >
                                        {
                                            this.state.isShowPass ? <i><AiFillEyeInvisible /></i>
                                                : <i><AiFillEye /></i>
                                        }

                                    </span>
                                </div>

                            </div>
                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMsg}
                            </div>
                            <div className="col-12">
                                <button className='btn-login' onClick={() => this.handleOnSubmit()}>Log in</button>
                            </div>
                            <div className='col-12'>
                                <small className='forgot-pass'>Forgot your password ?</small>
                            </div>
                            <div className="col-12 text-center">
                                <small className='text-other-login'>Or Login with:</small>
                            </div>
                            <div className='col-12 social-login'>
                                <i className='fbook'><GrFacebook></GrFacebook></i>
                                <i className='insta'><GrInstagram></GrInstagram></i>
                                <i className='google'><GrGoogle></GrGoogle></i>
                                <i className='github'><GrGithub></GrGithub></i>
                            </div>
                            <div className="col-12 text-center sign-up">Not a member ? <a href="/register" style={{ color: 'purple' }}>Sign up</a></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
