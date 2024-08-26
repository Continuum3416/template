function canvas() {
    const canvas = document.getElementById('bannerCanvas');
    const ctx = canvas.getContext('2d');

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
    const rotationSpeed = 0.01; // Speed of rotation (radians per frame)
    let svgScaleFactor = 1.5; // Initial scale factor
    const ROTATE = false;

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
                    // Move SVG
                    svg.x += svg.dx;
                    svg.y += svg.dy;

                    // Bounce off the borders
                    if (svg.x < 0 || svg.x > canvas.width - svg.img.width * svgScaleFactor) svg.dx *= -1;
                    if (svg.y < 0 || svg.y > canvas.height - svg.img.height * svgScaleFactor) svg.dy *= -1;

                    // Save the context and apply the transformation
                    ctx.save();
                    ctx.translate(svg.x + (svg.img.width * svgScaleFactor) / 2, svg.y + (svg.img.height * svgScaleFactor) / 2); // Move to the center of the image
                    if (ROTATE) {
                        // Rotate SVG
                        svg.angle += svg.dAngle;
                        ctx.rotate(svg.angle); // Rotate around the center
                    }
                    ctx.drawImage(svg.img, -(svg.img.width * svgScaleFactor) / 2, -(svg.img.height * svgScaleFactor) / 2, svg.img.width * svgScaleFactor, svg.img.height * svgScaleFactor); // Draw the scaled image
                    ctx.restore();
                });
            }
            requestAnimationFrame(animate);
        }

        animate(desiredFPS);
    }

    // Resize the canvas to fit its container
    function fitToContainer(canvas) {
        const parent = canvas.parentElement;
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
    }

    function resizeCanvas() {
        fitToContainer(canvas);

        // Adjust SVG size if the window width is less than 580px
        svgScaleFactor = window.innerWidth < 580 ? 0.6 : 1;
    }

    // Attach the resize event
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
}

// Load the banner and start the canvas animation
$(function() {
    $(".home-banner").load("../assets/source/home-banner.html", function() {
        canvas();
    });
});



