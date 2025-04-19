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
  - Graphql is not showing up.
- Change the colors of the background or Add graphics
- Advertising Policy
- Add the Logo to Menu Bar
- Change layout of the page
- Connecting the notifaction: connecting to a CMS system.
- Fix the centering of the menu
- Video Functionality 



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

### Setting Up Locallyup

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

The website numberlessaging.com has been analyzed.  To enhance the site, I suggest improvements in the following areas:

1. **Visual Appeal:** The current design is somewhat basic. Consider using high-quality images and a more visually appealing color palette to make the website more engaging.
2. **Content Organization:**  The blog posts are currently presented in a simple list. Implementing categories or tags would help users find relevant content more easily.
3. **Search Functionality:**  While a search bar is provided, its functionality needs to be verified to ensure it works effectively.  If needed, improve the search algorithm to provide more accurate results.
4. **Call to Action:**  The website lacks clear calls to action.  Consider adding buttons or links that encourage users to engage with the content, such as subscribing to the newsletter or following social media pages.
5. **Responsiveness:** Ensure the website is responsive and works well across all devices (desktops, tablets, and mobile phones).
6. **About Us Section:**  Adding an 'About Us' section will help users learn more about the site and the creators.
7. **Social Media Integration:**  Incorporate social media buttons to allow users to easily share content and follow your pages.
8. **Accessibility:**  Implement accessibility features to ensure the website is usable for people with disabilities.  This includes adding alt text to images and ensuring sufficient color contrast. 
9. **Footer Information:**  The footer currently only includes copyright information.  Adding links to privacy policies, terms of service, and contact information is recommended.

These suggestions aim to enhance the website's user experience, making it more engaging and user-friendly.


Based on the provided blog ideas and focusing on products related to cognitive function, aging, and overall health, along with considering gravity scores as a proxy for sales, here are a few relevant products:

1. **MITOLYN**: This product has the highest gravity score (824.81), suggesting it's a very popular product in the Health & Fitness category. It's a dietary supplement which could be relevant to overall health and brain function.

2.  **ProstaVive**:  With a gravity score of 239.62, this product targets men's health and could be relevant to blog posts focusing on sexual function decline, men's health, and possibly cognitive health aspects associated with aging.

3. **Nagano Tonic**: It has a gravity score of 223.49, and appears to be a weight loss offer, which fits into lifestyle factors related to brain health and aging.

4. **Gluco6**: This product has a gravity score of 192.35 and focuses on blood sugar, which could be relevant to lifestyle and diet related blog posts and how they impact brain health

5.  **Quietum Plus**: It has a gravity score of 151.56,  and while not directly targeting neuroplasticity, it might be worth exploring if it has ingredients that could have an impact on neuroplasticity.

6.  **Liv Pure**: With a gravity score of 131.06,  Liv Pure's description says that it's an explosive offer, and that might be linked to the brain/memory area, which may be relevant to the blog posts.

7.  **The Pineal Guardian**: Has a gravity score of 80.58 and is explicitly a brain health supplement, potentially directly relevant to the neuroplasticity and aging blog ideas. 

8.  **Neuro-Thrive Brain Support**: With a gravity score of 68.31, This product claims to help regain sharper focus and boost the brain function, making it relevant to the neuroplasticity and aging topic.

Other products were reviewed but appear less relevant based on product descriptions and the blog post ideas provided. It's also worth noticing that some of these items have a future rebill.


Based on the extracted page content and the provided blog ideas, here are some items and their affiliate links that might be relevant:

**1. MITOLYN**
  -   [Affiliate Page](https://mitolyn.com/affiliates/)
   -This product could be related to the 'Neuroplasticity and Aging' and 'Pathophysiology of NAD Loss' topics, as it seems to be a dietary supplement and it mention the team who delivers. It has a high gravity score, indicating good sales.

**2. Java Burn**
    -  [Affiliate Page](https://www.google.com/search?q=Java+Burn+affiliate+page)
    - This product could be related to 'Lifestyle Factors and Holistic View' since its about weight loss and diet.

These are just the first two items, and further manual inspection of all extracted content would be required to ensure that every product is perfectly aligned with the blog ideas.


## Local WP 
  - User: Admin1
  - PW: 4j$Q6ScB0A#v(Ce^8MHs33o$

