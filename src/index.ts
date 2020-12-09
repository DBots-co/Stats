import fetch, { Response } from 'node-fetch';
import { Client } from 'discord.js';
import { EventEmitter } from 'events';

/** Post stats to dbots.co */
export class PostStats {
  private emitter = new EventEmitter();
  private bot = new Client();

  constructor(private options: PostStatsOptions) {
    if (!this.options.apiToken)
      throw new TypeError('API Token must be provided in options.');
    if (!this.options.botToken)
      throw new TypeError('Bot Token must be provided in options.');

    this.options = {
      interval: 5,
      ...options
    };

    this.bot.on
    this.bot.login(this.options.botToken)
    .catch(() => {
      throw new TypeError('Invalid bot token provided.');
    })
    .then(async() => {
      await this.post();

      setInterval(() => this.post(), this.options.interval * 60 * 1000);
    });
  }

  public on<K extends keyof StatsEvent>(event: K, listener: (...args: StatsEvent[K]) => void) {
    this.emitter.on(event, listener as any);
  }

  private async post() {
    const response = await fetch(`https://dbots.co/api/v1/bots/${this.bot.user.id}/stats`, {
      body: JSON.stringify({
        guildCount: this.bot.guilds.cache.size
      }),
      headers: {
        'Authorization': this.options.apiToken,
        'Content-Type': 'application/json'
      },
      method: 'POST',
    });

    this.emitter.emit('postStats', response);
  }
}

interface StatsEvent {
  postStats: [Response];
}

export interface PostStatsOptions {
  /** API Token - https://dbots.co/dashboard/bots/[yourBotId]/api  */
  apiToken: string;
  /** Bot token - https://discord.com/developers. */
  botToken: string;
  /** Interval to to post stats in minutes.
   * @default 5 */
  interval?: number;
}
