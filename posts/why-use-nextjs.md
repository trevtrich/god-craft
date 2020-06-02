---
title: 'Why use Next.js?'
date: '2020-06-01'
---

## Goals
- [Figure out what all the talk is about](#the-hype)
- [Learn a bit about modern "frameworky" SSR](#ssr)
- [Get some practice for a production work environment](#applicability)

## The Hype
I had heard a lot about Next.js and how some of the techniques it uses will be the future direction of web application development. At very least I wanted to dig in a bit and better understand the tools that it offers and why those are useful.

I try to do this for things that have gotten a lot of attention. Weaving this into a daily routine is pretty darn tricky, though. When a technology/library/technique has gotten enough of my attention, I try to think of something that would be beneficial with what I do at work, but also in general just be fun to work on. This blog seemed like a solid way to fill the criteria.

### Directory-based routing
One of the things that a flexible framework like React does not give you is a decision on how to handle routing. One of the first things most people do when build a first `create-react-app` application is pull in `react-router` to handle what component to show when the user enters a given url in the app. Next.js instead comes with a different mindset altogether in it's directory-based routing. This is pretty sweet.

In the app you're looking at right now, I have a directory called `pages`. Placing a file inside that directory with something like:
```js
export default function Component() {
  ...react component implementation
}
```
will produce a route that will render that component as static HTML. This is the most basic use-case (i.e., no external data, no dynamic routing for identifiers, etc.), but still, very neat! The mindset behind this is so straightforward. New people on the project? No problem, point them to the pages directory and they have a pretty descent idea of the landscape. One of my favorite places to point people (and a place I venture back to quite often) that are new to a large, pre-existing react project is where views are stored. I just feel like it gives a nice snapshot of the entrypoints to the application, and is a place to start looking into whatever problem led to them getting into the project. So, big win for new folks to a Next.js project.

Worth noting, I have not worked with Angular, Dojo, Ember, or the like that have this sort of "frameworky" mindset where patterns are laid out, but this was pretty nice to work with. Certainly something I now keep in mind as a work on react projects.

## SSR
When using server-side rendering with a standard React application, you need to take care of quite a few things (though it's honestly not as terrifying as many make it out to be). Data fetching alone has decisions that need to be made. Do I fetch server-side and hydrate the data and page there, or do I ship the html and add in some javascript and kick off the data fetches once the application is loaded into the dom? These, and many more "just work" for you with Next.js. Essentially, the default raw component renders will always be SSR with no additional instructions.

Need some data at build time? Just add in a method at the top level in the same module as the component called `getStaticProps`. This is an async function that you can use to return the data that, once resolved, will be given to the component in that same page and rendered statically to html. The page that then gets shipped to the browser has the component with data you gave it. Very quick page loads 👍.

Need to instead fetch then SSR each and every time the route is called? Yet another top-level method like the previous: `getServerSideProps`. Yup, SSR & static builds really can be that simple.

## Applicability
The final piece I wanted to mention was why I chose Next.js over Gatsby. Gatsby is purpose-built for something like what I'm working with, so why not use it? Honestly, it came down to feeling like Next.js was going to be more likely applicable to the type of jobs I will have in the coming years. Gatsby seems focussed more on CMS-style applications, whereas Next.js seemed more built to give you the tools to build a fully-baked web application. So, even though Gatsby would take less work to build what I have built here (e.g., building pages from markdown are supported out of the box), I see web-application style pages being more likely used in my coming years in the workplace.

## Thoughts
All in all, I'm really impressed with how easy it is to get a site spun up with the framework and am looking forward to digging in a bit more with testing to see if there are any skeletons hiding in the closet as far as modern application development practices go.
