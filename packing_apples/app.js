new Vue({
        el: '#app',
        data: {
            value: 0
        },
        computed: {
			result: function() {
        		return this.value == 24 ? 'Great! 5 sec for another package.' : 'not there yet';
        	}
        },
        watch: {
        	result: function() {
				var vm = this;
        		setTimeout(function() {
        			vm.value = 0;
        		}, 5000);	
        	}
        }
    });