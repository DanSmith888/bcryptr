'use strict';
const bcrypt = require('bcryptjs');

module.exports.hashPassword = async (event) => {
  // get params and body
  const body = JSON.parse(event.body);
  const passWord = body.password;
  const cost = body.cost;
  
  // hash password field if success then return this hash else return empty with 500 statusCode
  if (!passWord) {
    return response(500, {response: 500, hash: ""})
  } else {
    try {
      const hash = bcrypt.hashSync(passWord, cost)
      return response(200, {response: 200, hash: hash})
    } catch (e) {
      return response(500, {response: 500, hash: ""})
    }
  }
};

function response(statusCode, body) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body)
  }
}