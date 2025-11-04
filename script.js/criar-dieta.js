const btnMenuMobile = document.querySelector("#btn-menu-mobile")
const menuMBL = document.querySelector("#menu-mbl")

btnMenuMobile.addEventListener("click", () =>{
    menuMBL.classList.toggle("mostrar")
})


// Pega itens salvos
let selecionados = JSON.parse(localStorage.getItem("alimentosSelecionados")) || [];

// Se o item ainda não tiver quantidade, adicionamos 1
selecionados = selecionados.map(item => ({
  ...item,
  qtd: item.qtd ? item.qtd : 1
}));

localStorage.setItem("alimentosSelecionados", JSON.stringify(selecionados));

const listaCarrinho = document.querySelector("#lista-carrinho");

function atualizarCarrinho(){
  listaCarrinho.innerHTML = "";

  selecionados.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("item-carrinho");
    
    div.innerHTML = `
      <img src="${item.imagem}" width="32">
      <strong>${item.nome}</strong>
      <span>Prot: ${(item.prot * item.qtd).toFixed(2)}g</span>
      <span>Carb: ${(item.carb * item.qtd).toFixed(2)}g</span>
      <span>Gord: ${(item.gord * item.qtd).toFixed(2)}g</span>
      <span>Kcal: ${item.kcal * item.qtd}</span>
      <span>Quant: ${item.quantidade * item.qtd}g</span>

      <div class="qtd-controls">
        <button class="btn-menos">-</button>
        <span>${item.qtd}</span>
        <button class="btn-mais">+</button>
      </div>
      
      <button class="btn-remover">Remover</button>
    `;

    // Eventos dos botões
    div.querySelector(".btn-menos").addEventListener("click", () => {
      if(item.qtd > 1){
        item.qtd--;
      } else {
        selecionados.splice(index, 1);
      }
      salvarEAtualizar();
    });

    div.querySelector(".btn-mais").addEventListener("click", () => {
      item.qtd++;
      salvarEAtualizar();
    });

    div.querySelector(".btn-remover").addEventListener("click", () => {
      selecionados.splice(index, 1);
      salvarEAtualizar();
    });

    listaCarrinho.appendChild(div);
  });

  atualizarTotais();
}

function atualizarTotais(){
  const totalProt = selecionados.reduce((soma, item) => soma + item.prot * item.qtd, 0);
  const totalCarb = selecionados.reduce((soma, item) => soma + item.carb * item.qtd, 0);
  const totalGord = selecionados.reduce((soma, item) => soma + item.gord * item.qtd, 0);
  const totalKcal = selecionados.reduce((soma, item) => soma + item.kcal * item.qtd, 0);

  document.querySelector("#total-prot").textContent = `Prot: ${(totalProt).toFixed(2)}g`;
  document.querySelector("#total-carb").textContent = `Carb: ${(totalCarb).toFixed(2)}g`;
  document.querySelector("#total-gord").textContent = `Gord: ${(totalGord).toFixed(2)}g`;
  document.querySelector("#total-kcal").textContent = `kcal: ${totalKcal}`;
}

function salvarEAtualizar(){
  localStorage.setItem("alimentosSelecionados", JSON.stringify(selecionados));
  atualizarCarrinho();
}

// Primeiro carregamento
atualizarCarrinho();
