# ⚡ Quick Start Checklist - Cloudways Deployment

Follow these steps in order to set up automatic deployment:

## ✅ Step-by-Step Checklist

### 1. Get Cloudways Credentials
- [ ] Log into Cloudways dashboard
- [ ] Go to your server → **Master Credentials**
- [ ] Note down:
  - SSH Host (IP address): `165.227.235.60`
  - SSH Username: `pap-front-ssh`
  - SSH Password: `Gta$$159` (you'll need this)

### 2. Find Deployment Path
- [ ] Go to **Applications** tab in Cloudways
- [ ] Click on your application
- [ ] Find the public path (usually `/home/master/applications/pfpxvernvm/public_html/`)
- [ ] Write it down: `_________________`

### 3. Create SSH Key
- [ ] Open PowerShell/Terminal
- [ ] Run: `ssh-keygen -t rsa -b 4096 -C "github-actions-deploy" -f ~/.ssh/github_actions_deploy`
- [ ] Press Enter twice (no passphrase)
- [ ] Display public key: `cat ~/.ssh/github_actions_deploy.pub`
- [ ] Copy the entire output

### 4. Add Public Key to Server
- [ ] Connect to Cloudways via SSH or File Manager
- [ ] Add public key to `/home/master/.ssh/authorized_keys`
- [ ] Set permissions: `chmod 600 ~/.ssh/authorized_keys`

### 5. Get Private Key
- [ ] Display private key: `cat ~/.ssh/github_actions_deploy`
- [ ] Copy the ENTIRE output (starts with `-----BEGIN`)

### 6. Add GitHub Secrets
Go to: **GitHub Repo → Settings → Secrets and variables → Actions**

- [ ] **DEPLOY_HOST** = Your Cloudways SSH IP
- [ ] **DEPLOY_USER** = Your SSH username
- [ ] **DEPLOY_SSH_KEY** = Your private key (entire key)
- [ ] **DEPLOY_PATH** = Your deployment path
- [ ] **VITE_API_BASE_URL** = Your production API URL (optional)

### 7. Test Deployment
- [ ] Make a small change in `vue-frontend/`
- [ ] Commit: `git add vue-frontend/ && git commit -m "Test deploy"`
- [ ] Push: `git push origin main`
- [ ] Check GitHub Actions tab
- [ ] Wait for workflow to complete
- [ ] Visit your website!


## 🎯 Expected Result

After pushing to `main`:
1. GitHub Actions automatically builds your Vue app
2. Files are deployed to your Cloudways server
3. Your website updates automatically!

## 📖 Need More Details?

See the full guide: **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

## 🆘 Common Issues

**"Permission denied"**
→ Check that public key is in server's `authorized_keys`

**"No such file or directory"**
→ Create the deployment directory on server first

**Build fails**
→ Test locally: `cd vue-frontend && pnpm run build`

---

**Ready? Start with Step 1! 🚀**

