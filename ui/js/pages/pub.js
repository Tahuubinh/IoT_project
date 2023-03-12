const broker = 'd0600b18851d4c2aa1208936bed0160b.s2.eu.hivemq.cloud';
const port = 8884;
const topic = 'python/mqtt';
const username = 'publisher';
const password = 'public123';
const client_id = 'python-mqtt-1';

const client = new Paho.MQTT.Client(broker, port, client_id);

function onConnect() {
  console.log('Connected to MQTT broker');
}

function onFailure(err) {
  console.error('Failed to connect to MQTT broker:', err);
}

function onMessageDelivered() {
  console.log('Message delivered');
}

function publishMessage() {
  //const message = document.getElementById('message').value;
  var message = 'b';
  const mqttMessage = new Paho.MQTT.Message(message);
  mqttMessage.destinationName = topic;
  mqttMessage.qos = 0;
  mqttMessage.retained = false;
  client.send(mqttMessage);
}

function connectToBroker() {
  client.connect({
    onSuccess: onConnect,
    onFailure: onFailure,
    userName: username,
    password: password,
    useSSL: true,
  });
}

function setupForm() {
  const form = document.querySelector('form');
  const publishBtn = document.getElementById('publish-btn');
  publishBtn.addEventListener('click', publishMessage);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    publishMessage();
  });
}

connectToBroker();
// setupForm();