const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return { success: true, data: data };
    } else {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

export default fetchData
