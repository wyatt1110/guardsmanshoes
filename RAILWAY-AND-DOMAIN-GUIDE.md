# Guardsman: Upload to GitHub, Deploy on Railway, Add Squarespace Domain

---

## Part 1: Upload to GitHub

Your repo: **https://github.com/wyatt1110/guardsmanshoes**

In **Terminal** (on your Mac), run these commands one by one from your project folder:

```bash
cd /Users/miles/Documents/Guardsman
```

```bash
git init
```

```bash
git add .
```

```bash
git status
```
(You should see: index.html, shop.html, book.html, css/style.css, js/main.js, assets/, package.json, server.js, .gitignore, etc.)

```bash
git commit -m "Guardsman website – ready for Railway"
```

```bash
git branch -M main
```

```bash
git remote add origin https://github.com/wyatt1110/guardsmanshoes.git
```

```bash
git push -u origin main
```

If GitHub asks for login, use your GitHub username and a **Personal Access Token** (not your normal password).  
To create a token: GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Generate new token**; give it “repo” and use it as the password when `git push` asks.

After this, https://github.com/wyatt1110/guardsmanshoes will contain all the files needed to run on Railway.

---

## Part 2: Run the GitHub repo on Railway

1. Go to **[railway.app](https://railway.app)** and log in.
2. Click **“New Project”**.
3. Choose **“Deploy from GitHub repo”**.
4. If asked, connect your GitHub account and allow Railway to see your repos.
5. Select the repo **`wyatt1110/guardsmanshoes`**.
6. Railway will detect Node.js, run `npm install` (there are no extra dependencies), and run `npm start` (your `server.js`). Wait until the deployment status is **Success** (green).
7. Open the deployed service (click the service name).
8. Go to the **Settings** tab.
9. Under **Networking** → **Public Networking**, click **“Generate domain”**.
10. Copy the URL (e.g. `guardsmanshoes-production-xxxx.up.railway.app`). Open it in a browser to confirm the site works.

Your site is now live on that Railway URL. Next, point your Squarespace domain to it.

---

## Part 3: Add your Squarespace domain to Railway

You keep the domain in Squarespace; you only change the DNS so the domain points to Railway.

### Step A: Add the custom domain in Railway

1. In Railway, open your **guardsmanshoes** project and select the **service** (the one you deployed).
2. Go to **Settings**.
3. Find **Networking** → **Custom Domain** (or **Domains**).
4. Click **“Add custom domain”** or **“Custom domain”**.
5. Enter your domain exactly as you want people to use it, for example:
   - **www.guardsmanshoes.com** (with www), or  
   - **guardsmanshoes.com** (without www), or  
   - add both if you want both to work.
6. Click **Add** / **Save**.
7. Railway will show the **DNS records** you need. It will look something like:
   - **CNAME**  
     - Name/Host: `www` (for www.guardsmanshoes.com)  
     - Value/Points to: `guardsmanshoes-production-xxxx.up.railway.app`
   - And possibly an **A record** for the root domain (guardsmanshoes.com).  
   **Leave this Railway page open** or copy these values; you’ll use them in Squarespace.

### Step B: Point the domain in Squarespace (DNS)

1. Log in to **Squarespace**.
2. Go to **Settings** → **Domains** (or **Website** → **Domains**).
3. Click the domain you use for Guardsman (e.g. guardsmanshoes.com).
4. Open **DNS settings** (or **Advanced settings** / **Manage DNS** / **External DNS**).
5. Add or edit records to match what Railway showed:

   **If you’re using www (e.g. www.guardsmanshoes.com):**
   - Add a **CNAME** record:
     - **Host** / **Name**: `www` (or whatever Squarespace uses for “www”)
     - **Value** / **Points to**: the Railway URL, e.g. `guardsmanshoes-production-xxxx.up.railway.app`  
       (no `https://`, just the hostname.)

   **If Railway gave you an A record for the root domain (guardsmanshoes.com):**
   - Add an **A** record:
     - **Host** / **Name**: `@` or “root” (Squarespace may label it differently)
     - **Value** / **Points to**: the IP address Railway provided.

6. Remove or change any **old** A or CNAME records that pointed this domain somewhere else (e.g. Squarespace’s own hosting), so only the new Railway records apply.
7. Save the DNS settings.

### Step C: Wait and check

- DNS can take **5–30 minutes**, sometimes up to **24–48 hours**.
- After a while, open your domain in a browser (e.g. https://www.guardsmanshoes.com). Railway will serve HTTPS once the domain points to them.

---

## Quick checklist

| Step | What to do |
|------|------------|
| 1 | In Terminal: `cd /Users/miles/Documents/Guardsman`, then `git init`, `git add .`, `git commit -m "..."`, `git branch -M main`, `git remote add origin https://github.com/wyatt1110/guardsmanshoes.git`, `git push -u origin main`. |
| 2 | Railway → New Project → Deploy from GitHub repo → select **wyatt1110/guardsmanshoes** → wait for Success → Settings → Generate domain → copy `.railway.app` URL. |
| 3 | Railway → Settings → Custom domain → add your domain (e.g. www.guardsmanshoes.com) → copy the CNAME (and A if shown). |
| 4 | Squarespace → Settings → Domains → your domain → DNS → add CNAME (and A if needed) as Railway says → Save. |
| 5 | Wait 5–30 min (or up to 24–48 hr), then open your domain in the browser. |

If anything fails (e.g. “site can’t be reached” or “not secure”), double-check that the CNAME value in Squarespace matches the Railway URL exactly and that you didn’t remove a record Squarespace needs for something else (e.g. email).
