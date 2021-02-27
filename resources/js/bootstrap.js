window._ = require('lodash');

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

window.axios = require('axios');
axios.defaults.withCredentials = true;
axios.defaults.baseURL ='https://limitless-journey-59964.herokuapp.com/'
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
