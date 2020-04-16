# 路由跳转

```
<Link to="/">Home</Link>
```

# 路由匹配表

```
<Switch>
    <Route path="/about">
        <About />
    </Route>
</Switch>
```

# 路由传参

```
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

<Link to="/about/1">About</Link>

<Route path="/about/:id">
    <About />
</Route>

function About() {
  let { id } = useParams();
  return <h2>{id}</h2>;
}

```

```
import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
```
