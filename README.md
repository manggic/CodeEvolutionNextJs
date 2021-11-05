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
7. The pre-rendered static pages can be pushed to CDN,cached and served to clients across the globe
   almost instantly.
8. Static content is fast and better for SEO as they are immediately indexed by search engines.
9. Static generation with getStaticProps for data fetching and getStaticPaths for dynamic pages
   seems like a really good approach to a wide variety of app in production

- Issue

1. The build time is proportional to the number of pages in the app
   example :
   1. A page takes 100ms to build
   2. E-commerce app with 100 products takes 10 sec to build
   3. E-commerce app with 100,000 products takes > 2.5 hours to build
   4. It's not just the time , there are cost implication as well
   5. The problem only get worse with more product you add to the system as every new page
      increases the overall build time
2. A page once generated, can contain stale data till the time you rebuild the app
   1.E-commerce app is not an application which u can build and deploy once in a while.
   Product details, expecially product prices can vary everyday.

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

1. The path that have not been generated at build time will not result in a 404 page.
   Instead on first request, nextJs will render the page on the server and return the generated HTML
2. When that's done, browser receive the HTML for the generated path.From the user's perspective,
   it will transition from 'browser is requesting the page' to 'full page is loaded', There is no flash of loading/fallback state
3. At the same time, NextJs keeps track of the new list of pre-rendered pages.
   Subsequent request to the same path will serve the generated page,just like other pages pre-rendered at build time

- <b>when? </b>

1. On a UX level sometimes, people prefer the page to be loaded without a loading indicator.
   if the wait time is a few milli seconds. This help avoid the layout shift

2. Some crawlers did not support JavaScript. The loading page would be rendered and then the full page would be loaded which was causing a problem.

### Incremental Static Regeneration

1. There was a need to update only those pages which need a changes without having to rebuild the entite app
2. With ISR, NextJs allow you to update static pages after u have built your app
3. You can statically generate individual pages without needing to rebuild the entire site, effectively solving the issue of dealing with stale(previous data) data

<b>How? </b>

1. In the getStaticProps function, apart from the props key, we can specify a revalidate key
2. The value for revalidate is the number of sec after which a page re-generation can occur

<b>Regeneration </b>

1. A re-generation is initated only if user makes a request after the revalidation time.
2. if a user visits our product details page but there is no other user to hitting that page
   the entire day, the re-generation does not happen
3. Revalidate does not mean the page automatically re-generates every 10 seconds
4. It simple denotes the time after which if a user make a request a re-generation has to be initiated
5. The re-generation can also fail and the previously cached HTML could be served till the subsequent
   re-generation succeed

<b>Problems with Static Generation</b>

1. We cannot fetch data at request time
2. With not being able to fetch data per request, we run into the problem of stale data
3. Let's say we are building a news website
4. The content is very dynamic in the sense that new articles can be published almost every sec
5. getStaticProps will fetch the news at build time which is not suitable at all
6. getStaticProps will help fetch the data on the initial request but it is then cached for subsequent requests
7. Incremental static regeneration can help but if revalidate is 1 sec, we still might not see the most upto date
   news when the regeneartion is happening in the background
8. rather fetch the data on the client side by making a get request from the component, but no SEO

### Server Side Rendering

1. NextJs allows u to pre-render a page not at build time but at request time
2. The HTML is generated for every incoming request
3. SSR is required when u need to fetch data per request and also when u need to fetch personalize
   data keeping in mind SEO

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
11. getServerSideProps will run at request time
12. During development ( yarn dev ), getStaticProps runs on every request

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

### Pre-rendering and Data fetching summary

<b>Static Genration</b>

1. A method of pre-rendering where the HTML pages are generated at the build time
2. Pages can be build once, cached by a CDN and served to client instantly
3. For a normal page use getStaticProps function to fetch the data ahead of time
4. For a dynamic page, you also need the getStaticPaths function
5. fallback : false, true , blocking
6. Pages cannot be updated without a full re-build
7. Incremental static regeneration

<b>Server side rendering</b>

1. fetch data at request time
2. Personalize data based on user info in the incoming request
3. getServerSideProps function helps with SSR data fetching
4. Combining pre-rendering with client-side data fetching
5. Shallow routing - Routing without calling getStaticProps/getServerSideProps
