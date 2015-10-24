// Container for all sprites
var sprites = [];
var canvas;

// Converts a canvas into an image
function createImage(ctx){
	var img = new Image();
	img.src = ctx.toDataURL("image/png");
	return img;
}

function downloadCanvas(link, filename) {
	link.href = $("#ctx")[0].toDataURL();
	link.download = filename;
}

$(document).ready(function(){
	canvas = $("#ctx")[0];
	$(".textfield").css("height", "auto");
	$(".textfield").css("width", "100%");

	$(".mainpanel").resizable();

	// Checks if a file's been uploaded, and if so, pop it into the sprites
	$("#openfilebutton").change(
		function(event){
			if ($("#openfilebutton")[0].files[0]){
				var e = $("#openfilebutton")[0];
				var reader = new FileReader();
				var img = new Image();
				var x = 0;
				var y = 0;
				reader.readAsDataURL(event.target.files[0]);
				//img.src = event.target.result;
				reader.onload = function(e){
					img.src = e.target.result;

					var sprite = [img, reader];
					sprites.push(sprite);

					// Draws the latest image
					var ctx = $("#ctx")[0].getContext("2d");
					//$('#viewarea').append("<img src=\""+img.src+"\" id=\"tester\">");	
					if (img){
						if (img.width > canvas.width){
							canvas.width = img.width;
						}
						if (img.height > canvas.height){
							canvas.height = img.height;
						}

						ctx.fillStyle = '#f9f';
						ctx.fillRect(0, 0, 70, 70);

						ctx.drawImage(img, 0, 0);
					}			
				}
				
			}
		}
	);
	var img = createImage($("#ctx")[0]);
	//$("#downloadbutton").attr("href", img.src)
	
	$("#downloadbutton").on("click", function(){
			downloadCanvas(this, 'test.png');
			}
		)

	var ctx = $("#ctx")[0].getContext("2d");
	ctx.fillStyle = '#f90';
	ctx.fillRect(0, 0, 70, 70);

}	
);