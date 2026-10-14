import React from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Diagram, OrgNode } from '@panoptes/react';

export function DiagramDemo() {
  const companyOrgChart: OrgNode = {
    id: 'ceo',
    name: 'Ahmet Karahan',
    title: 'Genel Müdür (CEO)',
    role: 'Yönetim Kurulu',
    children: [
      {
        id: 'cto',
        name: 'Deniz Arslan',
        title: 'Teknoloji Lideri (CTO)',
        role: 'Mühendislik Departmanı',
        children: [
          {
            id: 'lead-dev',
            name: 'Ali Yılmaz',
            title: 'Kıdemli Mimar',
            role: 'Core Ekibi'
          },
          {
            id: 'lead-qa',
            name: 'Selin Demir',
            title: 'QA Lideri',
            role: 'Test & Kalite'
          }
        ]
      },
      {
        id: 'cmo',
        name: 'Zeynep Kaya',
        title: 'Pazarlama Direktörü (CMO)',
        role: 'Büyüme & Marka',
        children: [
          {
            id: 'growth',
            name: 'Murat Koç',
            title: 'Büyüme Uzmanı',
            role: 'Performans Pazarlama'
          }
        ]
      },
      {
        id: 'cfo',
        name: 'Kemal Öztürk',
        title: 'Finans Direktörü (CFO)',
        role: 'Mali İşler'
      }
    ]
  };

  return (
    <ComponentShowcase
      title="Diagram & OrgChart (Diyagram & Organizasyon Şeması)"
      category="Diagram"
      description="Şirket organizasyon şemaları, süreç akışları, karar ağaçları ve nesne bağlantılarını görselleştiren hiyerarşik diyagram bileşeni."
      propsRows={[
        { name: 'rootNode', type: 'OrgNode', default: '-', description: 'Hiyerarşinin kök düğümü ({ id, name, title, role, children? }).' }
      ]}
      examples={[
        {
          title: 'Kurumsal Şirket Organizasyon Şeması',
          description: 'CEO, C-Level yöneticiler ve alt ekiplerin hiyerarşik bağlayıcı hatlar ile gösterimi.',
          preview: (
            <div className="space-y-4 max-w-3xl overflow-x-auto">
              <Diagram rootNode={companyOrgChart} />
            </div>
          ),
          code: `import { Diagram, OrgNode } from '@panoptes/react';

export function OrgChartDemo() {
  const org: OrgNode = {
    id: '1',
    name: 'Ahmet Karahan',
    title: 'CEO',
    role: 'Yönetim',
    children: [
      { id: '2', name: 'Deniz Arslan', title: 'CTO', role: 'Mühendislik' },
      { id: '3', name: 'Zeynep Kaya', title: 'CMO', role: 'Pazarlama' }
    ]
  };

  return <Diagram rootNode={org} />;
}`
        }
      ]}
    />
  );
}
