import React from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { PDFViewer } from '@panoptes/react';

export function PdfViewerDemo() {
  return (
    <ComponentShowcase
      title="PDFViewer (PDF Görüntüleyici)"
      category="PDFViewer"
      description="Sayfa numaralandırma, yakınlaştırma/uzaklaştırma (zoom), tam ekran modu, yazdırma ve indirme araç çubuğuna sahip entegre PDF belge görüntüleyici."
      propsRows={[
        { name: 'title', type: 'string', default: "'Rapor_Belgesi.pdf'", description: 'Görüntülenen PDF dosyasının başlığı.' },
        { name: 'totalPages', type: 'number', default: '5', description: 'Dökümanın toplam sayfa sayısı.' }
      ]}
      examples={[
        {
          title: 'Kurumsal Finansal Rapor PDF Belgesi',
          description: 'Sayfa geçiş düğmeleri, yakınlaştırma kontrolleri ve yazdırma/indirme araçları.',
          preview: (
            <div className="space-y-4 max-w-2xl">
              <PDFViewer
                title="Panoptes_2026_Faaliyet_Raporu.pdf"
                totalPages={12}
              />
            </div>
          ),
          code: `import { PDFViewer } from '@panoptes/react';

export function ReportPdfDemo() {
  return (
    <PDFViewer
      title="Faaliyet_Raporu.pdf"
      totalPages={12}
    />
  );
}`
        }
      ]}
    />
  );
}
