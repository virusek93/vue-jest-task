import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import ProductForm from '@/components/ProductForm.vue';
import VTextFieldWIthValidation from '@/components/inputs/VTextFieldWIthValidation.vue';
import VTextAreaFieldWithValidation from '@/components/inputs/VTextAreaFieldWithValidation.vue';
import VMoneyFieldWithValidation from '@/components/inputs/VMoneyFieldWithValidation.vue';
import VSelectWithValidation from '@/components/inputs/VSelectWithValidation.vue';
import Vuetify from 'vuetify';
import flushPromises from 'flush-promises';
import { Vue } from 'vue-property-decorator';

describe('ProductForm.vue', () => {
  const localVue = createLocalVue();
  let vuetify: object = {};
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  const mountShallowFunction = (options: any) => {
    return shallowMount(ProductForm, {
      localVue,
      vuetify,
      ...options
    });
  };
  const mountFunction = (options: any) => {
    return mount(ProductForm, {
      localVue,
      vuetify,
      stubs: ['vuetify-money'],
      ...options
    });
  };
  it('renders a vue instance', () => {
    const wrapper = mountShallowFunction({});
    expect(wrapper.vm).toBeTruthy();
  });
  it('check if VTextFieldWIthValidation exists', () => {
    const wrapper = mountShallowFunction({});
    expect(wrapper.findComponent(VTextFieldWIthValidation)).toBeTruthy();
  });
  it('check if VTextAreaFieldWithValidation exists', () => {
    const wrapper = mountShallowFunction({});
    expect(wrapper.findComponent(VTextAreaFieldWithValidation)).toBeTruthy();
  });
  it('check if VMoneyFieldWithValidation exists', () => {
    const wrapper = mountShallowFunction({});
    expect(wrapper.findComponent(VMoneyFieldWithValidation)).toBeTruthy();
  });
  it('check if VSelectWithValidation exists', () => {
    const wrapper = mountShallowFunction({});
    expect(wrapper.findComponent(VSelectWithValidation)).toBeTruthy();
  });
  it('check if title prop match', () => {
    const title = 'Edit form';
    const wrapper = mountShallowFunction({
      propsData: {
        title
      }
    });
    expect(wrapper.props('title')).toMatch(title);
  });
  it('check if item data is set', () => {
    const item = {
      category: {
        id: '1',
        title: 'testCategory'
      },
      id: 'test_id',
      description: 'short test desc',
      name: 'test_name',
      price: '500'
    };
    const wrapper = mountShallowFunction({
      propsData: {
        item
      }
    });
    expect((wrapper.vm as any).name).toMatch(item.name);
    expect((wrapper.vm as any).description).toMatch(item.description);
    expect((wrapper.vm as any).price).toMatch(item.price);
    expect((wrapper.vm as any).categoryId).toMatch(item.category.id);
    expect((wrapper.vm as any).productEdit).toEqual(true);
  });
  it('check if form close button emitting event', async () => {
    const wrapper = mountFunction({});
    wrapper.setData({ productEdit: true });
    await wrapper.vm.$nextTick();
    wrapper.find('.v-btn.close').trigger('click');
    expect(wrapper.emitted('close-form')).toBeTruthy();
  });
  it('check if form submit button is disabled', async () => {
    const wrapper = mountFunction({});
    await wrapper.vm.$nextTick();
    const button = wrapper.find('button[type="submit"]');
    expect(button.attributes().disabled).toBeUndefined();
  });
  it('check validation of form with empty input', async () => {
    const wrapper = mountFunction({});
    wrapper.setData({ name: 'Test' });
    await wrapper.vm.$nextTick();
    await flushPromises();
    const errorEl = wrapper.find('.error--text');
    expect(errorEl).toBeTruthy();
  });
  it('valid form data validation', async () => {
    const wrapper = mountFunction({});
    wrapper.setData({ name: 'Test', description: 'test desc', price: '400', categoryId: 1 });
    await wrapper.vm.$nextTick();
    await flushPromises();
    expect(await (wrapper.vm.$refs.observer as Vue & { validate: () => boolean }).validate()).toBeTruthy();
  });
});
