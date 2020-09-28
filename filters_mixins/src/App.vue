<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Filters & Mixins</h1>
                <!-- Exercise 2 -->
                <!-- Build a global Filter which counts the length of a word and it appends it -->
                <!-- Like this: "Test" => Gets Filtered to => "Test (4)" -->
                <p>{{ secondText | calculateLength }} (calculated from <strong>global filters</strong>)</p>                
                <!-- Exercise 1) -->
                <!-- Build a local Filter which reverses the Text it is applied on -->
                <p>{{ firstText }}</p>
                <p>{{ firstText | reverse }} (reverse from <strong>local filters</strong>)</p>   
                <hr>
                <!-- Exercise 3 -->
                <!-- Do the same as in Exercises 1 & 2, now with Computed Properties -->
                <input type="text" v-model="thirdText">
                <p>{{ reversed }} (reverse from <strong>computed</strong>)</p>  
                <!-- Exercise 4 -->
                <!-- Share the Computed Property rebuilding Exercise 2 via a Mixin -->
                <p>Try the following Palindrome (import from <strong>Maxin.js</strong>)</p>
                <ul>
                    <li v-for="(text,index) in Palindrome" :key="index">{{ lengthAware(index) }} </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import { lengthAwareMixin } from './lengthAwareMixin'
    export default {
        mixins:[lengthAwareMixin],
        data() {
            return{
                firstText : 'was it a car or a cat I saw',
                secondText: 'Palindrome',
                thirdText : 'Step on no pets!',
                Palindrome: ['Rats live on no evil star.',
                             'Madam Im Adam.',
                             'Do geese see God?']
            }
        },
        filters:{
            reverse(value){
                return value.split("").reverse().join("");
            }
        },
        computed:{
            reversed(){
                return this.thirdText.split("").reverse().join("");
            },
        }
    }
</script>

<style>
</style>
