export const countRepes = (title) => {
  let repetidos = [];
  let count = 0;
  for (let i = 0; i < title.length; i++) {
    repetidos.push(title[i]);
    if (repetidos.includes(title[i])) {
      ++count;
    } else {
      count = 1;
    }
  }
  return count;
};
