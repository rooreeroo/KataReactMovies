import { Col, Row } from 'antd';

import MovieImage from '../MovieImage';
import MovieData from '../MovieData';
import MovieRate from '../MovieRate';

export default function MovieCardTemplate({
  imageUrl,
  title,
  releaseDate,
  genres,
  overview,
  movieRate,
  movieRateColor,
  onRate,
  rating,
}) {
  return (
    <Row style={{ width: 450, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)' }}>
      <Col span={10}>
        <MovieImage imageUrl={imageUrl} imageAlt={title} />
      </Col>

      <Col
        span={14}
        style={{ padding: 12, display: 'inline-flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <MovieData
          title={title}
          releaseDate={releaseDate}
          genres={genres}
          overview={overview}
          movieRate={movieRate}
          movieRateColor={movieRateColor}
        />
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <MovieRate onRate={onRate} rating={rating} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
