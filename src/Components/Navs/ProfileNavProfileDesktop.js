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
    return <h3>Please, login to your profile</h3>;
  }

  return (
    <div className="profile nav profile-page-desktop desktop">
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

export default ProfileNavProfileDesktop;
