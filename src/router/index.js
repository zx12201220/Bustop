import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store/index.js";
import Home from "../views/home/Home.vue";
import SearchPlan from "../views/home/SearchPlan.vue";
import SearchBus from "../views/home/SearchBus.vue";
import RoutePlanMain from "../views/routePlan/Main.vue";
import RoutePlan from "../views/routePlan/RoutePlan.vue";
import BusStation from "../views/routePlan/BusStation.vue";
import RouteResult from "../views/routePlan/Result.vue";
import BusTimeMain from '../views/busTime/Main.vue';
import BusTime from '../views/busTime/BusTime.vue';
import BusResult from '../views/busTime/BusResult.vue';
const routes = [
    {
        path: "/",
        component: Home,
        children: [
            {
                path: "/searchPlan",
                component: SearchPlan,
            },
            {
                path: "/searchBus",
                component: SearchBus,
            },
        ],
    },
    {
        component: RoutePlanMain,
        children: [
            {
                path: "/routePlan",
                component: RoutePlan,
            },
            {
                path: "/busStation",
                component: BusStation,
            },
            {
                path: "/routeResult",
                component: RouteResult,
            },
        ],
    },
    {
        component: BusTimeMain,
        children: [
            {
                path: "/busTime",
                component: BusTime,
            },
            {
                path: "/busResult",
                component: BusResult,
                beforeEnter: (to, from, next) => {
                    if (store.state.searchBusRoute.location === '') {
                        next({ path: "/busTime" });
                    } else {
                        next();
                    }
                },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
