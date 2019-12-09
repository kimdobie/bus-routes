let routes = [];
let directions = [];
let stops = [];
let error = '';

export const setRoutes = data => {
  routes = data;
};
export const setDirections = data => {
  directions = data;
};
export const setStops = data => {
  stops = data;
};

export const setError = data => {
  error = data;
};

export const get = jest.fn(endpoint => {
  if (error !== '') {
    const newError = new Error(error);
    return Promise.reject(newError);
  }
  switch (true) {
    case /Routes/.test(endpoint):
      return Promise.resolve({ data: routes });
    case /Directions/.test(endpoint):
      return Promise.resolve({ data: directions });
    case /Stops/.test(endpoint):
      return Promise.resolve({ data: stops });
    default:
      return Promise.reject();
  }
});
