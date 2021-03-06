import client from "../client";
import bcrypt from "bcrypt";

export default {
    Mutation: {
        createAccount: async(_,{
            firstName,
            lastName,
            username,
            email,
            password
        }) => {
            try {
            // check if username or email are already on DB.
            const existingUser = await client.user.findFirst({
                where: {
                    OR: [
                        {
                            username,
                        },
                        {
                            email,
                        }
                    ]
                }
            });
            if(existingUser){
                throw new Error("This username/email is already taken.")
            };
            // hash password
            const uglyPassword = await bcrypt.hash(password, 10);

            // save and return the user
            // return 하고 있어서 await 안해도 됨 (브라우저가 알아서 wait 해줌- waiting property)
            return client.user.create({
                data:{
                    username,
                    email,
                    firstName,
                    lastName,
                    password:uglyPassword,
                },
            });
            } catch(e){
                return e;
            }

        },
    },
};