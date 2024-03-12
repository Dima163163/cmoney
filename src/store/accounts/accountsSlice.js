import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URL} from '../../api/const';

const initialState = {
  accounts: [],
  loading: false,
  error: '',
};

export const accountsRequestAsync = createAsyncThunk(
  'accounts/fetch',
  (token) => fetch(`${API_URL}/accounts`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${token}`,
    },
  })
    .then(data => data.json())
    .then(data => (data.payload))
    .catch(error => ({error}))
);

export const createNewAccount = createAsyncThunk(
  'accounts/create-account',
  (token) => fetch(`${API_URL}/create-account`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
    },
  })
    .then(data => data.json())
    .then(data => data.payload)
    .catch(error => ({error}))
);

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    groupBy: (state, action) => {
      const value = action.payload.value;
      const sortAcc = [...state.accounts];
      if (value === 'transaction') {
        sortAcc.sort((a, b) => (a[value][0]?.date >
          b[value][0]?.date ? -1 : 1));
      } else {
        sortAcc.sort((a, b) => (a[value] > b[value] ? 1 : -1));
      }
      state.accounts = sortAcc;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(accountsRequestAsync.pending, (state) => {
        state.loading = true;
        state.accounts = [];
        state.error = '';
      })
      .addCase(accountsRequestAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload;
        state.error = '';
      })
      .addCase(accountsRequestAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewAccount.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(createNewAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = [...state.accounts, action.payload];
        state.error = '';
      })
      .addCase(createNewAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {groupBy} = accountsSlice.actions;
export default accountsSlice.reducer;
