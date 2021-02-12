import './App.css';
import Login from './components/login/Login.js';

function setAccess(userAccess) {
  sessionStorage.setItem('access', JSON.stringify(userAccess));
}
  
function getAccess() {
  const accessString = sessionStorage.getItem('access');
  const userAccess = JSON.parse(accessString);
  return userAccess?.access
}
  
function App() {
  const token = getAccess();
  
  if(!token) {
    return <Login setAccess={setAccess} />
  }
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
