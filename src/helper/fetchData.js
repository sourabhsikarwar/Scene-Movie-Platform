const fetchData = async (slug, type, data = null) => {
  try {

    let url = `${process.env.REACT_APP_API_DOMAIN}/api/movies/${slug}`
    let method = type === 1 ? 'GET' : 'POST'
    let headers = {
      'Content-Type': 'application/json',
    }
    let body = data
    let options={method}
    if (type === 2) {
      options = {
        method,
        headers,
        body,
      }
    }

    const response = await fetch(url, options).then((res) => res.json())
    return response
  } catch (error) {
    return error
  }
}

export default fetchData
