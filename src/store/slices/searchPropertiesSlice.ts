import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchPropertiesState {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  type: "buy" | "rent" | "selling";
}

const initialState: SearchPropertiesState = {
  destination: "",
  checkIn: "",
  checkOut: "",
  guests: "",
  type: "buy",
};

const searchPropertiesSlice = createSlice({
  name: "searchProperties",
  initialState,
  reducers: {
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },

    setCheckIn: (state, action: PayloadAction<string>) => {
      state.checkIn = action.payload;
    },

    setCheckOut: (state, action: PayloadAction<string>) => {
      state.checkOut = action.payload;
    },

    setGuests: (state, action: PayloadAction<string>) => {
      state.guests = action.payload;
    },

    setType: (state, action: PayloadAction<"buy" | "rent" | "selling">) => {
      state.type = action.payload;
    },

    resetSearch: (state) => {
      state.destination = "";
      state.checkIn = "";
      state.checkOut = "";
      state.guests = "";
      state.type = "buy";
    },
  },
});

export const {
  setDestination,
  setCheckIn,
  setCheckOut,
  setGuests,
  setType,
  resetSearch,
} = searchPropertiesSlice.actions;

export default searchPropertiesSlice.reducer;
