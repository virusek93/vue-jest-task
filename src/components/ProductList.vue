<template>
  <v-container>
    <v-data-table :headers="headers" :items="productList" sort-by="calories" class="elevation-1">
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogEdit" max-width="800px">
      <v-card class="pa-5">
        <product-form :item="editedItem" title="Edit Form"></product-form>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { Component, Emit, Vue } from 'vue-property-decorator';
import ProductAddForm from '@/components/ProductForm.vue';
import ProductForm from '@/components/ProductForm.vue';
import productItem from '@/types/productItem';

@Component({
  components: {
    ProductForm,
    ProductAddForm
  }
})
export default class ProductList extends Vue {
  productList = JSON.parse(localStorage.getItem('user-products') || '[]');
  search = '';
  headers = [
    {
      text: 'Name',
      align: 'start',
      value: 'name'
    },
    { text: 'Category', value: 'category.title' },
    { text: 'Price', value: 'price' },
    { text: 'Actions', value: 'actions', sortable: false }
  ];
  editedIndex = -1;
  editedItem = {};
  dialogEdit = false;
  dialogDelete = false;

  @Emit('closeForm')
  closeForm() {
    this.dialogEdit = false;
  }

  public editItem(item: productItem): void {
    this.editedIndex = this.productList.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialogEdit = true;
  }

  public closeDelete(): void {
    this.dialogDelete = false;
    this.$nextTick(() => {
      this.editedIndex = -1;
    });
  }
  public deleteItemConfirm(): void {
    this.productList.splice(this.editedIndex, 1);
    this.closeDelete();
  }
}
</script>
