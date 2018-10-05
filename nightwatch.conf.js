var webdriverManagerPath = './bin/';

var SELENIUM_CONFIGURATION = {
  start_process: true,
  server_path: webdriverManagerPath + 'selenium-server-standalone-3.14.0.jar',
  log_path: './selenium_log',
  host: '127.0.0.1',
  port: 4444,
  cli_args: {
    'webdriver.gecko.driver' :webdriverManagerPath + 'geckodriver.exe',
    'webdriver.chrome.driver' : webdriverManagerPath + 'chromedriver.exe',
  }
};

var FIREFOX_CONFIGURATION = {
  browserName: 'firefox',
  javascriptEnabled: true
};

var CHROME_CONFIGURATION = {
  browserName: 'chrome',
  javascriptEnabled: true,
  acceptSslCerts: true,
  chromeOptions : {
    args : ["start-fullscreen"]
  }
};

var IE_CONFIGURATION = {
  browserName: 'internet explorer',
  javascriptEnabled: true
};

var DEFAULT_CONFIGURATION = {
  launch_url: 'http://localhost',
  selenium_port: 4444,
  selenium_host: 'localhost',
  screenshots : {
    enabled : true,
    on_failure : true,
    on_error : true,
    path : "tests_output/screenshots"
  },
  //desiredCapabilities: FIREFOX_CONFIGURATION
  desiredCapabilities: CHROME_CONFIGURATION
  //desiredCapabilities: IE_CONFIGURATION
};

var ENVIRONMENTS = {
  default: DEFAULT_CONFIGURATION,
  chrome: {
    desiredCapabilities: CHROME_CONFIGURATION
  }
};

module.exports = {
  src_folders: ['tests'],
  selenium: SELENIUM_CONFIGURATION,
  test_settings: ENVIRONMENTS
};