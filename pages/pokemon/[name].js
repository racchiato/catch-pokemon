import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { client, GET_POKEMON_DETAILS_QUERY } from '../../api';
import { Container, Row, Col, Button, Modal, Form, FormControl } from 'react-bootstrap';
const Layout = dynamic(() => import('../../components/Layout'));

export const getServerSideProps = async ({ params }) => {
    let name = params.name
    const { data } = await client.query({
        query: GET_POKEMON_DETAILS_QUERY,
        variables: {
            name
        }
    })
    return {
        props: {
            pokemon: data.pokemon
        }
    }
}

const PokemonPage = ({ pokemon }) => {
    const [caught, setCaught] = useState(null);
    const [nickname, setNickname] = useState('');
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false)
    const router = useRouter();
    console.log(pokemon);
    const pokemonFilter = (myPokemon) => {
        return (myPokemon.nickname.toUpperCase() == nickname.toUpperCase())
    }

    const catchPokemon = (e) => {
        e.preventDefault();
        let chance = Math.round(Math.random());
        if (chance == 1) {
            setCaught("success")
            setShow(true)
        } else {
            setCaught("failed")
        }
    }

    const changeNickname = (e) => {
        setNickname(e.target.value);
    }

    const handleClose = () => {
        setShow(false)
    }

    const savePokemon = (e) => {
        e.preventDefault();
        let newPokemon = {
            name: pokemon.name,
            image: pokemon.sprites.front_default,
            nickname: nickname
        }
        if (localStorage.getItem('myPokemon')) {
            let current = JSON.parse(localStorage.getItem('myPokemon'))
            if (current.filter(pokemonFilter).length >= 1) {
                setShowError(true)
            } else {
                current.push(newPokemon)
                localStorage.setItem('myPokemon', JSON.stringify(current))
                router.push('/my-pokemon')
            }
        } else {
            localStorage.setItem('myPokemon', JSON.stringify([newPokemon]))
            router.push('/my-pokemon')
        };
    }

    return (
        <Layout title={`${pokemon.name} | Catch the Pokemon`}>
            <Container>
                <Row className="my-3">
                    <Col className="text-center">
                        <Link href="/">
                            <a className="text-primary-darker">Go back to pokemon list</a>
                        </Link>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={4} className="my-auto">
                        <img src={pokemon.sprites.front_default} className="w-100" />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col md={4} className="my-auto text-center">
                        <h3 className="heading text-primary-darker">
                            {pokemon.name.toUpperCase()}
                        </h3>
                        <p>
                            {pokemon.types && pokemon.types.map((type, index) => {
                                if (index == pokemon.types.length - 1) {
                                    return type.type.name.toUpperCase()
                                } else {
                                    return type.type.name.toUpperCase() + ' | '
                                }
                            })}
                        </p>
                        {!caught && <Button variant="primary-darker" className="w-100" onClick={catchPokemon}>CATCH {pokemon.name.toUpperCase()}</Button>}
                        {caught == "success" && <p className="font-weight-bold text-primary-darker">This pokemon has been successfully added to your list.</p>}
                        {caught == "failed" && <p className="font-weight-bold text-primary-darker">{pokemon.name.toUpperCase()} got away....</p>}
                    </Col>
                </Row>
                <Row className="mt-4 justify-content-around">

                </Row>
                <Row className="my-4 justify-content-around">
                    <Col md={8}>
                        <h4 className="text-center heading text-primary-darker">STATS</h4>
                        <div className="info-wrapper">
                            {pokemon.stats && pokemon.stats.map(stat => (
                                <p><strong>{stat.stat.name.toUpperCase()}:</strong> {stat.base_stat}</p>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row className="my-4 justify-content-around">
                    <Col md={8}>
                        <h4 className="text-center heading text-primary-darker">MOVES</h4>
                        <div className="info-wrapper">
                            <p>{pokemon.moves && pokemon.moves.map((move, index) => {
                                if (index == pokemon.moves.length - 1) {
                                    return move.move.name.toLowerCase()
                                } else {
                                    return move.move.name.toLowerCase() + ' | '
                                }
                            })}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Give your {pokemon.name.toUpperCase()} a nickname</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={pokemon.sprites.front_default} className="w-100" />
                    <Form>
                        <Form.Group controlId="nickNameForm">
                            <Form.Label>Enter Nickname</Form.Label>
                            <Form.Control placeholder="Johnny" onChange={changeNickname} />
                            {showError && (<p className="text-danger">Nickname already existed</p>)}
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={savePokemon}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
}

export default PokemonPage;