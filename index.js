const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
require('dotenv').config();
const connectDB=require('./config/db')
const app = express();
const schema = require('./schema/schema');

// Middleware
app.use(cors());
app.use(express.json());



// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

connectDB()


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
