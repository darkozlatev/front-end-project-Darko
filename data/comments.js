const getComments = () => {
	const options = {
		url: serverURL + '/comments',
		method: 'GET',
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json;charset=UTF-8'
		}
	}
	return axios(options).then(function (response) {
		return response.data;})
}//nema go na apito

const getCommentById = _id => {
    return Promise.resolve(data.comments.find(({ id }) => _id === id));
} //ova ne e napraveno na api-to

const getCommentsByArticleId = articleId => {
	const options = {
        url: serverURL + '/articles/'+ articleId + '/comments',
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      };
      
      return axios(options).then(function (response) {
        return response.data;})
}

