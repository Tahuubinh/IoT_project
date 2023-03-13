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
  let info = JSON.parse(message.payloadString);
  console.log(info);
  if (info.name == "bong1"){
    setLampStatus($('#bong1'), info.status);
  } else if (info.name == "bong2"){
    setLampStatus($('#bong2'), info.status);
  } else if (info.name == "temperature"){
    $.ajax({
        url: "",
        method: "GET",
        success: function(res) {
          if (res["status"]){
            $('#temperature').text('Nhiệt độ: ' + res["status"] + String.fromCharCode(8451));
          } else {
            $('#temperature').text('Nhiệt độ: Không thu được kết quả ' + String.fromCharCode(8451));
          }
        },
        error: function(res) {
          alert("Error in get temperature");
        }
        
    });
  } else if (info.name == "humidity"){
    $.ajax({
      url: "",
      method: "GET",
      success: function(res) {
        if (res["status"]){
          $('#humidity').text('Độ ẩm: ' + res["status"] + String.fromCharCode(0x00B3));
        } else {
          $('#humidity').text('Độ ẩm: Không thu được kết quả g/m' + String.fromCharCode(0x00B3));
        }
      },
      error: function(res) {
        alert("Error in get humidity");
      }
      
  });
  }
}

function setLampStatus(lamp, status){
  if (status == "0"){
    lamp.removeClass("button__icon--lamp--on");
    lamp.addClass("button__icon--lamp--off");
    lamp.text('Tắt');
  } else {
    lamp.removeClass("button__icon--lamp--off");
    lamp.addClass("button__icon--lamp--on");
    lamp.text('Hoạt động');
  }
  
}