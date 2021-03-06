import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { Avatar, Button, Container, Grid, Paper, TextField, Typography } from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles.js';
import Input from './Input.js';
import Icon from './Icon.js';
import {AUTH,LOGOUT} from '../../constants/actionTypes.js';
import { signin, signup } from '../../actions/auth.js';


const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''};
const Auth = () => {
    const classes=useStyles();
    const [showPassword,setShowPassword]=useState(true);
    const [isSignup,setIsSignup]=useState(false);
    const dispatch = useDispatch();
    const history = useHistory ();
    const [formData,setFormData]=useState(initialState);

    const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword);

    const switchMode=()=>{
      setIsSignup((prevIsSignup)=>!prevIsSignup);
      setShowPassword(false);
    }


    // const isSignup=true;
    const handelSubmit=(e)=>{
      e.preventDefault();
      // console.log('here',formData);
      if(isSignup){
        dispatch(signup(formData,history));
      }
      else{
        dispatch(signin(formData,history));
      }
    };
    const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});
    };

    const googleSuccess=async (res)=>{
      // console.log(res);  
      const result=res?.profileObj;
      const token=res?.tokenId;
      // console.log("img",result.imageUrl);
      // console.log("token",token);

      try {
        dispatch({type:AUTH,data:{result,token}});
        history.push('/')
      } catch (error) {
        console.log(error);
      }
    };
    const googleFailure=(error)=>{
      console.log(error);
      console.log('Google Sign In was unsuccessful. Try Again Later');
    }
    return (
      <Container component="main" maxWidth="xs">
          <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup?'Sign Up':'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handelSubmit}>
              <Grid container spacing={2}>
                {
                  isSignup && (
                    <>
                      <Input  name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                      <Input  name="lastName" label="Last Name" handleChange={handleChange}  half/>
                    </>
                  )}
                  <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                  <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
                  {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" handleShowPassword={handleShowPassword}/>}
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                {isSignup?'Sign Up':'Sign In'}
              </Button>
              <GoogleLogin
                clientId="941449107536-ca34pcuu06cbkaksl2s1pcirka3ujeq0.apps.googleusercontent.com"
                render={(renderProps)=>(
                  <Button className={classes.googleButton} color='primary' fullWidth  onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
              />
              <Grid container  justifyContent="flex-end">
                <Grid item>
                  <Button onClick={switchMode}>
                  { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                  </Button>
                </Grid>
              </Grid>
            </form>

          </Paper>

        </Container>
    )
}
export default Auth;