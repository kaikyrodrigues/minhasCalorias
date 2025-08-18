const btnProteinas = document.querySelector("#btnProteinas")
const mesgBoasVindas = document.querySelector("#mensagem-boas-vindas")
const listaDeAlimentos = document.querySelector("#lista-alimentos")
const imgAlientos = document.querySelector("#img-alimentos")


const proteinas=[
    {
        nome: 'Coxa de frango',
        quantidade: 100,
        unidade: 'g',
        prot: 26,
        gord: 11.06,
        carb: 0,
        kcal: 214,
        imagem: './icons/proteinas/coxa-de-frango.png'
    },
    {
        nome: 'Peito de frango',
        quantidade: 100,
        unidade: 'g',
        prot: 29.55,
        gord: 7.72,
        carb: 0,
        kcal: 195,
        imagem:'./icons/proteinas/peito-de-frango(1).png'
    },
    {
        nome: 'Sobre coxa',
        quantidade: 100,
        unidade: 'g',
        prot: 25.94,
        gord: 10.88,
        carb: 0,
        kcal: 209,
        imagem:'./icons/proteinas/sobre-coxa.png'
    },
    {
        nome: 'File de peito',
        quantidade: 100,
        unidade: 'g',
        prot: 23,
        gord: 1,
        carb: 0,
        kcal: 101,
        imagem:'./icons/proteinas/peito-de-frango.png'
    },
    {
        nome: 'Ovo',
        quantidade: 100,
        unidade: 'g',
        prot: 6.29,
        gord: 4.97,
        carb: 0.38,
        kcal: 74,
        imagem:'./icons/proteinas/ovo-cozido.png'
    },
    {
        nome: 'Salmão',
        quantidade:100,
        unidade:'g',
        prot: 21.62,
        gord: 5.93,
        carb: 0,
        kcal: 146,
        imagem:'./icons/proteinas/salmao.png'
    },
    {
        nome: 'Tilápia',
        quantidade: 100,
        unidade: 'g',
        prot: 20.08,
        gord: 1.7,
        carb: 0,
        kcal: 96,
        imagem:'./icons/proteinas/tilapia.png'
    },
    {
        nome: 'Atum',
        quantidade: 100,
        unidade: 'g',
        prot: 23.38,
        gord: 0.95,
        carb: 0,
        kcal: 108,
        imagem:'./icons/proteinas/atum.png'
    }

        
];

btnProteinas.addEventListener("click", ()=>{
    mesgBoasVindas.style.display = 'none';
    imgAlientos.style.display = 'none';

    listaDeAlimentos.innerHTML= "";
    listaDeAlimentos.style.display = "flex";

    proteinas.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('alimento', 'fade-in');
        div.innerHTML = `
        <img src="${item.imagem}","style="width:32px; height:32px;">
      <span><strong>${item.nome}</strong></span><span>Proteinas: ${item.prot}g</span><span>Gorduras: ${item.gord}g</span>
      <span>Carbo: ${item.carb}g</span><span>Kcal: ${item.kcal}</span>
        `
        listaDeAlimentos.appendChild(div);
    });
});