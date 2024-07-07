<!DOCTYPE html>
<html lang="en">
<!DOCTYPE html>
<head>
  <title>Pusher Test</title>
  <script src="https://js.pusher.com/8.2.0/pusher.min.js"></script>
  <script>

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('710fd38b13b7a9d112d3', {
  cluster: 'ap2'
});

var channel = pusher.subscribe('my-channel');

channel.bind('my-event', function(data) {
  console.log('Received event:', data);
  alert(JSON.stringify(data));
});

pusher.connection.bind('error', function(err) {
  console.error('Pusher error:', err);
});

pusher.connection.bind('connected', function() {
  console.log('Connected to Pusher');
});

pusher.connection.bind('disconnected', function() {
  console.warn('Disconnected from Pusher');
});
  </script>
</head>
<body>
  <h1>Pusher Test</h1>
  <p>
    Try publishing an event to channel <code>my-channel</code>
    with event name <code>my-event</code>.
  </p>
</body>
</html>
