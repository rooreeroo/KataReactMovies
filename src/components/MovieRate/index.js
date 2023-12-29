import { Rate } from 'antd';
import propTypes from 'prop-types';

export default function MovieRate({ onRate, rating }) {
  return <Rate allowHalf count={10} style={{ fontSize: '1.3rem' }} onChange={onRate} value={rating} />;
}
MovieRate.defaultProps = {
  onRate: () => {},
  rating: 0,
};
MovieRate.propTypes = {
  onRate: propTypes.func,
  rating: propTypes.number,
};
