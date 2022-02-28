import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from "tt-frontend-components/Input/Input.tsx";
import Button from "tt-frontend-components/Button/Button.tsx";
import {ERROR_INVALID_EMAIL, ERROR_INVALID_PASSWORD} from "tt-frontend-message";
import { useStoreActions } from 'easy-peasy';

interface RouteProps {
  history: any;
}

const Login: React.FC<RouteProps> = ({ history }): JSX.Element => {
  const [email, setEmailAddress]          = useState<string>('');
  const [emailError, setEmailError]       = useState<boolean>(false);
  const [password, setPassword]           = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const mailformat                        = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const loginUser                         = useStoreActions((actions) => actions.authentication.userDirectLogin);

  const authenticateUser = async() => {
    setEmailError(false);
    setPasswordError(false);

    if (email.trim() == '') {
      setEmailError(true);
      return false;
    }

    if (email.trim()) {
      if (!email.match(mailformat)) {
        setEmailError(true);
        return false;
      }
    }

    if (password.trim() == '') {
      setPasswordError(true);
      return false;
    }

    setDisableButton(true);

    let formData = {email: email, password: password}
    let response = await loginUser(formData);

    setDisableButton(false);

    if (response) {
      history.push('/board');
    }
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form className="form-signin">
                  <Input
                    label={"Email Address"}
                    type={'email'}
                    value={email}
                    handleInputChange={(e) => setEmailAddress(e.target.value)}
                    error={emailError}
                    placeholder={"Email address"}
                    errorMessage={ERROR_INVALID_EMAIL}
                    id="inputEmail"
                  />

                  <Input
                    label={"Password"}
                    type={'password'}
                    value={password}
                    handleInputChange={(e) => setPassword(e.target.value)}
                    error={passwordError}
                    placeholder={"Password"}
                    errorMessage={ERROR_INVALID_PASSWORD}
                    id="inputPassword"
                  />

                  <Button type={'button'} onClick={() => disableButton ? "" : authenticateUser()} label={"Sign In"} disableBtn={disableButton} />

                  <Link className="btn btn-lg btn-primary btn-block text-uppercase" to="/register">Sign Up</Link>
                  <hr className="my-4" />
                  <p className="forgot-password text-right">
                      <Link to="/forgot-password">Forgot password?</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
