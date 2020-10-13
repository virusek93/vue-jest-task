<template>
  <product-form></product-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProductForm from '@/components/ProductForm.vue';

@Component({
  components: {
    ProductForm
  }
})
export default class AddProductView extends Vue {}
</script>
