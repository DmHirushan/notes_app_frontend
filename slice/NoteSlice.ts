import {NotesModel} from "../modal/NoteModel";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState: NotesModel[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1/notes"
});

export const saveNote = createAsyncThunk(
    'note/saveNote',
    async (note: NotesModel) => {
        try {
            const response = await api.post('/createNote', note);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const deleteNote = createAsyncThunk(
    'note/removeNote',
    async (id: string) => {
        try {
            const response = await api.delete(`/deleteNote/${id}`);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const getAllNotes = createAsyncThunk(
  'note/getAllNotes',
  async () => {
      try {
          const response = await api.get('/getAll');
          return response.data;
      }catch (error) {
          return console.log('error', error)
      }
  } 
);



const NoteSlice = createSlice({
    name: 'note',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(saveNote.fulfilled, (state, action) => {
            state.push(action.payload)
            alert("Note saved successfully!")
        })

        builder.addCase(deleteNote.fulfilled, (state, action) => {
            alert("Note deleted successfully!")
        })

        builder
            .addCase(getAllNotes.pending , (state) => {

            })
            .addCase(getAllNotes.fulfilled , (state , action) => {
                return action.payload.notes;
            })
            .addCase(getAllNotes.rejected , (state , action) => {

            })


    }
})

export default NoteSlice.reducer;