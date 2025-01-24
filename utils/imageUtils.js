export const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, { type: mime });
  };
  
  export const resizeImage = (file, maxWidth = 800) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ratio = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * ratio;
  
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          resolve(canvas.toDataURL(file.type));
        };
      };
    });
  };