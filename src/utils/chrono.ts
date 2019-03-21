import {Injectable} from "@angular/core";

@Injectable() export class Chrono {

  private seconds: number;
  private secondsLeft: number;
  private runChrono: boolean;
  private hasStarted: boolean;
  private lastTimeout: any;
  public displayTime: string;

  constructor() {
    this.initChrono();
  }

  initChrono() {
    this.runChrono = false;
    this.hasStarted = false;
    this.seconds = 0;
    this.secondsLeft = 0;

    this.displayTime = this.getSecondsAsDigitalClock(this.secondsLeft);
  }

  startChrono() {
    this.hasStarted = true;
    this.runChrono = true;
    this.ChronoTick();
  }

  pauseChrono() {
    this.runChrono = false;
    clearTimeout(this.lastTimeout);
  }

  resumeChrono() {
    this.startChrono();
  }

  resetChrono() {
    clearTimeout(this.lastTimeout);
    this.initChrono();
  }

  ChronoTick() {
    this.lastTimeout = setTimeout(() => {
      if (!this.runChrono) { return; }
      this.secondsLeft++;

      this.displayTime = this.getSecondsAsDigitalClock(this.secondsLeft);
      this.ChronoTick();
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

}
