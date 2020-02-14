export const Formatter = {
  format(columns, rows) {
    return this.wrapReport(
      this.getReportHeader(columns) +
      this.wrapBody(rows.map(row => this.getReportRow(row)).join(''))
    )
  },

  getReportHeader(columns) {
    const ths = columns.map(c => this.wrapColumns(c)).join('')
    return this.wrapHeader(ths)
  },

  getReportRow(row) {
    const tds = row.map(v => this.wrapValue(v)).join('')
    return this.wrapRow(tds)
  }
}


export const TableFormatter = {
  wrapReport(content) {
    return `<table>${content}</table>`
  },

  wrapBody(content) {
    return `<tbody>${content}</tbody>`
  },

  wrapHeader(content) {
    return `<thead><tr>${content}</tr></thead>`
  },

  wrapRow(content) {
    return `<tr>${content}</tr>`
  },

  wrapValue(content) {
    return `<th>${content}</th>`
  },

  wrapColumn(content) {
    return `<th>${content}</th>`
  },
}
Object.assign(TableFormatter, Formatter)

export const DivFormatter = {
  wrapReport(content) {
    return `<div class="table">${content}</div>`
  },

  wrapBody(content) {
    return content
  },

  wrapHeader(content) {
    return `<div>${content}</div>`
  },

  wrapRow(content) {
    return `<div>${content}</div>`
  },

  wrapValue(content) {
    return `<strong>${content}</strong>`
  },

  wrapColumn(content) {
    return `<strong>${content}</strong>`
  },
}

Object.assign(DivFormatter, Formatter)
