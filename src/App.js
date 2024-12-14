import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [files, setFiles] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!files) return alert('Selecione pelo menos um arquivo PDF.');

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('pdfs', files[i]);
    }

    try {
      const response = await axios.post(`${apiUrl}/merge-pdfs`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob', // Necessário para download
      });

      // Cria um link para download do PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'merged.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert('Erro ao enviar os PDFs.');
    }
  };

  return (
    <div className="App">
      <h1>Combine PDFs</h1>
      <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload e Combinar</button>
    </div>
  );
}

export default App;
