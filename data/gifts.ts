import { Gift } from "@/types/gift"
import { getGiftImage } from "@/lib/imageUtils"

// Função helper para garantir que todos os presentes tenham imagem gerada automaticamente
function createGift(gift: Omit<Gift, 'image'> & { image?: string }): Gift {
  // Se já tem imagem definida, usa ela, senão gera automaticamente
  return {
    ...gift,
    image: gift.image || getGiftImage(gift.name, gift.category)
  }
}

export const gifts: Gift[] = [
  createGift({
    id: "1",
    name: "Purificador de Água Gelada Fria e Natural Elétrico Compacto Electrolux",
    description: "Purificador de água com placa eletrônica, filtro refil de 6 meses ou 3000L, painel touch, bivolt, cor grafite.",
    image: "/presente 1.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "2",
    name: "Jogo de Panelas Tramontina Turim 10 Peças",
    description: "Jogo de panelas em alumínio com revestimento interno e externo em antiaderente Starflon Max, cor preta.",
    image: "/presente 2.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "3",
    name: "Aspirador de Pó Portátil e Vertical Electrolux 1100W",
    description: "Aspirador de pó portátil e vertical, 1100W, cor preta, modelo STK12.",
    image: "/presente 3.jpg",
    category: "Casa"
  }),
  createGift({
    id: "4",
    name: "Ferro de Passar Seco e Vapor Electrolux ESI60",
    description: "Ferro de passar seco e vapor, antiaderente, base cerâmica, vapor vertical extra, 1500W, cor azul marinho, 127V.",
    image: "/presente4.jpg",
    category: "Casa"
  }),
  createGift({
    id: "5",
    name: "Frigideira Philco PPH240AFR 1,7L",
    description: "Frigideira com revestimento Redstone, capacidade de 1,7 litros.",
    image: "/presente 5.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "6",
    name: "Tábua de Passar",
    description: "Tábua de passar roupas, prática e funcional para o dia a dia.",
    image: "/presente 6.jpg",
    category: "Casa"
  }),
  createGift({
    id: "7",
    name: "Jogo de Toalha",
    description: "Conjunto de toalhas de banho e rosto, macias e absorventes.",
    image: "/presente 7.jpg",
    category: "Casa"
  }),
  createGift({
    id: "8",
    name: "Kit 10 Potes de Vidro Retangular com Tampa Hermética 640ml",
    description: "Kit com 10 potes de vidro retangulares com tampa hermética, capacidade de 640ml cada.",
    image: "/presente 8.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "9",
    name: "Kit Tapete Antiderrapante Banheiro Decolab",
    description: "Kit completo de tapetes antiderrapantes para banheiro, super soft, multiuso, cor cinza-escuro, 2 peças.",
    image: "/presente 9.jpg",
    category: "Casa"
  }),
  createGift({
    id: "10",
    name: "Prato Raso Sophia Tramontina 28cm",
    description: "Prato raso da linha Sophia da Tramontina, diâmetro de 28cm.",
    image: "/presente 10.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "11",
    name: "Prato de Sobremesa Sophia Tramontina 21cm",
    description: "Prato de sobremesa da linha Sophia da Tramontina, diâmetro de 21cm.",
    image: "/presente 11.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "12",
    name: "Jogo Talheres Faqueiro Búzios Aço Inox 24 Peças Tramontina",
    description: "Jogo completo de talheres em aço inoxidável, linha Búzios, 24 peças.",
    image: "/presente 12.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "13",
    name: "Sanduicheira e Grill Britânia BGR27I Press 2 em 1 850W",
    description: "Sanduicheira e grill 2 em 1, 850W, modelo BGR27I Press da Britânia.",
    image: "/presente 13.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "14",
    name: "Kit Assadeiras Forma Retangular Funda Marinex 5 litros",
    description: "Kit com assadeiras retangulares fundas em vidro reforçado Marinex, capacidade de 5 litros, com tampa, cor vermelha.",
    image: "/presente 14.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "15",
    name: "Travessa Retangular com Tampa 1,6 Litros Marinex",
    description: "Travessa retangular em vidro temperado Marinex Pirex, capacidade de 1,6 litros, com tampa.",
    image: "/presente 15.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "16",
    name: "Kit 6 Cumbuca Capri 400ml Porcelana",
    description: "Kit com 6 cumbucas de porcelana, capacidade de 400ml cada, cor branca, ideal para sopa, caldo e açaí.",
    image: "/presente 16.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "17",
    name: "Conjunto Marinex Jogo de Travessas 5 Peças",
    description: "Conjunto com 5 travessas variadas em vidro temperado Marinex, próprias para forno.",
    image: "/presente 17.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "18",
    name: "Panela de Pressão 4.5L Tramontina Vancouver Effect",
    description: "Panela de pressão antiaderente, fechamento externo, linha Vancouver Effect, capacidade de 4,5 litros, cor preta.",
    image: "/presente 18.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "19",
    name: "Escorredor de Louças Bali com Bandeja e Porta Talheres Stolf",
    description: "Escorredor de louças com bandeja e porta talheres, modelo Bali da Stolf.",
    image: "/presente 19.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "20",
    name: "Boleira Verona Ruvolo com Tampa Acrílica e Prato de Vidro",
    description: "Boleira com tampa acrílica e prato de vidro, modelo Verona da Ruvolo.",
    image: "/presente 20.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "21",
    name: "Espelho Grande de Parede Oval com LED",
    description: "Espelho grande de parede oval com LED, luz quente e fria, ideal para banheiro, sala ou quarto.",
    image: "/presente 21.jpg",
    category: "Decoração"
  }),
  createGift({
    id: "22",
    name: "Espelho Redondo de Vidro 60 cm Lapidado",
    description: "Espelho redondo de vidro lapidado, 60cm de diâmetro, com kit de instalação, ideal para banheiro, sala ou quarto.",
    image: "/presente 22.jpg",
    category: "Decoração"
  }),
  createGift({
    id: "23",
    name: "Lixeira de Aço Inox 5 Litros com Pedal",
    description: "Lixeira de aço inox com pedal, capacidade de 5 litros, antiderrapante, balde removível, alça para transporte, ideal para cozinha, banheiro ou escritório. (2 unidades)",
    image: "/presente 23.jpg",
    category: "Casa"
  }),
  createGift({
    id: "24",
    name: "Conjunto de Banheiro Moderno com Tampa de Bambu",
    description: "Organizador decorativo elegante para banheiro, com tampa de bambu, disponível nas cores branco ou preto. (2 unidades)",
    image: "/presente 24.jpg",
    category: "Casa"
  }),
  createGift({
    id: "25",
    name: "Liquidificador Philco PH900 3L Preto 110V",
    description: "Liquidificador com capacidade de 3 litros, cor preta, 110V, modelo PH900 da Philco.",
    image: "/presente 25.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "26",
    name: "Mixer Misturador Multiuso Electrolux 3 em 1 400W",
    description: "Mixer misturador multiuso 3 em 1, 400W, 2 velocidades, 3 acessórios, mini processador, capacidade 600ml, livre de BPA, cor preta, 127V, modelo EIB10.",
    image: "/presente 26.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "27",
    name: "Processador Oster Compacto 3 em 1 300W",
    description: "Processador compacto 3 em 1, 300W, cor preta, 110V, modelo OMPR670 da Oster.",
    image: "/presente 27.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "28",
    name: "Porta Tempero Giratório 360 com 12 Potes de Vidro",
    description: "Porta tempero giratório 360 graus, com 12 potes de vidro e suporte em inox, modelo Tche Amo.",
    image: "/presente 28.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "29",
    name: "Tábua para Corte Bamboo 50cm x 30cm",
    description: "Tábua para corte em bambu, medidas 50cm x 30cm, modelo Mor.",
    image: "/presente 29.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "30",
    name: "Mini Processador Manual de Alimentos 500ml",
    description: "Mini processador manual de alimentos, capacidade de 500ml, com 3 lâminas em aço inoxidável, tritura, pica e mistura legumes, verduras, frutas, cebola, alho e ervas, compacto e prático.",
    image: "/presente 30.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "31",
    name: "Forma de Pudim Panelux Polida Classic",
    description: "Forma de pudim em alumínio, polida, linha Classic da Panelux.",
    image: "/presente 31.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "32",
    name: "Jogo de Assadeira",
    description: "Conjunto de assadeiras para forno, práticas e funcionais.",
    image: "/presente 32.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "34",
    name: "Forma Decorada de Bolo Antiaderente Hercules",
    description: "Forma decorada de bolo antiaderente, medidas 240x240x110mm, em alumínio, cor rose gold, modelo UC135-02 da Hercules.",
    image: "/presente 34.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "35",
    name: "Porto Brasil Aparelho de Jantar 20 Peças Roma Branco",
    description: "Aparelho de jantar completo, 20 peças, linha Roma, cor branca, marca Porto Brasil.",
    image: "/presente 35.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "36",
    name: "Kit de Utensílios de Cozinha 10 Peças Silicone Inox",
    description: "Conjunto com 10 utensílios de cozinha em silicone e inox, práticos e funcionais.",
    image: "/presente 36.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "37",
    name: "Varal de Chão com Abas Aço Slim Mor",
    description: "Varal de chão com abas, em aço slim, modelo Mor.",
    image: "/presente 37.jpg",
    category: "Casa"
  }),
  createGift({
    id: "38",
    name: "Jogo de Taça de Cerveja",
    description: "Conjunto de taças para cerveja, elegantes e práticas.",
    image: "/presente 38.jpg",
    category: "Cozinha"
  }),
  createGift({
    id: "39",
    name: "Bomboniere Potiche Baleiro em Vidro Decorativa",
    description: "Bomboniere potiche baleiro em vidro decorativa com tampa, elegante e funcional.",
    image: "/presente 39.jpg",
    category: "Decoração"
  }),
  createGift({
    id: "42",
    name: "Jogo de Lençol Cama KING Percal 400 Fios Cinza",
    description: "Jogo de lençol para cama KING, percal 400 fios, com elástico, padrão hotel, cor cinza, 3 peças.",
    image: "/presente 42.jpg",
    category: "Casa"
  }),
  createGift({
    id: "43",
    name: "Jogo de Lençol Cama KING Percal 400 Fios Cinza (2º)",
    description: "Jogo de lençol para cama KING, percal 400 fios, com elástico, padrão hotel, cor cinza, 3 peças. (Segunda unidade)",
    image: "/presente 43.jpg",
    category: "Casa"
  }),
  createGift({
    id: "44",
    name: "Kit 2 Tapetes Banheiro Bolinha Antiderrapante",
    description: "Kit com 2 tapetes para banheiro, modelo bolinha, antiderrapante, medidas 38x58cm, cor azul.",
    image: "/presente 44.jpg",
    category: "Casa"
  }),
  createGift({
    id: "45",
    name: "Jogo de Banho 4 Peças",
    description: "Conjunto de banho completo, 4 peças, macio e absorvente.",
    image: "/presente 45.jpg",
    category: "Casa"
  }),
  createGift({
    id: "49",
    name: "Conjunto 2 Mesinhas de Centro Sala Madeira Redonda",
    description: "Conjunto com 2 mesinhas de centro para sala, em madeira, formato redondo, pé palito.",
    image: "/presente 49.jpg",
    category: "Decoração"
  }),
  createGift({
    id: "51",
    name: "Lavadora de Alta Pressão Compacta WAP WL 1800 1400W 1500PSI 360L/h 127V",
    description: "Lavadora de alta pressão compacta, 1400W, 1500PSI, vazão de 360L/h, 127V, modelo WL 1800 da WAP.",
    image: "/presente 51.jpg",
    category: "Casa"
  }),
  createGift({
    id: "53",
    name: "Churrasqueira Califórnia Bacia",
    description: "Churrasqueira Califórnia com bacia, ideal para churrascos em família e amigos.",
    image: "/presente 53.jpg",
    category: "Casa"
  }),
  createGift({
    id: "54",
    name: "Ducha Eletrônica Intense Fame 5400w",
    description: "Ducha eletrônica Intense Fame, 5400w, com controle de temperatura e pressão.",
    image: "/presente 54.jpg",
    category: "Casa"
  }),
  createGift({
    id: "55",
    name: "Edredom Dupla Face Percal 400 Fios Grosso Extra Macio Queen Luxo - Casa di Valle",
    description: "Edredom dupla face em percal 400 fios, grosso e extra macio, tamanho Queen, luxo da marca Casa di Valle.",
    image: "/presente 55.jpg",
    category: "Casa"
  }),
  createGift({
    id: "56",
    name: "Forno Elétrico Philco 44L Preto Dupla Resistência PFE44P",
    description: "Forno elétrico Philco, capacidade de 44 litros, cor preta, com dupla resistência, modelo PFE44P.",
    image: "/presente 56.jpg",
    category: "Cozinha"
  })
]
