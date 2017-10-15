var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema,GraphQLObjectType } = require('graphql');

// Construct a schema, using GraphQL schema language

var TODOs = [  
    {
      "id": 1446412739542,
      "title": "Read emails",
      "completed": false
    },
    {
      "id": 1446412740883,
      "title": "Buy orange",
      "completed": true
    }
  ];
  var TodoType = new GraphQLObjectType({  
    name: 'todo',
    fields: function () {
      return {
        id: {
          type: graphql.GraphQLID
        },
        title: {
          type: graphql.GraphQLString
        },
        completed: {
          type: graphql.GraphQLBoolean
        }
      }
    }
  });

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello Messi!';
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');