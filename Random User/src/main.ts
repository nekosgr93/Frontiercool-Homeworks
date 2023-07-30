import { createApp } from 'vue';
import './style.css';
import { createPinia } from 'pinia';
import App from './App.vue';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import {
  faSort,
  faGrip,
  faList,
  faChevronRight,
  faChevronLeft,
  faHeart as fasHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as fagHeart } from '@fortawesome/free-regular-svg-icons';
import { router } from './routers/root-router';

/* add icons to the library */
library.add(faSort, faGrip, faList, faChevronLeft, faChevronRight, fasHeart, fagHeart);
const pinia = createPinia();

createApp(App).use(pinia).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
