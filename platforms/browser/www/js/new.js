$('#new_note').submit(function(e){
	e.preventDefault();
	saveNote();
});

function saveNote(){
	alert("Nota guardada");
	window.location.replace("index.html");
}