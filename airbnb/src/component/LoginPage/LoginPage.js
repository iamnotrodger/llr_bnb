import React, {Component} from 'react';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state.email);
        console.log(this.state.password);
    }

    render() {
        return (
            <div>
                <input 
                    name='email'
                    placeholder='Email'
                    onChange={this.onChange}
                />
                <input 
                    name='password'
                    placeholder='Password'
                    onChange={this.onChange}
                />
            </div>
        );
    }
}

export default LoginPage;