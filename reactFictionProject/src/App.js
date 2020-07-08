import React from 'react';
import { Route, Switch } from 'react-router-dom'
import More from "./components/more/more"
import Detail from "./components/detail/Detail"
import Category from "./components/category/Category"
import Search from "./components/search/Search"
import Catalog from "./components/catalog/Catalog"
import Reader from "./components/reader/reader"
import Index from "./views/index/Index";
import "./App.scss"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'redTab',
      fullScreen: true,
    };
  }
  render() {
    return (
      <div>
        <Switch>
         <Route path="/catalog" component={Catalog}></Route>
         <Route path="/reader/:id" component={Reader}></Route>
         <Route path="/search" component={Search}></Route>
          <Route path="/more/:id" component={More}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
          <Route path="/category/:type" component={Category}></Route>
          <Route path="/" component={Index}></Route> 
        </Switch>
      </div>

    );
  }
}
export default App;
