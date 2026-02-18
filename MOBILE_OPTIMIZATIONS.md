# Mobile Performance Optimizations (73 → Target: 85+)

## Current Status
- **Desktop**: 92 ✅ (Excellent!)
- **Mobile**: 73 ⚠️ (Good, but needs improvement)
- **Target**: 85+ for mobile

## Issues Identified from Latest Lighthouse Report

### Critical Issues (Mobile):
1. **LCP: 5.1s** (Red - Target: <2.5s)
2. **FCP: 2.5s** (Orange - Target: <1.8s)
3. **TBT: 330ms** (Orange - Target: <200ms)
4. **Render Blocking**: 160ms (Cloudflare rocket-loader)
5. **Unused JavaScript**: 487 KiB savings potential
6. **Unused CSS**: 15 KiB savings potential

## Optimizations Applied

### 1. Deferred Third-Party Analytics Scripts ✅

**Problem**: Analytics scripts (Google Analytics, Facebook Pixel, Yandex Metrika) were loading synchronously, blocking rendering.

**Solution**: 
- Deferred all analytics scripts using `requestIdleCallback` with timeouts
- Scripts now load after page is interactive (2-5 seconds delay)
- Initialized analytics queues early (non-blocking) so events aren't lost

**Files Modified**:
- `src/utils/analytics.js`: All analytics functions now use deferred loading
- `src/App.vue`: Analytics initialization delayed until idle

**Expected Impact**: 
- Reduces TBT by ~200-300ms
- Reduces unused JavaScript impact
- Improves FCP and LCP

### 2. Resource Hints for Analytics Domains ✅

**Added**:
- `dns-prefetch` for all analytics domains (Google, Facebook, Yandex, Clarity)
- Preconnect for fonts (already existed)

**Files Modified**:
- `index.html`: Added dns-prefetch links

**Expected Impact**: 
- Faster DNS resolution when scripts load
- Minimal impact but helps when scripts eventually load

### 3. Cloudflare Rocket Loader Optimization ⚠️

**Issue**: Cloudflare's rocket-loader.min.js is render-blocking (160ms)

**Recommendation**: 
- Disable Rocket Loader in Cloudflare dashboard for this site
- Or configure it to exclude critical scripts
- Rocket Loader can conflict with modern async/defer patterns

**Action Required**: 
- Go to Cloudflare Dashboard → Speed → Optimization
- Disable "Rocket Loader" OR
- Add exclusions for critical scripts

## Remaining Optimizations Needed

### 1. LCP Image Optimization (Highest Priority)

**Current**: Hero background image loads via CSS `background-image` (5.1s LCP)

**Options**:
- **Option A**: Convert hero background to `<img>` with `fetchpriority="high"` and `loading="eager"`
  - Better browser prioritization
  - Can use `srcset` for responsive images
  - Requires layout adjustments
  
- **Option B**: Use `<picture>` element with multiple sources
  - Best for responsive images
  - Better compression opportunities
  
- **Option C**: Keep background-image but optimize further
  - Ensure image is WebP format (already done)
  - Add responsive image sizes
  - Consider using `image-set()` CSS for better format selection

**Recommendation**: Option A or B for best results

### 2. Reduce Unused JavaScript (487 KiB)

**Current Issues**:
- Google Analytics: 301.8 KiB unused
- Google Tag Manager: 110.1 KiB unused
- Yandex Metrika: 43.8 KiB unused
- Facebook Pixel: 31.8 KiB unused

**Solutions**:
- ✅ Already deferred (will help)
- Consider lazy-loading analytics only after user interaction
- Use Google Analytics 4 with minimal configuration
- Consider removing unused analytics platforms

### 3. Reduce Unused CSS (15 KiB)

**Current**: 15.2 KiB unused out of 17.4 KiB total

**Solutions**:
- Use PurgeCSS or similar tool to remove unused CSS
- Consider CSS-in-JS for component-scoped styles
- Split CSS by route/page

### 4. Additional Mobile-Specific Optimizations

**Image Optimization**:
- Ensure all images use WebP format
- Add responsive image sizes (`srcset`)
- Use `loading="lazy"` for below-fold images (already done)

**Font Optimization**:
- ✅ Already using async font loading
- Consider using `font-display: swap` (check if already applied)
- Preload critical font files

**JavaScript Optimization**:
- ✅ Already using code splitting
- Consider route-based code splitting
- Lazy load non-critical components

## Implementation Priority

1. **High Priority** (Do Now):
   - ✅ Defer analytics scripts (DONE)
   - ✅ Add resource hints (DONE)
   - ⚠️ Disable/configure Cloudflare Rocket Loader (Manual)

2. **Medium Priority** (Next Sprint):
   - Optimize LCP image (convert to `<img>` or `<picture>`)
   - Reduce unused CSS with PurgeCSS
   - Further optimize JavaScript bundles

3. **Low Priority** (Future):
   - Remove unused analytics platforms
   - Implement route-based code splitting
   - Add service worker for caching

## Expected Results After All Optimizations

- **Mobile Performance**: 73 → **85-90**
- **LCP**: 5.1s → **<2.5s**
- **FCP**: 2.5s → **<1.8s**
- **TBT**: 330ms → **<200ms**

## Testing Checklist

After deploying optimizations:
- [ ] Run Lighthouse mobile audit
- [ ] Test on slow 3G connection
- [ ] Verify analytics still track correctly (with delay)
- [ ] Check LCP element in DevTools
- [ ] Monitor Core Web Vitals in production
- [ ] Test on real mobile devices

## Notes

- Analytics scripts are now deferred but will still load and track events
- Events are queued before scripts load, so no data loss
- Cloudflare Rocket Loader should be disabled for best results
- Consider A/B testing analytics loading strategies
