import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)


const opts = {}



export default new Vuetify({
    rtl:true,
    theme: {
        themes: {
          light: {
            primary: '#395177',
            secondary: '#328AF1',
            accent: '#97A6BC',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
          },
        },
      },
});
