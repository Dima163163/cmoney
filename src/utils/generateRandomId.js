const generateRandomId = () =>
  Math.random().toString(36).substring(2, 8) +
    Date.now().toString().substring(9);

export const assighId = obj => ({
  ...obj,
  id: generateRandomId(),
});
