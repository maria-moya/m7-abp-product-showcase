<template>
  <div class="carousel-wrapper">
  
    <v-carousel show-arrows="hover" height="75vh" hide-delimiter-background class="custom-carousel">
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src" cover>
        <div v-if="i === 0" class="image-overlay fill-height">
          <div class="d-flex fill-height justify-center align-center">
            <div class="text-center text-container">
              <h2 class="carousel-text text-white">Nuevos productos</h2>
              <v-btn variant="outlined" class="mt-4 px-13 btn-comprar btn-white-border text-decoration-none" to="/product">Comprar ahora</v-btn>
            </div>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>

  </div>
</template>

<script setup>
const items = [
  {
    src: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg', 
  },
  {
    src: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
  }
]
</script>

<style scoped lang="css">

.carousel-wrapper{
  position: relative;
}

.image-overlay{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.5) 0%, 
    rgba(0, 0, 0, 0) 20%,    
    rgba(0, 0, 0, 0) 80%,
    rgba(0, 0, 0, 0.5) 100%
   );
  z-index: 1;
}

.text-container {
  z-index: 2; 
  position: relative;
}

.carousel-text{
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 300;
  letter-spacing: 5px;
  color: #ffffff;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.text-white {
  color: #ffffff !important;
}

.btn-white-border {
  border-color: #ffffff !important;
  color: #ffffff !important;
  border-radius: 4px !important; 
  text-transform: none;
  font-weight: 300;
  letter-spacing: 3px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}

.btn-white-border:hover {
  background-color: #ffffff !important;
  color: black !important;
}

:deep(.v-window__controls .v-btn){
  border-radius: 50% !important;
  background-color: rgba(255, 255, 255, 0.8) !important;
  color: #333 !important;
}

</style>
