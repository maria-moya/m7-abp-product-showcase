<template>
  <div>
    <header class="header-container border-bottom bg-white">
      <div class="container text-center py-5">
        <h1 class="brand-title">
          <slot></slot>
        </h1>
      </div>
    </header>
  </div>
</template>

<script setup></script>

<style scoped lang="css">
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300&display=swap');

.brand-title{
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  letter-spacing: 8px;
  font-size: 2.8rem;
  color: #2c2c2c;
  margin: 0;
}

.header-container{
  width: 100%;
}
</style>
