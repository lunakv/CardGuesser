const CURRENT_W = 'current-session-win';
const LONGEST_W = 'longest-session-win';
const CURRENT_L = 'current-session-l';
const TOTAL_W = 'total-guessed';

function addOne(key: string) {
  const current: number = parseInt(localStorage.getItem(key) ?? '0', 10);
  localStorage.setItem(key, String(current + 1));
}

function reset(key: string) {
  localStorage.setItem(key, String(0));
}

function get(key: string) {
  return localStorage.getItem(key) ?? 0;
}

export function onCorrect() {
  addOne(CURRENT_W);
  addOne(TOTAL_W);
  reset(CURRENT_L);
  if (get(CURRENT_W) > get(LONGEST_W)) addOne(LONGEST_W);
}

export function onGiveUp() {
  reset(CURRENT_W);
  addOne(CURRENT_L);
}

export function currentWinStreak() {
  return get(CURRENT_W);
}

export function allTimeWinStreak() {
  return get(LONGEST_W);
}

export function totalCorrect() {
  return get(TOTAL_W);
}

export default { onCorrect, onGiveUp, currentWinStreak, allTimeWinStreak, totalCorrect };
