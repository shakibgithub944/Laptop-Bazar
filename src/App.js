import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <div className="">

      <button className="btn btn-outline btn-info">Info</button>
      <button className="btn btn-outline btn-success">Success</button>
      <button className="btn btn-outline btn-warning">Warning</button>
      <button className="btn btn-outline btn-error">Error</button>
      
      <Toaster />
    </div>
  );
}

export default App;
