export const withResource = (response, f) => {
  try {
    f(response);
  } finally {
    response.close();
  }
};
