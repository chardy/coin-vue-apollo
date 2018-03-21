import gql from 'graphql-tag'

export const Gql_Query_Get_Rate_Currency = gql`
  query getRatesByCurrencyQuery($currency: String!) {
    rates(currency: $currency) {
      currency
      rates {
        currency
        rate
      }
    }
  }
`
