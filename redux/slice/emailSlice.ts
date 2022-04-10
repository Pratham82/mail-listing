import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { Status } from '../constant'
import { ISelectedEmail } from '../../types'

export const getAllEmails = createAsyncThunk(
  'email/getAllEmails',
  async (payload: any, thunkApi) => {
    try {
      const data = await axios.get(
        `https://flipkart-email-mock.vercel.app/?page=${payload}`
      )
      return data.data
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue(error)
    }
  }
)

export const getEmail = createAsyncThunk(
  'email/getEmail',
  async (payload: any, thunkApi) => {
    const { id, name, subject, date } = payload
    try {
      const data = await axios.get(
        `https://flipkart-email-mock.vercel.app/?id=${id}`
      )

      return { ...data.data, id, name, subject, date }
    } catch (error) {
      console.log(error)
      return thunkApi.rejectWithValue(error)
    }
  }
)

const selectedEmail: ISelectedEmail = {
  id: '',
  name: '',
  body: '',
  subject: '',
  date: '',
}

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    list: [],
    total: 0,
    status: '',
    emailStatus: '',
    favorites: [],
    read: [],
    category: 'Unread',
    selectedEmail,
  },
  reducers: {
    removeSelectedEmail(state) {
      state.selectedEmail.id = ''
    },

    addToFavorites(state, action: PayloadAction<object>) {
      state.favorites = [...state.favorites, action.payload]
    },

    addToRead(state, action) {
      state.read = [...state.read, action.payload]
    },

    setCurrentCategory(state, action: PayloadAction<string>) {
      state.category = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllEmails.pending, state => {
      state.status = Status.PENDING
    })
    builder.addCase(getAllEmails.fulfilled, (state, { payload }) => {
      state.status = Status.FULFILLED
      state.list = payload.list
      state.total = payload.total
    })
    builder.addCase(getAllEmails.rejected, state => {
      state.status = Status.REJECTED
    })

    builder.addCase(getEmail.pending, state => {
      state.emailStatus = Status.PENDING
    })
    builder.addCase(getEmail.fulfilled, (state, { payload }) => {
      state.emailStatus = Status.FULFILLED
      state.selectedEmail = payload
    })
    builder.addCase(getEmail.rejected, state => {
      state.emailStatus = Status.REJECTED
    })
  },
})

export const {
  removeSelectedEmail,
  addToFavorites,
  addToRead,
  setCurrentCategory,
} = emailSlice.actions

export default emailSlice.reducer
