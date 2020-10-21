<template>
  <ValidationProvider :name="$attrs.label" :rules="rules" v-slot="{ errors, valid }">
    <v-select
      v-model="innerValue"
      :error-messages="errors"
      :success="valid"
      v-bind="$attrs"
      v-on="$listeners"
    ></v-select>
  </ValidationProvider>
</template>

<script lang="ts">
import { ValidationProvider } from 'vee-validate';
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
@Component({
  components: {
    ValidationProvider,
  },
})
export default class VTextFieldWIthValidation extends Vue {
  @Prop({ required: true, type: String }) readonly rules!: string;
  @Prop({ required: true, type: [String, Number] }) readonly value!: string | number;

  innerValue: string | number = '';

  @Watch('innerValue')
  innerValueChange(newVal: string | number): void {
    this.$emit('input', newVal);
  }
  @Watch('value')
  valueChange(newVal: string | number): void {
    this.innerValue = newVal;
  }
  mounted(): void {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
}
</script>
