---
title: 'Tuning into my preferences in a hapi.js server'
date: '2020-07-21'
tags: 'hands-dirty'
---

I've used [hapi.js](https://hapi.dev) at work as well as for personal projects,
but I've always either consumed it from someone elses design or stood it up
from a template, again from someone elses design. I wanted to force myself to
dig in and better understand the design of Hapi itself. I find that this can be
beneficial for a lot of reasons, but the big one for me is high-level
question-answering. "Why would I choose Hapi over another server?". Until I get
my hands dirty with it, it's sorta hard to not just take someone else's
opinion and run with it.

I'm going to use it as the application server for my
[minimal-javascript](https://github.com/trevtrich/minimal-javascript) project
to kick the tires a bit here. So I guess that's worth pointing out. I'm using
it as an application server, not just a data server. So this may be different
investigation style than you otherwise might see. I won't
currently be hooking up to a DB, etc.

## Getting Started
So.. not a good first experience. I have a pretty hard time navigating the docs. First example I ran across -- I want to generate an html response for a `hello-world` route. In the docs I found that each route can be given a `handler` that takes the following shape (by looking at an example):
```js
function (request, h) {}
```
The docs links to a `route.options.handler` that is mentioned as another way to
add the handler, which was confusing to start as well. Neither the primary
`route.handler` docs or the `route.options.handler` method actually say what
the shape means or what the expected payloads are, so that took a little
digging. Instead, and by chance, I came across the description of lifecycle
methods, which describes that each of the lifecycle methods take this same
shape (i.e., request, and h args) where it then says what each of these args
mean. Once I had the route setup, I attempted to create a custom response and
set the content-type and again ran into issues understanding the docs and how
to create this custom response. Do I create a response and modify that, or can
I use method chainging and return that? Anyway, enough complaining. In reality
I really like Hapi and the community around it, but these things are still
worth mentioning. Long story short, I had a rough first go at navigating the
docs.

## Live Server and First Route
```js
import Hapi from '@hapi/hapi';

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.response('<html><body>Hello world!</body></html>')
        .header('Content-Type', 'text/html')
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
```
I used port 8080 because I deploy this with app-engine and 8080 is the default
exposed port. I'm not sure I fully understand host at this point. The docs say
it is the public hostname or ip address, but also say `localhost` is the safest
option unless running in Docker where networking to the host could be
problematic. So I'm rolling with that until I run into issues when I deploy.

## Serving up an html file instead of a string
The first thing I tried was to read an html file off disk and just return the
contents. When I reloaded the page I got a 500 response. Usually when I get
this, I can hop over to the running server logs and know immediately what is
likely wrong. In this case, there were zero logs output from the server. The
rabbit whole goes further. Time to dig into why I'm not seeing any logs.
