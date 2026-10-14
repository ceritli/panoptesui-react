import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Chart, Gauge, Barcode, StockChart, Diagram } from '@panoptes/react';

export function ChartsDemo() {
  const [salesData] = useState([
    { name: 'Ocak', value: 45000 },
    { name: 'Şubat', value: 52000 },
    { name: 'Mart', value: 61000 },
    { name: 'Nisan', value: 58000 },
    { name: 'Mayıs', value: 72000 },
    { name: 'Haziran', value: 85000 }
  ]);

  const [categoryShare] = useState([
    { name: 'Elektronik', value: 42, color: '#3b82f6' },
    { name: 'Gıda', value: 28, color: '#10b981' },
    { name: 'Tekstil', value: 18, color: '#f59e0b' },
    { name: 'Diğer', value: 12, color: '#8b5cf6' }
  ]);

  const [candleData] = useState([
    { time: '10:00', open: 120, high: 135, low: 115, close: 130, volume: 4500 },
    { time: '11:00', open: 130, high: 140, low: 125, close: 122, volume: 6200 },
    { time: '12:00', open: 122, high: 128, low: 118, close: 126, volume: 3800 },
    { time: '13:00', open: 126, high: 145, low: 124, close: 142, volume: 7900 },
    { time: '14:00', open: 142, high: 155, low: 138, close: 151, volume: 9100 },
    { time: '15:00', open: 151, high: 153, low: 142, close: 146, volume: 5400 },
    { time: '16:00', open: 146, high: 162, low: 145, close: 160, volume: 11200 }
  ]);

  const orgTree = {
    id: 'ceo',
    name: 'Ahmet Yılmaz',
    title: 'Genel Müdür (CEO)',
    role: 'Yönetim Kurulu',
    children: [
      {
        id: 'cto',
        name: 'Merve Demir',
        title: 'Teknoloji Direktörü (CTO)',
        role: 'Yazılım & Altyapı',
        children: [
          { id: 'dev1', name: 'Caner Kurt', title: 'Lead Frontend', role: 'React Ekibi' },
          { id: 'dev2', name: 'Elif Kaya', title: 'Lead Backend', role: '.NET Core Ekibi' }
        ]
      },
      {
        id: 'cfo',
        name: 'Burak Şahin',
        title: 'Finans Direktörü (CFO)',
        role: 'Bütçe & Raporlama',
        children: [
          { id: 'acc1', name: 'Selin Yıldız', title: 'Kıdemli Muhasebe', role: 'Mali İşler' }
        ]
      }
    ]
  };

  return (
    <ComponentShowcase
      title="Chart & Visualization (Grafik ve Görselleştirme)"
      category="Chart"
      description="Sütun (Column), Yatay Çubuk (Bar), Halka (Donut) grafikleri, borsa & finansal mum grafiği (StockChart), süreç şeması (Diagram), ibreli kadran (Gauge) ve barkod (Barcode) bileşenleri."
      propsRows={[
        { name: 'title', type: 'string', default: "''", description: 'Grafik başlığı ve kart üst bilgisi.' },
        { name: 'type', type: "'column' | 'bar' | 'donut' | 'line'", default: "'column'", description: 'Görselleştirme grafiği türü.' },
        { name: 'data', type: 'Array<{ name: string; value: number; color?: string }>', default: '[]', description: 'Seri veya kategori verileri dizisi.' },
        { name: 'height', type: 'number', default: '260', description: 'Grafik piksel yüksekliği.' },
        { name: 'className', type: 'string', default: "''", description: 'Grafik konteynerine uygulanacak özel CSS sınıfları.' }
      ]}
      examples={[
        {
          title: 'Sütun Grafiği (Column Chart)',
          description: 'Aylık hasılat trendleri ve dönemsel finansal büyüme verilerini sütun bazlı görselleştirme.',
          preview: (
            <div className="max-w-2xl">
              <Chart title="Aylık Hasılat Dağılımı (Column Chart)" type="column" data={salesData} height={240} />
            </div>
          ),
          code: `import { Chart } from '@panoptes/react';

const sales = [
  { name: 'Ocak', value: 45000 },
  { name: 'Şubat', value: 52000 },
  { name: 'Mart', value: 61000 },
  { name: 'Nisan', value: 58000 },
  { name: 'Mayıs', value: 72000 },
  { name: 'Haziran', value: 85000 }
];

export function ColumnChartDemo() {
  return (
    <Chart
      title="Aylık Hasılat Dağılımı"
      type="column"
      data={sales}
      height={240}
    />
  );
}`
        },
        {
          title: 'Halka Grafiği (Donut Chart)',
          description: 'Kategori veya pazar payı dağılımlarını renk kodlu dilimlerle sunan dairesel halka grafiği.',
          preview: (
            <div className="max-w-md">
              <Chart title="Kategori Dağılım Payı (Donut Chart)" type="donut" data={categoryShare} />
            </div>
          ),
          code: `import { Chart } from '@panoptes/react';

const categories = [
  { name: 'Elektronik', value: 42, color: '#3b82f6' },
  { name: 'Gıda', value: 28, color: '#10b981' },
  { name: 'Tekstil', value: 18, color: '#f59e0b' },
  { name: 'Diğer', value: 12, color: '#8b5cf6' }
];

export function DonutChartDemo() {
  return (
    <Chart
      title="Kategori Dağılım Payı"
      type="donut"
      data={categories}
    />
  );
}`
        },
        {
          title: 'Yatay Çubuk Grafiği (Bar Chart)',
          description: 'Kategoriler arası karşılaştırma ve performans sıralaması sunan yatay çubuk grafiği.',
          preview: (
            <div className="max-w-2xl">
              <Chart title="Bölgesel Satışlar (Bar Chart)" type="bar" data={salesData} />
            </div>
          ),
          code: `import { Chart } from '@panoptes/react';

export function BarChartDemo() {
  return (
    <Chart
      title="Bölgesel Satışlar"
      type="bar"
      data={salesData}
    />
  );
}`
        },
        {
          title: 'Borsa & Finansal Mum Grafiği (StockChart)',
          description: 'Açılış, en yüksek, en düşük, kapanış ve işlem hacmi çubukları ile borsa ve kripto veri analizi.',
          preview: (
            <div className="max-w-3xl">
              <StockChart symbol="BIST:PANOPTES" data={candleData} />
            </div>
          ),
          code: `import { StockChart } from '@panoptes/react';

export function MarketChartDemo() {
  return (
    <StockChart
      symbol="BIST:PANOPTES"
      data={candleData}
    />
  );
}`
        },
        {
          title: 'İbreli Kadran (Gauge) ve Barkod (Barcode)',
          description: 'KPI hedef gerçekleşme oranı ibresi ve kargo/sevkiyat barkod üretim bileşeni.',
          preview: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
              <Gauge title="Hedef Gerçekleşme Oranı" value={85} />
              <Barcode value="TR-PANOPTES-2026" label="Kargo & Sevkiyat Barkodu" />
            </div>
          ),
          code: `import { Gauge, Barcode } from '@panoptes/react';

export function IndicatorsDemo() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Gauge title="Hedef Gerçekleşme Oranı" value={85} />
      <Barcode value="TR-PANOPTES-2026" label="Kargo & Sevkiyat Barkodu" />
    </div>
  );
}`
        },
        {
          title: 'Organizasyon Şeması (Diagram & OrgChart)',
          description: 'Hiyerarşik şirket yönetimi veya süreç akışını görselleştiren düğüm tabanlı şema.',
          preview: (
            <div className="max-w-4xl">
              <Diagram rootNode={orgTree} />
            </div>
          ),
          code: `import { Diagram } from '@panoptes/react';

export function OrgChartDemo() {
  return <Diagram rootNode={orgTree} />;
}`
        }
      ]}
    />
  );
}
