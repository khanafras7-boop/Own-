function MovieCard({movie : {Title, Poster, Year, Type, imdbID}}) {
    return (
        <div className='movie-card'>
            <img src={Poster ? Poster : '/no-movie.png'} className='movie-poster' alt="movie-title" />
            <div className="mt-4 movie-details">
                <h2>{Title}</h2>
                <h3>{Type} - {Year}</h3>
                <h4>{imdbID}</h4>
            </div>
        </div>
    )
}

export default MovieCard
