import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal"

export const JournalPage = () => {

  const dispatch = useDispatch()
  const {isSaving, active}  = useSelector(state => state.journal)
  // ¿Que hace el useSelector?
  // useSelector es un hook que nos permite acceder al estado de la aplicación en cualquier componente de nuestra aplicación.
  // en este caso estamos accediendo al estado de la aplicación y obteniendo el valor de isSaving

  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>
      
      {
        (!!active)
          ? <NoteView />
          : <NothingSelectedView />
      }


      <IconButton
        onClick={ onClickNewNote }
        size='large'
        disabled={ isSaving }
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}