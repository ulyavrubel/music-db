import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Link } from "@reach/router";

export function NavLink(props) {
  return (
    <Link
      {...props}
      getProps={({ isCurrent }) => {
        return {
          style: {
            color: isCurrent ? "rgba(120, 120, 120, 1)" : "rgba(31, 31, 31, 1)",
          },
        };
      }}
    />
  );
}

function ProfileNav() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <h3>Please, login to your profile</h3>;
  }

  return (
    <div className="profile nav">
      <NavLink
        to={`/collection/${currentUser.displayName}`}
        className="profile nav link"
      >
        Collection
      </NavLink>
      <NavLink
        to={`/wishlist/${currentUser.displayName}`}
        className="profile nav link"
      >
        Wishlist
      </NavLink>
      <NavLink to="/upload" className="profile nav link">
        Upload
      </NavLink>
      <NavLink
        to={`/profile/${currentUser.displayName}`}
        className="profile nav link"
      >
        Profile
      </NavLink>
    </div>
  );
}

export default ProfileNav;
