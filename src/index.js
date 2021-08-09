const queue  = {};
const active = {};

function trigger() {
  Object.entries(queue).forEach(([name, q]) => {
    if (active[name]) return;
    if (!q.length) return;
    active[name] = true;
    const fn = q.shift();
    fn();
  });
}

export function lock(name) {
  return new Promise(resolve => {
    queue[name] = queue[name] || [];
    queue[name].push(resolve);
    trigger();
  });
}

export function unlock(name) {
  delete active[name];
  trigger();
}
