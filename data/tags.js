const getTags = () => {
    const options = {
        url: serverURL + '/tags',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      };
      
    return axios(options).then(function (response) {
        return response.data;})
}
const getArticlesTag = slug => {
  const options = {
      url: serverURL + '/tags/' + slug + '/articles',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    
  return axios(options).then(function (response) {
      return response.data;})
}