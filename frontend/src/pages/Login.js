import React, { Component, Fragment } from 'react'

// redux
import { connect } from 'react-redux'

// redux action
import { login } from '../redux/action/authAction'


class Login extends Component {

    handleLogin = event => {
        event.preventDefault()
        const element = event.target.elements
        
        const userData = {
            username: element.username.value,
            password: element.password.value
        }
        this.props.login(userData, this.props.history)
    }

    render() {
        return (
            <Fragment>
                <div>
                    <div className="loginBox">
                        <form onSubmit={this.handleLogin}>
                            <h2>เข้าสู่ระบบ</h2>
                            <div>
                                <input id="username" name="username" type="text" required placeholder="อีเมล" />
                            </div>
                            <div>
                                <input id="password" name="password" type="password" required placeholder="รหัสผ่าน" />
                            </div>
                            <button type="submit"><i className="fas fa-sign-in-alt mr-1"></i>เข้าสู่ระบบ</button>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    login: (data) => dispatch(login(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)