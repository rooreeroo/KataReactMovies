import { Tag } from 'antd';
import propTypes from 'prop-types';

import { GenresConsumer } from '../GenresContext';

function MovieGenre({ id }) {
  return (
    <GenresConsumer>
      {(genres) => {
        const currentGenre = genres.find((g) => g.id === id);
        if (currentGenre) return <Tag style={{ margin: 0 }}>{currentGenre.name}</Tag>;
        return null;
      }}
    </GenresConsumer>
  );
}

MovieGenre.defaultProps = {
  id: undefined,
};
MovieGenre.propTypes = {
  id: propTypes.any,
};

export default MovieGenre;
