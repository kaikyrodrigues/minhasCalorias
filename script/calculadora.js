const resultado  = document.querySelector("#result-bioptipo");
const btnCalcular = document.querySelector("#btnCalcular")
const btnLimpar = document.querySelector("#btnLimpar")
const btnMenuMobile = document.querySelector("#btn-menu-mobile")
const menuMBL = document.querySelector("#menu-mbl")

btnCalcular.addEventListener("click", ()=> {
    const metabolismo = document.querySelector("#metabolismo").value;
    const peso = document.querySelector("#peso").value;
    const estrutura = document.querySelector("#estrutura").value;
    console.log(metabolismo, peso, estrutura)
if(metabolismo === "rapido" && peso === "nao" && estrutura === "magro"){
    resultado.innerHTML = "Seu biotipo é: ECTOMORFO (magro, com dificuldade de ganhar peso)";
    btnLimpar.style.display = 'block';
}
else if(metabolismo ==="normal" && estrutura === "medio"){
    resultado.innerHTML = "Seu biotipo é: MESOMORFO (fácil ganho de massa muscular)";
    btnLimpar.style.display = 'block';
}
else if(metabolismo === "lento" && peso === "sim" && estrutura ==="largo"){
    resultado.innerHTML = "Seu biotipo é: ENDOMORFO (tendência a acumular gordura)";
    btnLimpar.style.display = 'block';
}
else{
    resultado.innerHTML = "Você tem características mistas (biotipo misto)";
    btnLimpar.style.display = 'block';
}

});

btnLimpar.addEventListener("click", ()=>{
    resultado.innerHTML = "";
    btnLimpar.style.display = 'none';
});

btnMenuMobile.addEventListener("click", () =>{
    menuMBL.classList.toggle("mostrar")
})
