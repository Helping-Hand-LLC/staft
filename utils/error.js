module.exports = {
  routeError: msg => {
    return { errors: [{ msg: msg || 'Route Error' }] };
  }
};
