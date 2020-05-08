import React, { useContext, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import { AuthContext } from "../Auth/AuthProvider";
import ProfileNav from "../Navs/ProfileNav";
import { Countries } from "../Helpers/Countries";
import { storage } from "../Auth/FirebaseInit";
import Preview from "./Preview";

function Upload() {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  if (!currentUser) {
    return (
      <h3 className="not-logged">
        Please, <a href="/login">login</a> to upload an album
      </h3>
    );
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
        HipHop: false,
        Latin: false,
        NonMusic: false,
        Pop: false,
        Jazz: false,
        Funk: false,
        Classical: false,
        Reggae: false,
      },
      addCollection: false,
      img: null,
      url: null,
      showPreview: false,
      error: "err message",
    };
    this.formRef = React.createRef();
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
    if (img) {
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
    }
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
      genre = {
        Electronic: false,
        Rock: false,
        Blues: false,
        Folk: false,
        HipHop: false,
        Latin: false,
        NonMusic: false,
        Pop: false,
        Jazz: false,
        Funk: false,
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
    let values = Object.values(this.state);
    if (values.some((item) => item === "" || item === null)) {
      this.setState({
        error: "Please fill all fields and try again.",
      });
      scroll.scrollToBottom();
    } else {
      this.setState({
        error: "err message",
      });
      this.setState({ showPreview: true });
      scroll.scrollMore(355);
    }
  };

  render() {
    const genres = [
      "Electronic",
      "Rock",
      "Blues",
      "Folk",
      "HipHop",
      "Latin",
      "NonMusic",
      "Pop",
      "Jazz",
      "Funk",
      "Classical",
      "Reggae",
    ];

    const genresCheckBoxes = genres.map((genre) => {
      return (
        <div className="genre-div " key={genre}>
          <input
            className="genre-div__checkbox"
            type="checkbox"
            id={genre}
            name={genre}
            value={genre}
            onChange={this.handleGenreCheck}
            checked={this.state.genre[genre]}
            required
          ></input>
          <label className="genre-div__label marg-zero" htmlFor={genre}>
            {" "}
            {genre}
          </label>
        </div>
      );
    });

    return (
      <div>
        <h3 className="upload-header">Add release</h3>
        <div className="upload-container">
          <form className="file-form marg-b-m">
            <div className="file-form__container">
              <label className="file-form__label marg-b-xxs">
                Upload image
              </label>
              <input
                className="file-form__input marg-zero"
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={this.handleChangeFile}
              ></input>
              <button
                className="btn btn-submit-file"
                onClick={this.handleUploadFile}
              >
                Upload
              </button>
              {this.state.url ? (
                <p className="file-form__paragraph">
                  {this.state.img.name} was uploaded
                </p>
              ) : null}
            </div>
          </form>
          <form className="album-form" ref={this.formRef}>
            <div className="album-form__container marg-b-s">
              <label className="album-form__label marg-b-xxs">Artist</label>
              <br />
              <input
                className="album-form__input marg-t-xxs "
                type="text"
                name="artist"
                id="artist"
                placeholder="Name"
                required
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="album-form__container marg-b-s">
              <label className="album-form__label marg-b-xxs">Album</label>
              <br />
              <input
                className="album-form__input marg-t-xxs "
                type="text"
                name="title"
                id="title"
                placeholder="Album title"
                required
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="album-form__container marg-b-s">
              <label className="album-form__label marg-b-xxs">Label</label>
              <br />
              <input
                className="album-form__input marg-t-xxs "
                type="text"
                name="label"
                id="label"
                placeholder="Label title"
                required
                onChange={this.handleChange}
              ></input>
            </div>
            <div className="album-form__container album-form__container--format marg-b-s">
              <label className="album-form__label marg-b-xxs">Format</label>
              <br />
              <select
                className="album-form__select marg-t-xs"
                id="format"
                onChange={this.handleChange}
                required
              >
                <option value="">Select</option>
                <option value="Vinyl">Vinyl</option>
                <option value="CD">CD</option>
                <option value="DVD">DVD</option>
                <option value="Cassette">Cassette</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="album-form__container album-form__container--year marg-b-s">
              <label className="album-form__label marg-b-xxs">Released</label>
              <br />
              <input
                className="album-form__input album-form__input--year marg-t-xxs "
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
            <div className="album-form__container album-form__container--contries marg-b-s">
              <label className="album-form__label marg-b-xxs">Country</label>
              <br />
              <Countries onChange={this.handleChange} />
            </div>
            <div className="album-form__container album-form__container--genres marg-b-s">
              <label className="album-form__label marg-b-xxs">Genres</label>
              <br />
              <div className="album-form__genres-grid marg-t-xs marg-b-zero ">
                {genresCheckBoxes}
              </div>
            </div>
            <div className="album-form__container album-form__container--myCollection marg-b-s">
              <label className="album-form__label marg-b-xxs">Collection</label>
              <br />
              <div className="myCollection">
                <input
                  className="genre-div__checkbox"
                  type="checkbox"
                  id="addCollection"
                  name="addCollection"
                  value="addCollection"
                  checked={this.state.genre.addCollection}
                  onChange={this.handleCollectionCheck}
                ></input>
                <label
                  className="myCollection__label marg-t-xs marg-b-xxs"
                  htmlFor="addCollection"
                >
                  {" "}
                  Add to my collection
                </label>
              </div>
            </div>
            <button
              className="btn btn-black btn-black--upload"
              onClick={this.handlePreview}
            >
              Preview/Submit
            </button>
          </form>
        </div>
        {this.state.error !== "err message" ? (
          <p className="upload-error marg-t-zero marg-b-l">
            {this.state.error}
          </p>
        ) : null}
        {this.state.showPreview ? <Preview release={this.state} /> : null}
      </div>
    );
  }
}

export default Upload;
