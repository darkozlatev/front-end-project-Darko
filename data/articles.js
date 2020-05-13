const getArticles = () =>{ 
    const options = {
    url: serverURL + '/articles',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };
  
  return axios(options).then(function (response) {
    return response.data;})
}

const getArticleById = _id => {

    const options = {
        url: serverURL + '/articles/'+ _id,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      };
      
    return axios(options).then(function (response) {
      return response.data;})
}
const getArticleByAuthorId = authorId => {

  const options = {
      url: serverURL + '/authors/' + authorId + '/articles',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    
  return axios(options).then(function (response) {
    return response.data;})
}
