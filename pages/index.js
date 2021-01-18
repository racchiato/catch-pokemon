import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { client, GET_POKEMONS_QUERY } from '../api';

const Layout = dynamic(() => import('../components/Layout'));
const PokemonCard = dynamic(() => import('../components/PokemonCard'));

const HomePage = () => {
  const [pokemons, setPokemons] = useState([])
  const [count, setCount] = useState(9999);
  const [limit, setLimit] = useState(24);
  const [offset, setOffset] = useState(0);
  const getPokemons = async () => {
    const { data } = await client.query({
      query: GET_POKEMONS_QUERY,
      variables: {
        limit,
        offset
      }
    })
    if (data) {
      setCount(data.pokemons.count);
      setPokemons([...pokemons, ...data.pokemons.results])
    }
  }

  const loadMore = (e) => {
    e.preventDefault();
    if (offset + limit <= count) {
      setOffset(offset + limit);
    }
  }

  useEffect(() => {
    getPokemons();
  }, [offset]);

  return (
    <Layout>
      <Container style={{ paddingTop: '3vh' }}>
        <Row>
          {pokemons && pokemons.map(pokemon => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
          ))}
        </Row>
        <Row className="px-5 my-4 justify-content-center">
          {offset + limit <= count && <Button variant="primary" className="py-3 text-center w-100 font-weight-bold" onClick={loadMore}>LOAD MORE</Button>}
        </Row>
      </Container>
    </Layout>
  )
}

export default HomePage;
