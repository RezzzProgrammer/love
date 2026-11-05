const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

// Membuat ukuran canvas responsif memenuhi layar
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
});

const NAME = "I LOVE YOU";
const MESSAGE = "PIWPIWPIWPIWPIW❤️";

let frame = 0;
const heartItems = [];

// Membuat array koordinat hati
for (let i = 0; i < 650; i++) {
    const t = Math.random() * 2 * Math.PI;
    const r = Math.sqrt(Math.random());
    const x = 16 * Math.pow(Math.sin(t), 3) * r;
    const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * r;
    
    // Acak warna merah dan putih
    const color = Math.random() > 0.5 ? "#ff1744" : "#ffffff";
    
    // Acak ukuran font (sekitar 7 sampai 11)
    const size = Math.floor(Math.random() * 5) + 7;

    heartItems.push({ hx: x, hy: y, color: color, size: size, text: "I Love You" });
}

// Fungsi Animasi
function animate() {
    // Bersihkan frame sebelumnya dengan warna background
    ctx.fillStyle = "#030003";
    ctx.fillRect(0, 0, W, H);

    frame += 1;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (frame < 100) {
        const progress = Math.min(frame / 60, 1);
        
        // Teks Subtitle
        ctx.fillStyle = "#ff6688";
        ctx.font = `italic 17px Georgia`;
        ctx.fillText(MESSAGE, W / 2, H / 2 + 55);

        // Teks Utama
        const size = Math.floor(20 + 18 * progress);
        ctx.fillStyle = "white";
        ctx.font = `bold ${size}px Georgia`;
        ctx.fillText(NAME, W / 2, H / 2);

    } else if (frame < 145) {
        const progress = 1 - (frame - 100) / 45;
        const size = Math.max(1, Math.floor(38 * progress));
        
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${size}px Georgia`;
        ctx.fillText(NAME, W / 2, H / 2);
        
    } else {
        // Fase partikel hati yang berdetak
        const reveal = Math.min((frame - 145) / 90, 1);
        const pulse = 1 + 0.035 * Math.sin(frame * 0.065);

        // Skala zoom dinamis agar tidak terpotong di layar HP yang kecil
        const scale = Math.min(W, H) / 45;

        for (let i = 0; i < heartItems.length; i++) {
            const item = heartItems[i];
            
            const cx = W / 2 + item.hx * scale * pulse * reveal;
            const cy = H / 2 - item.hy * scale * pulse * reveal; 

            ctx.fillStyle = item.color;
            ctx.font = `bold ${item.size}px Arial`;
            ctx.fillText(item.text, cx, cy);
        }
    }

    // Loop animasi
    requestAnimationFrame(animate);
}

// Jalankan animasi
animate();