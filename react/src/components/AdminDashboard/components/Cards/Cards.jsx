import { useState } from 'react';
import { iconsImgs } from "../../utils/images";
import AddCardModal from '../Addcard/addcard';
import "./Cards.css";

const Cards = () => {
  const [cards, setCards] = useState([
    { cardNumber: '**** **** **** 1234', expiryDate: '12/22', balance: '$ 22,000' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddCard = (newCard) => {
    setCards([...cards, { ...newCard, balance: '$ 0' }]);
  };

  return (
    <div className="grid-one-item grid-common grid-c1">
      <div className="grid-c-title">
        <h3 className="grid-c-title-text">Cards</h3>
        <button className="grid-c-title-icon" onClick={() => setIsModalOpen(true)}>
          <img src={iconsImgs.plus} alt="Add card" />
        </button>
      </div>
      <div className="grid-c1-content">
        {cards.map((card, index) => (
          <div key={index} className="card-item">
            <p>Balance</p>
            <div className="lg-value">{card.balance}</div>
            <div className="card-wrapper">
              <span className="card-pin-hidden">{card.cardNumber.slice(0, 15)}</span>
              <span>{card.cardNumber.slice(15)}</span>
            </div>
            <div className="card-logo-wrapper">
              <div>
                <p className="text text-silver-v1 expiry-text">Expires</p>
                <p className="text text-sm text-white">{card.expiryDate}</p>
              </div>
              <div className="card-logo">
                <div className="logo-shape1"></div>
                <div className="logo-shape2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AddCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddCard={handleAddCard} />
    </div>
  );
};

export default Cards;
