const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const raiz = path.resolve(__dirname, "..");
const origem = path.join(raiz, "public");
const destino = path.join(raiz, "dist");
const arquivos = ["index.html", "styles.css", "books.js", "app.js"];
const conteudos = {};

for (const arquivo of arquivos) {
  const caminho = path.join(origem, arquivo);
  if (!fs.existsSync(caminho) || !fs.statSync(caminho).isFile()) {
    throw new Error(`Arquivo principal ausente: public/${arquivo}`);
  }

  conteudos[arquivo] = fs.readFileSync(caminho, "utf8");
  if (!conteudos[arquivo].trim()) {
    throw new Error(`Arquivo principal vazio: public/${arquivo}`);
  }
}

for (const referencia of ["styles.css", "books.js", "app.js"]) {
  if (!conteudos["index.html"].includes(referencia)) {
    throw new Error(`index.html não referencia ${referencia}`);
  }
}

for (const arquivo of ["books.js", "app.js"]) {
  new vm.Script(conteudos[arquivo], { filename: arquivo });
}

fs.rmSync(destino, { recursive: true, force: true });
fs.mkdirSync(destino, { recursive: true });
for (const arquivo of arquivos) {
  fs.copyFileSync(path.join(origem, arquivo), path.join(destino, arquivo));
}

console.log("Build concluído: arquivos verificados e copiados para dist/.");
