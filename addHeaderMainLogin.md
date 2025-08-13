# React + Vite: Guia de Implementação com Autenticação Firebase

Este guia apresenta instruções organizadas e exemplos de código para estruturar um projeto React com autenticação via Firebase, tratamento de erros, contexto de usuário e criação de componentes essenciais.

---

## 1. Revisar Conteúdo Anterior

Consulte o código inicial em:  
[appInicial.md](https://github.com/Caetanocc/pw3_252/appInicial.md)

### Fundamentos do React
- **Framework JavaScript**
- **JSX**
- **Componentes e retorno de HTML**
- **Integração com Firebase para autenticação**

---

## 2. Passos Básicos para Rodar o Projeto

**Abra o VSCode e clone o repositório.**  
Instale as dependências:

```sh
npm install 
npm run dev 
```

**Instale pacotes adicionais:**
```sh
npm install firebase
npm install react-router-dom
```

---

## 3. Melhorar o Projeto com Sessão de Usuário

Utilize o usuário GitHub: `caetano1973`

---

## 4. Traduzir Erros na Página de Login

Inclua o dicionário de erros na seção de variáveis da `LoginPage`:

```js
const dict_errors = {
    "auth/weak-password": "A senha é muito fraca. Exija pelo menos 6 caracteres, incluindo números e letras.",
    "auth/invalid-email": "O endereço de e-mail é inválido.",
    "auth/user-not-found": "Não foi encontrada nenhuma conta com este e-mail ou número de telefone.",
    "auth/wrong-password": "A senha está incorreta.",
    "auth/email-already-in-use": "O endereço de e-mail já está sendo usado por outra conta.",
    "auth/operation-not-allowed": "Esta operação não é permitida para este projeto.",
    "auth/user-disabled": "Esta conta de usuário foi desativada.",
    "auth/too-many-requests": "Muitas tentativas de login. Tente novamente mais tarde.",
    "auth/invalid-api-key": "A chave da API fornecida é inválida.",
    "auth/requires-recent-login": "É necessário fazer login recentemente para realizar esta ação.",
    "auth/invalid-credential" : "E-mail ou senha Inválida"
    // Adicione mais erros aqui conforme necessário
}
```

---

## 5. Tratamento de Erros

Altere o tratamento de erro para usar o dicionário:

```js
setError(dict_errors[error.code] || error.message);
```

---

## 6. Criar Pasta de Contextos

**Crie uma nova pasta em `src`:**
```
src/contexts
```

---

## 7. Criar o Arquivo `AuthContext.jsx` (com Observer)

Crie `AuthContext.jsx` em `src/contexts` com o seguinte conteúdo:

```jsx
import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '../firebase/config.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = { user };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

---

## 8. Criar Página Principal: `MainPage.jsx`

Crie `MainPage.jsx` em `src/views`:

```jsx
import { auth } from '../firebase/config';

function MainPage() {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div>
      <h1>Página Principal</h1>
      <p>Bem-vindo!</p>
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}

export default MainPage;
```

---

## 9. Proteger Rotas de Navegação para Usuário Logado

Altere o `App.jsx` para permitir acesso apenas se o usuário estiver logado:

```jsx
import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './views/LoginPage';
import MainPage from './views/MainPage';

function App() {
  return (
    <AuthProvider>
      <AuthContent />
    </AuthProvider>
  );
}

function AuthContent() {
  const { user } = useAuth();

  return (
    <>
      {user ? <MainPage /> : <LoginPage />}
    </>
  );
}

export default App;
```

---

## 10. Exibir Foto do Usuário na `MainPage.jsx`

Ajuste o componente para mostrar a foto e nome do usuário:

```jsx
import { auth } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';

function MainPage() {
  const { user } = useAuth();

  const handleSignOut = () => {
    auth.signOut();
  };

  if (!user) {
    return <p>Carregando informações do usuário...</p>;
  }

  return (
    <div>
      <h1>Página Principal</h1>
      {user.displayName && <p>Nome: {user.displayName}</p>}
      {user.photoURL && <img src={user.photoURL} alt="Foto do usuário" />}
      <button onClick={handleSignOut}>Logout</button>
    </div>
  );
}

export default MainPage;
```

---

## 11. Criar Componente `Header.jsx` com Função Logout

Crie `Header.jsx` em `src/components`:

```jsx
import { NavLink } from 'react-router-dom';
import { auth } from '../firebase/config.js';
import { useAuth } from '../contexts/AuthContext';

function Header({ pageTitle }) {
  const { user } = useAuth();

  const handleSignOut = () => {
    if (window.confirm('Deseja sair, tem certeza?')) {
      auth.signOut();
    }
  };

  return (
    <>
      <div className="header-btns">
        <NavLink to="/">
          <button className="btn">Lista</button>
        </NavLink>
        <NavLink to="/user-prof">
          <button className="btn">Perfil</button>
        </NavLink>
        <div className="user-info">
          {user && (
            <>
              {user.photoURL ? (
                <div className="user-details">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '6px' }}
                  />
                  <span>{user.displayName}</span>
                </div>
              ) : (
                <div className="user-details">
                  <i className="fa fa-user" style={{ marginRight: '10px' }}></i>
                  <span>{user.email}</span>
                </div>
              )}
              <button onClick={handleSignOut} className="btn">Sair</button>
            </>
          )}
        </div>
      </div>
      <h1>{pageTitle}</h1>
    </>
  );
}

export default Header;
```

---

## 12. Ajuste em `main.jsx` para Usar o `BrowserRouter`

No arquivo `main.jsx`, envolva o `App` com o `BrowserRouter`:

```jsx
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

---

**Pronto!**  
Seu projeto estará mais organizado e modular, facilitando manutenções e futuras expansões.
