import React, { useState, useEffect } from 'react';

const Navbar = ({ setActiveCategory, activeCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false); // Для отслеживания прокрутки
  const categories = [
    'Все',
    'Образы', 
    'Хиджабы', 
    'Брюки и юбки', 
    'Рубашки и футболки', 
    'Пальто и куртки', 
    'Костюмы и комбинизоны', 
    'Одежда для спорта', 
    'Нижнее белье'
  ];

  // Эффект для отслеживания прокрутки страницы
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true); // Если прокручено более 100px, панель фиксируется
      } else {
        setIsScrolled(false); // Если на самом верху, панель возвращается в обычное состояние
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`bg-gray-800 p-4 ${isScrolled ? 'fixed top-0 left-0 right-0 z-50 shadow-md' : ''}`}>
      <div 
        className={`flex gap-2 sm:gap-1 pb-2 items-center overflow-x-auto ${isScrolled ? 'flex-nowrap' : 'flex-wrap'}`}
        style={{ whiteSpace: 'nowrap' }} // чтобы текст не переносился на мобильных
      >
        {categories.map((category) => (
          <div key={category} className="relative flex flex-col items-center">
            <p
              className={`text-xs cursor-pointer px-3 py-1 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-blue-500 text-white' // Активная категория
                  : 'text-white border border-white hover:bg-gray-700' // Неактивная категория
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
