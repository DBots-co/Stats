# DBots - Stats
Simple package to easily post stats to [dbots.co](https://dbots.co).
By default it posts stats every 5 minutes. It uses discord.js to login and post stats.

`npm i -S @dbots/stats`

## NodeJS
```js
const { PostStats } = require('@dbots/stats');

const stats = new PostStats({
  apiToken: '<your_bot_api_token>',
  botToken: '<your_bot_token>'
});

stats.on('postStats', (res) => console.log(res.ok ? 'Posted stats.' : 'Failed to post stats.'));
```

## TypeScript / ES6
```ts
import { PostStats } from '@dbots/stats';

const stats = new PostStats({
  apiToken: '<your_bot_api_token>',
  botToken: '<your_bot_token>'
});

stats.on('postStats', (res) => console.log(res.ok ? 'Posted stats.' : 'Failed to post stats.'));
```

### Options
```ts
export interface PostStatsOptions {
  /** API Token - https://dbots.co/dashboard/bots/[yourBotId]/api  */
  apiToken: string;
  /** Bot token - https://discord.com/developers. */
  botToken: string;
  /** Interval to to post stats in minutes.
   * @default 5 */
  interval?: number;
}
```
