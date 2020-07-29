const bcrypt = require("bcrypt");
const saltRounds = 10;

async function genHash(password, existingSalt) {
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
