export const limitUnit = (x) => {
  return (x < 0) ? 0 : (
    (x < 1) ? x : 1
  );
};
