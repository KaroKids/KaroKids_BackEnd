


const colores = ["red", "blue", "black", "white", "pink"];
const tallas = ["S", "XS", "M", "L", "XL"];

async function crearProductosAleatorios() {
    let arr =[];
  for (let i = 1; i <= 20; i++) {
    const producto = {
      nombre: `Producto ${i}`,
      descripcion: `Descripción del Producto ${i}`,
      imagen_principal: `imagen${i}.jpg`,
      imagenes_secundarias: [`imagen${i}_1.jpg`, `imagen${i}_2.jpg`],
      video: `video${i}.mp4`,
      precio: Math.random() * 100, // Precio aleatorio entre 0 y 100
      edad: getRandomEnumValue(["recien-nacido", "bebe", "infantil", "junior", "otros"]),
      genero: getRandomEnumValue(["chico", "chica", "universal"]),
      destacado: Math.random() < 0.5, // 50% de probabilidad de ser destacado
      inactivo: Math.random() < 0.2, // 20% de probabilidad de estar inactivo
      stock: generarStockAleatorio(),
    };

    arr.push(producto)
  }
return(arr)
}

function getRandomEnumValue(enumValues) {
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  return enumValues[randomIndex];
}

function generarStockAleatorio() {
  const stock = {};
  for (const talla of tallas) {
    stock[talla] = [];
    for (const color of colores) {
      const cantidad = Math.floor(Math.random() * 10) + 1; // Cantidad aleatoria entre 1 y 10
      stock[talla].push({ color, cantidad });
    }
  }
  return JSON.stringify(stock);
}
console.log(crearProductosAleatorios());