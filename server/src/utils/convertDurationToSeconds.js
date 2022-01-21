module.exports = (duration) => {
  const calc = (duration + "")
    .toLowerCase()
    .replaceAll("day", "*24hour")
    .replaceAll("hour", "*60min")
    .replaceAll("min", "*60")
    .replaceAll("sec", "*1");
  return eval(calc);
};
