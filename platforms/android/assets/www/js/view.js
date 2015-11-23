var queryString = new Array();

document.addEventListener('deviceready',onDeviceReady);

function onDeviceReady(){
	if (queryString.length == 0) {
		if (window.location.search.split('?').length > 1) {
			var params = window.location.search.split('?')[1].split('&');
			for (var i = 0; i < params.length; i++) {
				var key = params[i].split('=')[0];
				var value = decodeURIComponent(params[i].split('=')[1]);
				queryString[key] = value;
			}
		}
	}
	var fileName = queryString["title"];
	showContent(fileName);
}

function showContent(fileName){
	window.requestFileSystem(window.PERSISTENT, 1024, function(filesystem) {
		filesystem.root.getFile(fileName+'.txt', {}, function(fileEntry) {
			fileEntry.file(function(file) {
				var reader = new FileReader();
				reader.onloadend = function(e) {
					var note_content = $("#note_content");
					var note_title = $("#note_title");
					note_title.value = fileName;
					note_content.value = this.result;
				};
				reader.readAsText(file);
			}, errorHandler);
		}, errorHandler);

	});
}