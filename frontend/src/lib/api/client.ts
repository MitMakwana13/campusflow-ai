// Generic async wrapper to simulate network latency during mock stage
export async function mockFetch<T>(data: T, delayMs = 300): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delayMs);
  });
}
