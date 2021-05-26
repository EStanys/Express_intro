//sitas failas niekada neturetu pakliuti pas vartotoja, jei viskas gerai padaryta, tai galima saugot jautrius dalykus. Visa tai bus nutolusiam servery

const { response } = require('express');
const express = require('express'); // isitraukiam express is npm
const app = express(); // sukuriam express objekta
const path = require('path'); // kad galetume kelia gaut response

const indexPath = path.join(__dirname, 'html', 'index.html'); // nurodysim kelia iki index.html failo
const aboutPath = path.join(__dirname, 'html', 'about.html'); // nurodysim kelia iki index.html failo
console.log(' indexPath', indexPath);

// main route aprasom:

app.get('/', (request, response) => {
  response.sendFile(indexPath);
});
//   response.send('<h1> Hello from Express</h1>');
// http://localhost:3000/ gausim index.html faila. responsu issiunciam is serverio index.html faila

app.get('/about', (req, resp) => resp.sendFile(aboutPath));
// i narsykle ivedus adresa su /about gale, gausim tai kas bus response parasyta

// paleidzia serveri ir klausosi httm ir kt requestu nurodytu portu
app.listen(3000, () => console.log('Server is running')); //portas, kuriam naudosim (klausom porto. Funkcija - ka atliksim kol klausysim porto)
