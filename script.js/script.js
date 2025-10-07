const btnProteinas = document.querySelector("#btnProteinas")
const btnProtVege = document.querySelector("#protVeg")
const btnCarbo = document.querySelector("#btnCarboidratos")
const btnFrutas = document.querySelector("#btnFrutas")
const mesgBoasVindas = document.querySelector("#mensagem-boas-vindas")
const listaDeAlimentos = document.querySelector("#lista-alimentos")
const imgAlientos = document.querySelector("#img-alimentos")
const pesquisar = document.querySelector("#pesquisar")
const btnMenuMobile = document.querySelector("#btn-menu-mobile")
const menuMBL = document.querySelector("#menu-mbl")

import {proteinas, proteinasVegetais, carboidratos, frutas} from './alimentos.js'

const alimentos = [...proteinas,...proteinasVegetais,...carboidratos,...frutas]

btnCarbo.addEventListener("click", ()=>{
    addItens(carboidratos);
})

btnProteinas.addEventListener("click", ()=>{
    addItens(proteinas);
});

btnProtVege.addEventListener("click", ()=>{
    addItens(proteinasVegetais);
});

btnFrutas.addEventListener("click", ()=>{
    addItens(frutas);
});

function addItens(elemento){
    mesgBoasVindas.style.display = "none";
    imgAlientos.style.display = "none";

    listaDeAlimentos.innerHTML= "";
    listaDeAlimentos.style.display = "flex";

    elemento.forEach(item =>{
        const div = document.createElement('div');
        div.classList.add('alimento', 'fade-in');
        div.innerHTML = `
        <img src="${item.imagem}","style="width:32px; height:32px;">
      <span><strong>${item.nome}</strong></span><span>Proteinas: ${item.prot}g</span><span>Gorduras: ${item.gord}g</span>
      <span>Carbo: ${item.carb}g</span><span>Kcal: ${item.kcal}</span>
        `
        listaDeAlimentos.appendChild(div);
    })
};

function mostrarPesquisa(lista){
    mesgBoasVindas.style.display = "none";
    imgAlientos.style.display = "none";
    listaDeAlimentos.innerHTML = "";
    listaDeAlimentos.style.display = "flex";
    
    
    lista.forEach(item => {
        const div = document.createElement("div");
        div.classList.add('alimento', 'fade-in');
        div.innerHTML = `
        <img src="${item.imagem}","style="width:32px; height:32px;">
      <span><strong>${item.nome}</strong></span><span>Proteinas: ${item.prot}g</span><span>Gorduras: ${item.gord}g</span>
      <span>Carbo: ${item.carb}g</span><span>Kcal: ${item.kcal}</span>
        `
        listaDeAlimentos.appendChild(div)
    })
};

pesquisar.addEventListener("input", (e)=>{
    const texto = e.target.value.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if(texto === ""){
        listaDeAlimentos.innerHTML = "";
        mesgBoasVindas.style.display = "block";
        imgAlientos.style.display = "block";
        return
    }

    const filtrados = alimentos.filter(el =>
        el.nome.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(texto)
    );
    mostrarPesquisa(filtrados)
})

btnMenuMobile.addEventListener("click", () =>{
    menuMBL.classList.toggle("mostrar")
})


const itensSelect = document.querySelectorAll(".options .item");

itensSelect.forEach(item =>{
    item.addEventListener("click", ()=>{
        itensSelect.forEach(i =>{
            i.classList.remove("selecionado")
        })

        item.classList.add("selecionado")
    })
})