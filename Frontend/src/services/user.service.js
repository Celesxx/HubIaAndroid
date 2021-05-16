import axios from "axios";

export function getUsers()
{
    const URL = "/getUsers";
    return axios(URL, {
      method: 'GET'
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
};

export function updateUsers(id,data)
{
    const URL = `/putUser/${id}`;
    return axios(URL, {
      method: 'PUT',
      data: data
    })
      .then(response => response.data)
      .catch(error => {
        throw error;
      });
};

export function deleteUser(id)  {
  const URL = `/deleteUser/${id}`;
  return axios(URL, {
    method: 'DELETE'
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export function postUser(data)
{
  const URL = `/postUser`;
  return axios(URL, {
    method: 'POST',
    data: data
  })
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};