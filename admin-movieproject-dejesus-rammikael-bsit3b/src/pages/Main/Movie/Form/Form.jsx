import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Form.css";

const Form = () => {
  const [query, setQuery] = useState("");
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    popularity: "",
    releaseDate: "",
    voteAverage: "",
    isFeatured: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [castAndCrew, setCastAndCrew] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  let { movieId } = useParams();
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    setError("");
    if (!query) {
      setError("Please enter a search term");
      return;
    }

    setIsLoading(true);
    setSearchedMovieList([]);

    axios({
      method: "get",
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`,
      headers: {
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2Q4YTQwMGVlMzFkMzQ4MGYzNjdlMjk2OGMzODhhZSIsIm5iZiI6MTczMzE1MTAyNS4yNTQwMDAyLCJzdWIiOiI2NzRkYzkzMTc0NzM3NzhiYmQ5YWY3YzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4wKA26LOjYKY3fGsk-zmp0YOvGr7YPfi_IWUf6W7MSE",
      },
    })
      .then((response) => {
        if (response.data.results.length === 0) {
          setError("No movies found!");
        } else {
          setSearchedMovieList(response.data.results);
          setTotalPages(response.data.total_pages);
        }
      })
      .catch(() => {
        setError("Search movie error!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, currentPage]);

  useEffect(() => {
    if (currentPage > 1) {
      handleSearch();
    }
  }, [currentPage, handleSearch]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
      isFeatured: false,
    });
    setError("");

    fetchMovieDetails(movie.id);
  };

  const fetchMovieDetails = (movieId) => {
    setIsLoading(true);

    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2Q4YTQwMGVlMzFkMzQ4MGYzNjdlMjk2OGMzODhhZSIsIm5iZiI6MTczMzE1MTAyNS4yNTQwMDAyLCJzdWIiOiI2NzRkYzkzMTc0NzM3NzhiYmQ5YWY3YzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4wKA26LOjYKY3fGsk-zmp0YOvGr7YPfi_IWUf6W7MSE",
        },
      })
      .then((response) => setCastAndCrew(response.data.cast))
      .catch((error) => console.error("Error fetching cast and crew", error));

    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/images`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2Q4YTQwMGVlMzFkMzQ4MGYzNjdlMjk2OGMzODhhZSIsIm5iZiI6MTczMzE1MTAyNS4yNTQwMDAyLCJzdWIiOiI2NzRkYzkzMTc0NzM3NzhiYmQ5YWY3YzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4wKA26LOjYKY3fGsk-zmp0YOvGr7YPfi_IWUf6W7MSE",
        },
      })
      .then((response) => setPhotos(response.data.backdrops))
      .catch((error) => console.error("Error fetching photos", error));

    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2Q4YTQwMGVlMzFkMzQ4MGYzNjdlMjk2OGMzODhhZSIsIm5iZiI6MTczMzE1MTAyNS4yNTQwMDAyLCJzdWIiOiI2NzRkYzkzMTc0NzM3NzhiYmQ5YWY3YzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4wKA26LOjYKY3fGsk-zmp0YOvGr7YPfi_IWUf6W7MSE",
        },
      })
      .then((response) => setVideos(response.data.results))
      .catch((error) => console.error("Error fetching videos", error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (movieId) {
      setIsLoading(true);
      setError("");

      axios
        .get(`/movies/${movieId}`)
        .then((response) => {
          setMovie(response.data);
          const tempData = {
            id: response.data.tmdbId,
            original_title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            poster_path: response.data.posterPath.replace(
              "https://image.tmdb.org/t/p/original/",
              ""
            ),
            release_date: response.data.releaseDate,
            vote_average: response.data.voteAverage,
          };
          setSelectedMovie(tempData);
          setFormData({
            title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            releaseDate: response.data.releaseDate,
            voteAverage: response.data.voteAverage,
            isFeatured: response.data.isFeatured || false,
          });
          fetchMovieDetails(response.data.tmdbId);
        })
        .catch(() => {
          setError("Unable to load movie details. Please try again later.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [movieId]);

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCastChange = (index, field, value) => {
    const updatedCast = [...castAndCrew];
    updatedCast[index][field] = value;
    setCastAndCrew(updatedCast);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCurrentPage(1);
      handleSearch();
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.title) errors.push("Title is required");
    if (!formData.overview) errors.push("Overview is required");
    if (!formData.releaseDate) errors.push("Release date is required");
    if (!formData.popularity) errors.push("Popularity is required");
    if (!formData.voteAverage) errors.push("Vote average is required");
    if (!selectedMovie)
      errors.push("Please select a movie from search results");
    return errors;
  };

  const handleSave = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    setIsLoading(true);
    setError("");

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("You must be logged in to perform this action");
      setIsLoading(false);
      return;
    }

    const userId = 1;

    const data = {
      userId: userId,
      tmdbId: selectedMovie.id,
      title: formData.title,
      overview: formData.overview,
      popularity: parseFloat(formData.popularity),
      releaseDate: formData.releaseDate,
      voteAverage: parseFloat(formData.voteAverage),
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: formData.isFeatured,
    };

    try {
      const response = await axios.post("/admin/movies", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const savedMovieId = response.data.id;
      console.log(`Movie with ID ${savedMovieId} has been successfully saved.`);

      await saveVideos(savedMovieId, videos);
      await saveCast(savedMovieId, castAndCrew);
      await savePhotos(savedMovieId, photos);

      navigate("/main/movie");
    } catch (error) {
      console.error(
        "Error saving movie:",
        error.response?.data || error.message
      );
      setError("Failed to save movie. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveVideos = async (movieId, videos) => {
    if (!videos || videos.length === 0) {
      console.log("No videos to save.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    const userId = 1;

    try {
      const videoPromises = videos.map((video) => {
        const videoData = {
          userId: userId,
          movieId: movieId,
          url: `https://www.youtube.com/embed/${video.key}`,
          name: video.name || "Video Title",
          site: "YouTube",
          videoKey: video.key,
          videoType: video.type || "Clip",
          official: 0,
        };

        return axios.post("/admin/videos", videoData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      });

      await Promise.all(videoPromises);
      console.log("Videos saved successfully");
    } catch (error) {
      console.error(
        "Error saving videos:",
        error.response?.data || error.message
      );
      setError("Failed to save videos. Please try again.");
    }
  };

  const saveCast = async (movieId, cast) => {
    if (!cast || cast.length === 0) {
      console.log("No cast to save.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    const userId = 1;

    try {
      const castPromises = cast.map((castMember) => {
        if (!castMember.profile_path) {
          throw new Error(`Photo URL is required for ${castMember.name}`);
        }

        const castData = {
          userId: userId,
          movieId: movieId,
          name: castMember.name,
          characterName: castMember.character,
          url: `https://image.tmdb.org/t/p/original${castMember.profile_path}`,
        };

        console.log("Saving cast data:", castData);

        return axios.post("/admin/casts", castData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      });

      await Promise.all(castPromises);
      console.log("Cast saved successfully");
    } catch (error) {
      console.error(
        "Error saving cast:",
        error.response?.data || error.message
      );
      setError(error.message || "Failed to save cast. Please try again.");
    }
  };

  const savePhotos = async (movieId, photos) => {
    if (!photos || photos.length === 0) {
      console.log("No photos to save.");
      return;
    }

    const accessToken = localStorage.getItem("accessToken");
    const userId = 1;
    try {
      const photoPromises = photos.map((photo) => {
        const photoData = {
          userId: userId,
          movieId: movieId,
          url: `https://image.tmdb.org/t/p/original${photo.file_path}`,
          description: photo.description || "",
        };

        return axios.post("/admin/photos", photoData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      });

      await Promise.all(photoPromises);
      console.log("Photos saved successfully");
    } catch (error) {
      console.error(
        "Error saving photos:",
        error.response?.data || error.message
      );
      setError("Failed to save photos. Please try again.");
    }
  };

  const handleUpdate = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    setIsLoading(true);
    setError("");

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setError("You must be logged in to perform this action");
      setIsLoading(false);
      return;
    }

    if (!selectedMovie || !selectedMovie.id) {
      setError("No movie selected for update.");
      setIsLoading(false);
      return;
    }

    const data = {
      id: movie.id,
      userId: movie.userId,
      tmdbId: selectedMovie.id,
      title: formData.title,
      overview: formData.overview,
      popularity: parseFloat(formData.popularity),
      releaseDate: formData.releaseDate,
      voteAverage: parseFloat(formData.voteAverage),
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: formData.isFeatured,
    };

    try {
      const response = await axios.patch(`/admin/movies/${movieId}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        console.log(
          `Movie with ID ${selectedMovie.id} has been successfully updated.`
        );
        navigate("/main/movie");
      } else {
        setError("Failed to update movie. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 405) {
        console.log("Ignoring 405 error: Method Not Allowed.");

        setError("The update method is not allowed. Please try again later.");
      } else {
        console.error(
          "Error updating movie:",
          error.response?.data || error.message
        );
        setError("Failed to update movie. Please try again.");
      }
    } finally {
      setIsLoading(false);
      navigate("/main/movie");
    }
  };
  return (
    <>
      <h1>{movieId !== undefined ? "Edit" : "Create"} Movie</h1>

      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading-message">Loading...</div>}

      {movieId === undefined && (
        <>
          <div className="search-container">
            Search Movie:{" "}
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setError("");
              }}
              onKeyPress={handleKeyPress}
              placeholder="Enter movie title..."
              disabled={isLoading}
            />
            <button
              className="search-button"
              type="button"
              onClick={() => {
                setCurrentPage(1);
                handleSearch();
              }}
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
            <div className="searched-movie">
              {searchedMovieList.map((movie) => (
                <p
                  key={movie.id}
                  onClick={() => handleSelectMovie(movie)}
                  className={selectedMovie?.id === movie.id ? "selected" : ""}
                >
                  {movie.original_title}
                </p>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1 || isLoading}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="pagination-button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages || isLoading}
                >
                  Next
                </button>
              </div>
            )}
          </div>
          <hr />
        </>
      )}

      <div className="container">
        <form onSubmit={(e) => e.preventDefault()}>
          {selectedMovie && (
            <div className="movie-details">
              <div className="panel">
                <img
                  className="poster-image"
                  src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
                  alt={formData.title}
                />
                <div className="featured-status">
                  {formData.isFeatured ? (
                    <span className="featured-label">Featured</span>
                  ) : (
                    <span className="not-featured-label">Not Featured</span>
                  )}
                </div>
              </div>
              <div className="form-fields">
                <div className="field">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="overview">Overview:</label>
                  <textarea
                    className="overview"
                    rows={10}
                    name="overview"
                    id="overview"
                    value={formData.overview}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="popularity">Popularity:</label>
                  <input
                    type="number"
                    name="popularity"
                    id="popularity"
                    value={formData.popularity}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    step="0.1"
                  />
                </div>
                <div className="field">
                  <label htmlFor="releaseDate">Release Date:</label>
                  <input
                    type="date"
                    name="releaseDate"
                    id="releaseDate"
                    value={formData.releaseDate}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="voteAverage">Vote Average:</label>
                  <input
                    type="number"
                    name="voteAverage"
                    id="voteAverage"
                    value={formData.voteAverage}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    step="0.1"
                  />
                </div>
                <div className="fieldm">
                  <label htmlFor="isFeatured" className="featured-label">
                    Featured
                  </label>
                  <input
                    type="checkbox"
                    name="isFeatured"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="featured-checkbox"
                  />
                  <span className="featured-description">
                    Check this box if you want this movie to be featured on the
                    homepage.
                  </span>
                </div>
                <h2>Videos</h2>
                <div className="videos">
                  {videos.length > 0 ? (
                    videos.map((video) => (
                      <div key={video.id} className="video-item">
                        <h3>{video.name}</h3>
                        <iframe
                          src={`https://www.youtube.com/embed/${video.key}`}
                          title={video.name}
                          frameBorder="0"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ))
                  ) : (
                    <p>No videos available.</p>
                  )}
                </div>
                <outlet />
                {photos.length > 0 && (
                  <div className="photo-gallery">
                    <h2>Photo Gallery</h2>
                    <div className="photo-grid">
                      {photos.map((photo) => (
                        <div key={photo.file_path} className="photo-item">
                          <img
                            src={`https://image.tmdb.org/t/p/original${photo.file_path}`}
                            alt="Movie Photo"
                            className="photo-image"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="button"
                    className="save-button"
                    onClick={movieId ? handleUpdate : handleSave}
                    disabled={isLoading}
                  >
                    {isLoading
                      ? "Saving..."
                      : movieId
                      ? "Update Movie"
                      : "Save Movie"}
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => navigate("/main/movie")}
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Form;

