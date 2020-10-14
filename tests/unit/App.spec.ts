import { createLocalVue, shallowMount } from '@vue/test-utils';
import App from '@/App.vue';
import Vuetify from 'vuetify';

describe('ProductList.vue', () => {
  const localVue = createLocalVue();
  let vuetify: object = {};
  beforeEach(() => {
    vuetify = new Vuetify();
  });
  const $route = {
    path: '/'
  };
  const mountFunction = (options: any) => {
    return shallowMount(App, {
      localVue,
      vuetify,
      mocks: {
        $route
      },
      stubs: ['router-link', 'router-view'],
      ...options
    });
  };
  it('renders a vue instance', () => {
    const wrapper = mountFunction({});
    expect(wrapper.vm).toBeTruthy();
  });
  it('check if product list link hidden on product list view', () => {
    const wrapper = mountFunction({});
    expect(wrapper.find('router-link-stub[to="/"]').exists()).toBe(false);
  });
  it('check if Home link is present on the product add view', () => {
    const $route = {
      path: '/add'
    };
    const wrapper = mountFunction({
      mocks: {
        $route
      }
    });
    expect(wrapper.find('router-link-stub[to="/"]').exists()).toBe(true);
  });
});
