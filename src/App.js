import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css"; 
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInput: "",
            list: [],
        };
    }

    updateInput(value) {
        this.setState({
            userInput: value,
        });
    }

    addItem() {
        if (this.state.userInput !== "") {
            const userInput = {
                id: Math.random(),
                value: this.state.userInput,
            };

            const list = [...this.state.list, userInput];

            this.setState({
                list,
                userInput: "",
            });
        }
    }

    deleteItem(key) {
        const list = this.state.list.filter((item) => item.id !== key);
        this.setState({ list });
    }

    editItem = (index) => {
        const editedTodo = prompt('Edit the todo:');
        if (editedTodo && editedTodo.trim() !== '') {
            const updatedList = [...this.state.list];
            updatedList[index].value = editedTodo;
            this.setState({ list: updatedList });
        }
    }

    render() {
        return (
            <Container className="app-container">
                <Row className="text-center mb-4">
                    <h1 className="title">TODO LIST</h1>
                </Row>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Add item..."
                                size="lg"
                                value={this.state.userInput}
                                onChange={(e) => this.updateInput(e.target.value)}
                                aria-label="add something"
                            />
                            <Button
                                variant="primary"
                                className="btn-add"
                                onClick={() => this.addItem()}
                            >
                                ADD
                            </Button>
                        </InputGroup>
                    </Col>
                </Row>

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <ListGroup>
                            {this.state.list.map((item, index) => (
                                <ListGroup.Item
                                    key={item.id}
                                    variant="light"
                                    className="d-flex justify-content-between align-items-center list-item"
                                >
                                    {item.value}
                                    <span>
                                        <Button
                                            variant="danger"
                                            className="mx-1"
                                            onClick={() => this.deleteItem(item.id)}
                                        >
                                            Delete
                                        </Button>
                                        <Button
                                            variant="info"
                                            className="mx-1"
                                            onClick={() => this.editItem(index)}
                                        >
                                            Edit
                                        </Button>
                                    </span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
