import { initialize } from "app";

// Simple Manga Store Website Script

// Clear the body
document.body.innerHTML = "";
document.body.style.margin = "0";
document.body.style.fontFamily = "Segoe UI, Arial, sans-serif";
document.body.style.background = "#f8f8fc";

// Header
const header = document.createElement("header");
header.style.background = "#2d2d4d";
header.style.color = "#fff";
header.style.padding = "32px 0 16px 0";
header.style.textAlign = "center";
header.innerHTML = `
  <h1 style="margin:0;font-size:2.5rem;letter-spacing:2px;">Neko Hime Manga Store</h1>
  <p style="margin:0;font-size:1.2rem;">Your gateway to the world of manga!</p>
`;
document.body.appendChild(header);

// Main content
const main = document.createElement("main");
main.style.maxWidth = "900px";
main.style.margin = "32px auto";
main.style.padding = "0 16px 64px 16px"; // Added 64px bottom padding

// Manga grid
const mangas = [
  {
    title: "One Piece",
    author: "Eiichiro Oda",
    price: "$9.99",
    img: "https://m.media-amazon.com/images/I/81eB+7+CkUL.jpg"
  },
  {
    title: "My Hero Academia",
    author: "Kohei Horikoshi",
    price: "$8.99",
    img: "https://m.media-amazon.com/images/I/81p+xe8cbnL.jpg"
  },
  {
    title: "Attack on Titan",
    author: "Hajime Isayama",
    price: "$10.99",
    img: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg"
  },
  {
    title: "Demon Slayer",
    author: "Koyoharu Gotouge",
    price: "$9.49",
    img: "https://m.media-amazon.com/images/I/81Vw5Zg2-PL.jpg"
  },
  {
    title: "Naruto",
    author: "Masashi Kishimoto",
    price: "$8.49",
    img: "https://m.media-amazon.com/images/I/81t2CVWEsUL.jpg"
  },
  {
    title: "Spy x Family",
    author: "Tatsuya Endo",
    price: "$11.99",
    img: "https://m.media-amazon.com/images/I/81r+LNwqHGL.jpg"
  }
];

const grid = document.createElement("div");
grid.style.display = "grid";
grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
grid.style.gap = "24px";

mangas.forEach(manga => {
  const card = document.createElement("div");
  card.style.background = "#fff";
  card.style.borderRadius = "12px";
  card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
  card.style.padding = "16px";
  card.style.textAlign = "center";
  card.style.transition = "transform 0.2s";
  card.onmouseover = () => card.style.transform = "scale(1.03)";
  card.onmouseout = () => card.style.transform = "scale(1)";

  card.innerHTML = `
    <img src="${manga.img}" alt="${manga.title}" style="width:100px;height:150px;object-fit:cover;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,0.10);margin-bottom:12px;">
    <h2 style="font-size:1.1rem;margin:0 0 8px 0;">${manga.title}</h2>
    <p style="margin:0 0 8px 0;color:#666;">by ${manga.author}</p>
    <p style="font-weight:bold;margin:0 0 12px 0;">${manga.price}</p>
    <button style="background:#ff6f61;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:1rem;">Add to Cart</button>
  `;
  grid.appendChild(card);
});

main.appendChild(grid);

// --- Add a title and a big canvas for the minigame ---
const minigameTitle = document.createElement("h2");
minigameTitle.textContent = "Check out our new minigame. Help Neko Hime cat recover the lost mangas and get some free mangas!";
minigameTitle.style.textAlign = "center";
minigameTitle.style.margin = "48px 0 16px 0";
minigameTitle.style.fontSize = "1.3rem";
minigameTitle.style.color = "#2d2d4d";
main.appendChild(minigameTitle);

const canvasContainer = document.createElement("div");
canvasContainer.style.display = "flex";
canvasContainer.style.justifyContent = "center";
canvasContainer.style.alignItems = "center";
canvasContainer.style.margin = "0 0 40px 0";

const minigameCanvas = document.createElement("canvas");
minigameCanvas.id = "minigame-canvas";
minigameCanvas.width = 800;
minigameCanvas.height = 500;
minigameCanvas.style.background = "#222";
minigameCanvas.style.borderRadius = "16px";
minigameCanvas.style.boxShadow = "0 4px 24px rgba(0,0,0,0.18)";
minigameCanvas.style.display = "block";
minigameCanvas.style.maxWidth = "95vw";
minigameCanvas.style.maxHeight = "60vh";

canvasContainer.appendChild(minigameCanvas);
main.appendChild(canvasContainer);

document.body.appendChild(main);

// Footer
const footer = document.createElement("footer");
footer.style.background = "#2d2d4d";
footer.style.color = "#fff";
footer.style.textAlign = "center";
footer.style.padding = "16px 0";
footer.style.position = "fixed";
footer.style.width = "100%";
footer.style.bottom = "0";
footer.innerHTML = `
  <span>&copy; ${new Date().getFullYear()} Neko Hime Manga Store. All rights reserved.</span>
`;
document.body.appendChild(footer);

initialize(minigameCanvas);