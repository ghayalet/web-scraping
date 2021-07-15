const puppeteer = require('puppeteer');

const SUBREDDIT_URL = (reddit) => `https://old.reddit.com/r/node/`;

const self = {

     browser: null,
     pages: null,

     initialize: async (reddit) => {
          self.browser = await puppeteer.launch({
               headless: false
          });
          self.page = await self.browser.newPage();

          /* Go to the sebreddit */
          await self.page.goto(SUBREDDIT_URL(reddit), {
               waitUntil: 'networkidle0'
          })
     },

     getResults: async (nr) => {

          const elements = await self.page.$$('#siteTable > div[class*="thing"]');

          for (let element of elements) {

               const title = await element.$eval(('p.title'), node => node.innerText.trim());
               const rank = await element.$eval(('span[class*="rank"]'), node => node.innerText.trim());
               const authorUrl = await element.$eval(('p[class="tagline "] > a[class*="author"]'), node => node.getAttribute('href'));
               const authorName = await element.$eval(('p[class="tagline "] > a[class*="author"]'), node => node.innerText.trim());
               const score = await element.$eval(('div[class="score likes"]'), node => node.innerText.trim());

               console.log(title,rank,authorUrl,authorName,score)

          }

     }
}

module.exports = self;