import React, { Component } from 'react';
import classnames from 'classnames';
import axios from 'axios';

class Login extends Component {
  constructor() {
      super();
      this.state = {
        email:'',
        password:'',
        errors:{}
      };
    }

    onChange(e) {
      this.setState({[e.target.name]:e.target.value});
    }

    onsubmit(e) {
      e.preventDefault();
      const newUser = {
        email: this.state.email,
        password: this.state.password
      }

      axios
      .post('api/users/login',newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({errors: err.response.data}))
    }

  render() {
    const {errors} = this.state; 
    return (     
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your DevConnector account</p>
                <form noValidate onSubmit={this.onsubmit.bind(this)}>
                  <div className="form-group">
                    <input type="email" 
                    className={classnames('form-control form-control-lg', {'is-invalid': errors.email})} 
                    placeholder="Email Address" name="email" value={this.state.email} 
                    onChange={this.onChange.bind(this)} />
                    {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>)}
                  </div>
                  <div className="form-group">
                    <input type="password" 
                    className={classnames('form-control form-control-lg', {'is-invalid': errors.password})}
                    placeholder="Password" name="password"
                    value={this.state.password} onChange={this.onChange.bind(this)} />
                    {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>)}

                  </div>
                  <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>
              </div>
            </div>
          </div>
        </div>     
    )
  }
}
export default Login;
