import React from 'react'
import './DownLoad.scss';
import { MdDoneOutline } from "react-icons/md";


const DownLoad = () => {
    return (
        <>
            <div className="wrapper-content">
                <div className="container">
                    <div className="left-content">
                        <div className="app-img">
                        </div>
                    </div>
                    <div className="right-content">
                        <h2>Tải ứng dụng BookingCare</h2>
                        <ul>
                            <li><i><MdDoneOutline /></i> Đặt khám nhanh hơn</li>
                            <li><i><MdDoneOutline /></i> Nhận thông báo từ hệ thống</li>
                            <li><i><MdDoneOutline /></i> Nhận hướng dẫn đi khám chi tiết</li>
                        </ul>
                        <div className="app-link">
                            <div className="ios"></div>
                            <div className="android"></div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DownLoad