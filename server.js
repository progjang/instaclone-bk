import { PrismaClient } from ".prisma/client";
import {ApolloServer, gql} from "apollo-server";

const client = new PrismaClient()

const typeDefs = gql`
type Movie{
    id: Int!
    title: String!   
    year: Int!
    genre: String
    createAt: String! 
    updatedAt: String!
}

type Query{
    movies: [Movie]
    movie(id:Int!): Movie
}

type Mutation{
    createMovie(title:String!, year:Int!, genre:String): Movie
    deleteMovie(id:Int!): Movie
}
`;
 
const resolvers = {
    Query:{
        movie: (_,{id}) => client.movie.findFirst({where:{id}}),
        movies: () => client.movie.findMany(),
    },
    Mutation:{
        createMovie: (_, {title,year,genre}) => client.movie.create({data:{
            title,
            year,
            genre
        }}),
        deleteMovie: (_, {id}) => client.movie.delete({where:{id}})
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(()=>console.log("Server is running on http://localhost:4000/"));