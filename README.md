
This project uses Astro and is set up for deployment to GitHub Pages.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command            | Action                                           |
| :----------------- | :----------------------------------------------- |
| `npm install`      | Installs dependencies                            |
| `npm run dev`      | Starts local dev server at `localhost:4321`      |
| `npm run build`    | Build your production site to `./dist/`          |
| `npm run preview`  | Preview your build locally, before deploying     |
| `npm test`         | Run tests with Vitest                            |
| `npm run astro ...`| Run CLI commands like `astro add`, `astro check` |

## 🧪 Tests

| Test                  | What it does                                                          |
| :-------------------- | :-------------------------------------------------------------------- |
| `linkChecker.test.ts` | Builds site, validates all internal links resolve to existing files   |
| `feeds.test.ts`       | Tests RSS feed config, collection exclusions, markdown→HTML rendering |

## ✍️ Writing Content

**Links in markdown:** Always use relative paths, not full URLs.

```markdown
<!-- ✅ Do this -->

[my post](/blog/my-post)

<!-- ❌ Not this -->

[my post](http://localhost:4321/blog/my-post)
```

Relative paths work in both dev and production. The link checker validates them on every commit.

## 📜 Custom Scripts

### transform-files.cjs

Transforms Mataroa blog export files to Astro-compatible frontmatter format.

**Example:**

```bash
node src/utils/transform-files.cjs posts/weeknotes
```

This script converts Mataroa's markdown format (with title and date in the content) to Astro's YAML frontmatter format. It can be run multiple times safely on the same files.
