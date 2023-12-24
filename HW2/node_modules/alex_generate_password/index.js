function generatePassword(length) {
    let passwordLength = length;
    const chars =
        "+-/*!@&$#?=_<>abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
        newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return newPassword;
}

module.exports = { generatePassword };