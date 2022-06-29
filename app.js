import express from "express";
import Contenedor from './contenedor.js';

let miContenedor = new Contenedor('./files/productos.txt');

// Guardar productos iniciales en el archivo
const agregarProductos = async() => {
	await miContenedor.save({
		"title": "Sombrero de terciopelo",
		"price": 7500,
		"thumbnail": "https://pixabay.com/es/vectors/sombrero-sombrero-de-terciopelo-157581/"
	});
	await miContenedor.save({
		"title": "Botas para lluvia",
		"price": 5400,
		"thumbnail": "https://pixabay.com/es/illustrations/botas-de-goma-lluvia-oto%c3%b1o-botas-639248/"
	});
	await miContenedor.save({
		"title": "Gafas de sol",
		"price": 3200.5,
		"thumbnail": "https://pixabay.com/es/photos/atardecer-playa-gafas-de-sol-arena-1283872/"
	});
}
agregarProductos();

const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});

app.get('/productos', async(req, res) => {
	let products = await miContenedor.read();
	res.send(products);
});

app.get('/productoRandom', async(req, res) => {
	let products = await miContenedor.read();
	let randomProduct = products[Math.floor(Math.random() * products.length + 0)];
	res.send(randomProduct);
});