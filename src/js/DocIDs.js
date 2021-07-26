export default function DocIDs(...ids) {
  for (const id of ids) {
    this[toCamelCase(id)] = document.querySelector(`#${id}`);
  }
}

function toCamelCase(string) {
  let isUp = false;
  let newStr = '';
  for (const char of string) {
    if (char === '-') isUp = true;
    else {
      newStr += isUp ? char.toUpperCase() : char;
      isUp = false;
    }
  }
  return newStr;
}
