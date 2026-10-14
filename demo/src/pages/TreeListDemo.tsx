import React, { useState } from 'react';
import { TreeList } from '@panoptes/react';
import { ComponentShowcase } from '../components/ComponentShowcase';

import { Product } from '../types';

export function TreeListDemo({ products }: { products?: Product[] } = {}) {
  const hierarchicalData = [
    { id: 1, parentId: null, name: 'Bilgisayar & Donanım', category: 'Ana Kategori', count: 142, budget: '₺450,000' },
    { id: 11, parentId: 1, name: 'Dizüstü Bilgisayarlar', category: 'Alt Kategori', count: 64, budget: '₺280,000' },
    { id: 111, parentId: 11, name: 'Kurumsal İş Laptopları', category: 'Ürün Grubu', count: 38, budget: '₺190,000' },
    { id: 112, parentId: 11, name: 'Oyun Bilgisayarları', category: 'Ürün Grubu', count: 26, budget: '₺90,000' },
    { id: 12, parentId: 1, name: 'Monitör & Ekranlar', category: 'Alt Kategori', count: 45, budget: '₺110,000' },
    { id: 13, parentId: 1, name: 'Klavye & Mouse Setleri', category: 'Alt Kategori', count: 33, budget: '₺60,000' },
    { id: 2, parentId: null, name: 'Ağ & Sunucu Sistemleri', category: 'Ana Kategori', count: 89, budget: '₺620,000' },
    { id: 21, parentId: 2, name: 'Rack Sunucular', category: 'Alt Kategori', count: 31, budget: '₺420,000' },
    { id: 22, parentId: 2, name: 'Yönetilebilir Switchler', category: 'Alt Kategori', count: 58, budget: '₺200,000' }
  ];

  const columns = [
    { field: 'name', title: 'Hiyerarşik Kategori & Ürün Adı', width: '45%' },
    { field: 'category', title: 'Düğüm Tipi', width: '20%' },
    { field: 'count', title: 'Adet', width: '15%' },
    { field: 'budget', title: 'Toplam Bütçe', width: '20%' }
  ];

  const projectOrgData = [
    { id: 'p1', parentId: null, name: 'Panoptes Web Platformu', owner: 'Ahmet Yılmaz', status: 'Devam Ediyor' },
    { id: 'p1-1', parentId: 'p1', name: 'Çekirdek Grid Motoru', owner: 'Merve Demir', status: 'Tamamlandı' },
    { id: 'p1-2', parentId: 'p1', name: 'Kurumsal Ağaç Izgara Desteği', owner: 'Caner Kurt', status: 'Aktif' },
    { id: 'p1-2-1', parentId: 'p1-2', name: 'Form & Editör Bileşenleri', owner: 'Elif Kaya', status: 'Tamamlandı' },
    { id: 'p1-2-2', parentId: 'p1-2', name: 'Grafikler & Dashboard', owner: 'Murat Can', status: 'Test Aşamasında' }
  ];

  const orgColumns = [
    { field: 'name', title: 'Proje & Görev Ağacı', width: '50%' },
    { field: 'owner', title: 'Sorumlu', width: '25%' },
    { field: 'status', title: 'Durum', width: '25%' }
  ];

  return (
    <ComponentShowcase
      title="TreeList (Hiyerarşik Ağaç Tablosu)"
      category="Veri Yönetimi & Tablolar"
      description="Panoptes Kurumsal TreeList bileşeni: Parent-child ilişkili çok seviyeli hiyerarşik veri gösterimi, açılır/kapanır düğümler, dinamik girintileme ve özel sütun biçimlendirmeleri."
      examples={[
        {
          id: 'ex1',
          title: 'Örnek 1: Çok Seviyeli Ürün & Kategori Hiyerarşisi',
          description: 'Sonsuz derinlikte alt kırılımlar, bütçe toplamları ve canlı chevron genişleme kontrolleri.',
          preview: (
            <div className="w-full">
              <TreeList data={hierarchicalData} columns={columns} />
            </div>
          ),
          code: `import React from 'react';
import { TreeList } from '@panoptes/react';

const data = [
  { id: 1, parentId: null, name: 'Bilgisayar & Donanım', category: 'Ana Kategori', count: 142, budget: '₺450,000' },
  { id: 11, parentId: 1, name: 'Dizüstü Bilgisayarlar', category: 'Alt Kategori', count: 64, budget: '₺280,000' },
  { id: 111, parentId: 11, name: 'Kurumsal Laptoplar', category: 'Ürün Grubu', count: 38, budget: '₺190,000' },
  { id: 112, parentId: 11, name: 'Oyun Bilgisayarları', category: 'Ürün Grubu', count: 26, budget: '₺90,000' },
  { id: 2, parentId: null, name: 'Ağ Sistemleri', category: 'Ana Kategori', count: 89, budget: '₺620,000' }
];

const columns = [
  { field: 'name', title: 'Hiyerarşik Kategori', width: '50%' },
  { field: 'category', title: 'Düğüm Tipi', width: '25%' },
  { field: 'budget', title: 'Toplam Bütçe', width: '25%' }
];

export function TreeListExample() {
  return (
    <TreeList
      data={data}
      columns={columns}
      idField="id"
      parentIdField="parentId"
    />
  );
}`
        },
        {
          id: 'ex2',
          title: 'Örnek 2: Proje Görev Ağacı & Durum İzleme',
          description: 'Görev sahipleri, aşama durumu ve string ID yapısı ile hiyerarşik proje yönetimi.',
          preview: (
            <div className="w-full">
              <TreeList data={projectOrgData} columns={orgColumns} />
            </div>
          ),
          code: `import React from 'react';
import { TreeList } from '@panoptes/react';

const projectTasks = [
  { id: 'p1', parentId: null, name: 'Panoptes Web Platformu', owner: 'Ahmet Yılmaz', status: 'Devam Ediyor' },
  { id: 'p1-1', parentId: 'p1', name: 'Çekirdek Grid Motoru', owner: 'Merve Demir', status: 'Tamamlandı' },
  { id: 'p1-2', parentId: 'p1', name: 'Kurumsal Ağaç Izgara Desteği', owner: 'Caner Kurt', status: 'Aktif' }
];

export function ProjectTreeList() {
  return (
    <TreeList
      data={projectTasks}
      columns={[
        { field: 'name', title: 'Görev', width: '50%' },
        { field: 'owner', title: 'Sorumlu', width: '25%' },
        { field: 'status', title: 'Durum', width: '25%' }
      ]}
    />
  );
}`
        }
      ]}
      propsList={[
        { name: 'data', type: 'TreeListItem[]', description: 'Görüntülenecek nesnelerin hiyerarşik listesi (parentId ile ilişkili)' },
        { name: 'columns', type: 'TreeListColumn[]', description: 'Sütun başlıkları, alan adları (field) ve genişlik tanımları' },
        { name: 'idField', type: 'string', default: "'id'", description: 'Öğe kimliğini belirten benzersiz alan adı' },
        { name: 'parentIdField', type: 'string', default: "'parentId'", description: 'Üst düğümün kimliğini belirten alan adı' }
      ]}
    />
  );
}
