/*
 * Version 0.3
 * 
 * How to use:
 * 1. Go to https://popcat.click/
 * 2. Press F12
 * 3. Go to "Console" tab
 * 4. Ignore the warning. There's no such malicious codes in this script. You can try to understand the code if you want
 * 5. Copy and paste this script
 * 6. Hit ENTER
 * 
 * The script will send 800 keypresses every 30 seconds (due to limits) and will automatically
 * reset the max sequential counts to bypass the ban (triggered pop cat). See `legitResetSequentialMaxPops()`
 * 
 * Make sure to lower the volume ;)
 */

let keyDownEvent = new KeyboardEvent("keydown", { key: "space" });
let keyUpEvent = new KeyboardEvent("keyup", { key: "space" });

function legitPop() {
  document.dispatchEvent(keyDownEvent);
  document.dispatchEvent(keyUpEvent);
}

async function legitMassPop(pop_count) {
  for (let i = 0; i < pop_count; i++) {
    legitPop();
  }
}

function legitClearCookie(cookie_name) {
  let cookies = document.cookie.split(";").map((cookieString) => {
    let cookieArray = cookieString.trim().split("=");
    return {
      name: cookieArray[0] ? cookieArray[0] : "",
      propertyString: cookieArray[1] ? cookieArray[1] : ""
    };
  });

  let filteredCookies = cookies.filter(
    (cookie) =>
      cookie.propertyString && cookie.name.toLowerCase() !== cookie_name
  );
  let cookieStringArray = filteredCookies.map((cookie) =>
    cookie.name.concat("=").concat(cookie.propertyString)
  );
  let cookieString = cookieStringArray.join("; ");

  document.cookie = cookieString;
}

function legitResetSequentialMaxPops() {
  let vueElement = document.getElementById("app").__vue__;

  vueElement.sequential_max_pops = 0;
}

function legitMassPopProcess(pop_count, cookie_name) {
  legitClearCookie(cookie_name);
  legitResetSequentialMaxPops();
  legitMassPop(pop_count);
}

function legitStartAutomation(pop_count, interval = 30e3, cookie_name = "bot") {
  legitMassPopProcess(pop_count, cookie_name);
  setInterval(() => {
    legitMassPopProcess(pop_count, cookie_name);
  }, interval);
}

legitStartAutomation(800);