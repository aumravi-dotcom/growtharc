/**
 * GROWTH ARC — Application form → Google Sheet
 * ------------------------------------------------------------
 * Saves each form submission as a row, with date & time in IST.
 * Columns are exactly the form fields (plus the timestamp) — nothing extra.
 *
 * SETUP (one time):
 * 1. Create a new Google Sheet. Note its name (e.g. "Growth Arc Leads").
 * 2. In the Sheet: Extensions → Apps Script. Delete any code, paste THIS file.
 * 3. Click Deploy → New deployment → type "Web app".
 *      - Description:  Growth Arc form
 *      - Execute as:   Me
 *      - Who has access: Anyone
 *    Deploy, authorise access, and COPY the Web app URL.
 * 4. Open index.html, find SHEET_ENDPOINT and paste that URL in the quotes.
 * 5. Submit a test from the site — a row should appear in the Sheet.
 *
 * If you change the form fields later, update HEADERS and FIELDS below to match.
 */

// The header row shown in the Sheet (left to right).
var HEADERS = ['Timestamp (IST)', 'Name', 'Business', 'Website/Instagram',
               'What you sell', 'Monthly ad budget', 'Biggest challenge',
               'Email', 'Phone'];

// The matching form field names (the "name" attribute of each input/select).
// Order here must line up with HEADERS (after the timestamp).
var FIELDS = ['name', 'business', 'site', 'industry', 'budget', 'challenge', 'email', 'phone'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000); // avoid two submissions writing at once
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Add the header row once, the first time.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    // Date & time in IST.
    var istTime = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss');

    // Build the row in the exact column order.
    var row = [istTime];
    for (var i = 0; i < FIELDS.length; i++) {
      row.push(e.parameter[FIELDS[i]] || '');
    }
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the Web app URL in a browser to confirm it's live.
function doGet() {
  return ContentService.createTextOutput('Growth Arc form endpoint is running.');
}
