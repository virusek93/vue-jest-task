<template>
  <v-container ref="productList">
    <v-data-table :headers="headers" :items="productList" sort-by="name">
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogEdit" max-width="800px" :attach="$refs.productList">
      <v-card class="pa-5">
        <product-form :item="editedItem" @close-form="closeForm" title="Edit Form"></product-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import productItem from '@/types/productItem';

@Component({
  components: {
    'product-form': () => import(/* webpackChunkName: "ProductForm" */ '@/components/ProductForm.vue'),
  },
})
export default class ProductList extends Vue {
  productList = JSON.parse(localStorage.getItem('user-products') || '[]');
  headers = [
    {
      text: 'Name',
      align: 'start',
      value: 'name',
    },
    { text: 'Category', value: 'category.title' },
    { text: 'Price', value: 'price' },
    { text: 'Actions', value: 'actions', sortable: false },
  ];
  editedIndex = -1;
  editedItem = {};
  dialogEdit = false;

  public closeForm(): void {
    this.dialogEdit = false;
  }

  public editItem(item: productItem): void {
    this.editedIndex = this.productList.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialogEdit = true;
  }
}
</script>
