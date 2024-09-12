// pages/index.js
import { useState } from 'react';
import axios from 'axios';
import styles from '../public/styles/Home.module.css'; // Importando os estilos

export default function Home() {
  const [url, setUrl] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/screenshot', { url });
      setImage(response.data.imageUrl);
    } catch (error) {
      console.error('Erro ao capturar a tela:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Captura de Tela</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Insira a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          {loading ? 'Carregando...' : 'Enviar'}
        </button>
      </form>
      {image && (
        <div className={styles.result}>
          <h2 className={styles.subtitle}>Captura:</h2>
          <a href={image} download="screenshot.png">
            <img src={image} alt="Screenshot" className={styles.image} />
          </a>
        </div>
      )}
    </div>
  );
}
