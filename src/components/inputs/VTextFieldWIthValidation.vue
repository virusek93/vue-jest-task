<template>
  <ValidationProvider :name="$attrs.label" :rules="rules" v-slot="{ errors, valid }">
    <v-text-field
      v-model="innerValue"
      :error-messages="errors"
      :success="valid"
      v-bind="$attrs"
      v-on="$listeners"
    ></v-text-field>
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
  @Prop({ required: true, type: String }) readonly value!: string;

  innerValue = '';

  @Watch('innerValue')
  innerValueChange(newVal: string): void {
    this.$emit('input', newVal);
  }
  @Watch('value')
  valueChange(newVal: string): void {
    this.innerValue = newVal;
  }
  mounted(): void {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
}
</script>
