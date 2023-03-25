import { ASCENDING } from "./constants"

export const sortData = (data, key, order) => {
  return [...data].sort((a, b) => {
    return order === ASCENDING ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key])
  })
}

export const groupObjects = (arr, property) => {
  const groups = arr.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  let result = []

  Object.values(groups).forEach(group => {
    group.forEach(item => {
      result.push(item)
    })
  })
  
  return result
};