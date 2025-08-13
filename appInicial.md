# Guia para Criar Projeto React com Vite e Firebase

Este guia ensina como criar um projeto React utilizando Vite e configurar o Firebase. Os passos estão detalhados em português e os trechos de código estão separados das instruções.

---

## 1. Preparação do Ambiente

1. Crie uma nova pasta no seu computador, por exemplo:  
   `c:\pw3`

2. Abra o terminal (cmd) do Windows dentro desta pasta.

3. Execute os comandos abaixo para instalar o Vite e criar o projeto inicial:

    ```sh
    npm install -g create-vite
    npm create vite@latest appInicial 
    ```

4. Durante a criação do projeto, escolha as opções:
   - Nome do package: **package.json**
   - Framework: **React**
   - Variante: **JavaScript + SWC**

5. Acesse a pasta do projeto e abra no VSCode:

    ```sh
    cd appInicial
    code .
    ```

---

## 2. Instalação de Dependências

1. Instale as dependências necessárias:

    ```sh
    npm install
    npm install firebase
    npm audit fix
    ```

2. Para executar o projeto em modo de desenvolvimento:

    ```sh
    npm run dev 
    ```

3. Quando o projeto iniciar, pressione `o` para abrir no navegador (exemplo: http://localhost:5173/).

---

## 3. Estrutura de Pastas

1. No VSCode, dentro da pasta `src`, crie as seguintes pastas:
   - `firebase`
   - `components`
   - `views`

---

## 4. Configuração do Firebase

1. Dentro da pasta `src/firebase`, crie o arquivo `config.js` e inclua o código abaixo, preenchendo com suas chaves do Firebase:

    ```js
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
        apiKey: "SUA_API_KEY",
        authDomain: "SEU_AUTH_DOMAIN",
        projectId: "SEU_PROJECT_ID",
        storageBucket: "SEU_STORAGE_BUCKET",
        messagingSenderId: "SEU_MESSAGING_SENDER_ID",
        appId: "SEU_APP_ID"
    };

    // Inicializa o Firebase
    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
    export const db = getFirestore(app);
    ```

---

## 5. Página de Login

1. Crie o arquivo `LoginPage.jsx` dentro da pasta `src/views` com o seguinte conteúdo:

    ```jsx
    import { auth } from '../firebase/config.js';
    import { useState } from 'react';

    function LoginPage() {
        const [loginType, setLoginType] = useState('login');

        return (
            <>
                <div className="container login-page">
                    <section>
                        <h1>Etec Albert Einstein</h1>
                        <p>Entre ou crie uma conta para continuar.</p>
                        <div className="login-type">
                            <button 
                                className={`btn ${loginType === 'login' ? 'selected' : ''}`}
                                onClick={() => setLoginType('login')}>
                                Entrar
                            </button>
                            <button 
                                className={`btn ${loginType === 'signup' ? 'selected' : ''}`}
                                onClick={() => setLoginType('signup')}>
                                Criar Conta
                            </button>
                        </div>
                        <form className="add-form login">
                            <div className="form-control">
                                <label>E-mail *</label>
                                <input type="text" name="email" placeholder="Informe seu email" />
                            </div>
                            <div className="form-control">
                                <label>Senha *</label>
                                <input type="password" name="password" placeholder="Informe a senha" />
                            </div>
                            {
                                loginType === 'login' ?
                                <button className="active btn btn-block">Entrar</button>
                                : 
                                <button className="active btn btn-block">Criar Conta</button>
                            }
                            <button className="active btn btn-block">Login com Google</button>
                            <p className="forgot-password">Esqueci minha senha.</p>
                        </form>
                    </section>
                </div>
            </>
        );
    }

    export default LoginPage;
    ```

---

## 6. Arquivo HTML Principal

1. Localize o arquivo `index.html` e substitua seu conteúdo por:

    ```html
    <!doctype html>
    <html lang="pt">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js"></script>
        <title>Etec AE Firebase</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>
    ```

---

## 7. Estilos CSS

1. Localize o arquivo `index.css` e substitua seu conteúdo pelo seguinte:

    ```css
    @import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,400;1,500&display=swap");

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: "Lora", sans-serif; }
    body { background-color: #d0e2f2; }

    /* ... (demais estilos iguais ao original) ... */

    .floating-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background-color: #00ff5e;
      color: white;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      text-decoration: none;
      z-index: 1000;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .floating-button:hover {
      background-color: #00b339;
    }
    ```

    > **Obs.:** Mantenha todos os estilos do arquivo original.

---

## 8. Configuração de Rotas no App

1. Localize o arquivo `App.jsx` e substitua tudo pelo conteúdo abaixo:

    ```jsx
    import './App.css';
    import LoginPage from './views/LoginPage.jsx';

    function App() {
      return (
        <>
          <LoginPage />
        </>
      );
    }

    export default App;
    ```

---

## 9. Executando o Projeto

No terminal, execute:

```sh
npm run dev
```

Acesse a aplicação no navegador para testar.

---

