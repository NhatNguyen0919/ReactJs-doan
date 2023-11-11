import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss';


class About extends Component {

    render() {

        return (
            <>
                <div className="section-wrapper section-about">
                    <div className="section-about-header">
                        <h2>Truyền thông nói về BookingCare</h2>
                    </div>
                    <div className="section-about-content">
                        <div className="left-content">
                            <iframe width="100%" height="400px"
                                src="https://www.youtube.com/embed/3JLDUJJuVGk"
                                title="Hai Thế Giới full - Bin &amp; Karik ( Official Video HD full )"
                                frameBorder="0" allow="accelerometer; autoplay; 
                            clipboard-write; encrypted-media; gyroscope; picture-in-picture;
                             web-share" allowFullScreen></iframe>
                        </div>
                        <div className="right-content">
                            <p>
                                Thế giới này là của anh
                                Và anh có quyền đi với em
                                Bật sáng tất cả đèn xanh
                                Anh chạy thật nhanh
                                Với em kế bên vai
                                Và chai champaine em cầm trên tay
                                Hết đêm nay uống không say
                                Đến ngày mai tiếp vài chai
                                Em thích gì anh cho đó
                                Em thích Bentley anh vẫn cho
                                Em thích villa anh vẫn lo
                                Cho đến LV anh cũng có
                                Chỉ cần em chơi với anh
                                Là cả thế giới này thuộc về em
                                Chỉ cần em đi với anh
                                Là những vấn đề của em anh dẹp
                            </p>

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

export default connect(mapStateToProps, mapDispatchToProps)(About);
