const bcrypt = require('bcrypt');
const saltRounds = 10; 

//generate hashed encryped password with bcrypt module
const encrypt = async (plainTextPassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainTextPassword, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

module.exports =
{ encrypt};
