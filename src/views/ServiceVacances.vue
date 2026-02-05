<template>
  <div class="service-vacances">
    <!-- Hero Section -->
    <section class="relative py-24 mt-20 mx-4 md:mx-auto max-w-7xl overflow-hidden rounded-3xl">
      <!-- Landscape Background -->
      <div class="absolute inset-0 hero-background rounded-3xl"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <!-- Left Column - Text Content -->
          <div class="text-center lg:text-left">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span>{{ t('serviceVacances.hero.titlePart1') }}</span>
              <span class="text-green-600 font-extrabold"> {{ t('serviceVacances.hero.titleHighlight') }}</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-700 mb-6">
              {{ t('serviceVacances.hero.subtitle') }}
            </p>
            <div class="flex flex-wrap justify-center lg:justify-start gap-3 mb-8 text-gray-700">
              <span class="text-base">{{ t('serviceVacances.hero.feature1') }}</span>
              <span class="text-gray-400">•</span>
              <span class="text-base">{{ t('serviceVacances.hero.feature2') }}</span>
              <span class="text-gray-400">•</span>
              <span class="text-base">{{ t('serviceVacances.hero.feature3') }}</span>
            </div>
            <button
              class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors shadow-lg">
              {{ t('serviceVacances.hero.cta') }}
            </button>
          </div>
          <!-- Right Column - Illustrations -->
          <div class="relative hidden lg:block">
            <div class="relative">
              <!-- House Illustration -->
              <div
                class="absolute top-10 right-20 w-48 h-48 bg-white rounded-lg shadow-2xl flex items-center justify-center">
                <svg class="w-32 h-32 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <!-- Phone Illustration -->
              <div class="absolute top-0 right-0 w-40 h-64 bg-gray-900 rounded-2xl shadow-2xl p-2">
                <div class="w-full h-full bg-white rounded-xl flex flex-col">
                  <div class="h-8 bg-gray-200 rounded-t-xl flex items-center justify-center">
                    <div class="w-12 h-1 bg-gray-400 rounded"></div>
                  </div>
                  <div class="flex-1 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <div class="text-center">
                      <div class="flex justify-center gap-1 mb-2">
                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span class="text-xs font-bold text-gray-700">5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Travelers Illustration -->
              <div class="absolute bottom-0 right-32 flex gap-2">
                <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Problem/Solution Section -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center justify-center gap-3">
          <svg class="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
          {{ t('serviceVacances.problems.title') }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <!-- Left Column - Problems -->
          <div class="space-y-6">
            <div class="bg-white rounded-xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-shadow">
              <div class="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <!-- Stacked Coins Icon -->
                <div class="relative">
                  <svg class="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.363 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.363-1.253V5z"
                      clip-rule="evenodd" />
                  </svg>
                  <svg class="w-6 h-6 text-yellow-500 absolute -bottom-1 -right-1" fill="currentColor"
                    viewBox="0 0 20 20">
                    <path
                      d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.363 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.363-1.253V5z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1 text-lg">{{ t('serviceVacances.problems.problem1') }}</h3>
              </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-shadow">
              <div class="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <!-- Calendar/Tablet Icon -->
                <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1 text-lg">{{ t('serviceVacances.problems.problem2') }}</h3>
              </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-shadow">
              <div class="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <!-- Camera Icon -->
                <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1 text-lg">{{ t('serviceVacances.problems.problem3') }}</h3>
              </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-shadow">
              <div class="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <!-- Building with Magnifying Glass -->
                <div class="relative">
                  <svg class="w-7 h-7 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <svg class="w-5 h-5 text-indigo-500 absolute -top-1 -right-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1 text-lg">{{ t('serviceVacances.problems.problem4') }}</h3>
              </div>
            </div>
          </div>
          <!-- Right Column - More Problems -->
          <div class="space-y-6">
            <div class="bg-white rounded-xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-shadow">
              <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <!-- Clock Icon -->
                <svg class="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1 text-lg">{{ t('serviceVacances.problems.problem5') }}</h3>
              </div>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-shadow">
              <div class="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                <!-- People Icon -->
                <svg class="w-8 h-8 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 mb-1 text-lg">{{ t('serviceVacances.problems.problem6') }}</h3>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-12 relative">
          <div class="flex items-center justify-center gap-4">
            <svg class="w-12 h-12 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
            <div class="bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg">
              {{ t('serviceVacances.problems.solution') }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Virtual Tour Benefits Section -->
    <section class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <svg class="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {{ t('serviceVacances.virtualTour.title') }}
          </h2>
          <p class="text-xl text-gray-700 mb-8">{{ t('serviceVacances.virtualTour.subtitle') }}</p>
        </div>
        <div class="max-w-4xl mx-auto">
          <div class="bg-white rounded-xl shadow-xl p-8 md:p-12">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div class="space-y-4">
                  <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                    </svg>
                    <p class="text-gray-700">{{ t('serviceVacances.virtualTour.benefit1') }}</p>
                  </div>
                  <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                    </svg>
                    <p class="text-gray-700">{{ t('serviceVacances.virtualTour.benefit2') }}</p>
                  </div>
                  <div class="flex items-start gap-3">
                    <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd" />
                    </svg>
                    <p class="text-gray-700">{{ t('serviceVacances.virtualTour.benefit3') }}</p>
                  </div>
                </div>
                <div class="mt-8 p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                  <p class="text-green-900 font-semibold text-lg">{{ t('serviceVacances.virtualTour.valueProp') }}</p>
                </div>
              </div>
              <div class="text-center">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 relative">
                  <div
                    class="absolute -top-2 -right-2 bg-green-500 text-white px-5 py-2 rounded-full font-bold text-lg shadow-lg z-10">
                    x5 {{ t('serviceVacances.virtualTour.bookings') }}
                  </div>
                  <!-- Tablet Illustration -->
                  <div
                    class="w-full h-72 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border-4 border-gray-200">
                    <div class="h-8 bg-gray-100 flex items-center justify-center">
                      <div class="w-16 h-1 bg-gray-300 rounded"></div>
                    </div>
                    <div
                      class="flex-1 bg-gradient-to-br from-blue-100 via-blue-50 to-green-50 flex items-center justify-center relative">
                      <!-- 360° Icon -->
                      <div
                        class="absolute bottom-4 right-4 bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-sm shadow-lg">
                        360°
                      </div>
                      <!-- House illustration -->
                      <svg class="w-32 h-32 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Subscription Plans Section -->
    <section class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <svg class="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {{ t('serviceVacances.plans.title') }}
        </h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <!-- Premium Plan -->
        <div class="bg-white rounded-xl shadow-xl border-2 border-green-500 overflow-hidden">
          <div class="bg-green-500 text-white py-3 px-6">
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
              <h3 class="text-xl font-bold">{{ t('serviceVacances.plans.premium.name') }}</h3>
            </div>
          </div>
          <div class="p-8">
            <div class="text-center mb-6">
              <div class="text-4xl font-bold text-gray-900 mb-2">{{ t('serviceVacances.plans.premium.price') }}</div>
              <div class="text-gray-600">{{ t('serviceVacances.plans.premium.period') }}</div>
            </div>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVacances.plans.premium.feature1') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVacances.plans.premium.feature2') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVacances.plans.premium.feature3') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVacances.plans.premium.feature4') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVacances.plans.premium.feature5') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVacances.plans.premium.feature6') }}</span>
              </li>
            </ul>
            <!-- Illustration Placeholder -->
            <div class="mt-6 flex justify-center">
              <div class="w-32 h-32 bg-green-50 rounded-lg flex items-center justify-center">
                <svg class="w-20 h-20 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 1h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                    clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <button
              class="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition-colors mt-6 shadow-lg">
              {{ t('serviceVacances.plans.premium.cta') }}
            </button>
          </div>
        </div>

        <!-- Premium Super Plan -->
        <div class="bg-white rounded-xl shadow-xl border-2 border-orange-500 overflow-hidden">
          <div class="bg-orange-500 text-white py-3 px-6">
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h3 class="text-xl font-bold">{{ t('serviceVacances.plans.premiumSuper.name') }}</h3>
            </div>
          </div>
          <div class="p-8">
            <div class="text-center mb-6">
              <div class="text-4xl font-bold text-gray-900 mb-2">{{ t('serviceVacances.plans.premiumSuper.price') }}
              </div>
              <div class="text-gray-600">{{ t('serviceVacances.plans.premiumSuper.period') }}</div>
            </div>
            <div class="mb-6 p-4 bg-orange-50 rounded-lg">
              <p class="text-orange-900 font-semibold text-sm">{{ t('serviceVacances.plans.premiumSuper.includes') }}
              </p>
            </div>
            <ul class="space-y-4 mb-8">
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVacances.plans.premiumSuper.feature1') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVacances.plans.premiumSuper.feature2') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVacances.plans.premiumSuper.feature3') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVacances.plans.premiumSuper.feature4') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">{{ t('serviceVacances.plans.premiumSuper.feature5') }}</span>
              </li>
            </ul>
            <!-- Illustration Placeholder -->
            <div class="mt-6 flex justify-center">
              <div class="w-36 h-32 bg-orange-50 rounded-lg flex items-center justify-center">
                <svg class="w-24 h-24 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
            </div>
            <button
              class="w-full bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-700 transition-colors mt-6 shadow-lg">
              {{ t('serviceVacances.plans.premiumSuper.cta') }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
    </div>
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-8">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { serviceService } from '../services/serviceService'
import { useI18n } from '../composables/useI18n'

const { t } = useI18n()
const data = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    const response = await serviceService.getServiceData('service-vacances')
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
.service-vacances {
  min-height: 100vh;
}

.hero-background {
  background: linear-gradient(to bottom,
      #87CEEB 0%,
      #87CEEB 30%,
      #98D8C8 30%,
      #98D8C8 50%,
      #A8E6CF 50%,
      #A8E6CF 70%,
      #B8F0D8 70%,
      #B8F0D8 100%);
  position: relative;
  overflow: hidden;
}

.hero-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
  background-image:
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.8) 2px, transparent 2px),
    radial-gradient(circle at 60% 20%, rgba(255, 255, 255, 0.6) 3px, transparent 3px),
    radial-gradient(circle at 80% 40%, rgba(255, 255, 255, 0.7) 2px, transparent 2px);
  background-size: 100px 100px, 150px 150px, 120px 120px;
}

.hero-background::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25%;
  background: linear-gradient(to top, #4A90E2 0%, #5BA3F5 100%);
  border-radius: 0 0 1.5rem 1.5rem;
}
</style>
