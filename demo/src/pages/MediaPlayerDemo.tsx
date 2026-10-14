import React from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { MediaPlayer } from '@panoptes/react';

export function MediaPlayerDemo() {
  return (
    <ComponentShowcase
      title="MediaPlayer (Medya Oynatıcı)"
      category="MediaPlayer"
      description="Video ve ses oynatma, oynat/duraklat kontrolleri, ilerleme çubuğu (seek bar) ve ses düzeyi ayarı içeren duyarlı medya oynatıcı bileşeni."
      propsRows={[
        { name: 'title', type: 'string', default: "'Tanıtım Videosu'", description: 'Medya başlığı.' }
      ]}
      examples={[
        {
          title: 'Panoptes Ürün Tanıtım Videosu',
          description: 'Oynat/duraklat eylemleri ve etkileşimli zaman çubuğu.',
          preview: (
            <div className="space-y-4 max-w-xl">
              <MediaPlayer
                title="Panoptes React 19 Enterprise Suite - Tanıtım Filmi"
              />
            </div>
          ),
          code: `import { MediaPlayer } from '@panoptes/react';

export function VideoPlayerDemo() {
  return (
    <MediaPlayer
      title="Ürün Tanıtım Videosu"
    />
  );
}`
        }
      ]}
    />
  );
}
