import React from 'react';
import _ from 'lodash'
const Login = ({user,hanldeLogout}) => {
  const jsonCode = JSON.stringify(user,null,4)   
    return ( 
  <div className="container-fluid">
  <div className="row no-gutter">
    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image">
    {
    !_.isEmpty(user) &&  <div className="window">
            <div className="title-bar">
                <div className="buttons">
                    <div className="mac-btn close" />
                    <div className="mac-btn minimize" />
                    <div className="mac-btn zoom" />
                </div>
                <p style={{ textAlign: "center", margin: 0 }}>
                    json-terminal
                </p>
            </div>
            <div className="content">
                <pre>{jsonCode}</pre>
            </div>
        </div>}</div>
    <div className="col-md-8 col-lg-6 bgg">
      <div className="login d-flex align-items-center py-5 bgg">
        <div className="container">
          <div className="row">

            <div className="col-md-9 col-lg-8 mx-auto">
              <div className="logo"></div>
              <h3 className="login-heading mb-4">Welcome back!</h3>
              {_.isEmpty(user) &&<form action="/auth">
              <i className="fa fa-discord"></i><button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit"><i class="fa fa-heart">  </i>      Login With Discord</button>                 
              </form> }
              {!_.isEmpty(user) && <button onClick={hanldeLogout} className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit"><i class="fa fa-heart"></i>  Logout</button>  }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
     );
}
 
export default Login;