<template>
  <div>
    <v-list-group v-for="item in items" :key="item.id" :sub-group="!!item.parent" :disabled="!item.subcategories">
      <template v-slot:activator>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </template>
      <categories-list-item :items="item.subcategories" v-if="item.subcategories"></categories-list-item>
    </v-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import categoriesType from '@/types/categoriesType';

@Component
export default class CategoriesListItem extends Vue {
  @Prop({ type: Array }) items!: categoriesType;
}
</script>
