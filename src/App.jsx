
import About from './components/About.jsx';
import Navbar from './components/Navbar.jsx'
import Projects from './components/Projects.jsx' // импорт Projects
import React, { useState } from 'react';
import './index.css';

const App = () => {
  const [activeCategory, setActiveCategory] = useState('Все'); // Стейт для активной категории

  return (
    <div>
      <About/>
      <Navbar setActiveCategory={setActiveCategory} activeCategory={activeCategory} /> {/* Передаем props */}
      
      <div>
        
        {/* Логика для отображения товаров в выбранной категории */}
      </div>

      <Projects activeCategory={activeCategory} /> {/* Передаем активную категорию в Projects */}
    </div>
  );
};

export default App;