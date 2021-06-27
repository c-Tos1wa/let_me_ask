import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './paginas/Home';
import { NewRoom } from './paginas/newRoom'
import { Room } from './paginas/Room'
import { AdminRoom } from './paginas/adminRoom'

import {AuthContextProvider} from './contextos/authContext'

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path = '/' exact={true} component={Home} />
          <Route path = "/rooms/new" component={NewRoom} />
          <Route path = '/rooms/:id' component={Room} />
          <Route path = '/admin/rooms/:id' component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter> 
  ); 
}

export default App;
