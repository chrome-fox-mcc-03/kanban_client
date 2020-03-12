<template>
  <div>
    <Header></Header>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'app',
  data() {
    return {};
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Raleway:600');
@import url('https://fonts.googleapis.com/css?family=Raleway:400,800');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Raleway', Arial, sans-serif;
}

html {
  font-size: 16px;
}

body {
  min-width: 100%;
  background: url('https://cdn.shopify.com/s/files/1/0879/0542/products/pc1478_da4bcba9-c02d-40bd-88c6-8b32119d8933@2x.jpg?v=1513990783')
    no-repeat center;
  background-size: cover;
  background-attachment: fixed;
}
</style>
