import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';
import IntlMessages from '@iso/components/utility/intlMessages';
import jwtConfig from '@iso/config/jwt.config';
// import FirebaseLogin from '@iso/containers/FirebaseForm/FirebaseForm';
// import Auth0 from '../authentication/Auth0';

import jwtAuthentication from '../authentication/jwtAuthentication';
import authActions from '../authentication/actions';
import SignInStyleWrapper from '../styled/SignIn.styles';
const { login } = authActions;
export default function SignInPage(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState(null); // Add state for error message
  const [successMessage, setSuccessMessage] = useState(null); // Add state for success message

  const handleLogin = e => {
    e.preventDefault();
    dispatch(login(true));
  };

  const handleJWTLogin = async() => {
    const { jwtLogin, history } = props;
    const userInfo = {
      email:
        (typeof window === 'object' && document.getElementById('inputUserName').value) ||
        '',
      password:
        (typeof window === 'object' && document.getElementById('inpuPassword').value) ||
        '',
    };
    try {
      // Call jwtAuthentication.login with user info
      const result = await jwtAuthentication.login(userInfo);
      // If authentication is successful
      console.log(result.token)
      if (result.success) {
        // Redirect to the desired page using Next.js router
        router.push('/dashboard'); // Replace '/dashboard' with the desired URL
        setSuccessMessage('Login successful!'); // Set success message in state
        setErrorMessage(null)
      } else {
        // Handle authentication failure
        console.error(result.message);   setErrorMessage(result.message); // Set error message in state
     
      }
    } catch (error) {
      // Handle any error that may occur during authentication
      console.error('Error during authentication:', error);
    }
  };

  return (
    <SignInStyleWrapper className="isoSignInPage">
      
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <Link href="/dashboard">
              <a>
                <IntlMessages id="page.signInTitle" />
              </a>
            </Link>
          </div>

          <div className="isoSignInForm">
            <div className="isoInputWrapper">
              <Input
                id="inputUserName"
                size="large"
                placeholder="Username"
                defaultValue="demo@gmail.com"
              />
           </div>
            <div className="isoInputWrapper">
              <Input
                id="inpuPassword"
                size="large"
                type="password"
                placeholder="Password"
                defaultValue="demodemo"
              />
            </div>
            <div>
      {/* Render error message if exists */}
      {errorMessage && (
        <div
          style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            padding: '8px',
            borderRadius: '4px',
            margin: '8px 0',
          }}
        >
          <p style={{ margin: '0' }}>{errorMessage}</p>
        </div>
      )}{/* Render error message if exists */}
     {successMessage && (
  <div
    style={{
      backgroundColor: '#d2f0d7', // Update to green-ish background color
      color: '#228b22', // Update to green-ish text color
      border: '1px solid #90ee90', // Update to green-ish border color
      padding: '8px',
      borderRadius: '4px',
      margin: '8px 0',
    }}
  >
    <p style={{ margin: '0' }}>{successMessage}</p>
  </div>
)}

    </div>
            <div className="isoInputWrapper isoLeftRightComponent">
              <Checkbox>
                <IntlMessages id="page.signInRememberMe" />
              </Checkbox>
              <Button
                type="primary"
                onClick={jwtConfig.enabled ? handleJWTLogin : handleLogin}
              >
                <IntlMessages id="page.signInButton" />
              </Button>
            </div>


            <p className="isoHelperText">
              <IntlMessages id="page.signInPreview" />
            </p>

            {/* <div className="isoInputWrapper isoOtherLogin">
              <Button
                onClick={handleLogin}
                type="primary"
                className="btnFacebook"
              >
                <IntlMessages id="page.signInFacebook" />
              </Button>
              <Button
                onClick={handleLogin}
                type="primary"
                className="btnGooglePlus"
              >
                <IntlMessages id="page.signInGooglePlus" />
              </Button>

              <Button
                onClick={() => Auth0.login(handleLogin)}
                type="primary"
                className="btnAuthZero"
              >
                <IntlMessages id="page.signInAuth0" />
              </Button>

              <FirebaseLogin
                history={router}
                login={token => dispatch(login(token))}
              />
            </div> */}
            <div className="isoCenterComponent isoHelperWrapper">
              <Link href="/forgotpassword">
                <div className="isoForgotPass">
                  <IntlMessages id="page.signInForgotPass" />
                </div>
              </Link>
              <Link href="/signup">
                <a>
                  <IntlMessages id="page.signInCreateAccount" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
