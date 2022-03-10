/**
 * @name randomInt
 * @param {number} min
 * @param {number} max
 * @description select a random number
 * between min and max values
 */
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * @name generateUniqueString
 * @param minLength
 * @param maxLength
 * @description generate a random string
 */
const generateUniqueString = (minLength, maxLength) => {
  const length = randomInt(minLength, maxLength);
  let result = "";

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = {
  generateUniqueString,
  randomInt
};
