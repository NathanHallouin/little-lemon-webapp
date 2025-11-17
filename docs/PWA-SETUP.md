# Configuration PWA - Little Lemon WebApp

## Vue d'ensemble

Cette application utilise une configuration PWA (Progressive Web App) complète avec manifest.json, favicon et icônes optimisées pour tous les appareils.

## Structure des fichiers

```
public/
├── manifest.json          # Manifest PWA principal
├── favicon.ico           # Favicon classique
├── browserconfig.xml     # Configuration Microsoft Edge
└── icons/               # Icônes PWA optimisées
    ├── icon-16x16.png
    ├── icon-32x32.png
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    ├── icon-512x512.png
    ├── menu-icon.png
    └── reservation-icon.png
```

## Génération des icônes

### Prérequis

```bash
npm install --save-dev sharp
```

### Génération automatique

```bash
npm run generate-icons
```

Ce script va :
1. Créer le dossier `public/icons/` s'il n'existe pas
2. Générer toutes les tailles d'icônes à partir de `public/logo.jpg`
3. Créer les icônes pour les raccourcis PWA

## Configuration du manifest.json

Le manifest.json inclut :

- **Informations de base** : nom, description, langue
- **Configuration PWA** : mode standalone, couleurs de thème
- **Icônes complètes** : toutes les tailles nécessaires
- **Raccourcis** : accès rapide au menu et aux réservations
- **Captures d'écran** : pour l'installation PWA

## Support des navigateurs

### Chrome/Edge
- Utilise le manifest.json
- Icônes 192x192 et 512x512 pour l'installation

### Safari (iOS)
- Apple Touch Icons pour l'ajout à l'écran d'accueil
- Tailles : 72x72 à 512x512

### Firefox
- Support complet du manifest.json
- Icônes adaptatives

### Microsoft Edge
- browserconfig.xml pour les tuiles
- Couleur de thème personnalisée

## Métadonnées SEO

L'application inclut des métadonnées complètes pour :
- Réseaux sociaux (Open Graph, Twitter Cards)
- SEO (description, mots-clés)
- Accessibilité (WCAG 2.1 AA)
- PWA (theme-color, apple-mobile-web-app-capable)

## Maintenance

### Ajout de nouvelles icônes

1. Ajoutez la taille dans le tableau `sizes` du script
2. Exécutez `npm run generate-icons`
3. Mettez à jour le manifest.json si nécessaire

### Modification du logo

1. Remplacez `public/logo.jpg`
2. Exécutez `npm run generate-icons`
3. Vérifiez que toutes les icônes sont correctement générées

## Tests

Pour tester la configuration PWA :

1. Ouvrez l'application dans Chrome
2. Ouvrez les DevTools (F12)
3. Allez dans l'onglet "Application"
4. Vérifiez la section "Manifest"
5. Testez l'installation PWA

## Optimisations

- Icônes au format PNG pour une meilleure qualité
- Favicon ICO pour la compatibilité maximale
- Manifest JSON valide selon les spécifications W3C
- Support complet des raccourcis PWA 