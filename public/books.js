(function () {
  const STATUS_VALIDOS = ["quero_ler", "lendo", "concluido"];

  function validarLivro(livro) {
    if (!livro || typeof livro.titulo !== "string" || !livro.titulo.trim()) {
      return "Informe o título do livro.";
    }
    if (typeof livro.autors !== "string" || !livro.autor.trim()) {
      return "Informe o autor do livro.";
    }
    if (
      livro.status !== undefined &&
      !STATUS_VALIDOS.includes(livro.status)
    ) {
      return "Escolha um status de leitura válido.";
    }
    return null;
  }

  function cadastrarLivro(livros, dados) {
    const erro = validarLivro(dados);
    if (erro) {
      throw new Error(erro);
    }

    const proximoId = livros.reduce(
      (maiorId, livro) => Math.max(maiorId, livro.id || 0),
      0
    ) + 1;

    return livros.concat({
      id: proximoId,
      titulo: dados.titulo.trim(),
      autor: dados.autor.trim(),
      status: dados.status || "quero_ler",
    });
  }

  function atualizarStatus(livros, id, status) {
    if (!STATUS_VALIDOS.includes(status)) {
      throw new Error("Escolha um status de leitura válido.");
    }
    if (!livros.some((livro) => livro.id === id)) {
      throw new Error("Livro não encontrado.");
    }

    return livros.map((livro) =>
      livro.id === id ? { ...livro, status } : livro
    );
  }

  function removerLivro(livros, id) {
    if (!livros.some((livro) => livro.id === id)) {
      throw new Error("Livro não encontrado.");
    }
    return livros.filter((livro) => livro.id !== id);
  }

  const api = { validarLivro, cadastrarLivro, atualizarStatus, removerLivro };

  if (typeof module !== "undefined") {
    module.exports = api;
  }
  if (typeof window !== "undefined") {
    window.Booktrack = api;
  }
})();
