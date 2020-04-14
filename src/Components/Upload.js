import React, { useContext } from "react";
import { AuthContext } from "./Auth/AuthProvider";
import ProfileNav from "./ProfileNav";
import { Countries } from "./Helpers/Countries";
import { storage } from "./Auth/FirebaseInit";
import Preview from "./Preview";

function Upload() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <h3>Please, login to upload an album</h3>;
  }
  return (
    <div>
      <ProfileNav />

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
      title: "",
      label: "",
      format: "",
      released: "",
      country: "",
      genre: {
        Electronic: false,
        Rock: false,
        Blues: false,
        Folk: false,
        Hiphop: false,
        Latin: false,
        NonMusic: false,
        Pop: false,
        Jazz: false,
        Funck: false,
        Classical: false,
        Reggae: false,
      },
      addCollection: false,
      img: null,
      url: null,
      showPreview: false,
    };
  }

  componentDidMount() {
    this.setState({ currentUser: this.props.user });
  }

  handleChangeFile = (event) => {
    event.preventDefault();
    if (event.target.files[0]) {
      const img = event.target.files[0];
      this.setState(() => ({ img }));
    }
  };

  handleUploadFile = (event) => {
    event.preventDefault();
    const { img } = this.state;
    const uploadTask = storage.ref(`images/${img.name}`).put(img);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
      },
      (error) => {
        console.log(error);
      },
      () => {
        //complete function
        storage
          .ref("images")
          .child(img.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.setState({ url: url });
          });
      }
    );
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleGenreCheck = (event) => {
    //https://stackoverflow.com/questions/43040721/how-to-update-nested-state-properties-in-react
    var genre = { ...this.state.genre };
    let values = Object.values(this.state.genre);
    if (values.every((val) => val === false)) {
      genre[event.target.id] = true;
      this.setState({
        genre,
      });
    } else {
      console.log(genre);
      genre = {
        Electronic: false,
        Rock: false,
        Blues: false,
        Folk: false,
        Hiphop: false,
        Latin: false,
        NonMusic: false,
        Pop: false,
        Jazz: false,
        Funck: false,
        Classical: false,
        Reggae: false,
      };
      this.setState({ genre });
      genre[event.target.id] = true;
      this.setState({
        genre,
      });
    }
  };

  handleCollectionCheck = (event) => {
    let value = event.target.checked ? true : false;
    this.setState({
      addCollection: value,
    });
  };

  handlePreview = (event) => {
    event.preventDefault();
    this.setState({ showPreview: true });
  };

  render() {
    return (
      <div>
        <h3 className="upload header">Add release</h3>
        <div className="upload container">
          <form className="upload form file">
            <div className="album container file">
              <label className="file label">Upload image</label>
              <input
                className="album container file input"
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={this.handleChangeFile}
              ></input>
              <button
                className="auth submit file"
                onClick={this.handleUploadFile}
              >
                Upload
              </button>
              {this.state.url ? (
                <p className="file input p">
                  {this.state.img.name} was uploaded
                </p>
              ) : null}
            </div>
          </form>
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
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="album container">
              <label>Album</label>
              <input
                className="album input"
                type="text"
                name="title"
                id="title"
                placeholder="Album title"
                required
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="album container">
              <label>Label</label>
              <input
                className="album input"
                type="text"
                name="label"
                id="label"
                placeholder="Label title"
                required
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="album container format">
              <label>Format</label>
              <br />
              <select id="format" onChange={this.handleChange} required>
                <option value="">Select</option>
                <option value="Vinyl">Vinyl</option>
                <option value="CD">CD</option>
                <option value="DVD">DVD</option>
                <option value="Cassette">Cassette</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="album container year">
              <label>Released</label>
              <br />
              <input
                className="album input year"
                type="number"
                name="year"
                id="released"
                placeholder="YYYY"
                min="1900"
                max="2020"
                step="1"
                required
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="album container contries">
              <label>Country</label>
              <Countries onChange={this.handleChange} />
            </div>

            <div className="album container genres">
              <label>Genres</label>
              <div className="album container genres grid">
                <div>
                  <input
                    className="input genres checkbox"
                    type="checkbox"
                    id="Electronic"
                    name="electronic"
                    value="Electronic"
                    onChange={this.handleGenreCheck}
                    checked={this.state.genre.Electronic}
                  ></input>
                  <label htmlFor="electronic"> Electronic</label>
                </div>
                <div>
                  <input
                    className="input genres checkbox"
                    type="checkbox"
                    id="Hiphop"
                    name="hiphop"
                    value="Hip Hop"
                    onChange={this.handleGenreCheck}
                    checked={this.state.genre.Hiphop}
                  ></input>
                  <label htmlFor="hiphop"> Hip Hop</label>
                </div>
                <div>
                  <input
                    className="input genres checkbox"
                    type="checkbox"
                    id="Jazz"
                    name="jazz"
                    value="Jazz"
                    onChange={this.handleGenreCheck}
                    checked={this.state.genre.Jazz}
                  ></input>
                  <label htmlFor="jazz"> Jazz</label>
                </div>
                <div>
                  <input
                    className="input genres checkbox"
                    type="checkbox"
                    id="Rock"
                    name="rock"
                    value="Rock"
                    onChange={this.handleGenreCheck}
                    checked={this.state.genre.Rock}
                  ></input>
                  <label htmlFor="rock"> Rock</label>
                </div>
                <div>
                  <input
                    className="input genres checkbox"
                    type="checkbox"
                    id="Latin"
                    name="latin"
                    value="Latin"
                    onChange={this.handleGenreCheck}
                    checked={this.state.genre.Latin}
                  ></input>
                  <label htmlFor="latin"> Latin</label>
                </div>
                <div>
                  <input
                    className="input genres checkbox"
                    type="checkbox"
                    id="Funck"
                    name="funckSoul"
                    value="Funck / Soul"
                    onChange={this.handleGenreCheck}
                    checked={this.state.genre.Funck}
                  ></input>
                  <label htmlFor="funckSoul"> Funck / Soul</label>
                </div>
                <div>
                  <input
                    className="input genres checkbox"
                    type="checkbox"
                    id="Blues"
                    name="blues"
                    value="Blues"
                    onChange={this.handleGenreCheck}
                    checked={this.state.genre.Blues}
                  ></input>
                  <label htmlFor="blues"> Blues</label>
                </div>
                <div>
                  <input
                    className="input genres checkbox"
                    type="checkbox"
                    id="NonMusic"
                    name="nonMusic"
                    value="Non-Music"
                    onChange={this.handleGenreCheck}
                    checked={this.state.genre.NonMusic}
                  ></input>
                  <label htmlFor="nonMusic"> Non-Music</label>
                </div>
                <div>
                  <input
                    className="input genres checkbox"
                    type="checkbox"
                    id="Classical"
                    name="classical"
                    value="Classical"
                    onChange={this.handleGenreCheck}
                    checked={this.state.genre.Classical}
                  ></input>
                  <label htmlFor="classical"> Classical</label>
                </div>
                <div>
                  <input
                    className="input genres checkbox"
                    type="checkbox"
                    id="Folk"
                    name="folkCountry"
                    value="Folk / Country"
                    onChange={this.handleGenreCheck}
                    checked={this.state.genre.Folk}
                  ></input>
                  <label htmlFor="folkCountry"> Folk / Country</label>
                </div>
                <div>
                  <input
                    className="input genres checkbox"
                    type="checkbox"
                    id="Pop"
                    name="pop"
                    value="Pop"
                    onChange={this.handleGenreCheck}
                    checked={this.state.genre.Pop}
                  ></input>
                  <label htmlFor="pop"> Pop</label>
                </div>
                <div>
                  <input
                    className="input genres checkbox"
                    type="checkbox"
                    id="Reggae"
                    name="reggae"
                    value="Reggae"
                    onChange={this.handleGenreCheck}
                    checked={this.state.genre.Reggae}
                  ></input>
                  <label htmlFor="reggae"> Reggae</label>
                </div>
              </div>
            </div>
            <div className="album container myCollection">
              <label>Collection</label>
              <br />
              <div>
                <input
                  className="input genres checkbox"
                  type="checkbox"
                  id="addCollection"
                  name="addCollection"
                  value="addCollection"
                  checked={this.state.genre.addCollection}
                  onChange={this.handleCollectionCheck}
                ></input>
                <label htmlFor="addCollection"> Add to my collection</label>
              </div>
            </div>
            <button className="auth submit upload" onClick={this.handlePreview}>
              Preview/Submit
            </button>
          </form>
        </div>
        {this.state.showPreview ? <Preview release={this.state} /> : null}
      </div>
    );
  }
}

export default Upload;
