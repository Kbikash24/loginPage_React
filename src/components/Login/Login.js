import React, { useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'EMAIL':
      return {
        ...state,
        enteredEmail: action.value,
        emailIsValid: action.value.includes('@'),
      };
    case 'COLLEGE':
      return {
        ...state,
        enteredCollege: action.value,
        collegeIsValid: action.value.trim().length > 1,
      };
    case 'PASSWORD':
      return {
        ...state,
        enteredPassword: action.value,
        passwordIsValid: action.value.trim().length > 6,
      };
    case 'VALIDATE_FORM':
      return {
        ...state,
        formIsValid:
          state.enteredEmail.includes('@') &&
          state.enteredCollege.trim().length > 1 &&
          state.enteredPassword.trim().length > 6,
      };
    default:
      return state;
  }
};

const Login = (props) => {
  const initialState = {
    enteredEmail: '',
    emailIsValid: false,
    enteredCollege: '',
    collegeIsValid: false,
    enteredPassword: '',
    passwordIsValid: false,
    formIsValid: false,
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const emailChangeHandler = (event) => {
    dispatch({ type: 'EMAIL', value: event.target.value });
    dispatch({ type: 'VALIDATE_FORM' });
  };

  const collegeChangeHandler = (event) => {
    dispatch({ type: 'COLLEGE', value: event.target.value });
    dispatch({ type: 'VALIDATE_FORM' });
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: 'PASSWORD', value: event.target.value });
    dispatch({ type: 'VALIDATE_FORM' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.enteredEmail, state.enteredCollege, state.enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            state.emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={state.enteredEmail}
            onChange={emailChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            state.collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="CollegeName">College Name</label>
          <input
            type="text"
            id="college"
            value={state.enteredCollege}
            onChange={collegeChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            state.passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.enteredPassword}
            onChange={passwordChangeHandler}
          />
        </div>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!state.formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
