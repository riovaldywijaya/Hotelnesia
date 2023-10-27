const axios = require('axios');

const createQR = async (roomId) => {
  const { data } = await axios({
    method: 'post',
    url: `https://api.qr-code-generator.com/v1/create?access-token=${process.env.access_token_QR}`,
    data: {
      frame_name: 'no-frame',
      qr_code_text: process.env.CLIENT_URL + `/rooms/${roomId}`,
      image_format: 'SVG',
      qr_code_logo: 'scan-me-square',
    },
  });

  return data;
};

module.exports = createQR;
