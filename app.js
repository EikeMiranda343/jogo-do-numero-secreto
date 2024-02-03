let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;


function exibirTextoNatela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1});
}

function limparCampo(campo){
    campo = document.querySelector('input');
    campo.value = '';
}

function exibirMensagemInicial(){
    exibirTextoNatela('h1', 'Jogo do Número Secreto');
    exibirTextoNatela('p', 'Escolha um número entre 1 e 100:');
}
exibirMensagemInicial();

function gerarNumeroAleatorio (){
    let NumeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if(listaDeNumerosSorteados.includes(NumeroEscolhido)){
        return gerarNumeroAleatorio();
    }else{
        listaDeNumerosSorteados.push(NumeroEscolhido);
        return NumeroEscolhido;
    }

}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNatela('h1', 'Acertou!');
        let numeroTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${numeroTentativas}`;
        exibirTextoNatela('p', mensagemTentativas);
    } else if (chute > numeroSecreto) {
        exibirTextoNatela('p', 'O número secreto é menor');
        limparCampo();
    } else {
        exibirTextoNatela('p', 'O número secreto é maior');
        limparCampo();
    }
    tentativas++;
}


function novoJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').removeAttribute('disabled', true);
}
novoJogo();
