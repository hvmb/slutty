              var cryptoLogos = [
            "https://media.discordapp.net/attachments/975129514499772516/1047585564850913300/eth.png",
            "https://cdn.lewd.host/cEqI0tvW.png",
            "https://cdn.lewd.host/sGvccYZS.png",
            "https://cdn.discordapp.com/emojis/1154851434995654708.gif?size=96&quality=lossless",
            "https://s2.coinmarketcap.com/static/img/coins/200x200/328.png"
        ];

        var canvas = document.getElementById("cryptoCanvas");
        var context = canvas.getContext("2d");
        var logoCount = 50; // Number of logos to display
        var logos = [];

        function Logo(x, y, speed, logoImg) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.logoImg = logoImg;
        }

        Logo.prototype.update = function() {
            this.y += this.speed;

            if (this.y > canvas.height) {
                this.y = -100; // Reset the logo to the top
                this.x = Math.random() * canvas.width; // Randomize the x position
            }
        };

        function loadImage(url) {
            return new Promise(function(resolve, reject) {
                var image = new Image();
                image.onload = function() {
                    resolve(image);
                };
                image.onerror = function() {
                    reject(new Error("Failed to load image: " + url));
                };
                image.src = url;
            });
        }

        async function setup() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            try {
                var loadedLogos = await Promise.all(cryptoLogos.map(loadImage));

                for (var i = 0; i < logoCount; i++) {
                    var x = Math.random() * canvas.width;
                    var y = Math.random() * canvas.height;
                    var speed = Math.random() * 1 + 0.5; // Adjust the speed here
                    var logoImg = loadedLogos[Math.floor(Math.random() * loadedLogos.length)];

                    var logo = new Logo(x, y, speed, logoImg);
                    logos.push(logo);
                }

                setInterval(draw, 20); // Redraw every 20 milliseconds
            } catch (error) {
                console.error(error);
            }
        }

        function draw() {
            context.clearRect(0, 0, canvas.width, canvas.height);

            for (var i = 0; i < logoCount; i++) {
                var logo = logos[i];
                context.save();
                context.globalAlpha = 1.0; // Adjust the transparency here (0.0 - 1.0)
                context.drawImage(logo.logoImg, logo.x, logo.y, 40, 40); // Adjust the logo size here
                context.restore();
                logo.update();
            }
        }

        window.onload = setup;
        window.addEventListener("resize", function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });