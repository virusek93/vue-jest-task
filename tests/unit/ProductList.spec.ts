import { createLocalVue, mount } from '@vue/test-utils';
import ProductList from '@/components/ProductList.vue';
import ProductForm from '@/components/ProductForm.vue';
import Vuetify from 'vuetify';

describe('ProductList.vue', () => {
  const localVue = createLocalVue();
  let vuetify: object = {};
  const itemsExample = [
    {
      category: {
        id: '1',
        title: 'testCategory'
      },
      id: 'test_id',
      description: 'short test desc',
      name: 'test_name',
      price: '500'
    },
    {
      category: {
        id: '1',
        title: 'testCategory'
      },
      id: 'test_id2',
      description: 'short test desc2',
      name: 'test_name2',
      price: '5002'
    }
  ];

  beforeEach(() => {
    vuetify = new Vuetify();
  });
  const mountFunction = (options: any) => {
    return mount(ProductList, {
      localVue,
      vuetify,
      ...options,
      stubs: ['vuetify-money']
    });
  };
  it('renders a vue instance', () => {
    const wrapper = mountFunction({});
    expect(wrapper.vm).toBeTruthy();
  });
  it('renders a list if data is present', async () => {
    const wrapper = mountFunction({});
    await wrapper.setData({ productList: itemsExample });
    expect(wrapper.findAll('tbody > tr').length).toEqual(itemsExample.length);
  });
  it('check if edit button is opening a edit modal', async () => {
    const wrapper = mountFunction({});
    await wrapper.setData({ productList: itemsExample });
    const button = wrapper.find('tbody > tr button');
    button.trigger('click');

    expect((wrapper.vm as any).dialogEdit).toBeTruthy();
    expect((wrapper.vm as any).editedItem).toEqual(itemsExample[0]);
  });
  it('check if ProductForm exists', () => {
    const wrapper = mountFunction({});
    expect(wrapper.findComponent(ProductForm)).toBeTruthy();
  });
});
