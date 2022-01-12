import React, { useEffect, useState } from "react";
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

const apiUrl = 'https://aspirio-backend.herokuapp.com/';

const Home = () => {

    const [books, setBooks] = useState([]);
    const [book, setBook] = useState({});
    const [infobook, setInfoBook] = useState({});

        const getBooks = async () => {
            let result = await axios.get(`${apiUrl}/books`);

            setBooks(result.data);
        }
    //obtengo datos
    useEffect(() => {
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

    const handleState = (event) => {
        let newBook = { ...book, [event.target.name]: event.target.value };
        setBook(newBook);
    };

    //Actualización de los datos
    const updateBook = async () => {
        try {
            let id = book.id;
            console.log(book);
           let res = await axios.put(`${apiUrl}/books/${id}`, book);
            console.log(res);
        } catch (error) {
            console.log(error);
        }

        getBooks();
    }

    //Mostrar datos
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
    const [modalInfo, setModalInfo] = React.useState(false);

    // Toggle for Modal
    const toggle = () => setModal(!modal);
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
                onClosed={updateBook}
            >
                <ModalHeader toggle={toggle}>
                    <Input
                        id="name"
                        name="name"
                        value={book.name}
                        type="text" 
                        onChange={handleState}/>
                </ModalHeader>
                <ModalBody>
                    <Input
                        id="description"
                        name="description"
                        value={book.description}
                        type="textarea"
                        onChange={handleState}
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