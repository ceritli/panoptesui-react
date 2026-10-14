import React, { useState, useMemo } from 'react';
import { usePanoptesLocale } from '@panoptes/react';
import { getSiteTranslation } from '../i18n/siteTranslations';

export interface ComparisonItem {
  id: string;
  name: string;
  category: 'data' | 'forms' | 'nav' | 'popups' | 'scheduling' | 'charts' | 'tools';
  categoryName: string;
  status: 'ready' | 'partial' | 'planned';
  statusLabel: string;
  badgeClass: string;
  progress: number;
  featurePages: string[];
  panoptesPages?: Array<{ name: string; id?: string; url?: string }>;
  readyFeatures: string[];
  missingFeatures: string[];
}

interface ComponentCatalogDemoProps {
  onNavigate: (id: string) => void;
}

export function getPanoptesPages(comp: ComparisonItem, locale = 'tr'): Array<{ name: string; id: string }> {
  const t = getSiteTranslation(locale);

  // If the item is the main data grid, retain its 15 detailed feature sub-pages
  if (comp.id === 'grid') {
    return (comp.panoptesPages || []).map(p => ({
      name: p.id && t.catalog.gridPages[p.id] ? t.catalog.gridPages[p.id] : p.name,
      id: p.id || 'overview'
    }));
  }

  // All 44+ components have dedicated showcase pages with live preview & TSX source code
  const dedicatedIds = [
    'treelist', 'pivotgrid', 'spreadsheet', 'listview', 'pager', 'propertygrid',
    'datepicker', 'daterangepicker', 'timepicker', 'datetimepicker',
    'dropdownlist', 'combobox', 'autocomplete', 'multiselect', 'dropdowntree', 'multicolumncombobox',
    'textbox', 'numerictextbox', 'textarea', 'maskedtextbox', 'switch', 'checkbox',
    'radiogroup', 'slider', 'rating', 'colorpicker', 'otp', 'signature', 'upload', 'editor', 'form',
    'menu', 'tabstrip', 'panelbar', 'drawer', 'treeview', 'stepper', 'breadcrumb',
    'toolbar', 'splitter', 'tilelayout', 'scrollview', 'actionsheet',
    'window', 'dialog', 'notification', 'tooltip',
    'scheduler', 'gantt', 'taskboard',
    'stockchart', 'gauges', 'barcode', 'diagram', 'map',
    'pdfviewer', 'filter', 'mediaplayer', 'chat'
  ];

  if (dedicatedIds.includes(comp.id)) {
    return [{ name: t.catalog.cardDemoButton(comp.name), id: comp.id }];
  }

  if (comp.panoptesPages && comp.panoptesPages.length > 0) {
    return comp.panoptesPages.map(p => ({
      name: p.name,
      id: p.id || comp.id
    }));
  }

  return [{ name: t.catalog.cardDemoButton(comp.name), id: comp.id }];
}

export const COMPONENT_CATALOG: ComparisonItem[] = [
  // 1. Data Management & Grid
  {
    id: 'grid',
    name: 'Grid (Data Grid)',
    category: 'data',
    categoryName: 'Veri Yönetimi & Grid',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: [
      'Overview', 'Paging', 'Multi-Column Sorting', 'Column Filtering & Popover',
      'Grouping & Aggregates', 'Checkbox & Row Selection', 'Inline Editing',
      'In-Cell (Batch) Editing', 'Modal (Popup) Editing', 'Hierarchy (Master-Detail)',
      'Column Menu & Visibility', 'Excel (XLSX/CSV) Export', 'PDF Export',
      'React Props API', 'Events Logging Console'
    ],
    panoptesPages: [
      { name: '1. Genel Bakış (Overview)', id: 'overview' },
      { name: '2. Sayfalama (Paging)', id: 'paging' },
      { name: '3. Çoklu Sıralama (Sorting)', id: 'sorting' },
      { name: '4. Filtreleme & Arama (Filtering)', id: 'filtering' },
      { name: '5. Gruplama & Özetler (Grouping)', id: 'grouping' },
      { name: '6. Satır & Checkbox Seçimi', id: 'selection' },
      { name: '7. Hiyerarşi & Alt Grid (Detail)', id: 'hierarchy' },
      { name: '8. Sütun Yönetimi & Görünürlük', id: 'columns' },
      { name: '9. Hücre İçi (Batch Edit)', id: 'incell' },
      { name: '10. Satır İçi Düzenleme (Inline)', id: 'inline' },
      { name: '11. Modal Düzenleme (Popup)', id: 'popup' },
      { name: '12. Özel Hücre Şablonları', id: 'templates' },
      { name: '13. Excel & PDF Dışa Aktarma', id: 'export' },
      { name: '14. React Props & State API', id: 'api' },
      { name: '15. Canlı Olaylar Konsolu', id: 'events' }
    ],
    readyFeatures: [
      'React 19 + TypeScript + Tailwind CSS ile sıfır dış bağımlılık',
      'İstemci tarafı & sunucu uyumlu sayfalama, sayfa boyutu seçici ve özet bilgi',
      'Çoklu sütun sıralama (Asc, Desc ve sıralama sırası rozetleri)',
      'Hızlı anlık metin arama ve sütun başı açılır filtre popover menüsü (Metin sığdırma ve Enter desteği)',
      'Sütun bazlı çoklu seviye gruplama ve ara toplam hesaplamaları',
      'Tekli / çoklu checkbox seçimi ve başlıkta tümünü seç/kaldır',
      '3 farklı düzenleme modu: Satır içi (Inline), Hücre içi (In-cell/Batch) ve Modal (Popup)',
      'Master-Detail açılır alt grid hiyerarşisi ve dinamik yükleme',
      'Sütun görünürlüğü gizleme/gösterme menüsü (Column Visibility Menu)',
      'Türkçe karakter uyumlu Excel (CSV/XLSX) ve yüksek çözünürlüklü PDF çıktısı',
      'Tam durum yönetimi (React Props & State API) ve canlı etkileşim konsolu'
    ],
    missingFeatures: [],
  },
  {
    id: 'treelist',
    name: 'TreeList (Hiyerarşik Ağaç Tablosu)',
    category: 'data',
    categoryName: 'Veri Yönetimi & Grid',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Overview', 'Hierarchical / Self-Referencing', 'Column Formatting', 'Live Search', 'Client API'],
    panoptesPages: [
      { name: 'TreeList & ListView & Pager', id: 'treelist' },
      { name: 'Hiyerarşik Alt Grid (Master-Detail)', id: 'hierarchy' }
    ],
    readyFeatures: [
      'Parent-Child hiyerarşik derinlik seviyesine göre dinamik girintileme',
      'Açılır/kapanır dallar ve animasyonlu chevron ikonları',
      'Canlı metin arama ve eşleşen düğümlerin üst dallarını otomatik açma',
      'Tümünü Aç / Tümünü Kapat araç çubuğu kontrolleri',
      'Para birimi, rozet ve özel sütun biçimlendirmeleri'
    ],
    missingFeatures: [],
  },
  {
    id: 'pivotgrid',
    name: 'PivotGrid (Küp Analizi & Çapraz Tablo)',
    category: 'data',
    categoryName: 'Veri Yönetimi & Grid',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['OLAP & Flat Data', 'KPI & Configurator', 'Cross-Tab Matrix', 'CSV Export'],
    panoptesPages: [{ name: 'Gruplama & Küp Özetleri', id: 'grouping' }],
    readyFeatures: [
      'Çok boyutlu satır ve sütun kırılımlı çapraz tablo hesaplama motoru',
      'İnteraktif Boyut & Metrik Yapılandırıcı (Pivot Configurator)',
      'Dinamik satır toplamları, sütun toplamları ve genel toplam (Grand Total)',
      'Para birimi ve sayısal metrik formatlama',
      'Doğrudan tarayıcıdan CSV / Excel uyumlu dışa aktarma'
    ],
    missingFeatures: [],
  },
  {
    id: 'spreadsheet',
    name: 'Spreadsheet (Hesap Tablosu)',
    category: 'data',
    categoryName: 'Veri Yönetimi & Grid',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Excel-like Sheet UI', 'Formulas & Math', 'Ribbon Toolbar', 'Multi-Sheet', 'CSV Export'],
    panoptesPages: [{ name: 'Hücre İçi (Batch Edit)', id: 'incell' }, { name: 'Excel Dışa Aktarma', id: 'export' }],
    readyFeatures: [
      'Tarayıcı içinde canlı formül hesaplama motoru (=SUM, =AVERAGE, dört işlem)',
      'fx formül çubuğu ve aktif hücre koordinat göstergesi (A1, B4 vb.)',
      'Şerit (Ribbon) araç çubuğu: Kalın, İtalik, Hizalama, Para Birimi (₺), Yüzde (%)',
      'Çoklu çalışma sayfası sekmeleri (Multi-Sheet Tabs)',
      'Hücre içi çift tıklama ile doğrudan düzenleme (Inline Edit)',
      'Excel uyumlu CSV formatında anında dışa aktarma'
    ],
    missingFeatures: [],
  },
  {
    id: 'listview',
    name: 'ListView (Kart & Şablonlu Liste)',
    category: 'data',
    categoryName: 'Veri Yönetimi & Grid',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Overview', 'Custom Card Templates', 'Paging', 'Selection', 'Search Toolbar'],
    panoptesPages: [
      { name: 'ListView (Kart Görünümü)', id: 'treelist' },
      { name: 'Özel Şablonlar (Templates)', id: 'templates' }
    ],
    readyFeatures: [
      'React JSX kart şablon motoru ve alternatif renklendirme',
      'Dahili sayfalama (Pager), sayfa boyutu seçici ve özet bilgi',
      'Tekli ve çoklu kart seçimi (Selection), Tümünü Seç ve Temizle',
      'Anlık arama (Debounce) ve sıralama araç çubuğu (Toolbar)',
      'Kart içi Ekle, Düzenle, Kaydet ve Sil CRUD desteği'
    ],
    missingFeatures: [],
  },
  {
    id: 'pager',
    name: 'Pager (Sayfalayıcı)',
    category: 'data',
    categoryName: 'Veri Yönetimi & Grid',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Standalone Pager', 'Page Size Selector', 'Info Summary'],
    panoptesPages: [
      { name: 'Bağımsız Pager Demosu', id: 'treelist' },
      { name: 'Grid Sayfalama (Paging)', id: 'paging' }
    ],
    readyFeatures: [
      'Data Grid içerisinde tam entegre çalışır',
      'Sayfa numaraları, önceki/sonraki, ilk/son butonları',
      'Dinamik sayfa boyutu seçici (5, 10, 25, 50, 100)',
      'Toplam kayıt ve gösterilen aralık özet yazısı'
    ],
    missingFeatures: [],
  },
  {
    id: 'propertygrid',
    name: 'PropertyGrid (Özellik Düzenleyici)',
    category: 'data',
    categoryName: 'Veri Yönetimi & Grid',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Key-Value Editor', 'Grouping', 'Custom Editors'],
    panoptesPages: [{ name: 'PropertyGrid (Özellik Denetleyici)', id: 'tools' }],
    readyFeatures: [
      'Kategori bazlı nesne özellik gruplaması (Genel, Davranış, Görünüm)',
      'Metin, sayı, boolean, seçim listesi ve renk düzenleyici tipleri',
      'Anlık özellik arama ve filtreleme kutusu',
      'React state ve onChange bildirimleri'
    ],
    missingFeatures: [],
  },

  // 2. Form Inputs & Editors
  {
    id: 'datepicker',
    name: 'DatePicker (Tarih Seçici)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Date Formatting', 'Min/Max Dates', 'Client API'],
    readyFeatures: [
      'Türkçe ay/gün isimli modern takvim popover',
      'DD.MM.YYYY formatlama ve klavye ile elle giriş desteği',
      'Min/Max tarih sınırlandırmaları',
      'React state onChange/value API desteği'
    ],
    missingFeatures: [],
  },
  {
    id: 'daterangepicker',
    name: 'DateRangePicker (Tarih Aralığı)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Range Presets', 'Start/End Binding', 'Client API'],
    readyFeatures: [
      'Tek girdi kutusunda çift tarih aralık seçimi (Başlangıç - Bitiş)',
      'Hızlı tarih önayarları (Bugün, Dün, Son 7 Gün, Bu Ay, Geçen Ay)',
      'startDate ve endDate React state bağlama'
    ],
    missingFeatures: [],
  },
  {
    id: 'timepicker',
    name: 'TimePicker (Saat Seçici)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', '24h/12h Formats', 'Interval Step', 'Client API'],
    readyFeatures: [
      '24 saatlik format ve saat/dakika hızlı seçim paneli',
      'Dakika adım aralığı (step: 5, 10, 15, 30 dk)',
      'Min/Max saat kısıtlamaları ve temizleme butonu'
    ],
    missingFeatures: [],
  },
  {
    id: 'datetimepicker',
    name: 'DateTimePicker (Tarih & Saat)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Combined Popup', 'Fast Switch', 'Client API'],
    readyFeatures: [
      'Tek entegre popover üzerinde birleşik takvim ve saat seçimi',
      'Türkiye standart 24 saatlik DD.MM.YYYY HH:mm formatı',
      'React state ve olay konsolu entegrasyonu'
    ],
    missingFeatures: [],
  },
  {
    id: 'select',
    name: 'DropDownList (Açılır Seçim)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Remote Data', 'Filtering', 'Grouping'],
    readyFeatures: [
      'Canlı filtreleme/arama kutusu',
      'JSON ve uzaktan veri bağlama',
      'Kategori/optgroup etiketli gruplama',
      'Temizleme butonu ve klavye gezintisi'
    ],
    missingFeatures: [],
  },
  {
    id: 'multiselect',
    name: 'MultiSelect (Çoklu Seçim Çipleri)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Tag / Chip Rendering', 'Checkbox Selection', 'Select All'],
    readyFeatures: [
      'Etiketli/çipli çoklu seçim rozetleri',
      'Açılır listede checkbox ile seçim',
      'Tek tıkla Tümünü Seç ve Temizle butonları',
      'Anlık metin filtreleme desteği'
    ],
    missingFeatures: [],
  },
  {
    id: 'combobox',
    name: 'ComboBox (Girdi & Liste)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Custom Input Entry', 'Server Filtering', 'Client API'],
    readyFeatures: [
      'Hem listeden seçim hem de serbest özel metin girebilme',
      'Canlı filtreleme ve React state kontrolü',
      'Klavye yön tuşları ile gezinti'
    ],
    missingFeatures: [],
  },
  {
    id: 'autocomplete',
    name: 'AutoComplete (Otomatik Tamamlama)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Min Length Trigger', 'Remote Data', 'Client API'],
    readyFeatures: [
      'Yazdıkça anında otomatik öneri getirme',
      'Minimum karakter tetikleme (min-length) ayarı',
      'Yerel JSON ve klavye gezintisi'
    ],
    missingFeatures: [],
  },
  {
    id: 'numerictextbox',
    name: 'NumericTextBox (Sayı & Para Formatı)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Currency & Percentage', 'Spin Buttons', 'Min/Max/Step'],
    readyFeatures: [
      'Para birimi (₺, $, €) ve ondalık biçimlendirme',
      'Yukarı/aşağı spin butonları ve klavye ok tuşları',
      'Min/Max kısıtlamaları, step adımı ve hassasiyet ayarı'
    ],
    missingFeatures: [],
  },
  {
    id: 'textbox',
    name: 'TextBox (Metin Kutusu)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Clear Button', 'Icons & Adornments', 'Floating Label'],
    readyFeatures: [
      'Tek tıkla temizleme butonu (Clear Button)',
      'Sol/sağ SVG ikon ve metin ekleri (Adornments)',
      'Tailwind modern odaklama ve doğrulama durumları'
    ],
    missingFeatures: [],
  },
  {
    id: 'textarea',
    name: 'TextArea (Çok Satırlı Metin)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Auto-resizing', 'Character Counter', 'MaxLength'],
    readyFeatures: [
      'Yazıldıkça içeriğe göre otomatik uzayan yükseklik (Auto-resize)',
      'Canlı kalan karakter sayısı sayacı',
      'Maksimum karakter kısıtlaması'
    ],
    missingFeatures: [],
  },
  {
    id: 'switch',
    name: 'Switch (Aç/Kapa Anahtar)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Custom Labels', 'Sizes & Colors', 'Client API'],
    readyFeatures: [
      'Animasyonlu geçiş anahtarı',
      'Açık/Kapalı özel durum metinleri',
      'React state ve devre dışı (disabled) modu'
    ],
    missingFeatures: [],
  },
  {
    id: 'checkbox',
    name: 'CheckBox (Onay Kutusu & Tri-State)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Indeterminate State', 'Label Position'],
    readyFeatures: [
      'Özel Tailwind SVG onay işareti',
      'Yarı-seçili (Indeterminate) üçüncü durum',
      'Grid satır seçimiyle tam entegre mimari'
    ],
    missingFeatures: [],
  },
  {
    id: 'radiogroup',
    name: 'RadioGroup (Seçenek Grubu)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Horizontal / Vertical', 'Card Style'],
    readyFeatures: [
      'Yatay veya dikey dizilim modları',
      'Kart şeklinde modern seçim kutuları',
      'Dinamik liste bağlama ve klavye seçimi'
    ],
    missingFeatures: [],
  },
  {
    id: 'maskedtextbox',
    name: 'MaskedTextBox (Maskeli Giriş)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Phone & SSN Masks', 'Rules & Validation'],
    readyFeatures: [
      'Telefon, TCKN, IBAN, Vergi No ve Plaka maskeleri',
      'Kullanıcı yazarken otomatik ayrıştırma',
      'Pano yapıştırma (Paste) sırasında maske uyumluluğu'
    ],
    missingFeatures: [],
  },
  {
    id: 'colorpicker',
    name: 'ColorPicker (Renk Seçici)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Palette & Spectrum', 'HEX / RGB', 'Presets'],
    readyFeatures: [
      'Açılır renk paleti ve hazır renk tonları',
      'HEX kod girişi ve canlı önizleme kutucuğu',
      'React state bağlama desteği'
    ],
    missingFeatures: [],
  },
  {
    id: 'upload',
    name: 'Upload (Dosya ve Belge Yükleyici)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Overview', 'Async Upload', 'Drag & Drop Area', 'File Validation', 'Progress Bar'],
    readyFeatures: [
      'Sürükle-bırak (Drag & Drop) ve butonla dosya seçimi',
      'Gerçek zamanlı yüzde ilerleme çubuğu simülasyonu',
      'Dosya uzantısı (allowedExtensions) ve boyut doğrulaması',
      'Özel dosya türü ikonları (PDF, Word, Excel, Resim, Zip)'
    ],
    missingFeatures: [],
  },
  {
    id: 'editor',
    name: 'Editor (Zengin Metin WYSIWYG)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Overview', 'Formatting Tools', 'Tables & Images', 'HTML Source Mode', 'Clean Paste'],
    readyFeatures: [
      'H1, H2, H3, Paragraf ve Kod Bloğu başlık stilleri',
      'Kalın, İtalik, Altı Çizili ve metin hizalama araçları',
      'Tablo, Bağlantı (Link) ve Görsel ekleme motoru',
      'Anında geçiş yapılan iki yönlü HTML Kaynak Kodu modu',
      'Canlı kelime ve karakter istatistik sayacı'
    ],
    missingFeatures: [],
  },
  {
    id: 'slider',
    name: 'Slider & RangeSlider (Sürgü & Aralık)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Overview', 'Dual Handle Range', 'Ticks & Tooltip', 'Stepper Buttons'],
    readyFeatures: [
      'Tekli veya çift tutamaçlı (dual-handle) kaydırma çubuğu',
      'Fare, dokunmatik (touch) ve klavye ok tuşları ile adımlama',
      'Sürükleme anında canlı hareket eden dinamik Tooltip balonu',
      'Min, Max ve Step aralık sınırlandırması'
    ],
    missingFeatures: [],
  },
  {
    id: 'rating',
    name: 'Rating (Puanlama & Yıldızlar)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Overview', 'Star & Heart Icons', 'Half-star Precision', 'Readonly Mode'],
    panoptesPages: [{ name: 'Özel Şablonlar (Templates)', id: 'templates' }],
    readyFeatures: [
      'Yıldız ve kalp vektörel SVG ikon türleri',
      '0.5 yarım puan hassasiyeti ile tıklama ve önizleme',
      'Grid hücrelerinde doğrudan çalışan interaktif puanlayıcı',
      'Salt okunur (readonly) ve devre dışı (disabled) durumları'
    ],
    missingFeatures: [],
  },
  {
    id: 'signature',
    name: 'Signature (Dijital Islak İmza)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Canvas Signature Pad', 'Stroke Smoothing', 'Export PNG/SVG', 'Clear & Undo'],
    readyFeatures: [
      'HTML5 Canvas tabanlı pürüzsüz vektörel ıslak imza çizim motoru',
      'Dokunmatik ekran (touch) ve fare (mouse) tam uyumluluğu',
      'Temizle (Clear) ve son darbeyi geri alma (Undo) araç çubuğu',
      'Mürekkep rengi ve çizgi kalınlığı özelleştirme',
      'Base64 PNG indirme ve dışa aktarma'
    ],
    missingFeatures: [],
  },
  {
    id: 'otp',
    name: 'OtpInput (SMS & PIN Kodu)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Segmented Boxes', 'Auto-Focus', 'SMS Paste', 'Masked PIN'],
    readyFeatures: [
      'Segmentli kutucuklar (4, 6 veya özel uzunluk)',
      'Otomatik sonraki kutuya geçiş ve Backspace ile geri silme',
      'Pano yapıştırma (paste) desteği',
      'Şifreli görünüm (mask: true) ve onComplete callback'
    ],
    missingFeatures: [],
  },
  {
    id: 'form',
    name: 'Form (Deklaratif React Form Yapılandırıcı)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Overview', 'Orientation', 'Layout', 'Groups', 'Validation'],
    panoptesPages: [{ name: 'Modal CRUD (Popup Edit)', id: 'popup' }, { name: 'Satır İçi CRUD', id: 'inline' }],
    readyFeatures: [
      'TypeScript şema tabanlı deklaratif form inşası',
      'Formik / React Hook Form uyumlu doğrulama durumları',
      'Grid ve Stack (Yatay/Dikey) yerleşim düzenleri',
      'Alan gruplama (Fieldset) ve hata mesajı göstergeleri'
    ],
    missingFeatures: [],
  },
  {
    id: 'dropdowntree',
    name: 'DropDownTree (Açılır Ağaç Seçici)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Checkboxes', 'Appearance', 'Floating Label', 'Filtering', 'Remote Data'],
    readyFeatures: [
      'Hiyerarşik tekli seçim ve etiketli çoklu seçim çipleri',
      'Üç durumlu onay kutuları (Tri-state checkboxes)',
      'Otomatik alt düğüm seçimi (Cascading check)',
      'Gerçek zamanlı arama ve eşleşen düğüm vurgulama'
    ],
    missingFeatures: [],
  },
  {
    id: 'multicolumncombobox',
    name: 'MultiColumnComboBox (Çok Sütunlu Açılır Tablo)',
    category: 'forms',
    categoryName: 'Form & Editörler',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Overview', 'Columns', 'Templates', 'Filtering'],
    readyFeatures: [
      'Çok sütunlu açılır mini ızgara görünümü',
      'Sabit sütun başlıkları (Sticky Table Header)',
      'Çoklu alanda filtreleme & arama (Ad, Kategori vb.)',
      'Klavye gezintisi ve hızlı temizleme'
    ],
    missingFeatures: [],
  },

  // 3. Navigation & Layout
  {
    id: 'menu',
    name: 'Menu & ContextMenu (Sağ Tık Menüsü)',
    category: 'nav',
    categoryName: 'Navigasyon & Yerleşim',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Horizontal / Vertical Menu', 'Multi-level Submenus', 'Right-Click Context Menu'],
    readyFeatures: [
      'Çok seviyeli hiyerarşik açılır menü ağacı',
      'Sağ tık hedefli Context Menu motoru',
      'Ekran kenar kontrolü (auto-flip / collision avoidance)',
      'Klavye kısayolları ve rozet desteği'
    ],
    missingFeatures: [],
  },
  {
    id: 'tabstrip',
    name: 'TabStrip (Sekmeli Panel)',
    category: 'nav',
    categoryName: 'Navigasyon & Yerleşim',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Dynamic Tabs', 'Closable Tabs', 'Lazy Loading'],
    panoptesPages: [{ name: 'Modül Sekmeleri', id: 'overview' }],
    readyFeatures: [
      '4 farklı yön konumu (top, bottom, left, right)',
      'Kapatılabilir sekmeler ve aktif sekme geçişi',
      'Dinamik sekme ekleme/kaldırma',
      'Klavye gezintisi ve akıcı fade animasyonları'
    ],
    missingFeatures: [],
  },
  {
    id: 'panelbar',
    name: 'PanelBar (Akordeon Panel)',
    category: 'nav',
    categoryName: 'Navigasyon & Yerleşim',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Collapsible Panels', 'Single / Multi Expand', 'Templates', 'Events'],
    readyFeatures: [
      'Single (akordeon - tek açık) ve Multiple (çoklu açık) modları',
      'Dahili SVG ikonlar, rozetler ve pasif panel desteği',
      'Animasyonlu açılma/kapanma geçişleri'
    ],
    missingFeatures: [],
  },
  {
    id: 'drawer',
    name: 'Drawer (Yan Çekmece)',
    category: 'nav',
    categoryName: 'Navigasyon & Yerleşim',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Mini / Full Sidebar', 'Overlay / Push Mode', 'Events', 'Right/Left Positions'],
    readyFeatures: [
      'Sol ve sağ açılma konumu (position: left | right)',
      'Karartmalı backdrop ve dış tıkla / ESC ile kapatma',
      'Mini ve genişletilmiş yan çubuk modları'
    ],
    missingFeatures: [],
  },
  {
    id: 'treeview',
    name: 'TreeView (Klasör/Ağaç Yapısı)',
    category: 'nav',
    categoryName: 'Navigasyon & Yerleşim',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Hierarchical Tree', 'Checkboxes', 'Drag & Drop', 'Load on Demand'],
    panoptesPages: [{ name: 'Hiyerarşik Alt Grid', id: 'hierarchy' }],
    readyFeatures: [
      'Sınırsız derinlikte hiyerarşik çocuk düğüm ağacı',
      'Tri-State Indeterminate checkbox seçimi ve ebeveyn-çocuk senkronu',
      'Dosya, klasör ve veri tabanı ikonları',
      'Düğüm seçimi ve programatik expand/collapse'
    ],
    missingFeatures: [],
  },
  {
    id: 'stepper',
    name: 'Stepper & Wizard (Sihirbaz)',
    category: 'nav',
    categoryName: 'Navigasyon & Yerleşim',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Step-by-step', 'Linear / Free Flow', 'Validation', 'Icons', 'Horizontal / Vertical'],
    readyFeatures: [
      'Yatay ve dikey yönlendirme desteği',
      'Doğrusal akış kontrolü (linear: true), adım atlama koruması',
      'Onay rozetleri, alt açıklamalar ve adım içi validasyon'
    ],
    missingFeatures: [],
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb (Yol Çubuğu)',
    category: 'nav',
    categoryName: 'Navigasyon & Yerleşim',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Auto Generation', 'Delimiters & Icons', 'Disabled Items'],
    readyFeatures: [
      'Çoklu ayraç stilleri: chevron, slash (/), arrow (->)',
      'Home, klasör ve döküman SVG ikonları',
      'Aktif sayfa (aria-current) ve tıklama olayları'
    ],
    missingFeatures: [],
  },
  {
    id: 'toolbar',
    name: 'ToolBar (Araç Çubuğu)',
    category: 'nav',
    categoryName: 'Navigasyon & Yerleşim',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Button Bar', 'Inputs in Toolbar', 'Responsive Overflow', 'Button Groups'],
    panoptesPages: [{ name: 'Arama & Filtre Araç Çubuğu', id: 'filtering' }],
    readyFeatures: [
      'Eylem butonları, buton grupları ve dikey ayırıcılar',
      'Dahili hızlı arama input alanı ve export butonları',
      'Responsive flex satır kaydırma'
    ],
    missingFeatures: [],
  },
  {
    id: 'splitter',
    name: 'Splitter (Panel Bölücü)',
    category: 'nav',
    categoryName: 'Navigasyon & Yerleşim',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Horizontal/Vertical', 'Resizable Panes', 'Collapse'],
    readyFeatures: [
      'Yatay ve dikey yönelim (horizontal/vertical)',
      'Fare ve dokunmatik ile pürüzsüz sürükleyerek boyutlandırma',
      'Min-size ve max-size boyut sınırlandırmaları'
    ],
    missingFeatures: [],
  },
  {
    id: 'tilelayout',
    name: 'TileLayout (Pano & Dashboard Düzeni)',
    category: 'nav',
    categoryName: 'Navigasyon & Yerleşim',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['2D Resizing', 'Reordering', 'Add/Remove Tiles', 'State Persistence'],
    readyFeatures: [
      '2 Boyutlu CSS Grid tabanlı dinamik pano motoru',
      'Sürükle-bırak ile kartları yeniden sıralama',
      '2 Boyutlu köşe tutamacı ile ızgara hizalı boyutlandırma',
      'Pano düzeni durumunu saklama (localStorage state persistence)'
    ],
    missingFeatures: [],
  },
  {
    id: 'scrollview',
    name: 'ScrollView (Carousel & Galeri)',
    category: 'nav',
    categoryName: 'Navigasyon & Yerleşim',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Overview', 'Templates', 'Data Binding', 'Events', 'API'],
    readyFeatures: [
      'Dokunmatik (touch) ve fare ile sürükleme desteği',
      'Otomatik oynatma (autoplay) ve döngü (loop) özellikleri',
      'Özel kart ve ürün önizleme şablonları'
    ],
    missingFeatures: [],
  },
  {
    id: 'actionsheet',
    name: 'ActionSheet & BottomNav (Mobil Alt Sayfa)',
    category: 'nav',
    categoryName: 'Navigasyon & Yerleşim',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Overview', 'Animation', 'Action Buttons', 'Keyboard Navigation'],
    readyFeatures: [
      'Alttan açılan mobil uyumlu modern eylem sayfası (Bottom-sheet)',
      'Dokunmatik aşağı kaydırarak kapatma hareketi (Swipe-to-dismiss)',
      'Semantik buton renkleri ve SVG ikonlar'
    ],
    missingFeatures: [],
  },

  // 4. Popups & Dialogs
  {
    id: 'window',
    name: 'Window (Sürüklenebilir Masaüstü Penceresi)',
    category: 'popups',
    categoryName: 'Popuplar & Modallar',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Modal / Non-modal', 'Draggable & Resizable', 'Minimize / Maximize'],
    panoptesPages: [{ name: 'Modal CRUD (Popup Edit)', id: 'popup' }],
    readyFeatures: [
      'Başlık çubuğundan serbestçe sürüklenebilen (draggable) pencere',
      'Kenar ve köşelerden pürüzsüz boyutlandırma (resizable)',
      'Tam ekran yapma (maximize) ve başlığa katlama (minimize)',
      'Modal veya non-modal serbest çalışma modları'
    ],
    missingFeatures: [],
  },
  {
    id: 'dialog',
    name: 'Dialog (Alert / Confirm / Prompt)',
    category: 'popups',
    categoryName: 'Popuplar & Modallar',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Confirm / Prompt', 'Action Buttons', 'Keyboard Esc/Enter'],
    panoptesPages: [{ name: 'Modal CRUD (Popup Edit)', id: 'popup' }],
    readyFeatures: [
      'Promise tabanlı modern API: alert, confirm, prompt',
      'Klavye navigasyonu (ESC kapatma, Enter onaylama)',
      'Tehlikeli silme işlemleri için tehlike (danger) onay penceresi'
    ],
    missingFeatures: [],
  },
  {
    id: 'notification',
    name: 'Notification (Toast Bildirimleri)',
    category: 'popups',
    categoryName: 'Popuplar & Modallar',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Success/Error/Info', 'Auto-Hide Timer', 'Corner Stacking'],
    panoptesPages: [{ name: 'Hücre İçi (Batch) Kayıt Toast', id: 'incell' }, { name: 'Dışa Aktarma Toast', id: 'export' }],
    readyFeatures: [
      'Semantik durumlar (Success, Error, Warning, Info)',
      'Otomatik gizlenme süresi ve progress bar geri sayımı',
      'Hover anında süreyi duraklatma ve çoklu bildirim yığınlama'
    ],
    missingFeatures: [],
  },
  {
    id: 'tooltip',
    name: 'Tooltip & Popover',
    category: 'popups',
    categoryName: 'Popuplar & Modallar',
    status: 'ready',
    statusLabel: 'TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Hover/Click Triggers', 'Dynamic Positioning', 'Custom HTML'],
    panoptesPages: [{ name: 'Filtre Popover Menüsü', id: 'filtering' }],
    readyFeatures: [
      'Sütun filtreleme popover menüsü ve akıllı konumlandırma',
      'Buton açıklama balonları ve durum etiketleri'
    ],
    missingFeatures: [],
  },

  // 5. Scheduling & Project Management
  {
    id: 'scheduler',
    name: 'Scheduler (Takvim & Randevu Çizelgesi)',
    category: 'scheduling',
    categoryName: 'Planlama & Ajanda',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Day, Week, Month View', 'Timeline', 'Recurring Events', 'Drag & Drop'],
    readyFeatures: [
      'Günlük (Day), Haftalık (Week) ve Aylık (Month) görünüm modları',
      'Önceki, Sonraki ve Bugün butonları ile dinamik tarih gezintisi',
      'Etkinliğe tıklandığında detay modal penceresi',
      'Türkçe ay ve gün yerelleştirmesi'
    ],
    missingFeatures: [],
  },
  {
    id: 'gantt',
    name: 'Gantt (Gantt Şeması & Zaman Çizelgesi)',
    category: 'scheduling',
    categoryName: 'Planlama & Ajanda',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Task Hierarchy', 'Timeline Grid', 'Progress Tracking', 'Interactive Events'],
    panoptesPages: [{ name: 'Hiyerarşik Ağaç Tablosu', id: 'hierarchy' }],
    readyFeatures: [
      'Sol panelde hiyerarşik görev ağacı ve tamamlanma yüzdeleri',
      'Sağ panelde otomatik gün/tarih eksenli zaman çizelgesi ızgarası',
      'Görev çubuklarında dinamik genişlik ve ilerleme dolgusu (progress bar)'
    ],
    missingFeatures: [],
  },
  {
    id: 'taskboard',
    name: 'TaskBoard (Kanban Panosu)',
    category: 'scheduling',
    categoryName: 'Planlama & Ajanda',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Columns & Cards', 'Drag & Drop', 'Column CRUD'],
    readyFeatures: [
      'HTML5 sürükle ve bırak (Drag-and-Drop) kart taşıma motoru',
      'Kart öncelik rozetleri (Urgent, High, Medium, Low)',
      'Atanan kullanıcı avatarları, etiketler ve bitiş tarihleri',
      'Sütun bazlı anlık kart sayaçları'
    ],
    missingFeatures: [],
  },

  // 6. Charts & Data Visualization
  {
    id: 'charts',
    name: 'Charts (İş & Raporlama Grafikleri)',
    category: 'charts',
    categoryName: 'Grafikler & Görselleştirme',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Bar & Column', 'Line & Area', 'Pie & Donut', 'Responsive Vector SVG'],
    panoptesPages: [{ name: 'Özel Şablonlar & Barlar', id: 'templates' }],
    readyFeatures: [
      'Column, Bar, Line, Area, Pie, Donut grafik türleri',
      'Saf SVG vektörel çizim motoru (harici bağımlılıksız)',
      'Responsive boyutlandırma ve interaktif hover efektleri',
      'Dinamik değer tooltip kutusu'
    ],
    missingFeatures: [],
  },
  {
    id: 'stockchart',
    name: 'StockChart (Finansal Mum Grafiği)',
    category: 'charts',
    categoryName: 'Grafikler & Görselleştirme',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Candlestick', 'Volume Chart', 'Date Range Buttons', 'Crosshair', 'PNG Export'],
    readyFeatures: [
      'OHLC (Açılış, Yüksek, Düşük, Kapanış) mum çubukları ve hacim grafiği',
      'Yeşil/Kırmızı boğa/ayı dinamik renk şeması',
      '1H, 1A, 3A, 6A, 1Y ve Tümü hızlı periyot seçici butonları',
      'Etkileşimli Crosshair göstergesi ve detaylı floating tooltip'
    ],
    missingFeatures: [],
  },
  {
    id: 'gauges',
    name: 'Gauges (İbreli & Kadranlı Göstergeler)',
    category: 'charts',
    categoryName: 'Grafikler & Görselleştirme',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Radial Gauge', 'Linear Gauge', 'Arc Gauge', 'Dynamic Needles'],
    readyFeatures: [
      'Radial (240° dairesel ölçek ve merkez ibre/needle)',
      'Arc (180° yarım çember yay dolumu ve dijital değer)',
      'Linear (Dikey/yatay termometre dolumu)',
      'Renkli eşik aralıkları (Yeşil, Sarı, Kırmızı)'
    ],
    missingFeatures: [],
  },
  {
    id: 'barcode',
    name: 'Barcode & QRCode (Barkod ve Karekod)',
    category: 'charts',
    categoryName: 'Grafikler & Görselleştirme',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['EAN, Code128, Code39', 'QR Code Generator', 'Vector SVG Output'],
    readyFeatures: [
      'Code 128, Code 39 ve EAN-13 1D çizgili barkod formatları',
      'Piksel matrisli 2D QRCode vektörel SVG çizimi',
      'Baskı kalitesinde net vektörel çıktı'
    ],
    missingFeatures: [],
  },
  {
    id: 'diagram',
    name: 'Diagram & OrgChart (Şema & Akış)',
    category: 'charts',
    categoryName: 'Grafikler & Görselleştirme',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Flowcharts', 'Org Chart Hierarchy', 'Shapes & Connectors', 'Pan & Zoom', 'SVG Export'],
    readyFeatures: [
      'İş Akış Şeması (Flowchart) ve Organizasyon Şeması (OrgChart)',
      'Düğümler (Nodes) ve yönlendirilmiş bağlayıcılar (Connectors)',
      'Etkileşimli tuval kaydırma (Pan) ve yakınlaştırma (Zoom)',
      'Vektörel SVG formatında anında dışa aktarma'
    ],
    missingFeatures: [],
  },
  {
    id: 'map',
    name: 'Map (Coğrafi Vektör Harita)',
    category: 'charts',
    categoryName: 'Grafikler & Görselleştirme',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    progress: 100,
    featurePages: ['Tile Layers', 'Bubble Layer', 'GeoJSON', 'Markers', 'Export'],
    readyFeatures: [
      'Çoklu raster karo sağlayıcıları (OpenStreetMap, Esri vb.)',
      'Oransal kabarcık katmanı (Bubble Layer) ile veri görselleştirme',
      'GeoJSON çokgen sınırları ve hover/tıklama etkileşimi',
      'Özel animasyonlu iğneler (Markers) ve popup pencereleri'
    ],
    missingFeatures: [],
  },

  // 7. Media, Documents & Tools
  {
    id: 'pdfviewer',
    name: 'PDFViewer (PDF Döküman Okuyucu)',
    category: 'tools',
    categoryName: 'Medya & Döküman',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Browser Rendering', 'Page Navigation', 'Zoom & Fit', 'Print & Download'],
    panoptesPages: [{ name: 'PDF Dışa Aktarma Demosu', id: 'export' }],
    readyFeatures: [
      'Tarayıcı içi sayfaları gezdiren döküman okuyucu',
      'Sayfa gezintisi (Önceki, Sonraki, Sayfa No/Toplam)',
      'Genişliğe sığdır (Fit to Width) ve yakınlaştırma (Zoom)',
      'Doğrudan yazdırma (Print) ve dosya indirme',
      'Grid PDF Export ile tam entegre ekosistem'
    ],
    missingFeatures: [],
  },
  {
    id: 'filter',
    name: 'Filter (Görsel Koşul & Sorgu Motoru)',
    category: 'tools',
    categoryName: 'Medya & Döküman',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Expression Builder', 'And/Or Logic', 'Fields & Operators', 'Dynamic Types'],
    panoptesPages: [{ name: 'Filtreleme & Arama Demosu', id: 'filtering' }],
    readyFeatures: [
      'Görsel çok katmanlı VE/VEYA mantıksal sorgu ağacı (Visual Query Builder)',
      'Dinamik alan, tip ve karşılaştırma işleçleri (metin, sayı, boolean)',
      'İç içe alt koşul ve alt grup ekleme / silme desteği',
      'Grid veri filtresiyle tam uyumlu sorgu nesnesi çıktısı'
    ],
    missingFeatures: [],
  },
  {
    id: 'mediaplayer',
    name: 'MediaPlayer (Video & Ses Oynatıcı)',
    category: 'tools',
    categoryName: 'Medya & Döküman',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['HTML5 Video/Audio', 'Playlists', 'Custom Controls', 'Seek & Volume', 'Fullscreen'],
    panoptesPages: [{ name: 'Medya & Döküman Araçları (MediaPlayer)', id: 'tools' }],
    readyFeatures: [
      'HTML5 Video ve Ses için ortak modern tasarım',
      'Play, Pause, Seek Bar ve süre göstergesi',
      'Ses seviyesi sürgüsü ve Sessize Al (Mute) butonu',
      'Çalma Listeli (Playlist) video/ses seçici ve tam ekran modu'
    ],
    missingFeatures: [],
  },
  {
    id: 'chat',
    name: 'Chat (Conversational UI & Mesajlaşma)',
    category: 'tools',
    categoryName: 'Medya & Döküman',
    status: 'ready',
    statusLabel: '%100 TAM HAZIR',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold',
    progress: 100,
    featurePages: ['Chat Bubbles', 'Suggested Actions', 'Attachments', 'Typing Indicator'],
    panoptesPages: [{ name: 'Chat (Yapay Zeka & Mesajlaşma)', id: 'tools' }],
    readyFeatures: [
      'Gelen ve giden mesaj balonları, zaman damgası ve avatar desteği',
      'Hızlı öneri butonları (Suggested Actions / Quick Replies)',
      'Otomatik yapay zeka asistanı yanıt simülasyonu',
      'Metin giriş çubuğu ve Enter ile anında gönderme'
    ],
    missingFeatures: [],
  }
];

export function ComponentCatalogDemo({ onNavigate }: ComponentCatalogDemoProps) {
  const { locale } = usePanoptesLocale();
  const t = getSiteTranslation(locale);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Translations from centralized dictionary
  const categoryLabels: Record<string, string> = {
    data: t.catalog.categories.data,
    forms: t.catalog.categories.forms,
    nav: t.catalog.categories.nav,
    popups: t.catalog.categories.popups,
    scheduling: t.catalog.categories.scheduling,
    charts: t.catalog.categories.charts,
    tools: t.catalog.categories.tools,
  };

  const statusLabels: Record<string, string> = {
    ready: t.catalog.statuses.ready,
    partial: t.catalog.statuses.partial,
    planned: t.catalog.statuses.planned,
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = COMPONENT_CATALOG.length;
    const ready = COMPONENT_CATALOG.filter(c => c.status === 'ready').length;
    const partial = COMPONENT_CATALOG.filter(c => c.status === 'partial').length;
    const planned = COMPONENT_CATALOG.filter(c => c.status === 'planned').length;
    const readyPercent = Math.round((ready / total) * 100);
    return { total, ready, partial, planned, readyPercent };
  }, []);

  // Filtered components
  const filteredComponents = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return COMPONENT_CATALOG.filter(comp => {
      // 1. Status Filter
      if (selectedStatus !== 'all' && comp.status !== selectedStatus) return false;

      // 2. Category Filter
      if (selectedCategory !== 'all' && comp.category !== selectedCategory) return false;

      // 3. Search Query
      if (q) {
        const inName = comp.name.toLowerCase().includes(q);
        const inCat = comp.categoryName.toLowerCase().includes(q);
        const inFeatures = comp.featurePages.some(p => p.toLowerCase().includes(q));
        const inReady = comp.readyFeatures.some(f => f.toLowerCase().includes(q));
        const inMissing = comp.missingFeatures.some(m => m.toLowerCase().includes(q));
        if (!inName && !inCat && !inFeatures && !inReady && !inMissing) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedStatus, selectedCategory]);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Top Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-20 -top-10 w-60 h-60 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 backdrop-blur-sm mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {t.catalog.heroBadge}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {t.catalog.heroTitlePrefix}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                {t.catalog.heroHighlight}
              </span>{' '}
              {t.catalog.heroTitleSuffix}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              {t.catalog.heroDesc}
            </p>
          </div>

          {/* Global KPI Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 text-center min-w-[100px]">
              <div className="text-2xl font-black text-white">{stats.total}</div>
              <div className="text-[11px] text-slate-300 font-medium uppercase tracking-wider mt-0.5">
                {t.catalog.totalComponents}
              </div>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-md rounded-2xl p-3.5 border border-emerald-400/30 text-center min-w-[100px]">
              <div className="text-2xl font-black text-emerald-300">{stats.ready}</div>
              <div className="text-[11px] text-emerald-200 font-medium uppercase tracking-wider mt-0.5">
                {t.catalog.fullyReady}
              </div>
            </div>
            <div className="bg-amber-500/20 backdrop-blur-md rounded-2xl p-3.5 border border-amber-400/30 text-center min-w-[100px]">
              <div className="text-2xl font-black text-amber-300">{stats.partial}</div>
              <div className="text-[11px] text-amber-200 font-medium uppercase tracking-wider mt-0.5">
                {t.catalog.partial}
              </div>
            </div>
            <div className="bg-slate-700/40 backdrop-blur-md rounded-2xl p-3.5 border border-slate-600/30 text-center min-w-[100px]">
              <div className="text-2xl font-black text-slate-300">{stats.planned}</div>
              <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                {t.catalog.planned}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar Summary */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-200">
                {t.catalog.coreTitle}
              </span>
              <span className="text-emerald-400 font-bold">
                {t.catalog.coreCompleted}
              </span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500 w-full"></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-200">
                {t.catalog.maturityTitle}
              </span>
              <span className="text-emerald-400 font-bold">
                {t.catalog.maturityReady(stats.ready, stats.total, stats.readyPercent)}
              </span>
            </div>
            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden flex">
              <div 
                className="bg-emerald-400 h-full transition-all duration-500 rounded-full" 
                style={{ width: `${stats.readyPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter & Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t.catalog.searchPlaceholder}
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-2xs transition"
            />
            <svg
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Status Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => setSelectedStatus('all')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                selectedStatus === 'all'
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{t.catalog.statusAll}</span>
              <span className="bg-white/20 text-inherit px-1.5 py-0.5 rounded-full text-[10px]">
                {stats.total}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('ready')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                selectedStatus === 'ready'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${selectedStatus === 'ready' ? 'bg-white' : 'bg-emerald-500'}`}></span>
              <span>{t.catalog.statusReady}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedStatus === 'ready' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {stats.ready}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('partial')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                selectedStatus === 'partial'
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${selectedStatus === 'partial' ? 'bg-white' : 'bg-amber-500'}`}></span>
              <span>{t.catalog.statusPartial}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedStatus === 'partial' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
              }`}>
                {stats.partial}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedStatus('planned')}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                selectedStatus === 'planned'
                  ? 'bg-slate-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${selectedStatus === 'planned' ? 'bg-white' : 'bg-slate-400'}`}></span>
              <span>{t.catalog.statusPlanned}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedStatus === 'planned' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {stats.planned}
              </span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 text-xs no-scrollbar">
          {[
            { id: 'all', label: t.catalog.categories.all, icon: '' },
            { id: 'data', label: categoryLabels.data, icon: '📊' },
            { id: 'forms', label: categoryLabels.forms, icon: '🧩' },
            { id: 'nav', label: categoryLabels.nav, icon: '🗂️' },
            { id: 'popups', label: categoryLabels.popups, icon: '🪟' },
            { id: 'scheduling', label: categoryLabels.scheduling, icon: '📅' },
            { id: 'charts', label: categoryLabels.charts, icon: '📈' },
            { id: 'tools', label: categoryLabels.tools, icon: '📑' }
          ].map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'font-bold bg-blue-50 text-blue-700 border border-blue-200 shadow-2xs'
                    : 'font-medium text-slate-600 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {cat.icon && <span>{cat.icon}</span>}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Active Filter Feedback & Count */}
      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 px-1 gap-2">
        <div>
          {t.catalog.showing}
          <span className="font-bold text-slate-800">{filteredComponents.length}</span> / {stats.total}{' '}
          {t.catalog.componentsUnit}
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> {t.catalog.legendReady}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> {t.catalog.legendPartial}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span> {t.catalog.legendPlanned}
          </span>
        </div>
      </div>

      {/* 4. Main Comparison Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredComponents.map(comp => {
          let borderAccent = 'border-slate-200 hover:border-slate-300';
          let progressColor = 'bg-slate-400';
          if (comp.status === 'ready') {
            borderAccent = 'border-slate-200 hover:border-emerald-400 shadow-2xs';
            progressColor = 'bg-emerald-500';
          } else if (comp.status === 'partial') {
            borderAccent = 'border-slate-200 hover:border-amber-400 shadow-2xs';
            progressColor = 'bg-amber-500';
          }

          const currentCategoryName = categoryLabels[comp.category] || comp.categoryName;
          const currentStatusLabel = statusLabels[comp.status] || comp.statusLabel;

          return (
            <div
              key={comp.id}
              className={`bg-white rounded-2xl p-5 border ${borderAccent} flex flex-col justify-between transition group hover:shadow-md`}
            >
              <div>
                {/* Header Info */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                      {currentCategoryName}
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition">
                      {comp.name}
                    </h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase border shrink-0 ${comp.badgeClass}`}>
                    {currentStatusLabel}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 mb-3">
                  <div className="flex justify-between text-[11px] font-medium text-slate-500">
                    <span>{t.catalog.cardReadiness}</span>
                    <span className="font-bold text-slate-700">%{comp.progress}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`${progressColor} h-full rounded-full transition-all duration-300`}
                      style={{ width: `${comp.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Feature Tags */}
                <div className="mb-3">
                  <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    {t.catalog.cardKeyCapabilities}
                  </div>
                  <div className="flex flex-wrap gap-1 items-center">
                    {comp.featurePages.slice(0, 5).map((page, idx) => (
                      <span
                        key={idx}
                        className="inline-block px-1.5 py-0.5 text-[10px] bg-slate-100 text-slate-600 rounded border border-slate-200"
                      >
                        {page}
                      </span>
                    ))}
                    {comp.featurePages.length > 5 && (
                      <span className="text-[10px] text-slate-400 font-medium">
                        {t.catalog.cardMoreFeatures(comp.featurePages.length - 5)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-100">
                  {comp.readyFeatures.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                        <span>{t.catalog.cardSupportedFeatures}</span>
                      </div>
                      <ul className="space-y-1">
                        {comp.readyFeatures.map((f, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                            <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {comp.missingFeatures.length > 0 && (
                    <div className="space-y-1 mt-2 pt-2 border-t border-dashed border-slate-100">
                      <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                        <span>{t.catalog.cardRoadmap}</span>
                      </div>
                      <ul className="space-y-1">
                        {comp.missingFeatures.map((m, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-slate-400">
                            <span className="text-slate-400 font-bold shrink-0 mt-0.5">○</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Links */}
              <div>
                {/* Panoptes Live Demo Pages */}
                {(() => {
                  const livePages = getPanoptesPages(comp, locale);
                  return (
                    <div className="mt-3 pt-3 border-t border-slate-100">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>
                          {t.catalog.cardLivePages} ({livePages.length})
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {livePages.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              if (p.id) onNavigate(p.id);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 transition shadow-2xs cursor-pointer"
                          >
                            <span>{p.name}</span>
                            <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          );
        })}
      </div>

      {filteredComponents.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400 space-y-3">
          <div className="text-3xl">🔍</div>
          <div className="text-sm font-bold text-slate-700">
            {t.catalog.emptyTitle}
          </div>
          <div className="text-xs text-slate-400">
            {t.catalog.emptyDesc}
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('all');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold hover:bg-blue-100 transition cursor-pointer"
          >
            {t.catalog.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
}
