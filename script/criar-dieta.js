const btnMenuMobile = document.querySelector("#btn-menu-mobile");
const menuMBL = document.querySelector("#menu-mbl");
const btnDownload = document.querySelector("#btnDownload");
const msgVazio = document.querySelector("#msg-vazio");
const btnLimparTudo = document.querySelector("#btnLimparTudo");


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
        <div class="qtd-controls-item" >
          <button class="btn-menos">-</button>
          <span>${item.qtd}</span>
          <button class="btn-mais">+</button>
        </div>

      </div>
      
     <button class="btn-remover">
        <img src="../icons/trash.png" alt="Remover" class="icon-remover">

    </button>

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
  atualizarEstadoCarrinho();
}

function atualizarEstadoCarrinho(){
  if(listaCarrinho.children.length === 0){
    btnDownload.style.display = "none";
    btnLimparTudo.style.display = "none";
    msgVazio.style.display = "block";
  }else{
    btnDownload.style.display = "block";
    btnDownload.style.display = "block";
    msgVazio.style.display = "none";
  }
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

btnLimparTudo.addEventListener("click", () => {
    const confirmar = confirm("Tem certeza que deseja apagar todos os alimentos?");
    
    if (!confirmar) return;

    selecionados = [];
    localStorage.removeItem("alimentosSelecionados");

    atualizarCarrinho();
});


function gerarPDF() {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text("Minha Dieta Personalizada", 10, 15);

  doc.setFontSize(12);
  let y = 30;

  // Cabeçalho da tabela
  doc.text("Alimento", 10, y);
  doc.text("Prot (g)", 60, y);
  doc.text("Carb (g)", 90, y);
  doc.text("Gord (g)", 120, y);
  doc.text("Kcal", 150, y);
  doc.text("Qtd", 180, y);
  y += 10;

  // Linhas dos alimentos
  selecionados.forEach((item) => {
    doc.text(item.nome, 10, y);
    doc.text((item.prot * item.qtd).toFixed(2).toString(), 60, y);
    doc.text((item.carb * item.qtd).toFixed(2).toString(), 90, y);
    doc.text((item.gord * item.qtd).toFixed(2).toString(), 120, y);
    doc.text((item.kcal * item.qtd).toString(), 150, y);
    doc.text(`${item.quantidade * item.qtd}g`, 180, y);
    y += 10;

    // Quebra de página se o conteúdo for muito longo
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  // Totais
  y += 10;
  const totalProt = selecionados.reduce((soma, item) => soma + item.prot * item.qtd, 0);
  const totalCarb = selecionados.reduce((soma, item) => soma + item.carb * item.qtd, 0);
  const totalGord = selecionados.reduce((soma, item) => soma + item.gord * item.qtd, 0);
  const totalKcal = selecionados.reduce((soma, item) => soma + item.kcal * item.qtd, 0);

  doc.setFontSize(14);
  doc.text("Totais:", 10, y);
  doc.setFontSize(12);
  y += 10;
  doc.text(`Proteína total: ${totalProt.toFixed(2)} g`, 10, y);
  y += 7;
  doc.text(`Carboidrato total: ${totalCarb.toFixed(2)} g`, 10, y);
  y += 7;
  doc.text(`Gordura total: ${totalGord.toFixed(2)} g`, 10, y);
  y += 7;
  doc.text(`Kcal total: ${totalKcal}`, 10, y);

  // Salvar o PDF
  doc.save("minha_dieta.pdf");
}


btnDownload.addEventListener("click", ()=>{
    gerarPDF();
})

atualizarEstadoCarrinho();

