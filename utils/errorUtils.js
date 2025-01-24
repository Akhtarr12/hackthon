export class APIError extends Error {
    constructor(message, status) {
      super(message);
      this.name = 'APIError';
      this.status = status;
    }
  }
  
  export const handleAPIError = (error) => {
    if (error instanceof APIError) {
      return {
        message: error.message,
        status: error.status
      };
    }
    
    return {
      message: 'An unexpected error occurred. Please try again later.',
      status: 500
    };
  };