'use strict';

class TableTemplate {
  static fillIn(id, dictionary, columnName) {
    const table = document.getElementById(id);
    if (!table) {
      return;
    }

    if (!table.rows || table.rows.length === 0) {
      return;
    }

    const headerRow = table.rows[0];
    
    const headerProcessor = new TemplateProcessor(headerRow.innerHTML);
    headerRow.innerHTML = headerProcessor.fillIn(dictionary);

    if (columnName === undefined) {
      const wholeTableProcessor = new TemplateProcessor(table.innerHTML);
      table.innerHTML = wholeTableProcessor.fillIn(dictionary);

      if (table.style.visibility === 'hidden') {
        table.style.visibility = 'visible';
      }
      return;
    }

    let processingIndex = -1;
    for (let i = 0; i < headerRow.cells.length; i += 1) {
      const cellName = headerRow.cells[i].textContent.trim();
      if (cellName === columnName) {
        processingIndex = i;
        break;
      }
    }

    if (processingIndex === -1) {
      if (table.style.visibility === 'hidden') {
        table.style.visibility = 'visible';
      }
      return;
    }

    for (let r = 1; r < table.rows.length; r += 1) {
      const row = table.rows[r];
      if (processingIndex < row.cells.length) {
        const cell = row.cells[processingIndex];
        const cellProcessor = new TemplateProcessor(cell.innerHTML);
        cell.innerHTML = cellProcessor.fillIn(dictionary);
      }
    }

    if (table.style.visibility === 'hidden') {
      table.style.visibility = 'visible';
    }
  }
}
