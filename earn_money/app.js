new Vue({
	el: '#app',
  data: {
	 money: 0,
	},
  methods: {
  	increase: function(coin) {
          this.money += coin;
    },
    alertMe: function() {
      const nameElement = document.getElementById("name");
      const name = nameElement.value;
      alert('Hi '+ name +' ! It is nice to see you.\n' + 'You have earned ' + this.money +' USD.')
    }
  }
});
