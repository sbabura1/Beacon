function onOpen() {
  getHostUi()
    .createMenu('SHINE')
    .addItem('Open SHINE Navigator', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Beacon');

  getHostUi().showSidebar(html);
}

function showDialog(initialRoute) {
  const template = HtmlService.createTemplateFromFile('Dialog');
  template.initialRoute = initialRoute || 'start';

  const html = template.evaluate()
    .setWidth(1180)
    .setHeight(760);

  getHostUi().showModelessDialog(html, 'Beacon');
}

// fallback only
function openSHINE() {
  showSidebar();
}

function getHostUi() {
  const hostApps = [
    { name: 'Google Sheets', app: typeof SpreadsheetApp !== 'undefined' ? SpreadsheetApp : null },
    { name: 'Google Docs', app: typeof DocumentApp !== 'undefined' ? DocumentApp : null },
    { name: 'Google Slides', app: typeof SlidesApp !== 'undefined' ? SlidesApp : null }
  ];

  for (const host of hostApps) {
    if (!host.app || typeof host.app.getUi !== 'function') continue;
    try {
      return host.app.getUi();
    } catch (error) {
      // The service exists, but this script is not running inside that host.
    }
  }

  throw new Error('Beacon must be opened from Google Sheets, Docs, or Slides.');
}

function getSheetContext() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const activeSheet = sheet.getActiveSheet();

    return {
      host: 'sheets',
      documentName: sheet.getName(),
      sheetName: activeSheet.getName(),
      activeCell: activeSheet.getActiveCell().getA1Notation()
    };
  } catch (error) {
    return getDocumentContext();
  }
}

function getDocumentContext() {
  try {
    const document = DocumentApp.getActiveDocument();
    return {
      host: 'docs',
      documentName: document.getName()
    };
  } catch (docsError) {
    try {
      const presentation = SlidesApp.getActivePresentation();
      return {
        host: 'slides',
        documentName: presentation.getName(),
        slideCount: presentation.getSlides().length
      };
    } catch (slidesError) {
      return {
        host: 'unknown',
        documentName: ''
      };
    }
  }
}
