import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import down from "../../img/down.svg";

function RecentlyAddedGrid(props) {
  const [itemsShow, setItemsShow] = useState(10);
  const [albumItems, setAlbumItems] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    let albumsToShow = props.albums.slice(0, itemsShow).map((album) => {
      return (
        <div className="collection grid album" key={album.id}>
          <Link to={`/albums/${album.id}`}>
            <img
              src={album.url}
              alt={`${album.artist} - ${album.title} `}
            ></img>
          </Link>
          <p>
            <Link to={`/search/${album.artist}/artist`}>{album.artist}</Link>
            <br />
            <Link to={`/albums/${album.id}`}>{album.title}</Link>
          </p>
        </div>
      );
    });

    setAlbumItems(albumsToShow);
  }, [props, itemsShow]);

  const handleClick = () => {
    if (props.albums.length > itemsShow + 10) {
      setItemsShow((prev) => prev + 10);
    } else {
      setItemsShow(props.albums.length);
      setShowMore(false);
    }
  };

  return (
    <div className="recentlyAdded container">
      <div className="collection grid wrapper">
        <h3> Recently added albums</h3>
        <div className="collection grid container recentlyAdded">
          {albumItems}
        </div>
        {showMore ? (
          <div className="showmore" onClick={handleClick}>
            <p>Show more new albums</p>
            <img src={down} alt=".."></img>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default RecentlyAddedGrid;
