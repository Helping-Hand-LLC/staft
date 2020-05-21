interface RouteError {
  errors: [{ msg: string }];
}

export default (msg: string): RouteError => {
  return { errors: [{ msg }] };
};
