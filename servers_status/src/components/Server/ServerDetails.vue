<template>
    <div class="col-xs-12 col-sm-6">
        <p v-if="!server">Please select a Server</p>
        <p v-else>
            Server <span style="color:blue">#{{ server.id }}</span> selected, 
            Status: <span :class="statusColor">{{  server.status }}</span></p>
        <hr>
        <button @click="resetStatus" v-if="server" class="btn btn-info">Change to Normal</button>
    </div>

</template>

<script>
    import { serverBus } from '../../main'
    export default {
        data: function() {
            return{
                server: null
            }
        },
        computed:{
            statusColor: function(){
                return{
                    'color-server-normal': this.server.status == 'Normal',
                    'color-server-critical': this.server.status == 'Critical',
                    'color-server-unknown': this.server.status == 'Unknown',
                }
            }
        },
        methods:{
            resetStatus(){
                this.server.status='Normal'
            }
        },
        created() {
            serverBus.$on('serverSelected',(server)=>{
                this.server = server;
            });
        }
    }
</script>

<style type="text/css">
.color-server-normal {
    color: green;

}
.color-server-critical {
    color: coral;
}
.color-server-unknown {
    color:crimson;
}
</style>
