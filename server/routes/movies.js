const express = require('express')
const router = express.Router()
const apiKey = process.env.TMDB_KEY
router.get('/', async (req, res) => {
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.post('/:content/:id', async (req, res) => {
  try {
    const { content, id } = req.params
    const { page } = req.body
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/${content}?api_key=${apiKey}&with_genres=${id}&page=${page}`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.post('/trending', async (req, res) => {
  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

router.post('/genre/:id', async (req, res) => {
  try {
    const { id } = req.params
    const data = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${id}`
    ).then((res) => res.json())
    res.status(200).json({ success: true, data: data })
  } catch (e) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router
