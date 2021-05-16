import axios from "axios";

export function postTag(data)
{
  const URL = `/postTag`;
  return axios(URL, {
    method: 'POST',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "crossorigin":true,
        "Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS"
    },
    data: data
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};


export function getTags()
{
    const URL = "/getTags";
    return axios(URL, {
      method: 'GET'
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
};

export function updateTag(id,data)
{
    const URL = `/putTag/${id}`;
    return axios(URL, {
      method: 'PUT',
      data: data
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
};

export function deleteTag(id)  {
  const URL = `/deleteTag/${id}`;
  return axios(URL, {
    method: 'DELETE'
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};