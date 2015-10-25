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

// Sets the sprites position to the next available slot
function setSpritePosition(sprite, sprites){
	if (sprites.length > 0){
		var lastSprite = sprites[sprites.length - 1];
		sprite.y = lastSprite.y + lastSprite.img.height;
	}
}

// Refreshes the canvas every few frames
// Sometimes there's a delay with loading images, and this should handle it
function refreshCanvas(){
	if (canvas){
		var ctx = canvas.getContext("2d");
		for (i = 0; i < sprites.length; i++){
			ctx.drawImage(sprites[i].img, sprites[i].x, sprites[i].y);
		}
	}
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
				reader.onload = function(e){
					img.src = e.target.result;

					// Larger images may take a while to load, so apply an onload fn to them
					img.onload = function(){
						var sprite = {img:img, reader:reader, x:x, y:y};
						setSpritePosition(sprite, sprites)
						sprites.push(sprite);

						// Resize canvas, if necessary
						if (sprite.x + img.width > canvas.width){
							canvas.width = sprite.x + img.width;
						}
						if (sprite.y + img.height > canvas.height){
							canvas.height = sprite.y + img.height;
						}

						// Draw all sprites, since resizing clears the canvas
						refreshCanvas();
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

	// Refreshes the canvas occasionally for when images don't immediately display
	setInterval(refreshCanvas, 100);

	}	
);


