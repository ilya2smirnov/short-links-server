const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.genHash = async function (password, existingSalt) {
  return (existingSalt ? Promise.resolve(existingSalt)
                       : bcrypt.genSalt(saltRounds))
    .then(salt => {
      return bcrypt.hash(password, salt).then((hash) => {
        return {hash, salt};
      }).catch(err => {
        console.log("Unable to generate hash:", err);
        throw err;
      })
    })
}
