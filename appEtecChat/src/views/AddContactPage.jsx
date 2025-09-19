import { useState } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import './UserProfilePage.css';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const AddContactPage = () => {
  const { id } = useParams(); // vai ser undefined se estiver no modo de criação
  const pageTitle = id ? "Editar Contato" : "Adicionar Contato";
  const navigate = useNavigate();
  const [contactUserId, setContactUserId] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        const docRef = doc(db, 'contacts', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      };
  
      fetchContact();
    }
  }, [id]);

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    photo: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);

  // Função para buscar o usuário pelo e-mail
  const fetchUserByEmail = async (email) => {
    setError('');
    setUserNotFound(false);

    if (!email) return;

    try {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setContactUserId(querySnapshot.docs[0].id); // Armazena o ID do usuário encontrado
        setFormData(prev => ({
          ...prev,
          fullName: userData.fullName || '',
          photo: userData.photo || '',
          phone: userData.phone || ''
        }));
      } else {
        setUserNotFound(true);
        setFormData(prev => ({
          ...prev,
          fullName: '',
          photo: '',
          phone: ''
        }));
      }
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      setError("Erro ao buscar usuário.");
    }
  };

  // Captura mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "email") {
      fetchUserByEmail(value); // Busca o usuário ao digitar o email
    }
  };

  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      setLoading(true);
      const contactData = {
        ...formData,
        updatedAt: new Date().toISOString(),
      };

      if (id) {
        // modo edição
        const contactRef = doc(db, 'contacts', id);
        await updateDoc(contactRef, contactData);
      } else {
        // modo criação
        await addDoc(collection(db, 'contacts'), {
          ...contactData,
          createdBy: auth.currentUser.uid,
          contactUserId: contactUserId || null, 
          createdAt: new Date().toISOString()
        });
      }

      setSuccess(true);
      navigate('/');
    } catch (error) {
      setError('Erro ao salvar contato');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Header pageTitle={pageTitle} />

      <div className="user-profile-container">
        <h2 className="text-2xl font-bold mb-6">{pageTitle}</h2>

        {error && <div className="user-profile-error">{error}</div>}
        {success && <div className="user-profile-success">Contato adicionado com sucesso!</div>}
        {userNotFound && <div className="user-profile-warning">Usuário não encontrado! Você pode editar os dados manualmente.</div>}

        <form onSubmit={handleSubmit} className="user-profile-form">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Nome Completo</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Foto URL</label>
          <input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
          />

          <label>Telefone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Contato'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddContactPage;

