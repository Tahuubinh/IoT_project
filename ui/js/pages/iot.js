content_dashboard = $("#content_dashboard")
content_temperature = $("#content_temperature")
content_humidity = $("#content_humidity")
content_lamp = $("#content_lamp")

$(document).ready(function() {
    // gán các sự kiện cho các element:
    renderDashboard();
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
        $('.item').removeClass("item--selected")
        $(this).addClass("item--selected")
        item_name = $(this).attr('name')

        switch (item_name) {
            case "item_dashboard":
                renderDashboard();
                break;
            case "item_temperature":
                $('.page__content').remove();
                content_temperature.insertAfter('.page__header');
                break;
            case "item_humidity":
                $('.page__content').remove();
                content_humidity.insertAfter('.page__header');
                break;
            case "item_lamp":
                $('.page__content').remove();
                content_lamp.insertAfter('.page__header');
                break;
          }
        
    })

    $("#btnRefresh").click(function(){
        loadData();
    })

    
}

function renderDashboard() {
    $('.page__content').remove();
    content_dashboard.insertAfter('.page__header');
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
    drawTemperatureLinePlot(options);
    
}

function drawTemperatureLinePlot(options){
    $(".chartContainer").CanvasJSChart({
        title: {
            text: ""
        },
        axisY: {
            title: "Nhiệt độ",
            includeZero: false
        },
        axisX: {
            interval: 1
        },
        data: [
        {
            type: "line", //try changing to column, area
            toolTipContent: "{label}: {y} &#8451",
            dataPoints: options
        }
        ]
    });
}
