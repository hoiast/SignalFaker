import type WebSocket from "ws";

type Signal = {
  time: number; // time in milliseconds
  signal: number; // signal value
};

class SignalFaker {
  private _referenceTime = new Date().getTime();

  constructor(private _websocket: WebSocket | null = null) {}

  /**
   * @description Resets the reference time of the signal faking algorithm
   */
  public resetReferenceTime(): void {
    this._referenceTime = new Date().getTime();
  }

  /**
   * @description Calculates a fake signal using a specific time input or uses the current time lapsed since the last resetReferenceTime() call
   * @param specificTime : number | undefined
   * @return Signal
   */
  public fakeSignal(specificTime?: number): Signal {
    const lapsedTime = new Date().getTime() - this._referenceTime;
    const time = specificTime ?? lapsedTime;

    const fakeSignal = this.calculateFakeSignal(time);

    return fakeSignal;
  }

  /**
   * @description Calculates a fake signal using sin and cos functions with a fixed amplitude offset
   * @param time : number
   * @return Signal
   */
  private calculateFakeSignal(time: number): Signal {
    const { PI, cos, sin } = Math;
    const signal =
      -0.06366 +
      0.12613 * cos((PI * time) / 500) +
      0.12258 * cos((PI * time) / 250) +
      0.01593 * sin((PI * time) / 500) +
      0.03147 * sin((PI * time) / 250);

    return {
      time,
      signal,
    };
  }
}

export default SignalFaker;
export type { Signal };
