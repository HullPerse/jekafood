export default async function useDelay(
  promise: Promise<any>,
  minimumMs: number,
) {
  return Promise.all([
    promise,
    new Promise((resolve) => setTimeout(resolve, minimumMs)),
  ]).then(([result]) => result);
}
