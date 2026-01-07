# 🚀 Vue Frontend Deployment Guide for Cloudways VPS

This guide will walk you through deploying your Vue frontend to Cloudways VPS using GitHub Actions. Don't worry if you're new to this - we'll explain everything step by step!

## 📋 Table of Contents
1. [What is GitHub Actions?](#what-is-github-actions)
2. [What is Cloudways VPS?](#what-is-cloudways-vps)
3. [Prerequisites](#prerequisites)
4. [Step 1: Get Your Cloudways SSH Credentials](#step-1-get-your-cloudways-ssh-credentials)
5. [Step 2: Create SSH Key for GitHub Actions](#step-2-create-ssh-key-for-github-actions)
6. [Step 3: Add Secrets to GitHub](#step-3-add-secrets-to-github)
7. [Step 4: Configure Deployment Path](#step-4-configure-deployment-path)
8. [Step 5: Test Your Deployment](#step-5-test-your-deployment)
9. [Troubleshooting](#troubleshooting)

---

## What is GitHub Actions?

**GitHub Actions** is a tool that automatically runs tasks (like building and deploying your code) whenever you push changes to GitHub. Think of it as a robot that:
- Watches your code
- Builds your Vue app when you push to `main` branch
- Deploys it to your server automatically

**No manual work needed!** 🎉

---

## What is Cloudways VPS?

**Cloudways** is a hosting platform that gives you a Virtual Private Server (VPS). A VPS is like having your own computer in the cloud where you can host your website.

**Why we need SSH?**
- SSH (Secure Shell) is a secure way to connect to your server
- It allows GitHub Actions to copy files to your server
- Think of it as a secure tunnel between GitHub and your Cloudways server

---

## Prerequisites

Before starting, make sure you have:
- ✅ A GitHub account
- ✅ Your code pushed to a GitHub repository
- ✅ A Cloudways account with a VPS server
- ✅ Access to your Cloudways dashboard

---

## Step 1: Get Your Cloudways SSH Credentials

### 1.1 Log into Cloudways Dashboard
1. Go to [https://platform.cloudways.com](https://platform.cloudways.com)
2. Log in with your credentials

### 1.2 Find Your Server
1. Click on **"Servers"** in the top menu
2. Select your server from the list

### 1.3 Get SSH Details
1. Click on **"Master Credentials"** tab (or look for SSH credentials)
2. You'll see:
   - **SSH Host**: Something like `45.xxx.xxx.xxx` (your server IP)
   - **SSH Username**: Usually `cloudways` or similar
   - **SSH Password**: Your password (you'll need this later)

**📝 Write these down!** You'll need them in Step 3.

### 1.4 Find Your Application Path
You need to know where your website files are stored. Common locations:
- `/home/master/applications/[app_id]/public_html/` (for main application)
- `/home/master/applications/[app_id]/public_html/vue-frontend/` (for subdirectory)

**How to find it:**
1. In Cloudways, go to **"Applications"** tab
2. Click on your application
3. Look for **"Application URL"** or **"Public Path"**
4. The path is usually shown there

**💡 Tip:** If you want to deploy to a subdirectory (like `/vue-frontend/`), create that folder first:
```bash
# You'll do this via SSH or Cloudways file manager
mkdir -p /home/master/applications/[app_id]/public_html/vue-frontend
```

---

## Step 2: Create SSH Key for GitHub Actions

We need to create a special key that allows GitHub Actions to access your server securely.

### 2.1 Generate SSH Key Pair

**On Windows (PowerShell):**
```powershell
# Open PowerShell and run:
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy
```

**On Mac/Linux:**
```bash
ssh-keygen -t rsa -b 4096 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy
```

**What happens:**
- It will ask for a passphrase - **press Enter twice** (leave it empty)
- Two files will be created:
  - `github_actions_deploy` (private key - keep this secret!)
  - `github_actions_deploy.pub` (public key - we'll add this to server)

### 2.2 Copy Your Public Key

**On Windows (PowerShell):**
```powershell
# Display the public key:
cat ~/.ssh/github_actions_deploy.pub
```

**On Mac/Linux:**
```bash
cat ~/.ssh/github_actions_deploy.pub
```

**📝 Copy the entire output** - it starts with `ssh-rsa` and ends with `github-actions-deploy`

### 2.3 Add Public Key to Cloudways Server

**Option A: Using Cloudways File Manager**
1. In Cloudways dashboard, go to your server
2. Click **"File Manager"** or **"SSH Terminal"**
3. Navigate to: `/home/master/.ssh/`
4. Open (or create) file: `authorized_keys`
5. Paste your public key at the end of the file
6. Save the file

**Option B: Using SSH (Advanced)**
```bash
# Connect to your server:
ssh cloudways@YOUR_SERVER_IP

# Add the public key:
echo "YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 2.4 Get Your Private Key

**On Windows (PowerShell):**
```powershell
# Display the private key:
cat ~/.ssh/github_actions_deploy
```

**On Mac/Linux:**
```bash
cat ~/.ssh/github_actions_deploy
```

**📝 Copy the ENTIRE output** - this is your private key. It starts with `-----BEGIN OPENSSH PRIVATE KEY-----` and ends with `-----END OPENSSH PRIVATE KEY-----`

**⚠️ IMPORTANT:** Keep this private key secret! Never share it publicly.

---

## Step 3: Add Secrets to GitHub

GitHub Actions needs your server credentials, but we store them securely as "Secrets" so they're never exposed in your code.

### 3.1 Go to Your GitHub Repository
1. Open your repository on GitHub
2. Click on **"Settings"** tab (top menu)
3. In the left sidebar, click **"Secrets and variables"** → **"Actions"**

### 3.2 Add Required Secrets

Click **"New repository secret"** for each of these:

#### Secret 1: `DEPLOY_HOST`
- **Name:** `DEPLOY_HOST`
- **Value:** Your Cloudways SSH Host (IP address from Step 1.3)
- **Example:** `45.xxx.xxx.xxx`
- Click **"Add secret"**

#### Secret 2: `DEPLOY_USER`
- **Name:** `DEPLOY_USER`
- **Value:** Your SSH Username (from Step 1.3)
- **Example:** `cloudways`
- Click **"Add secret"**

#### Secret 3: `DEPLOY_SSH_KEY`
- **Name:** `DEPLOY_SSH_KEY`
- **Value:** Your private key (from Step 2.4)
- **⚠️ Paste the ENTIRE key including `-----BEGIN` and `-----END` lines**
- Click **"Add secret"**

#### Secret 4: `DEPLOY_PATH` (Optional but Recommended)
- **Name:** `DEPLOY_PATH`
- **Value:** The path where you want to deploy (from Step 1.4)
- **Example:** `/home/master/applications/abc123xyz/public_html/vue-frontend`
- Click **"Add secret"**

#### Secret 5: `VITE_API_BASE_URL` (If needed)
- **Name:** `VITE_API_BASE_URL`
- **Value:** Your production API URL
- **Example:** `https://api.yourdomain.com`
- Click **"Add secret"**

**✅ You should now have 4-5 secrets configured!**

---

## Step 4: Configure Deployment Path

The workflow file is already configured, but you may need to adjust the deployment path.

### 4.1 Check the Workflow File

Open `.github/workflows/vue-frontend.yml` and find the deployment section. It should look like this:

```yaml
- name: Deploy to Cloudways VPS
  uses: appleboy/scp-action@master
  with:
    host: ${{ secrets.DEPLOY_HOST }}
    username: ${{ secrets.DEPLOY_USER }}
    key: ${{ secrets.DEPLOY_SSH_KEY }}
    source: "vue-frontend/dist/*"
    target: ${{ secrets.DEPLOY_PATH || '/home/master/applications/default/public_html' }}
    strip_components: 1
```

**If you added `DEPLOY_PATH` secret in Step 3.2, you're all set!**

**If not**, you need to manually edit the `target` line with your actual path.

### 4.2 Commit and Push

```bash
git add .github/workflows/vue-frontend.yml
git commit -m "Configure Cloudways deployment"
git push origin main
```

---

## Step 5: Test Your Deployment

### 5.1 Trigger the Workflow

1. Make a small change to any file in `vue-frontend/` folder
2. Commit and push:
   ```bash
   git add vue-frontend/
   git commit -m "Test deployment"
   git push origin main
   ```

### 5.2 Check GitHub Actions

1. Go to your GitHub repository
2. Click on **"Actions"** tab
3. You should see **"Build and Deploy Vue Frontend"** running
4. Click on it to see the progress
5. Wait for it to complete (usually 2-5 minutes)

### 5.3 Verify Deployment

1. Visit your website URL
2. Check if your Vue app is live
3. If deployed to subdirectory, visit: `https://yourdomain.com/vue-frontend/`

**🎉 Success!** Your app should now be live!

---

## Troubleshooting

### ❌ "Permission denied" Error

**Problem:** SSH key doesn't have correct permissions

**Solution:**
1. Make sure you added the **public key** to server's `authorized_keys`
2. Check file permissions on server:
   ```bash
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/authorized_keys
   ```

### ❌ "Host key verification failed"

**Problem:** Server's host key not recognized

**Solution:** Add this to the workflow (before deploy step):
```yaml
- name: Add server to known hosts
  run: |
    ssh-keyscan -H ${{ secrets.DEPLOY_HOST }} >> ~/.ssh/known_hosts
```

### ❌ "No such file or directory"

**Problem:** Deployment path doesn't exist

**Solution:**
1. Create the directory on your server first:
   ```bash
   ssh cloudways@YOUR_SERVER_IP
   mkdir -p /path/to/your/deployment/directory
   ```
2. Or update `DEPLOY_PATH` secret with correct path

### ❌ Build Fails

**Problem:** Build errors in GitHub Actions

**Solution:**
1. Check the Actions logs for specific errors
2. Make sure all dependencies are in `package.json`
3. Test build locally first: `cd vue-frontend && pnpm run build`

### ❌ Files Deployed but Website Not Working

**Problem:** Files are there but site doesn't load

**Solution:**
1. Check file permissions on server:
   ```bash
   chmod -R 755 /path/to/deployment
   ```
2. Make sure your web server (Apache/Nginx) is configured correctly
3. Check if `index.html` is in the root of deployment directory

### ❌ Can't Connect via SSH

**Problem:** Can't SSH into Cloudways server

**Solution:**
1. Verify SSH credentials in Cloudways dashboard
2. Make sure your IP is whitelisted (Cloudways → Server → Security)
3. Try connecting manually first:
   ```bash
   ssh cloudways@YOUR_SERVER_IP
   ```

---

## 🎓 Understanding the Workflow

Here's what happens automatically when you push to `main`:

1. **Checkout** - GitHub downloads your code
2. **Setup Node.js** - Installs Node.js environment
3. **Install pnpm** - Sets up package manager
4. **Install dependencies** - Runs `pnpm install`
5. **Build** - Runs `pnpm run build` (creates `dist/` folder)
6. **Deploy** - Copies `dist/` files to your Cloudways server via SSH

**That's it!** Every time you push to `main`, this process repeats automatically.

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cloudways SSH Guide](https://support.cloudways.com/en/articles/5121380-how-to-connect-to-your-server-via-ssh)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)

---

## ✅ Checklist

Before deploying, make sure:

- [ ] You have Cloudways SSH credentials
- [ ] SSH key pair created and public key added to server
- [ ] All GitHub secrets configured (`DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`, `DEPLOY_PATH`)
- [ ] Deployment path exists on server
- [ ] Workflow file is committed and pushed
- [ ] Tested build locally (`pnpm run build` works)

---

## 🆘 Need Help?

If you're stuck:
1. Check the GitHub Actions logs for error messages
2. Verify all secrets are set correctly
3. Test SSH connection manually
4. Check Cloudways server logs

**Good luck with your deployment! 🚀**

