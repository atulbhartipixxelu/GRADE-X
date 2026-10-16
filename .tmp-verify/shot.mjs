import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = "d:\\React Website\\3d-interactive\\.tmp-verify";
const userData = join(tmpdir(), `gx-shot-${Date.now()}`);
mkdirSync(userData, { recursive: true });
mkdirSync(outDir, { recursive: true });

const port = 9341;
const child = spawn(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userData}`,
    "--window-size=1440,900",
    "about:blank",
  ],
  { stdio: "ignore" },
);

async function waitChrome() {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return res.json();
    } catch {}
    await new Promise((r) => setTimeout(r, 120));
  }
  throw new Error("Chrome CDP not ready");
}

function attach(ws) {
  let id = 0;
  const pending = new Map();
  const events = new Map();
  ws.addEventListener("message", (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    } else if (msg.method && events.has(msg.method)) {
      events.get(msg.method).forEach((fn) => fn(msg.params));
    }
  });
  return {
    send: (method, params = {}) =>
      new Promise((resolve, reject) => {
        const next = ++id;
        pending.set(next, (msg) => {
          if (msg.error) reject(new Error(`${method}: ${msg.error.message}`));
          else resolve(msg.result);
        });
        ws.send(JSON.stringify({ id: next, method, params }));
      }),
    once: (method) =>
      new Promise((resolve) => {
        const fn = (params) => {
          const list = events.get(method) || [];
          events.set(
            method,
            list.filter((x) => x !== fn),
          );
          resolve(params);
        };
        events.set(method, [...(events.get(method) || []), fn]);
      }),
  };
}

const pages = [
  ["http://localhost:3000/", "home-theme.png", null],
];

await waitChrome();
const targets = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json());
const page = targets.find((t) => t.type === "page") || targets[0];
if (!page?.webSocketDebuggerUrl) throw new Error("No page target: " + JSON.stringify(targets));
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((res, rej) => {
  ws.addEventListener("open", res);
  ws.addEventListener("error", rej);
});
const { send, once } = attach(ws);
await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
});

for (const [url, file, scroll] of pages) {
  const loaded = once("Page.loadEventFired");
  await send("Page.navigate", { url });
  await Promise.race([loaded, new Promise((r) => setTimeout(r, 8000))]);
  await send("Runtime.evaluate", {
    expression: `new Promise((resolve) => {
      const done = () => {
        const loader = document.querySelector(".gx-loader");
        if (document.documentElement.dataset.gxReady === "1" && !loader) resolve(true);
        else setTimeout(done, 120);
      };
      done();
      setTimeout(() => resolve(false), 6000);
    })`,
    awaitPromise: true,
  });
  await new Promise((r) => setTimeout(r, 400));
  if (scroll === "bottom") {
    await send("Runtime.evaluate", {
      expression: `window.scrollTo(0, document.body.scrollHeight);`,
    });
    await new Promise((r) => setTimeout(r, 600));
  }
  const shot = await send("Page.captureScreenshot", { format: "png", fromSurface: true });
  writeFileSync(join(outDir, file), Buffer.from(shot.data, "base64"));
  console.log("wrote", file);
}

ws.close();
child.kill();
process.exit(0);
