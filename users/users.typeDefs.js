import {gql} from "apollo-server-express";

export default gql`
    type User {
        id: String!
        firstName: String!
        lastName: String
        username: String!
        email: String!
        bio: String
        avatar: String
        createdAt: String!
        updatedAt: String!
    }
    type CreateAccountResult{
        ok: Boolean!
        error: String
    }
    type Mutation{
        createAccount(
            firstName: String!
            lastName: String
            username: String!
            email: String!
            password: String!
        ): CreateAccountResult!
    }
    type Query {
        seeProfile(username:String):User
    }
`;