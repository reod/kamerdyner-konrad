export default ({ errorReporter }) => (err, ctx) => {
  errorReporter.captureException(err);
  console.log(err);
};
