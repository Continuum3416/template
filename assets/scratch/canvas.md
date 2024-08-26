function canvas(){
const canvas = document.getElementById('bannerCanvas');
const ctx = canvas.getContext('2d');
// document.getElementById('bannerCanvas').setAttribute('width', aWidth);
// document.getElementById('bannerCanvas').setAttribute('height', aHeight);

const svgUrls = [
    '../banner-svg/matrix.svg',
    '../banner-svg/stokes.svg',
    '../banner-svg/laplace.svg',
    '../banner-svg/discrete-fourier.svg',
    '../banner-svg/cauchy.svg',
    '../banner-svg/black-body.svg'
];
const svgImages = [];
const numSvgs = svgUrls.length;

// Configuration
const speed = 2; // Speed of the SVGs
const collisionDistance = 50; // Distance to detect collisions
const rotationSpeed = 0.01; // Speed of rotation (radians per frame)
let svgScaleFactor = 1.5; // Initial scale factor
const ROTATE = false;

const initialBounceSpeed = 90; // Initial speed when SVGs bounce away
const decelerationRate = 0.5; // Rate at which the speed decreases after the bounce

// Load SVG images
svgUrls.forEach((url, index) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
        svgImages[index] = img;
        if (svgImages.length === numSvgs) {
            startAnimation();
        }
    };
});

function startAnimation() {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Create initial positions, movement directions, and rotation angles for SVGs
    const svgs = svgImages.map(img => ({
        x: Math.random() * (canvasWidth - img.width * svgScaleFactor),
        y: Math.random() * (canvasHeight - img.height * svgScaleFactor),
        dx: (Math.random() - 0.5) * speed,
        dy: (Math.random() - 0.5) * speed,
        angle: Math.random() * Math.PI * 2, // Initial random angle
        dAngle: (Math.random() - 0.5) * rotationSpeed, // Random rotation speed
        img
    }));

    const desiredFPS = 40; // Default is 60
    const interval = 1000 / desiredFPS; // Time per frame in milliseconds
    let lastTime = 0;
    function animate(time) {
        
        if (time - lastTime >= interval) {
            lastTime = time;

            // Clear the entire canvas to prevent trailing
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            svgs.forEach((svg) => {
                // Apply deceleration if the SVG is bouncing
                // if (svg.bouncing) {
                //     svg.dx *= decelerationRate;
                //     svg.dy *= decelerationRate;

                //     // Stop deceleration once it slows down to the original speed
                //     if (Math.abs(svg.dx) <= speed && Math.abs(svg.dy) <= speed) {
                //         svg.dx = (svg.dx > 0 ? 1 : -1) * speed;
                //         svg.dy = (svg.dy > 0 ? 1 : -1) * speed;
                //         svg.bouncing = false; // Stop bouncing
                //     }
                // }

                // Move SVG
                svg.x += svg.dx;
                svg.y += svg.dy;

                // Bounce off the borders
                if (svg.x < 0 || svg.x > canvas.width - svg.img.width * svgScaleFactor) svg.dx *= -1;
                if (svg.y < 0 || svg.y > canvas.height - svg.img.height * svgScaleFactor) svg.dy *= -1;

                // Save the context and apply the transformation
                ctx.save();
                ctx.translate(svg.x + (svg.img.width * svgScaleFactor) / 2, svg.y + (svg.img.height * svgScaleFactor) / 2); // Move to the center of the image
                if(ROTATE){
                    // Rotate SVG
                    svg.angle += svg.dAngle;
                    ctx.rotate(svg.angle); // Rotate around the center
                } 
                ctx.drawImage(svg.img, -(svg.img.width * svgScaleFactor) / 2, -(svg.img.height * svgScaleFactor) / 2, svg.img.width * svgScaleFactor, svg.img.height * svgScaleFactor); // Draw the scaled image

                //Check collision with other SVGs
                // for (let i = index + 1; i < svgs.length; i++) {
                //     const other = svgs[i];
                //     if (isColliding(svg, other)) {
                //         // Simple collision response: reverse direction
                //         svg.dx *= -1;
                //         svg.dy *= -1;
                //         other.dx *= -1;
                //         other.dy *= -1;
                //     }
                // }

                ctx.restore();
            });
        }
        requestAnimationFrame(animate);
    }
    // function isColliding(svg1, svg2) {
    //     const dx = svg1.x - svg2.x;
    //     const dy = svg1.y - svg2.y;
    //     const distance = Math.sqrt(dx * dx + dy * dy);
    //     return distance < collisionDistance;
    // }
    animate(desiredFPS);

    // function bounce(event){
    //     const rect = canvas.getBoundingClientRect();
    //     const clickX = event.clientX - rect.left;
    //     const clickY = event.clientY - rect.top;

    //     svgs.forEach(svg => {
    //         const svgCenterX = svg.x + (svg.img.width * svgScaleFactor) / 2;
    //         const svgCenterY = svg.y + (svg.img.height * svgScaleFactor) / 2;

    //         const distance = Math.sqrt((clickX - svgCenterX) ** 2 + (clickY - svgCenterY) ** 2);

    //         if (distance < 100) { // Check if within 100px of the SVG
    //             // Bounce SVG away in a random direction with high initial speed
    //             svg.dx = (Math.random() - 0.5) * initialBounceSpeed;
    //             svg.dy = (Math.random() - 0.5) * initialBounceSpeed;
    //             svg.bouncing = true; // Set bouncing flag to true
    //         }
    //     });
    // }

    // canvas.addEventListener('click', bounce);
    // canvas.addEventListener('touchstart', bounce);
}

//var parent = document.getElementById("home-banner");

// Resize the canvas and adjust SVG scaling
fitToContainer(canvas);

function fitToContainer(canvas){
  // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
function resizeCanvas() {

    // Adjust SVG size if the window width is less than 580px
    svgScaleFactor = window.innerWidth < 580 ? 0.6 : 1;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

}

$(function() {
    $(".home-banner").load("../assets/source/home-banner.html", function(){
        canvas();
    }
    );
});