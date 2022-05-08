import { createStore } from "vuex";
// 創建store
const store = createStore({
    state: {
        isLoading: false,
        windowWidth: 0,
        gps: [],
        mapCenter: [23.97565, 120.9738819],
        selectLocation: 'Taichung',
        location: '',
        locationEn:'',
        searchBusRoute: {
            location: '',
            routeName: '',
            OperatorName: '',
            startStop: '',
            endStop: '',
        },
        startStopOfRoute: [],
        endStopOfRoute: [],
        busPageActiveIndex: 0,
        startLine: null,
        endLine: null,
        isMobileShow: false,
        nearBusStop: [],
        nearBusStopActiveIndex: 0,
    },
    mutations: {
        setLoading(state, data) {
            state.isLoading = data;
        },
        setWindowWidth(state, data) {
            state.windowWidth = data;
        },
        setGps(state, data) {
            state.gps = data;
        },
        setMapCenter(state, data) {
            state.mapCenter = data
        },
        setSelectLocation(state, data) {
            state.selectLocation = data
        },
        setLocation(state, data) {
            state.location = data;
        },
        setLocationEn(state, data) {
            state.locationEn = data;
        },
        setSearchBusRoute(state, data) {
            state.searchBusRoute = data;
        },
        setStartStopOfRoute(state, data) {
            state.startStopOfRoute = data;
        },
        setEndStopOfRoute(state, data) {
            state.endStopOfRoute = data;
        },
        setBusPageActiveIndex(state, data) {
            state.busPageActiveIndex = data;
        },
        setStartLine(state, data) {
            state.startLine = data;
        },
        setEndLine(state, data) {
            state.endLine = data;
        },
        setisMobileShow(state, data) {
            state.isMobileShow = data;
        },
        setNearBusStop(state, data) {
            state.nearBusStop = data;
        },
        setNearBusStopActiveIndex(state, data) {
            state.nearBusStopActiveIndex = data;
        },
    },
    getters: {
        windowWidth: state => state.windowWidth,
    },

});

//導出store
export default store