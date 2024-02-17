const { crearColor } = require("../controllers/coloresController");
const { crearCategoria } = require("../controllers/categoriasController");
const { crearProducto } = require("../controllers/productosControllers");
const { crearTalla } = require("../controllers/tallasControllers");


const cargaColores = ()=>{
    const colores = ["grey", "black", "white", "green", "orange", "blue", "red", "pink", "sky", "brown", "yellow"];
    colores.map((color)=>{
        return crearColor(color);
    })
}


const cargaTallas = ()=>{
    const tallas = ["XS", "S", "M", "L", "XL", "XXL"];
    tallas.map((talla)=>{
        return crearTalla(talla);
    })
}


const cargaCategorias = ()=>{
    const categorias = ["recien nacido", "bebe", "junior", "infantil"];
    categorias.map((categoria)=>{
        return crearCategoria(categoria);
    })
}




const cargaProductos = ()=>{
    const productos = [
        {nombre :  "BOXER SKULL",
    descripcion : "Boxer de jersey. Tiene estampa que brilla en la oscuridad ",
     imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17572159-1600-auto?v=638272813777600000&width=1600&height=auto&aspect=true",
      imagenes_secundarias : [" https://mimoar.vtexassets.com/arquivos/ids/17572158-1600-auto?v=638272813764800000&width=1600&height=auto&aspect=true " , "https://mimoar.vtexassets.com/arquivos/ids/17581099-1600-auto?v=638300455104400000&width=1600&height=auto&aspect=true"],
       video : " ",
       precio : 6900,
         destacado: true,
         inactivo: false
      }   ,
       {nombre :  "PIJAMA LIONS",
       descripcion : "Pijama de short y remera en rib estampado con elastano.",
        imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17578835-1600-auto?v=638291795317800000&width=1600&height=auto&aspect=true",
         imagenes_secundarias : [" https://mimoar.vtexassets.com/arquivos/ids/17578836-1600-auto?v=638291795319500000&width=1600&height=auto&aspect=true"],
          video : " ",
           precio : 22900,
            destacado: true,
            inactivo: false } ,
             {nombre :  "MEDIA LIONS",
             descripcion : "https://mimoar.vtexassets.com/arquivos/ids/17572057-1600-auto?v=638272813123170000&width=1600&height=auto&aspect=true",
              imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17572049-1600-auto?v=638272813095170000&width=1600&height=auto&aspect=true",
               imagenes_secundarias : [" https://mimoar.vtexassets.com/arquivos/ids/17572049-1600-auto?v=638272813095170000&width=1600&height=auto&aspect=true"],
                video : " ",
                 precio : 5300,
                  destacado: true,
                  inactivo: false
            
               }   ,
                {nombre :  "BERMUDA MINI RIO",
                descripcion : " Bermuda de rústico,tiene bolsillos en recortes laterales, con elástico en cintura.",
                 imagen_principal: " https://mimoar.vtexassets.com/arquivos/ids/17578605-1600-auto?v=638291794695530000&width=1600&height=auto&aspect=true",
                  imagenes_secundarias : [" https://mimoar.vtexassets.com/arquivos/ids/17578606-1600-auto?v=638291794697500000&width=1600&height=auto&aspect=true "],
                   video : " ",
                    precio : 22900,
                     destacado: true,
                     inactivo: false
               },
               {nombre :  "REMERA JR CALCIS",
                descripcion : "Remera de jeresey, con estampa full degrade en delantero y estampa plana.Calce hombro caído y mas holgda",
                 imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17572395-1600-auto?v=638272864712200000&width=1600&height=auto&aspect=true",
                  imagenes_secundarias : [" https://mimoar.vtexassets.com/arquivos/ids/17577695-1600-auto?v=638291081309000000&width=1600&height=auto&aspect=truehttps://mimoar.vtexassets.com/arquivos/ids/17572397-1600-auto?v=638272864742600000&width=1600&height=auto&aspect=true "],
                   video : " ",
                    precio : 22900,
                     destacado: true,
                     inactivo: false
                  }   ,
                  {nombre :  "DENIM MINI DHAKA",
                   descripcion : "Pantalón de denim elastizado,tiene elástico en cintura con ojal y botón para regular el calce.",
                    imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17584598-1600-auto?v=638320251188900000&width=1600&height=auto&aspect=true",
                     imagenes_secundarias : ["https://mimoar.vtexassets.com/arquivos/ids/17584597-1600-auto?v=638320251186100000&width=1600&height=auto&aspect=true"],
                      video : " ",
                       precio : 19900,
                        destacado: true,
                        inactivo: false
                     }   , 
                     {nombre :  "PANTALON JR MODA",
                descripcion : "Pantalón de rústico, tiene elastico en cintura y puños, con bolsillos delanteros y uno en trasero.",
                imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17577693-1600-auto?v=638291081304000000&width=1600&height=auto&aspect=true ",
                imagenes_secundarias : [" https://mimoar.vtexassets.com/arquivos/ids/17577695-1600-auto?v=638291081309000000&width=1600&height=auto&aspect=true "],
                    video : " ",
                    precio : 24900,
                    destacado: true,
                    inactivo: false
                }   
                , 
                {
                    nombre :  "CARDIGAN JR SUMMER",
                    descripcion : "Cardigan de rústico,con capucha, tiene estampa en manga, con puños elastizados.Calce hombro caído y adelantado.",
                    imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17571381-1600-auto?v=638272020795970000&width=1600&height=auto&aspect=true",
                    imagenes_secundarias : ["https://mimoar.vtexassets.com/arquivos/ids/17571382-1600-auto?v=638272020799270000&width=1600&height=auto&aspect=true", "https://mimoar.vtexassets.com/arquivos/ids/17571383-1600-auto?v=638272020802700000&width=1600&height=auto&aspect=true"],
                    video : " ",
                    precio : 35900,
                    destacado: true,
                    inactivo: false
                    }, 
                    {
                        nombre :  "ZAPA TENNIS",
                        descripcion : "Zapatilla de capellada en material símil cuero. Trae detalle de dije metálico en forma de raqueta de tenis. Se ajusta con cordones de algodón, que brindan un anudado más firme. El cuello espumado las hace muy confortables. Suela de goma antideslizante.",
                        imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17586619-1600-auto?v=638333380250500000&width=1600&height=auto&aspect=true",
                        imagenes_secundarias : ["https://mimoar.vtexassets.com/arquivos/ids/17586618-1600-auto?v=638333380248300000&width=1600&height=auto&aspect=true", "https://mimoar.vtexassets.com/arquivos/ids/17586621-1600-auto?v=638333380255700000&width=1600&height=auto&aspect=true", "https://mimoar.vtexassets.com/arquivos/ids/17586622-1600-auto?v=638333380257570000&width=1600&height=auto&aspect=true"],
                        video : " ",
                        precio : 4900,
                        destacado: false,
                        inactivo: false
                        },
                        {
                            nombre :  "PIJAMA ENTERO SAFARI",
                            descripcion : "Pijama entero de micropolar estampado con capucha y cresta 3D. Tiene cierre para su acceso. Talle XS (2-3 años); Talle S (3-4 años); Talle M (5-6 años).",
                            imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17554720-1600-auto?v=638191721108230000&width=1600&height=auto&aspect=true",
                            imagenes_secundarias : ["https://mimoar.vtexassets.com/arquivos/ids/17554760-1600-auto?v=638191721145630000&width=1600&height=auto&aspect=true"],
                            video : " ",
                            precio : 16000,
                            destacado: false,
                            inactivo: false
                            },
                            {
                                nombre :  "CHALECO MINI BAHIA",
                                descripcion : "Chaleco tejido simil crochet, en hilo de algodón. Ideal para un estilo folk y romántico.",
                                imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17570661-1600-auto?v=638270192407900000&width=1600&height=auto&aspect=true",
                                imagenes_secundarias : ["https://mimoar.vtexassets.com/arquivos/ids/17570663-1600-auto?v=638270192413830000&width=1600&height=auto&aspect=true", "https://mimoar.vtexassets.com/arquivos/ids/17570663-1600-auto?v=638270192413830000&width=1600&height=auto&aspect=true"],
                                video : " ",
                                precio : 14900,
                                destacado: false,
                                inactivo: false
                                },
                                {
                                    nombre :  "JARDINERO MINI PLAY",
                                    descripcion : "Jardinero de denim unisex, con breteles regulables con botón.",
                                    imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17573907-1600-auto?v=638272918892170000&width=1600&height=auto&aspect=true",
                                    imagenes_secundarias : ["https://mimoar.vtexassets.com/arquivos/ids/17573908-1600-auto?v=638272918900330000&width=1600&height=auto&aspect=true"],
                                    video : " ",
                                    precio : 32900,
                                    destacado: true,
                                    inactivo: false
                                    },
                                    {
                                        nombre:  "BODY MINI DINO",
                                        descripcion : "Body de jersey, con estampa en delantero, tiene broche arito en escote para su acceso.",
                                        imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17576399-1600-auto?v=638284088934200000&width=1600&height=auto&aspect=true",
                                        imagenes_secundarias : ["https://mimoar.vtexassets.com/arquivos/ids/17576400-1600-auto?v=638284088937270000&width=1600&height=auto&aspect=true", "https://mimoar.vtexassets.com/arquivos/ids/17576401-1600-auto?v=638284088939770000&width=1600&height=auto&aspect=true"],
                                        video : " ",
                                        precio : 11900,
                                        destacado: false,
                                        inactivo: false
                                        },
                                        {
                                            nombre :  "SET MINI POMPON WHITE",
                                            descripcion : "Set: babero y gorro para recién nacido de rib estampado. Medidas babero: ancho: 17 cm. x altura: 11.5 cm.",
                                            imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17577089-1600-auto?v=638289092434770000&width=1600&height=auto&aspect=true",
                                            imagenes_secundarias : ["https://mimoar.vtexassets.com/arquivos/ids/17577090-1600-auto?v=638289092439000000&width=1600&height=auto&aspect=true", "https://mimoar.vtexassets.com/arquivos/ids/17577091-1600-auto?v=638289092441800000&width=1600&height=auto&aspect=true"],
                                            video : " ",
                                            precio : 5500,
                                            destacado: false,
                                            inactivo: false
                                            },
                                            {
                                                nombre :  "VESTIDO JR MARGARET",
                                                descripcion : "Vestido de rib y jersey estampado.",
                                                imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17587076-1600-auto?v=638336835988830000&width=1600&height=auto&aspect=true",
                                                imagenes_secundarias : ["https://mimoar.vtexassets.com/arquivos/ids/17587081-1600-auto?v=638336836002670000&width=1600&height=auto&aspect=true", "https://mimoar.vtexassets.com/arquivos/ids/17587086-1600-auto?v=638336836017500000&width=1600&height=auto&aspect=true"],
                                                video : " ",
                                                precio : 25900,
                                                destacado: false,
                                                inactivo: false
                                                },
                                                {
                                                    nombre :  "TRAJE DE BANO JR ESTAMPADO",
                                                    descripcion : "Traje de baño de microfibra estampada,cintura con elástico y cordones regulables, con suspensor.",
                                                    imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17583157-1600-auto?v=638309914328730000&width=1600&height=auto&aspect=true",
                                                    imagenes_secundarias : ["https://mimoar.vtexassets.com/arquivos/ids/17583159-1600-auto?v=638309914333900000&width=1600&height=auto&aspect=true", "https://mimoar.vtexassets.com/arquivos/ids/17583160-1600-auto?v=638309914337370000&width=1600&height=auto&aspect=true"],
                                                    video : " ",
                                                    precio : 27900,
                                                    destacado: false,
                                                    inactivo: false
                                                    },
                                                    {
                                                        nombre :  "BOTA BLOSSOM",
                                                        descripcion : "Botita de capellada y forro en textiles de algodón. Trae detalle de bordado de flores a tono, sobre los laterales externos. Se ajusta con cordones de algodón para un anudado más firme. La plantilla es plana y la suela es flexible, de material sintético. Horma de calce estándar. Talles: del 25 al 35 PRODUCTO NACIONAL.",
                                                        imagen_principal: "https://mimoar.vtexassets.com/arquivos/ids/17579049-1600-auto?v=638291795921900000&width=1600&height=auto&aspect=true",
                                                        imagenes_secundarias : ["https://mimoar.vtexassets.com/arquivos/ids/17579051-1600-auto?v=638291795925870000&width=1600&height=auto&aspect=true", "https://mimoar.vtexassets.com/arquivos/ids/17579051-1600-auto?v=638291795925870000&width=1600&height=auto&aspect=true", "https://mimoar.vtexassets.com/arquivos/ids/17579053-1600-auto?v=638291795929770000&width=1600&height=auto&aspect=true"],
                                                        video : " ",
                                                        precio : 14700,
                                                        destacado: false,
                                                        inactivo: false
                                                        }];
                    
                    
productos.map((producto)=>{
     return crearProducto(producto);
        })
}

module.exports= {
    cargaColores,
    cargaCategorias,
    cargaProductos,
    cargaTallas
}

