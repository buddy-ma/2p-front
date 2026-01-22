# Nginx Configuration for Cloudways

## Problem
When accessing routes like `/immobilier-a-vendre` directly, nginx returns a 404 error because it's looking for a physical file that doesn't exist.

## Solution
You need to configure nginx in Cloudways to handle Vue Router's History Mode by redirecting all requests to `index.html`.

## Steps to Fix

### Option 1: Through Cloudways Panel (Recommended)

1. Log into your Cloudways dashboard: https://platform.cloudways.com
2. Go to **Applications** → Select your application
3. Click on **Domain Management** tab
4. Click on **Nginx Configuration** or **Application Settings**
5. Find the section for custom nginx configuration
6. Add the following configuration:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

7. Save the configuration
8. Cloudways will automatically reload nginx

### Option 2: Using .nginx.conf File

If Cloudways supports `.nginx.conf` files in the application directory, the file `.nginx.conf` has been created in your `public_html` directory. However, you may still need to enable it through the Cloudways panel.

## Verification

After configuring nginx, test by accessing:
- `https://phpstack-1480575-6120694.cloudwaysapps.com/immobilier-a-vendre`
- `https://phpstack-1480575-6120694.cloudwaysapps.com/location-immobiliere`
- `https://phpstack-1480575-6120694.cloudwaysapps.com/immobilier-neuf`

All routes should load correctly instead of showing 404 errors.

## What This Does

The `try_files $uri $uri/ /index.html;` directive tells nginx to:
1. First try to serve the requested file (`$uri`)
2. If not found, try to serve it as a directory (`$uri/`)
3. If still not found, serve `/index.html` (which allows Vue Router to handle the route)

This is the standard configuration for Single Page Applications (SPAs) using History Mode routing.
