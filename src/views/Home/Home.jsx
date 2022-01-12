import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Modal,
    ModalBody,
    ModalHeader,
    Input
} from 'reactstrap';
import './Home.scss';

const Home = (props) => {

    let history = useHistory();
    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({});
    const [infobook, setInfoBook] = useState({});

    //obtengo datos
    useEffect(() => {
        const getBooks = async () => {
            let result = await axios.get(`http://localhost:3001/books`);

            setBooks(result.data);
        }
        getBooks();
    }, []);

    const editBook = book => {
        setBook(book);
        toggle();
    };

    const dataBook = infobook => {
        setInfoBook(infobook);
        toggleInfo();
    }

    const getBooksElements = () => {
        return books.map((book) => {
            return <div className="book">
                <Card
                    color="light"
                    outline
                    body
                    size='sm'>
                    <CardBody>
                        <CardTitle tag='h5' onClick={() => dataBook(book)}>
                            {book.name}
                        </CardTitle>

                        <Button
                            color="success"
                            outline
                            size="sm"
                            onClick={() => editBook(book)}
                        >
                            Edit
                        </Button>
                    </CardBody>
                </Card>
            </div>
        })
    }

    // Modal open state
    const [modal, setModal] = React.useState(false);
    // Modal open state
    const [modalInfo, setModalInfo] = React.useState(false);

    // Toggle for Modal
    const toggle = () => setModal(!modal);
    // Toggle for Modal
    const toggleInfo = () => setModalInfo(!modalInfo);

    return (
        <div className="home">
            <Modal
                centered
                fullscreen="md"
                scrollable
                size="lg"
                isOpen={modal}
                toggle={toggle}
                modalTransition={{ timeout: 1000 }}
            >
                <ModalHeader toggle={toggle}>
                    <Input
                        id="title"
                        name="title"
                        placeholder={book.name}
                        type="text" />
                </ModalHeader>
                <ModalBody>
                    <Input
                        id="description"
                        name="description"
                        placeholder={book.description}
                        type="textarea"
                    />
                </ModalBody>
            </Modal>

            <Modal
                centered
                fullscreen="md"
                scrollable
                size="lg"
                isOpen={modalInfo}
                toggle={toggleInfo}
                modalTransition={{ timeout: 1000 }}
            >
                <ModalHeader toggle={toggleInfo}>
                    {infobook.name}
                </ModalHeader>
                <ModalBody>
                    {infobook.description}
                </ModalBody>
            </Modal>
            
            {getBooksElements()}
        </div>
    )
}

export default Home;