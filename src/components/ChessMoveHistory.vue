<template>
    <div class="move-history">
        <p>Moves:</p>
        <p>{{moves}}</p>
    </div>
</template>

<script>
    export default{
        name: 'ChessMoveHistory',
        props:{
            moves: String
        },
    }

</script>

<style scoped lang="scss">

</style>