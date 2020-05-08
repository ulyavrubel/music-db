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
        <div className="grid-album marg-b-s" key={album.id}>
          <Link
            className="grid-album__link grid-album__link--recentlyAdded"
            to={`/albums/${album.id}`}
          >
            <img
              className="grid-album__img"
              src={album.url}
              alt={`${album.artist} - ${album.title} `}
            ></img>
          </Link>
          <p className="grid-album__paragraph">
            <Link
              className="grid-album__link grid-album__link--recentlyAdded"
              to={`/search/${album.artist}/artist`}
            >
              {album.artist}
            </Link>
            <br />
            <Link
              className="grid-album__link grid-album__link--recentlyAdded"
              to={`/albums/${album.id}`}
            >
              {album.title}
            </Link>
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
    <div className="recentlyAdded">
      <div className="grid-wrapper">
        <h3 className="recentlyAdded__header"> Recently added albums</h3>
        <div className="marg-t-s marg-b-zero grid-container grid-container--recentlyAdded">
          {albumItems}
        </div>
        {showMore ? (
          <div className="showmore" onClick={handleClick}>
            <p className="showmore__paragraph">Show more new albums</p>
            <img className="showmore__img" src={down} alt=".."></img>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default RecentlyAddedGrid;
