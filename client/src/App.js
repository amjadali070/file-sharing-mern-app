import { useState, useEffect, useRef } from 'react';
import './App.css';
import { uploadFile } from './service/api';
import photo from './service/photo.jpg'

function App() {
  const [file, setFile] = useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  const url = 'https://drive.google.com/file/d/1s_wv1u4x3xT3jtncIcUTqlFvtftDKO7T/view?usp=sharing';

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await uploadFile(data);
        setResult(response.path);
      }
    }
    getImage();
  }, [file])

  const onUploadClick = () => {
    fileInputRef.current.click();
  }

  return (
    <div className='container'>
      <img src={result || photo} className='img' alt="Uploaded" />

      <div className='wrapper'>
        <h1>Simple file sharing!</h1>
        <p>Upload and share the download link.</p>
        
        <button onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target='_blank' rel='noreferrer'>{result}</a>
      </div>

    </div>
  );
}

export default App;
