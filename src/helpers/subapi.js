const axios = require('axios');


async function getTagDevice(urlApi,{address, slot, tag, length}) {
  try {
    const response = await axios.get(urlApi, {
      data: {
        address: address,
        slot: slot,
        tag: tag,
        length: length,
      },
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
}

module.exports = { getTagDevice };
