import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { TreeView, TreeNode } from '@panoptes/react';

export function TreeViewDemo() {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);

  const fileTreeData: TreeNode[] = [
    {
      id: 'src',
      label: 'src',
      icon: '📁',
      children: [
        {
          id: 'components',
          label: 'components',
          icon: '📁',
          children: [
            { id: 'Grid.tsx', label: 'PanoptesGrid.tsx', icon: '⚛️' },
            { id: 'Column.tsx', label: 'GridColumn.tsx', icon: '⚛️' },
            { id: 'Inputs.tsx', label: 'inputs.tsx', icon: '⚛️' }
          ]
        },
        {
          id: 'styles',
          label: 'styles',
          icon: '📁',
          children: [
            { id: 'index.css', label: 'index.css', icon: '🎨' },
            { id: 'tailwind.css', label: 'tailwind.css', icon: '🎨' }
          ]
        },
        { id: 'App.tsx', label: 'App.tsx', icon: '⚛️' },
        { id: 'main.tsx', label: 'main.tsx', icon: '⚡' }
      ]
    },
    {
      id: 'docs',
      label: 'docs',
      icon: '📁',
      children: [
        { id: 'readme.md', label: 'README.md', icon: '📝' },
        { id: 'license', label: 'LICENSE', icon: '📜' }
      ]
    },
    { id: 'package.json', label: 'package.json', icon: '📦' },
    { id: 'tsconfig.json', label: 'tsconfig.json', icon: '⚙️' }
  ];

  return (
    <ComponentShowcase
      title="TreeView"
      category="TreeView"
      description="Hiyerarşik veri yapılarını (dosya ağaçları, organizasyon şemaları, kategori kırılımları) genişletilebilir dallar ve düğümler halinde sunan ağaç görünüm bileşeni."
      propsRows={[
        { name: 'data', type: 'TreeNode[]', default: '[]', description: 'Ağaç hiyerarşisi ({ id, label, icon?, children? }).' },
        { name: 'checkable', type: 'boolean', default: 'false', description: 'Düğümlerin yanında onay kutuları (checkbox) gösterir.' },
        { name: 'onSelect', type: '(node: TreeNode) => void', default: '-', description: 'Bir düğüme tıklandığında tetiklenen fonksiyon.' }
      ]}
      examples={[
        {
          title: 'Dosya & Proje Ağacı (Standart)',
          description: 'Klasör ve dosya yapısını simgelerle listeleyen genişletilebilir ağaç.',
          preview: (
            <div className="space-y-4 max-w-md">
              <TreeView
                data={fileTreeData}
                checkable={false}
                onSelect={setSelectedNode}
              />

              {selectedNode && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-center justify-between">
                  <span>Seçilen Düğüm: <strong>{selectedNode.label}</strong></span>
                  <span className="font-mono text-[10px] text-blue-600">ID: {selectedNode.id}</span>
                </div>
              )}
            </div>
          ),
          code: `import { TreeView } from '@panoptes/react';

export function FileTreeDemo() {
  const data = [
    {
      id: 'src',
      label: 'src',
      children: [
        { id: 'app', label: 'App.tsx' },
        { id: 'grid', label: 'Grid.tsx' }
      ]
    },
    { id: 'pkg', label: 'package.json' }
  ];

  return <TreeView data={data} onSelect={(node) => console.log(node)} />;
}`
        },
        {
          title: 'Onay Kutulu (Checkable) Ağaç',
          description: 'Düğümlerin çoklu seçimine izin veren onay kutusu modu.',
          preview: (
            <div className="space-y-4 max-w-md">
              <TreeView
                data={fileTreeData}
                checkable={true}
              />
            </div>
          ),
          code: `import { TreeView } from '@panoptes/react';

export function CheckableTreeDemo() {
  return <TreeView data={data} checkable={true} />;
}`
        }
      ]}
    />
  );
}
