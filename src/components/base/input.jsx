import PropTypes from 'prop-types';

const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  className = '',
  error,
  label,
    id
}) => {

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string.isRequired
};
  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2 border rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          disabled:bg-gray-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;