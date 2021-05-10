 import axios from "axios";

//  export function getDatas(id)
//  {
//      const URL = "http://localhost:8081/getUser/" + id;
//      return axios(URL, {
//        method: 'GET'
//      })
//        .then(response => response.data)
//        .catch(error => {
//          throw error;
//        });
//  };

export function getDatas(id) {

  axios.get(`http://localhost:8081/getUser/` + id)
      .then(res => {
        //aconsole.log(res);
        console.log(res.data);
        return res.data;
      })
};

// export function updateData(id,data)
// {
//     const URL = `adresse/putData/${id}`;
//     return axios(URL, {
//       method: 'PUT',
//       data: data
//     })
//       .then(response => response.data)
//       .catch(error => {
//         throw error;
//       });
// };

// export function deleteData(id)  {
//   const URL = `adresse/deleteData/${id}`;
//   return axios(URL, {
//     method: 'DELETE'
//   })
//     .then(response => response.data)
//     .catch(error => {
//       throw error;
//     });
// };

// export function postData(data)
// {
//   const URL = `adresse/postData`;
//   return axios(URL, {
//     method: 'POST',
//     data: data
//   })
//     .then(response => response.data)
//     .catch(error => {
//       throw error;
//     });
// };