import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import down from "../../img/down.svg";

function RecentlyAddedGrid(props) {
  const [itemsShow, setItemsShow] = useState(4);
  const [albumsToShow, setAlbumsToShow] = useState([]);

  //   useEffect(() => {
  //     // let albums = props.albums;
  //     // let cutAlbums = albums.slice(0, itemsShow);
  //     // console.log(cutAlbums);
  //     setAlbumsToShow(props.albums);

  //     setCollection((prev) => {
  //         return [...prev, album];
  //       });
  //   }, []);

  //   const handleClick = () => {
  //     if (props.albums.length > itemsShow + 4) {
  //       setItemsShow((prev) => prev + 4);
  //     }
  //   };

  const albumItems = props.albums.map((album) => {
    return (
      <div className="collection grid album" key={album.id}>
        <Link to={`/albums/${album.id}`}>
          <img src={album.url} alt={`${album.artist} - ${album.title} `}></img>
        </Link>
        <p>
          <Link to={`/artists/${album.artist}`}>{album.artist}</Link>
          <br />
          <Link to={`/albums/${album.id}`}>{album.title}</Link>
        </p>
      </div>
    );
  });

  return (
    <div className="recentlyAdded container">
      <h3> Recently added albums</h3>
      <div className="collection grid wrapper">
        <div className="collection grid container recentlyAdded">
          {albumItems}
        </div>
        <div>
          <img src={down} alt=".."></img>
        </div>
      </div>
    </div>
  );
}

export default RecentlyAddedGrid;
