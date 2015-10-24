// Container for all sprites
var sprites = [];

// Converts a canvas into an image
function createImage(ctx){

}

$(document).ready(function(){
	$(".textfield").css("height", "100%");
	$(".textfield").css("width", "100%");

	$(".mainpanel").resizable();

	// Checks if a file's been uploaded, and if so, pop it into the sprites
	$("#openfilebutton").change(
		function(event){
			if ($("#openfilebutton")[0].files[0]){
				var e = $("#openfilebutton")[0];
				var reader = new FileReader();
				var img = new Image();
				reader.readAsDataURL(event.target.files[0]);
				img.src = event.target.result;
				reader.onload = function(e){
				       img.onload = function(){
				           //canvas.width = img.width;
				           //canvas.height = img.height;
				           //ctx.drawImage(img,0,0);
				       }
				       //alert(e.target.result)
				       img.src = e.target.result;
				       //alert(img.width)

				       var sprite = [img, reader];
				       
				       $('#viewarea').append("<img src='"+img.src+"'>");

				       sprites.push(sprite);
				   }
				
				
			}
		}
	);
}
);