import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];
const inputLogo = './public/logo.jpg';
const outputDir = './public/icons';

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateIcons() {
  try {
    console.log('🔄 Génération des icônes PWA...');
    
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
      
      await sharp(inputLogo)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Icône ${size}x${size} générée`);
    }
    
    // Générer les icônes pour les raccourcis
    await sharp(inputLogo)
      .resize(96, 96, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(outputDir, 'menu-icon.png'));
    
    await sharp(inputLogo)
      .resize(96, 96, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(outputDir, 'reservation-icon.png'));
    
    console.log('✅ Icônes de raccourcis générées');
    console.log('🎉 Toutes les icônes PWA ont été générées avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la génération des icônes:', error);
    process.exit(1);
  }
}

generateIcons(); 