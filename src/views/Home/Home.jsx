import React from "react";
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

const Home = () => {
    // Modal open state
    const [modal, setModal] = React.useState(false);

    // Toggle for Modal
    const toggle = () => setModal(!modal);

    return (
        <div className="home">
            <div className="book">
                <Card
                    color="light"
                    outline
                    body
                    size='sm'
                >
                    <CardBody>
                        <CardTitle tag='h5'>
                            BOOK 1
                        </CardTitle>

                        <Button
                            color="success"
                            outline
                            size="sm"
                            onClick={toggle}
                        >
                            Edit
                        </Button>

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
                                    placeholder="Book1"
                                    type="text" />
                            </ModalHeader>
                            <ModalBody>
                                <Input
                                    id="description"
                                    name="description"
                                    placeholder="frferfrfrferfreferfrf"
                                    type="textarea"
                                />
                            </ModalBody>
                        </Modal>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default Home;