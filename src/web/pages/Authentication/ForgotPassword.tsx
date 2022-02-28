import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from "tt-frontend-components/Input/Input.tsx";
import Button from "tt-frontend-components/Button/Button.tsx";
import {ERROR_INVALID_EMAIL} from "tt-frontend-message";
import { useStoreActions } from 'easy-peasy';

interface RouteProps {
  history: any;
}

const ForgotPassword: React.FC<RouteProps> = ({ history }): JSX.Element => {
  const [email, setEmailAddress]           = useState<string>('');
  const [emailError, setEmailError]        = useState<boolean>(false);
  const [disableButton, setDisableButton]  = useState<boolean>(false);
  const mailformat                         = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const forgotPassword                     = useStoreActions((actions) => actions.authentication.forgotPassword);

  const authenticateUser = async() => {
    setEmailError(false);

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

    setDisableButton(true);

    let formData = {email: email}
    let response = await forgotPassword(formData);

    setDisableButton(false);
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Forgot Passwaord</h5>
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
                  <Button type={'button'} onClick={() => disableButton ? "" : authenticateUser()} label={"Submit"} disableBtn={disableButton} />
                  <hr className="my-4" />
                  <p className="forgot-password text-right">
                      Go back to <Link to="/login">Sign In</Link>
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

export default ForgotPassword;
