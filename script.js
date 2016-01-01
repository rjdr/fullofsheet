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
		sprite.x = lastSprite.x + lastSprite.img.width;
		sprite.y = lastSprite.y;
		// If sprite's bottom is below the max height of the spritesheet, move to the right
		// use $("#id").val() to get a textfield's value
		if ((sprite.x + sprite.img.width) > $("#maxsizefield").val()){
			sprite.x = 0;
			sprite.y = lastSprite.y + lastSprite.img.height;
		}
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
		$("#saveableimage").attr("src", canvas.toDataURL("image/png"));
	}
}

// Shows a listing of frames
function listFrames(sprites){
	// Gets the frame's name and displays it, along with it's current index #
	for (i = 0; i < sprites.length; i++){
		var sprite = sprites[i];
		var name = sprite.name;
	}
}

// Handles uploading of a new file, its display on the canvas, and its frame listing
function fileChanged(event){
	if ($("#openfilebutton")[0].files[0]){
		var e = $("#openfilebutton")[0];
		var reader = new FileReader();
		var img = new Image();
		var filename = e.value.split("\\").pop();
		var x = 0;
		var y = 0;
		
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = function(e){
			img.src = e.target.result;

			// Larger images may take a while to load, so apply an onload fn to them
			img.onload = function(){
				var sprite = {img:img, reader:reader, x:x, y:y, name:filename};
				setSpritePosition(sprite, sprites);
				sprites.push(sprite);
				$("#frames").append("<div class='frame'>" + sprites.length + ": " + sprite.name+"</div>");

				// Resize canvas, if necessary
				if (sprite.x + img.width > canvas.width){
					canvas.width = sprite.x + img.width;
				}
				if (sprite.y + img.height > canvas.height){
					canvas.height = sprite.y + img.height;
				}

				// Draw all sprites, since resizing clears the canvas
				refreshCanvas();

				// When an image is uploaded, replace the old file upload form
				// This lets us upload the same file several times
				$("#openfilebutton").replaceWith('<input class="textfield" type="file" \
					value="Open file..." id="openfilebutton">');
				$("#openfilebutton").change(
					function(event){
						fileChanged(event);
					}
				);
			}	
		}
		
	}
}

$(document).ready(function(){
	canvas = $("#ctx")[0];

	$(".mainpanel").resizable();

	// Checks if a file's been uploaded, and if so, pop it into the sprites
	$("#openfilebutton").change(
		function(event){
			fileChanged(event);
		}
	);

	// Clears out the sprite listing and the canvas when the clear button is clicked
	$("#clearbutton").on("click", function(){
			sprites = [];
			canvas.width = 10;
			canvas.height = 10;
		}
	)
	
	// Downloads the file as the specified file name.png
	$("#downloadbutton").on("click", function(){
			downloadCanvas(this, $("#spritesheetname")[0].value + '.png');
		}
	)

	// Refreshes the canvas occasionally for when images don't immediately display
	setInterval(refreshCanvas, 200);

	}	
);


