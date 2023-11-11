import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService, deleteUSerService, editUserService } from '../../services/userService';
import { AiFillEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import './UserManage.scss';
import ModelEditUser from './ModelEditUser';
class UserManage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModel: false,
            isOpenModelEditUser: false,
            userEdit: {}
        }
    }


    async componentDidMount() {
        await this.getAllUsers();
    }

    getAllUsers = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errorCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }


    handleAddNewUser = () => {
        this.setState({
            isOpenModel: true
        })
    }

    toggleUserModel = () => {
        this.setState({
            isOpenModel: !this.state.isOpenModel
        })
    }

    toggleEditUserModel = () => {
        this.setState({
            isOpenModelEditUser: !this.state.isOpenModelEditUser
        })
    }

    createNewUser = async (data) => {
        try {
            let respone = await createNewUserService(data);
            if (respone && respone.errorCode !== 0) {
                alert(respone.errorMessage);
            }
            else {
                await this.getAllUsers();
                this.setState({
                    isOpenModel: false
                })
            }
            emitter.emit('EVENT_CLEAR_MODAL_DATA')
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (user) => {
        console.log("user:", user);
        try {
            let res = await deleteUSerService(user.id)
            if (res && res.errorCode === 0) {
                await this.getAllUsers();
            } else {
                alert(res.errorMessage);
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleEditUser = (user) => {
        console.log('check edit user', user);
        this.setState({
            isOpenModelEditUser: true,
            userEdit: user
        })
    }

    editUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res.errorCode === 0) {
                this.setState({
                    isOpenModelEditUser: false,
                })

                this.getAllUsers();
            } else {
                alert(res.errorCode);
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const arrUsers = this.state.arrUsers
        return (
            <div className="user-container">
                <ModalUser isOpenModel={this.state.isOpenModel}
                    toggleUserModel={this.toggleUserModel}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModelEditUser &&
                    <ModelEditUser
                        isOpenModel={this.state.isOpenModelEditUser}
                        toggleUserModel={this.toggleEditUserModel}
                        userCurrent={this.state.userEdit}
                        editUser={this.editUser}
                    />
                }

                <div className="title text-center">
                    Manage users
                </div>
                <div className="mx-1">
                    <button className='btn btn-primary px-3'
                        onClick={() => { this.handleAddNewUser() }}
                    > <AiOutlinePlus className='mx-1' /> Add new user</button>
                </div>
                <div className="users-table mt-4 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Mail</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Action</th>
                            </tr>

                            {
                                arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td>{item.email}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.address}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td className='action-crud'>
                                                    <button className='mx-2' onClick={() => { this.handleEditUser(item) }}>Edit
                                                        <i>
                                                            <AiFillEdit />
                                                        </i>
                                                    </button>

                                                    <button className='mx-2' onClick={() => this.handleDeleteUser(item)}>Delete
                                                        <i>
                                                            <AiOutlineDelete />
                                                        </i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
