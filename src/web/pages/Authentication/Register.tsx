import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from "tt-frontend-components/Input/Input.tsx";
import Button from "tt-frontend-components/Button/Button.tsx";
import {ERROR_INVALID_EMAIL, ERROR_INVALID_PASSWORD, ERROR_FIRST_NAME, ERROR_LAST_NAME, ERROR_INVALID_CONFIRM_PASSWORD, ERROR_EMPTY_CONFIRM_PASSWORD} from "tt-frontend-message";
import { useStoreActions } from 'easy-peasy';

interface RouteProps {
  history: any;
}

const Register: React.FC<RouteProps> = ({ history }): JSX.Element => {
  const [firstname, setFirstname]           = useState<string>('');
  const [firstnameError, setFirstnameError] = useState<boolean>(false);
  const [lastname, setLastname]             = useState<string>('');
  const [lastnameError, setLastnameError]   = useState<boolean>(false);
  const [email, setEmailAddress]            = useState<string>('');
  const [emailError, setEmailError]         = useState<boolean>(false);
  const [password, setPassword]             = useState<string>('');
  const [passwordError, setPasswordError]   = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword]           = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<boolean>(false);
  const [doNotMatchError, setDoNotMatchError] = useState<boolean>(false);
  const [disableButton, setDisableButton]     = useState<boolean>(false);
  const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const userSignUp = useStoreActions((actions) => actions.authentication.userSignUp);

  const signupUser = async() => {
    setFirstnameError(false);
    setLastnameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setDoNotMatchError(false);

    if (firstname.trim() == '') {
      setFirstnameError(true);
      return false;
    }

    if (lastname.trim() == '') {
      setLastnameError(true);
      return false;
    }

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

    if (confirmPassword.trim() == '') {
      setConfirmPasswordError(true);
      setDoNotMatchError(false);
      return false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      setConfirmPasswordError(true);
      setDoNotMatchError(true);
      return false;
    }


    setDisableButton(true);

    let formData = {email: email, password: password, firstName : firstname, lastName: lastname}
    let response = await userSignUp(formData);

    setDisableButton(false);

    if (response) {
      history.push('/login');
    }
  }

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign Up</h5>
                <form className="form-signin">
                  <Input
                    label={"Firstname"}
                    type={'text'}
                    value={firstname}
                    handleInputChange={(e) => setFirstname(e.target.value)}
                    error={firstnameError}
                    placeholder={"Firstname"}
                    errorMessage={ERROR_FIRST_NAME}
                    id="inputFirstName"
                  />

                  <Input
                    label={"Lastname"}
                    type={'text'}
                    value={lastname}
                    handleInputChange={(e) => setLastname(e.target.value)}
                    error={lastnameError}
                    placeholder={"Lastname"}
                    errorMessage={ERROR_LAST_NAME}
                    id="inputLastName"
                  />

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

                  <Input
                    label={"Confirm Password"}
                    type={'password'}
                    value={confirmPassword}
                    handleInputChange={(e) => setConfirmPassword(e.target.value)}
                    error={confirmPasswordError}
                    placeholder={"Confirm Password"}
                    errorMessage={(!doNotMatchError && confirmPasswordError) ? ERROR_EMPTY_CONFIRM_PASSWORD : (confirmPasswordError && doNotMatchError) ?  ERROR_INVALID_CONFIRM_PASSWORD : ''}
                    id="inputConfirmPassword"
                  />

                  <Button type={'button'} onClick={() => disableButton ? "" : signupUser()} label={"Sign Up"} disableBtn={disableButton} />

                  <hr className="my-4" />
                  <p className="forgot-password text-right">
                      Already registered? <Link to="/login">Sign In</Link>
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

export default Register;
