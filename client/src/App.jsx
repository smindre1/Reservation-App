import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import {setContext } from '@apollo/client/link/context';
import Header from './components/Header.jsx';

const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink1 = setContext((_,{headers}) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
})

const client = new ApolloClient({
  link: authLink1.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;