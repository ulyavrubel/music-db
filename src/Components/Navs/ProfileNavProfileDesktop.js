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
            color: isCurrent ? "rgba(229, 229, 229, 1)" : "rgba(255,255,255)",
          },
        };
      }}
    />
  );
}

function ProfileNavProfileDesktop() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <h3 className="not-logged">Please, login to your profile</h3>;
  }

  return (
    <div className="navbar-profile-desktop desktop">
      <NavLink
        to={`/collection/${currentUser.displayName}`}
        className="navbar-profile__link"
      >
        Collection
      </NavLink>
      <NavLink
        to={`/wishlist/${currentUser.displayName}`}
        className="navbar-profile__link"
      >
        Wishlist
      </NavLink>
      <NavLink to="/upload" className="navbar-profile__link">
        Upload
      </NavLink>
      <NavLink
        to={`/profile/${currentUser.displayName}`}
        className="navbar-profile__link"
      >
        Profile
      </NavLink>
    </div>
  );
}

export default ProfileNavProfileDesktop;
