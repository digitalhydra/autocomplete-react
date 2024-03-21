Part 2

Please answer the following questions to the best of your knowledge, in clear English. Elaborate
and demonstrate the React knowledge you have. Feel free to give examples and use cases.

DO NOT USE ANY WEB OR OTHER RESOURCE.

**1. What is the difference between Component and PureComponent?**
Give an example where it might break my app

> A pure component will evaluate if it needs to re-render based on changes on it props,
> and this could be detrimental to the app behavior because the component does a shallow validation
> on the props, so you got to be mindful of it, if the props are primitives like strings,
> you probably won't have an issue but if you are passing object or functions you will run into issues.

**2. Context + ShouldComponentUpdate might be dangerous. Why is that?**

> I think is because the apis are not compatible, not sure but I think a change in the context data would probably still trigger
> the re-rendering of a child component so if the context provider is way up the component tree it would cause a big dom update.

**3. Describe 3 ways to pass information from a component to its PARENT.**

> I can't think of 3 ways without using third party libraries, I've only see 2 ways of creating that kind of behavior,
> one would be passing a function to the child component a callback pretty much,
> that changes the data in the parent component itself, and the other one is using the context api,
> but basically is the same effect where you trigger an update event from the child through the context and this change will set the data in the
> parent if the parent consumes the context data as well.

**4. Give 2 ways to prevent components from re-rendering.**

> I guess going to the first question shouldComponentUpdate could be a way, just been mindful of the data we are using to validate the re-rendering,
> and another way could be using a more known pattern like useMemo to cache values or useCallback to cache functions, useRef kinda works in a sense as well
> since you can persist a value through renders

**5. What is a fragment and why do we need it? Give an example where it might break my app.**

> Fragments are a way to group child components/elements you want to return from a component, is useful when you don't want to return a different element
> as it basis like a div or other wrapper tag, But I can't think of a behavior that might break an app using fragments, you maybe have to be mindful
> of the layout the child components will be render but that's as far as I can think of.

**6. Give 3 examples of the HOC pattern.**

> I think one would be something like a Layout component that you will use to wrap other components like Header, Main and Footer, where you maybe want to share data or behaviors
> between them, another would be something like a context provider with similar behavior sharing a way to change the application state across child components.
> I guess a good example would be like a form validation component where you want to share the validation behavior across forms in your application.

**7. What's the difference in handling exceptions in promises, callbacks and async…await?**

> I believe in promises you have the catch method to handle error, in callbacks you can use the try-catch method and for the async-await pattern
> you have to validate the final response for errors, so the variable where the await result would be stored.

**8. How many arguments does setState take and why is it async.**

> I think is only one but since you can pass a function as a callback too, this will be added to the stack for the next render when the callback function returns the new state

**9. List the steps needed to migrate a Class to Function Component.**

> I don't remember, I will look into it.

**10. List a few ways styles can be used with components.**

> I've user 3 different ways I can think of, one would be adding a global css style and then use the classes in the components, if you use something like tailwindcss
> you could get away with this kind of pattern otherwise is a horrible option if you are not very good at specificity.
> Another way could be something like CSSinJS in which you define style in the component itself as a string, but causes really bad performance.
> And last one would be importing a css file to the react component with only the needed css for that component.

**11. How to render an HTML string coming from the server.**

> You can use the dangerouslySetInnerHtml in an interpolation, but as the name suggest you have to trust the string you are rendering, or the app would be subject to xss attacks
