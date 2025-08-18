# Guia de Configuração da Autenticação Firebase

Este guia explica como configurar a autenticação do Firebase no seu projeto. Os passos estão organizados com instruções claras e blocos de código separados.

---

## 1. Instale os pacotes do Firebase

**Instruções:**
- Abra o diretório do seu projeto no terminal.
- Execute os seguintes comandos:

```bash
npm install firebase
npm i -g firebase-tools
```

---

## 2. Estrutura do Projeto

**Instruções:**
- Crie uma nova pasta chamada `firebase` dentro do diretório `src`.

```plaintext
src/
  firebase/
```

---

## 3. Configuração do Firebase

**Instruções:**
- Dentro de `src/firebase`, crie um arquivo chamado `config.js`.
- Coloque suas credenciais do Firebase neste arquivo.

**Exemplo (`src/firebase/config.js`):**
```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // suas credenciais aqui
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

## 4. Usando Auth na LoginPage

**Instruções:**
- No seu `LoginPage.jsx`, importe o objeto `auth`:

```javascript
import { auth } from '../firebase/config.js';

console.log(auth); // Coloque isso antes do return
```

---

## 5. Manipulando Credenciais do Usuário

**Instruções:**
- Adicione o estado para as credenciais do usuário:

```javascript
const [userCredentials, setUserCredentials] = useState({});
```

- Adicione `onChange` nos seus inputs de email e senha:

```jsx
<input
  name="email"
  onChange={handleCred}
/>
<input
  name="password"
  onChange={handleCred}
/>
```

- Crie a função de manipulação:

```javascript
function handleCred(e) {
  setUserCredentials({
    ...userCredentials,
    [e.target.name]: e.target.value
  });
  console.log(userCredentials);
}
```

---

## 6. Funcionalidade de Cadastro (Sign Up)

**Instruções:**
- Adicione um botão para cadastro com `onClick`:

```jsx
<button onClick={(e)=>handleSignUp(e)}>Cadastrar</button>
```

- Crie a função de cadastro:

```javascript
import { createUserWithEmailAndPassword } from "firebase/auth";

function handleSignUp(e) {
  e.preventDefault();
  setError(""); // Limpa erros anteriores

  createUserWithEmailAndPassword(
    auth,
    userCredentials.email,
    userCredentials.password
  )
    .then((userCredential) => {
      console.log(userCredential.user);
      // Opcionalmente, envie as informações do usuário para o seu store
    })
    .catch((error) => {
      console.log(error.message);
      setError(error.message); // Mostra erro ao usuário
    });
}
```

- Teste a funcionalidade com credenciais válidas e inválidas; verifique seu Console Firebase para novos usuários.

---

## 7. Exibição de Erros

**Instruções:**
- Adicione estado de erro ao seu componente:

```javascript
const [error, setError] = useState('');
```

- Exiba o erro abaixo do botão de envio:

```jsx
{error && <div className="error">{error}</div>}
```

---

## 8. Funcionalidade de Login

**Instruções:**
- Crie e conecte a função de login:

```javascript
function handleLogin(e) {
  e.preventDefault();
  // Implemente a lógica de login aqui
  // Mostre os dados do login no console.log

        signInWithEmailAndPassword(auth, userCredenciais.email, userCredenciais.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)

            //setError( errorMessage)

            // ..
        }); 



}
```

- Adicione no botão "Entrar":

```jsx
<button onClick={(e)=>handleLogin(e)}>Entrar</button>
```

---

## 9. Função de Redefinir Senha

**Instruções:**
- Crie uma função para redefinir senha:

```javascript
function handlePasswdReset(e) {
  e.preventDefault();
  // Implemente a lógica de redefinição de senha aqui
  const email = prompt('Informe seu e-mail:')
  sendPasswordResetEmail(auth, email)
}
```

- Adicione um link:

```jsx
 <p  onClick={handlePasswordReset} className="forgot-password">Esqueci minha senha.</p>
                  
```

---

## Tabela Resumo

| Passo     | Ação                           | Local do Código            |
|-----------|-------------------------------|----------------------------|
| 1         | Instalar pacotes               | Terminal                   |
| 2         | Criar pasta                    | `src/firebase`             |
| 3         | Configurar Firebase            | `src/firebase/config.js`   |
| 4         | Importar & logar auth          | `LoginPage.jsx`            |
| 5         | Estado das credenciais         | `LoginPage.jsx`            |
| 6         | Função de cadastro             | `LoginPage.jsx`            |
| 7         | Tratamento de erros            | `LoginPage.jsx`            |
| 8         | Função de login                | `LoginPage.jsx`            |
| 9         | Redefinir senha                | `LoginPage.jsx`            |

---
