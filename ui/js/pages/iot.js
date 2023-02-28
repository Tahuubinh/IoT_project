$(document).ready(function() {
    // gán các sự kiện cho các element:
    
    initEvents();

    // Load dữ liệu:
    // loadData(1);
})

function initEvents() {
    $(".item").click(function(){     
        $('.item').removeClass("item--selected")
        $(this).addClass("item--selected")
    })
}