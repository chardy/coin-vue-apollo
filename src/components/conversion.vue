<template>
  <div class="grid">
    <div class="col-12">
      <span>Currency</span>
      <div class="conversion-list">
        <select class="button-large" :v-model="selected.toUpperCase()" @change="handleChangeCurrency" >
          <option v-for="currency in currencies" :key="currency.id" :value="currency.id"
            :selected="currency.id == selected.toUpperCase()" 
          >
            {{currency.id}}
          </option>
        </select>
      </div>
      <div class="loading-section" v-if="$apollo.queries.rates.loading">
        <div class="spin-loading"></div>
      </div>
    </div>
    <div class="col-12">
      <h4 class="title">Data source from <a href="https://developers.coinbase.com/api/v2">Coinbase V2</a> REST API</h4>
      <table class="half-width">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in rates.rates" :class="{bold: item.currency == 'USD' || item.currency == 'BTC'}">
            <td data-label="Currency">💱 {{item.currency}}</td>
            <td data-label="Rate">{{item.rate}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  const queryString = require('query-string')

  const {Gql_Query_List_Currency} = require('./../graphql/queries/allCurrencies')
  const {Gql_Query_Get_Rate_Currency} = require('./../graphql/queries/getRatesByCurrency')

  export default {
    name: 'Conversion',
    data () {
      return {
        selected: "",
        currencies: [],
        rates: []
      }
    },
    created() {
    },  
    apollo: {
      currencies: {
        query: Gql_Query_List_Currency,
        fetchPolicy: 'network-only',
      }, 
      rates() {
        return {
          query: Gql_Query_Get_Rate_Currency,
          variables() {
            const currency = this.$route.query.currency || "USD"
            this.selected = currency
            return {
              currency
            }
          },
          result({ data, loader, networkStatus }) {
          },
        }
      }
    },
    methods: {
      handleChangeCurrency (e) {
        this.selected = e.target.value
        this.$apollo.queries.rates.refetch({
          currency: e.target.value,
        }).then(res => {
          window.history.pushState( null, null, `/?currency=${e.target.value.toLowerCase()}` )
        })
      }
    }
  }
</script>
