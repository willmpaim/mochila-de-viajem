const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse(localStorage.getItem("itens")) || [];

itens.forEach(elemento => {
    criaElemento(elemento);
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = evento.target.elements["nome"];
    const quantidade =  evento.target.elements["quantidade"];
    const existe = itens.find(elemento => elemento.nome === nome.value); 
   
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
    }
    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    } else {
       itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id + 1 : 0

        criaElemento(itemAtual);

        itens.push(itemAtual);
    }
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
})

function criaElemento (itens) {
  
    const novoItem = document.createElement("li");
    novoItem.classList.add("item"); 

    const numeroItem = document.createElement("strong");
    numeroItem.innerHTML = itens.quantidade;
    numeroItem.dataset.id = itens.id;
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += itens.nome;

    novoItem.appendChild(botaoDeleta(itens.id));

    lista.appendChild(novoItem);

}

function atualizaElemento(itens) {
    document.querySelector("[data-id='"+itens.id+"']").innerHTML = itens.quantidade;
}

function botaoDeleta(id) {
   const botao = document.createElement("button");
    botao.innerText = "X"

    botao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id);
    })

    return botao;
}

function deletaElemento(elemento, id) {
    elemento.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);
    localStorage.setItem("itens", JSON.stringify(itens));
}
