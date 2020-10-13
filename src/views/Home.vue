<template>
  <div>
    <product-list></product-list>
    <categories-list></categories-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductList from '@/components/ProductList.vue';
import CategoriesList from '@/components/CategoriesList.vue';

@Component({
  components: {
    CategoriesList,
    ProductList
  }
})
export default class Home extends Vue {}
</script>
