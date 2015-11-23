$('#new_note').submit(function(e){
	e.preventDefault();
	var title = $("#note_title").val();
	var content = $("#note_content").val();
	console.log(title);
	console.log(content);
	saveNote('/MyNotes/' + title + '.txt',content);
});

function saveFile(filename, content) {
	window.requestFileSystem(window.PERSISTENT, 1024, function(filesystem) {
  		filesystem.root.getFile(filename, {create: true}, function(fileEntry) {
    		fileEntry.createWriter(function(fileWriter) {
				fileWriter.onwriteend = function(e) {
					alert("Nota guardada");
					window.location.replace("index.html");
				};
				fileWriter.onerror = function(e) {
					alert('¡Ocurrió un error y la nota no pudo ser guardada!');
				};
	      		var contentBlob = new Blob([content], {type: 'text/plain'});
	      		fileWriter.write(contentBlob);
    		}, errorHandler);
		}, errorHandler);
	});
}

function saveNote(title, content){
	window.requestFileSystem(window.PERSISTENT, 1024, function(filesystem) {
		filesystem.root.getFile(title, {create: true}, function(fileEntry) {
			fileEntry.createWriter(function(fileWriter) {
				var fileParts = [content];
				var contentBlob = new Blob(fileParts, {type : 'text/html'});    
				fileWriter.write(contentBlob);
				fileWriter.onwriteend = function(e) { 
					alert("Nota guardada");
					window.location.replace("index.html");
				};
				fileWriter.onerror = function(e) {
					alert('¡Ocurrió un error y la nota no pudo ser guardada!');
				};
			}, errorHandler);
		}, errorHandler);
	});
}