import React, { Component } from 'react';
import * as actions from '../../actions/index';
import  { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class LoginPage extends Component  {
  
  
  componentDidUpdate(){
    this.props.fetchUser();
  }

  renderDashboard() {
    if (this.props.auth) {
      return <Redirect to='/'  />
    }else if(this.props.auth === false){
      return;
    }
    else {
      return <div>Loading.....</div>
    }
  }

  onSubmit(event) {
   event.preventDefault();
   const { email, password } = event.target;
   const formData = {
     email: email.value,
     password: password.value,
     type: 'user'
   }
   //console.log(formData);
   this.props.loginUser(formData);
   
  }

  render(){
    return(
      <div id="login">
        {this.renderDashboard()}
        <div className="row">
          <div className="col-md-4 col-md-push-4" id="login_form">
            <div className="form-header">
            <h5>Login</h5>
            </div>
            <form className="login_form" onSubmit={(e)=>this.onSubmit(e)}>
              <div className="row">
                <div className="input-field col-md-12">
                  <input id="icon_prefix" type="email" className="validate" name="email" />
                  <label htmlFor="icon_prefix">Email</label>
                </div>
              </div>  
              <div className="row">
                <div className="input-field col-md-12">
                  <input id="icon_email" type="password" className="validate" name="password" />
                  <label htmlFor="icon_prefix">Password</label>
                </div>  
              </div>
              <div className="row">
                <input type="submit" className="btn btn-block btn-primary" value="login"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect( mapStateToProps, actions )( LoginPage );