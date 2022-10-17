const queue: {[index:string|symbol]:(()=>void)[]}  = {};
const active: {[index:string|symbol]:boolean} = {};

function trigger(): void {
  Object.entries(queue).forEach(([name, q]) => {
    if (active[name]) return;
    if (!q.length) return;
    active[name] = true;
    const fn = q.shift();
    if (!fn) {
      delete active[name];
      return;
    }
    fn();
  });
}

export function lock(name: string | symbol): Promise<void> {
  return new Promise(resolve => {
    queue[name] = queue[name] || [];
    queue[name].push(resolve);
    trigger();
  });
}

export function unlock(name: string | symbol): void {
  delete active[name];
  trigger();
}
