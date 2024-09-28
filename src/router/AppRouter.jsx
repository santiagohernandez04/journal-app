import { Navigate, Route, Routes } from 'react-router-dom'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { CheckingAuth } from '../ui'
import { useCheckAuth } from '../hooks'
import { NothingSelectedView } from '../journal/views'

export const AppRouter = () => {
  
  const status = useCheckAuth();

  if ( status === 'checking' ) {
    return <CheckingAuth />
  }
  // UseSelector es un hook que permite acceder al estado de la aplicación
  // state.auth es el slice de auth en el store de Redux 
  return (
    <Routes>
        {
          (status === 'authenticated') 
          ?  <Route path="/*" element={<JournalRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
        }

        <Route path="*" element={<Navigate to='/auth/login' />} />

        {/* Login y registro
        <Route path="/auth/*" element={<AuthRoutes />} />

        {/* JournalApp */}
        {/* <Route path="/*" element={<JournalRoutes />} /> */}

       
    </Routes>
  )
}
