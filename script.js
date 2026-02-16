document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const overlay = document.getElementById('intro-overlay');
    const mainContainer = document.getElementById('main-container');
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const typingTextElement = document.getElementById('typing-text');
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');

    // --- Config ---
    const messages = [
        "Năm mới 2026 đến rồi, chúc Quỳnh luôn giữ được nụ cười tươi nhất (cười thân thiện như sticker em hay gửi ấy kkk).",
        "Anh mong năm nay em sẽ gặp được những người bạn thực sự trân trọng mình, không còn phải buồn vì những chuyện cũ nữa.",
        "Chúc công chúa của bố mẹ luôn được chiều chuộng, vạn sự hanh thông và lúc nào thấy áp lực quá thì cứ nhắn anh, anh nguyện làm chỗ dựa tinh thần miễn phí cho em cả năm luôn!"
    ];
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    // --- Event Listeners ---
    startBtn.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
            mainContainer.classList.remove('hidden');
            startFireworks();
            typeWriter();

            // Try to play music
            bgMusic.volume = 0.5;
            bgMusic.play().catch(e => console.log("Audio autoplay blocked, user must interact"));
        }, 1000);
    });

    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicBtn.textContent = '🎵';
        } else {
            bgMusic.pause();
            musicBtn.textContent = '🔇';
        }
    });

    // --- Typing Effect ---
    function typeWriter() {
        // Typing logic for a continuous paragraph or separate lines
        // Let's do a single combined message for simplicity in the box
        const fullMessage = messages.join("\n\n");

        if (charIndex < fullMessage.length) {
            typingTextElement.innerHTML += fullMessage.charAt(charIndex) === '\n' ? '<br>' : fullMessage.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            document.querySelector('.cursor').style.display = 'none'; // Stop blinking cursor when done
        }
    }

    // --- Fireworks Effect ---
    let fireworks = [];
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.sy = Math.random() * -3 - 4; // speed y
            this.sx = Math.random() * 2 - 1; // speed x
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            this.size = 2;
        }
        update() {
            this.x += this.sx;
            this.y += this.sy;
            this.sy += 0.05; // gravity
            this.size -= 0.02;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.sx = Math.random() * 6 - 3;
            this.sy = Math.random() * 6 - 3;
            this.color = color;
            this.size = Math.random() * 3 + 1;
            this.life = 100;
        }
        update() {
            this.x += this.sx;
            this.y += this.sy;
            this.sy += 0.05; // gravity
            this.life -= 1.5;
            this.size *= 0.96;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.life / 100;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function createFirework() {
        // Reduce frequency on mobile
        const isMobile = window.innerWidth < 768;
        const chance = isMobile ? 0.015 : 0.03;

        if (Math.random() < chance) {
            fireworks.push(new Firework());
        }
    }


    // --- Petal Effect ---
    const petals = [];
    class Petal {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.vx = Math.random() * 2 - 1;
            this.vy = Math.random() * 1 + 1;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 2 - 1;
            this.size = Math.random() * 5 + 3;
            // Pink for cherry blossom or Gold for Ochna
            this.color = Math.random() > 0.5 ? '#ffc0cb' : '#ffd700';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            // Draw a simple petal shape (ellipse)
            ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function createPetals() {
        if (petals.length < 50) {
            petals.push(new Petal());
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(26, 11, 28, 0.2)'; // Trail effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        createFirework();
        createPetals();

        // Fireworks update
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();
            if (fireworks[i].sy >= 0 || fireworks[i].size <= 0) {
                // Explode
                // Use the firework's position, but ensure we create particles
                let fx = fireworks[i].x;
                let fy = fireworks[i].y;
                let fcolor = fireworks[i].color;

                // Reduce particles on mobile for performance
                const isMobile = window.innerWidth < 768;
                const particleCount = isMobile ? 15 : 30;

                for (let j = 0; j < particleCount; j++) {
                    particles.push(new Particle(fx, fy, fcolor));
                }
                fireworks.splice(i, 1);
            }
        }

        // Particles update
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }

        // Petals update
        petals.forEach(petal => {
            petal.update();
            petal.draw();
        });

        requestAnimationFrame(animate);
    }

    function startFireworks() {
        animate();
    }
});
