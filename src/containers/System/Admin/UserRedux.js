import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { AiOutlineUpload } from "react-icons/ai";
import { connect } from 'react-redux';
import "./UserRedux.scss";
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTION, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';



class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
        }
    }

    state = {

    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errorCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log("Check:", res);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    componentDidUpdate(prevProps, prevStates, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })

        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }

        if (prevProps.users !== this.props.users) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTION.CREATE,
                previewImgUrl: ''
            })
        }
    }

    handleOnchangeImg = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            const objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
            console.log("base 64", this.state.avatar);
        }

    }

    openPreviewImg = () => {
        if (!this.state.previewImgUrl) {
            return;
        }
        this.setState({
            isOpen: true,
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        }

        let { action } = this.state;

        if (action === CRUD_ACTION.CREATE) {
            // fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            }, () => {
            })
        }

        if (action === CRUD_ACTION.EDIT) {
            // fire redux edit user
            this.props.editUserRedux({
                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
            })
        }


        this.props.fetchUserRedux();


    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address'];

        for (let index = 0; index < arrCheck.length; index++) {
            if (!this.state[arrCheck[index]]) {
                isValid = false;
                alert('Missing parameter ' + arrCheck[index]);
                break;
            }
        }

        return isValid;

    }

    onChangeInput = (event, id) => {
        let coppyState = { ...this.state }
        coppyState[id] = event.target.value;
        this.setState({
            ...coppyState
        })
    }



    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImgUrl: imageBase64,
            action: CRUD_ACTION.EDIT,
            userEditId: user.id
        })
    }


    render() {

        let genders = this.state.genderArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;

        let { email, password, firstName, lastName,
            phoneNumber, address,
            gender, position, role, avatar } = this.state;


        return (
            <>
                <div className='user-redux-container'>
                    <div className='title'>User Redux</div>
                    <div className="user-redux-body " >
                        <div className='container'>
                            <div className="row">
                                <div className="col-12 my-3"><FormattedMessage id="manage-users.add" /></div>
                                <div className="col-12 my-3">{isLoadingGender === true ? 'Loading Genders' : ''}</div>
                                <div className="col-3 my-3">
                                    <label htmlFor=""><FormattedMessage id="manage-users.email" /></label>
                                    <input className='form-control'
                                        type="email" value={email} onChange={(e) => { this.onChangeInput(e, 'email') }}
                                        disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                    />
                                </div>
                                <div className="col-3 my-3">
                                    <label htmlFor=""><FormattedMessage id="manage-users.password" /></label>
                                    <input className='form-control'
                                        type="password" value={password} onChange={(e) => { this.onChangeInput(e, 'password') }}
                                        disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                    />
                                </div>
                                <div className="col-3 my-3">
                                    <label htmlFor=""><FormattedMessage id="manage-users.first-name" /></label>
                                    <input className='form-control'
                                        type="text" value={firstName} onChange={(e) => { this.onChangeInput(e, 'firstName') }} />
                                </div>
                                <div className="col-3 my-3">
                                    <label htmlFor=""><FormattedMessage id="manage-users.last-name" /></label>
                                    <input className='form-control'
                                        type="text" value={lastName} onChange={(e) => { this.onChangeInput(e, 'lastName') }} />
                                </div>
                                <div className="col-3 my-3">
                                    <label htmlFor=""><FormattedMessage id="manage-users.phone-number" /></label>
                                    <input className='form-control' type="text"
                                        value={phoneNumber} onChange={(e) => { this.onChangeInput(e, 'phoneNumber') }}
                                    />
                                </div>
                                <div className="col-9 my-3">
                                    <label htmlFor=""><FormattedMessage id="manage-users.address" /></label>
                                    <input className='form-control' type="text"
                                        value={address} onChange={(e) => { this.onChangeInput(e, 'address') }}
                                    />
                                </div>
                                <div className="col-3 my-3">
                                    <label htmlFor=""><FormattedMessage id="manage-users.gender" /></label>
                                    <select className="form-select"
                                        value={gender} onChange={(e) => { this.onChangeInput(e, 'gender') }}
                                    >
                                        {genders && genders.length > 0 && genders.map((item, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                </>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-3 my-3">
                                    <label htmlFor=""><FormattedMessage id="manage-users.position" /></label>
                                    <select className="form-select"
                                        value={position} onChange={(e) => { this.onChangeInput(e, 'position') }}
                                    >
                                        <option selected>Choose...</option>
                                        {positions && positions.length > 0 && positions.map((item, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                </>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-3 my-3">
                                    <label htmlFor=""><FormattedMessage id="manage-users.role" /></label>
                                    <select className="form-select"
                                        value={role} onChange={(e) => { this.onChangeInput(e, 'role') }}
                                    >
                                        <option selected>Choose...</option>
                                        {roles && roles.length > 0 && roles.map((item, index) => {
                                            return (
                                                <>
                                                    <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                </>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-3 my-3">
                                    <label htmlFor=""><FormattedMessage id="manage-users.image" /></label>
                                    <div className='preview-img-container'>
                                        <input id='previewImg' type="file" hidden onChange={(e) => { this.handleOnchangeImg(e) }} />
                                        <label className='label-upload' htmlFor="previewImg">Tải ảnh <i><AiOutlineUpload /></i></label>
                                        <div className="preview-image"
                                            style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                            onClick={() => { this.openPreviewImg() }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="col-12 my-5">
                                    <button className={this.state.action === CRUD_ACTION.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                        onClick={() => { this.handleSaveUser() }}
                                    >
                                        {this.state.action === CRUD_ACTION.EDIT ?
                                            <FormattedMessage id="manage-users.edit" />
                                            :
                                            <FormattedMessage id="manage-users.save" />
                                        }
                                    </button>

                                </div>
                                <div className="col-12 mb-5">
                                    <TableManageUser
                                        handleEditUserFromParent={this.handleEditUserFromParent}
                                        action={this.state.action}
                                    />

                                </div>

                            </div>
                        </div>
                    </div>

                    {this.state.isOpen === true && <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />}

                </div>

            </>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        users: state.admin.users


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data)),


        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
