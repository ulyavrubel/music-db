import React, { useContext } from "react";
import { AuthContext } from "./Auth/AuthProvider";
import ProfileNav from "./ProfileNav";
import { Countries } from "./Helpers/Countries";

function Upload() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <h3>Please, login to upload an album</h3>;
  }
  return (
    <div>
      <ProfileNav />
      <h3 className="upload header">Add release</h3>
      <UploadForm user={currentUser} />
    </div>
  );
}

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      artist: "",
      label: "",
      format: "",
      realised: "",
      country: "",
      genre: "",
      addCollection: "",
    };
  }

  componentDidMount() {
    this.setState({ currentUser: this.props.user });
  }

  render() {
    return (
      <div className="upload container">
        {/* <form className="upload form file">
          <label>Upload image</label>
          <input type="file" id="img" name="img" accept="image/*"></input>
          <input type="submit"></input>
        </form> */}
        <form className="upload form album">
          <div className="album container">
            <label>Artist</label>
            <input
              className="album input"
              type="text"
              name="artist"
              id="artist"
              placeholder="Name"
              required
            ></input>
          </div>
          <div className="album container">
            <label>Label</label>
            <input
              className="album input"
              type="text"
              name="label"
              id="label"
              placeholder="Title"
              required
            ></input>
          </div>
          <div className="album container format">
            <label>Format</label>
            <select id="format" required>
              <option value="vinyl">Vinyl</option>
              <option value="cd">CD</option>
              <option value="dvd">DVD</option>
              <option value="cassette">Cassette</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="album container">
            <label>Released</label>
            <input
              className="album input year"
              type="number"
              name="year"
              id="year"
              placeholder="YYYY"
              required
            ></input>
          </div>
          <div className="album container contries">
            <label>Countries</label>
            <Countries />
          </div>

          <div className="album container genres">
            <label>Genres</label>
            <input
              className="input genres checkbox"
              type="checkbox"
              id="electronic"
              name="electronic"
              value="Electronic"
            ></input>
            <label for="electronic"> Electronic</label>
            <input
              className="input genres checkbox"
              type="checkbox"
              id="hiphop"
              name="hiphop"
              value="Hip Hop"
            ></input>
            <label for="hiphop"> Hip Hop</label>
            <input
              className="input genres checkbox"
              type="checkbox"
              id="jazz"
              name="jazz"
              value="Jazz"
            ></input>
            <label for="jazz"> Jazz</label>
            <input
              className="input genres checkbox"
              type="checkbox"
              id="rock"
              name="rock"
              value="Rock"
            ></input>
            <label for="rock"> Rock</label>
            <input
              className="input genres checkbox"
              type="checkbox"
              id="latin"
              name="latin"
              value="Latin"
            ></input>
            <label for="latin"> Latin</label>
            <input
              className="input genres checkbox"
              type="checkbox"
              id="funckSoul"
              name="funckSoul"
              value="Funck / Soul"
            ></input>
            <label for="funckSoul"> Funck / Soul</label>
            <input
              className="input genres checkbox"
              type="checkbox"
              id="blues"
              name="blues"
              value="Blues"
            ></input>
            <label for="blues"> Blues</label>
            <input
              className="input genres checkbox"
              type="checkbox"
              id="nonMusic"
              name="nonMusic"
              value="Non-Music"
            ></input>
            <label for="nonMusic"> Non-Music</label>
            <input
              className="input genres checkbox"
              type="checkbox"
              id="classical"
              name="classical"
              value="Classical"
            ></input>
            <label for="classical"> classical</label>
            <input
              className="input genres checkbox"
              type="checkbox"
              id="folkCountry"
              name="folkCountry"
              value="Folk / Country"
            ></input>
            <label for="folkCountry"> Folk / Country</label>
            <input type="checkbox" id="pop" name="pop" value="Pop"></input>
            <label for="pop"> Pop</label>
            <input
              className="input genres checkbox"
              type="checkbox"
              id="reggae"
              name="reggae"
              value="Reggae"
            ></input>
            <label for="reggae"> Reggae</label>
          </div>
          <div className="album container">
            <label>Collection</label>
            <input
              type="checkbox"
              id="addCollection"
              name="addCollection"
              value="addCollection"
            ></input>
            <label for="addCollection"> Add to my collection</label>
          </div>
          <button>Preview/Submit</button>
        </form>
      </div>
    );
  }
}

export default Upload;
