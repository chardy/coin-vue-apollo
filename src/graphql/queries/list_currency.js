import gql from 'graphql-tag'

export const Gql_Query_List_Currency = gql`
  query listCurrencyQuery{
	  currencies {
	    id
	    min_size
	  }
  }
`
