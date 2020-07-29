const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.genHash = async function (password, existingSalt) {
  return (existingSalt ? Promise.resolve(existingSalt)
                       : bcrypt.genSalt(saltRounds))
    .then(salt => {
      return {hash: bcrypt.hash(password, salt), salt};
    }).then(({hash, salt}) => {
      return {hash, salt};
    }).catch(err => {
      console.log("Unable to generate hash:", err);
      throw err;
    })
}
