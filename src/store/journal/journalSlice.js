import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   isSaving: false,
   messageSaved: '',
   notes: [],
   active: null,
//    active: {
//       id: '123',
//       title: '',
//       body: '',
//       date: new Date().getTime(),
//       imageUrl: [], //Arreglo de url
//    },
}

export const journalSlice = createSlice({
   name: 'journal',
   initialState,
   reducers: {

        savingNewNote: (state) => {
            state.isSaving = true
        },

      addNewEmptyNote: (state, action) => {
         state.notes.push( action.payload )
         state.isSaving = false
      },
        setActiveNote: (state, action) => {
             state.active = action.payload
             state.messageSaved = ''  
        },
        setNotes: (state, action) => {
            state.notes = action.payload   
        },
        setSaving: (state) => {
            state.isSaving = true
            state.messageSaved = ''  
        },
        updateNote: (state, action) => {
           state.isSaving = false
           state.notes = state.notes.map( 
            note => note.id === action.payload.id ? action.payload : note )
            // Esto es una funcion que recibe un note y si el id del note es igual al id del payload
            // entonces se actualiza el note con el payload, si no se retorna el note sin cambios

            state.messageSaved = `${action.payload.title}, actualizada correctamente`
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
            state.isSaving = false
        },
        clearNotesLogout: (state) => {
            state.isSaving = false
            state.messageSaved = ''
            state.notes = []
            state.active = null
        },
        deleteNoteById: (state, action) => {
            state.isSaving = false
            state.active = null
            state.notes = state.notes.filter( note => note.id !== action.payload)
            // Filtra los notes que no sean iguales al id del payload y los deja en el arreglo
            
        }
   },
})

export const {
             addNewEmptyNote,
             savingNewNote,
             setActiveNote,
             setNotes,
             setSaving,
             updateNote,
             setPhotosToActiveNote,
             clearNotesLogout,
             deleteNoteById
             } = journalSlice.actions;