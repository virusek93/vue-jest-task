<template>
  <v-container>
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-form class="mt-6">
        <v-text-field-with-validation v-model="name" label="Name" rules="required"></v-text-field-with-validation>
        <v-text-area-field-with-validation
          v-model="description"
          label="Description"
          rules="required"
        ></v-text-area-field-with-validation>
        <v-row>
          <v-col>
            <v-money-with-validation
              v-model="price"
              label="Price"
              rules="required"
              :options="{ suffix: 'zł', length: 6, precision: 2, masked: true }"
            ></v-money-with-validation>
          </v-col>
          <v-col>
            <v-select-with-validation
              v-model="categoryId"
              :items="categories"
              item-text="title"
              item-value="id"
              label="Category"
              rules="required"
            ></v-select-with-validation>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions class="justify-space-between mt-5 px-0">
        <v-btn color="primary" @click="handleSubmit" :disabled="invalid" type="submit">{{ submitBtnText }}</v-btn>
        <v-btn @click="closeForm" v-if="productEdit" class="close">Cancel</v-btn>
      </v-card-actions>
    </validation-observer>
    <v-snackbar dark right top v-model="showSnackBar" timeout="3000">{{ snackBarText }}</v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import { ValidationObserver } from 'vee-validate';
import categoriesJson from '@/categories.json';
import productItem from '@/types/productItem';

@Component({
  components: {
    'v-select-with-validation': () =>
      import(/* webpackChunkName: "VSelectWithValidation" */ '@/components/inputs/VSelectWithValidation.vue'),
    'v-money-with-validation': () => import('@/components/inputs/VMoneyFieldWithValidation.vue'),
    'v-text-area-field-with-validation': () => import('@/components/inputs/VTextAreaFieldWithValidation.vue'),
    'v-text-field-with-validation': () => import('@/components/inputs/VTextFieldWIthValidation.vue'),
    ValidationObserver,
  },
})
export default class ProductForm extends Vue {
  @Prop({ type: Object }) readonly item!: productItem;
  @Prop({ default: 'Product add form', type: String }) readonly title!: string;
  name = '';
  description = '';
  price = '';
  categoryId: string | number = '';
  showSnackBar = false;
  snackBarText = '';
  productEdit = false;
  submitBtnText = 'Add Item';
  categories = categoriesJson.categories ? categoriesJson.categories : [];

  mounted(): void {
    if (this.item) {
      const { name, description, price, category } = this.item;
      this.productEdit = true;
      this.submitBtnText = 'Edit Item';
      this.name = name;
      this.description = description;
      this.price = price;
      this.categoryId = category.id;
    }
  }

  @Emit()
  closeForm(): void {
    this.productEdit = true;
  }

  public handleSubmit(): void {
    if ((this.$refs.observer as Vue & { validate: () => boolean }).validate()) {
      if (this.saveProduct()) {
        this.snackBarText = `Your product ${name} was saved`;
        this.showSnackBar = true;
        this.clearForm();

        if (this.productEdit) {
          this.closeForm();
        }
      }
    }
  }

  private saveProduct(): boolean {
    const items = JSON.parse(localStorage.getItem('user-products') || '[]');
    const { name, description, price, categoryId } = this;
    const category = this.categories.find((cat) => cat.id == categoryId);
    const categoryTitle = category && category.title ? category.title : '';
    const id = `${name}_${Math.random()}`;
    if (this.productEdit) {
      const editProductId = this.item.id;
      const productIndex = items.find((product: productItem) => product.id === editProductId);
      items[productIndex] = {
        editProductId,
        name,
        description,
        price,
        category: { id: categoryId, title: categoryTitle },
      };
      localStorage.setItem('user-products', JSON.stringify(items));
      const updated = JSON.parse(localStorage.getItem('user-products') || '[]');
      return updated === JSON.stringify(items);
    }
    items.push({ id, name, description, price, category: { id: categoryId, title: categoryTitle } });
    localStorage.setItem('user-products', JSON.stringify(items));
    const updated = localStorage.getItem('user-products');
    return updated === JSON.stringify(items);
  }

  private clearForm(): void {
    this.name = this.description = this.price = this.categoryId = '';
    requestAnimationFrame(() => {
      (this.$refs.observer as Vue & { reset: () => void }).reset();
    });
  }
}
</script>
