import WebSocket from "ws";
import SignalFaker from "./SignalFaker";
import type { Signal } from "./SignalFaker";

export default class SignalFakerWebsocketWrapper {
  private _signalFaker = new SignalFaker();
  private _interval: number = 100;
  private _timeoutId: NodeJS.Timeout | null = null;

  constructor(private _websocket: WebSocket) {}

  /**
   * @description Resets the reference time of the signal faking algorithm and (re)start a continuous fake signal.
   * @return void
   */
  public resetTimeAndRestartContinuousFakeSignal(): void {
    this._signalFaker.resetReferenceTime();
    this.restartContinuousFakeSignal();
  }

  /**
   * @description Sets the interval of the recursive cycle.
   * @param payload : { interval: number }
   * @return void
   */
  public setInterval(payload: { interval: number }): void {
    this._interval = payload.interval;
  }

  /**
   * @description If there is no recursive cycle going on, it will start one.
   * @return void
   */
  public startContinuousFakeSignal(): void {
    if (!this._timeoutId) {
      this.continuousFakeSignal();
    }
  }

  /**
   * @description Restart the continuous fake signal. It will stop recursive calls if there is any and start a new recursive cycle.
   * @return void
   */
  private restartContinuousFakeSignal(): void {
    this.stopContinuousFakeSignal();
    this.startContinuousFakeSignal();
  }

  /**
   * @description Recursively sends fake signals to _websocket client
   * @return void
   */
  private continuousFakeSignal(): void {
    const fakeSignal = this._signalFaker.fakeSignal();

    const isSignalSent = this.sendSignal(fakeSignal);
    if (!isSignalSent) return;

    this._timeoutId = setTimeout(() => {
      this.continuousFakeSignal();
    }, this._interval);
  }

  /**
   * @returns true if the timeout was cleared, false if there was no timeout to clear
   * @return void
   */
  public stopContinuousFakeSignal(): void {
    if (!this._timeoutId) return;
    clearTimeout(this._timeoutId);
    this._timeoutId = null;
  }

  /**
   * @param signal : Signal
   * @returns true if the signal was sent, false if there was no websocket to send the signal to
   */
  private sendSignal(signal: Signal): boolean {
    const json = JSON.stringify(signal);
    this._websocket.send(json);
    return true;
  }
}
