/**
 * Script to translate all missing keys in all language files
 * This will add proper translations for all the missing sections
 */

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../messages');

// Translation mappings for each language
const translations = {
  'ru': {
    hero: {
      title: "Измерения в Miro, Наконец-то!",
      subtitle: "Профессиональный инструмент для измерения и калибровки для дизайнеров. Масштабирование и измерение чертежей в Miro, впервые в истории!",
      ctaSecondary: "Присоединиться к списку ожидания"
    },
    problem: {
      title: "Проблема",
      description: "Измерение чертежей на досках Miro разочаровывает. Вы не можете получить точные размеры из чертежей, планов этажей или технических чертежей без сложных обходных путей."
    },
    solution: {
      title: "Решение",
      description: "MeasureMint решает это с помощью инструментов измерения профессионального уровня, встроенных непосредственно в Miro. Откалибруйте один раз, измерьте что угодно."
    },
    features: {
      title: "Создано для профессионалов",
      calibration: {
        title: "Точная калибровка масштаба",
        description: "Установите известное расстояние для создания точного масштаба. Работает с любым чертежом, планом или технической диаграммой. Однократная калибровка на чертеж."
      },
      measurements: {
        title: "Профессиональные измерения",
        description: "Измеряйте любое расстояние на откалиброванных чертежах. Визуальная обратная связь с четкими маркерами непосредственно на доске."
      },
      units: {
        title: "Двойные системы единиц",
        description: "Полная поддержка имперской и метрической систем. 8 типов единиц: Футы, дюймы, ярды, мили, метры, сантиметры, миллиметры, километры."
      },
      noSelection: {
        title: "Выбор изображения не требуется",
        description: "Измеряйте в любом месте доски мгновенно. Работает с любым чертежом, PDF или изображением. Бесшовная интеграция с рабочим процессом Miro."
      },
      tracking: {
        title: "Отслеживание измерений",
        description: "Просматривайте последнее измерение, которое было рассчитано, чтобы вы никогда не теряли отслеживание своей доски."
      },
      professionalGrade: {
        title: "Профессиональный уровень",
        description: "Создано архитекторами, инженерами и профессионалами дизайна."
      }
    },
    useCases: {
      title: "Идеально для",
      construction: { title: "Строительные чертежи", description: "Измерение размеров, проверка спецификаций, проверка зазоров" },
      floorPlans: { title: "Планы этажей", description: "Планирование пространства, размеры комнат, расстановка мебели" },
      sitePlans: { title: "Планы участков", description: "Измерения недвижимости, размеры участков, анализ участка" },
      technicalDrawings: { title: "Технические чертежи", description: "Инженерные схемы, механические чертежи, диаграммы" },
      architecturalDesigns: { title: "Архитектурные проекты", description: "Фасады, разрезы, детальные чертежи" },
      interiorDesign: { title: "Дизайн интерьера", description: "Размещение мебели, расстояние между приборами, расчеты материалов" }
    },
    howItWorks: {
      title: "Начните за 60 секунд",
      step1: {
        title: "Калибровка масштаба",
        description: "Нажмите на две точки известного расстояния (например, \"20 футов\" на вашем чертеже). Введите фактическое расстояние. Выберите единицу измерения. Готово! Ваш масштаб установлен."
      },
      step2: {
        title: "Измерьте что угодно",
        description: "Нажмите \"Измерить расстояние\". Нажмите на любые две точки на вашем чертеже. Увидьте мгновенные измерения с полными преобразованиями единиц."
      },
      step3: {
        title: "Переключайте единицы в любое время",
        description: "Переключайтесь между имперской (🇺🇸) и метрической (🌍) системами. При установке линии калибровки или расчете измерения нажмите на единицу, которую вы предпочитаете."
      },
      guideLink: "См. подробное руководство →"
    },
    targetAudience: {
      title: "Создано для профессионалов, требующих точности",
      item1: "Архитекторы и архитектурные фирмы",
      item2: "Инженеры (гражданские, механические, структурные)",
      item3: "Менеджеры строительных проектов",
      item4: "Дизайнеры интерьеров",
      item5: "Профессионалы в сфере недвижимости",
      item6: "Менеджеры объектов",
      item7: "Все, кто работает с техническими чертежами в Miro"
    },
    finalCta: {
      title: "Готовы измерять с точностью?",
      subtitle: "Присоединяйтесь к архитекторам и инженерам, которые доверяют MeasureMint для точных измерений в Miro.",
      launchApp: "Запустить MeasureMint",
      viewDocumentation: "Просмотреть документацию"
    }
  },
  'pt-BR': {
    hero: {
      title: "Medições no Miro, Finalmente!",
      subtitle: "Ferramenta profissional de medição e calibração para designers. Escalar e medir desenhos no Miro, pela primeira vez!",
      ctaSecondary: "Entrar na Lista de Espera"
    },
    problem: {
      title: "O Problema",
      description: "Medir desenhos em quadros do Miro é frustrante. Você não consegue obter dimensões precisas de plantas, plantas baixas ou desenhos técnicos sem soluções complicadas."
    },
    solution: {
      title: "A Solução",
      description: "O MeasureMint resolve isso com ferramentas de medição de nível profissional integradas diretamente no Miro. Calibre uma vez, meça qualquer coisa."
    },
    features: {
      title: "Construído para profissionais",
      calibration: {
        title: "Calibração de Escala Precisa",
        description: "Defina uma distância conhecida para estabelecer uma escala precisa. Funciona com qualquer desenho, planta ou diagrama técnico. Calibração única por desenho."
      },
      measurements: {
        title: "Medições Profissionais",
        description: "Meça qualquer distância em desenhos calibrados. Feedback visual com marcadores claros diretamente no quadro."
      },
      units: {
        title: "Sistemas de Unidades Duplas",
        description: "Suporte completo para Imperial e Métrico. 8 tipos de unidades: Pés, polegadas, jardas, milhas, metros, centímetros, milímetros, quilômetros."
      },
      noSelection: {
        title: "Não É Necessário Selecionar Imagem",
        description: "Meça em qualquer lugar do quadro instantaneamente. Funciona com qualquer desenho, PDF ou imagem. Integração perfeita com o fluxo de trabalho do Miro."
      },
      tracking: {
        title: "Rastreamento de Medições",
        description: "Visualize a última medição que foi calculada para que você nunca perca o controle do seu quadro."
      },
      professionalGrade: {
        title: "Nível Profissional",
        description: "Construído por e para arquitetos, engenheiros e profissionais de design."
      }
    },
    useCases: {
      title: "Perfeito para",
      construction: { title: "Plantas de Construção", description: "Medir dimensões, verificar especificações, verificar folgas" },
      floorPlans: { title: "Plantas Baixas", description: "Planejamento de espaço, dimensões de quartos, layouts de móveis" },
      sitePlans: { title: "Plantas de Lote", description: "Medições de propriedades, dimensões de lotes, análise de local" },
      technicalDrawings: { title: "Desenhos Técnicos", description: "Esquemas de engenharia, desenhos mecânicos, diagramas" },
      architecturalDesigns: { title: "Projetos Arquitetônicos", description: "Elevações, seções, desenhos de detalhes" },
      interiorDesign: { title: "Design de Interiores", description: "Posicionamento de móveis, espaçamento de acessórios, cálculos de materiais" }
    },
    howItWorks: {
      title: "Comece em 60 segundos",
      step1: {
        title: "Calibrar Escala",
        description: "Clique em dois pontos de uma distância conhecida (como \"20 pés\" no seu desenho). Digite a distância real. Escolha sua unidade. Pronto! Sua escala está definida."
      },
      step2: {
        title: "Meça Qualquer Coisa",
        description: "Clique em \"Medir Distância\". Clique em quaisquer dois pontos no seu desenho. Veja medições instantâneas com conversões completas de unidades."
      },
      step3: {
        title: "Altere Unidades a Qualquer Momento",
        description: "Alternar entre Imperial (🇺🇸) e Métrico (🌍). Ao definir sua linha de calibração ou calcular uma medição, clique na unidade que você prefere."
      },
      guideLink: "Ver guia detalhado →"
    },
    targetAudience: {
      title: "Construído para profissionais que exigem precisão",
      item1: "Arquitetos e escritórios de arquitetura",
      item2: "Engenheiros (civis, mecânicos, estruturais)",
      item3: "Gerentes de projetos de construção",
      item4: "Designers de interiores",
      item5: "Profissionais imobiliários",
      item6: "Gerentes de instalações",
      item7: "Qualquer pessoa que trabalhe com desenhos técnicos no Miro"
    },
    finalCta: {
      title: "Pronto para medir com precisão?",
      subtitle: "Junte-se a arquitetos e engenheiros que confiam no MeasureMint para medições precisas no Miro.",
      launchApp: "Lançar MeasureMint",
      viewDocumentation: "Ver Documentação"
    }
  },
  'de': {
    hero: {
      title: "Messungen in Miro, Endlich!",
      subtitle: "Professionelles Mess- und Kalibrierungstool für Designer. Skalieren und Messen von Zeichnungen in Miro, zum ersten Mal überhaupt!",
      ctaSecondary: "Warteliste beitreten"
    },
    problem: {
      title: "Das Problem",
      description: "Das Messen von Zeichnungen auf Miro-Boards ist frustrierend. Sie können keine genauen Abmessungen von Blaupausen, Grundrissen oder technischen Zeichnungen ohne komplexe Workarounds erhalten."
    },
    solution: {
      title: "Die Lösung",
      description: "MeasureMint löst dies mit professionellen Messwerkzeugen, die direkt in Miro integriert sind. Einmal kalibrieren, alles messen."
    },
    features: {
      title: "Für Profis gebaut",
      calibration: {
        title: "Präzise Skalenkalibrierung",
        description: "Legen Sie eine bekannte Entfernung fest, um eine genaue Skala zu erstellen. Funktioniert mit jeder Zeichnung, Blaupause oder technischen Diagramm. Einmalige Kalibrierung pro Zeichnung."
      },
      measurements: {
        title: "Professionelle Messungen",
        description: "Messen Sie jede Entfernung auf kalibrierten Zeichnungen. Visuelles Feedback mit klaren Markierungen direkt auf dem Board."
      },
      units: {
        title: "Duale Einheitensysteme",
        description: "Vollständige Unterstützung für Imperial und Metrisch. 8 Einheitentypen: Fuß, Zoll, Yards, Meilen, Meter, Zentimeter, Millimeter, Kilometer."
      },
      noSelection: {
        title: "Keine Bildauswahl erforderlich",
        description: "Messen Sie überall auf dem Board sofort. Funktioniert mit jeder Zeichnung, PDF oder Bild. Nahtlose Integration in den Miro-Workflow."
      },
      tracking: {
        title: "Messverfolgung",
        description: "Sehen Sie die letzte berechnete Messung, damit Sie nie den Überblick über Ihr Board verlieren."
      },
      professionalGrade: {
        title: "Professionelle Qualität",
        description: "Gebaut von und für Architekten, Ingenieure und Designprofis."
      }
    },
    useCases: {
      title: "Perfekt für",
      construction: { title: "Baupläne", description: "Abmessungen messen, Spezifikationen überprüfen, Abstände prüfen" },
      floorPlans: { title: "Grundrisse", description: "Raumplanung, Raummaße, Möbelanordnungen" },
      sitePlans: { title: "Geländepläne", description: "Grundstücksmessungen, Grundstücksabmessungen, Geländeanalyse" },
      technicalDrawings: { title: "Technische Zeichnungen", description: "Ingenieurschemata, mechanische Zeichnungen, Diagramme" },
      architecturalDesigns: { title: "Architektonische Entwürfe", description: "Ansichten, Schnitte, Detailzeichnungen" },
      interiorDesign: { title: "Innenarchitektur", description: "Möbelplatzierung, Abstand der Armaturen, Materialberechnungen" }
    },
    howItWorks: {
      title: "In 60 Sekunden loslegen",
      step1: {
        title: "Skala kalibrieren",
        description: "Klicken Sie auf zwei Punkte einer bekannten Entfernung (z. B. \"20 Fuß\" auf Ihrer Zeichnung). Geben Sie die tatsächliche Entfernung ein. Wählen Sie Ihre Einheit. Fertig! Ihre Skala ist eingestellt."
      },
      step2: {
        title: "Alles messen",
        description: "Klicken Sie auf \"Entfernung messen\". Klicken Sie auf zwei beliebige Punkte auf Ihrer Zeichnung. Sehen Sie sofortige Messungen mit vollständigen Einheitenumrechnungen."
      },
      step3: {
        title: "Einheiten jederzeit wechseln",
        description: "Wechseln Sie zwischen Imperial (🇺🇸) und Metrisch (🌍). Beim Festlegen Ihrer Kalibrierungslinie oder Berechnen einer Messung klicken Sie auf die gewünschte Einheit."
      },
      guideLink: "Detaillierte Anleitung ansehen →"
    },
    targetAudience: {
      title: "Für Profis gebaut, die Präzision fordern",
      item1: "Architekten und Architekturbüros",
      item2: "Ingenieure (Bau-, Maschinen-, Struktur-)",
      item3: "Bauprojektmanager",
      item4: "Innenarchitekten",
      item5: "Immobilienfachleute",
      item6: "Facility Manager",
      item7: "Jeder, der mit technischen Zeichnungen in Miro arbeitet"
    },
    finalCta: {
      title: "Bereit, präzise zu messen?",
      subtitle: "Schließen Sie sich Architekten und Ingenieuren an, die MeasureMint für genaue Messungen in Miro vertrauen.",
      launchApp: "MeasureMint starten",
      viewDocumentation: "Dokumentation ansehen"
    }
  },
  'fr': {
    hero: {
      title: "Mesures sur Miro, Enfin!",
      subtitle: "Outil professionnel de mesure et d'étalonnage pour les designers. Mise à l'échelle et mesure de dessins sur Miro, pour la première fois!",
      ctaSecondary: "Rejoindre la liste d'attente"
    },
    problem: {
      title: "Le Problème",
      description: "Mesurer des dessins sur les tableaux Miro est frustrant. Vous ne pouvez pas obtenir des dimensions précises à partir de plans, plans d'étage ou dessins techniques sans solutions de contournement complexes."
    },
    solution: {
      title: "La Solution",
      description: "MeasureMint résout cela avec des outils de mesure de niveau professionnel intégrés directement dans Miro. Calibrez une fois, mesurez n'importe quoi."
    },
    features: {
      title: "Conçu pour les professionnels",
      calibration: {
        title: "Étalonnage d'échelle précis",
        description: "Définissez une distance connue pour établir une échelle précise. Fonctionne avec n'importe quel dessin, plan ou diagramme technique. Calibrage unique par dessin."
      },
      measurements: {
        title: "Mesures professionnelles",
        description: "Mesurez n'importe quelle distance sur des dessins calibrés. Retour visuel avec des marqueurs clairs directement sur le tableau."
      },
      units: {
        title: "Systèmes d'unités doubles",
        description: "Support complet pour Impérial et Métrique. 8 types d'unités: Pieds, pouces, yards, miles, mètres, centimètres, millimètres, kilomètres."
      },
      noSelection: {
        title: "Aucune sélection d'image requise",
        description: "Mesurez n'importe où sur le tableau instantanément. Fonctionne avec n'importe quel dessin, PDF ou image. Intégration transparente avec le flux de travail Miro."
      },
      tracking: {
        title: "Suivi des mesures",
        description: "Visualisez la dernière mesure qui a été calculée pour ne jamais perdre le suivi de votre tableau."
      },
      professionalGrade: {
        title: "Niveau professionnel",
        description: "Conçu par et pour les architectes, ingénieurs et professionnels du design."
      }
    },
    useCases: {
      title: "Parfait pour",
      construction: { title: "Plans de construction", description: "Mesurer les dimensions, vérifier les spécifications, vérifier les dégagements" },
      floorPlans: { title: "Plans d'étage", description: "Planification de l'espace, dimensions des pièces, agencement des meubles" },
      sitePlans: { title: "Plans de site", description: "Mesures de propriété, dimensions de lot, analyse de site" },
      technicalDrawings: { title: "Dessins techniques", description: "Schémas d'ingénierie, dessins mécaniques, diagrammes" },
      architecturalDesigns: { title: "Conceptions architecturales", description: "Élévations, sections, dessins de détails" },
      interiorDesign: { title: "Design d'intérieur", description: "Placement des meubles, espacement des appareils, calculs de matériaux" }
    },
    howItWorks: {
      title: "Commencez en 60 secondes",
      step1: {
        title: "Calibrer l'échelle",
        description: "Cliquez sur deux points d'une distance connue (comme \"20 pieds\" sur votre dessin). Entrez la distance réelle. Choisissez votre unité. Terminé! Votre échelle est définie."
      },
      step2: {
        title: "Mesurez n'importe quoi",
        description: "Cliquez sur \"Mesurer la distance\". Cliquez sur deux points quelconques sur votre dessin. Voyez des mesures instantanées avec des conversions d'unités complètes."
      },
      step3: {
        title: "Changez d'unités à tout moment",
        description: "Basculez entre Impérial (🇺🇸) et Métrique (🌍). Lors de la définition de votre ligne d'étalonnage ou du calcul d'une mesure, cliquez sur l'unité que vous préférez."
      },
      guideLink: "Voir le guide détaillé →"
    },
    targetAudience: {
      title: "Conçu pour les professionnels qui exigent la précision",
      item1: "Architectes et cabinets d'architecture",
      item2: "Ingénieurs (civils, mécaniques, structurels)",
      item3: "Chefs de projet de construction",
      item4: "Designers d'intérieur",
      item5: "Professionnels de l'immobilier",
      item6: "Gestionnaires d'installations",
      item7: "Toute personne travaillant avec des dessins techniques sur Miro"
    },
    finalCta: {
      title: "Prêt à mesurer avec précision?",
      subtitle: "Rejoignez les architectes et ingénieurs qui font confiance à MeasureMint pour des mesures précises sur Miro.",
      launchApp: "Lancer MeasureMint",
      viewDocumentation: "Voir la documentation"
    }
  },
  'nl': {
    hero: {
      title: "Metingen in Miro, Eindelijk!",
      subtitle: "Professioneel meet- en kalibratiegereedschap voor ontwerpers. Tekeningen schalen en meten in Miro, voor het eerst ooit!",
      ctaSecondary: "Wachtlijst bijwonen"
    },
    problem: {
      title: "Het Probleem",
      description: "Het meten van tekeningen op Miro-borden is frustrerend. Je kunt geen nauwkeurige afmetingen krijgen van blauwdrukken, plattegronden of technische tekeningen zonder complexe workarounds."
    },
    solution: {
      title: "De Oplossing",
      description: "MeasureMint lost dit op met professionele meetgereedschappen die direct in Miro zijn ingebouwd. Kalibreer eenmaal, meet alles."
    },
    features: {
      title: "Gebouwd voor professionals",
      calibration: {
        title: "Nauwkeurige schaalkalibratie",
        description: "Stel een bekende afstand in om een nauwkeurige schaal vast te stellen. Werkt met elke tekening, blauwdruk of technisch diagram. Eenmalige kalibratie per tekening."
      },
      measurements: {
        title: "Professionele metingen",
        description: "Meet elke afstand op gekalibreerde tekeningen. Visuele feedback met duidelijke markeringen direct op het bord."
      },
      units: {
        title: "Dubbele eenheidssystemen",
        description: "Volledige ondersteuning voor Imperiaal en Metrisch. 8 eenheidstypen: Voeten, inches, yards, mijlen, meters, centimeters, millimeters, kilometers."
      },
      noSelection: {
        title: "Geen beeldselectie vereist",
        description: "Meet overal op het bord direct. Werkt met elke tekening, PDF of afbeelding. Naadloze integratie met Miro-workflow."
      },
      tracking: {
        title: "Meting tracking",
        description: "Bekijk de laatste meting die is berekend, zodat je nooit het overzicht over je bord verliest."
      },
      professionalGrade: {
        title: "Professioneel niveau",
        description: "Gebouwd door en voor architecten, ingenieurs en ontwerpprofessionals."
      }
    },
    useCases: {
      title: "Perfect voor",
      construction: { title: "Bouwkundige tekeningen", description: "Afmetingen meten, specificaties verifiëren, ruimtes controleren" },
      floorPlans: { title: "Plattegronden", description: "Ruimteplanning, kamerafmetingen, meubelindelingen" },
      sitePlans: { title: "Terreinplannen", description: "Eigendomsmetingen, perceelafmetingen, terreinanalyse" },
      technicalDrawings: { title: "Technische tekeningen", description: "Ingenieurschema's, mechanische tekeningen, diagrammen" },
      architecturalDesigns: { title: "Architectonische ontwerpen", description: "Gevels, doorsneden, detailtekeningen" },
      interiorDesign: { title: "Interieurontwerp", description: "Meubelplaatsing, armatuurspatiëring, materiaalberekeningen" }
    },
    howItWorks: {
      title: "Begin in 60 seconden",
      step1: {
        title: "Schaal kalibreren",
        description: "Klik op twee punten van een bekende afstand (zoals \"20 voet\" op je tekening). Voer de werkelijke afstand in. Kies je eenheid. Klaar! Je schaal is ingesteld."
      },
      step2: {
        title: "Meet alles",
        description: "Klik op \"Afstand meten\". Klik op twee willekeurige punten op je tekening. Zie directe metingen met volledige eenheidsconversies."
      },
      step3: {
        title: "Wissel eenheden altijd",
        description: "Schakel tussen Imperiaal (🇺🇸) en Metrisch (🌍). Bij het instellen van je kalibratielijn of het berekenen van een meting, klik op de eenheid die je voorkeur heeft."
      },
      guideLink: "Zie gedetailleerde gids →"
    },
    targetAudience: {
      title: "Gebouwd voor professionals die precisie eisen",
      item1: "Architecten en architectenbureaus",
      item2: "Ingenieurs (civiel, mechanisch, structureel)",
      item3: "Bouwprojectmanagers",
      item4: "Interieurontwerpers",
      item5: "Vastgoedprofessionals",
      item6: "Facility managers",
      item7: "Iedereen die werkt met technische tekeningen in Miro"
    },
    finalCta: {
      title: "Klaar om met precisie te meten?",
      subtitle: "Sluit je aan bij architecten en ingenieurs die MeasureMint vertrouwen voor nauwkeurige metingen in Miro.",
      launchApp: "MeasureMint starten",
      viewDocumentation: "Documentatie bekijken"
    }
  },
  'sv': {
    hero: {
      title: "Mätningar i Miro, Äntligen!",
      subtitle: "Professionellt mät- och kalibreringsverktyg för designers. Skalning och mätning av ritningar i Miro, för första gången någonsin!",
      ctaSecondary: "Gå med i väntelistan"
    },
    problem: {
      title: "Problemet",
      description: "Att mäta ritningar på Miro-brädor är frustrerande. Du kan inte få exakta dimensioner från ritningar, planritningar eller tekniska ritningar utan komplexa lösningar."
    },
    solution: {
      title: "Lösningen",
      description: "MeasureMint löser detta med professionella mätverktyg inbyggda direkt i Miro. Kalibrera en gång, mät vad som helst."
    },
    features: {
      title: "Byggt för professionella",
      calibration: {
        title: "Exakt skalkalibrering",
        description: "Ställ in ett känt avstånd för att skapa en exakt skala. Fungerar med vilken ritning, ritning eller teknisk diagram som helst. Engångskalibrering per ritning."
      },
      measurements: {
        title: "Professionella mätningar",
        description: "Mät vilket avstånd som helst på kalibrerade ritningar. Visuell feedback med tydliga markörer direkt på tavlan."
      },
      units: {
        title: "Dubbla enhetssystem",
        description: "Fullt stöd för Imperial och Metrisk. 8 enhetstyper: Fot, tum, yards, miles, meter, centimeter, millimeter, kilometer."
      },
      noSelection: {
        title: "Ingen bildval krävs",
        description: "Mät var som helst på tavlan direkt. Fungerar med vilken ritning, PDF eller bild som helst. Sömlös integration med Miro-arbetsflöde."
      },
      tracking: {
        title: "Mätningsspårning",
        description: "Visa den senaste mätningen som beräknades så att du aldrig tappar bort din tavla."
      },
      professionalGrade: {
        title: "Professionell nivå",
        description: "Byggt av och för arkitekter, ingenjörer och designprofessionella."
      }
    },
    useCases: {
      title: "Perfekt för",
      construction: { title: "Byggritningar", description: "Mät dimensioner, verifiera specifikationer, kontrollera avstånd" },
      floorPlans: { title: "Planritningar", description: "Rumsplanering, rumsdimensioner, möbelinredningar" },
      sitePlans: { title: "Terrängplaner", description: "Fastighetsmätningar, tomtdimensioner, platsanalys" },
      technicalDrawings: { title: "Tekniska ritningar", description: "Ingenjörsscheman, mekaniska ritningar, diagram" },
      architecturalDesigns: { title: "Arkitektoniska design", description: "Fasader, sektioner, detaljritningar" },
      interiorDesign: { title: "Inredningsdesign", description: "Möbelplacering, armaturspacing, materialberäkningar" }
    },
    howItWorks: {
      title: "Kom igång på 60 sekunder",
      step1: {
        title: "Kalibrera skala",
        description: "Klicka på två punkter med ett känt avstånd (som \"20 fot\" på din ritning). Ange det faktiska avståndet. Välj din enhet. Klart! Din skala är inställd."
      },
      step2: {
        title: "Mät vad som helst",
        description: "Klicka på \"Mät avstånd\". Klicka på två valfria punkter på din ritning. Se omedelbara mätningar med fullständiga enhetsomvandlingar."
      },
      step3: {
        title: "Växla enheter när som helst",
        description: "Växla mellan Imperial (🇺🇸) och Metrisk (🌍). När du ställer in din kalibreringslinje eller beräknar en mätning, klicka på den enhet du föredrar."
      },
      guideLink: "Se detaljerad guide →"
    },
    targetAudience: {
      title: "Byggt för professionella som kräver precision",
      item1: "Arkitekter och arkitektbyrår",
      item2: "Ingenjörer (bygg, mekanisk, strukturell)",
      item3: "Byggprojektchefer",
      item4: "Inredningsarkitekter",
      item5: "Fastighetsprofessionella",
      item6: "Anläggningschefer",
      item7: "Alla som arbetar med tekniska ritningar i Miro"
    },
    finalCta: {
      title: "Redo att mäta med precision?",
      subtitle: "Gå med arkitekter och ingenjörer som litar på MeasureMint för exakta mätningar i Miro.",
      launchApp: "Starta MeasureMint",
      viewDocumentation: "Visa dokumentation"
    }
  },
  'it': {
    hero: {
      title: "Misure su Miro, Finalmente!",
      subtitle: "Strumento professionale di misurazione e calibrazione per designer. Scalare e misurare disegni su Miro, per la prima volta!",
      ctaSecondary: "Unisciti alla Lista d'Attesa"
    },
    problem: {
      title: "Il Problema",
      description: "Misurare disegni su tavole Miro è frustrante. Non puoi ottenere dimensioni accurate da progetti, planimetrie o disegni tecnici senza soluzioni complesse."
    },
    solution: {
      title: "La Soluzione",
      description: "MeasureMint risolve questo con strumenti di misurazione di livello professionale integrati direttamente in Miro. Calibra una volta, misura qualsiasi cosa."
    },
    features: {
      title: "Costruito per professionisti",
      calibration: {
        title: "Calibrazione della scala precisa",
        description: "Imposta una distanza nota per stabilire una scala accurata. Funziona con qualsiasi disegno, progetto o diagramma tecnico. Calibrazione una tantum per disegno."
      },
      measurements: {
        title: "Misure professionali",
        description: "Misura qualsiasi distanza su disegni calibrati. Feedback visivo con marcatori chiari direttamente sulla tavola."
      },
      units: {
        title: "Sistemi di unità doppi",
        description: "Supporto completo per Imperiale e Metrico. 8 tipi di unità: Piedi, pollici, iarde, miglia, metri, centimetri, millimetri, chilometri."
      },
      noSelection: {
        title: "Nessuna selezione immagine richiesta",
        description: "Misura ovunque sulla tavola istantaneamente. Funziona con qualsiasi disegno, PDF o immagine. Integrazione perfetta con il flusso di lavoro Miro."
      },
      tracking: {
        title: "Tracciamento delle misure",
        description: "Visualizza l'ultima misurazione calcolata in modo da non perdere mai traccia della tua tavola."
      },
      professionalGrade: {
        title: "Livello professionale",
        description: "Costruito da e per architetti, ingegneri e professionisti del design."
      }
    },
    useCases: {
      title: "Perfetto per",
      construction: { title: "Progetti di costruzione", description: "Misurare dimensioni, verificare specifiche, controllare spazi liberi" },
      floorPlans: { title: "Planimetrie", description: "Pianificazione spaziale, dimensioni delle stanze, layout dei mobili" },
      sitePlans: { title: "Piani di sito", description: "Misurazioni di proprietà, dimensioni del lotto, analisi del sito" },
      technicalDrawings: { title: "Disegni tecnici", description: "Schemi ingegneristici, disegni meccanici, diagrammi" },
      architecturalDesigns: { title: "Progetti architettonici", description: "Prospetti, sezioni, disegni di dettaglio" },
      interiorDesign: { title: "Design d'interni", description: "Posizionamento mobili, spaziatura apparecchi, calcoli materiali" }
    },
    howItWorks: {
      title: "Inizia in 60 secondi",
      step1: {
        title: "Calibra la scala",
        description: "Clicca su due punti di una distanza nota (come \"20 piedi\" sul tuo disegno). Inserisci la distanza effettiva. Scegli la tua unità. Fatto! La tua scala è impostata."
      },
      step2: {
        title: "Misura qualsiasi cosa",
        description: "Clicca su \"Misura distanza\". Clicca su due punti qualsiasi sul tuo disegno. Vedi misurazioni istantanee con conversioni complete delle unità."
      },
      step3: {
        title: "Cambia unità in qualsiasi momento",
        description: "Passa tra Imperiale (🇺🇸) e Metrico (🌍). Quando imposti la tua linea di calibrazione o calcoli una misurazione, clicca sull'unità che preferisci."
      },
      guideLink: "Vedi guida dettagliata →"
    },
    targetAudience: {
      title: "Costruito per professionisti che richiedono precisione",
      item1: "Architetti e studi di architettura",
      item2: "Ingegneri (civili, meccanici, strutturali)",
      item3: "Project manager di costruzione",
      item4: "Designer d'interni",
      item5: "Professionisti immobiliari",
      item6: "Facility manager",
      item7: "Chiunque lavori con disegni tecnici su Miro"
    },
    finalCta: {
      title: "Pronto a misurare con precisione?",
      subtitle: "Unisciti ad architetti e ingegneri che si fidano di MeasureMint per misurazioni accurate su Miro.",
      launchApp: "Avvia MeasureMint",
      viewDocumentation: "Visualizza documentazione"
    }
  },
  'ar': {
    hero: {
      title: "القياسات في Miro، أخيراً!",
      subtitle: "أداة قياس ومعايرة احترافية للمصممين. قياس وتوسيع الرسومات في Miro، لأول مرة على الإطلاق!",
      ctaSecondary: "الانضمام إلى قائمة الانتظار"
    },
    problem: {
      title: "المشكلة",
      description: "قياس الرسومات على لوحات Miro محبط. لا يمكنك الحصول على أبعاد دقيقة من المخططات أو المخططات الأرضية أو الرسومات التقنية دون حلول معقدة."
    },
    solution: {
      title: "الحل",
      description: "MeasureMint يحل هذا بأدوات قياس احترافية مدمجة مباشرة في Miro. قم بالمعايرة مرة واحدة، وقياس أي شيء."
    },
    features: {
      title: "مبني للمحترفين",
      calibration: {
        title: "معايرة المقياس الدقيقة",
        description: "قم بتعيين مسافة معروفة لإنشاء مقياس دقيق. يعمل مع أي رسم أو مخطط أو مخطط تقني. معايرة لمرة واحدة لكل رسم."
      },
      measurements: {
        title: "قياسات احترافية",
        description: "قم بقياس أي مسافة على الرسومات المعايرة. ردود فعل بصرية مع علامات واضحة مباشرة على اللوحة."
      },
      units: {
        title: "أنظمة وحدات مزدوجة",
        description: "دعم كامل للإمبراطورية والمترية. 8 أنواع من الوحدات: أقدام، بوصات، ياردات، أميال، أمتار، سنتيمترات، ملليمترات، كيلومترات."
      },
      noSelection: {
        title: "لا يلزم اختيار الصورة",
        description: "قم بالقياس في أي مكان على اللوحة على الفور. يعمل مع أي رسم أو PDF أو صورة. تكامل سلس مع سير عمل Miro."
      },
      tracking: {
        title: "تتبع القياسات",
        description: "عرض آخر قياس تم حسابه حتى لا تفقد أبداً تتبع لوحتك."
      },
      professionalGrade: {
        title: "مستوى احترافي",
        description: "مبني من قبل المهندسين المعماريين والمهندسين ومحترفي التصميم."
      }
    },
    useCases: {
      title: "مثالي لـ",
      construction: { title: "مخططات البناء", description: "قياس الأبعاد، التحقق من المواصفات، فحص المسافات" },
      floorPlans: { title: "المخططات الأرضية", description: "تخطيط المساحة، أبعاد الغرف، تخطيط الأثاث" },
      sitePlans: { title: "مخططات الموقع", description: "قياسات الممتلكات، أبعاد القطع، تحليل الموقع" },
      technicalDrawings: { title: "الرسومات التقنية", description: "المخططات الهندسية، الرسومات الميكانيكية، المخططات" },
      architecturalDesigns: { title: "التصاميم المعمارية", description: "الواجهات، المقاطع، رسومات التفاصيل" },
      interiorDesign: { title: "التصميم الداخلي", description: "وضع الأثاث، تباعد التركيبات، حسابات المواد" }
    },
    howItWorks: {
      title: "ابدأ في 60 ثانية",
      step1: {
        title: "معايرة المقياس",
        description: "انقر على نقطتين بمسافة معروفة (مثل \"20 قدم\" على الرسم الخاص بك). أدخل المسافة الفعلية. اختر وحدتك. تم! تم تعيين المقياس الخاص بك."
      },
      step2: {
        title: "قم بقياس أي شيء",
        description: "انقر على \"قياس المسافة\". انقر على أي نقطتين على الرسم الخاص بك. شاهد القياسات الفورية مع تحويلات الوحدات الكاملة."
      },
      step3: {
        title: "قم بتبديل الوحدات في أي وقت",
        description: "التبديل بين الإمبراطورية (🇺🇸) والمترية (🌍). عند تعيين خط المعايرة أو حساب قياس، انقر على الوحدة التي تفضلها."
      },
      guideLink: "راجع الدليل التفصيلي →"
    },
    targetAudience: {
      title: "مبني للمحترفين الذين يطالبون بالدقة",
      item1: "المهندسون المعماريون وشركات الهندسة المعمارية",
      item2: "المهندسون (المدنيون، الميكانيكيون، الهيكليون)",
      item3: "مديرو مشاريع البناء",
      item4: "مصممو الديكور الداخلي",
      item5: "المهنيون العقاريون",
      item6: "مديرو المرافق",
      item7: "أي شخص يعمل مع الرسومات التقنية في Miro"
    },
    finalCta: {
      title: "هل أنت مستعد للقياس بدقة؟",
      subtitle: "انضم إلى المهندسين المعماريين والمهندسين الذين يثقون في MeasureMint للقياسات الدقيقة في Miro.",
      launchApp: "تشغيل MeasureMint",
      viewDocumentation: "عرض الوثائق"
    }
  },
  'ja': {
    hero: {
      title: "Miroでの測定、ついに！",
      subtitle: "デザイナー向けのプロフェッショナルな測定・キャリブレーションツール。Miroで図面をスケーリングして測定する、初めてのツールです！",
      ctaSecondary: "ウェイトリストに参加"
    },
    problem: {
      title: "問題",
      description: "Miroボードで図面を測定するのはイライラします。複雑な回避策なしでは、設計図、平面図、または技術図面から正確な寸法を得ることができません。"
    },
    solution: {
      title: "解決策",
      description: "MeasureMintは、Miroに直接組み込まれたプロフェッショナルレベルの測定ツールでこれを解決します。一度キャリブレーションすれば、何でも測定できます。"
    },
    features: {
      title: "プロフェッショナル向けに構築",
      calibration: {
        title: "正確なスケールキャリブレーション",
        description: "既知の距離を設定して正確なスケールを確立します。あらゆる図面、設計図、または技術図表で動作します。図面ごとに1回のキャリブレーション。"
      },
      measurements: {
        title: "プロフェッショナルな測定",
        description: "キャリブレーションされた図面で任意の距離を測定します。ボード上に明確なマーカーで視覚的なフィードバックを提供します。"
      },
      units: {
        title: "デュアル単位システム",
        description: "インペリアルとメートル法の完全サポート。8種類の単位：フィート、インチ、ヤード、マイル、メートル、センチメートル、ミリメートル、キロメートル。"
      },
      noSelection: {
        title: "画像選択不要",
        description: "ボード上のどこでも即座に測定できます。あらゆる図面、PDF、または画像で動作します。Miroワークフローとのシームレスな統合。"
      },
      tracking: {
        title: "測定トラッキング",
        description: "計算された最新の測定値を表示して、ボードの追跡を失うことがありません。"
      },
      professionalGrade: {
        title: "プロフェッショナルグレード",
        description: "建築家、エンジニア、デザインプロフェッショナルによって、そして彼らのために構築されました。"
      }
    },
    useCases: {
      title: "に最適",
      construction: { title: "建設設計図", description: "寸法を測定し、仕様を確認し、クリアランスをチェック" },
      floorPlans: { title: "平面図", description: "空間計画、部屋の寸法、家具のレイアウト" },
      sitePlans: { title: "敷地計画", description: "不動産測定、区画寸法、敷地分析" },
      technicalDrawings: { title: "技術図面", description: "エンジニアリング図、機械図面、図表" },
      architecturalDesigns: { title: "建築設計", description: "立面図、断面図、詳細図" },
      interiorDesign: { title: "インテリアデザイン", description: "家具の配置、設備の間隔、材料計算" }
    },
    howItWorks: {
      title: "60秒で始める",
      step1: {
        title: "スケールをキャリブレーション",
        description: "既知の距離の2点をクリックします（図面上の「20フィート」など）。実際の距離を入力します。単位を選択します。完了！スケールが設定されました。"
      },
      step2: {
        title: "何でも測定",
        description: "「距離を測定」をクリックします。図面上の任意の2点をクリックします。完全な単位変換で即座に測定値を確認できます。"
      },
      step3: {
        title: "いつでも単位を切り替え",
        description: "インペリアル（🇺🇸）とメートル法（🌍）を切り替えます。キャリブレーションラインを設定するか、測定値を計算するときは、希望する単位をクリックします。"
      },
      guideLink: "詳細ガイドを見る →"
    },
    targetAudience: {
      title: "精度を要求するプロフェッショナル向けに構築",
      item1: "建築家と建築事務所",
      item2: "エンジニア（土木、機械、構造）",
      item3: "建設プロジェクトマネージャー",
      item4: "インテリアデザイナー",
      item5: "不動産プロフェッショナル",
      item6: "施設管理者",
      item7: "Miroで技術図面を扱うすべての人"
    },
    finalCta: {
      title: "精度を測る準備はできましたか？",
      subtitle: "Miroで正確な測定のためにMeasureMintを信頼する建築家やエンジニアに参加してください。",
      launchApp: "MeasureMintを起動",
      viewDocumentation: "ドキュメントを見る"
    }
  },
  'zh-CN': {
    hero: {
      title: "Miro上的测量，终于来了！",
      subtitle: "面向设计师的专业测量和校准工具。在Miro上缩放和测量图纸，这是第一次！",
      ctaSecondary: "加入候补名单"
    },
    problem: {
      title: "问题",
      description: "在Miro板上测量图纸令人沮丧。没有复杂的变通方法，您无法从蓝图、平面图或技术图纸中获得准确的尺寸。"
    },
    solution: {
      title: "解决方案",
      description: "MeasureMint通过直接内置在Miro中的专业级测量工具解决了这个问题。校准一次，测量任何东西。"
    },
    features: {
      title: "为专业人士打造",
      calibration: {
        title: "精确的比例校准",
        description: "设置已知距离以建立准确的比例。适用于任何图纸、蓝图或技术图表。每个图纸只需校准一次。"
      },
      measurements: {
        title: "专业测量",
        description: "在已校准的图纸上测量任何距离。直接在板上提供清晰的标记视觉反馈。"
      },
      units: {
        title: "双单位系统",
        description: "完全支持英制和公制。8种单位类型：英尺、英寸、码、英里、米、厘米、毫米、公里。"
      },
      noSelection: {
        title: "无需选择图像",
        description: "立即在板上的任何地方进行测量。适用于任何图纸、PDF或图像。与Miro工作流程无缝集成。"
      },
      tracking: {
        title: "测量跟踪",
        description: "查看最新计算的测量值，这样您就永远不会丢失对板的跟踪。"
      },
      professionalGrade: {
        title: "专业级",
        description: "由建筑师、工程师和设计专业人士为建筑师、工程师和设计专业人士打造。"
      }
    },
    useCases: {
      title: "完美适用于",
      construction: { title: "建筑蓝图", description: "测量尺寸，验证规格，检查间隙" },
      floorPlans: { title: "平面图", description: "空间规划，房间尺寸，家具布局" },
      sitePlans: { title: "场地平面图", description: "物业测量，地块尺寸，场地分析" },
      technicalDrawings: { title: "技术图纸", description: "工程示意图，机械图纸，图表" },
      architecturalDesigns: { title: "建筑设计", description: "立面图，剖面图，详图" },
      interiorDesign: { title: "室内设计", description: "家具布置，固定装置间距，材料计算" }
    },
    howItWorks: {
      title: "60秒内开始",
      step1: {
        title: "校准比例",
        description: "点击已知距离上的两个点（例如图纸上的\"20英尺\"）。输入实际距离。选择您的单位。完成！您的比例已设置。"
      },
      step2: {
        title: "测量任何东西",
        description: "点击\"测量距离\"。点击图纸上的任意两个点。查看具有完整单位转换的即时测量值。"
      },
      step3: {
        title: "随时切换单位",
        description: "在英制（🇺🇸）和公制（🌍）之间切换。设置校准线或计算测量值时，点击您喜欢的单位。"
      },
      guideLink: "查看详细指南 →"
    },
    targetAudience: {
      title: "为要求精确度的专业人士打造",
      item1: "建筑师和建筑公司",
      item2: "工程师（土木、机械、结构）",
      item3: "建筑项目经理",
      item4: "室内设计师",
      item5: "房地产专业人士",
      item6: "设施经理",
      item7: "在Miro上使用技术图纸的任何人"
    },
    finalCta: {
      title: "准备好精确测量了吗？",
      subtitle: "加入信任MeasureMint在Miro上进行准确测量的建筑师和工程师。",
      launchApp: "启动MeasureMint",
      viewDocumentation: "查看文档"
    }
  },
  'zh-HK': {
    hero: {
      title: "Miro上的測量，終於來了！",
      subtitle: "面向設計師的專業測量和校準工具。在Miro上縮放和測量圖紙，這是第一次！",
      ctaSecondary: "加入候補名單"
    },
    problem: {
      title: "問題",
      description: "在Miro板上測量圖紙令人沮喪。沒有複雜的變通方法，您無法從藍圖、平面圖或技術圖紙中獲得準確的尺寸。"
    },
    solution: {
      title: "解決方案",
      description: "MeasureMint通過直接內置在Miro中的專業級測量工具解決了這個問題。校準一次，測量任何東西。"
    },
    features: {
      title: "為專業人士打造",
      calibration: {
        title: "精確的比例校準",
        description: "設置已知距離以建立準確的比例。適用於任何圖紙、藍圖或技術圖表。每個圖紙只需校準一次。"
      },
      measurements: {
        title: "專業測量",
        description: "在已校準的圖紙上測量任何距離。直接在板上提供清晰的標記視覺反饋。"
      },
      units: {
        title: "雙單位系統",
        description: "完全支持英制和公制。8種單位類型：英尺、英寸、碼、英里、米、厘米、毫米、公里。"
      },
      noSelection: {
        title: "無需選擇圖像",
        description: "立即在板上的任何地方進行測量。適用於任何圖紙、PDF或圖像。與Miro工作流程無縫集成。"
      },
      tracking: {
        title: "測量跟踪",
        description: "查看最新計算的測量值，這樣您就永遠不會丟失對板的跟踪。"
      },
      professionalGrade: {
        title: "專業級",
        description: "由建築師、工程師和設計專業人士為建築師、工程師和設計專業人士打造。"
      }
    },
    useCases: {
      title: "完美適用於",
      construction: { title: "建築藍圖", description: "測量尺寸，驗證規格，檢查間隙" },
      floorPlans: { title: "平面圖", description: "空間規劃，房間尺寸，家具佈局" },
      sitePlans: { title: "場地平面圖", description: "物業測量，地塊尺寸，場地分析" },
      technicalDrawings: { title: "技術圖紙", description: "工程示意圖，機械圖紙，圖表" },
      architecturalDesigns: { title: "建築設計", description: "立面圖，剖面圖，詳圖" },
      interiorDesign: { title: "室內設計", description: "家具佈置，固定裝置間距，材料計算" }
    },
    howItWorks: {
      title: "60秒內開始",
      step1: {
        title: "校準比例",
        description: "點擊已知距離上的兩個點（例如圖紙上的\"20英尺\"）。輸入實際距離。選擇您的單位。完成！您的比例已設置。"
      },
      step2: {
        title: "測量任何東西",
        description: "點擊\"測量距離\"。點擊圖紙上的任意兩個點。查看具有完整單位轉換的即時測量值。"
      },
      step3: {
        title: "隨時切換單位",
        description: "在英制（🇺🇸）和公制（🌍）之間切換。設置校準線或計算測量值時，點擊您喜歡的單位。"
      },
      guideLink: "查看詳細指南 →"
    },
    targetAudience: {
      title: "為要求精確度的專業人士打造",
      item1: "建築師和建築公司",
      item2: "工程師（土木、機械、結構）",
      item3: "建築項目經理",
      item4: "室內設計師",
      item5: "房地產專業人士",
      item6: "設施經理",
      item7: "在Miro上使用技術圖紙的任何人"
    },
    finalCta: {
      title: "準備好精確測量了嗎？",
      subtitle: "加入信任MeasureMint在Miro上進行準確測量的建築師和工程師。",
      launchApp: "啟動MeasureMint",
      viewDocumentation: "查看文檔"
    }
  }
};

// Function to deep merge translations
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Update each language file
Object.keys(translations).forEach(locale => {
  const filePath = path.join(messagesDir, `${locale}.json`);
  
  if (fs.existsSync(filePath)) {
    try {
      const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Merge translations into home section
      if (!fileContent.home) fileContent.home = {};
      deepMerge(fileContent.home, translations[locale]);
      
      // Write back
      fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2) + '\n', 'utf8');
      console.log(`✓ Updated ${locale}.json`);
    } catch (error) {
      console.error(`✗ Error updating ${locale}.json:`, error.message);
    }
  }
});

console.log('\nTranslation update complete!');

