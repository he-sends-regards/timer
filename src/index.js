import { fromEvent } from 'rxjs';
import { map, buffer, filter, debounceTime } from 'rxjs/operators';

const DEFAULT_TIMER_VALUE = '00:00:00';

const mainElement = document.querySelector('.main');
const timerValue = mainElement.querySelector('.main__timer_value');
const startTimerBtn = mainElement.querySelector('.start-timer-btn');
const stopTimerBtn = mainElement.querySelector('.stop-timer-btn');
const waitTimerBtn = mainElement.querySelector('.wait-timer-btn');
const resetTimerBtn = mainElement.querySelector('.reset-timer-btn');

const startTimerClick$ = fromEvent(startTimerBtn, 'click');
const stopTimerClick$ = fromEvent(stopTimerBtn, 'click');
const waitTimerClick$ = fromEvent(waitTimerBtn, 'click');
const resetTimerClick$ = fromEvent(resetTimerBtn, 'click');

const time = {
  hours: 0,
  minutes: 0,
  seconds: 0
}

const clearTime = () => {
  time.hours = 0;
  time.minutes = 0;
  time.seconds = 0;
}

const timer = () => setInterval(() => {
  if (time.seconds < 59) {
    time.seconds += 1
  }
  else if (time.seconds >= 59) {
    time.seconds = 0;
    time.minutes += 1;
  }
  if (time.minutes >= 60) {
    time.minutes = 0;
    time.hours += 1;
  }
  if (time.hours >= 24) {
    clearTime();
  }
  
  timerValue.textContent = `${time.hours < 10 ? `0${time.hours}` : time.hours}:${time.minutes < 10 ? `0${time.minutes}` : time.minutes}:${time.seconds < 10 ? `0${time.seconds}` : time.seconds}`
}, 1000)

startTimerClick$.subscribe(() => {
  const timerInterval = timer();

  startTimerBtn.disabled = true;
  stopTimerBtn.disabled = false;
  waitTimerBtn.disabled = false;
  resetTimerBtn.disabled = false;

  stopTimerClick$.subscribe(() => {
    startTimerBtn.disabled = false;
    stopTimerBtn.disabled = true;
    waitTimerBtn.disabled = true;
    resetTimerBtn.disabled = true;
  
    clearInterval(timerInterval);
    clearTime();
    timerValue.textContent = DEFAULT_TIMER_VALUE;
  })

  waitTimerClick$
    .pipe(
      buffer(
        waitTimerClick$.pipe(
          debounceTime(299),
        )
      ),
      map((list) => list.length),
      filter((x) => x === 2),
    )
    .subscribe(() => {
      clearInterval(timerInterval);
      startTimerBtn.disabled = false;
      waitTimerBtn.disabled = true;
    })
  
  resetTimerClick$.subscribe(() => {
    clearTime()
  })
})


