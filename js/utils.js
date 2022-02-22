export function getRandomSignNum(){
  return Math.floor((Math.random() * 2)) === 1 ? 1 : -1;
}