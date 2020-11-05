<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div class="navbar-header">
            <router-link to="/" class="navbar-brand">Stock Trader</router-link>
        </div>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/portfolio" active-class="active" class="nav-link" style="cursor: pointer;" tag="li">Portfolio</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/stocks" active-class="active" class="nav-link" style="cursor: pointer;" tag="li">Stocks</router-link>
                </li>
            </ul>
            <ul class="navbar-nav mr-2">
                <li class="nav-item">
                    <a class="nav-link" href="#" @click="endDay()">End Day</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Save & load
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#" @click="saveData()">Save data</a>
                        <a class="dropdown-item" href="#" @click="loadData()">Load data</a>
                    </div>
                </li>
            </ul>
            <strong class="navbar-text">Funds: {{ funds | currency }}</strong>
        </div>
    </nav>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        computed: {
            funds() {
                return this.$store.getters.funds;
            }
        },
        methods: {
            ...mapActions({
                randomizeStocks: 'randomizeStocks',
                fetchData: 'loadData',
            }),
            endDay() {
                this.randomizeStocks();
            },
            saveData() {
                const data = {
                    funds: this.$store.getters.funds,
                    stockPortfolio: this.$store.getters.stockPortfolio,
                    stocks: this.$store.getters.stocks,
                };
                this.$http.put('data.json', data);
            },
            loadData() {
               this.fetchData();
            }
        }
    }
</script>