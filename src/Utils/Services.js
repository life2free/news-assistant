import Config from "./Config";

function getAllNews(response) {
  return fetch(`${Config.RESTAPI_BASEURL}/newss`).then(response);
}

function getNewsById(newsId, response) {
  return fetch(`${Config.RESTAPI_BASEURL}/newss/${newsId}`).then(response);
}

function getNewsByQuery(query, response) {
  return fetch(
    `${Config.RESTAPI_BASEURL}/newss/search/keywords?q=${query}`
  ).then(response);
}

function createNews(requestOptions, response) {
  return fetch(`${Config.RESTAPI_BASEURL}/newss`, requestOptions).then(
    response
  );
}

function editNewsById(requestOptions, newsId, response) {
  return fetch(
    `${Config.RESTAPI_BASEURL}/newss/${newsId}`,
    requestOptions
  ).then(response);
}

function deleteNesById(requestOptions, newsId, response) {
  return fetch(
    `${Config.RESTAPI_BASEURL}/newss/${newsId}`,
    requestOptions
  ).then(response);
}

function getAllSource(response) {
  return fetch(`${Config.RESTAPI_BASEURL}/sources`).then(response);
}

const RestApi = {
  getAllNews,
  getNewsById,
  getNewsByQuery,
  createNews,
  editNewsById,
  deleteNesById,
  getAllSource,
};
export default RestApi;
