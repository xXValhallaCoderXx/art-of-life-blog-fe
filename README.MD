Add secrets to `now` enviroment


### Routing

#### Link

Using the `Link` component we can do client side routing

```
<Link href="/about">
    <a>About Page</a>
</Link>
```

- Action takes place in the browser
- Without making a request to the server

##### Passing Props

- Pass props via the link component

```
<Link href="/about" title="about">
    <a>About Page</a>
</Link>
```

#### Dynamic Routes

```
  <div>
      <h1>My Blog</h1>
      <ul>
        <PostLink id="hello-nextjs" />
        <PostLink id="learn-nextjs" />
        <PostLink id="deploy-nextjs" />
      </ul>
  </div>


  const PostLink = props => (
  <li>
    <Link href="/p/[id]" as={`/p/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);
```