import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { useRef, useState,useAlert,useEffect} from "react";
import { Link, redirect } from "react-router-dom";
import "./LoginandRegister.css";
import {useDispatch,useSelector} from "react-redux";
import {login,clearError,register}  from '../../../Action/Useraction'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FaceIcon from '@mui/icons-material/Face';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function LoginandRegister() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const location=useLocation();


const {error,loading,isAuthenticated} =useSelector(state =>state.user)
  const loginTab = useRef(null);
  const switcherTab = useRef(null);
  const registertab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassWord] = useState("");
  const [user,setuser]=useState({
    name:"",
    email:"",
    password:" "
  })

  const{name,email,password}=user;
  const[avatar,setavatar]=useState();
  console.log(setavatar)
  const[avatarPriew,setavatarPriew]=useState("/forntend/public/logo192.png")

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword))
  };

  const registersubmit = (e) =>
  {
    e.preventDefault();

    const myform=new FormData();
    myform.set("name",name)
    myform.set("email",email)
    myform.set("password",password)
    myform.set("avatar",avatar)
    dispatch(register(myform))
  }

  const registerDataChange = (e) =>
  {
    if(e.target.name==="avatar")
    {
      const reader= new FileReader();

      reader.onload = ()=>{
        if(reader.readyState===2)
        {
          setavatarPriew(reader.result);
          setavatar(reader.result)
        }
      };
      reader.readAsDataURL(e.target.files[0])
    }
    else{
      setuser({...user,[e.target.name]:e.target.value})
    }

  }

    const redirect=location.search ? location.search.split("=")[1] :"/account"

  useEffect(()=>{
    if(error){
      dispatch(clearError());
    }
    if(isAuthenticated){
    navigate(redirect)
    }
  },[dispatch,error,isAuthenticated,navigate,redirect])


  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registertab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft" );
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");
      registertab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <div>
      <div className="LoginSignUpConatiner">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signup_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LogIn</p>
              <p onClick={(e) => switchTabs(e, "register")}>Register</p>
            </div>
            <button ref={switcherTab}></button>
          </div>

          <form className="loginform" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <EmailIcon></EmailIcon>
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <PasswordIcon> </PasswordIcon>
              <input
                type="password"
                placeholder="Enter your Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassWord(e.target.value)}
              ></input>
            </div>

            <Link to="/forgetpassword">Forget Password?</Link>
            <input type="submit" value="Login" className="loginbtn" />
          </form>
        </div>
      </div>

      <form
        className="singupform"
        ref={registertab}
        encType="multipart/form-data"
        onSubmit={registersubmit}
      >
        <div className="singupname">
          <FaceIcon/>
           <input
            type="text"
            placeholder="name"
            required
            name="name"
            value={name}
            onChange={registerDataChange}
          ></input>
        </div>
        <div className="singupEmail">
          <EmailIcon></EmailIcon>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            name="email"
            onChange={registerDataChange}
          ></input>
        </div>
        <div className="singuppassword">
          <PasswordIcon></PasswordIcon>
          <input
            type="password"
            placeholder="passwoed"
            required
            value={password}
            onChange={registerDataChange}
          ></input>
        </div>
        <div id="registerImage">
          <AccountBoxIcon></AccountBoxIcon>
          <img src={user.avatar} alt={user.name} onError={(e) => e.target.src = '/default-avatar.jpg'} />
           <input
           type="file"
           name="avatar"
           accept="image/"
           onChange={registerDataChange}
           />
        </div>
        <input
        type="submit"
        value="Register"
        className="singupBtn"
        />
      </form>
    </div>
  );
}

export default LoginandRegister;
