<template>
  <v-app id="app">
    <v-main>
      <v-container>
        <div id="nav" class="d-flex align-center justify-center">
          <router-link to="/" v-if="this.$route.path !== '/'" class="mr-3">Home</router-link>
          <router-link to="/add">Add Product</router-link>
        </div>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
