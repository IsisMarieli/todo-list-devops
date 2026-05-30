# To-Do List DevOps 🚀

[![CI/CD Pipeline](https://github.com/IsisMarieli/todo-list-devops/actions/workflows/ci.yml/badge.svg)](https://github.com/IsisMarieli/todo-list-devops/actions)

## 📋 Descrição do Projeto
Este sistema é uma aplicação web funcional de gerenciamento de tarefas (To-Do List). O projeto foi desenvolvido com foco no ciclo de vida de desenvolvimento moderno, aplicando conceitos práticos de controle de versão, containerização e esteiras de automação (CI/CD) para simular o fluxo de trabalho de uma squad de alto desempenho.

## 🛠️ Tecnologias Utilizadas
* **Frontend:** Framework Angular
* **Backend:** Node.js com Express
* **Banco de Dados:** SQLite (Persistência leve em arquivo local)
* **Containerização:** Docker (Via GitHub Codespaces)
* **CI/CD:** GitHub Actions (Automação de build a cada push)

## 📦 Guia **Docker** (Via GitHub Codespaces)

**1. Inicializar o Ambiente**
 - Clique no botão Code no repositório do GitHub.

- Selecione a aba Codespaces e clique em Create codespace on main.

- O GitHub irá ler as configurações do contêiner e subir os serviços de Frontend e Backend em Docker automaticamente em segundo plano.

**2. Configuração de Portas (Proxy do Codespaces):**
Para que o contêiner do Angular (porta 4200) consiga ler os dados do contêiner do Express (porta 3000), a porta do backend precisa estar pública:

- No terminal do Codespaces, acesse a aba Ports (Portas).

- Localize a porta 3000.

- Clique com o botão direito sobre ela, vá em Port Visibility (Visibilidade da Porta) e mude de Private para Public.

**3. Abrir a Aplicação:**
 - Na mesma aba Ports, localize a porta 4200 (Frontend) para usar o sistema.

**4. Para ver as Imagens Docker salvas:**
```bash
docker images
```
**5. Para ver os Contêineres que estão rodando a partir dessas imagens:**
```bash
docker ps
```

**6. Para ver todos os contêineres (mesmo os que estão desligados/parados):**
```bash
docker ps -a
```

### 1. Clonar o Repositório:
```bash
git clone https://github.com/IsisMarieli/todo-list-devops.git

cd todo-list-devops

code .
```
### 2. Rodar projeto:

**Backend:**
```bash
node server.js
```

**Frontend:**
```bash
ng serve
```

👥 Integrantes do Grupo

01645290 - Emilly Dantas da Silva Bento

01567091 - Eychila Meirelle da Silva

01482889 - Isis Marieli da Silva Moura

