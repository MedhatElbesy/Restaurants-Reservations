// import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const RestaurantModal = ({ isOpen, toggle, restaurant }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{restaurant.name}</ModalHeader>
            <ModalBody>
                <p><strong>Title:</strong> {restaurant.title}</p>
                <p><strong>Summary:</strong> {restaurant.summary}</p>
                <p><strong>Description:</strong> {restaurant.description}</p>
                <p><strong>Hotline:</strong> {restaurant.hot_line}</p>
                {/* Add more details as needed */}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default RestaurantModal;
