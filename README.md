## 1. what is NextJs

1. React Framework for Production Ready app
2. A package that uses React for building UI
3. Loaded with a lot more feature that enables u to build full fledged production ready app,
   Feature like routing, styling, authentication, bundle optimization etc.
4. there is no need to install additional package.NextJs Provides everthing for u.

## 2. Why NextJs

1. File based routing
2. Pre-rendering
3. API route - create API with NextJs.
4. Support for css modules
5. Authentication
6. Dev and Prod build system

## 3. To start App

```
 npm run dev
     OR
  yarn dev
```

## 4. Pages Folder

when we start our app, <b>\_app.js </b> get executed and based on the url specific component get renders

1. index.js file is getting served as we visit the default url ex: localhost:3000.

## 5. Routing

1. File System based routing mechanism
2. When a file is added to the pages folder in a proj, it automatically becomes available as a route.
3. By mixing and matching file names with a nested folder structure, it is possible to pretty much
   define the common routing patterns.

### dynamic Routing

```
[productId].js
```

### catch All Routing

```
[[...params]].js
```

```
import { useRouter } from "next/router";

function Doc() {
  const router = useRouter();
  const { params = [] } = router.query;

  console.log("params", params);

  return <h1>Docs </h1>;
}

```

## 6. Link

```
import Link from "next/link";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="./blog">
        <a>Blog Page</a>
      </Link>
    </div>
  );
}
```

## 7. Pre-Rendering

1.
