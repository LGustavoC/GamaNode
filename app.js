// Incluindo biblioteca
const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');

// Definicaoo de endereço / URL
const hostname = '127.0.0.1'; // localhost
const port = 3000;

// Implementação da regra de negocio
const server = http.createServer((req, res) => {

  let resposta;
  const urlparse = url.parse(req.url, true);

  // Receber informacoes do usuario
  const params = queryString.parse(urlparse.search);

  // Criar usuario - Atualizar usuario
  if (urlparse.pathname == '/criar-atualizar-usuario') {
    // Salvar informacoes
    fs.writeFile(`users/${params.id}.txt`, JSON.stringify(params), function (err) {
      if (err) throw err;
      console.log('Saved!');
      
      resposta = 'Usuario criado/atualizado com sucesso'

      res.statusCode = 201;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });
  }
  // Selecionar usuario
  else if (urlparse.pathname == '/selecionar-usuario') {
    fs.readFile(`users/${params.id}.txt`, function(err, data) {
      resposta = data;
      console.log('Selecionado!');

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);
    });
  }
  // Remover usuario
  else if (urlparse.pathname == '/remover-usuario') {
    fs.unlink(`users/${params.id}.txt`, function (err) {
      console.log('File deleted!');

      resposta = err ? "Usuario nao encontrado" : "Usuario removido";

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });
  }
})



// Execucao
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

// http://localhost:3000/criar-atualizar-usuario?nome=Guga&idade=20&id=1
// http://localhost:3000/selecionar-usuario?nome=Guga&idade=20&id=1
// http://localhost:3000/remover-usuario?id=1