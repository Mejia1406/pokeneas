export function getRandomElement(array) {
  if (!array || array.length === 0) {
    throw new Error('El arreglo no puede estar vacío');
  }

  const index = Math.floor(Math.random() * array.length);

  return array[index];
}