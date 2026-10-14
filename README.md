<div align="center">

# ⚛️ Panoptes UI for React
### Modern, Enterprise-Grade DataGrid & UI Components for React 18 & 19

[![npm version](https://img.shields.io/badge/version-1.0.0-blue.svg?logo=npm)](https://www.npmjs.com)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61dafb.svg?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3%20%7C%204-38bdf8.svg?logo=tailwind-css)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/ceritli/panoptesui-react/pulls)
[![Contributions Welcome](https://img.shields.io/badge/Contributions-welcome-orange.svg)](https://github.com/ceritli/panoptesui-react)
[![Website](https://img.shields.io/badge/website-panoptesui.com-indigo.svg)](https://panoptesui.com)

**[🌐 Website](https://panoptesui.com)** &bull; **[🇬🇧 English](#-english-documentation)** &bull; **[🇹🇷 Türkçe](#-türkçe-dokümantasyon)**

</div>

---

## 🇬🇧 English Documentation

### Overview

**Panoptes UI for React** is a high-performance, license-free, modern enterprise UI component suite and DataGrid engine built with **React, TypeScript, and Tailwind CSS**.

It brings the enterprise-grade power of commercial component suites (Telerik, DevExpress, AG Grid) into the open-source React ecosystem, designed specifically to handle large datasets, complex filtering, multi-sorting, grouping, editing, and exports with a clean, lightweight footprint.

Official website: **[https://panoptesui.com](https://panoptesui.com)**

---

### ✨ Key Features

- **📊 High-Performance DataGrid:** Handles thousands of rows with ease, both client-side and server-side data models.
- **🚀 Server-Side & Local Processing:** Seamlessly integrates with ASP.NET Core (`Panoptes.Core` / `ToDataSourceResultAsync`) or any REST/GraphQL API.
- **🎨 Tailwind CSS Native:** Styled with modern, accessible Tailwind design patterns, custom themeable, light/dark mode friendly.
- **🔍 Advanced Filtering:** Column popover filter menus, search bars, range filters, and quick filters.
- **⚡ Sorting & Multi-Sort:** Column header multi-sorting with indicator badges.
- **📁 Grouping & Aggregates:** Drag & drop column grouping with group headers, counts, sums, and averages.
- **✏️ 3 Editing Modes:** In-line row editing, in-cell batch editing, and popup modal editing.
- **📑 Excel & PDF Export:** One-click Excel (.xlsx) and PDF export engine built-in.
- **🖼️ Built-in Cell Templates:** Sparklines, Star Ratings, Status Badges, Country Flags, Product Thumbnails, and Currency formatters.
- **🌍 Internationalization (i18n):** 18 built-in locales with automatic RTL (Right-to-Left) text direction support.
- **🧩 40+ Enterprise Components:** DataGrid, TreeList, Spreadsheet, Scheduler, Gantt, TaskBoard (Kanban), and rich Form inputs.

---

### 📦 Installation

```bash
npm install @panoptesui/react
# or
yarn add @panoptesui/react
# or
pnpm add @panoptesui/react
```

Include the styles in your application root:

```tsx
import '@panoptesui/react/dist/index.css';
```

#### 🌐 Standalone CDN Kurulumu (Build Step Olmadan)

Herhangi bir Node.js veya derleyiciye ihtiyaç duymadan, düz bir HTML veya PHP sayfasına doğrudan ekleyebilirsiniz:

##### Yöntem A: Klasik UMD Script (`window.PanoptesUI`)
```html
<!-- 1. React & ReactDOM CDN -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- 2. Panoptes UI Standalone CSS & JS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@panoptesui/react/dist/panoptesui.min.css">
<script src="https://cdn.jsdelivr.net/npm/@panoptesui/react/dist/panoptesui.umd.js"></script>

<script>
  const { PanoptesGrid, GridColumn, PanoptesOtp, PanoptesRating, PanoptesSwitch } = window.PanoptesUI;
  // window.PanoptesUI üzerinden tüm 60+ bileşene erişebilirsiniz.
</script>
```

##### Yöntem B: Modern ES Modules (ESM)
```html
<link rel="stylesheet" href="https://esm.sh/@panoptesui/react/dist/panoptesui.min.css">

<script type="module">
  import React from 'https://esm.sh/react@18';
  import ReactDOM from 'https://esm.sh/react-dom@18/client';
  import { PanoptesGrid, GridColumn, PanoptesOtp } from 'https://esm.sh/@panoptesui/react';
</script>
```

---

### ⚡ Quick Start

```tsx
import React from 'react';
import { PanoptesGrid, GridColumn } from '@panoptesui/react';
import '@panoptesui/theme/index.css';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

const products: Product[] = [
  { id: 1, name: 'MacBook Pro 16"', category: 'Electronics', price: 2499, stock: 45, status: 'Active' },
  { id: 2, name: 'Dell XPS 15', category: 'Electronics', price: 1899, stock: 28, status: 'Active' },
  { id: 3, name: 'Ergonomic Chair', category: 'Furniture', price: 450, stock: 12, status: 'Pending' }
];

export function ProductCatalog() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <PanoptesGrid
        data={products}
        pageSize={10}
        pageSizes={[5, 10, 25, 50]}
        sortable={true}
        filterable={true}
        searchable={true}
        selectable={{ mode: 'multiple', checkboxOnly: true }}
        exportable={true}
      >
        <GridColumn field="id" title="ID" width="70px" align="center" />
        <GridColumn field="name" title="Product Name" sortable filterable />
        <GridColumn field="category" title="Category" width="160px" sortable />
        <GridColumn field="price" title="Price" width="130px" format="currency" align="right" sortable />
        <GridColumn field="stock" title="Stock" width="100px" align="center" sortable />
        <GridColumn field="status" title="Status" width="120px" align="center" />
      </PanoptesGrid>
    </div>
  );
}
```

---

### 🌐 Server-Side Data Binding (Connecting to ASP.NET Core / Web API)

Simply pass the `url` and `method` prop to delegate paging, filtering, and sorting to your backend API:

```tsx
<PanoptesGrid
  url="https://api.example.com/api/products/read"
  method="POST"
  pageSize={10}
  sortable={true}
  filterable={true}
  searchable={true}
>
  <GridColumn field="id" title="ID" width="80px" />
  <GridColumn field="name" title="Name" />
  <GridColumn field="price" title="Price" format="currency" />
</PanoptesGrid>
```

---

### 🛠️ Grid Props Reference

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data` | `T[]` | `[]` | Local array of records to display. |
| `url` | `string` | `undefined` | Remote API endpoint for server-side operations. |
| `method` | `'POST' \| 'GET'` | `'POST'` | HTTP method for remote endpoint. |
| `pageSize` | `number` | `10` | Default number of records per page. |
| `pageSizes` | `number[]` | `[5, 10, 20]` | Dropdown options for page size selector. |
| `sortable` | `boolean` | `true` | Enables single & multi-column sorting. |
| `filterable` | `boolean` | `false` | Enables column-based filter popover menus. |
| `groupable` | `boolean` | `false` | Enables column drag-to-group panel. |
| `selectable` | `boolean \| object` | `false` | Row selection (single or multi with checkbox). |
| `searchable` | `boolean` | `false` | Shows a live search input on the toolbar. |
| `editable` | `'inline' \| 'incell' \| 'popup' \| false` | `false` | Editing mode for records. |
| `exportable` | `boolean` | `false` | Adds Excel (.xlsx) export button to toolbar. |
| `pdfExport` | `boolean` | `false` | Adds PDF export button to toolbar. |

---

### 🚀 Running the Interactive Showcase Demo

This repository includes a full interactive Vite application showcasing all 15+ feature scenarios and 40+ components:

```bash
# Clone the repository
git clone https://github.com/ceritli/panoptesui-react.git
cd panoptesui-react

# Install dependencies and start demo
npm install
npm run dev
```

Open `http://localhost:3000` to view the live showcase.

---

### 🤝 Contributing & Community

**Panoptes UI for React is 100% open source, free, and community-driven!**
Contributions from everyone are warmly welcomed, whether you are fixing a typo, proposing a feature, or writing a brand-new component:

- 💡 **Suggest Features & Ideas:** Open an [Issue](https://github.com/ceritli/panoptesui-react/issues) to request new components or enhancements.
- 🐛 **Report Bugs:** Help us improve by filing bug reports with steps to reproduce.
- 🚀 **Submit Pull Requests:** Fork the repository, create your branch, and send a PR! Every contribution is valued and acknowledged.
- 💬 **Discussions & Feedback:** Share your questions and project showcase on [GitHub Discussions](https://github.com/ceritli/panoptesui-react/discussions) or visit [panoptesui.com](https://panoptesui.com).

---

<br />

## 🇹🇷 Türkçe Dokümantasyon

### Genel Bakış

**Panoptes UI for React**, React 18 ve 19 sürümleri için geliştirilmiş; lisans maliyetsiz, kurumsal seviyede yüksek performanslı bir DataGrid ve UI bileşen kütüphanesidir. **TypeScript** ile tam tipli ve **Tailwind CSS** ile yerel uyumludur.

Ticari kütüphanelerin (Telerik UI, DevExpress, Syncfusion) sunduğu kurumsal veri yönetimi yeteneklerini modern, hafif ve bağımsız bir yapıda React ekosistemine kazandırır.

Resmi web sitesi: **[https://panoptesui.com](https://panoptesui.com)**

---

### ✨ Öne Çıkan Özellikler

- **📊 Yüksek Performanslı Tablo (DataGrid):** Binlerce satırlık veriyi hem istemci tarafında hem de sunucu taraflı sorunsuz işler.
- **🚀 Sunucu & İstemci Veri İşleme:** ASP.NET Core (`Panoptes.Core`), Node.js, Python veya herhangi bir REST API ile tam uyumludur.
- **🎨 Yerel Tailwind CSS:** Saf CSS ve modern Tailwind sınıfları ile şık kurumsal tasarım, açık/koyu tema uyumu.
- **🔍 Gelişmiş Filtreleme:** Sütun bazlı açılır filtre menüleri, metin araması, sayısal ve tarih aralığı filtreleri.
- **⚡ Çoklu Sütun Sıralama (Multi-Sort):** Başlıklara tıklayarak çok kriterli sıralama.
- **📁 Gruplama ve Alt Toplamlar (Aggregates):** Sütunları sürükleyip bırakarak gruplama; adet, toplam, ortalama hesaplama.
- **✏️ 3 Farklı Düzenleme Modu:** Satır içi (In-line), hücre içi toplu (In-cell batch) ve açılır modal pencere (Popup).
- **📑 Excel ve PDF Çıktısı:** Tek tıkla Excel (.xlsx) ve PDF olarak dışa aktarma motoru.
- **🖼️ Zengin Hücre Şablonları:** Sparkline mini grafikleri, Yıldız puanı, Durum rozetleri, Ülke bayrakları ve Para birimi biçimlendiricileri.
- **🌍 18 Dilde Lokalizasyon (i18n):** Türkçe, İngilizce ve RTL (Arapça vb.) dillerine hazır altyapı.
- **🧩 40+ Kurumsal Bileşen:** DataGrid, TreeList, Spreadsheet (Excel benzeri hesap tablosu), Scheduler (Randevu/Takvim), Gantt (İş Planı), TaskBoard (Kanban) ve Form elemanları.

---

### 📦 Kurulum

```bash
npm install @panoptesui/react
# veya
yarn add @panoptesui/react
# veya
pnpm add @panoptesui/react
```

Uygulamanızın ana giriş dosyasına stil dosyasını ekleyin:

```tsx
import '@panoptesui/theme/index.css';
```

---

### ⚡ Hızlı Başlangıç

```tsx
import React from 'react';
import { PanoptesGrid, GridColumn } from '@panoptesui/react';
import '@panoptesui/theme/index.css';

interface Urun {
  id: number;
  ad: string;
  kategori: string;
  fiyat: number;
  stok: number;
  durum: string;
}

const urunler: Urun[] = [
  { id: 1, ad: 'MacBook Pro 16"', kategori: 'Elektronik', fiyat: 89000, stok: 45, durum: 'Aktif' },
  { id: 2, ad: 'Dell XPS 15', kategori: 'Elektronik', fiyat: 65000, stok: 28, durum: 'Aktif' },
  { id: 3, ad: 'Ergonomik Koltuk', kategori: 'Ofis', fiyat: 14500, stok: 12, durum: 'Beklemede' }
];

export function UrunListesi() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <PanoptesGrid
        data={urunler}
        pageSize={10}
        pageSizes={[5, 10, 25, 50]}
        sortable={true}
        filterable={true}
        searchable={true}
        selectable={{ mode: 'multiple', checkboxOnly: true }}
        exportable={true}
      >
        <GridColumn field="id" title="ID" width="70px" align="center" />
        <GridColumn field="ad" title="Ürün Adı" sortable filterable />
        <GridColumn field="kategori" title="Kategori" width="160px" sortable />
        <GridColumn field="fiyat" title="Fiyat" width="140px" format="currency" align="right" sortable />
        <GridColumn field="stok" title="Stok" width="100px" align="center" sortable />
        <GridColumn field="durum" title="Durum" width="120px" align="center" />
      </PanoptesGrid>
    </div>
  );
}
```

---

### 🌐 Sunucu Taraflı Bağlantı (ASP.NET Core / Web API Entegrasyonu)

Büyük veri setlerinde sayfalama ve filtrelemeyi doğrudan sunucuya yaptırmak için `url` parametresini tanımlamanız yeterlidir:

```tsx
<PanoptesGrid
  url="/api/urunler/read"
  method="POST"
  pageSize={10}
  sortable={true}
  filterable={true}
  searchable={true}
>
  <GridColumn field="id" title="ID" width="80px" />
  <GridColumn field="ad" title="Ürün Adı" />
  <GridColumn field="fiyat" title="Fiyat" format="currency" />
</PanoptesGrid>
```

---

### 🚀 Canlı Demoyu Çalıştırma

Bu repodaki interaktif Vite demosunu başlatmak ve 15'ten fazla senaryoyu canlı incelemek için:

```bash
# Repoyu klonlayın
git clone https://github.com/ceritli/panoptesui-react.git
cd panoptesui-react

# Bağımlılıkları yükleyin ve başlatın
npm install
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresine giderek vitrini canlı test edebilirsiniz.

---

### 🤝 Katkıda Bulunma (Herkesin Katkısına Tamamen Açık!)

**Panoptes UI for React %100 açık kaynaklıdır ve topluluk katkılarına sonuna kadar açıktır!**
Projeyi daha da geliştirmek ve büyütmek isteyen herkesin katılımını ve katkısını bekliyoruz. Deneyim seviyeniz ne olursa olsun aramıza katılabilirsiniz:

- 💡 **Fikir ve Özellik Önerileri:** Projede görmek istediğiniz yeni bir bileşen veya özellik mi var? Yeni bir [Issue (Konu)](https://github.com/ceritli/panoptesui-react/issues) açarak bize iletebilirsiniz.
- 🐛 **Hata Bildirimi:** Karşılaştığınız herhangi bir sorunu detaylarıyla paylaşarak çözümüne katkı sağlayabilirsiniz.
- 🚀 **Pull Request (Kod ve Dokümantasyon Katkısı):** Repoyu fork edip dilediğiniz geliştirmeyi yaparak Pull Request gönderebilirsiniz. Dokümantasyondaki küçük bir yazım düzeltmesinden sıfırdan yeni bir React bileşenine kadar her katkı bizim için çok kıymetlidir.
- 💬 **Geri Bildirim & İletişim:** Kullanım deneyimlerinizi, sorularınızı ve önerilerinizi [GitHub Discussions](https://github.com/ceritli/panoptesui-react/discussions) üzerinden veya [panoptesui.com](https://panoptesui.com) adresinden paylaşabilirsiniz.

---

### 📄 Lisans

Bu proje **[MIT Lisansı](LICENSE)** ile lisanslanmıştır. Kurumsal, ticari ve açık kaynaklı projelerinizde ücretsiz olarak kullanılabilir.

Daha fazla bilgi ve dokümantasyon: **[https://panoptesui.com](https://panoptesui.com)**
