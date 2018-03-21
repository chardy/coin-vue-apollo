<template>
  <div class="grid">
    <div class="col-12">
      <div class="loading-section" v-if="$apollo.queries.getMarketExchange.loading">
        <div class="spin-loading"></div>
      </div>
      <h4 class="title">Data source from <a href="https://cryptowat.ch/docs/api">api.cryptowat.ch</a> REST API</h4>
      <table class="half-width">
        <thead>
          <tr>
            <td>
              Exchange&nbsp;
              <select class="button-large" :v-model="market" @change="onChangeHandle('market', $event)">
                <option v-for="item in exchanges" :value="item.symbol" 
                :selected="item.symbol.toLowerCase() == market.toLowerCase()" >
                  {{item.name}}
                </option>
              </select>
            </td>
            <td>
              Currency&nbsp;
              <select class="button-large" :v-model="currency" @change="onChangeHandle('currency', $event)">
                <option v-for="item in assets" :value="item.symbol" 
                :selected="item.symbol.toLowerCase() == currency.toLowerCase()" >
                  {{item.name}}
                </option>
              </select>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in getMarketExchange">
            <td>
              <h3>{{item.base.symbol.toUpperCase()}}</h3>
              <p>{{item.base.name}}</p>
            </td>
            <td class="text-right">
              {{currency == 'usd' ? `${formatPrice(item.price.price, "$")}` : item.price.price}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  const {Gql_Query_List_Exchange} = require('./../graphql/queries/allExchanges')
  const {Gql_Query_Get_List_Assets} = require('./../graphql/queries/allAssets')
  const {Gql_Query_Get_Market_Exchange} = require('./../graphql/queries/getMarketExchange')
  const {formatPrice} = require('./format')
  export default {
    data() {
      return {
        market: "",
        currency: "",
        exchanges: [],
        assets: [],
        getMarketExchange: [],
        formatPrice
      }
    },
    apollo: {
      exchanges: {
        query: Gql_Query_List_Exchange,
        fetchPolicy: 'network-only',
      },
      assets: {
        query: Gql_Query_Get_List_Assets,
        fetchPolicy: 'network-only',
      },
      getMarketExchange() {
        const currency = this.$route.query.currency || "usd"
        const market = this.$route.query.market || "kraken"
        return {
          query: Gql_Query_Get_Market_Exchange,
          variables() {
            return {
              market, currency
            }
          },
          result() {
            this.market = market
            this.currency = currency
          }
        }
      },
    },
    methods: {
      onChangeHandle (type, e) {
        const value = e.target.value
        let market, currency
        if (type == 'market') {
          market = value
          currency = this.currency
        } else {
          currency = value
          market = this.market
        }
        this.$apollo.queries.getMarketExchange.refetch({
          market, currency
        })
        // .then(res => {
        //   this.market = market
        //   this.currency = currency
        //   window.history.pushState( null, null, `/?market=${this.market}&currency=${this.currency}` )
        // })
      }
    }
  }
</script>