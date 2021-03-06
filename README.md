# Seed Engine

### Welcome
Seed Engine is a lightweight 2D game engine using WebGL2. The engine is designed on the focus of creating a bridge between creating and publishing games to the Seed Network as modules.

### Installation
The easiest way to get started with Seed Engine is by using NPM:
```
npm i seed-engine --save
```

Now you can reference the Engine like so:
```
import {Engine} from 'seed-engine';
```

Each file is its own class, similar to react. Multiple imports may look something like:
```
import {Engine, SceneObject, Transform, Renderable2D} from 'seed-engine';
```

### Documentation
You can view the docs [here](https://jaegarsarauer.github.io/SeedGameEngine/index.html).


### Testing
You can run tests using the npm command:
```
npm run test
```

Testing documentation can be found [here](https://jaegarsarauer.github.io/SeedGameEngine/test.html).


### Notes
 - The engine updates all systems on a parent first, children after pattern.
    - However, GameObjects have two functions added to their Updateable _update() for calling pre and post updates. These updates happen before and after a regular update on the parent.