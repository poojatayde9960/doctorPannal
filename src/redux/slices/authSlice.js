import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";
const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        admin: (() => {
            try {
                const stored = localStorage.getItem("admin");
                if (!stored || stored === "undefined") return null;
                return JSON.parse(stored);
            } catch (e) {
                console.warn("The admin data in LocalStorage is corrupted, clearing it…", e);
                localStorage.removeItem("admin");
                return null;
            }
        })(),
    },
    reducers: {
        logout: (state) => {
            state.admin = null;
            localStorage.removeItem("admin");
            localStorage.removeItem("token");
        },
    },

    extraReducers: (builder) =>
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
                console.log("LOGIN SUCCESS – payload:", payload);

                state.admin = payload.doctor || null;

                if (state.admin) {
                    localStorage.setItem("admin", JSON.stringify(state.admin));
                    console.log("ADMIN (from doctor) SAVED:", state.admin);
                } else {
                    console.error("Doctor field not found!");
                }
            })
            .addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, { payload }) => {
                state.admin = payload.doctor || null;
                if (state.admin) {
                    localStorage.setItem("admin", JSON.stringify(state.admin));
                }
            }),
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
