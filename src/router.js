import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/HomePage';
import axios from 'axios';

Vue.use(VueRouter);

const temas = ['tema1.json', 'tema2.json', 'tema3.json'];
let router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/home', component: HomePage, name: 'home' }
    ]
});

router.beforeEach(async (to, from, next) => {
    
    try {
        let {tema} = to.query;
        let key    = Object.keys(temas).filter(i => i === tema)[0] || 0;
        let page   = temas[key];
        
        let {data} = await axios.get(page);
        console.log(tema, page)
        console.log(data.page)
        next()
    } catch(e) {
        console.log('não foi possível recuperar os dados')
    }
    
})

export default router;