import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from '../../api/const';

const initialState = {
  loading: false,
  currencyMy: [],
  error: '',
  errorExch: '',
};

export const currencyMyRequestAsync = createAsyncThunk(
  'currencies-my',
  (_, {getState}) => {
    const token = getState().auth.token;

    return fetch(`${API_URL}/currencies`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`,
      },
    })
      .then(data => data.json())
      .then(data => data.payload)
      .catch(err => ({error: err.toString()}));
  }
);

export const exchangeRequestAsync = createAsyncThunk(
  'currency-buy',
  async (data, {getState}) => {
    const token = getState().auth.token;
    try {
      const response = await fetch(`${API_URL}/currency-buy`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (e) {
      return e.message;
    }
  }
);

export const exchangeSlice = createSlice({
  name: 'currency-my',
  initialState,
  reducers: {
    updateCurrencyMy: (state, action) => {
      state.currencyMy = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(currencyMyRequestAsync.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(currencyMyRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currencyMy = action.payload;
        state.error = '';
      })
      .addCase(currencyMyRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export const {updateCurrencyMy} = exchangeSlice.actions;
export default exchangeSlice.reducer;
