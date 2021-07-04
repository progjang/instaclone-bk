import client from "../../client";
import bcrypt from "bcrypt";
import { createWriteStream } from "fs";
import { loginRequired } from "../users.utils";

const editProfileResolver = async(_, {firstName, lastName, username, email, bio, avatar, password:newPassword},
    {loggedInUser}) => {
    let avatarUrl = null;
    if(avatar){
        const {filename, createReadStream} = await avatar;
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
        const readStream = createReadStream();
        console.log(readStream);
        const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);
        console.log(writeStream);
        readStream.pipe(writeStream);
        avatarUrl = `http://localhost:4000/static/${newFilename}`;
    }

    let uglyPassword = null;
    uglyPassword = newPassword && await bcrypt.hash(newPassword, 10);
    const updatedUser = await client.user.update({
        where: {id: loggedInUser.id},
        data:{
            firstName,
            lastName,
            username,
            email,
            bio,
            ...(avatarUrl && {avatar: avatarUrl}),
            ...(newPassword && {password:uglyPassword})
        } 
    });
    if(updatedUser.id){
        return {
            ok: true,
        }
    }
    return {
        ok: false,
        error: "Couldn't update this user's info."
    }
}

export default {
    Mutation: {
        editProfile: loginRequired(editProfileResolver),
    }
}