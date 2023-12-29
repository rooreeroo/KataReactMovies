import { Image, Spin } from 'antd';
import propTypes from 'prop-types';

export default function MovieImage({ imageUrl, imageAlt }) {
  const placeholder = (
    <div className="imageLoader">
      <Spin size="large" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
    </div>
  );

  return (
    <Image
      height="100%"
      src={imageUrl}
      alt={imageAlt}
      fallback="/placeholder.png"
      style={{ minHeight: '280px', objectFit: 'cover' }}
      placeholder={placeholder}
    />
  );
}
MovieImage.defaultProps = {
  imageUrl: '',
  imageAlt: '',
};
MovieImage.propTypes = {
  imageUrl: propTypes.string,
  imageAlt: propTypes.string,
};
