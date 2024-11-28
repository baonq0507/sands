import { createLogger, createStore } from "vuex";

const store = createStore({
    state() {
        return {
            count: 0,
            menus: [
                {
                    title: "Dashboard",
                    icon: "mdi-view-dashboard",
                    to: "/",
                },
            ]
        };
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        setMenus(state, payload) {
            state.menus = payload;
        },
    },
    actions: {
        increment(context) {
            context.commit("increment");
        },
    },
    plugins: import.meta.env.MODE !== "production" ? [createLogger()] : [],
});

export default store;