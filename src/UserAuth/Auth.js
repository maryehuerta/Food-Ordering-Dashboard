import React, { Component, button, input } from 'react';

class Auth extends Component {
		render() {
			// Show login screen in header
			if (!this.props.isLoggedIn && !this.props.isRegistering) {
			return (
				<div>
					<input onChange={this.props.emailChange}
						type="email"
						placeholder="email" />
					<input onChange={this.props.passwordChange}
						type="password" />
					<button onClick={this.props.login} className="No-focus"> Login </button>
					<p> or </p>
					<button onClick={this.props.setRegisterState} className="No-focus"> Register </button>
				</div>
			)
		}
		// Show nothing in header (Register is in body)
		if (!this.props.isLoggedIn && this.props.isRegistering) {
			return (
				<div>
				</div>
			)
		}	
	}
}

export default Auth;