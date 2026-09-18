
let errosNome = 0;
let errosCPF = 0;

let formulario = document.getElementById("formulario");

let nome = document.getElementById("nome");
let nascimento = document.getElementById("nascimento");
let cpf = document.getElementById("cpf");
let valor = document.getElementById("valor");
let juros = document.getElementById("juros");
let parcelas = document.getElementById("parcelas");

nome.onblur = function() {
    if (nome.value.trim().length < 5) {
        errosNome++;
        alert("Digite um nome com pelo menos 5 caracteres.");

        if (errosNome >= 3) {
            bloquear();
        }
    }
};

cpf.onblur = function() {
    if (!/^[0-9]{11}$/.test(cpf.value)) {
        errosCPF++;
        alert("Digite um CPF com 11 números.");

        if (errosCPF >= 3) {
            bloquear();
        }
    }
};

nascimento.onblur = function() {
    if (nascimento.value == "") {
        return;
    }

    let data = new Date(nascimento.value + "T00:00:00");
    let hoje = new Date();

    if (data > hoje) {
        alert("Data inválida.");
        return;
    }

    let anos = (hoje - data) / (1000 * 60 * 60 * 24 * 365.2425);

    document.getElementById("idade").innerText =
        "(" + anos.toFixed(2) + " anos)";
};

valor.onblur = function() {
    if (valor.value <= 0 || valor.value == "") {
        alert("Digite um valor maior que zero.");
    }
};

juros.onblur = function() {
    if (juros.value <= 0 || juros.value == "") {
        alert("Digite uma taxa maior que zero.");
    }
};

function bloquear() {
    let campos = formulario.querySelectorAll("input, button");

    campos.forEach(function(campo) {
        campo.disabled = true;
    });

    alert("Sistema bloqueado. Atualize a página.");
}

formulario.onsubmit = function(event) {
    event.preventDefault();

    if (nome.value.trim().length < 5 ||
        !/^[0-9]{11}$/.test(cpf.value) ||
        nascimento.value == "" ||
        valor.value <= 0 ||
        juros.value <= 0 ||
        parcelas.value <= 0 ||
        !Number.isInteger(Number(parcelas.value))) {

        alert("Confira os dados preenchidos.");
        return;
    }

    let data = new Date(nascimento.value + "T00:00:00");
    let hoje = new Date();

    if (data > hoje) {
        alert("Data de nascimento inválida.");
        return;
    }

    let idade = (hoje - data) / (1000 * 60 * 60 * 24 * 365.2425);

    document.getElementById("idadeResumo").innerText =
        idade.toFixed(2) + " anos";

    let total = Number(valor.value) +
        Number(valor.value) * Number(juros.value) / 100;

    document.getElementById("montante").innerText =
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    let quantidade = Number(parcelas.value);
    let valorParcela = total / quantidade;

    let lista = document.getElementById("listaParcelas");
    lista.innerHTML = "";

    for (let i = 1; i <= quantidade; i++) {
        let data = new Date();

        data.setDate(data.getDate() + i * 30);

        let item = document.createElement("p");

        item.innerText = "Parcela " + i +
            " - " +
            valorParcela.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            }) +
            " - Vencimento: " + data.toLocaleDateString("pt-BR");

        lista.appendChild(item);
    }

    document.getElementById("resultado").style.display = "block";
};

document.getElementById("nova").onclick = function() {
    formulario.reset();

    document.getElementById("idade").innerText = "";
    document.getElementById("idadeResumo").innerText = "";
    document.getElementById("montante").innerText = "";
    document.getElementById("listaParcelas").innerHTML = "";
    document.getElementById("resultado").style.display = "none";
};