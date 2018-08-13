const puppeteer = require('puppeteer');

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false
  });
  page = await browser.newPage();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  await browser.close();
});

test('the header should has the correct text', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);

  expect(text).toEqual('Blogster');
});

test('clicking login should start oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('should show logout button when signed in', async () => {
  const id = '5a85dc351cd843163727f63c';

  const Buffer = require('safe-buffer').Buffer;
  const sessionObject = {
    passport: {
      user: id
    }
  };

  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    'base64'
  );

  const Keygrip = require('keygrip');
  const keys = require('../config/keys');
  const keygrip = new Keygrip([keys.cookieKey]);
  const sig = keygrip.sign('session=' + sessionString);
});
