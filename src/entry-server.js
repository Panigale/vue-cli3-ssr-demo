import Vue from 'vue';
import App from './App.vue';
import createRouter from './router';

Vue.config.productionTip = false;

function createApp() {
    const router = createRouter();
    const app = new Vue({
        router,
        render: h => h(App),
    });
    return { app, router };
}


export default context => {
    return new Promise((resolve, reject) => {
        const { app, router } = createApp()

        router.push(context.url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()

            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            resolve(app)
        }, reject)
    })
}