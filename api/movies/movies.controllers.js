const Movie = require("../../db/models/Movie");

exports.fetchMovie = async (movieId) => {
  const foundMovie = await Movie.findById(movieId);
  return foundMovie;
};
exports.moviesCreate = async (req, res) => {
  try {
    if (req.file) {
      req.body.posterImage = req.file.path.replace("\\", "/");
    }
    const newMovie = await Movie.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.moviesDelete = async (req, res) => {
  const { movieId } = req.params;
  try {
    const foundMovie = await Movie.findById(movieId);
    if (foundMovie) {
      await foundMovie.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "movie not found in delete" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.moviesUpdate = async (req, res) => {
  const { movieId } = req.params;
  try {
    const foundMovie = await Movie.findById(movieId);

    if (foundMovie) {
      if (req.file) {
        req.body.posterImage = req.file.path.replace("\\", "/");
      }
      await foundMovie.updateOne(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "movie not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.moviesGet = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.movieRating = async (req, res) => {
  try {
    // const { movieId } = req.params;

    if (+req.body.ratings >= 0 && +req.body.ratings <= 10) {
      await req.movie.updateOne({ $push: { ratings: req.body.ratings } });
      return res.status(204).end();
    } else {
      return res
        .status(500)
        .json({ message: "ratings is not in range of 0-10" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
