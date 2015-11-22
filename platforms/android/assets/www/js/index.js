var last_click_time = new Date().getTime();
var last_clicked_item;
var candidate_to_delete = false;

$(".collection-item").click(function(e){
    $(".collection-item").css("background-color","#fff");
	var new_click_time = e['timeStamp'];
	var new_clicked_item = $(this); 
	if (new_click_time && new_clicked_item.is(last_clicked_item) && (new_click_time - last_click_time) < 250) {
		$(this).css("background-color","grey");
		viewNote();
    }else{
		$(this).css("background-color","lightgrey");
		candidate_to_delete = true;
    }
    last_clicked_item = new_clicked_item;
    last_click_time = new_click_time;
});

$("#delete_note").click(function(){
	if(candidate_to_delete){
		if(confirm("¿Desea borrar este elemento? " + last_clicked_item.html())){
			removeNote();
			last_clicked_item.remove();
			last_clicked_item = null;
		}
	}
	else{
		alert("Ningún elemento seleccionado para eliminar.");
	}
});

function viewNote() {
    var url = "view.html?title=" + encodeURIComponent(last_clicked_item.html());
    window.location.href = url;
}

function removeNote(){

}