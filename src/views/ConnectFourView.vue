<template>
    <div class="board">
        <ConnectFourBoard/>
    </div>
    
    
</template>

<script>

import ConnectFourBoard from "../components/ConnectFourBoard.vue"

export default{
    
    name: 'ConnectFourView',
    components:{
        ConnectFourBoard,
    },
}
</script>

<style scoped>


</style>