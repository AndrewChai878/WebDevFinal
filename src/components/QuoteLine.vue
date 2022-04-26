<template>
	<div>
        <p> {{quote}} - {{author}} </p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'QuoteLine',
    
    data(){
        return{
            author: "Andrew",
            quote: "You should really run the backend"
        }
    },
    
    created:function(){
        axios.get("http://localhost:4500/quote")
             .then(response => {this.quote = response.data.quote
                                this.author = response.data.author})
             .catch(error=> console.log(error))
    }

}
</script>

<style scoped lang="scss">

</style>