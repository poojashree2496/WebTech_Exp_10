const http = require('http');

const PORT = 3000;

// Escape special characters before showing the URL inside HTML
function esc(text) {
  return text.replace(/[&<>"']/g, (c) => '&#' + c.charCodeAt(0) + ';');
}

// Common page layout in the Gaming Community black & red theme
function page(title, heading, body, req) {
  return `<!DOCTYPE html>
<html>
<head>
<title>${title}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Arial,sans-serif;background:#070707;color:#fff;line-height:1.6}
header{background:linear-gradient(90deg,#d40000,#8b0000,#d40000);padding:20px;text-align:center;border-bottom:2px solid #ff2020}
nav{background:#111;padding:15px;text-align:center;border-bottom:1px solid #e00000}
nav a{color:#fff;text-decoration:none;margin:0 18px;font-weight:bold}
nav a:hover{color:#ff3030}
.box{width:90%;max-width:850px;margin:35px auto;background:#101010;border:1px solid #850000;border-radius:12px;padding:30px}
.box h2{color:#ff3333;margin-bottom:12px}
.box p{color:#ddd;margin-bottom:8px}
.info{margin-top:18px;background:#151515;border:1px solid #720000;border-radius:8px;padding:15px}
.info b{color:#ff3838}
footer{background:#111;border-top:2px solid #d00000;text-align:center;padding:20px;color:#bbb}
</style>
</head>
<body>
<header><h1>GAMING COMMUNITY</h1><p>Node.js Server-Side Application</p></header>
<nav><a href="/">Home</a><a href="/home">Lobby</a><a href="/about">About</a></nav>
<div class="box">
<h2>${heading}</h2>
${body}
<div class="info">
<p><b>Request URL:</b> ${esc(req.url)}</p>
<p><b>Request Method:</b> ${req.method}</p>
</div>
</div>
<footer>&copy; 2026 Gaming Community | Served by Node.js http module</footer>
</body>
</html>`;
}

const server = http.createServer((req, res) => {
  console.log(`${new Date().toLocaleTimeString()}  ${req.method} ${req.url}`);
  let status = 200, html;

  if (req.url === '/') {
    html = page('Node.js Server', 'Welcome to Node.js!',
      '<p>This is a server-side application for the Gaming Community.</p>', req);
  } else if (req.url === '/home') {
    html = page('Home - Lobby', 'Welcome to the Gaming Lobby',
      '<p>Join live tournaments in Valorant, Call of Duty and Minecraft.</p>' +
      '<p>Find your squad and climb the community leaderboard.</p>', req);
  } else if (req.url === '/about') {
    html = page('About Us', 'About Gaming Community',
      '<p>Gaming Community is a platform for players to connect, team up and compete.</p>' +
      '<p>This page is generated on the server using the Node.js http module.</p>', req);
  } else {
    status = 404;
    html = page('404 Not Found', '404 - Page Not Found',
      '<p>The level you are looking for does not exist.</p>', req);
  }

  res.writeHead(status, { 'Content-Type': 'text/html' });
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
