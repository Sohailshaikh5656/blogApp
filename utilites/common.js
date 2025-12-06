const bcrypt = require("bcrypt")

class common{
    //Generate Hashed Password
   async getHashedPassword(password) {
        const saltRounds = 10
        try{
            const hashedPassword = await bcrypt.hash(password,saltRounds);
            return hashedPassword
        }catch(err){
            return {
                code : responseCode.OPERATION_FAILED,
                keyword : "error in password bycrypt !",
                data : "Error in ByCrypt in Password !"
            }
        }
    }

    //Compare Passwords
    async comparePasswords(plainPassword, hashedPassword) {
        try {
            const match = await bcrypt.compare(plainPassword, hashedPassword);
            if (match) {
                console.log(" Password matched");
                return true;
            } else {
                console.log(" Password did not match");
                return false;
            }
        } catch (error) {
            console.error("Error during password comparison:", error);
            return false;
        }
    }

}

module.exports = new common()