<template>
	<div class="popup">
        <div class="title">🎉{{name}} Won!🎉</div>
        <div class="popup-inner">
            <span class="body">Would you like to play again?</span>
            <div class="button-container">
                <button class="yes" @click="this.response('yes')">Yes</button>
                
                <button class="no" @click="this.response('no')">No</button>
            </div>
        </div>
	</div>
</template>

<script>

export default {
    name:'PopUp',
    
    props: {
        name: String,
    },
    
    methods: {
        response: function(event){
            this.$emit('response',event)
        }
    }

}
</script>

<style scoped>
.popup {
	position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
	z-index: 99;
	align-items: center;
	justify-content: center;
    background: white;
    border: solid 3px black;
    border-radius: 5px;
    padding: 4vmin;
}

.title{
    font-weight: bold;
    font-size: 1.6em;
    color: black;
}

.body{
    color: darkslategrey;
}

.yes{
    background: #23C552;
}

.no{
    background: #F84F31;
}

.button-container{
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3vh;
}

button{
    border-radius: 5px;
    padding: 3px 15px;
    margin-right:3px;
    margin-left:3px;
    border-style: none;
}

</style>