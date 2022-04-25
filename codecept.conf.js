require('ts-node/register');
const {setHeadlessWhen, setCommonPlugins} = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
    tests: './tests/**/*.js',
    output: './output',
    helpers: {
        Playwright: {
            url: 'https://www.stream.cz',
            show: true, // false = headless
            browser: 'chromium', // firefox
            windowSize: "1280x720",
            waitForTimeout: 10000,
            slowMo: 100
        },
        chaiWrapper: {
            require: "codeceptjs-chai"
        }
    },
    include: {
        I: './steps_file.js',
        Ribbon: './pages/fragments/Ribbon.js',
        SearchPage: './pages/Search.js'
    },
    bootstrap: null,
    mocha: {},
    name: 'playwright-main',
    plugins: {
        customLocator: {
            enabled: true,
            attribute: 'data-dot'
        }
    }
}
