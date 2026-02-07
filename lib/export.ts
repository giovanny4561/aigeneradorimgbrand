import { saveAs } from 'file-saver'
import type { Post, Strategy, BrandConfig } from '@/types'

// Export calendar as CSV
export function exportCalendarCSV(posts: Post[], filename = 'calendario.csv') {
  const headers = ['Fecha', 'Hora', 'Plataforma', 'Tipo', 'Título', 'Estado', 'Image URL']

  const rows = posts.map(post => [
    new Date(post.date).toLocaleDateString('es-ES'),
    post.time,
    post.platform,
    post.type,
    `"${post.title.replace(/"/g, '""')}"`, // Escape quotes
    post.status,
    post.image || '',
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, filename)
}

// Export calendar as PDF (basic implementation)
export async function exportCalendarPDF(posts: Post[], brandConfig: BrandConfig | null, filename = 'calendario.pdf') {
  // This would require a library like jsPDF or html2pdf
  // For now, we'll create a simple HTML-based export

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Calendario de Contenido - ${brandConfig?.name || 'Mi Marca'}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          color: #1e293b;
        }
        h1 {
          color: ${brandConfig?.primaryColor || '#8b5cf6'};
          margin-bottom: 10px;
        }
        .subtitle {
          color: #64748b;
          margin-bottom: 30px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th {
          background: ${brandConfig?.primaryColor || '#8b5cf6'};
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
        }
        td {
          padding: 10px;
          border-bottom: 1px solid #e2e8f0;
        }
        tr:hover {
          background: #f8fafc;
        }
        .platform {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          background: #f1f5f9;
        }
        .status-draft { color: #64748b; }
        .status-scheduled { color: #3b82f6; }
        .status-published { color: #10b981; }
      </style>
    </head>
    <body>
      <h1>Calendario de Contenido</h1>
      <p class="subtitle">${brandConfig?.name || 'Mi Marca'} - ${new Date().toLocaleDateString('es-ES')}</p>
      
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Plataforma</th>
            <th>Tipo</th>
            <th>Título</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          ${posts.map(post => `
            <tr>
              <td>${new Date(post.date).toLocaleDateString('es-ES')}</td>
              <td>${post.time}</td>
              <td><span class="platform">${post.platform}</span></td>
              <td>${post.type}</td>
              <td>${post.title}</td>
              <td class="status-${post.status}">${post.status}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)

  // Open in new window for printing/saving as PDF
  const printWindow = window.open(url, '_blank')
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print()
    }
  }
}

// Export strategy as PDF
export async function exportStrategyPDF(strategy: any, brandConfig: BrandConfig | null, filename = 'estrategia.pdf') {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Estrategia de Marketing - ${strategy.name}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
          color: #1e293b;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          color: ${brandConfig?.primaryColor || '#8b5cf6'};
          margin-bottom: 10px;
        }
        .subtitle {
          color: #64748b;
          margin-bottom: 30px;
          font-size: 18px;
        }
        .section {
          margin: 30px 0;
        }
        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #334155;
          margin-bottom: 15px;
          border-bottom: 2px solid ${brandConfig?.primaryColor || '#8b5cf6'};
          padding-bottom: 8px;
        }
        .tag {
          display: inline-block;
          padding: 4px 12px;
          margin: 4px;
          border-radius: 20px;
          font-size: 12px;
          background: #f1f5f9;
          color: #475569;
        }
        .metric {
          display: inline-block;
          padding: 15px;
          margin: 10px 10px 10px 0;
          border-radius: 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
        }
        .metric-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          font-weight: 600;
        }
        .metric-value {
          font-size: 24px;
          font-weight: 700;
          color: ${brandConfig?.primaryColor || '#8b5cf6'};
};
        }
</style>
    </head>
    < body >
    <h1>${strategy.name} </h1>
        < p class="subtitle" > ${brandConfig?.name || 'Mi Marca'} </p>

            < div class="section" >
                <div class="section-title" > Tipo </div>
                    < p > ${strategy.type} </p>
                        </div>

                        < div class="section" >
                            <div class="section-title" > Descripción </div>
                                < p > ${strategy.description} </p>
                                    </div>

                                    < div class="section" >
                                        <div class="section-title" > Métricas </div>
                                            < div class="metric" >
                                                <div class="metric-label" > Alcance Estimado </div>
                                                    < div class="metric-value" > ${strategy.reach || 'N/A'} </div>
                                                        </div>
                                                        < div class="metric" >
                                                            <div class="metric-label" > Probabilidad </div>
                                                                < div class="metric-value" > ${strategy.probability || 0}% </div>
                                                                    </div>
                                                                    </div>

                                                                    < div class="section" >
                                                                        <div class="section-title" > Tags </div>
        ${(strategy.tags || []).map((tag: string) => `<span class="tag">${tag}</span>`).join('')}
</div>

    < div class="section" >
        <p style="color: #64748b; font-size: 12px;" >
            Generado el ${new Date().toLocaleDateString('es-ES')} por LilaMKT
                </p>
                </div>
                </body>
                </html>
                    `

  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)

  const printWindow = window.open(url, '_blank')
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print()
    }
  }
}
