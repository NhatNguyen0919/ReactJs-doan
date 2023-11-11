import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { AiFillEdit, AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import './TableManageUser.scss';
import * as actions from '../../../store/actions';



import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}



class TableManageUser extends Component {


    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();

    }

    componentDidUpdate(prevProps, prevStates) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                usersRedux: this.props.users
            })
        }
    }

    handleDelete(users) {
        this.props.deleteUsersRedux(users.id);
    }

    handleEditUser(users) {
        this.props.handleEditUserFromParent(users);
    }

    render() {
        let arrUsers = this.state.usersRedux;
        return (
            <>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Mail</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Position</th>
                            <th>Phone Number</th>
                            <th>Action</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0
                            && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index} >
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.positionId}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td className='action-crud'>
                                            <button className='mx-2'
                                                onClick={() => { this.handleEditUser(item) }}
                                            >
                                                Edit
                                                <i>
                                                    <AiFillEdit />
                                                </i>
                                            </button>

                                            <button className='mx-2' onClick={() => { this.handleDelete(item) }}>
                                                Delete
                                                <i>
                                                    <AiOutlineDelete />
                                                </i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>


                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />

            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUsersRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
