import React from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { StockChart, CandleData } from '@panoptes/react';

export function StockChartDemo() {
  const stockData: CandleData[] = [
    { time: '09:30', open: 142.5, high: 145.0, low: 141.0, close: 144.2, volume: 12500 },
    { time: '10:30', open: 144.2, high: 146.8, low: 143.5, close: 146.5, volume: 18400 },
    { time: '11:30', open: 146.5, high: 147.2, low: 144.8, close: 145.1, volume: 9800 },
    { time: '12:30', open: 145.1, high: 146.0, low: 144.0, close: 145.8, volume: 6500 },
    { time: '13:30', open: 145.8, high: 149.0, low: 145.5, close: 148.4, volume: 24200 },
    { time: '14:30', open: 148.4, high: 151.5, low: 148.0, close: 151.0, volume: 32000 },
    { time: '15:30', open: 151.0, high: 152.0, low: 149.2, close: 149.8, volume: 15600 },
    { time: '16:30', open: 149.8, high: 153.4, low: 149.5, close: 153.2, volume: 41200 },
    { time: '17:30', open: 153.2, high: 155.0, low: 152.8, close: 154.6, volume: 38900 }
  ];

  return (
    <ComponentShowcase
      title="StockChart (Finansal Mum Grafiği)"
      category="StockChart"
      description="Finansal piyasalar, hisse senedi, döviz ve kripto varlıklar için Candlestick (mum), OHLC (Open-High-Low-Close) ve işlem hacmi (volume) barlarını sunan borsa grafiği bileşeni."
      propsRows={[
        { name: 'symbol', type: 'string', default: "'BIST:PANO'", description: 'Hisse veya parite sembolü (örn. BIST:THYAO, NASDAQ:AAPL).' },
        { name: 'data', type: 'CandleData[]', default: '[]', description: 'Zaman serisi mum verileri ({ time, open, high, low, close, volume }).' }
      ]}
      examples={[
        {
          title: 'Canlı Borsa Seansı Mum & Hacim Grafiği',
          description: 'Açılış, en yüksek, en düşük, kapanış ve hacim verileri ile donatılmış finansal terminal grafiği.',
          preview: (
            <div className="space-y-4 max-w-2xl">
              <StockChart
                symbol="BIST:PANO"
                data={stockData}
              />
            </div>
          ),
          code: `import { StockChart } from '@panoptes/react';

export function MarketChartDemo() {
  const data = [
    { time: '09:30', open: 142.5, high: 145.0, low: 141.0, close: 144.2, volume: 12500 },
    { time: '10:30', open: 144.2, high: 146.8, low: 143.5, close: 146.5, volume: 18400 },
    { time: '11:30', open: 146.5, high: 147.2, low: 144.8, close: 145.1, volume: 9800 }
  ];

  return <StockChart symbol="BIST:PANO" data={data} />;
}`
        }
      ]}
    />
  );
}
