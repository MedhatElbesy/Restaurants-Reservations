import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: "your-pusher-key",
  cluster: "your-pusher-cluster",
  forceTLS: true,
});

export default echo;
