const graphql = require('graphql');
const Weather = require('../models/weather');
const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLSchema, GraphQLList } = graphql;
const { getWeatherData } = require('../controllers/weatherController'); 

const WeatherType = new GraphQLObjectType({
  name: 'Weather',
  fields: () => ({
    id: { type: GraphQLString },
    city: { type: GraphQLString },
    temperature: { type: GraphQLFloat },
    description: { type: GraphQLString },
    icon: { type: GraphQLString },
    date: { type: GraphQLString },
  }),
});

// Root Query Definition
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    weather: {
      type: new GraphQLList(WeatherType),
      args: {
        city: { type: GraphQLString },
        from: { type: GraphQLString },
        to: { type: GraphQLString },
      },
      async  resolve(parent, args) {
        let query = {};
        if (args.city) query.city = args.city;
        if (args.from && args.to) query.date = { $gte: args.from, $lte: args.to };
        let  newData= await  getWeatherData(args.city);
        return [newData]
        
      }
    }
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery,
});
