import fs from 'fs';
import path from 'path';

const requiredFiles = [
  'public/manifest.json',
  'public/favicon.ico',
  'public/browserconfig.xml',
  'public/icons/icon-16x16.png',
  'public/icons/icon-32x32.png',
  'public/icons/icon-72x72.png',
  'public/icons/icon-96x96.png',
  'public/icons/icon-128x128.png',
  'public/icons/icon-144x144.png',
  'public/icons/icon-152x152.png',
  'public/icons/icon-192x192.png',
  'public/icons/icon-384x384.png',
  'public/icons/icon-512x512.png',
  'public/icons/menu-icon.png',
  'public/icons/reservation-icon.png'
];

const requiredSizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

function validateManifest() {
  try {
    const manifestPath = 'public/manifest.json';
    if (!fs.existsSync(manifestPath)) {
      console.error('❌ manifest.json manquant');
      return false;
    }

    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Vérifications de base
    const requiredFields = ['name', 'short_name', 'start_url', 'display', 'background_color', 'theme_color'];
    for (const field of requiredFields) {
      if (!manifest[field]) {
        console.error(`❌ Champ manquant dans manifest.json: ${field}`);
        return false;
      }
    }

    // Vérifier les icônes
    if (!manifest.icons || manifest.icons.length === 0) {
      console.error('❌ Aucune icône définie dans manifest.json');
      return false;
    }

    // Vérifier les tailles d'icônes
    const iconSizes = manifest.icons.map(icon => {
      const sizes = icon.sizes.split(' ');
      return sizes.map(size => parseInt(size.split('x')[0]));
    }).flat();

    for (const size of requiredSizes) {
      if (!iconSizes.includes(size)) {
        console.error(`❌ Taille d'icône manquante: ${size}x${size}`);
        return false;
      }
    }

    console.log('✅ Manifest.json valide');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors de la validation du manifest:', error.message);
    return false;
  }
}

function validateFiles() {
  let allValid = true;
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      console.error(`❌ Fichier manquant: ${file}`);
      allValid = false;
    } else {
      console.log(`✅ ${file}`);
    }
  }
  
  return allValid;
}

function validateIcons() {
  const iconsDir = 'public/icons';
  if (!fs.existsSync(iconsDir)) {
    console.error('❌ Dossier icons manquant');
    return false;
  }

  const files = fs.readdirSync(iconsDir);
  const iconFiles = files.filter(file => file.endsWith('.png'));
  
  if (iconFiles.length < requiredSizes.length) {
    console.error(`❌ Nombre d'icônes insuffisant. Attendu: ${requiredSizes.length}, Trouvé: ${iconFiles.length}`);
    return false;
  }

  console.log('✅ Toutes les icônes sont présentes');
  return true;
}

function main() {
  console.log('🔍 Validation de la configuration PWA...\n');
  
  const manifestValid = validateManifest();
  const filesValid = validateFiles();
  const iconsValid = validateIcons();
  
  console.log('\n📊 Résumé:');
  console.log(`Manifest: ${manifestValid ? '✅' : '❌'}`);
  console.log(`Fichiers: ${filesValid ? '✅' : '❌'}`);
  console.log(`Icônes: ${iconsValid ? '✅' : '❌'}`);
  
  if (manifestValid && filesValid && iconsValid) {
    console.log('\n🎉 Configuration PWA valide !');
    process.exit(0);
  } else {
    console.log('\n⚠️  Problèmes détectés dans la configuration PWA');
    process.exit(1);
  }
}

main(); 