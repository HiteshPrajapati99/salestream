const crypto = require("crypto-js");

const secret = "HiteshPrajapati";

const encrypt = (data) => {
  const text = crypto.AES.encrypt(JSON.stringify(data), secret).toString();
  return text;
};

const decryptdata = (req, res) => {
  const data = req.body.data;

  var bytes = crypto.AES.decrypt(data, secret);

  const decryptData = JSON.parse(bytes.toString(crypto.enc.Utf8));

  // console.log(decryptData, "dec");

  res.json(decryptData);
};

module.exports = {
  encrypt,
  decryptdata,
};
