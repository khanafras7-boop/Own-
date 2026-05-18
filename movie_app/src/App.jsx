import { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appWrite';

function App() {

  const [searchTerm, setSearchTerm] = useState('Avengers');

  const [errorMessage, setErrorMessage] = useState('');

  const [movieList, setMovieList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    }
  }

  const fetchMovies = async (query) => {
    if (!query.trim()) {
      setMovieList([]);
      setErrorMessage('');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const endPoint = `${API_BASE_URL}&s=${query}`

      const response = await fetch(endPoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch Movies')
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setErrorMessage(data.Error);
        setMovieList([]);
        return;
      }

      setMovieList(data.Search || []);

      if (query && data.Search.length > 0) await updateSearchCount(query, data.Search[0]);

    } catch (e) {
      setErrorMessage(e.message)
    } finally {
      setIsLoading(false)
    }
  }

  useDebounce(() => {
    fetchMovies(searchTerm);
  }, 1000, [searchTerm])

  const fetchTrends = async () => {
    try {
      const response = await getTrendingMovies();
      console.log(response)
      setTrendingMovies(response)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchTrends();
  }, []);

  return (
    <main>

      <div className='pattern'></div>

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {trendingMovies && 
      <div className="trendingMovies">
        <section className="all-movies">
          <h2>Trending Movies</h2>
          <ul>
                {
                  trendingMovies.map((movie) => (
                    <div key={movie.$id}>
                      <MovieCard movie={movie} />
                    </div>
                  ))
                }
              </ul>
        </section>
      </div>
      }



      <section className="all-movies">
        <h2>All Movies</h2>

        {
          isLoading ? <Spinner />
            : errorMessage ? <p className='text-red-500'>{errorMessage}</p>
              :
              <div>
                <ul>
                  {
                    movieList.map((movie) => (
                      <div key={movie.imdbID}>
                        <MovieCard movie={movie} />
                      </div>
                    ))
                  }
                </ul>
              </div>
        }

      </section>
    </main>
  )
}

export default App
