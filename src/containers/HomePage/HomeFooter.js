import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';





class HomeFooter extends Component {

    render() {

        return (
            <>

                <div className="home-footer">
                    <p>&copy; 2023 Nguyen Huynh Anh Nhat.More information, please
                        &#8594;
                        <a target='_blank' href='#'>Contact me</a>
                        &#8592;
                    </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
