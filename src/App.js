import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CatList from './components/CatList';
import { AddCat } from './components/AddCat';
import { EditCat } from './components/EditCat';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CatList />}/>
        <Route path='add' element={<AddCat />} />
        <Route path='edit/:id' element={<EditCat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
