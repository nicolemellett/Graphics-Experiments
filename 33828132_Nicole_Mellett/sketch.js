/**
 * ----------------------------------------------------------------------
 * NOTE: If you use this file, please change the comments to reflect your
 *       changes and additions!
 * ---------------------------------------------------------------------
 * TITLE: Example starter template for making an image collage. Demonstrates compositing, 
 * cropping, filtering, and image blending:
 * 
 * THEME: 
 *
 * DOCUMENTATION:
 * 1. Compositing using blendMode() and tint()
 * 2. Masking using filter() to create a masks,
 *    blend modes to apply them
 * 3. Cropping and scaling using the image() function
 * 4. Repetition using loops and perlin noise
 * 
 * This example uses a few images:
 * 
 * 1. An illustrated wave background image (waveImage)
 * 3. A PNG image of Dolphins, is used with scaling and repetition
 * 4. A JPG image of a metal inro, which we use as an image masking filter
 * 
 * Image function reference: https://p5js.org/reference/#group-Image
 * ------------------------------------------
 * by Prashanth Thattai 2023 <p.thattairavikumar@gold.ac.uk> 
 * Adapted from Evan Raskob <e.raskob@gold.ac.uk>
 * modified by Nicole Mellett <nmell001@gold.ac.uk>
 * -----------------------------------------
 */


/// ----- 1. Put some images here! -------------
/// You need to download them from somewhere, try and find
/// a source that has proper usage rights (Creative Commons 
/// non-commercial, or public domain)

/// ---- MAKE SURE TO PUT THE URL YOU FOUND THEM AT HERE, 
/// ---- OR LET US KNOW THE SOURCE ------------------------

// Cat taking selfie
// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.thepioneerwoman.com%2Fhome-lifestyle%2Fpets%2Fa45081321%2Fcat-instagram-captions%2F&psig=AOvVaw3BT-TZNLisfuXjH3rKE82Y&ust=1710803632237000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNC_6ae2_IQDFQAAAAAdAAAAABAF

let catselfie1; 

// cat face to be masked into background
// https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Ffunny-cat&psig=AOvVaw2UfSz-RNBCexUtWPf_0Agf&ust=1710803499043000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDlyei1_IQDFQAAAAAdAAAAABAE

let catface;

// orange moving cat
// https://www.google.com/url?sa=i&url=https%3A%2F%2Fmail.ditlantas.sulsel.polri.go.id%2F%3Fg%3Dfunny-cat-hanging-on-white-background-stock-photo-adobe-ww-mN1QBYUK&psig=AOvVaw2UfSz-RNBCexUtWPf_0Agf&ust=1710803499043000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDlyei1_IQDFQAAAAAdAAAAABA6

let flyingcat;

// filtered image onto background
// https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fphoto%2F33540056-two-funny-cats-take-a-selfie-on-the-beach-humor-created-using-artificial-intelligence&psig=AOvVaw1hWy9jV4W19VSxcy1CFcSK&ust=1710803529757000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIinj_e1_IQDFQAAAAAdAAAAABAE

let twocats;


/// --- PRELOAD ------------------------
/// This is useful to load an image  or do a task that is important to run
/// *before* the sketch is loaded. preload() runs once *before* setup

function preload() {  
  // load images from the assets folder
  catselfie1 = loadImage('assets/catselfie1.jpg');

  catface = loadImage('assets/catface.jpg');


flyingcat = loadImage('assets/flyingcat.png')
    
twocats = loadImage('assets/twocats.jpg')
  pixelDensity(1); // if you are on a very large screen, this can
  // help your images scale to the proper size when drawn
}


///
/// Setup -------------------------
///
function setup() {  

  // tell us something out out images
  console.info('Image dimensions');
  console.info('----------------');
  
  console.info('catselfie1:' + catselfie1.width + '/' + catselfie1.height);

  console.info('catface:' + catface.width + '/' + catface.height);
    
  console.info('flyingcat:' + flyingcat.width + '/' + flyingcat.height)
    
console.info('twocats:' + twocats.width + '/' + twocats.height)

  createCanvas(catselfie1.width, catselfie1.height); // create a canvas EXACTLY the size of our image

  // turn the inro into a mask image:
  createMask(catface);
    
  twocats.filter(GRAY);
  replaceChannel(catselfie1, twocats, 0)

}

function replaceChannel(imgToReplace, channelImage, channelNumber=0){
    const colorChannels = 4
    imgToReplace.loadPixels()
    channelImage.loadPixels()
    
for (let row = 0; row < imgToReplace.height; row++){
  for (let column = 0; column < imgToReplace.width; column++){
      let pixelStartIndex = (column + row * imgToReplace.width) * colorChannels + 2
      
      let channelImgColumn = round(map(column, 0, imgToReplace.width, 0, channelImage.width))
      
      let channelImgRow = round(map(column, 0, imgToReplace.height, 0, channelImage.height))
      
      let channelImgStartIndex = (channelImgColumn + channelImgRow * channelImage.width) * colorChannels
      
      imgToReplace.pixels[pixelStartIndex + channelNumber] = channelImage.pixels[channelImgStartIndex + channelNumber]
  }
}
imgToReplace.updatePixels()
}


///-----------------------------
///--- DRAW --------------------
///-----------------------------

function draw() {
    
  blendMode(REPLACE)

  tint(255,255); // reset tint to full color and no transparency

  // make it so images don't blend, they replace what is under them
  blendMode(BLEND);

  imageMode(CORNER);
  // draw the image to fill the canvas exactly
  image(catselfie1, 0, 0);  

  colorMode(RGB);

  
  //draw the mask image onto the background image    
   drawMask(catface, width/3, height/2, width/2, height/3);
  
  // Draw upside-down of the inro.
  // Gene Kogan has a nice explanation: https://genekogan.com/code/p5js-transformations/

  // save current drawing state
  push();
    // Move to designed drawing position
    translate(2*width/3, 2*height/3);
    // rotate 180 degrees (PI)
    rotate(PI);
    // draw at current drawing position
    drawMask(catface, 0, 0, width/3, height/3);

    rotate(PI);
    // draw one next to it (we're not upside-down now!)
    translate(0.5*width/3, -height/6)
    drawMask(catface, 0, 0, width/3, height/3);
    
    // reset transformations (drawing state) to original
  pop();

  // blend using transparency (alpha)
  blendMode(BLEND);
    
    b = 100 + 200*noise(0.05 * frameCount)
    print(b)
  //tint(0,120,150, round(b)) // make everything after this a little transparent

  imageMode(CORNER);

  // use transparency again
  //blendMode(SCREEN);

  // draw some noses, to be weird
  push();
  
  let maxCats = 7;

  // start position
  translate(width/4, height/3);

  for (let n = 0; n < maxCats; n++)
  {
    let scaling = sin(map(n, 0, maxCats, 0, PI)); //0-1

    image(flyingcat, 20 * noise( (0.005+n*0.001) * frameCount), scaling*height/4 + 40 * noise( (0.005+n*0.001) * frameCount), 0.4*flyingcat.width, 0.2*flyingcat.height);
    translate(flyingcat.width/6,0); 
  }
    
  pop();
    
  //swapPixels(waveImage)

} // end draw()



///-------------------------------------------------------
/// --- MASKING-------------------------------------------
///
/**
 * Turn an image into a black and white mask using a threshold
 * filter to make all lighter pixels white and all darker ones black.
 * This permanently modifies the image, in memory!
 * 
 * @param {p5.Image} srcImage Source image to turn into a black/white mask image 
 */
function createMask(srcImage) {
  //-------------------------------------------------------
  // --- FILTERING ----------------------------------------
  // filter images -- must be done AFTER create canvas
  // https://p5js.org/reference/#/p5/filter
  //

  srcImage.filter(INVERT); // make this image slightly blurry
  srcImage.filter(THRESHOLD,0.75); // turn white/black only
  srcImage.filter(ERODE); // reduce light areas
}


/**
 * Draw a mask image onto the screen using SCREEN Blend mode. 
 * This means the black parts of this image will white out the
 * pixels below it, and the white parts of this image will let the 
 * pixels below show through unaltered.
 * 
 * @param {p5.Image} img Mask image
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 */
function drawMask(img, x, y, w, h){
    // or try screen
    blendMode(SCREEN);
    imageMode(CENTER); // draw using center coordinate
    image(img, x, y, w, h);
}


///-------------------------------------------------------
/// --- PIXEL MASKS -------------------------------------------
///
/**
 * Pixel Mask. Write a function to replace pixel channels from one 
 * image to another. This means the pixel channel of background image 
 * will be replaced by the pixels values of the Mask image. 
 * 
 * @param {p5.Image} src_img 
 * @param {p5.Image} tar_img Mask image
 */

function drawPixelMask(src_img, tar_img){
    
}

/**
 * Write a function to exchange pixel values from random positions
 * on the screen. This means the pixel channel of background image will start
 * blurring. 
 * 
 * @param {p5.Image} src_img 
 */

function swapPixels(src_img){
    
}

