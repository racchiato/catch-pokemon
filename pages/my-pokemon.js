import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';

const Layout = dynamic(() => import('../components/Layout'));
const MyPokemonCard = dynamic(() => import('../components/MyPokemonCard'));

const MyPokemonPage = () => {
    const [myPokemons, setMyPokemons] = useState([]);
    useEffect(() => {
        if (localStorage !== undefined) {
            if (JSON.parse(localStorage.getItem('myPokemon'))) {
                setMyPokemons(JSON.parse(localStorage.getItem('myPokemon')))
            }
        }
    }, [])
    return (
        <Layout title="My Pokemons">
            <Container style={{ paddingTop: '3vh' }}>
                <Row className="my-3 text-primary-darker">
                    <Col className="text-center">
                        <h2>MY POKEMONS</h2>
                    </Col>
                </Row>
                <Row>
                    {myPokemons.length > 0 ? myPokemons.map((myPokemon, index) => (
                        <MyPokemonCard pokemon={myPokemon} key={index} />
                    )) : (
                            <Col>
                                <h3>It seems you haven't caught any pokemons....</h3>
                                <Link href="/">
                                    <a>Back to pokemon list</a>
                                </Link>
                            </Col>)}
                </Row>
            </Container>
        </Layout>
    )
}

export default MyPokemonPage;