export function snakeToTitleCase(str) {
  return str
    .split('_')                      
    .map(word => 
      word.charAt(0).toUpperCase() + 
      word.slice(1).toLowerCase()    
    )
    .join(' ');                      
}

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};