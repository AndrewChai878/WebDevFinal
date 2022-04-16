<template>
  <section class="play-area">
        <div class = "gameplay-buttons">
            <p class = "flip">flip</p>
            <p class = "check-indicator">no check</p>
        </div>
        <ChessBoard/>
    </section>
</template>



<script>
import ChessBoard from '@/components/ChessBoard.vue'

  export default {
    name: 'ChessView',
    components: {
      ChessBoard
    }
  }
</script>

<style>
  .play-area{
      display: grid;
      grid-template-columns: 10px auto;
      background-image: url(../assets/chess/wood-591631.jpg);
      margin: 0; 
  }

  .gameplay-buttons{
      font-size: xx-large;
      font-weight: 600;
      display: grid;
      grid-template-columns: 100px auto;
  }

  .gameplay-buttons p{
      text-align: center;
      background-color: antiquewhite;
      border-style: solid;
      border-width: 3px;
      border-color: black;
  }

  .flip:hover{
      background-color: aquamarine;
  }


</style>