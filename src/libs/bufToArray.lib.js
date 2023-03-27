function bufToArray(buffer) {
  let array = new Array();
  for (let data of buffer.values()) array.push(data);
  return array;
}

module.exports = bufToArray;
