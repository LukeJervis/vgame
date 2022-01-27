import './App.css';
import Header from './layout/Header'
import ActionArea from './layout/ActionArea'
import NavBar from './layout/NavBar';

function App() {

  return (
    <div className='App'>
      <div className='App__header'>
        <Header />
      </div>
      <div className='App__body'>
        <div className='App__navBar'>
          <NavBar />
        </div>
        <div className='App__actionArea'>
          <ActionArea />
        </div>
      </div>
    </div>
  );
}

export default App;