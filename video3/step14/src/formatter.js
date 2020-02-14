export class Formatter {
  constructor(useDivs) {
    this.useDivs = useDivs
  }
  wrapReport(content) {
    if (this.useDivs) {
      return `<div class="table">${content}</div>`
    } else {
      return `<table>${content}</table>`
    }
  }

  wrapBody(content) {
    if (this.useDivs) {
      return content
    } else {
      return `<tbody>${content}</tbody>`
    }
  }

  wrapHeader(content) {
    if (this.useDivs) {
      return `<div>${content}</div>`
    } else {
      return `<thead><tr>${content}</tr></thead>`
    }
  }

  wrapRow(content) {
    if (this.useDivs) {
      return `<div>${content}</div>`
    } else {
      return `<tr>${content}</tr>`
    }
  }

  wrapValue(content) {
    if (this.useDivs) {
      return `<strong>${content}</strong>`
    } else {
      return `<th>${content}</th>`
    }
  }

  wrapColumn(content) {
    if (this.useDivs) {
      return `<strong>${content}</strong>`
    } else {
      return `<th>${content}</th>`
    }
  }
}