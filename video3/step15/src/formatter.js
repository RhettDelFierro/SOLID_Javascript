export class Formatter {

}


export class TableFormatter extends Formatter {
  wrapReport(content) {
    return `<table>${content}</table>`
  }

  wrapBody(content) {
    return `<tbody>${content}</tbody>`
  }

  wrapHeader(content) {
    return `<thead><tr>${content}</tr></thead>`
  }

  wrapRow(content) {
    return `<tr>${content}</tr>`
  }

  wrapValue(content) {
    return `<th>${content}</th>`
  }

  wrapColumn(content) {
    return `<th>${content}</th>`
  }
}

export class DivFormatter extends TableFormatter {
  wrapReport(content) {
    return `<div class="table">${content}</div>`
  }

  wrapBody(content) {
    return content
  }

  wrapHeader(content) {
    return `<div>${content}</div>`
  }

  wrapRow(content) {
    return `<div>${content}</div>`
  }

  wrapValue(content) {
    return `<strong>${content}</strong>`
  }

  wrapColumn(content) {
    return `<strong>${content}</strong>`
  }
}
