import React, { useContext, useState, useEffect, useRef } from "react";
import ProfileNavProfileDesktop from "../Navs/ProfileNavProfileDesktop";
import { AuthContext } from "../Auth/AuthProvider";
import UserReleases from "./UserReleases";
import ActivityLog from "./ActivityLog";
import ProfileNav from "../Navs/ProfileNav";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [signupDate, setSignupDate] = useState("");
  const [width, setWidth] = useState(null);
  const ref = useRef();

  useEffect(() => {
    if (currentUser) {
      let signupDate = new Date(currentUser.metadata.creationTime);

      let formatedDate = signupDate
        .toDateString()
        .split(" ")
        .slice(1)
        .join(" ");
      setSignupDate(formatedDate);
      setWidth(ref.current.offsetWidth);
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="profile-container">
        <h3 className="not-logged">
          Please, <a href="/login">login</a>.
        </h3>
      </div>
    );
  }

  return (
    <div className="profile-container marg-t-xxl " ref={ref}>
      <div className="profile-cover desktop">
        <img
          className="desktop user-photo"
          src={currentUser.photoURL}
          alt="..."
        ></img>
      </div>
      {width > 1024 ? (
        <ProfileNavProfileDesktop className="desktop" />
      ) : (
        <ProfileNav className="mobile" />
      )}

      <div className="profile-wrapper">
        <div>
          <div className="user-info">
            <img
              className="user-info__img mobile"
              src={currentUser.photoURL}
              alt="..."
            ></img>
            <div>
              <p className="user-info__name marg-zero">
                {currentUser.displayName}
              </p>
              <p className="user-info__date">Joined {signupDate}</p>
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
