import Vue from 'vue';
import singleSpaVue from 'single-spa-vue';
//import vuetify from './plugins/vuetify';

//import '@babel/polyfill'
//import vuetify from 'vuetify/lib'
//import App from './App.vue'
//import Search from './Search.vue'

import Search from './Search.vue'

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#vue',
    render: r => r(Search),
  } 
});

/*Vue.config.productionTip = false;

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    vuetify: vuetify,
    render(h) {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa,
        },
      });
    },
  },
});*/

export const { bootstrap, mount, unmount } = vueLifecycles