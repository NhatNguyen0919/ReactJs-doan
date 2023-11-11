import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import '../HomePage.scss';
import "./HandBook.scss";


class HandBook extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
        };

        return (
            <>
                <div>
                    <div className='section-wrapper section-handbook'>
                        <div className='section-container'>
                            <div className="section-header">
                                <h3>Cẩm nang</h3>
                                <button>Xem thêm</button>
                            </div>

                            <div className="section-body">
                                <Slider {...settings}>
                                    <div className='section-customize handbook'>
                                        <div className='bg-image section-handbook handbook-img' />
                                        <h3 className='custom-text handbook-text'>Điều trị phục hồi chức năng cho bệnh nhân đột quỵ tại Bệnh viện Hồng Ngọc  </h3>
                                    </div>
                                    <div className='section-customize handbook'>
                                        <div className='bg-image section-handbook handbook-img' />
                                        <h3 className='custom-text handbook-text'>Điều trị phục hồi chức năng cho bệnh nhân đột quỵ tại Bệnh viện Hồng Ngọc  </h3>
                                    </div>
                                    <div className='section-customize handbook'>
                                        <div className='bg-image section-handbook handbook-img' />
                                        <h3 className='custom-text handbook-text'>Điều trị phục hồi chức năng cho bệnh nhân đột quỵ tại Bệnh viện Hồng Ngọc  </h3>
                                    </div>
                                    <div className='section-customize handbook'>
                                        <div className='bg-image section-handbook handbook-img' />
                                        <h3 className='custom-text handbook-text'>Điều trị phục hồi chức năng cho bệnh nhân đột quỵ tại Bệnh viện Hồng Ngọc  </h3>
                                    </div>
                                    <div className='section-customize handbook'>
                                        <div className='bg-image section-handbook handbook-img' />
                                        <h3 className='custom-text handbook-text'>Điều trị phục hồi chức năng cho bệnh nhân đột quỵ tại Bệnh viện Hồng Ngọc  </h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
