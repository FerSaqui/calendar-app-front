import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: "ui",
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        onOpenDateModal: ( state ) => {
            state.isDateModalOpen = true; //Genera un nuevo state
        },
        onCloseDateModal: ( state ) => {
            state.isDateModalOpen = false
        }
    }
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;