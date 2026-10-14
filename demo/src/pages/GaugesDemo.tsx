import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Gauge } from '@panoptes/react';

export function GaugesDemo() {
  const [cpuUsage, setCpuUsage] = useState(72);
  const [ramUsage, setRamUsage] = useState(64);
  const [networkSpeed, setNetworkSpeed] = useState(450);

  return (
    <ComponentShowcase
      title="Gauges (Dairesel & Kadran Göstergeleri)"
      category="Gauges"
      description="Sistem metrikleri, hız göstergeleri, sıcaklık ve KPI hedeflerini analog kadranlar ve dairesel arklar şeklinde sunan radyal gösterge bileşeni."
      propsRows={[
        { name: 'title', type: 'string', default: "''", description: 'Göstergenin üst başlığı.' },
        { name: 'value', type: 'number', default: '0', description: 'Geçerli sayısal değer.' },
        { name: 'min', type: 'number', default: '0', description: 'Minimum kadran sınırı.' },
        { name: 'max', type: 'number', default: '100', description: 'Maksimum kadran sınırı.' },
        { name: 'unit', type: 'string', default: "'%'", description: 'Değerin yanına eklenen ölçü birimi (%, MB/s, °C vb.).' }
      ]}
      examples={[
        {
          title: 'Sunucu Donanım & Performans Göstergeleri',
          description: 'CPU doluluğu, bellek tüketimi ve ağ bant genişliği göstergeleri.',
          preview: (
            <div className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Gauge
                  title="CPU Doluluk Oranı"
                  value={cpuUsage}
                  min={0}
                  max={100}
                  unit="%"
                />
                <Gauge
                  title="RAM Tüketimi"
                  value={ramUsage}
                  min={0}
                  max={100}
                  unit="%"
                />
                <Gauge
                  title="Ağ Bant Genişliği"
                  value={networkSpeed}
                  min={0}
                  max={1000}
                  unit="Mbps"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="text-xs font-bold text-slate-700">Değerleri Dinamik Test Edin:</div>
                <div className="flex gap-4">
                  <label className="text-xs flex items-center gap-2">
                    CPU:
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={cpuUsage}
                      onChange={e => setCpuUsage(Number(e.target.value))}
                    />
                  </label>
                  <label className="text-xs flex items-center gap-2">
                    RAM:
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={ramUsage}
                      onChange={e => setRamUsage(Number(e.target.value))}
                    />
                  </label>
                </div>
              </div>
            </div>
          ),
          code: `import { Gauge } from '@panoptes/react';

export function SystemGaugesDemo() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Gauge title="CPU" value={72} min={0} max={100} unit="%" />
      <Gauge title="RAM" value={64} min={0} max={100} unit="%" />
      <Gauge title="Ağ" value={450} min={0} max={1000} unit="Mbps" />
    </div>
  );
}`
        }
      ]}
    />
  );
}
