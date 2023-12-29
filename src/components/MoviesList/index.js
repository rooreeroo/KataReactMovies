import propTypes from 'prop-types';

import MovieCard from '../MovieCard';

function MoviesList({ movies, onRate }) {
  const moviesCards = movies.map((movieData) => {
    const { id, ...data } = movieData;
    return (
      <MovieCard
        key={id}
        data={data}
        id={id}
        onRate={(rate) => {
          onRate(id, rate);
        }}
      />
    );
  });

  return <div className="moviesList">{moviesCards}</div>;
}

MoviesList.defaultProps = {
  movies: [],
  onRate: () => {},
};
MoviesList.propTypes = {
  movies: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.any,
      poster_path: propTypes.string,
      title: propTypes.string,
      vote_average: propTypes.number,
      release_date: propTypes.string,
      genre_ids: propTypes.arrayOf(propTypes.number),
      overview: propTypes.string,
      rating: propTypes.number,
    })
  ),
  onRate: propTypes.func,
};

export default MoviesList;
