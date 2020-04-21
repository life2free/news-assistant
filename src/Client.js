import Config from "./Config";

function getAllNews(response) {
  return fetch(`${Config.ProxyUrl}/newss`).then(response);
}

function getNewsById(newsId, response) {
  return fetch(`${Config.ProxyUrl}/newss/${newsId}`).then(response);
}

function getNewsByQuery(query, response) {
  return fetch(`${Config.ProxyUrl}/newss/search/keywords?q=${query}`).then(
    response
  );
}

function createNews(requestOptions, response) {
  return fetch(`${Config.ProxyUrl}/newss`, requestOptions).then(response);
}

function editNewsById(requestOptions, newsId, response) {
  return fetch(`${Config.ProxyUrl}/newss/${newsId}`, requestOptions).then(
    response
  );
}

function deleteNesById(requestOptions, newsId, response) {
  return fetch(`${Config.ProxyUrl}/newss/${newsId}`, requestOptions).then(
    response
  );
}

function getAllSource(response) {
  return fetch(`${Config.ProxyUrl}/sources`).then(response);
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
