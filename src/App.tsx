import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import FormProviderCaseMaterial from './Form';
import MyTable from './MyTable';

function App() {
  return (
    <div>
      <FormProviderCaseMaterial />
      <MyTable />
    </div>
  );
}

export default App;
