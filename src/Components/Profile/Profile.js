import React, { useContext, useState, useEffect } from "react";
import "./profile.css";
import ProfileNavProfileDesktop from "../ProfileNavProfileDesktop";
import { AuthContext } from "../Auth/AuthProvider";
import UserReleases from "./UserReleases";
import ActivityLog from "./ActivityLog";
import ProfileNav from "../ProfileNav";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [signupDate, setSignupDate] = useState("");

  useEffect(() => {
    if (currentUser) {
      let signupDate = new Date(currentUser.metadata.creationTime);

      let formatedDate = signupDate
        .toDateString()
        .split(" ")
        .slice(1)
        .join(" ");
      setSignupDate(formatedDate);
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="profile container">
        <h3>
          Please, <a href="/login">login</a>.
        </h3>
      </div>
    );
  }

  return (
    <div className="profile container">
      <div className="profile-cover desktop">
        <img className="desktop user-photo" src={currentUser.photoURL}></img>
      </div>
      <ProfileNav className="mobile" />
      <ProfileNavProfileDesktop className="desktop" />
      <div className="profile-wrapper">
        <div>
          <div className="user info">
            <img className="mobile" src={currentUser.photoURL}></img>
            <div>
              <p className="user info name">{currentUser.displayName}</p>
              <p className="user info date">Joined {signupDate}</p>
            </div>
          </div>
          <UserReleases />
        </div>
        <ActivityLog />
      </div>
    </div>
  );
}

export default Profile;
