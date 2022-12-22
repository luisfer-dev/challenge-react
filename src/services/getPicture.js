const URL = 'https://jsonplaceholder.typicode.com/photos'

export const getPicture = ({ id }) => {
  return new Promise((resolve, reject) => {
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        resolve(data[id])
      })
      .catch(error => {
        reject(error)
      })
  })
}