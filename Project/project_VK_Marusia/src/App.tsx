

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { Layout } from './components/Layout/Layout'
import { MainPage } from './pages/MainPage/MainPage'
import { FilmPage } from './pages/FilmPage/FilmPage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { SearchProvider } from './context/SearchContext'
import { GenresPage } from './pages/GenresPage/GenresPage'
import { GenreMoviesPage } from './pages/GenreMoviesPage/GenreMoviesPage'
import { AccountPage } from './pages/AccountPage/AccountPage'
import { AccountSettings } from './pages/AccountSettings/AccountSettings'
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage' // если ещё нет, добавьте

function App() {
  return (
    <SearchProvider>
      <Router>
        <div className="App">
          <Layout>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/movie/:title/:id" element={<FilmPage />} />
              <Route path="/movie/genres" element={<GenresPage />} />
              <Route path="/movie/genres/:genre" element={<GenreMoviesPage />} />


              <Route path="/account" element={<AccountPage />}>
                <Route index element={<FavoritesPage />} /> 
                <Route path="settings" element={<AccountSettings />} />
                <Route path="favorites" element={<FavoritesPage />} /> 
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </SearchProvider>
  )
}
export default App