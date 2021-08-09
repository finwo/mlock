const M    = require('../');
const test = require('tape');

const running = {};

async function worker(name) {
  running[name] = running[name] || 0;
  await M.lock(name);
  running[name]++;
  await new Promise(r => setTimeout(r,1000));
  M.unlock(name);
}

test('Method exports', t => {
  t.plan(2);

  t.equal(typeof M.lock  , 'function', '\'lock\' must be a function');
  t.equal(typeof M.unlock, 'function', '\'unlock\' must be a function');
});

test('Multi-worker, single running', async t => {
  t.plan(3);
  const rand  = Math.random().toString(36).substr(2);
  const start = Date.now();

  // Start 2 workers
  worker(rand);
  worker(rand);

  // Wait 500ms, both should be active then if lock not functional
  await new Promise(r => setTimeout(r,500));
  t.equal(running[rand], 1, "Only 1 worker should be running");

  // Await new worker, to wait for initial 2 to finish
  await worker(rand);

  // Roughly 3 seconds should have passed
  // Allowing some play, not all machines are created equal
  const end = Date.now();
  t.ok( end - start > 2900, "3 jobs should've taken over 2900ms");
  t.ok( end - start < 3200, "3 jobs should've taken under 3200ms");
});
