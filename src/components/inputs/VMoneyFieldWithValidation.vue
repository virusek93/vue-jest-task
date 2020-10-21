<template>
  <ValidationProvider :name="$attrs.label" :rules="rules" v-slot="{ errors, valid }">
    <vuetify-money
      v-model="innerValue"
      :error-messages="errors"
      :success="valid"
      v-bind="$attrs"
      v-on="$listeners"
    ></vuetify-money>
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
export default class VMoneyFieldWithValidation extends Vue {
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

<style lang="scss">
div[success='true'] {
  .v-input {
    color: #4caf50 !important;
    caret-color: #4caf50 !important;

    .v-input__slot {
      &:before {
        border-color: #4caf50 !important;
      }
    }

    .v-label {
      color: #4caf50 !important;
    }
  }
}
</style>
