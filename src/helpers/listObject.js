const listObject = (req, res, next) => {
  let {
    where = { status: true },
    skip = 0,
    limit = Number.MAX_SAFE_INTEGER,
    select = {},
    order = { createdAt: "desc" },
    include = {},
  } = req?.body;
  const params = {
    where,
    take: limit,
    skip: skip,
    orderBy: order,
  };
  if (Object.keys(select).length !== 0) {
    params[`select`] = select;
  }
  if (Object.keys(include).length !== 0) {
    params[`include`] = include;
  }
  req.payload = params;
  next();
};
export default listObject;
