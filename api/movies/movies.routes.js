const express = require("express");
const router = express.Router();
const uploader = require("../../middleware/uploader");
const {
  moviesGet,
  moviesUpdate,
  moviesDelete,
  moviesCreate,
  movieRating,
  fetchMovie,
} = require("./movies.controllers");

router.param("movieId", async (req, res, next, movieId) => {
  try {
    const foundMovie = await fetchMovie(movieId);
    if (!foundMovie) return next({ status: 404, message: "Movie not found!" });
    req.movie = foundMovie;
    next();
  } catch (error) {
    return next(error);
  }
});

router.patch("/:movieId", movieRating);
router.get("/", moviesGet);
router.post("/", uploader.single("posterImage"), moviesCreate);

router.delete("/:movieId", moviesDelete);

router.put("/:movieId", moviesUpdate);

module.exports = router;
