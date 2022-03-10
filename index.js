const { ApolloServer, gql } = require("apollo-server");
const models = require("./models");
const { generateUniqueString } = require("./utils");

// Construct a schema, using GraphQL schema language
// test
const typeDefs = gql`
  type Link {
    id: Int!
    url: String!
    slug: String!
  }

  type Query {
    allLinks: [Link]
  }

  type Mutation {
    createLink(url: String!, slug: String): Link!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    async allLinks(root, args, { models }) {
      return models.Link.findAll();
    }
  },
  Mutation: {
    async createLink(root, { url, slug }, { models }) {
      const newSlug = slug || generateUniqueString(4, 8);

      const previousSlug = await models.Link.findOne({
        where: { slug: newSlug }
      });
      if (previousSlug) {
        throw new Error("Sorry, a slug already exists for this value");
      }

      const newLink = models.Link.create({
        url,
        slug: newSlug
      });
      return newLink;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { models }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
