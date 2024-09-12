// pages/api/screenshot.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;

    try {
      const response = await axios.post('https://api.screenshotmachine.com', null, {
        params: {
          key: '0331de',
          url,
          format: 'png',
          dimension: '1024x768',
        },
        responseType: 'arraybuffer',
      });

      const base64Image = Buffer.from(response.data, 'binary').toString('base64');
      const imageUrl = `data:image/png;base64,${base64Image}`;

      res.status(200).json({ imageUrl });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao capturar a tela' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
