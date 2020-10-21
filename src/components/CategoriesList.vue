<template>
  <div>
    <v-card class="mx-auto text-left" width="400">
      <v-card-title>Categories</v-card-title>
      <v-list class="categories-list">
        <categories-list-item :items="categories"></categories-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import categoriesJson from '@/categories.json';
import categoriesType from '@/types/categoriesType';
import CategoriesListItem from '@/components/CategoriesListItem.vue';
@Component({
  components: { CategoriesListItem },
})
export default class CategoriesList extends Vue {
  categories: Array<categoriesType> = [];

  mounted(): void {
    this.categories = this.getCategories();
  }

  private getCategories(): Array<categoriesType> {
    const categories = categoriesJson.categories;
    const dataTree: Array<categoriesType> = [];
    if (!categories || !categories.length) {
      return dataTree;
    }
    const hashTable = Object.create(null);
    categories.forEach((aData) => (hashTable[aData.id] = { ...aData }));
    categories.forEach((aData) => {
      if (aData.parent) {
        if (!hashTable[aData.parent].subcategories) {
          hashTable[aData.parent].subcategories = [];
        }
        hashTable[aData.parent].subcategories.push(hashTable[aData.id]);
        return;
      }
      dataTree.push(hashTable[aData.id]);
    });
    return dataTree;
  }
}
</script>

<style lang="scss">
.categories-list {
  .v-list-group--disabled {
    div[role='button'] {
      pointer-events: none;
    }

    .v-icon {
      display: none !important;
    }
  }
}
</style>
