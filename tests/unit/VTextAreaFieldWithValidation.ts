import { createLocalVue, mount } from '@vue/test-utils';
import VTextAreaFieldWithValidation from '@/components/inputs/VTextAreaFieldWithValidation.vue';
import Vuetify from 'vuetify';

describe('VTextFieldWIthValidation.vue', () => {
  const localVue = createLocalVue();
  let vuetify: object = {};
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  const mountFunction = (options: any) => {
    return mount(VTextAreaFieldWithValidation, {
      localVue,
      vuetify,
      ...options
    });
  };
  it('check if value proper set innerValue', () => {
    const value = 'test';
    const rules = 'required';
    const wrapper = mountFunction({
      propsData: {
        value,
        rules
      }
    });
    expect((wrapper.vm as any).innerValue).toEqual(value);
  });
  it('check if input value change', () => {
    const value = 'test';
    const rules = 'required';
    const wrapper = mountFunction({
      propsData: {
        value,
        rules
      }
    });
    wrapper.find('input').setValue('hi');
    expect((wrapper.vm as any).innerValue).toEqual('hi');
  });
  it('check if error shows up on empty required field', () => {
    const value = 'test';
    const rules = 'required';
    const wrapper = mountFunction({
      propsData: {
        value,
        rules
      }
    });
    wrapper.setData({ innerValue: '' });
    const errorEl = wrapper.find('.error--text');
    expect(errorEl).toBeTruthy();
  });
});
