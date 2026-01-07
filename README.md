# Vue Frontend - 2P Real Estate

This is the Vue.js frontend application for the 2P real estate platform, separated from the Laravel admin panel.

## Project Structure

```
vue-frontend/
├── src/
│   ├── components/      # Reusable Vue components
│   ├── views/          # Page components (routes)
│   ├── services/        # API service layer
│   ├── router/          # Vue Router configuration
│   └── App.vue          # Root component
├── public/              # Static assets
└── package.json         # Dependencies

```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
   - Copy `.env.example` to `.env` (if not already done)
   - Update `VITE_API_BASE_URL` to point to your Laravel backend API

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Routes

The application includes the following routes:

- `/` - Home page
- `/professionnels` - Professionnels page
- `/service-promoteur` - Service Promoteur page
- `/service-location` - Service Location page
- `/service-vacances` - Service Vacances page
- `/service-vente` - Service Vente page
- `/coworking` - Coworking page
- `/nos-tarifs` - Tarifs page
- `/immobilier-a-vendre/:ville?/:quartier?/:type?/:extra?` - Achat (Sale) listings
- `/location-vacances/:ville?/:quartier?/:type?/:extra?` - Vacation rentals
- `/location-immobiliere/:ville?/:quartier?/:type?/:extra?` - Long-term rentals
- `/immobilier-neuf/:ville?/:quartier?/:type?/:extra?` - New properties

## API Integration

The frontend communicates with the Laravel backend through REST API endpoints:

- `GET /api/home` - Home page data
- `GET /api/services/{service}` - Service page data
- `GET /api/products/achat` - Achat products
- `GET /api/products/location` - Location products
- `GET /api/products/vacances` - Vacances products
- `GET /api/products/immoneuf` - Immoneuf products
- `GET /api/quartiers` - Get quartiers
- `GET /api/types` - Get product types
- `GET /api/extras` - Get product extras

## Development

The project uses:
- Vue 3 with Composition API
- Vue Router 4 for routing
- Axios for HTTP requests
- Vite for build tooling

## Environment Variables

- `VITE_API_BASE_URL` - Base URL for the Laravel API (default: http://localhost:8000/api)

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure:
1. Laravel CORS middleware is enabled in `app/Http/Kernel.php` (should be in the `api` middleware group)
2. `config/cors.php` has `'allowed_origins' => ['*']` or includes your Vue dev server origin
3. Laravel server is running and accessible

### API Not Found (404)
- Verify Laravel routes are registered: `php artisan route:list | grep api`
- Check that API controllers exist in `app/Http/Controllers/Api/`
- Ensure Laravel server is running on the correct port

