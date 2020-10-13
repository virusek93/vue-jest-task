<template>
  <ValidationProvider :name="$attrs.label" :rules="rules" v-slot="{ errors, valid }">
    <v-textarea
      v-model="innerValue"
      :error-messages="errors"
      :success="valid"
      v-bind="$attrs"
      v-on="$listeners"
    ></v-textarea>
  </ValidationProvider>
</template>

<script lang="ts">
import { ValidationProvider } from 'vee-validate';
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
@Component({
  components: {
    ValidationProvider
  }
})
export default class VTextAreaFieldWithValidation extends Vue {
  @Prop({ required: true, type: String }) readonly rules!: string;
  @Prop({ required: true, type: String }) readonly value!: string;

  innerValue = '';

  @Watch('innerValue')
  innerValueChange(newVal: string) {
    this.$emit('input', newVal);
  }
  @Watch('value')
  valueChange(newVal: string) {
    this.innerValue = newVal;
  }
  mounted() {
    if (this.value) {
      this.innerValue = this.value;
    }
  }
}
</script>
