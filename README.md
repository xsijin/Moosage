# Welcome to Moosage!

A platform where users can share their moods and connect with others through personalized messages (hereby called moosages). Celebrate occasions, send encouragement, write notes and wishes, or simply share your thoughts on a fun, mood-driven space.

Vibe and connect with us!

:heart_eyes: Have fun! :stuck_out_tongue_winking_eye:

## Screenshots

**Homepage (if not logged in)**

<img src="/src/assets/images/homepage.png">

**Homepage/Dashboard (if logged in)**

<img src="/src/assets/images/dashboard.png">

**Board Assistant**

<img src="/src/assets/images/boardassist.png">

**Error Page**

<img src="/src/assets/images/errorpage.png">

## Technologies Used

**Frontend**: JavaScript, CSS, HTML, GitHub, Node.js, React, React Router, Vite, Tailwind CSS/DaisyUI, CryptoJS

**Backend**: Node.js, Express, Mongoose, MongoDB, JSON Web Token, Cors

**Client-Side Storage**: localStorage (for token storage)

## Getting Started

Web link: https://moosages.onrender.com

Repos:

- Frontend: https://github.com/xsijin/Moosage
- Backend: https://github.com/xsijin/Moosage-backend

Planning:

- [Trello Board](https://trello.com/b/BwHaFoYE/moosage)
- [Figma Wireframe](https://www.figma.com/file/PlKvJRUu8xNfe1TZ5DivEP/Untitled?type=design&node-id=0-1&mode=design&t=uvptxleRRYVarL6p-0)

## User Types, Authorization & Backend Protection

> [!IMPORTANT]
> | Authorization | Public | Logged in User | Admin | Backend Protection |
> | ----------------- | --------------| -------------- | -------------- | -------------- |
> | Read Moosages* | ✔ | ✔ | ✔ | |
> | Create Moosages | | ✔ | ✔ | ✔ |
> | Update Moosages | | ✔ (own) | ✔ (all) | ✔ |
> | Delete Moosages | | ✔ (own) | ✔ (all) | ✔ |
> | Read Boards* | ✔ | ✔ | ✔ | |
> | Create Boards | | ✔ | ✔ | ✔ |
> | Update Boards | | ✔ (own) | ✔ (all) | ✔ |
> | Delete Boards | | ✔ (own) | ✔ (all) | ✔ |
> | Read User Profile | ✔ | ✔ | ✔ | |
> | Create User (Sign up) | ✔ | | | |
> | Update User Profile | | ✔ (own) | ✔ (all) | ✔ |
> | Delete User | | ✔ (own) | ✔ (all) | ✔ |

* Moosages and boards have a "private" feature. If set to private, only the board owner, moosage owner, or admin can read them. If a board is private, it cannot be accessed by URL.

Reason for protection: to prevent unauthorized users from meddling with API calls using tools like Postman or other API clients.

## Entity-Relationship-Diagram / DAOs

<img src="/src/assets/images/ERD.png">

## Next Steps

- [ ] Login-ed users can save a recipe to favourites
- [ ] Users can have a checklist of ingredients and add to grocery list
- [ ] Users can search for other users' profile
- [ ] Users can filter through search results (recipe name, tags, ingredients, etc)
- [ ] Users can see other related recipes for each recipe

## Code Sharing

**Mongoose Model: Get recipes**

<img src="/src/assets/images/model.png">

**Controller: Get recipes**

<img src="/src/assets/images/controller.png">

**Favorite React Component**

Our favourite component was the star rating feature which takes in the rating prop from fetched reviews to render as stars.

<img src="/src/assets/images/starcode.png">

Adding this code below now renders stars!

```
<StarRating star={review.rating} />
```

Sample:

<img src="/src/assets/images/starrating.png">

## Key Challenges / Learning / Takeaways

1. Authentication & JWT
2. Check git branch first before doing any work! This will save you headaches down the road trying to change commits to a different branch.
3. Git pull often to reduce the chances of a merge conflict.
4. Try to ensure all pull requests are approved first before making new changes to reduce the chances of a merge conflict.
5. Communicate with team members which file we are working on to reduce the chances of a merge conflict.

## Resources

- [Render](https://render.com/) - Deployment of Frontend & Backend
- [DaisyUI](https://daisyui.com/) - Component library to style website
- [Miro](https://miro.com) - Task and project management platform
- [Figma](https://figma.com) - Wireframe
- [Trello](https://trello.com) - Ideas & User Story creation
- [Postman](https://www.postman.com) - API Client
- [Mob](https://www.mob.co.uk/) - Web inspiration / recipe information to populate data
- [Allrecipes](https://www.allrecipes.com/) - Web inspiration / recipe information to populate data
