## Cosmic Joke Chronicles - Project Documentation

### 1. Project Overview

**Cosmic Joke Chronicles** is an IT110 final-project web app where users can:

- Register, log in, and manage their profile  
- Create, edit, and delete their own jokes  
- Import jokes from the public API `https://v2.jokeapi.dev`  
- Browse jokes by category, source, and ownership  
- Experience a 3D, scroll‑driven presentation of jokes using a laughing emoji "galaxy"

The stack is:

- **Backend**: Laravel 10 (PHP 8.1+)  
- **Frontend**: React 18 + Inertia.js + Tailwind CSS + Framer Motion  
- **Database**: MySQL  
- **Authentication**: Laravel Breeze  

Backend behaviour and routes are summarized in `PROJECT_SUMMARY.md` and `README.txt`.  
This document focuses mainly on the **frontend experience** and the **3D joke journey page**.

---

### 2. Main Pages and Navigation

#### 2.1 Welcome Page (`/`)

- Story‑driven landing page that explains the concept of the app.  
- Includes:
  - Project badge (IT110 Final Project · Laravel + React + Inertia.js)  
  - Short description of what the app does  
  - Three “chapter cards” that describe the experience (Discover the Feed, Write Your Own, Curate Your Galaxy)  
  - An **interactive About section** with tabs:
    - About the app  
    - User journey  
    - Tech & features  
- Primary CTAs:
  - **Begin Your Joke Journey** → registration  
  - **Log in** link for returning users  

#### 2.2 Authentication Pages

- `Login.jsx` and `Register.jsx` are standard Breeze‑based forms rendered through Inertia.  
- Authentication protects all joke and dashboard routes.

#### 2.3 Dashboard (`/dashboard`)

- Short explanation of how to present the app.  
- Quick links to:
  - View all jokes  
  - View only the current user’s jokes  
  - Profile & account settings  

---

### 3. Jokes Index Page (`/jokes`) – Core Experience

The **Joke Journey** page is where most interactions happen and where the 3D effect is implemented.

#### 3.1 Filters and Controls

At the top of the page:

- **Story filters**
  - **My jokes only** – toggles between:
    - Showing all jokes (default)
    - Focusing only on the current user’s jokes  
  - **API only** – shows only jokes imported from the public API  
  - **My originals** – equivalent to “source = user” filter  
- **Category filter**
  - Chips for **All**, **DARK**, **programming**, etc.  
  - Clicking a chip re‑loads the list via Inertia with the selected category.
- **Write a New Joke** button
  - Navigates to the create joke form (`/jokes/create`).

These controls call the `applyFilter` helper in `Pages/Jokes/Index.jsx`, which uses `router.get` to re‑request the same route with updated query parameters while preserving state.

#### 3.2 “Your curated joke chapters” block

- Displays a paginated list of jokes with:
  - Title, category, and whether it is API‑imported or an original entry  
  - Small like button  
  - View and Edit links  
- This block is **hidden automatically** when the user is in **"My jokes only"** or **"My originals"** mode so that the focus shifts to the 3D presentation instead of duplicating content.

---

### 4. 3D Joke Presentation (“Third Thing”)

The lower half of the `/jokes` page is a **full‑screen, scroll‑driven 3D view** of jokes.

#### 4.1 Components

- `resources/js/Components/JokeGalaxyCanvas.jsx`
  - Uses **Three.js** to render a single rotating plane with a **laughing emoji texture (😂)** and a star field behind it.  
  - The renderer is created with `alpha: true` and `setClearColor(0, 0)` so the background is **fully transparent**, allowing the emoji to float over the existing page gradient.  
  - Pointer movement is listened to at the window level:
    - When the pointer is inside the canvas bounds, the emoji smoothly rotates toward the pointer, giving a 3D feel.

- `resources/js/Components/JokePage.jsx`
  - Represents **one full‑screen joke “slide”**.  
  - Uses `useScroll` + `useTransform` from **Framer Motion** to move the emoji diagonally while scrolling:
    - For even indexes: from top‑left to bottom‑right  
    - For odd indexes: from top‑right to bottom‑left (controlled by the `reverse` prop).  
  - Also renders the joke text in the foreground:
    - For **API jokes**: uses `joke.joke` and labels type from the API.  
    - For **user jokes**: uses `joke.content` (or `joke.title` as a fallback) and labels them as “Original”.
  - The foreground text container is transparent (no border or background) with a subtle drop shadow to keep the text readable over the emoji.

#### 4.2 Data Source Selection

Logic in `Pages/Jokes/Index.jsx` decides which jokes to show in the 3D view:

- If **My jokes only** or **My originals** is active:
  - `fullScreenJokes = jokes.data` (the user’s own jokes).  
  - Heading text changes to **“My jokes in 3D view”**.  
  - Subheading explains that each screen focuses on one of the user’s jokes.
- Otherwise:
  - `fullScreenJokes = apiJokes` (jokes fetched from JokeAPI.dev).  
  - Heading text is **“Live stream from the Joke API”**.

In both cases, the jokes are mapped to `JokePage` components, so **only one emoji exists per screen**, moving diagonally as the user scrolls.

---

### 5. How to Use and Present the 3D Joke View

1. **Log in** or register a new account.  
2. Navigate to **Joke Journey** (`/jokes`).  
3. At the top:
   - Use **Write a New Joke** to create a few of your own jokes.  
4. To present **your jokes in the center with 3D effects**:
   - Turn on **My jokes only** or click **My originals**.  
   - Scroll down to the **My jokes in 3D view** section.  
   - Each scroll step will:
     - Show one of your jokes fullscreen in the center.  
     - Move the emoji diagonally (top‑left → bottom‑right, then top‑right → bottom‑left on the next joke).  
     - Allow you to move the mouse or finger over the emoji area to rotate it.
5. To present **API jokes** instead:
   - Turn off **My jokes only** and set **API only** as the source.  
   - The heading becomes **Live stream from the Joke API**, but the same 3D behaviour applies.

This flow is ideal for live demonstrations because it turns each joke into a separate “slide” with motion and depth.

---

### 6. Technical Notes

- **Performance**
  - The Three.js scene is lightweight: one emoji plane + a simple particle star field.  
  - React components are kept small and focused; Framer Motion is used only where animation is needed.

- **Accessibility**
  - Text remains high‑contrast over the dark background.  
  - Core functionality (viewing and managing jokes) still works without the 3D view; the 3D section is an enhancement.

- **Extensibility Ideas**
  - Add autoplay “presentation mode” that automatically scrolls through jokes.  
  - Let users choose different emoji themes for their 3D galaxy.  
  - Allow pausing the motion or reducing animation for users who prefer reduced motion.

---

### 7. Summary

The project combines a solid Laravel backend (authentication, CRUD, API integration) with a **modern, interactive React frontend**.  
The **3D emoji joke journey** turns a simple joke list into a memorable, presentation‑friendly experience that clearly demonstrates:

- API integration + caching  
- User‑generated content and filtering  
- SPA behaviour with Inertia.js  
- Advanced frontend features like Three.js 3D graphics and Framer Motion scroll animations.


