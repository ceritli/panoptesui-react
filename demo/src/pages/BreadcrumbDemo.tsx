import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Breadcrumb, BreadcrumbItem } from '@panoptes/react';

export function BreadcrumbDemo() {
  const [navPath, setNavPath] = useState<string>('/products/laptops/apple/macbook-pro');

  const trail1: BreadcrumbItem[] = [
    { label: 'Ana Sayfa', url: '/' },
    { label: 'Elektronik & Bilgisayar', url: '/products' },
    { label: 'Dizüstü Bilgisayarlar', url: '/products/laptops' },
    { label: 'Apple MacBook Pro 16" M3 Max' }
  ];

  const trail2: BreadcrumbItem[] = [
    { label: 'Yönetim Paneli', url: '/admin' },
    { label: 'Kullanıcı Yönetimi', url: '/admin/users' },
    { label: 'Yetkilendirme & Roller' }
  ];

  return (
    <ComponentShowcase
      title="Breadcrumb"
      category="Breadcrumb"
      description="Sayfa hiyerarşisini ve kullanıcının mevcut konumunu gösteren ekmek kırıntısı gezinme bileşeni. Tıklanabilir geçmiş bağlantıları ve otomatik ayırıcı çizgiler içerir."
      propsRows={[
        { name: 'items', type: 'BreadcrumbItem[]', default: '[]', description: 'Gezinme halkaları listesi ({ label, url? }). Son halka aktif sayfa kabul edilir.' },
        { name: 'onNavigate', type: '(url: string) => void', default: '-', description: 'Bir gezinme halkasına tıklandığında URL yi döndüren fonksiyon.' }
      ]}
      examples={[
        {
          title: 'E-Ticaret Ürün Hiyerarşisi',
          description: 'Kategori derinliği olan ürün detay sayfası gezinme yolu.',
          preview: (
            <div className="space-y-4 max-w-xl">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <Breadcrumb
                  items={trail1}
                  onNavigate={url => setNavPath(url)}
                />
              </div>

              <div className="text-xs text-slate-500">
                Seçilen Hedef URL: <strong className="text-blue-600 font-mono">{navPath}</strong>
              </div>
            </div>
          ),
          code: `import { Breadcrumb } from '@panoptes/react';

export function ProductBreadcrumbDemo() {
  const items = [
    { label: 'Ana Sayfa', url: '/' },
    { label: 'Ürünler', url: '/products' },
    { label: 'Dizüstü Bilgisayarlar', url: '/products/laptops' },
    { label: 'MacBook Pro 16"' }
  ];

  return <Breadcrumb items={items} onNavigate={(url) => console.log('Yönlendir:', url)} />;
}`
        },
        {
          title: 'Yönetim Paneli Navigasyonu',
          description: 'Admin modülleri için gezinme yolu.',
          preview: (
            <div className="space-y-4 max-w-xl">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <Breadcrumb
                  items={trail2}
                  onNavigate={url => setNavPath(url)}
                />
              </div>
            </div>
          ),
          code: `import { Breadcrumb } from '@panoptes/react';

export function AdminBreadcrumbDemo() {
  const items = [
    { label: 'Admin', url: '/admin' },
    { label: 'Kullanıcılar', url: '/admin/users' },
    { label: 'Roller' }
  ];

  return <Breadcrumb items={items} />;
}`
        }
      ]}
    />
  );
}
