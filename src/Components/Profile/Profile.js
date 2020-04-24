import React, { useContext, useState, useEffect } from "react";
import "./profile.css";
import ProfileNav from "../ProfileNav";
import { firebaseDB } from "../Auth/FirebaseInit";
import { AuthContext } from "../Auth/AuthProvider";
import UserReleases from "./UserReleases";
import ActivityLog from "./ActivityLog";

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
      <ProfileNav />
      <div className="user info">
        <img src={currentUser.photoURL}></img>
        <div>
          <p className="user info name">{currentUser.displayName}</p>
          <p className="user info date">Joined {signupDate}</p>
        </div>
      </div>
      <UserReleases />
      <ActivityLog />
    </div>
  );
}

export default Profile;
