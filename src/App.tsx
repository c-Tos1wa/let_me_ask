import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './paginas/Home';
import { NewRoom } from './paginas/newRoom'

import {AuthContextProvider} from './contextos/authContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path = '/' exact={true} component={Home} />
        <Route path = "/rooms/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter> 
  ); 
}

export default App;
