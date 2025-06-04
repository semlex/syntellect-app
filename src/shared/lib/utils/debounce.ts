export function debounce<F extends (...args: Parameters<F>) => ReturnType<F>>(func: F, t: number) {
  let timeout: NodeJS.Timeout;

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), t);
  };

  return debounced;
}
