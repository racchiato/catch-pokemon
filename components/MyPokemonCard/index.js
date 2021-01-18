import React, { useState } from 'react';
import { Card, Col, Button, Form, Modal } from 'react-bootstrap';
import Link from 'next/link';

const MyPokemonCardComponent = ({ pokemon }) => {
    const [show, setShow] = useState(false);
    const [nickname, setNickname] = useState(pokemon.nickname);
    const [showError, setShowError] = useState(false)

    const releasePokemon = (e) => {
        e.preventDefault();
        let myPokemons = JSON.parse(localStorage.getItem('myPokemon'));
        let deleted = myPokemons.filter(pokemonDeleteFilter);
        localStorage.setItem('myPokemon', JSON.stringify(deleted));
        window.location.reload();
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleChange = (e) => {
        setNickname(e.target.value);
    }

    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    }

    const changeName = (e) => {
        e.preventDefault();
        let myPokemons = JSON.parse(localStorage.getItem('myPokemon'));
        if (myPokemons.filter(findPokemonNickNames).length > 0) {
            setShowError(true)
        } else {
            let index = myPokemons.findIndex(findPokemonFilter);
            let newPokemon = { ...myPokemons[index], nickname };
            myPokemons[index] = newPokemon;
            localStorage.setItem('myPokemon', JSON.stringify(myPokemons));
            window.location.reload()
        }
    }

    const pokemonDeleteFilter = (myPokemon) => {
        return ((myPokemon.nickname !== pokemon.nickname) && (myPokemon.name !== pokemon.name))
    }

    const findPokemonFilter = (myPokemon) => {
        return (myPokemon.nickname == pokemon.nickname && myPokemon.name == pokemon.name)
    }

    const findPokemonNickNames = (myPokemon) => {
        return (myPokemon.nickname.toUpperCase() == nickname.toUpperCase())
    }

    return (
        <Col md={3} className="mb-3 pokemon-card">
            <Link href="pokemon/[name]" as={`pokemon/${pokemon.name}`}>
                <Card>
                    <Card.Img variant="top" src={pokemon.image} />
                    <Card.Body className="text-center">
                        <Card.Text className="font-weight-bold">
                            {pokemon.nickname.toUpperCase()}
                        </Card.Text>
                        <Card.Text>
                            {pokemon.name.toUpperCase()}
                        </Card.Text>
                        <Button variant="primary-darker" className="mb-2 w-100" onClick={handleShow}>CHANGE</Button>
                        <Button variant="danger" className="w-100" onClick={releasePokemon}>RELEASE</Button>
                    </Card.Body>
                </Card>
            </Link>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change {pokemon.nickname} nickname</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={pokemon.image} />
                    <Form>
                        <Form.Group controlId="nickNameForm">
                            <Form.Label>Enter new nickname</Form.Label>
                            <Form.Control placeholder="Johnny" onChange={handleChange} value={nickname} />
                        </Form.Group>
                        {showError && <p className="text-danger">Nickname already existed</p>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={changeName}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    )
}

export default MyPokemonCardComponent;