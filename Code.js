function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('SHINE')
    .addItem('Open SHINE Navigator', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Beacon');

  SpreadsheetApp.getUi().showSidebar(html);
}

function showDialog(initialRoute) {
  const template = HtmlService.createTemplateFromFile('Dialog');
  template.initialRoute = initialRoute || 'start';

  const html = template.evaluate()
    .setWidth(1180)
    .setHeight(760);

  SpreadsheetApp.getUi().showModelessDialog(html, 'Beacon');
}

// fallback only
function openSHINE() {
  showSidebar();
}

function getSheetContext() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const activeSheet = sheet.getActiveSheet();

  return {
    spreadsheetName: sheet.getName(),
    sheetName: activeSheet.getName(),
    activeCell: activeSheet.getActiveCell().getA1Notation()
  };
}
