<template>
	<div>
        <p class = "quote animate__animated animate__backInLeft"> "{{quote}}" </p>
        <p class = "author animate__animated animate__backInRight"> {{author}} </p>
    </div>
</template>

<script>
import axios from 'axios'
import 'animate.css'

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

.quote {
    font-size: large;
}

.author {
    font-style: italic;
}

</style>