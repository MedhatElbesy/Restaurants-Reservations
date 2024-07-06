import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

Pusher.logToConsole = true;

const echo = new Echo({
  broadcaster: "pusher",
  key: "710fd38b13b7a9d112d3",
  cluster: "ap2",
  forceTLS: true,
});

export default echo;
