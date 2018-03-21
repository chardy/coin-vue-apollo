<template>
  <div class="grid">
    <div class="col-12">
      <button :class="[{loading: $apollo.queries.stats.loading}, 'button-success button']" @click="refeshHandle">Refresh</button>
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
  export default {
    data () {
      return {
        stats: [],
        moment, formatCount
      }
    },
    created() {
    },  
    apollo: {
      stats: {
        query: Gql_Query_List_Stats,
        fetchPolicy: 'network-only',
      },
    },
    methods: {
      refeshHandle(e) {
        this.$apollo.queries.stats.refetch({
          fetchPolicy: 'network-only'
        })
      }
    }
  }
</script>