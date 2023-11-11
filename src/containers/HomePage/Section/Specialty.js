import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';



class Specialty extends Component {


    render() {

        return (
            <div>
                <div className='section-wrapper section-specialty'>
                    <div className='section-container'>
                        <div className="section-header">
                            <h3>Chuyên khoa phổ biến</h3>
                            <button>Xem thêm</button>
                        </div>

                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='bg-image section-specialty' />
                                    <div className='custom-text'>Da liễu 1 </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-specialty' />
                                    <div className='custom-text'>Da liễu 2 </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-specialty' />
                                    <div className='custom-text'>Da liễu 3 </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-specialty' />
                                    <div className='custom-text'>Da liễu 4 </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-specialty' />
                                    <div className='custom-text'>Da liễu 5 </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-specialty' />
                                    <div className='custom-text'>Da liễu 6 </div>
                                </div>
                            </Slider>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
