export const flickrImages = (searchQuery) => {
  const FLICKR_API_ENDPOINT = `https://api.github.com/search/repositories?q=${searchQuery || ''}&page=1&per_page=50`;
  return fetch(FLICKR_API_ENDPOINT)
    .then(response => {
      return response.json()
    })
    .then(json => {
      return json.items || []
    });
};
