import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import '../HomePage.scss';

class MedicalFacility extends Component {

    render() {

        return (
            <>
                <div>
                <div className='section-wrapper section-medical'>
                    <div className='section-container'>
                        <div className="section-header">
                            <h3>Cơ sở y tế nổi bật</h3>
                            <button>Xem thêm</button>
                        </div>

                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical' />
                                    <div className='custom-text'>Bệnh viện Hữu nghị Việt Đức 1 </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical' />
                                    <div className='custom-text'>Bệnh viện Hữu nghị Việt Đức 2 </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical' />
                                    <div className='custom-text'>Bệnh viện Hữu nghị Việt Đức 3 </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical' />
                                    <div className='custom-text'>Bệnh viện Hữu nghị Việt Đức 4 </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical' />
                                    <div className='custom-text'>Bệnh viện Hữu nghị Việt Đức 5 </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical' />
                                    <div className='custom-text'>Bệnh viện Hữu nghị Việt Đức 6 </div>
                                </div>
                            </Slider>
                        </div>

                    </div>
                </div>
                </div>

            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
