export async function analyzeImage(imageData) {
    try {
      const response = await fetch('http://localhost:3000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      });
  
      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to analyze image: ${error.message || 'Unknown error'}`);
    }
  }
  
  export async function getChatResponse(message, context) {
    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message,
          context,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Chat failed: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      throw new Error(`Failed to get chat response: ${error.message || 'Unknown error'}`);
    }
  }