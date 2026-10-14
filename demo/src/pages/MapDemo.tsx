import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Map, MapMarker } from '@panoptes/react';

export function MapDemo() {
  const [selectedLocation, setSelectedLocation] = useState<string>('Bir işaretçiye tıklayınız.');

  const turkeyLocations: MapMarker[] = [
    {
      id: 'ist',
      title: 'İstanbul Genel Merkez',
      description: 'Maslak Teknoloji Vadisi, No: 42',
      lat: 41.01,
      lng: 28.97,
      category: 'office',
      badge: 'HQ'
    },
    {
      id: 'ank',
      title: 'Ankara Ar-Ge Kampüsü',
      description: 'ODTÜ Teknokent Bilişim Blokları',
      lat: 39.92,
      lng: 32.85,
      category: 'office',
      badge: 'Ar-Ge'
    },
    {
      id: 'izm',
      title: 'İzmir Ege Lojistik Merkezi',
      description: 'Kemalpaşa Organize Sanayi Bölgesi',
      lat: 38.42,
      lng: 27.14,
      category: 'warehouse',
      badge: 'Lojistik'
    },
    {
      id: 'ant',
      title: 'Antalya Akdeniz Bölge Temsilciliği',
      description: 'Muratpaşa İş Merkezi',
      lat: 36.89,
      lng: 30.71,
      category: 'store',
      badge: 'Mağaza'
    }
  ];

  return (
    <ComponentShowcase
      title="Map (Coğrafi Harita & Konum İşaretçisi)"
      category="Map"
      description="Coğrafi harita görselleştirmesi, konum pinleri (markers), yakınlaştırma (zoom) kontrolleri ve detay bilgi pencereleri sunan harita bileşeni."
      propsRows={[
        { name: 'markers', type: 'MapMarker[]', default: '[]', description: 'Harita üzerindeki konum işaretçileri ({ id, title, description?, lat, lng, category?, badge? }).' },
        { name: 'center', type: '{ lat: number, lng: number }', default: '{ lat: 39.92, lng: 32.85 }', description: 'Haritanın başlangıç odak koordinatları.' },
        { name: 'zoom', type: 'number', default: '6', description: 'Başlangıç yakınlaştırma katsayısı.' },
        { name: 'onMarkerClick', type: '(marker: MapMarker) => void', default: '-', description: 'Bir işaretçiye tıklandığında tetiklenen fonksiyon.' }
      ]}
      examples={[
        {
          title: 'Türkiye Ofis ve Lojistik Tesisleri',
          description: 'İşaretçilere tıklayarak detaylı adres ve koordinat bilgilerini inceleyebilirsiniz.',
          preview: (
            <div className="space-y-4 max-w-2xl">
              <Map
                markers={turkeyLocations}
                zoom={6}
                onMarkerClick={m => setSelectedLocation(`${m.title} (${m.description})`)}
              />

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                Seçilen Tesis: <strong>{selectedLocation}</strong>
              </div>
            </div>
          ),
          code: `import { Map } from '@panoptes/react';

export function CompanyMapDemo() {
  const locations = [
    { id: '1', title: 'İstanbul HQ', lat: 41.01, lng: 28.97, category: 'office' },
    { id: '2', title: 'Ankara Ar-Ge', lat: 39.92, lng: 32.85, category: 'office' }
  ];

  return <Map markers={locations} zoom={6} onMarkerClick={(m) => console.log(m)} />;
}`
        }
      ]}
    />
  );
}
