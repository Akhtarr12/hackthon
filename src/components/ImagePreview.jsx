import { X } from 'lucide-react';
import PropTypes from 'prop-types';

const ImagePreview = ({ imageUrl, onRemove }) => {
  return (
    <div className="relative">
      <img
        src={imageUrl}
        alt="Preview"
        className="w-full h-64 object-cover rounded-lg"
      />
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
      >
        <X className="h-5 w-5 text-gray-600" />
      </button>
    </div>
  );
};
ImagePreview.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default ImagePreview;