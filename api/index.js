import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
    uri: 'https://graphql-pokeapi.vercel.app/api/graphql/',
    cache: new InMemoryCache()
});

export const GET_POKEMONS_QUERY =
    gql`
        query pokemons($limit: Int, $offset: Int) {
            pokemons(limit: $limit, offset: $offset) {
            count
            next
            previous
            status
            message
            results {
                url
                name
                image
            }
            }
        } 
    `;

export const GET_POKEMON_DETAILS_QUERY = gql`
    query pokemon($name: String!) {
        pokemon(name: $name) {
        id
        name
        sprites {
            front_default
        }
        moves {
            move {
            name
            }
        }
        types {
            type {
            name
            }
        }
        stats {
            base_stat
            stat {
                name
                url
            }
        }
        }
    }
    `