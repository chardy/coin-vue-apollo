<template>
  <div class="grid">
    <div class="col-12">
      <button :class="[{loading: loading}, 'button-success button']" @click="refeshHandle">Refresh</button>
    </div>
    <div class="col-12">
      <h4 class="title">
        Data source from <a href="https://coinmarketcap.com/api/">api.coinmarketcap.com</a> at 
        {{stats[0] && stats[0].lastUpdated && moment.unix(stats[0].lastUpdated).format("HH:mm:ss")}}
      </h4>
      <table class="full-width stat-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Coin</th>
            <th>Price (USD)</th>
            <th>Change (24H)</th>
            <th>Change (1H)</th>
            <th>Market Cap (USD)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stat in stats">
            <td data-label="Rank">{{stat.rank}}</td>
            <td data-label="Coin">💰 {{stat.symbol}}</td>
            <td data-label="Price (USD)">{{stat.priceUsd}}</td>
            <td data-label="Change (24H)" :class="[stat.percentChange24h > 0 ? 'plus' : 'minus']">
              {{stat.percentChange24h}}%
            </td>
            <td data-label="Change (1H)" :class="[stat.percentChange1h > 0 ? 'plus' : 'minus']">
              {{stat.percentChange1h}}%
            </td>
            <td data-label="Market Cap (USD)">{{formatCount(stat.marketCapUsd, true, 3)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  const {Gql_Query_List_Stats} = require('./../graphql/queries/allStats')
  const {formatCount} = require('./format')
  import { createApolloFetch } from 'apollo-fetch';
  const uri = 'http://localhost:4000/graphql';
  const apolloFetch = createApolloFetch({ uri });
  export default {
    data () {
      return {
        loading: false,
        stats: [],
        moment, formatCount
      }
    },
    created() {
      this.loadData()
    },  
    methods: {
      loadData() {
        apolloFetch({query: Gql_Query_List_Stats})
        .then(({data:{stats}}) => {
          this.stats = stats
          this.loading = false
        })
      },
      refeshHandle(e) {
        this.loading = true
        this.loadData()
      }
    }
  }
</script>