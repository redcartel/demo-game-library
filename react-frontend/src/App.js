import { firebaseApp, functions } from './firebase/fire';
import MainLayout from './layouts/MainLayout';
import useAuthUser from './utils/hooks/useAuthUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoggedOutRouter from './routes/LoggedOutRouter';
import LoggedInRouter from './routes/LoggedInRouter';
import { ThemeProvider } from '@emotion/react';
import theme from './Theme';
import { CssBaseline } from '@mui/material';
import { useEffect } from 'react';
import { httpsCallable } from "firebase/functions";
import useGetToken from './utils/hooks/useGetToken';

function App() {
  const [user, userData] = useAuthUser();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainLayout user={user}>
          {user.uid ?
            <LoggedInRouter user={user} userData={userData} />
            :
            <LoggedOutRouter />
          }
        </MainLayout>
      </ThemeProvider>
    </BrowserRouter >
  );
}

export default App;
