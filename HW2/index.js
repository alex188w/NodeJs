'use strict'
const { generatePassword } = require("alex_generate_password");
console.log(`Ваш уникальный пароль из 7 символов: ${generatePassword(7)}`);