export const isValidImageType = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return validTypes.includes(file.type);
  };
  
  export const isValidFileSize = (file, maxSizeMB = 5) => {
    const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
    return file.size <= maxSize;
  };