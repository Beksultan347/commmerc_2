
import React, { useState, useEffect } from 'react';
import productsData from '../data/productsData';

const Projects = ({ activeCategory }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const savedPhoneNumber = localStorage.getItem('phoneNumber');
    if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
  }, []);

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedProduct(null);
    }
  };

  const handleOrderClick = () => {
    setIsPhoneModalOpen(true);
  };

  const handlePhoneNumberSubmit = (e) => {
    e.preventDefault();
    if (!phoneNumber) return;

    localStorage.setItem('phoneNumber', phoneNumber);
    setIsPhoneModalOpen(false);
    setSelectedProduct(null);

    sendTelegramMessage(phoneNumber, selectedProduct.id);

    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  const sendTelegramMessage = (phone, productId) => {
    const telegramToken = '8142625929:AAFLEKKUiKM2jvW5IoW49peFrEWkjtgQOY8';
    const chatId = '6441055549';
    const message = `Новый заказ!\nТелефон: ${phone}\nТовар ID: ${productId}`;

    fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    })
      .then((res) => res.json())
      .then((data) => console.log('Message sent', data))
      .catch((err) => console.error('Telegram error:', err));
  };

  const filteredProducts =
    activeCategory === 'Все'
      ? productsData
      : productsData.filter((product) => product.category === activeCategory);

  return (
    <div className="p-6 bg-[#d6cef2] min-h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => {
              setSelectedProduct(product);
              setCurrentImageIndex(0);
            }}
            className="cursor-pointer bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all p-2 flex flex-col"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-auto object-contain mb-1 rounded-xl"
            />
            <h3 className="text-base font-semibold text-gray-80">{product.title}</h3>
            <p className="text-sm text-gray-700 mb-1">Цена: {product.price} сом</p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProduct(product);
                setIsPhoneModalOpen(true);
              }}
              className="mt-auto bg-blue-600 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-700 transition"
            >
              Заказать
            </button>
          </div>
        ))}
      </div>

    
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-4 flex flex-col md:flex-row gap-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            
            <button
              className="absolute top-4 right-6 text-gray-800 hover:text-red-600 text-5xl font-bold z-50"
              onClick={() => setSelectedProduct(null)}
              aria-label="Закрыть"
            >
              &times;
            </button>

        
            <div className="w-full md:w-1/2 relative flex items-center justify-center">
              <img
                src={selectedProduct.images[currentImageIndex]}
                alt={selectedProduct.title}
                className="w-full h-auto max-h-[400px] object-contain rounded-lg"
              />
              <div className="flex flex-col mt-4 gap-2 overflow-x-auto">
  {selectedProduct.images.map((img, index) => (
    <img
      key={index}
      src={img}
      alt={`Миниатюра ${index + 1}`}
      onClick={() => setCurrentImageIndex(index)}
      className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
        index === currentImageIndex ? 'border-blue-600' : 'border-transparent'
      }`}
    />
  ))}
</div>

              {currentImageIndex > 0 && (
                <button
                  onClick={() => setCurrentImageIndex((i) => i - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 text-5xl px-1 pb-2  rounded-full z-40"
                >
                  ‹
                </button>
              )}
              {currentImageIndex < selectedProduct.images.length - 1 && (
                <button
                  onClick={() => setCurrentImageIndex((i) => i + 1)}
                  className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 text-5xl px-1 pb-2 rounded-full z-40"
                >
                  ›
                </button>
              )}
            </div>

           
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold ">{selectedProduct.title}</h3>
                <p className="text-gray-700 mb-2 text-sm">{selectedProduct.description}</p>
                <p className="text-lg font-semibold text-gray-900 mb-4">
                  Цена: {selectedProduct.price} сом
                </p>
              </div>
              <button
                onClick={handleOrderClick}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition w-full"
              >
                Заказать
              </button>
            </div>
          </div>
        </div>
      )}

    
      {isPhoneModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4"
          onClick={(e) => e.target === e.currentTarget && setIsPhoneModalOpen(false)}
        >
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
            <h3 className="text-xl font-semibold mb-4">Введите ваш номер телефона</h3>
            <form onSubmit={handlePhoneNumberSubmit}>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Ваш номер телефона"
                className="w-full px-4 py-2 border rounded-lg mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white text-sm px-4 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Подтвердить
              </button>
            </form>
          </div>
        </div>
      )}

    
      {orderSuccess && (
        <div className="fixed w-full top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-[9999] text-center">
          Ваш заказ успешно оформлен! Наши менеджеры свяжутся с вами.
        </div>
      )}
    </div>
  );
};

export default Projects;