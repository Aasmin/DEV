import NavBar from './Navbar';
import HomePage from './Home';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
