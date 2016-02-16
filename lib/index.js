import "babel-polyfill";

import DS, { SimpleNode, LinkProvider } from 'dslink';
import { defaultNodes } from './structure';

import webshot from 'webshot';

class Screenshot extends SimpleNode.class {
  onInvoke(columns) {
    var { text, isHTML, width, height } = columns;
    console.log(`Screenshotting ${text} with ${width}x${height} resolution.`);

    var options = {
      windowSize: {
        width,
        height
      },
      siteType: isHTML ? 'html' : 'url'
    };

    return new Promise((resolve, reject) => {
      var stream = webshot(text, options);
      var list = [];

      stream.on('data', (data) => {
        list.push(data);
      });

      stream.on('end', () => {
        console.log(`Screenshotted ${text} successfully.`);
        resolve({
          png: Buffer.concat(list)
        });
      });
    });
  }
}

var link = new LinkProvider(process.argv.slice(2), 'screenshot-', {
  defaultNodes,
  profiles: {
    screenshot(path, provider) {
      return new Screenshot(path, provider);
    }
  }
});

link.connect();
