const express = require('express')
const router = express.Router()
const apiKey = process.env.TMDB_KEY

//get all the genre at the beginning
router.get('/get-all-genres', async (req, res) => {
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})
//get the banner
router.get('/get-banner', async (req, res) => {
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=12`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

//for searching a movie
router.post('/search', async (req, res) => {
  try {
    const { query } = req.body

    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

//for all movies with genre
router.get('/all-movies/:genre_id', async (req, res) => {
  try {
    const { genre_id } = req.params
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre_id}`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

//for trending with pagination and no pagination
router.get('/trending', async (req, res) => {
  try {
    const { page } = req.query

    let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    if (page) {
      url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`
    }

    const data = await fetch(url).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})
//get popular genre
router.get('/popular-genre/id/:id', async (req, res) => {
  try {
    const { id } = req.params

    const data = await fetch(
      `https://api.themoviedb.org/3/genre/${id}/movies?api_key=${apiKey}&language=en-US`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

//for getting all category wise content
router.get('/:content/:id', async (req, res) => {
  try {
    const { content, id } = req.params
    const { page } = req.query

    const data = await fetch(
      `https://api.themoviedb.org/3/discover/${content}?api_key=${apiKey}&with_genres=${id}&page=${page}`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

//for getting similr movies
router.get('/similar/:title/:id', async (req, res) => {
  const { title, id } = req.params
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/${title}/${id}/similar?api_key=${apiKey}&language=en-US&page=1`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

//for getting individual movie banner
router.get('/movie-banner/movie/:id', async (req, res) => {
  const { id } = req.params

  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

//get the trailer of a particular movie
router.get('/trailer/id/:id', async (req, res) => {
  const { id } = req.params
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

//get the tv shows
router.get('/tv/:id', async (req, res) => {
  const { id } = req.params
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/1?api_key=${apiKey}&language=en-US`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

//get genre of a particular movie
router.get('/all-genre/id/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data.genres })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
