import {collection, deleteDoc, doc, setDoc} from 'firebase/firestore/lite'
import { FirebaseDb } from '../../firebase/config'
import { addNewEmptyNote, deleteNoteById, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './';
import { loadNotes } from '../../helpers/loadNotes';
import { fileUpload } from '../../helpers/fileUpload';

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving())

        const { uid } = getState().auth
        const newNote = {
            title: '',
            body: '',
            imageUrls:[],
            date: new Date().getTime(),
        }
        const newDoc = doc(collection(FirebaseDb, `${uid}/journal/notes`))
        const setDoctResp = await setDoc(newDoc, newNote)

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
        
        

    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;
        if ( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {
        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        const noteToFirestore = { ...note };
        delete noteToFirestore.id; // Elimino el id del objeto para que no se guarde en la base de datos

        const docRef = doc(FirebaseDb, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, { merge: true });
        // Merge: true, es para que no se borren los campos que no se estan actualizando

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch) => {

        dispatch(setSaving());
        //await fileUpload(files[0]);
        const fileUploadPromises = [];
        for(const file of files) {
            fileUploadPromises.push( fileUpload(file) );
        }
        const photosUrls = await Promise.all( fileUploadPromises );
        dispatch(setPhotosToActiveNote( photosUrls ));
    }
}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
        dispatch(setSaving());
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docRef = doc(FirebaseDb, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id));
    }
}
