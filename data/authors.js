const getAuthors = () => {
    const options = {
        url: serverURL + '/authors',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    return axios(options).then(function (response) {
        return response.data;})
}

const getAuthorById = authorId => {
    const options = {
        url: serverURL + '/authors/'+ authorId,
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      };
      
      return axios(options).then(function (response) {
        return response.data;})
}
