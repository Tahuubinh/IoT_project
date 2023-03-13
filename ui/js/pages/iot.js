content_dashboard = $("#content_dashboard")
content_temperature = $("#content_temperature")
content_humidity = $("#content_humidity")
content_lamp = $("#content_lamp")

$(document).ready(function() {
    // gán các sự kiện cho các element:
    renderDashboard(content_dashboard);
    initEvents();

    // Load dữ liệu:
    loadData();
})

function loadData() {
    
    // $("#chartContainer").CanvasJSChart(options);
}

// $(function() {
// 	$(".chartContainer").CanvasJSChart({
// 		title: {
// 			text: "Temperature"
// 		},
// 		axisY: {
// 			title: "Temperature in C degree",
// 			includeZero: false
// 		},
// 		axisX: {
// 			interval: 1
// 		},
// 		data: [
// 		{
// 			type: "line", //try changing to column, area
// 			toolTipContent: "{label}: {y} &#8451",
// 			dataPoints: [
// 				{ label: "1",  y: 5.28 },
// 				{ label: "2",  y: 3.83 },
// 				{ label: "3",y: 6.55 },
// 				{ label: "4",y: 4.81 },
// 				{ label: "5",  y: 2.37 },
// 				{ label: "6", y: 2.33 },
// 				{ label: "7", y: 3.06 },
// 				{ label: "8",  y: 2.94 },
// 				{ label: "9",  y: 5.41 },
// 				{ label: "10",  y: 2.17 },
// 				{ label: "11",  y: 2.17 },
// 				{ label: "12",  y: 2.80 }
// 			]
// 		}
// 		]
// 	});
// });

function initEvents() {
    $(".item").click(function(){     
        $('.item').removeClass("item--selected");
        $(this).addClass("item--selected");
        item_name = $(this).attr('name');

        switch (item_name) {
            case "item_dashboard":
                renderDashboard(content_dashboard);
                break;
            case "item_temperature":
                renderTemperature(content_temperature);
                break;
            case "item_humidity":
                renderHumidity(content_humidity)
                break;
            case "item_lamp":
                renderLamp(content_lamp);
                break;
          }
        
    })

    $("#btnRefresh").click(function(){
        loadData();
    })

    
}

function renderDashboard(thispage){
    $('.page__content').remove();
    thispage.insertAfter('.page__header');
    $("#bong1").click(function() {
        changeLampStatus($(this));
    });

    $("#bong2").click(function() {
        changeLampStatus($(this));
    });
}

function renderTemperature(thispage) {
    $('.page__content').remove();
    thispage.insertAfter('.page__header');
    options = [
        { label: (new Date()).toLocaleString(),  y: 5.28 },
        { label: "2",  y: 3.83 },
        { label: "3",y: 6.55 },
        { label: "4",y: 4.81 },
        { label: "5",  y: 2.37 },
        { label: "6", y: 2.33 },
        { label: (new Date()).toLocaleString(), y: 3.06 },
        { label: (new Date()).toLocaleString(),  y: 2.94 },
        { label: (new Date()).toLocaleString(),  y: 5.41 },
        { label: (new Date()).toLocaleString(),  y: 2.17 },
        { label: (new Date()).toLocaleString(),  y: 2.17 },
        { label: (new Date()).toLocaleString(),  y: 2.80 }
    ]
    drawLinePlot("Nhiệt độ", options, "&#8451");    
}

function renderHumidity(thispage){
    $('.page__content').remove();
    thispage.insertAfter('.page__header');
    options = [
        { label: "1",  y: 5.28 },
        { label: "2",  y: 3.83 },
        { label: "3",y: 6.55 },
        { label: "4",y: 4.81 },
        { label: "5",  y: 2.37 },
        { label: "6", y: 2.33 },
        { label: "7", y: 3.06 },
        { label: "8",  y: 2.94 },
        { label: "9",  y: 5.41 },
        { label: "10",  y: 2.17 },
        { label: "11",  y: 2.17 },
        { label: "12",  y: 2.80 }
    ]
    drawLinePlot("Độ ẩm", options, "g/m<sup>3");  
}

function renderLamp(thispage){
    $('.page__content').remove();
    thispage.insertAfter('.page__header');
}

function changeLampStatus(lamp){
    var obj = {};
    if (lamp.hasClass("button__icon--lamp--on")){
        // lamp.removeClass("button__icon--lamp--on");
        // lamp.addClass("button__icon--lamp--off");
        // lamp.text('Tắt');
        obj = {name: lamp.attr('name'), status: 0};
    } else {
        // lamp.removeClass("button__icon--lamp--off");
        // lamp.addClass("button__icon--lamp--on");
        // lamp.text('Hoạt động');
        obj = {name: lamp.attr('name'), status: 1};
    }
    info = JSON.stringify(obj);
    publishMessage(info);
}

function drawLinePlot(title, options, unit){
    $(".chartContainer").CanvasJSChart({
        title: {
            text: ""
        },
        axisY: {
            title: title,
            includeZero: false
        },
        axisX: {
            labelAngle: 120,
            interval: 1
        },
        data: [
        {
            type: "line", //try changing to column, area
            toolTipContent: "{y} "+unit,
            dataPoints: options
        }
        ]
    });
}
