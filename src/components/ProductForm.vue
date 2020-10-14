<template>
  <v-container>
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-toolbar>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <v-form class="mt-6">
        <VTextFieldWIthValidation v-model="name" label="Name" rules="required"></VTextFieldWIthValidation>
        <VTextAreaFieldWithValidation
          v-model="description"
          label="Description"
          rules="required"
        ></VTextAreaFieldWithValidation>
        <v-row>
          <v-col>
            <VMoneyFieldWithValidation
              v-model="price"
              label="Price"
              rules="required"
              :options="{ suffix: 'zł', length: 6, precision: 2, masked: true }"
            ></VMoneyFieldWithValidation>
          </v-col>
          <v-col>
            <VSelectWithValidation
              v-model="categoryId"
              :items="categories"
              item-text="title"
              item-value="id"
              label="Category"
              rules="required"
            ></VSelectWithValidation>
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
import VTextFieldWIthValidation from '@/components/inputs/VTextFieldWIthValidation.vue';
import VTextAreaFieldWithValidation from '@/components/inputs/VTextAreaFieldWithValidation.vue';
import VMoneyFieldWithValidation from '@/components/inputs/VMoneyFieldWithValidation.vue';
import VSelectWithValidation from '@/components/inputs/VSelectWithValidation.vue'; // @ is an alias to /src
import productItem from '@/types/productItem';

@Component({
  components: {
    VSelectWithValidation,
    VMoneyFieldWithValidation,
    VTextAreaFieldWithValidation,
    VTextFieldWIthValidation,
    ValidationObserver
  }
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

  mounted() {
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
  closeForm() {
    this.productEdit = true;
  }

  public handleSubmit(): void {
    if ((this.$refs.observer as Vue & { validate: () => boolean }).validate()) {
      this.saveProduct();
      this.snackBarText = `Your product ${name} was saved`;
      this.showSnackBar = true;
      this.clearForm();
      this.closeForm();
    }
  }

  private saveProduct(): void {
    const items = JSON.parse(localStorage.getItem('user-products') || '[]');
    const { name, description, price, categoryId } = this;
    const category = this.categories.find(cat => cat.id == categoryId);
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
        category: { id: categoryId, title: categoryTitle }
      };
      localStorage.setItem('user-products', JSON.stringify(items));
      return;
    }
    items.push({ id, name, description, price, category: { id: categoryId, title: categoryTitle } });
    localStorage.setItem('user-products', JSON.stringify(items));
  }

  private clearForm(): void {
    this.name = this.description = this.price = this.categoryId = '';
    requestAnimationFrame(() => {
      (this.$refs.observer as Vue & { reset: () => {} }).reset();
    });
  }
}
</script>
