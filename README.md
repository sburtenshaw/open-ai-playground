# Initial setup

- `npm install` - Install packages
- `npx prisma db push` - Create a new local database
- `npm run dev` - Start the development server
- Navigate to `localhost:3000`

# Journal

## Initial setup - 10th July 17:23

Bootstrapped the project with `create-t3-app`.

While I don't plan on using them all initially, I enabled all the package options for convinience, incase I want to use them further down the line. The packages in question are `nextAuth.js` and `prisma`. I don't plan on integrating user authentication or implementing any features that require database storage initially. However I do have feature ideas that would require use of these concepts but are out of scope for this first version, such as:

- Chat history
- Saved presets
- Real time collaboration

I will be making use of a simple backend with tRPC early on to communicate with OpenAI's API. I'm doing this to avoid exposing my OpenAI API key in the client.

I was torn between commenting out / removing the `nextAuth` and `prisma` configurations given they are not currently being used. I decided to keep them configured to make things easier when I want to use them and to save time now. I believe the additional unnecessary footprint is not a big issue given they will likely be used in the future anyway.

Next I will be working on what I call the "Base concept". Basically a simplified version of OpenAI's Playground feature, without any advanced features or custom ideas implemented. This will be the basis to add more custom functionality to.

## Base concept finished - 13th July 12:19

Completing the base concept took longer than expected. Due to my inexperience with this tech stack, my learning curve during the start of the project was higher than usual and it took me a little while to get up and running properly. At this point, I made a decision to focus more time on the project and produce something of a higher quality, instead of just rushing to see what I can do in a short amount of time. I'm happy I made this decision because I now have a great foundation to build more on top of.

The main important feature that is missing from the project at this stage is unit / component tests. Given the project was already taking much longer than planned, I decided not to focus on testing. In a production project I would not be making the same decision.

Next I will focus on adding custom features to the project, some ideas are:

- Pre-defined system messages / personas
- Auto re-submit option if max tokens reached
- Instructions, tooltips and contextual help
- Customizable options (dark mode, font size, module placement)

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials
