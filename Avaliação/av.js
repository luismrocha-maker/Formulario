
let errosNome = 0;
let errosCPF = 0;

function calcular() {
    let nome = document.getElementById("nome").value;
    let nascimento = document.getElementById("nascimento").value;
    let cpf = document.getElementById("cpf").value;
    let valor = Number(document.getElementById("valor").value);
    let juros = Number(document.getElementById("juros").value);
    let parcelas = Number(document.getElementById("parcelas").value);

    if (nome.trim().length < 5) {
        errosNome++;
        alert("Digite um nome com pelo menos 5 caracteres.");

        if (errosNome >= 3) {
            bloquear();
        }
        return;
    }

    if (cpf.length != 11 || isNaN(cpf)) {
        errosCPF++;
        alert("Digite um CPF com 11 números.");

        if (errosCPF >= 3) {
            bloquear();
        }
        return;
    }

    if (nascimento == "") {
        alert("Informe a data de nascimento.");
        return;
    }

    let dataNascimento = new Date(nascimento + "T00:00:00");
    let hoje = new Date();

    if (dataNascimento > hoje) {
        alert("Data de nascimento inválida.");
        return;
    }

    if (valor <= 0) {
        alert("Digite um valor maior que zero.");
        return;
    }

    if (juros <= 0) {
        alert("Digite uma taxa maior que zero.");
        return;
    }

    if (parcelas <= 0 || parcelas % 1 != 0) {
        alert("Digite uma quantidade válida de parcelas.");
        return;
    }

    let idade = (hoje - dataNascimento) /
        (1000 * 60 * 60 * 24 * 365.2425);

    document.getElementById("idade").innerText =
        "(" + idade.toFixed(2) + " anos)";

    document.getElementById("idadeResumo").innerText =
        idade.toFixed(2) + " anos";

    let total = valor + (valor * juros / 100);

    document.getElementById("montante").innerText =
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

    let valorParcela = total / parcelas;
    let lista = document.getElementById("listaParcelas");

    lista.innerHTML = "";

    for (let i = 1; i <= parcelas; i++) {
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
}

function bloquear() {
    let campos = document.querySelectorAll("input, button");

    for (let i = 0; i < campos.length; i++) {
        campos[i].disabled = true;
    }

    alert("Sistema bloqueado. Atualize a página.");
}

function novaSimulacao() {
    document.getElementById("formulario").reset();

    document.getElementById("idade").innerText = "";
    document.getElementById("idadeResumo").innerText = "";
    document.getElementById("montante").innerText = "";
    document.getElementById("listaParcelas").innerHTML = "";
    document.getElementById("resultado").style.display = "none";
}