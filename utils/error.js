module.exports = {
  routeError: msg => {
    return { errors: [{ msg }] };
  }
};
