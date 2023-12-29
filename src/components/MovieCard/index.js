import { Component } from 'react';
import { format } from 'date-fns';
import propTypes from 'prop-types';

import MovieGenre from '../MovieGenre';
import MovieCardTemplate from '../MovieCardTemplate';

export default class MovieCard extends Component {
  clipDescription = (text, clip = 180) => {
    if (!text) return '';
    text = text.trim();
    if (text.length <= clip + 3) return text;
    let cutted = text.substring(0, clip);
    cutted = cutted.substring(0, cutted.lastIndexOf(' '));
    return `${cutted}...`;
  };

  render() {
    const { data, onRate } = this.props;
    const { poster_path, title, vote_average, release_date, genre_ids, overview, rating } = data;

    let releaseDate = new Date(release_date);
    releaseDate = releaseDate instanceof Date && !Number.isNaN(releaseDate) ? format(releaseDate, 'MMMM d, y') : 'n/a';

    const movieRate = vote_average * 10;
    const movieRateColor =
      movieRate >= 70 ? '#66E900' : movieRate >= 50 ? '#E9D100' : movieRate >= 30 ? '#E97E00' : '#E90000';

    const genres = genre_ids.map((id) => <MovieGenre key={id} id={id} />);

    const imageUrl = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : 'null';

    return (
      <MovieCardTemplate
        imageUrl={imageUrl}
        title={title}
        releaseDate={releaseDate}
        genres={genres}
        overview={this.clipDescription(overview)}
        movieRate={movieRate}
        movieRateColor={movieRateColor}
        onRate={onRate}
        rating={rating || 0}
      />
    );
  }
}

MovieCard.defaultProps = {
  data: {},
  onRate: () => {},
};
MovieCard.propTypes = {
  data: propTypes.shape({
    poster_path: propTypes.string,
    title: propTypes.string,
    vote_average: propTypes.number,
    release_date: propTypes.string,
    genre_ids: propTypes.arrayOf(propTypes.number),
    overview: propTypes.string,
    rating: propTypes.number,
  }),
  onRate: propTypes.func,
};
