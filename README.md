![Netlify Next.js Blog Template -> Numberless Aging](https://user-images.githubusercontent.com/43764894/223762618-62742b4e-9424-44a7-8e85-9f7e4e19db54.png)


A customizable blog starter using:

- [Next.js](https://github.com/vercel/next.js) v15 (Pages Router)
- [Tailwind](https://tailwindcss.com/) v3.x
- [Netlify Visual Editor](https://docs.netlify.com/visual-editor/overview/)
- Built-in [MDX](https://mdxjs.com/) support
- Includes modern design with dark & light themes

## Todo
<!-- - Stretch the menu bar to wide screen -->
- Implement the Wordpress and Graphql
- Change the colors of the background or Add graphics
- Advertising Policy
- Add the Logo to Menu Bar
- Change layout of the page



## Table of Contents:

- [Getting Started](#getting-started)
  - [Setting Up Locally](#setting-up-locally)
  - [Using the Wizard](#using-the-setup-wizard)
- [Configuring the Blog](#configuring-the-blog)
- [Adding New Posts](#adding-new-posts)
- [Netlify Visual Editor](#netlify-visual-editor)
- [Testing](#testing)
  - [Included Default Testing](#included-default-testing)
  - [Removing Renovate](#removing-renovate)

## Getting Started

---

You can get started with this project in two ways: locally or using the [setup wizard](https://nextjs-wizard.netlify.app/).

### Setting Up Locally

If you're doing it locally, start with clicking the [use this template](https://github.com/netlify-templates/nextjs-blog-theme/generate) button on GitHub. This will create a new repository with this template's files on your GitHub account. Once that is done, clone your new repository and navigate to it in your terminal.

From there, you can install the project's dependencies by running:

```shell
yarn install
```

Finally, you can run your project locally with:

```shell
yarn run dev
```


## Configuring the blog

The config is based on environment variables to make it easy to integrate with any Jamstack platform, like Netlify.

Here are the variables you can edit:
| Variable | Description | Options
| --- | --- | --- |
| `BLOG_NAME` | the name of your blog, displayed below the avatar ||
| `BLOG_TITLE` | the main header (`h1`) on the home page ||
| `BLOG_FOOTER_TEXT`| the text in the footer ||
| `BLOG_THEME` | the theme to pass to Tailwind | default |
| `BLOG_FONT_HEADINGS` | the font-family for all HTML headings, from `h1` to `h6`| sans-serif (default), serif, monospace|
| `BLOG_FONT_PARAGRAPHS` | the font-family for all other HTML elements | sans-serif (default), serif, monospace|

All of the env variables can be configured through the [Wizard](https://nextjs-wizard.netlify.app/) or through setting the project's environment variables. You can do this in your Netlify dashaboard (Site settings/Build & deploy/Environment/Environment variables).

https://user-images.githubusercontent.com/3611928/153997545-6dcdeef0-e570-49e7-93d6-ce0d393d16c9.mp4

[alt: video walkthrough of editing env vars]

If setting an environment variable isn't your cup of tea, the defaults can be changed in [`utils/global-data.js`](/utils/global-data.js). You can also remove the variables and hard code blog information where these variables are used in the code base.

- `BLOG_THEME, BLOG_FONT_HEADINGS, & BLOG_FONT_PARAGRAPHS` are used in [`tailwind-preset.js`](tailwind-preset.js)
- `BLOG_NAME, BLOG_TITLE, BLOG_FOOTER_TEXT` are used in [`pages/index.js`](pages/index.js) & [`pages/posts/[slug].js`](pages/posts/[slug].js) through the `globalData` object.

## Adding new posts

All posts are stored in `/posts` directory. To make a new post, create a new file with the [`.mdx` extension](https://mdxjs.com/).

Since the posts are written in `MDX` format you can pass props and components. That means you can use [React components](https://reactjs.org/docs/components-and-props.html) inside your posts to make them more interactive. Learn more about how to do so in the [MDX docs on content](https://mdxjs.com/docs/using-mdx/#components).

https://user-images.githubusercontent.com/3611928/152727802-102ec296-41c8-446d-93ed-922d11187073.mp4

[alt: video walkthrough of adding a new blog post]

## Netlify Visual Editor

This template is configured to work with [visual editing](https://docs.netlify.com/visual-editor/overview/) and [Git Content Source](https://docs.netlify.com/create/content-sources/git/).

### Develop with Netlify Visual Editor Locally

The typical development process is to begin by working locally. Clone this repository, then run `npm install` in its root directory.

Run the Next.js development server:

```txt
cd nextjs-blog-theme
npm run dev
```

Install the [Netlify Visual Editor CLI](https://www.npmjs.com/package/@stackbit/cli). Then open a new terminal window in the same project directory and run the Netlify visual editor dev server:

```txt
npm install -g @stackbit/cli
stackbit dev
```

This outputs your own Netlify visual editor URL. Open this, register, or sign in, and you will be directed to Netlify's visual editor for your new project.

![Next.js Dev + Visual Editor Dev](https://assets.stackbit.com/docs/next-dev-stackbit-dev.png)

### Next Steps

Here are a few suggestions on what to do next if you're new to Netlify Visual Editor:

- Learn [Netlify visual editor overview](https://docs.netlify.com/visual-editor/visual-editing/)
- Check [Netlify visual editor reference documentation](https://visual-editor-reference.netlify.com/)

## Testing

### Included Default Testing

We’ve included some tooling that helps us maintain these templates. This template currently uses:

- [Renovate](https://www.mend.io/free-developer-tools/renovate/) - to regularly update our dependencies

If your team is not interested in this tooling, you can remove them with ease!

### Removing Renovate

In order to keep our project up-to-date with dependencies we use a tool called [Renovate](https://github.com/marketplace/renovate). If you’re not interested in this tooling, delete the `renovate.json` file and commit that onto your main branch.

## Support
Numberlessaging@gmail.com

## White Paper January 10, 2025
Title Page
Numberless Aging: Bridging Generations with Technology Subtitle: Wisdom Comes from the Ages Date: January 10, 2025
Abstract
Numberless Aging is an innovative app designed to transform the way we perceive and experience aging. By integrating advanced technology with user-friendly features, Numberless Aging aims to improve the quality of life for individuals across all age groups.
Introduction
Aging is an inevitable part of life, but how we approach it can make a significant difference. Traditional methods of aging management often fall short of addressing the diverse needs of modern society. This white paper explores the challenges associated with aging and introduces Numberless Aging, a groundbreaking app that offers a holistic solution.
Problem Statement
When you bridge the gap between wisdom and applied knowledge, it ensures a civilization's survival. Elders possess invaluable wisdom and experiences that can guide younger generations. However, without a platform to share this personal wisdom, much of it remains untapped. There is a need for a comprehensive, easy-to-use platform that connects generations and fosters the exchange of knowledge.
Solution
Numberless Aging is designed to bridge this gap. The app leverages cutting-edge technology to provide personalized aging plans, health monitoring, social engagement opportunities, and more. With an intuitive interface and customizable features, Numberless Aging empowers users to take control of their aging journey and facilitates the sharing of wisdom across generations.
Technologies
Numberless Aging incorporates several advanced technologies:
•	Blog Sharing: Users can share content, experiences, and wisdom through blog posts.
•	AI Assistance: AI categorizes the content, making it easier to find and engage with relevant topics.
•	Rating and Scaling: Content is rated and scaled on the page, helping users identify popular and valuable posts.
•	Personal Conversation Groups: Elders with popular content gain access to tools that allow them to schedule personal conversation groups, fostering deeper connections and discussions.
Benefits
•	Personalized aging plans tailored to individual needs
•	Real-time health monitoring and alerts
•	Enhanced social connectivity and engagement
•	Platform for elders to share their personal wisdom
•	Access to educational resources and expert advice
•	Improved overall quality of life
Use Cases Hypotheiscals
1.	John's Story: John, a 65-year-old retiree, uses Numberless Aging to stay connected with his community and manage his health through personalized exercise and nutrition plans.
2.	Mary's Journey: Mary, a 50-year-old professional, relies on Numberless Aging to balance her work and personal life, while also preparing for her future with proactive aging strategies.
Conclusion
Numberless Aging is more than just an app; it’s a revolution in aging management. By offering a comprehensive, user-friendly platform, it empowers individuals to embrace aging with confidence and grace, while also enabling the exchange of invaluable wisdom between generations. Join us in redefining age with technology.
References
[List any sources or references here]


