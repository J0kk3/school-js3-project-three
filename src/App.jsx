//hooks
import { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
//components
import AuthContext from './Store/auth-context';
import MainHeader from "./Components/Nav/MainHeader/MainHeader";
//Pages
import Start from './Pages/Start/Start';
import Movies from './Pages/Movies/Movies';
import MovieDetails from './Pages/MovieDetails/MovieDetails';
import AddMovie from './Pages/AddMovie/AddMovie';
import Profile from './Pages/Profile/Profile';


const App = () =>
{
  const authCtx = useContext( AuthContext );

  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          { !authCtx.isLoggedIn && <Route path="/" element={ <Start /> } /> }
          { authCtx.isLoggedIn && <Route path="/movies" element={ <Movies /> } /> }
          { authCtx.isLoggedIn && <Route path="/movies/:movieId" element={ <MovieDetails /> } /> }
          { authCtx.isLoggedIn && <Route path="/addmovie" element={ <AddMovie /> } /> }
          { authCtx.isLoggedIn && <Route path="/profile" element={ authCtx.isLoggedIn ? <Profile /> : <Navigate to="/" /> } /> }
          <Route path="*" element={ <Navigate to="/" /> } />
        </Routes>
      </main>
    </div>
  );
};

export default App;
