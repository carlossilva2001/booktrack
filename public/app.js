(function () {
  const form = document.getElementById("book-form");
  const lista = document.getElementById("book-list");
  const mensagem = document.getElementById("message");
  const contador = document.getElementById("book-count");
  const statusLabels = {
    quero_ler: "Quero ler",
    lendo: "Lendo",
    concluido: "Concluído",
  };
  let livros = [];

  function mostrarMensagem(texto, erro) {
    mensagem.textContent = texto;
    mensagem.classList.toggle("error", Boolean(erro));
  }

  function salvarLivros() {
    try {
      window.localStorage.setItem("booktrack-livros", JSON.stringify(livros));
      return true;
    } catch (erro) {
      mostrarMensagem(
        `Não foi possível salvar os livros neste navegador: ${erro.message}`,
        true
      );
      return false;
    }
  }

  function carregarLivros() {
    try {
      const dados = window.localStorage.getItem("booktrack-livros");
      const carregados = dados ? JSON.parse(dados) : [];
      if (!Array.isArray(carregados)) {
        throw new Error("os dados salvos não estão no formato esperado");
      }
      livros = carregados;
    } catch (erro) {
      mostrarMensagem(
        `Não foi possível carregar os livros salvos: ${erro.message}`,
        true
      );
    }
  }

  function criarOpcao(valor, texto) {
    const opcao = document.createElement("option");
    opcao.value = valor;
    opcao.textContent = texto;
    return opcao;
  }

  function renderizarLivros() {
    lista.replaceChildren();
    contador.textContent = `${livros.length} ${
      livros.length === 1 ? "livro" : "livros"
    }`;

    if (livros.length === 0) {
      const vazio = document.createElement("li");
      vazio.className = "empty-state";
      vazio.textContent = "Sua biblioteca está vazia. Adicione um livro para começar.";
      lista.append(vazio);
      return;
    }

    livros.forEach((livro) => {
      const item = document.createElement("li");
      const informacoes = document.createElement("div");
      const titulo = document.createElement("h3");
      const autor = document.createElement("p");
      const acoes = document.createElement("div");
      const seletor = document.createElement("select");
      const remover = document.createElement("button");

      item.className = "book-card";
      informacoes.className = "book-info";
      acoes.className = "book-actions";
      titulo.textContent = livro.titulo;
      autor.textContent = livro.autor;
      seletor.setAttribute("aria-label", `Status de ${livro.titulo}`);

      Object.entries(statusLabels).forEach(([valor, texto]) => {
        seletor.append(criarOpcao(valor, texto));
      });
      seletor.value = livro.status;
      seletor.addEventListener("change", () => {
        try {
          livros = window.Booktrack.atualizarStatus(
            livros,
            livro.id,
            seletor.value
          );
          if (salvarLivros()) {
            mostrarMensagem("Status do livro atualizado.");
          }
          renderizarLivros();
        } catch (erro) {
          mostrarMensagem(erro.message, true);
        }
      });

      remover.type = "button";
      remover.className = "remove-button";
      remover.textContent = "Remover";
      remover.setAttribute("aria-label", `Remover ${livro.titulo}`);
      remover.addEventListener("click", () => {
        try {
          livros = window.Booktrack.removerLivro(livros, livro.id);
          if (salvarLivros()) {
            mostrarMensagem("Livro removido da biblioteca.");
          }
          renderizarLivros();
        } catch (erro) {
          mostrarMensagem(erro.message, true);
        }
      });

      informacoes.append(titulo, autor);
      acoes.append(seletor, remover);
      item.append(informacoes, acoes);
      lista.append(item);
    });
  }

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const dados = {
      titulo: form.elements.titulo.value,
      autor: form.elements.autor.value,
      status: form.elements.status.value,
    };

    try {
      livros = window.Booktrack.cadastrarLivro(livros, dados);
      const salvo = salvarLivros();
      form.reset();
      if (salvo) {
        mostrarMensagem("Livro adicionado à biblioteca.");
      }
      renderizarLivros();
      form.elements.titulo.focus();
    } catch (erro) {
      mostrarMensagem(erro.message, true);
    }
  });

  carregarLivros();
  renderizarLivros();
})();
