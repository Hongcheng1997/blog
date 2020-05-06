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
