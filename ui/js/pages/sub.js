const client_id_receiver = 'python-mqtt-receiver';

// Create a MQTT client instance
const receiver = new Paho.MQTT.Client(broker, port, client_id_receiver);

// Set the callback function for when the client connects to the broker
receiver.onConnectionLost = onConnectionLost;
receiver.onMessageArrived = onMessageArrived;

// Connect the client to the broker
receiver.connect({
  onSuccess: onConnect,
  userName: username,
  password: password,
  useSSL: true
});

// Function to run when the client successfully connects to the broker
function onConnect() {
  console.log("Connected to MQTT broker!");
  // Subscribe to the specified topic
  receiver.subscribe(topic);
}

// Function to run when the client loses connection to the broker
function onConnectionLost(response) {
  console.log("Connection lost: " + response.errorMessage);
}

// Function to run when a message is received from the broker
function onMessageArrived(message) {
  console.log("Message received: " + message.payloadString);
  // Do something with the message data
}