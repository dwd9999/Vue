import {defineStore} from "pinia";
import router from "@/router";
import {
    getTripList,
    showTripDetail,
} from "@/api/trip";

export const tripStore = defineStore("tripPiniaStore", {
    persist: {
        storage: sessionStorage, //쓰고싶은 스토리지(세션 또는 로컬)
    },
    state: () => ({
        trips: null,
        trip: null,
    }),
    getters: {
        checkTrips: (state) => {
            return state.trips;
        },
    },
    actions: {
        async getTrips({selected}) {
            await getTripList(
                {selected},
                ({data}) => {
                    console.log("log test")
                    this.trips = data.list;
                    console.log("3. getTripList data >> ", data);
                },
                async (error) => {
                    console.log("getTripList() error code [] ::: ", error.response.status);
                }
            );
        },

        async getTripDetail(content_id) {
            console.log("content_id: ", content_id);
            await showTripDetail(
                content_id,
                ({data}) => {
                    this.trip = data.trip;
                    console.log("3. getTripDetail data >> ", data);
                },
                async (error) => {
                    console.log("getTripDetail() error code [] ::: ", error.response.status);
                }
            );
        },
    },
});
