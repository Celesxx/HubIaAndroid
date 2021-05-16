import axios from "axios";
import Cookies from 'js-cookie'

export function postLogin(data)
{
  const URL = `/login`;
  console.log(`data envoyé : ${data.email} ${data.password}`)
  return axios(URL, {
    method: 'POST',
    data: data
  })
    .then((response) => 
    {
        if(!response.data.auth)
        {
            console.log(`test pas marche : ${response}`)
            return response.data
        }else
        {
            Cookies.set('token',response.data.token, { expires: 7 })
            console.log(`localstorage after request : ${Cookies.get("token")}`)
            return response.data
        }
    })
    .catch(error => {
      throw error;
    });
};


export function userAuth()
{
    const URL = `/userAuth`;
    return axios(URL, {
      method: 'GET',
      headers: 
      {
        'Content-Type': 'application/json',
        "x-access-token": Cookies.get("token")
      }
    })
    .then(response => response.data.auth)
    .catch(error => {
    throw error;
    });
}