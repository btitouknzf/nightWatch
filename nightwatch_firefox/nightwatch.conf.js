module.exports = (function(settings) {
  settings.test_workers = false;
  console.log("start clientTest");
  return settings;
})(require('./nightwatch.json'));
