#!/usr/bin/env node
/**
 * Quick script to add missing waitlist and help translations
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');

const translations = {
  'fr': {
    waitlist: {
      title: "Rejoindre la liste d'attente",
      subtitle: "Soyez le premier informé du lancement de MeasureMint. Obtenez un accès anticipé et des mises à jour exclusives.",
      form: {
        name: "Nom complet",
        email: "Adresse e-mail",
        profession: "Profession",
        company: "Nom de l'entreprise",
        submit: "Rejoindre la liste",
        submitting: "Inscription en cours...",
        placeholders: {
          name: "Jean Dupont",
          email: "jean@entreprise.com",
          profession: "ex: Architecte, Ingénieur, Chef de projet",
          company: "Votre entreprise"
        }
      },
      success: {
        title: "Vous êtes sur la liste !",
        text: "Merci d'avoir rejoint la liste d'attente MeasureMint,",
        subtext: "Nous enverrons les mises à jour et les informations d'accès anticipé à",
        nextSteps: "Que se passe-t-il ensuite ?",
        confirmation: {
          title: "E-mail de confirmation",
          text: "Vérifiez votre boîte de réception pour une confirmation"
        },
        launch: {
          title: "Notification de lancement",
          text: "Soyez le premier informé de notre lancement"
        },
        earlyAccess: {
          title: "Accès anticipé",
          text: "Obtenez un accès anticipé exclusif"
        },
        backToHome: "← Retour à l'accueil"
      },
      privacyNote: "Nous respectons votre vie privée. Vos informations seront uniquement utilisées pour vous contacter concernant MeasureMint."
    }
  },
  'es': {
    waitlist: {
      title: "Únete a la lista de espera",
      subtitle: "Sé el primero en saber cuándo se lanza MeasureMint. Obtén acceso anticipado y actualizaciones exclusivas.",
      form: {
        name: "Nombre completo",
        email: "Dirección de correo electrónico",
        profession: "Profesión",
        company: "Nombre de la empresa",
        submit: "Unirse a la lista",
        submitting: "Uniéndose...",
        placeholders: {
          name: "Juan Pérez",
          email: "juan@empresa.com",
          profession: "ej: Arquitecto, Ingeniero, Gerente de Proyecto",
          company: "Tu empresa"
        }
      },
      success: {
        title: "¡Estás en la lista!",
        text: "Gracias por unirte a la lista de espera de MeasureMint,",
        subtext: "Enviaremos actualizaciones e información de acceso anticipado a",
        nextSteps: "¿Qué sigue?",
        confirmation: {
          title: "Correo de confirmación",
          text: "Revisa tu bandeja de entrada para una confirmación"
        },
        launch: {
          title: "Notificación de lanzamiento",
          text: "Sé el primero en saber cuándo lanzamos"
        },
        earlyAccess: {
          title: "Acceso anticipado",
          text: "Obtén acceso anticipado exclusivo"
        },
        backToHome: "← Volver al inicio"
      },
      privacyNote: "Respetamos tu privacidad. Tu información solo se usará para contactarte sobre MeasureMint."
    }
  },
  'de': {
    waitlist: {
      title: "Warteliste beitreten",
      subtitle: "Erfahren Sie als Erster, wann MeasureMint startet. Erhalten Sie frühen Zugang und exklusive Updates.",
      form: {
        name: "Vollständiger Name",
        email: "E-Mail-Adresse",
        profession: "Beruf",
        company: "Firmenname",
        submit: "Warteliste beitreten",
        submitting: "Wird beigetreten...",
        placeholders: {
          name: "Max Mustermann",
          email: "max@unternehmen.com",
          profession: "z.B. Architekt, Ingenieur, Projektmanager",
          company: "Ihr Unternehmen"
        }
      },
      success: {
        title: "Sie sind auf der Liste!",
        text: "Vielen Dank, dass Sie der MeasureMint-Warteliste beigetreten sind,",
        subtext: "Wir senden Updates und Informationen zum frühen Zugang an",
        nextSteps: "Was passiert als Nächstes?",
        confirmation: {
          title: "Bestätigungs-E-Mail",
          text: "Überprüfen Sie Ihren Posteingang auf eine Bestätigung"
        },
        launch: {
          title: "Startbenachrichtigung",
          text: "Erfahren Sie als Erster, wann wir starten"
        },
        earlyAccess: {
          title: "Früher Zugang",
          text: "Erhalten Sie exklusiven frühen Zugang"
        },
        backToHome: "← Zurück zur Startseite"
      },
      privacyNote: "Wir respektieren Ihre Privatsphäre. Ihre Informationen werden nur verwendet, um Sie über MeasureMint zu kontaktieren."
    }
  }
};

// Function to deep merge
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Update files
Object.keys(translations).forEach(locale => {
  const filePath = path.join(messagesDir, `${locale}.json`);
  if (fs.existsSync(filePath)) {
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      deepMerge(content, translations[locale]);
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
      console.log(`✓ Updated ${locale}.json`);
    } catch (error) {
      console.error(`✗ Error updating ${locale}.json:`, error.message);
    }
  }
});

console.log('\nTranslation update complete!');

