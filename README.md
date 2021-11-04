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

1.It refer to the process of generating HTML in advance with the neccesary data for a page in our app 2.It can result in better performance and SEO

### Static Generation

1. nextJs by default will pre-render every page in our app.
2. Static Generation is the method of pre-rendering where the HTML pages are generated at the build time with or without external data.
3. Export getStaticProps function for external data
4. HTML,js and JSON file are generated
5. If you navigate directly to the page route, the HTML file is served
6. If you navigate to the page route from a diff route, the page is created client side using the
   js and JSON prefetched from the server

### Server Side Rendering

- getStaticProps

1. It runs only on server-side
2. The function will never run client-side
3. The code you write inside getStaticProps won't even be included in JS bundle that is sent to the browser
4. You can write server side code in getStaticProps
5. Accessing the file system using the fs module or querying a database can be done inside getStaticProps
6. You don't have to worry about including API keys in getStaticProps as that won't make it to the browser
7. getStaticProps is allowed only in page and cannot be run from a regular component file
8. It is used only for pre-rendering and not client side data fetching.
9. getStaticProps should return an object and object should contain a props key which is an object
10. getStaticProps will run at build time.
11. During development ( yarn dev ), getStaticProps runs on every request

```
export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");

  const data = await res.json();

  console.log(data);
  return {
    props: {
      users: data,
    },
  };
}
```

### build the app

1.yarn build - .next folder get created by this command
2.when a page with getStaticProps is pre-rendered at build time, in addition to the page HTML file,
Next.js generates a JSON file holding the result of running getStaticProps
3.The JSON file will be used in client-side routing through next/link or next/router
4.When u navigate a page that's pre-rendered using getStaticProps, Next.js fetches the JSON file (pre-computed at build time )and uses it as the props to create a page component client-side

### fallback

It's take three value

1. false

1) The paths returned from getStaticPaths will be rendered to HTML at build time by
   getStateProps
2) if Fallback is set to false, then any paths not returned by getStaticPaths will result in a 404 page
3) The false value is most suitable if you have an app with a small no of paths to pre-render
   When new pages are not added often
4) A blog site with a few articles is a good example for fallback set to false

2. true

1)  The path that have not been generated at build time will not result in a 404 page.Instead
    Nextjs will serve a fallback version of the page on the first request to such a path
2)  In the background Nextjs will statically generate the requested path HTML and JSON.
    This includes running getStaticProps
3)  When that's done, browser receive the JSON for the generated path.
    This will used to automatically render the page with the required props.
    From the user's perspective the page will be swapped from the fallback pages to the full pages
4)  At the same time, Nextjs keeps track of the new list of pre-rendered pages.Subsequent requests to the same path will
    serve the generated page, just like other pages pre-rendered at build time

- <b>when?</b>

1.  The true value is suitable if your app has a very large number of static pages that depends on the data
2.  A large e-commerce site
3.  You want all the product pages to be pre-rendered but if you have a few thousand products, build can take a
    really long time
4.  You may statically generates a small subset of products that are popular and use fallback : true for the rest.
5.  When someone requests a page that's not generated yet, user will see the page with a loading indicator.
6.  shortly After, getStaticProps finishes and the page will be rendered with the requested data.From then onwards
    everyone who requests the same page will get the statically pre-rendered page.

3) blocking
