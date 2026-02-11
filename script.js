const secoes = [
  {
    titulo: "Taxas e anestesias",
    itens: [
      ["Taxa de Sala", 550],
      ["Taxa de Curativo", 150],
      ["Taxa de Anestesia", 700],
      ["Taxa de Anestesia (Sedação)", 1500],
    ]
  },
  {
    titulo: "Procedimentos",
    itens: [
      ["Blefaroplastia superior", 8500],
      ["Blefaroplastia inferior", 9500],
      ["Otoplastia", 8500],
      ["Rinoplastia", 18000],
      ["Lipo de Papada", 6500],
      ["Lipoaspiração", 16000],
      ["Abdominoplastia", 19000],
      ["Mamoplastia", 18000],
      ["Prótese de mama", 20000],
    ]
  },
  {
    titulo: "Harmonização",
    itens: [
      ["Toxina botulínica (Botox)", 1300],
      ["Preenchimento facial", 1800],
      ["Bioestimulador", 2200],
      ["Fios de PDO", 2500],
    ]
  },
  {
    titulo: "PROTOCOLOS CAPILARES",
    itens: [
      ["Toxina capilar", 1890],
      ["MMP - sessão", 770],
      ["MMP CAPILAR + EXOSSOMOS", 1200],
      ["Eletroderme Capilar", 1750],
    ]
  }
];

const listaProcedimentos = document.getElementById("listaProcedimentos");
const totalSpan = document.getElementById("total");
const btnLimpar = document.getElementById("btnLimpar");
const btnPdf = document.getElementById("btnPdf");

let selecionados = [];

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function atualizarTotal() {
  const total = selecionados.reduce((acc, item) => acc + item.valor, 0);
  totalSpan.textContent = formatarMoeda(total);
}

function renderizar() {
  listaProcedimentos.innerHTML = "";

  secoes.forEach((secao, secaoIndex) => {
    const divSecao = document.createElement("div");
    divSecao.classList.add("secao");

    const titulo = document.createElement("h2");
    titulo.textContent = secao.titulo;
    divSecao.appendChild(titulo);

    secao.itens.forEach((item, itemIndex) => {
      const nome = item[0];
      const valor = item[1];

      const divItem = document.createElement("div");
      divItem.classList.add("item");

      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      checkbox.addEventListener("change", (e) => {
        if (e.target.checked) {
          selecionados.push({ nome, valor });
        } else {
          selecionados = selecionados.filter(x => x.nome !== nome);
        }
        atualizarTotal();
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(" " + nome));

      const spanValor = document.createElement("span");
      spanValor.classList.add("valor");
      spanValor.textContent = formatarMoeda(valor);

      divItem.appendChild(label);
      divItem.appendChild(spanValor);

      divSecao.appendChild(divItem);
    });

    listaProcedimentos.appendChild(divSecao);
  });
}

btnLimpar.addEventListener("click", () => {
  selecionados = [];
  renderizar();
  atualizarTotal();
});

btnPdf.addEventListener("click", () => {
  if (selecionados.length === 0) {
    alert("Selecione pelo menos um procedimento.");
    return;
  }

  let texto = "ORÇAMENTO - DI DOMENICO\n\n";
  selecionados.forEach(item => {
    texto += `${item.nome} - ${formatarMoeda(item.valor)}\n`;
  });

  const total = selecionados.reduce((acc, item) => acc + item.valor, 0);
  texto += `\nTOTAL: ${formatarMoeda(total)}\n`;

  const blob = new Blob([texto], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "orcamento.txt";
  link.click();
});

renderizar();
atualizarTotal();
