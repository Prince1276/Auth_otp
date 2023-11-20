import React from 'react';
import firebase from './firebase';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './OTPValidation'; // Add your CSS file here

class OTPValidation extends React.Component {
    state = {
        mobile: '',
        otp: '',
        redirectToHome: false,
        isMobileInputVisible: true,
        isOTPInputVisible: false,
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    }

    configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                this.onSignInSubmit();
                toast.success("Recaptcha verified");
            },
            defaultCountry: "PK",
        });
    }

    onSignInSubmit = (e) => {
        e.preventDefault();
        this.configureCaptcha();
        const phoneNumber = this.state.mobile;
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                toast.success("OTP has been sent");
                this.setState({
                    isMobileInputVisible: false,
                    isOTPInputVisible: true,
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error sending OTP");
            });
    }

    onSubmitOTP = (e) => {
        e.preventDefault();
        const code = this.state.otp;
        window.confirmationResult.confirm(code)
            .then((result) => {
                const user = result.user;
                toast.success("User is verified");
                this.setState({ redirectToHome: true });
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error verifying OTP");
            });
    }

    closeMobileInput = () => {
        this.setState({
            isMobileInputVisible: false,
        });
    }

    closeOTPInput = () => {
        this.setState({
            isOTPInputVisible: false,
        });
    }

    render() {
        if (this.state.redirectToHome) {
            return <Navigate to="/home" />;
        }

        return (
            <div>
                <ToastContainer />
                {this.state.isMobileInputVisible && (
                    <div className="overlay">
                        <div className="popup">
                            <span className="close" onClick={this.closeMobileInput}>X</span>
                            <h2>Login Form</h2>
                            <form onSubmit={this.onSignInSubmit}>
                                <div id="sign-in-button"></div>
                                <input
                                    type="text"
                                    name="mobile"
                                    placeholder="Mobile number"
                                    required
                                    value={this.state.mobile}
                                    onChange={this.handleChange}
                                />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                )}

                {this.state.isOTPInputVisible && (
                    <div className="overlay">
                        <div className="popup">
                            <span className="close" onClick={this.closeOTPInput}>X</span>
                            <h2>Enter OTP</h2>
                            <form onSubmit={this.onSubmitOTP}>
                                <input
                                    type="number"
                                    name="otp"
                                    placeholder="OTP Number"
                                    required
                                    value={this.state.otp}
                                    onChange={this.handleChange}
                                />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default OTPValidation;
