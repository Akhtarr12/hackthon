
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  isLoading = false,
  className = '',
  onClick,
  type = 'button'
}) => {
  const baseStyles = 'rounded-lg font-medium transition-colors flex items-center justify-center';
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-50'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  disabled: false,
  isLoading: false,
  className: '',
  type: 'button'
};

export default Button;