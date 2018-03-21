import gql from 'graphql-tag'

export const Gql_Query_List_Currency = gql`
  query allCurrenciesQuery{
    currencies {
     	id
		  name
		  min_size
    }
  }
`
