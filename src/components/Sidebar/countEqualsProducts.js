export const countRepes = (name) => {
  let repetidos = [];
  let count = 0;
  for (let i = 0; i < name.length; i++) {
    repetidos.push(name[i]);
    if (repetidos.includes(name[i])) {
      ++count;
    } else {
      count = 1;
    }
  }
  return count;
};
