new Vue({
	el: '#exercise',
  data: {
	name: 'Aaron',
	age: '24',
	image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png'
  },
  methods: {
  	random: function() {
          return Math.random();
    }
  }
});
