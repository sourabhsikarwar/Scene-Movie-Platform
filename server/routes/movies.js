const express = require('express')
const router = express.Router()
const apiKey = process.env.TMDB_KEY

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
//
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

router.get('/trending', async (req, res) => {
  try {
    const { page } = req.query

    let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    if (page) {
      url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`
    }
    //       url = `https://api.themoviedb.org/3/discover/${props.content}?api_key=${apiKey}&with_genres=${props.id}&page=${page}`
    //    if (params.title === 'Trending') {
    // url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&page=${page}`
    //}

    const data = await fetch(url).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

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

router.get('/movie-banner/:id', async (req, res) => {
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

router.get('/trailer/:id', async (req, res) => {
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

router.get('/all-genre/:id', async (req, res) => {
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

module.exports = router
