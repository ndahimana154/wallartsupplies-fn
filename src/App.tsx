import { useEffect, useState } from 'react';
import './App.css';
import welcome from './utils/requests/welcome';

function App() {
  const [msg, setMsg] = useState('');

  const fetchHome = async () => {
    try {
      const response = await welcome.welcomeRequest();
      setMsg(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHome();
  }, []);
  return (
    <>
      <div>Hello there</div>
      {msg && msg}
    </>
  );
}

export default App;
