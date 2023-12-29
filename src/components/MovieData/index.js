import { Col, Progress, Row, Typography } from 'antd';
import propTypes from 'prop-types';

export default function MovieData({ title, releaseDate, genres, overview, movieRate, movieRateColor }) {
  return (
    <Row>
      <Col span={20}>
        <div>
          <Typography.Text copyable style={{ fontSize: '1.7rem', lineHeight: '30px' }}>
            {title}
          </Typography.Text>
        </div>
        <div>
          <Typography.Text type="secondary">{releaseDate}</Typography.Text>
        </div>
        <div style={{ margin: '10px 0px', display: 'flex', flexWrap: 'wrap', gap: '8px 8px' }}>{genres}</div>
        <div>
          <Typography.Text>{overview}</Typography.Text>
        </div>
      </Col>
      <Col span={4}>
        <Progress
          type="dashboard"
          percent={movieRate}
          width={30}
          format={(percent) => Math.round(percent * 10) / 100}
          strokeColor={movieRateColor}
        />
      </Col>
    </Row>
  );
}
MovieData.defaultProps = {
  title: '',
  releaseDate: '',
  genres: undefined,
  movieRate: 0,
  overview: '',
  movieRateColor: '',
};
MovieData.propTypes = {
  title: propTypes.string,
  releaseDate: propTypes.any,
  genres: propTypes.any,
  movieRate: propTypes.number,
  overview: propTypes.string,
  movieRateColor: propTypes.string,
};
