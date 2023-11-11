import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import * as actions from '../../../store/actions';
import { getDetailInfoDoctors } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';



class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctorInfor: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInfoDoctors(id);
            if (res && res.errorCode === 0) {
                this.setState({
                    doctorInfor: res.data
                })
            }

        }
    }

    componentDidUpdate(prevProps, prevStates) {


    }



    render() {
        let { language } = this.props;
        let doctorInforImg = this.state.doctorInfor.image;
        let doctorInfor = this.state.doctorInfor;
        let nameEn = '', nameVi = ''
        if (doctorInfor && doctorInfor.positionData) {
            nameVi = `${doctorInfor.positionData.valueVi}, ${doctorInfor.lastName} ${doctorInfor.firstName}`;
            nameEn = `${doctorInfor.positionData.valueEn}, ${doctorInfor.lastName} ${doctorInfor.firstName}`;
        }
        console.log("Check cc :", doctorInfor);
        return (
            <>
                <div>
                    <HomeHeader isShowBanner={false}></HomeHeader>
                </div>
                <div className="doctor-detail-container">
                    <div className='intro-doctor'>
                        <div
                            className='content-left'
                        >
                            <div className='image-doctor' style={{ backgroundImage: `url(${doctorInfor && doctorInforImg ? doctorInforImg : ''})` }}> </div>
                        </div>
                        <div className='content-right'>
                            <div className="content-right-container">
                                <div className='up'>
                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                </div>
                                <div className='down'>
                                    {
                                        doctorInfor &&
                                        doctorInfor.Markdown
                                        && doctorInfor.Markdown.description
                                        && <span>
                                            {doctorInfor.Markdown.description}
                                        </span>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='detail-infor-doctor'>
                        {doctorInfor &&
                            doctorInfor.Markdown
                            && doctorInfor.Markdown.contentHTML
                            && <div dangerouslySetInnerHTML={{ __html: doctorInfor.Markdown.contentHTML
                             }}>

                            </div>
                        }
                    </div>
                    <div className='comment-doctor'>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
