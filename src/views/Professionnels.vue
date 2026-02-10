<template>
  <div class="professionnels">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-gray-800 to-gray-900 py-20 mt-20 rounded-3xl mx-4 md:mx-auto max-w-7xl">
      <div class="absolute inset-0 bg-black opacity-50 rounded-3xl"></div>
      <div class="container mx-auto px-4 relative z-10 text-center">
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Vous êtes un professionnel de l'immobilier ?</h1>
        <p class="text-white text-lg max-w-3xl mx-auto mb-6">
          Découvrez nos solutions complètes pour les promoteurs immobiliers et les hôtes de vacances, les professionnelles de l'espace coworking & événement visant à augmenter votre visibilité, attirer plus de clients et conclure des transactions avec facilité.
        </p>
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <a href="#Promoteurs" class="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Promoteurs
          </a>
          <a href="#vacances" class="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Vacances
          </a>
          <a href="#coworking" class="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Coworking & Événement
          </a>
        </div>
      </div>
    </section>

    <!-- Promoteurs Section -->
    <section id="Promoteurs" class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h3 class="text-sm font-semibold text-gray-600 mb-2">Abonnement</h3>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Promoteurs Immobiliers</h2>
        <p class="text-gray-600">Optez pour le pack qui s'aligne le mieux sur la quantité d'annonces dont vous avez la charge !</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <!-- Pro Silver -->
        <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Pro Silver</h3>
            <div class="text-3xl font-bold text-gray-900 mb-4">1000 dh / an</div>
            <p class="text-gray-600">Attirez un maximum d'acheteurs avec notre pack exclusif !</p>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Diffusion d'annonces illimitées pour vos biens immobiliers.</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Renouvellement de vos annonces pour une visibilité constante.</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Mise en avant de vos annonces avec l'option "Annonce Premium".</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Intégration de la vidéo du projet.</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Intégration de visite virtuelle.</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Intégration de la brochure PDF du projet.</span>
            </li>
          </ul>
          <button class="w-full bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
            S'abonner
          </button>
        </div>

        <!-- Pro Gold -->
        <div class="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow transform scale-105">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4"></div>
            <h3 class="text-2xl font-bold mb-2">Pro Gold</h3>
            <div class="text-3xl font-bold mb-4">2000 dh / an</div>
            <p class="text-gray-300">Démarquez-vous auprès des acheteurs et locataires grâce à notre pack complet !</p>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Toutes les fonctionnalités Pro Silver</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Création et hébergement d'une visite virtuelle (livraison sous 10 jours).</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Prise de photos professionnelles pour votre projet (livraison sous 10 jours).</span>
            </li>
          </ul>
          <button class="w-full bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
            S'abonner
          </button>
        </div>
      </div>
    </section>

    <!-- Vacances Section -->
    <section id="vacances" class="bg-orange-50 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h3 class="text-sm font-semibold text-gray-600 mb-2">Abonnement</h3>
          <h2 class="text-3xl font-bold text-gray-900 mb-4">Hôtes de vacances</h2>
          <p class="text-gray-600">Optez pour le pack qui s'aligne le mieux sur la quantité d'annonces dont vous avez la charge !</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Pro Silver -->
          <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">Pro Silver</h3>
              <div class="text-3xl font-bold text-gray-900 mb-4">1000 dh / an</div>
              <p class="text-gray-600">Attirez un maximum de vacanciers avec notre pack exclusif !</p>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Diffusion d'annonces illimitées pour vos locations de vacances.</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Renouvellement de vos annonces pour une visibilité constante.</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Mise en avant de vos annonces avec l'option "Annonce Premium".</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Intégration de la vidéo du projet.</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Intégration de visite virtuelle.</span>
              </li>
            </ul>
            <button class="w-full bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
              S'abonner
            </button>
          </div>

          <!-- Pro Gold -->
          <div class="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow transform scale-105">
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4"></div>
              <h3 class="text-2xl font-bold mb-2">Pro Gold</h3>
              <div class="text-3xl font-bold mb-4">2000 dh / an</div>
              <p class="text-gray-300">Démarquez-vous auprès des vacanciers grâce à notre pack complet !</p>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Toutes les fonctionnalités Pro Silver</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Création et hébergement d'une visite virtuelle (livraison sous 10 jours).</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Prise de photos professionnelles pour votre propriété (livraison sous 10 jours).</span>
              </li>
            </ul>
            <button class="w-full bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Coworking Section -->
    <section id="coworking" class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h3 class="text-sm font-semibold text-gray-600 mb-2">Abonnement</h3>
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Espace Coworking & Événement</h2>
        <p class="text-gray-600">Optez pour le pack qui s'aligne le mieux sur la quantité d'annonces dont vous avez la charge !</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <!-- Pro Silver -->
        <div class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Pro Silver</h3>
            <div class="text-3xl font-bold text-gray-900 mb-4">1000 dh / an</div>
            <p class="text-gray-600">Attirez un maximum de clients avec notre pack exclusif !</p>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Diffusion d'annonces illimitées pour vos espaces coworking & événement.</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Renouvellement de vos annonces pour une visibilité constante.</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Mise en avant de vos annonces avec l'option "Annonce Premium".</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Intégration de la vidéo du projet.</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Intégration de visite virtuelle.</span>
            </li>
          </ul>
          <button class="w-full bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors">
            S'abonner
          </button>
        </div>

        <!-- Pro Gold -->
        <div class="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow transform scale-105">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-yellow-400 rounded-full mx-auto mb-4"></div>
            <h3 class="text-2xl font-bold mb-2">Pro Gold</h3>
            <div class="text-3xl font-bold mb-4">2000 dh / an</div>
            <p class="text-gray-300">Démarquez-vous auprès des clients grâce à notre pack complet !</p>
          </div>
          <ul class="space-y-3 mb-8">
            <li class="flex items-start">
              <svg class="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Toutes les fonctionnalités Pro Silver</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Création et hébergement d'une visite virtuelle (livraison sous 10 jours).</span>
            </li>
            <li class="flex items-start">
              <svg class="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Prise de photos professionnelles pour votre projet (livraison sous 10 jours).</span>
            </li>
          </ul>
          <button class="w-full bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
            S'abonner
          </button>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
              La clé de succès<br />
              <span class="text-blue-600">pour les professionnels de l'immobilier</span>
            </h2>
            <p class="text-gray-600 mb-4">
              Chez Particulier à Particulier, nous comprenons les défis auxquels sont confrontés les professionnels de l'immobilier. Que vous soyez un promoteur immobilier cherchant à promouvoir vos projets ou un hôte gérant des locations de vacances, notre abonnement sur mesure est conçu pour répondre à vos besoins spécifiques.
            </p>
            <p class="text-gray-900 font-semibold">
              Ne laissez pas vos projets immobiliers stagner dans l'ombre. Rejoignez-nous dès aujourd'hui et laissez-nous vous aider à propulser votre activité vers de nouveaux sommets.
            </p>
          </div>
          <div class="text-center">
            <img
              src="http://localhost:8000/assets/images/Abonnement-Promoteurs-Immobiliers-Pour-Les-Professionnels.webp"
              alt="Professionnels"
              class="rounded-lg shadow-lg max-w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Ce que nous vous offrons ?</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 mt-5">Mise en avant</h3>
          <p class="text-gray-600">Votre bien sera présenté de manière exclusive, en tête de liste par rapport aux annonces gratuites.</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 mt-5">Médias enrichis</h3>
          <p class="text-gray-600">Augmentez l'attrait de vos annonces en ajoutant des vidéos captivantes, une multitude de photos, ou une visite virtuelle.</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 mt-5">Présentation complète</h3>
          <p class="text-gray-600">Vos annonces bénéficient d'une présentation professionnelle, comprenant une zone de description détaillée, les caractéristiques du bien, son emplacement sur la carte, ainsi qu'une brochure PDF intégrée.</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 mt-5">Offre spéciale</h3>
          <p class="text-gray-600">Pour les nouveaux abonnés, nous offrons le pack Pro Gold incluant la création et l'hébergement d'une visite virtuelle gratuite, ainsi que la prise de photos professionnelles.</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 mt-5">Actualisation continue</h3>
          <p class="text-gray-600">En tant qu'abonné Pro, vous avez la possibilité de renouveler et de rafraîchir n'importe quelle annonce pour la maintenir en tête des résultats de recherche.</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 mt-5">Support dédié</h3>
          <p class="text-gray-600">Notre équipe de professionnels expérimentés est là pour vous accompagner à chaque étape du processus.</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2 mt-5">Simplicité et efficacité</h3>
          <p class="text-gray-600">Notre plateforme conviviale et intuitive, conçue pour répondre à vos besoins spécifiques en tant que professionnel de l'immobilier.</p>
        </div>
      </div>
    </section>

    <!-- Why Benefit Section -->
    <section class="bg-white py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">
            Pourquoi bénéficier de notre offre promotionnelle sur le pack Pro Gold ?
          </h2>
          <ul class="space-y-4">
            <li class="flex items-start">
              <svg class="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">Renforcer la crédibilité de votre annonce en donnant une image professionnelle à votre bien immobilier.</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">Mettre en valeur les atouts de votre bien immobilier.</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">Permettre aux acheteurs ou locataires d'explorer chaque coin du bien depuis chez eux.</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">Économiser du temps et de l'énergie en évitant les déplacements des acheteurs ou locataires inutiles.</span>
            </li>
            <li class="flex items-start">
              <svg class="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span class="text-gray-700">Faciliter la prise de décision en offrant une vue détaillée de votre bien.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-8">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { serviceService } from '../services/serviceService'

defineOptions({
  name: 'Professionnels',
  seo: {
    titleKey: 'professionnels.meta.title',
    descriptionKey: 'professionnels.meta.description',
    image: '/assets/images/immobilier/immobilier-de-particulier-a-particulier-maroc.webp'
  }
})

const data = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    const response = await serviceService.getServiceData('professionnels')
    data.value = response.data
  } catch (err) {
    console.error('Error loading service data:', err)
    error.value = err.response?.data?.message || err.message || 'Failed to load service data'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.professionnels {
  min-height: 100vh;
}
</style>
