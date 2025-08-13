# Criar Feature de Contatos e Conversas (Versão Inicial)

Este guia orienta a implementação das funcionalidades de contatos e conversas (chat) em seu projeto React + Firebase, separando claramente instruções e trechos de código.

---

## 1. Parta do app básico (`appIni`)
Siga o tutorial do exercício para configurar o projeto inicial.

---

## 2. Criar a feature de contatos

### 2.1. Criar página para adicionar novo contato

- Localização: pasta **views**
- Nome do arquivo: `AddContactPage.jsx`

**Instruções:**
1. Implemente um formulário para adicionar contatos pelo email.
2. Ao digitar o email, busque os dados do usuário no Firebase.
3. Permita editar nome, foto e telefone.
4. Salve o contato na coleção "contacts".

**Código:**
```jsx
import { useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import './UserProfilePage.css';
import Header from '../components/Header';

const AddContactPage = () => {
  // ...código conforme exemplo original...
};

export default AddContactPage;
```

---

### 2.2. Criar componente de item de contato

- Localização: pasta **components**
- Nome do arquivo: `ContactItem.jsx`

**Instruções:**
1. Exiba foto, nome e telefone do contato.
2. Implemente botões "Editar" e "Excluir".

**Código:**
```jsx
import './ContactItem.css';

// eslint-disable-next-line react/prop-types
const ContactItem = ({ user, onEdit, onDelete }) => {
  // ...código conforme exemplo original...
};

export default ContactItem;
```

---

### 2.3. Estilizar o item de contato

- Localização: pasta **components**
- Nome do arquivo: `ContactItem.css`

**Instruções:**
1. Estilize o item para layout responsivo e visual agradável.

**Código:**
```css
/* ...código conforme exemplo original... */
```

---

### 2.4. Criar página de lista de contatos

- Localização: pasta **views**
- Nome do arquivo: `ContactListPage.jsx`

**Instruções:**
1. Liste todos os contatos cadastrados.
2. Permita editar, excluir e abrir chat com cada contato.
3. Adicione um botão flutuante "+" para adicionar novo contato.

**Código:**
```jsx
import { useState, useEffect } from 'react';
import ContactItem from '../components/ContactItem';
// ...código conforme exemplo original...
export default ContactList;
```

---

### 2.5. Inserir Header na lista de contatos

**Instruções:**
Adicione o componente Header na lista de contatos.

**Código:**
```jsx
<Header pageTitle='👥 Lista'/>
```

---

### 2.6. Adicionar botão flutuante "+" na página de contatos

**Instruções:**
Inclua na página de contatos para facilitar a adição de novos contatos.

**Código:**
```jsx
<Link to="/add-cont">
  <div className="floating-button">
    <span>+</span>
  </div>
</Link>
```

---

### 2.7. Alterar rotas no `App.jsx` para incluir página de adicionar contato

**Código:**
```jsx
<Route index element={<ContactList />} />
<Route path="/user-prof" element={<UserProfileForm />} />
<Route path="/add-cont"  element={<AddContactPage />} />
```

---

## 3. Criar página de Conversa (Chat)

- Localização: pasta **views**
- Nome do arquivo: `ChatPage.jsx`

**Instruções:**
1. Permita trocar mensagens entre o usuário autenticado e o contato selecionado.
2. Utilize Firebase para salvar e buscar mensagens em tempo real.

**Código:**
```jsx
import { useState, useEffect } from 'react';
// ...código conforme exemplo original...
export default Chat;
```

---

### 3.1. Criar arquivo de estilos para chat

- Localização: pasta **views**
- Nome do arquivo: `Chat.css`

**Instruções:**
1. Estilize o chat para diferenciar mensagens enviadas e recebidas.

**Código:**
```css
/* ...código conforme exemplo original... */
```

---

### 3.2. Permitir acesso ao chat pela lista de contatos

**Instruções:**
1. Implemente função para abrir conversa pelo id do contato.
2. Adicione tratamento de evento na linha do contato.

**Código:**
```jsx
const handleOpenChat = (id) => {
  navigate(`/chat/${id}`);
};
// Na div do contato:
<div key={user.id} onClick={() => handleOpenChat(user.id)} ... >
```

---

### 3.3. Adicionar rota para chat no `App.jsx`

**Código:**
```jsx
<Route path="/chat/:id" element={<Chat />} />
```

---

**Observação:**  
Adapte os códigos conforme as necessidades específicas do projeto. Certifique-se que as dependências do Firebase e React Router estejam corretamente configuradas.
