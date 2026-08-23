import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// =====================================================
// TRANSACTION TYPE
// =====================================================

export type TransactionType =
  | "sale"
  | "rent"
  | "mortgage"
  | "rent-mortgage"
  | "booking";

// =====================================================
// SEARCH STATE
// =====================================================

interface SearchPropertiesState {
  destination: string;

  checkIn: string;

  checkOut: string;

  guests: string;

  type: TransactionType;
}

// =====================================================
// INITIAL STATE
// =====================================================

const initialState: SearchPropertiesState = {
  destination: "",

  checkIn: "",

  checkOut: "",

  guests: "",

  type: "sale",
};

// =====================================================
// SLICE
// =====================================================

const searchPropertiesSlice = createSlice({
  name: "searchProperties",

  initialState,

  reducers: {
    // DESTINATION

    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },

    // CHECK IN

    setCheckIn: (state, action: PayloadAction<string>) => {
      state.checkIn = action.payload;
    },

    // CHECK OUT

    setCheckOut: (state, action: PayloadAction<string>) => {
      state.checkOut = action.payload;
    },

    // GUESTS

    setGuests: (state, action: PayloadAction<string>) => {
      state.guests = action.payload;
    },

    // TRANSACTION TYPE

    setType: (state, action: PayloadAction<TransactionType>) => {
      const previousType = state.type;

      state.type = action.payload;

      // اگر از رزرو رفت روی خرید/اجاره
      // اطلاعات رزرو پاک شود

      if (previousType === "booking" && action.payload !== "booking") {
        state.checkIn = "";

        state.checkOut = "";

        state.guests = "";
      }
    },

    // CLEAR DATES

    clearDates: (state) => {
      state.checkIn = "";

      state.checkOut = "";

      state.guests = "";
    },

    // RESET

    resetSearch: (state) => {
      state.destination = "";

      state.checkIn = "";

      state.checkOut = "";

      state.guests = "";

      state.type = "sale";
    },
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  setDestination,

  setCheckIn,

  setCheckOut,

  setGuests,

  setType,

  clearDates,

  resetSearch,
} = searchPropertiesSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default searchPropertiesSlice.reducer;
