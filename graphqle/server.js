var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    rollDice(numDice: Int!, numSides: Int): [Int]
    messi: String  
    author(id: ID!): Author
    
  }
  type Author {
    name: String
    posts: [Post]
  }
  
  type Post {
    title: String
    content: String
  }
`);
const authors = [{name:"messi",shirt:10},{name:"Thiago",shirt:6},{name:"Xavi",shirt:6},{name:"Mascherano",shirt:14}];

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  rollDice: function (args) {
    var output = [];
    for (var i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
    }
    return output;
  }, 
  messi: () => {
    return 'Messi er gud';
  },
  author(id){
return authors[id];
  }
  

};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');  