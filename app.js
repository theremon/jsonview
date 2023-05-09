$(function () {
	$('#btn-json-viewer').click(function () {
		try {
			var input = eval('(' + $('#json-input').val() + ')');
			$('#json-renderer').show();
			$('#json-renderer').json_viewer(input);
		}
		catch (error) {
			alert("Cannot eval JSON: " + error);
		}
	});
	$('#btn-json-viewer').click();

});