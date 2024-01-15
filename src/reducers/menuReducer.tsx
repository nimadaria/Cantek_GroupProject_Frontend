import { Dispatch, createSlice } from "@reduxjs/toolkit";
import { IMenuComponentState } from "../models/component/menu.component";
import { ISection } from "../models/api/section.api.interface";
import sectionService from "../services/sectionService";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    isActive: false,
    sections: [] as ISection[],
  } as IMenuComponentState,
  reducers: {
    menuNegateActive(state) {
      return { ...state, isActive: !state.isActive };
    },
    setSections(state, action) {
      return { ...state, sections: action.payload };
    },
  },
});

export const { menuNegateActive, setSections } = menuSlice.actions;

export const initializeMenu = () => {
  return async (dispatch: Dispatch) => {
    const sections = await sectionService.getAll();
    dispatch(setSections(sections));
  };
};

export default menuSlice.reducer;
