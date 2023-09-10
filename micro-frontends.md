We can say an app is made out of micro-front ends when it is composed of multiple apps, each isolated from the others, and each responsible for a specific part of the app. Ideally, each micro-frontend is developed by a different team, and can be deployed independently, though they might need to communicate with each other through messages or a shared state.

In spite of this isolation, an application owner still orchestrates his/her app, and decides which micro-frontends to use, and how to compose them.

There are a couple of features we'd like this system to have:

- dynamic: swap a micro-frontend for a different implementation, or turn it off completely
- orchestration: the app owner decides which micro-frontends to use, and how to compose them
- communication: micro-frontends can communicate with each other through messages or a shared state. We might be able to achieve this with react-context.
- consistent look and feel (fonts, colors, etc)

Bonus features:

- Caching: cache the composed orchestration on a CDN, and load it from there. This will keep the loading time and time-too-interaction low.
- Server-side rendering

Possible technologies:

- Webpack's **Module Federation**. This is a webpack plugin that allows us to load modules dynamically from a remote server. This is a great solution, but it's still in beta, and requires a lot of configuration. It also locks us into Webpack, a Javascript based bundler which is extremely popular and powerful, but also very slow and complicated, reaching the end of its life cycle with newer bundlers like esbuild and turbopack slowly taking its place.
- **Web Components**. This is a web standard that allows us to create isolated HTML sections. It is somewhat widely supported, and is polyfill-able for older browsers.
- Dynamic imports - this is a ESM feature that allows us to load a module dynamically. It's supported by all major browsers, and could be polyfilled by webpack.
- Iframes. A native HTML way to embed sub-pages into a website. They have the advantage of being fully supported, and they create good isolation between the different parts of the app. They also have a slew of disadvantages, like performance, communication, and shared code problems, and are generally a never ending source of pain. Obviously, we could still allow iframes for specific use cases, like embedding a third-party apps or for security reasons, but it should be a feature, not the core of the system.
- React Portals. This is a React feature that allows us to render a component in a different place in the DOM. It requires knowing the target DOM node, which is not always possible.
- React features that will facilitate dynamic-ness - context, lazy, suspense, error boundaries.

## Micro frontends
In a micro front end architecture, several small applets are composed together to create a larger app.
- Each applet is self contained, with its own development and deployment process.
- Applets are loaded dynamically, so they can be patched or disabled without having the change the main app.

Aligning with Duda's audience, we'll focus on a "no-code" solution, where the app owner can compose the app using a visual editor, and the applets are created by more technical developers.

## Approaches

### iframes:

We can compose the entire app with iframes, which will be simple to implement. Just load a layout, populate it with iframes, which can be hosted on different servers, and have their own development and build process.

- Performance: bad, as each iframe will be loaded separately, and will have its own network requests.
- Communication and shared state: difficult, as each iframe is isolated from the others. We'd have to use post-message, or server requests.
- Shared code: duplication, as each iframe is a separate app. We might be able to optimize it with browser-level caching.

Also, we'd suffer from a slew of other problems, like:

- Cross site scripting (XSS) blockages, including cookies, local storage, etc.
- Race conditions between iframes.
- Duplicate code and assets taking up browser resources.

### Single app, dynamic imports:

We can create a single app, and load the micro-frontends dynamically using the `await import()` syntax, or similar technology like module federation. The entire app will use the same framework (React), and it should be simple to implement, though creating separate development and deployment for each micro-frontend will more difficult.

- Performance: ok but not ideal, as each micro-frontend will be loaded separately using a lot of network requests.
- Communication and shared state: simple, as all the micro-frontends load into the same app.
- Shared code: simple to implement, as all the micro-frontends are part of the same app.

### Static build

We can create a static build per composition. This will be more complicated to implement, though after initial development, it should be simple to maintain.  
The idea here is that we can generate a javascript file per composition, and then feed it to a bundler to produce a static build. Once we have the static build, we can serve it statically through a CDN. Again, the entire app will use the same framework (React).

- Performance: great, as the entire app is cached and loaded in a single request.
- Communication and shared state: simple, as all the micro-frontends load into the same app.
- Shared code: simple to implement, as all the micro-frontends are part of the same app.

## Design

We'll go with the dynamic app approach, as it is simplest to implement, but still provides good performance and communication. We can also add a static build later on, if we need to.

The dynamic app will bootstrap from a blueprint file, which will contain the layout of the app, plugins information, and configuration. The bootstrap process will deduce what plugins (micro front ends) to load, load and configure them, and render them to the screen.

This blueprint file is essential, as we want to be able to change what's in the app without having to change the code of the app or the plugins. My initial approach would be a concrete composition using Javascript in a framework like React, allowing a full range of capabilities, but this would limit the app to developers, whereas Duda's goal is to provide a more WYSIWYG "no-code" solution. Therefore we can use a JSON file, which will be easier to create and edit programmatically and also manually, moving the advanced features to more isolated plugins.

For example, our task app will look like this:

```json
[
  { "plugin": "header", "children": "My Store" },
  {
    "plugin": "layout",
    "config": { "ratio": [80, 20] },
    "children": [
      {
        "plugin": "gallery",
        "slots": {
          "badges": [{ "plugin": "cart", "element": "badge" }]
        },
        "config": { "header": [{ "plugin": "cart", "element": "badge" }] }
      },
      { "plugin": "cart" }
    ]
  }
]
```

In pseudo code, the app will look something like this:

```jsx
// orchestrator.js
const blueprint = loadSite(endpoint, appKey);

const pluginsList = colletPlugins(blueprint);
const plugins = siteModel.plugins.map(pluginName => {
  const plugin = await loadPlugin(pluginName);
  return plugin;
});

function Orchestrator() {
  const jsx = buildJsx(blueprint, plugins);

  reactDom.render(jsx, document.getElementById("root"));
}
```

## Simplifications:

- Assume a single page. Adding more pages should be as simple as making a blueprint per page, but will be a little bit more complicated, requiring virtual router and custom link components, "sticky" plugins, etc.
- Assume a single framework - React. We can and should isolate each plugin to its own render context, probably Web Components, allowing us to use new technologies and frameworks in the future, but for now we'll use a single render using React.
- Communicate between plugins using react context. This greatly simplifies state and updates between plugins, though we should set up a more robust cross-framework solution in the future, like a message bus.
- Assume a single version per micro front end. We could support multiple versions, as well as singletons later on. 

All these simplifications can be expanded later on, if needed, in a bigger more complete solution, after having a working prototype that we can get feedback on.
