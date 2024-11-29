import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Form.css";
import { isContentEditable } from "@testing-library/user-event/dist/utils";
const Form = () => {
  const [query, setQuery] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  let { movieId } = useParams();

  const handleSearch = useCallback(() => {
    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI",
      },
    }).then((response) => {
      setSearchedMovieList(response.data.results);
      console.log(response.data.results);
    });
  }, [query]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);

    if (selectedMovie === undefined) {
      alert("Please search and select a movie.");
    } else if (!accessToken) {
      alert("Access token is missing. Please log in.");
    } else {
      const requiredFields = [
        "original_title",
        "overview",
        "popularity",
        "release_date",
        "vote_average",
      ];

      for (const field of requiredFields) {
        if (
          !selectedMovie[field] ||
          selectedMovie[field].toString().trim() === ""
        ) {
          alert(`The field "${field.replace("_", " ")}" is required.`);
          return;
        }
      }

      const data = {
        tmdbId: selectedMovie.id,
        title: selectedMovie.original_title,
        overview: selectedMovie.overview,
        popularity: selectedMovie.popularity,
        releaseDate: selectedMovie.release_date,
        voteAverage: selectedMovie.vote_average,
        backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
        posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
        isFeatured: 0,
      };

      const request = axios({
        method: "post",
        url: "/movies",
        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((saveResponse) => {
          console.log(saveResponse);
          alert("Success");
        })
        .catch((error) => console.log(error));
    }
  };

  //create a form change/validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedMovie((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!selectedMovie) {
      alert("Please select a movie to update.");
      return;
    }

    if (!accessToken) {
      alert("Access token is missing. Please log in.");
      return;
    }

    // Validate required fields
    const requiredFields = [
      "original_title",
      "overview",
      "popularity",
      "release_date",
      "vote_average",
    ];

    for (const field of requiredFields) {
      if (
        !selectedMovie[field] ||
        selectedMovie[field].toString().trim() === ""
      ) {
        alert(`The field "${field.replace("_", " ")}" is required.`);
        return;
      }
    }

    // Prepare data for PUT request
    const data = {
      tmdbId: selectedMovie.id,
      title: selectedMovie.original_title,
      overview: selectedMovie.overview,
      popularity: selectedMovie.popularity,
      releaseDate: selectedMovie.release_date,
      voteAverage: selectedMovie.vote_average,
      backdropPath: selectedMovie.backdrop_path
        ? `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`
        : "",
      posterPath: selectedMovie.poster_path
        ? `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`
        : "",
    };

    console.log("Sending data to update:", data); // Debugging

    axios({
      method: "put",
      url: `/movies/${movieId}`,
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Update successful:", response.data);
        alert("Movie updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
        alert("Update failed. Please try again.");
      });
  };

  //create a new handler for update

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`).then((response) => {
        setMovie(response.data);
        const tempData = {
          id: response.data.tmdbId,
          original_title: response.data.title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: response.data.posterPath,
          release_date: response.data.releaseDate,
          vote_average: response.data.voteAverage,
        };
        setSelectedMovie(tempData);
        console.log(response.data);
      });
    }
  }, []);

  return (
    <>
      <h1>{movieId !== undefined ? "Edit " : "Create "} Movie</h1>

      {movieId === undefined && (
        <>
          <div className="search-container">
            Search Movie:{" "}
            <input
              type="text"
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="button" onClick={handleSearch}>
              Search
            </button>
            <div className="searched-movie">
              {searchedMovieList.map((movie) => (
                <p onClick={() => handleSelectMovie(movie)}>
                  {movie.original_title}
                </p>
              ))}
            </div>
          </div>
          <hr />
        </>
      )}

      <div className="container">
        <form>
          {selectedMovie ? (
            <img
              className="poster-image"
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
            />
          ) : (
            ""
          )}
          <div className="field">
            Title:
            <input
              type="text"
              name="original_title"
              value={selectedMovie?.original_title || ""}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            Overview:
            <textarea
              rows={10}
              name="overview"
              value={selectedMovie?.overview || " This content is not right"}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            Popularity:
            <input
              type="text"
              name="popularity"
              value={selectedMovie?.popularity || ""}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            Release Date:
            <input
              type="text"
              name="release_date"
              value={selectedMovie?.release_date || ""}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            Vote Average:
            <input
              type="text"
              name="vote_average"
              value={selectedMovie?.vote_average || ""}
              onChange={handleChange}
            />
          </div>

          <button type="button" onClick={movieId ? handleUpdate : handleSave}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
