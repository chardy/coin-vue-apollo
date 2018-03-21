import gql from 'graphql-tag'

export const Gql_Query_List_Exchange  = gql`
  query allExchangesQuery{
    exchanges {
      name
      symbol
    }
  }
`
