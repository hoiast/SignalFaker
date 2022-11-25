import SignalFaker from "../../services/SignalFaker/SignalFaker";
import type { Signal } from "../../services/SignalFaker/SignalFaker";

export default class SignalController {
  private _signalFaker = new SignalFaker();

  public constructor() {}

  /**
   * Get a fake signal using the time lapsed since the instantiation of SignalFaker.
   * @param time
   * @returns Signal
   */
  public getSignal(): Signal {
    return this._signalFaker.fakeSignal();
  }

  /**
   * Get a fake signal using a specific time input
   * @param time
   * @returns Signal
   */
  public getSignalAtTime(time: number): Signal {
    return this._signalFaker.fakeSignal(time);
  }

  /**
   * Check if a number is finite and higher or equal to 0
   * @param time
   * @returns boolean
   */
  public isTimeInputValid(time: number): boolean {
    return time >= 0 && !isNaN(time);
  }
}
