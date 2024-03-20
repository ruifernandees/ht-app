# 🤙 HT App by Rui Fernandes
## 🔗 Bibliotecas Principais
- react-native-paper (Componentes em Material Design)
- react-native-snackbar (Snackbar para feedback do usuário)
- zustand (Gerenciamento de estado)
- react-hook-forms (Gerenciamento de formulários)
- zod (Validador)
- @react-three/fiber (Renderizador do Three.js no React)
- jest e testing-library (Testes automatizados)
- lottie-react-native (Animações)
- react-native-responsive-fontsize (Responsividade para fontes, margens e paddings)
- styled-components (Estilização de componentes React)
- react-navigation v6 (Navegação dentro do app: Stack e Tab)

## 📝 Padrões de Projeto
- Os padrões de projetos utilizados foram:
  - Repository: para realizar a inversão de dependência entre o domínio da aplicação e o Firebase
  - Adapter: para adaptar objetos vindos do Firebase para as interfaces do domínio

## 🏛️ Arquitetura
- Disponível em: https://miro.com/app/board/uXjVKeHYXFE=/?share_link_id=599749576543

![Arquitetura HT App](https://github.com/ruifernandees/ht-app/assets/23262436/bbe26f30-5ffc-41e1-a9d2-d462ec78f689)


## 🚀 Executando
Para rodar o projeto em sua máquina, execute os seguintes comandos:
```sh
# Clonar o repositório
git clone https://github.com/ruifernandees/ht-app.git
cd ht-app

# Instalar dependências
yarn

# Executar servidor metro sem caches
yarn dev

# Ou executar servidor metro com caches
yarn start

# Compilar para android
yarn android
```

## 🧪 Testes Automatizados
- Foram feitos 3 testes unitários:
  - No componente Header (com a React Testing Library), para testar seus componentes internos e eventos com fireEvent;
  - Na função validateHexColor para verificar a validade de valores hexadecimais;
  - No FirebaseUserAdapter para testar a conversão do objeto vindo do Firebase para a entidade User.
- Para rodar os testes, basta executar o comando:
```sh
yarn test
```