import { createLocalVue, mount } from '@vue/test-utils';
import Categories from '@/components/CategoriesList.vue';
import Vuetify from 'vuetify';

describe('ProductList.vue', () => {
  const localVue = createLocalVue();
  let vuetify: object = {};
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  const mountFunction = (options: any) => {
    return mount(Categories, {
      localVue,
      vuetify,
      ...options
    });
  };
  it('renders a vue instance', () => {
    const wrapper = mountFunction({});
    expect(wrapper.vm).toBeTruthy();
  });
  it('load categories', async () => {
    const wrapper = mountFunction({});
    expect((wrapper.vm as any).categories.length).not.toEqual(0);
  });
  it('render categories', async () => {
    const wrapper = mountFunction({});
    expect(wrapper.find('.v-list-group').exists());
  });
});
