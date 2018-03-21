import gql from 'graphql-tag'

export const Gql_Query_Get_List_Assets = gql`
  query allAssetsQuery{
    assets (
      fiat: true
    ) {
      id
      name
      symbol
      fiat
    }
  }
`
