import gql from 'graphql-tag'

export const Gql_Query_Get_Market_Exchange  = gql`
  query getMarketExchangeQuery($market: String!, $currency: String){
    getMarketExchange(
      market: $market,
      currency: $currency
    ){
      id
      exchange
      pair
      price {
        price
      }
      base {
        symbol
        name
      }
      quote {
        symbol
        name
      }
    }
  }
`
