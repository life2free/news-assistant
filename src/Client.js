function getAllNews(response) {
  return fetch("/newss").then(response);
}

function getNewsById(newsId, response) {
  return fetch("/newss/" + newsId).then(response);
}

function getNewsByQuery(query, response) {
  return fetch("/newss/search/keywords?q=" + query).then(response);
}

function createNews(requestOptions, response) {
  return fetch("/newss", requestOptions).then(response);
}

function editNewsById(requestOptions, newsId, response) {
  return fetch("/newss/" + newsId, requestOptions).then(response);
}

function deleteNesById(requestOptions, newsId, response) {
  return fetch("/newss/" + newsId, requestOptions).then(response);
}

function getAllSource(response) {
  return fetch("/sources").then(response);
}

const Client = {
  getAllNews,
  getNewsById,
  getNewsByQuery,
  createNews,
  editNewsById,
  deleteNesById,
  getAllSource,
};
export default Client;
