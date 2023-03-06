// *************************** to generate a number of Chinese characters ***************************
// to get a random number within the specified range
function randomNum(min, max) {
  return Math.floor(Math.random() * (min - max) + max);
}

// to decode the UNICODE
function solveUnicode(str) {
  str = "\\u" + str;
  str = str.replace(/\\/g, "%");
  // Convert to Chinese characters
  str = unescape(str);
  str = str.replace(/%/g, "\\");
  return str;
}

// to enerate random Chinese characters including rare ones
function randomName(length) {
  let name = "";
  for (let i = 0; i < length; i++) {
    let unicodeNum = "";
    unicodeNum = randomNum(0x4e00, 0x9fa5).toString(16);
    name += solveUnicode(unicodeNum);
  }
  return name;
}
// *************************** end ***************************

// *************************** to define a periodic execution function that carries a callback function ***************************
function mySetInterval(targetFunction, targetTime) {
  let t = null;
  return {
    start: function () {
      t = setTimeout(() => {
        targetFunction();
        this.start();
      }, targetTime);
    },
    end: function () {
      clearTimeout(t);
      t = null;
    },
  };
}
// *************************** end ***************************

// values for the textarea and button
var classForText =
  "m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0";
var classForBtn =
  "absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent";

// The number of seconds of heartbeat detection and to check whether heartbeat detection is performed
var secondForSearch = 10;
var secondForCheck = 10;

// heartbeat detection
let reqHeartbeatIntervalRef = mySetInterval(() => {
  var input = document.getElementsByClassName(classForText)[0];

  // Type meaningless characters every ten seconds
  if (input.value === "") {
    input.value = randomName(5);
    setTimeout(() => {
      var btn = document.getElementsByClassName(classForBtn)[0];
      btn.click();
    }, 1000);
  }
}, 1000 * secondForSearch);
// Start performing heartbeat detection until you manually end it!
reqHeartbeatIntervalRef.start(); 

// to check whether heartbeat detection is required
setInterval(function () {
  if (
    // 1. If the current mouse focus is input box then stop heartbeat detection at this time
    // so that we can input our own problems
    document.getElementsByClassName(classForText)[0] == document.activeElement
  ) {
    console.log("Turning off the Heartbeat detection...");
    reqHeartbeatIntervalRef.end(); 
  } else {
    // 2. Otherwise, the heartbeat detection starts. 
    // The specific heartbeat seconds can be customized
    reqHeartbeatIntervalRef.start();
  }
}, 1000 * secondForCheck);
