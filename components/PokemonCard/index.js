import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Link from 'next/link';

const PokemonCardComponent = ({ pokemon }) => {
    const [owned, setOwned] = useState(0);
    const pokemonFilter = (myPokemon) => {
        return myPokemon.name == pokemon.name
    }
    useEffect(() => {
        if (localStorage !== undefined) {
            if (JSON.parse(localStorage.getItem('myPokemon'))) {
                setOwned(JSON.parse(
                    localStorage.getItem('myPokemon'))
                    .filter(pokemonFilter).length)
            }
        }
    })
    return (
        <Col md={3} className="px-4 my-2 pokemon-card">
            <Link href="pokemon/[name]" as={`pokemon/${pokemon.name}`}>
                <Row className="py-3">
                    <Col xs={4} className="my-auto">
                        <img src={pokemon.image} className="img-fluid" />
                    </Col>
                    <Col className="my-auto">
                        <p className="mb-0 font-weight-bold">{pokemon.name.toUpperCase()}</p>
                        <p style={{ fontSize: '0.9rem' }}>Owned: {owned}</p>
                    </Col>
                </Row>
            </Link>
        </Col>
    )
}

export default PokemonCardComponent;