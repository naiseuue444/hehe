//jshint esversion:8

/**
 * Lock screen countdown until July 2, 2026 12:00 AM IST (Asia/Kolkata)
 * Calls onUnlock() when the time arrives.
 */
export const initLockscreen = (onUnlock) => {

  // Target: July 2, 2026 00:00:00 IST (UTC+5:30)
  const target = new Date('2026-07-02T00:00:00+05:30').getTime();

  // If already past unlock time — skip lockscreen entirely
  if (Date.now() >= target) {
    onUnlock();
    return;
  }

  const ls        = document.getElementById('lockscreen');
  const lsDays    = document.getElementById('ls-days');
  const lsHours   = document.getElementById('ls-hours');
  const lsMins    = document.getElementById('ls-mins');
  const lsSecs    = document.getElementById('ls-secs');
  const lsWait    = document.getElementById('ls-wait');
  const lsUntil   = document.getElementById('ls-until');

  // Prevent any page interaction / scrolling
  document.body.style.overflow = 'hidden';

  const pad = (n) => String(n).padStart(2, '0');

  let interval;

  const unlock = () => {
    clearInterval(interval);

    // Show celebration
    lsDays.textContent  = '00';
    lsHours.textContent = '00';
    lsMins.textContent  = '00';
    lsSecs.textContent  = '00';

    lsUntil.textContent = '00:00:00 🎉';
    lsWait.textContent  = 'Now you can enter. Sorry for the wait ❤️';
    lsWait.classList.add('lockscreen__wait--reveal');

    // After 2.5 s, fade out the lock screen then call onUnlock
    setTimeout(() => {
      ls.classList.add('lockscreen--fade');
      setTimeout(() => {
        ls.style.display = 'none';
        document.body.style.overflow = '';
        onUnlock();
      }, 1000);
    }, 2500);
  };

  const tick = () => {
    const diff = target - Date.now();

    if (diff <= 0) {
      unlock();
      return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000)  / 60000);
    const secs  = Math.floor((diff % 60000)    / 1000);

    lsDays.textContent  = pad(days);
    lsHours.textContent = pad(hours);
    lsMins.textContent  = pad(mins);
    lsSecs.textContent  = pad(secs);
  };

  tick(); // immediate first render
  interval = setInterval(tick, 1000);
};
