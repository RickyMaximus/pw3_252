# pw3_252

### Criar projeto REACT com vite

*   Crie uma nova pasta c:\pw3 no PC e posicione nela
*   Abra um cmd do Windows na pasta c:\pw3 e execute o código :

```
npm install -g create-vite
npm create vite@latest appBase 
```
- Escolha como nome do package:  **package.json**
- Escolha opção **React**
- Escolha **JavaScript + SWC**

```
cd appBase
npm install
npm run dev 
```

*  após rodar utilize a opção 'o' para abrir o projeto no navegador , deve abrir algo como http://localhost:5173/
  
*  abra outro cmd na pasta c:\pw3\appBase 

*  instale outros pacotes necessários ao projeto com os comandos:
```
npm install react-router-dom
npm install firebase 

```
 
*  digite o comando para abrir o vscode
``` code . ```   

*  no vscode dentro de ***src*** crie uma pasta ***firebase*** e dentro crie arquivo config.js 
*  inclua o código no config.js , lembre-se de incluir suas chaves do firebase 

```
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: " ",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const db = getFirestore(app);

``` 
