export const capitalize = (value) => {
  return value.charAt(0).toUpperCase().concat(value.slice(1))
}

export const getImgFromServer = (img) => {
  const baseURL = import.meta.env.VITE_API_URL
  return baseURL + '/resources/' + img
}
