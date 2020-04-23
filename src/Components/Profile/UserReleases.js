import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

function UserReleases() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="user-releases">
      <p className="user-releases header">Releases</p>
      <div className="releases-statistics">
        <a href={`/collection/${currentUser.displayName}`}>In Collection</a>
        <a href={`/wishlist/${currentUser.displayName}`}>In Wishlist</a>
        <a href={`/uploaded/${currentUser.displayName}`}>Uploaded</a>
      </div>
    </div>
  );
}

export default UserReleases;
