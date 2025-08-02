````md
# FeedbackHub - App Mobile | Leve Saúde 💬📱
````
## Descrição do Projeto

FeedbackHub Mobile é um aplicativo desenvolvido em React Native com Expo, voltado para que usuários finais enviem e visualizem seus próprios feedbacks de forma simples e eficiente.

## Tecnologias Utilizadas

- React Native
- Expo (EAS Build)
- TypeScript
- Firebase Auth & Firestore
- ESLint + Prettier
- StyleSheet (React Native)
- React Navigation

## Estrutura do Projeto

- `src/assets/`: Imagens, ícones e logos
- `src/screens/`: Telas do App
  - `LoginScreen.tsx`
  - `FeedbackFormScreen.tsx` (Envio de feedback)
  - `FeedbackListScreen.tsx` (Listagem dos feedbacks do usuário)
- `src/navigation/`: Configuração de rotas com React Navigation
- `src/services/`: Integração com Firebase (Auth + Firestore)
- `App.tsx`: Ponto de entrada e provedor de navegação
- `eas.json`: Configurações do EAS Build (development)

## Funcionalidades

- 🔐 **Autenticação Firebase** (email e senha)
- ⭐ **Envio de feedback** com nota (1 a 5 estrelas) e comentário (mín. 10 caracteres)
- 📄 **Listagem de feedbacks** enviados pelo usuário autenticado
- 🚀 **Build com EAS** (perfil development)
- 🎨 **Estilização** com StyleSheet nativo e responsividade básica

## Resultados e Insights

- Interface clara e intuitiva para envio rápido de feedbacks
- Persistência em tempo real no Firestore
- Construção de builds de desenvolvimento com EAS para testes em dispositivo

## Contribuição

Contribuições são bem-vindas! Para colaborar:
1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Faça suas alterações e commit: `git commit -m "Descrição da feature"`
4. Envie para o remoto: `git push origin feature/nova-feature`
5. Abra um Pull Request

## Autor

Maurício Souza
- GitHub: https://github.com/mauriciosouza-dev
- Site: https://jmscode.com.br

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

## Instalação e Execução

1. **Clone o repositório**

   ```bash
   git clone https://github.com/seu-usuario/test-mobile-leve-saude.git
   cd test-mobile-leve-saude

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure o Firebase**

   Crie `src/services/firebase.ts` com suas credenciais Firebase (Auth + Firestore).

4. **Inicie em modo de desenvolvimento**

   ```bash
   expo start
   ```

5. **Build de desenvolvimento com EAS**

   ```bash
   eas build --profile development --platform android
   ```
