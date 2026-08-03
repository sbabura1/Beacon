function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('SHINE')
    .addItem('Open SHINE Navigator', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('SHINE');

  SpreadsheetApp.getUi().showSidebar(html);
}

function showDialog() {
  const html = HtmlService.createHtmlOutputFromFile('Dialog')
    .setWidth(760)
    .setHeight(720);

  SpreadsheetApp.getUi().showModelessDialog(html, 'SHINE Health Data Lab');
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