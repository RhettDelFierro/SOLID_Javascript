export function TableFormatter(columns, rows) {
  const template =
    `<table>
          <thead><tr>{{#columns}}<th>{{.}}</th>{{/columns}}</tr></thead>
          <tbody>
              {{#rows}}
                  <tr>{{#.}}<td>{{.}}</td></tr>
              {{/rows}}
          </tbody>
        </table>`.replace(/\n\s*/g, '')
  return mustache.render(template, {columns, rows})
}

export function DivFormatter(columns, rows) {
  const template =
    `<div class="table">
          <div>{{#columns}}<strong{{.}}</strong>{{/columns}}</div>        
              {{#rows}}
                  <div>{{#.}}<span>{{.}}</span></div>
              {{/rows}}          
        </div>`.replace(/\n\s*/g, '')
  return mustache.render(template, {columns, rows})
}