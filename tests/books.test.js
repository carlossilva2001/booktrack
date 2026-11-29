const assert = require("node:assert/strict");
const test = require("node:test");

const {
  atualizarStatus,
  cadastrarLivro,
  removerLivro,
  validarLivro,
} = require("../public/books.js");

test("valida título e autor obrigatórios e rejeita valores vazios", () => {
  assert.equal(validarLivro({ titulo: "Duna", autor: "Frank Herbert" }), null);
  assert.match(validarLivro({ titulo: " ", autor: "Frank Herbert" }), /título/i);
  assert.match(validarLivro({ titulo: "Duna", autor: "" }), /autor/i);
});

test("cadastra livro válido, limpa os campos e escolhe status padrão", () => {
  const livros = cadastrarLivro([], {
    titulo: "  Duna ",
    autor: " Frank Herbert ",
  });

  assert.deepEqual(livros, [
    { id: 1, titulo: "Duna", autor: "Frank Herbert", status: "quero_ler" },
  ]);
  assert.throws(
    () => cadastrarLivro(livros, { titulo: "", autor: "Frank Herbert" }),
    /título/i
  );
});

test("atualiza o status e rejeita status ou livro inexistente", () => {
  const livros = cadastrarLivro([], { titulo: "Duna", autor: "Frank Herbert" });
  const atualizados = atualizarStatus(livros, 1, "concluido");

  assert.equal(atualizados[0].status, "concluido");
  assert.throws(() => atualizarStatus(livros, 1, "pausado"), /status/i);
  assert.throws(() => atualizarStatus(livros, 99, "lendo"), /não encontrado/i);
});

test("remove livro existente e sinaliza ID inexistente", () => {
  const livros = cadastrarLivro([], { titulo: "Duna", autor: "Frank Herbert" });

  assert.deepEqual(removerLivro(livros, 1), []);
  assert.throws(() => removerLivro(livros, 99), /não encontrado/i);
});
