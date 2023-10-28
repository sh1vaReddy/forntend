import React, { Fragment } from "react";
import EmailIcon from "@mui/icons-material/Email";
import { useState,  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loaduser, updateprofile } from "../../../Action/Useraction";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FaceIcon from "@mui/icons-material/Face";
import { useNavigate } from "react-router-dom";
import './Updateprofile.css';

const Updateprofile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const{loading,isUpdate,error}=useSelector((state)=>state.profile )
  const [avatar, setavatar] = useState();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [avatarPriew, setavatarPriew] = useState(
    "/forntend/public/logo192.png"
  );


  const updateProfilesubmit = (e) => {
    e.preventDefault();

    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);
    myform.set("avatar", avatar);
    dispatch(updateprofile(myform));
  };

  const updateProfileDataChange = (e) => {
    
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarPriew(reader.result);
          setavatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
       
  };
  useEffect(() => {
    if(user)
    {
        setname(user.name)
        setemail(user.email)
        setavatar(user.avatar)
    }
    if (error) {
      dispatch(clearError());
    }
    if (isUpdate) {
        dispatch(loaduser())
      navigate("/account");
    }
  }, [dispatch, error, isUpdate, user,navigate]);

  return <Fragment>
    <div className="updateProfileContainer">
        <div className="updateProfileBox">
        <h2 className="updateProfileHeading ">Update Profile</h2>
        <form
        className="updateProfileForm"
        encType="multipart/form-data"
        onSubmit={updateProfilesubmit}
      >
        <div className="singupname">
          <FaceIcon/>
           <input
            type="text"
            placeholder="name"
            required
            name="name"
            value={name}
            onChange={(e)=>setname(e.target.value)}
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
            onChange={(e)=>setemail(e.target.value)}
          ></input>
        </div>
        <div id="updateProfileImage">
          <AccountBoxIcon></AccountBoxIcon>
          <img src={avatarPriew} alt="Avatra"></img>
           <input
           type="file"
           name="avatar"
           accept="image/"
           onChange={updateProfileDataChange}
           />
        </div>
        <input
        type="submit"
        value="UpdatedateProfile"
        className="updateProfileBtn"
        />
      </form>
        </div>
        </div>
  </Fragment>;
};

export default Updateprofile;
