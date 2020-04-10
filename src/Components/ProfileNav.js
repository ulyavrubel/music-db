import React, { useContext } from "react";
import { AuthContext } from "./Auth/AuthProvider";
import { Link } from "@reach/router";

function ProfileNav() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <h3>Please, login to your profile</h3>;
  }

  return (
    <div className="profile nav">
      <Link
        to={`/collection/${currentUser.displayName}`}
        className="profile nav link"
      >
        Collection
      </Link>
      <Link
        to={`/wishlist/${currentUser.displayName}`}
        className="profile nav link"
      >
        Wishlist
      </Link>
      <Link to={`/upload`} className="profile nav link">
        Upload
      </Link>
      <Link
        to={`/profile/${currentUser.displayName}`}
        className="profile nav link"
      >
        Profile
      </Link>
    </div>
  );
}

export default ProfileNav;
