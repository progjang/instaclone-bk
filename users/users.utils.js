import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async(token) => {
    if(!token) return null;
    try{
        const {id} = jwt.verify(token, process.env.SECRET_KEY);
        const loggedInUser = await client.user.findFirst({where:{id}})
        return (loggedInUser ? loggedInUser : null);
    } catch {
        return null;
    }
}

export function loginRequired(ourResolver){
    return function(root, args, context, info) {
        if(!context.loggedInUser) {
            return {
                ok: false,
                error: "Please login in to perform this action.",
            };
        }
        return ourResolver(root, args, context, info);
    };
}