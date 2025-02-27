import {UserModel} from "../modal/UserModal";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
    jwtToken: null,
    refreshToken: null,
    userId: null,
    isAuthenticated: false,
    error: "",
}

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1/auth",
})

export const register = createAsyncThunk(
    'user/register',
    async (user: UserModel) => {
        try {
            const response = await api.post('/signup', user);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const login = createAsyncThunk(
    'user/login',
    async (user : {email : string, password : string}) => {
        try {
            const response = await api.post('/signin', user);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.jwtToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userId = action.payload._id;
            state.isAuthenticated = true;
            alert("User registered successfully!")
        })

        builder.addCase(login.fulfilled, (state, action) => {
            state.jwtToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userId = action.payload._id;
            state.isAuthenticated = true;
            alert("Logged in!");
        })
    }
})

export default userSlice.reducer;