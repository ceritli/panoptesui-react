export interface SiteTranslation {
  header: {
    brandSubtitle: string;
    badge: string;
    catalogButton: string;
    catalogButtonShort: string;
  };
  sidebar: {
    searchPlaceholder: string;
    emptyMatch: string;
    catalogBannerBadge: string;
    catalogBannerTitle: string;
    catalogBannerDesc: string;
  };
  banner: {
    suiteTitle: string;
    suiteSubtitle: string;
    zeroDependency: string;
    exploreCatalog: string;
  };
  footer: {
    copyright: string;
    subtitle: string;
    stack: string;
    zeroDep: string;
  };
  subNav: Record<string, string>;
  overview: {
    badge: string;
    localData: string;
    heroTitle: string;
    heroDesc: string;
    totalProducts: string;
    totalProductsUnit: string;
    totalRevenue: string;
    avgRating: string;
    supplierCountries: string;
    supplierCountriesUnit: string;
    currencySymbol: string;
    currencyLocale: string;
    colProductSupplier: string;
    colCategory: string;
    colCountry: string;
    colPrice: string;
    colStock: string;
    colStatus: string;
    colRating: string;
    colTargetSales: string;
    inStock: string;
    outOfStock: string;
  };
  catalog: {
    heroBadge: string;
    heroTitlePrefix: string;
    heroHighlight: string;
    heroTitleSuffix: string;
    heroDesc: string;
    totalComponents: string;
    fullyReady: string;
    partial: string;
    planned: string;
    coreTitle: string;
    coreCompleted: string;
    maturityTitle: string;
    maturityReady: (ready: number, total: number, percent: number) => string;
    searchPlaceholder: string;
    statusAll: string;
    statusReady: string;
    statusPartial: string;
    statusPlanned: string;
    categories: {
      all: string;
      data: string;
      forms: string;
      nav: string;
      popups: string;
      scheduling: string;
      charts: string;
      tools: string;
    };
    statuses: {
      ready: string;
      partial: string;
      planned: string;
    };
    showing: string;
    componentsUnit: string;
    legendReady: string;
    legendPartial: string;
    legendPlanned: string;
    cardReadiness: string;
    cardKeyCapabilities: string;
    cardMoreFeatures: (count: number) => string;
    cardSupportedFeatures: string;
    cardRoadmap: string;
    cardLivePages: string;
    cardDemoButton: (name: string) => string;
    emptyTitle: string;
    emptyDesc: string;
    clearFilters: string;
    gridPages: Record<string, string>;
  };
  pages: {
    paging: {
      title: string;
      badge: string;
      desc: string;
      recordsPerPage: string;
      recordsUnit: string;
      total: string;
      productsUnit: string;
      totalPages: string;
      codeTitle: string;
    };
    sorting: {
      title: string;
      badge: string;
      desc: string;
      quickSort: string;
      highestPrice: string;
      highestRating: string;
      lowestStock: string;
      reset: string;
      tip: string;
      codeTitle: string;
    };
    filtering: {
      title: string;
      badge: string;
      desc: string;
      quickFilter: string;
      allCategories: string;
      codeTitle: string;
    };
    grouping: {
      title: string;
      badge: string;
      desc: string;
      colRevenue: string;
    };
    selection: {
      title: string;
      badge: string;
      desc: string;
      selectionState: string;
      rowsSelected: string;
      totalAmount: string;
      clearSelection: string;
      jsonOutput: string;
      currencySymbol: string;
      currencyLocale: string;
    };
    columns: {
      title: string;
      badge: string;
      desc: string;
      columnChooser: string;
      countryCol: string;
      stockCol: string;
      ratingCol: string;
      targetSalesCol: string;
    };
    hierarchy: {
      title: string;
      badge: string;
      desc: string;
      analysisCard: string;
      supplierInfo: string;
      warehouseLogistics: string;
      itemsInStock: (stock: number) => string;
      fastDelivery: string;
      annualRevenue: string;
      targetAchieved: string;
      currencySymbol: string;
      currencyLocale: string;
    };
    incell: {
      title: string;
      badge: string;
      desc: string;
      colNameEditable: string;
    };
    inline: {
      title: string;
      badge: string;
      desc: string;
      codeTitle: string;
    };
    popup: {
      title: string;
      badge: string;
      desc: string;
      codeTitle: string;
    };
    export: {
      title: string;
      badge: string;
      desc: string;
      codeTitle: string;
    };
    templates: {
      title: string;
      badge: string;
      desc: string;
      colProductImage: string;
      colCountryFlag: string;
      inStockBadge: string;
      outOfStockBadge: string;
    };
    api: {
      title: string;
      badge: string;
      desc: string;
      selectedCount: string;
      jsonOutput: string;
    };
    events: {
      title: string;
      badge: string;
      desc: string;
      consoleTitle: string;
      clearConsole: string;
      readyLog: (count: number) => string;
      rowSelectedLog: (count: number) => string;
      rowSavedLog: (id: number, name: string) => string;
      emptyLogs: string;
    };
  };
  app: {
    loadingData: string;
    viewCode: string;
  };
  common: {
    columns: {
      id: string;
      product: string;
      productName: string;
      category: string;
      country: string;
      price: string;
      stock: string;
      status: string;
      rating: string;
      targetSales: string;
      actions: string;
      supplier: string;
    };
    status: {
      inStock: string;
      outOfStock: string;
    };
    paging: {
      recordsPerPage: string;
      recordsUnit: string;
      total: string;
      totalPages: string;
    };
    quickFilter: string;
    allCategories: string;
    quickSort: string;
    highestPrice: string;
    highestRating: string;
    lowestStock: string;
    reactUsageCode: string;
  };
}

export const siteTranslations: Record<'tr' | 'en', SiteTranslation> = {
  tr: {
    header: {
      brandSubtitle: 'React 19 Kurumsal Paket',
      badge: '44 Kurumsal UI Bileşeni',
      catalogButton: 'Bileşen Kataloğu & Yetenekler',
      catalogButtonShort: 'Katalog',
    },
    sidebar: {
      searchPlaceholder: 'Bileşen ara... (44 bileşen)',
      emptyMatch: 'Eşleşen bileşen bulunamadı.',
      catalogBannerBadge: 'ÖNE ÇIKAN',
      catalogBannerTitle: 'Bileşen Kataloğu & Yetenekler',
      catalogBannerDesc: 'Tüm kurumsal bileşenleri inceleyin →',
    },
    banner: {
      suiteTitle: 'Panoptes UI Enterprise',
      suiteSubtitle: 'Kurumsal React UI Bileşen Paketi',
      zeroDependency: 'Sıfır Dış Bağımlılık / %100 İstemci Tarafı',
      exploreCatalog: 'Bileşen Kataloğunu İncele',
    },
    footer: {
      copyright: 'Panoptes UI for React',
      subtitle: 'Modern Kurumsal UI & Data Grid Kütüphanesi',
      stack: 'React 19 + TypeScript + Tailwind CSS',
      zeroDep: 'Sıfır Dış Sunucu Bağımlılığı / %100 Yerel Veri',
    },
    subNav: {
      overview: 'Genel Bakış',
      paging: 'Sayfalama',
      sorting: 'Sıralama',
      filtering: 'Filtreleme',
      grouping: 'Gruplama',
      selection: 'Seçim',
      hierarchy: 'Hiyerarşi',
      columns: 'Sütunlar',
      incell: 'Hücre İçi',
      inline: 'Satır İçi',
      popup: 'Modal',
      templates: 'Şablonlar',
      export: 'Dışa Aktar',
      api: 'Props API',
      events: 'Olaylar',
    },
    overview: {
      badge: 'Panoptes Kurumsal Data Grid',
      localData: '%100 Bağımsız & Yerel JSON',
      heroTitle: 'Panoptes UI for React - Data Grid Genel Bakış',
      heroDesc: 'Sıfır harici sunucu bağımlılığı; istemci tarafında anlık çalışan sayfalama, çoklu sütun sıralama, filtreleme, sürükle-bırak gruplama, hücre içi düzenleme, çoklu seçim, zengin hücre şablonları ve Excel/PDF dışa aktarma.',
      totalProducts: 'Toplam Ürün',
      totalProductsUnit: 'Kayıt',
      totalRevenue: 'Toplam Hasılat',
      avgRating: 'Ortalama Puan',
      supplierCountries: 'Tedarikçi Ülke',
      supplierCountriesUnit: 'Farklı Ülke',
      currencySymbol: '₺',
      currencyLocale: 'tr-TR',
      colProductSupplier: 'Ürün Adı & Tedarikçi',
      colCategory: 'Kategori',
      colCountry: 'Ülke',
      colPrice: 'Fiyat',
      colStock: 'Stok',
      colStatus: 'Durum',
      colRating: 'Puan',
      colTargetSales: 'Hedef Satış',
      inStock: 'Stokta',
      outOfStock: 'Tükendi',
    },
    catalog: {
      heroBadge: 'Kurumsal Ekosistem & Yetenek Panosu',
      heroTitlePrefix: 'Panoptes UI — ',
      heroHighlight: '44 Kurumsal Bileşen',
      heroTitleSuffix: ' Kataloğu',
      heroDesc: 'Panoptes React ekosistemindeki tüm gelişmiş UI bileşenleri, veri ızgaraları, form kontrolleri ve görselleştirme araçlarının kapsamlı yetenek matrisi ve canlı demo bağlantıları.',
      totalComponents: 'Toplam Bileşen',
      fullyReady: '✅ Tam Hazır',
      partial: '⚠️ Kısmen Var',
      planned: '⏳ Planlanan',
      coreTitle: 'React Kurumsal Çekirdek (Data Grid & 15 Alt Modül)',
      coreCompleted: '%100 Tamamlandı',
      maturityTitle: 'Genel Kurumsal UI Kütüphane Olgunluğu',
      maturityReady: (ready, total, percent) => `%${percent} Hazır (${ready} / ${total} Bileşen)`,
      searchPlaceholder: 'Bileşen adı, özellik veya anahtar kelime ile anında ara (Örn: Paging, Excel, Batch, Modal, TreeList)...',
      statusAll: 'Tümü',
      statusReady: 'Hazır',
      statusPartial: 'Kısmen',
      statusPlanned: 'Planlanan',
      categories: {
        all: 'Tüm Kategoriler',
        data: 'Veri Yönetimi & Grid',
        forms: 'Form & Editörler',
        nav: 'Navigasyon & Yerleşim',
        popups: 'Popuplar & Modallar',
        scheduling: 'Planlama & Ajanda',
        charts: 'Grafikler & Görselleştirme',
        tools: 'Medya & Döküman',
      },
      statuses: {
        ready: '%100 TAM HAZIR',
        partial: '%75 KISMEN HAZIR',
        planned: 'PLANLANAN',
      },
      showing: 'Gösterilen: ',
      componentsUnit: ' Bileşen',
      legendReady: 'Hazır ve Canlı',
      legendPartial: 'Kısmen / Şablonla Var',
      legendPlanned: 'Planlanan / Yol Haritasında',
      cardReadiness: 'Bileşen Hazırlık Oranı',
      cardKeyCapabilities: 'Öne Çıkan Yetenekler:',
      cardMoreFeatures: (count) => `+${count} özellik`,
      cardSupportedFeatures: 'Desteklenen Özellikler:',
      cardRoadmap: 'Yol Haritası (Ek Özellikler):',
      cardLivePages: 'Panoptes Canlı Sayfaları',
      cardDemoButton: (name) => `${name} Demosu (Canlı + Kod)`,
      emptyTitle: 'Aramanıza uygun bileşen bulunamadı',
      emptyDesc: 'Arama terimini değiştirebilir veya filtreleri sıfırlayabilirsiniz.',
      clearFilters: 'Filtreleri Temizle',
      gridPages: {
        overview: '1. Genel Bakış (Overview)',
        paging: '2. Sayfalama (Paging)',
        sorting: '3. Çoklu Sıralama (Sorting)',
        filtering: '4. Filtreleme & Arama (Filtering)',
        grouping: '5. Gruplama & Özetler (Grouping)',
        selection: '6. Satır & Checkbox Seçimi',
        hierarchy: '7. Hiyerarşi & Alt Grid (Detail)',
        columns: '8. Sütun Yönetimi & Görünürlük',
        incell: '9. Hücre İçi (Batch Edit)',
        inline: '10. Satır İçi Düzenleme (Inline)',
        popup: '11. Modal Düzenleme (Popup)',
        templates: '12. Özel Hücre Şablonları',
        export: '13. Excel & PDF Dışa Aktarma',
        api: '14. React Props & State API',
        events: '15. Canlı Olaylar Konsolu',
      },
    },
    pages: {
      paging: {
        title: 'İstemci Tarafı Sayfalama (Client-Side Paging)',
        badge: 'Client-Side Paging',
        desc: 'Panoptes Data Grid, binlerce kaydı tarayıcı belleğinde sıfır gecikmeyle sayfalar. Kullanıcı sayfa başına kayıt adedini değiştirebilir, sayfa numaralarına doğrudan tıklayabilir veya ilk/son sayfa butonlarını kullanabilir.',
        recordsPerPage: 'Sayfa Başına Kayıt:',
        recordsUnit: 'Kayıt',
        total: 'Toplam:',
        productsUnit: 'ürün',
        totalPages: 'Toplam Sayfa:',
        codeTitle: 'React Kullanım Kodu:',
      },
      sorting: {
        title: 'Çoklu Sütun Sıralama (Multi-Column Sorting)',
        badge: 'sortable=true',
        desc: 'Sütun başlıklarına tıklayarak artan (▲), azalan (▼) veya varsayılan sıraya getirin. Sayısal alanlar numerik, metin alanları alfabetik ve tarih alanları kronolojik olarak anında sıralanır.',
        quickSort: 'Hızlı Sıralama:',
        highestPrice: '💰 En Yüksek Fiyat',
        highestRating: '⭐ En Yüksek Puan',
        lowestStock: '⚠️ Kritik Stok (Azdan Çoğa)',
        reset: 'Sıfırla',
        tip: '💡 İpucu: Sütun başlıklarındaki oklara doğrudan tıklayabilirsiniz.',
        codeTitle: 'React Sıralama Konfigürasyonu:',
      },
      filtering: {
        title: 'Filtreleme & Arama (Filtering & Search)',
        badge: 'filterable & searchable',
        desc: 'Sütun başlıklarındaki filtre simgelerine basarak İçerir, Başlar, Eşittir, Büyüktür, Küçüktür gibi operatörlerle arama yapabilirsiniz. Ayrıca sağ üstteki küresel arama kutusu tüm sütunlarda anlık metin taraması yapar.',
        quickFilter: 'Hızlı Filtre:',
        allCategories: 'Tüm Kategoriler',
        codeTitle: 'Filtreleme Konfigürasyonu:',
      },
      grouping: {
        title: 'Gruplama ve Ara Toplamlar (Grouping & Aggregates)',
        badge: 'groupable=true',
        desc: 'Sütun başlıklarının yanındaki ⊞ simgesine tıklayarak kategorilere, ülkelere veya tedarikçilere göre anlık hiyerarşik gruplama yapın ve grup bazında kayıt sayılarını inceleyin.',
        colRevenue: 'Hasılat',
      },
      selection: {
        title: 'Satır Seçimi & Checkbox (Row Selection)',
        badge: 'selectable=true',
        desc: 'Satır başındaki onay kutuları ile tekli veya çoklu kayıt seçimi yapabilirsiniz. Tablo başlığındaki ana kutu o sayfadaki tüm kayıtları tek hamlede seçer veya kaldırır. Seçilen kayıtlar doğrudan React state\'ine aktarılır.',
        selectionState: 'Seçim Durumu:',
        rowsSelected: 'Satır Seçildi',
        totalAmount: 'Toplam Tutar:',
        clearSelection: 'Seçimi Temizle',
        jsonOutput: 'Seçilen Kayıtlar JSON Çıktısı',
        currencySymbol: '₺',
        currencyLocale: 'tr-TR',
      },
      columns: {
        title: 'Sütun Yönetimi & Görünürlük (Column Visibility)',
        badge: 'Dynamic Columns',
        desc: 'Sütunların görünürlüğünü çalışma zamanında dinamik olarak değiştirebilir, genişliklerini (width) ve metin hizalamalarını (align) yapılandırabilirsiniz.',
        columnChooser: 'Sütun Seçici:',
        countryCol: '🌍 Ülke Sütunu',
        stockCol: '📦 Stok Sütunu',
        ratingCol: '⭐ Puan Sütunu',
        targetSalesCol: '📈 Satış Grafiği Sütunu',
      },
      hierarchy: {
        title: 'Hiyerarşi & Master-Detail Görünümü',
        badge: 'renderDetail prop',
        desc: 'Satır başındaki açılır oka (▶) basıldığında ilgili kayda ait detay bilgileri, teknik özellikler ve alt sipariş geçmişi gösterilir.',
        analysisCard: 'Detaylı Ürün Analiz Kartı',
        supplierInfo: 'Tedarikçi Bilgisi',
        warehouseLogistics: 'Depo ve Lojistik',
        itemsInStock: (stock) => `${stock} adet stokta`,
        fastDelivery: 'Hızlı Kargo Mevcut',
        annualRevenue: 'Yıllık Hasılat',
        targetAchieved: 'Hedef Gerçekleşme: %100+',
        currencySymbol: '₺',
        currencyLocale: 'tr-TR',
      },
      incell: {
        title: 'Hücre İçi Toplu Düzenleme (In-Cell / Batch Edit)',
        badge: 'editable="incell"',
        desc: 'Hücreye tıklayarak değeri doğrudan düzenleyin. Değiştirilen hücrelerin sağ üst köşesinde kırmızı bir üçgen belirir. Üst araç çubuğundaki "Değişiklikleri Kaydet" butonuna basıldığında tüm değişiklikler tek seferde yerel state\'e kaydedilir.',
        colNameEditable: 'Ürün Adı (Düzenlenebilir)',
      },
      inline: {
        title: 'Satır İçi Düzenleme (Inline Editing)',
        badge: 'editable="inline"',
        desc: 'Kullanıcı satır sonundaki "Düzenle" butonuna bastığında veya üst araç çubuğundaki "Yeni Kayıt Ekle" butonunu kullandığında ilgili satır doğrudan girdi alanlarına (inputs) dönüşür. Değişiklikler satır içi ✓ (Kaydet) veya ✕ (İptal) ile onaylanır.',
        codeTitle: 'Satır İçi Düzenleme Kodu:',
      },
      popup: {
        title: 'Açılır Pencere ile Düzenleme (Popup / Dialog Edit)',
        badge: 'editable="popup"',
        desc: 'Kullanıcı araç çubuğundaki "+ Yeni Kayıt Ekle" butonuna veya satırdaki "Düzenle" bağlantısına bastığında modern bir modal diyalog penceresi açılır. Kullanıcı formu doldurup kaydettiğinde tablo anında güncellenir.',
        codeTitle: 'Modal Popup Düzenleme Kodu:',
      },
      export: {
        title: 'Excel ve PDF Dışa Aktarma (Export)',
        badge: 'Client-Side Export',
        desc: 'Sunucuya hiçbir istek atmadan, istemci tarafında anlık Excel (.xls/.xlsx) ve yazdırma dostu PDF formatında rapor oluşturabilirsiniz. Filtrelenmiş veya sıralanmış veriler doğrudan aktarılır.',
        codeTitle: 'Dışa Aktarma Konfigürasyonu:',
      },
      templates: {
        title: 'Özel Hücre Şablonları & Formatlar (Cell Templates)',
        badge: 'Custom JSX Cells',
        desc: 'Panoptes Data Grid, hücrelerin içerisine dilediğiniz özel JSX bileşenini (resimler, avatarlar, mikro grafikler, rozetler, yıldızlı puanlama vb.) kolayca yerleştirmenize olanak tanır.',
        colProductImage: 'Ürün & Görsel',
        colCountryFlag: 'Ülke & Bayrak',
        inStockBadge: 'Stokta Var',
        outOfStockBadge: 'Tükendi',
      },
      api: {
        title: 'React Props & Callback API',
        badge: 'Interactive State',
        desc: 'Dışarıdan sayfa boyutu kontrolü, satır seçimi callback\'leri ve anlık seçim okuma.',
        selectedCount: 'Seçilen Kayıt Sayısı:',
        jsonOutput: 'Seçili Satırlar JSON Çıktısı:',
      },
      events: {
        title: 'İstemci Olayları & Konsol (Client Events)',
        badge: 'Live Event Bus',
        desc: 'Kullanıcının satır seçimi, hücre tıklaması, arama yapması veya kayıt düzenlemesi gibi tüm etkileşimleri React olay dinleyicileri (event listeners) tarafından anlık olarak yakalanır.',
        consoleTitle: 'Canlı Olay Akışı (Event Console)',
        clearConsole: 'Konsolu Temizle',
        readyLog: (count) => `Panoptes Grid başarıyla yüklendi (${count} kayıt hazır)`,
        rowSelectedLog: (count) => `${count} adet satır seçildi`,
        rowSavedLog: (id, name) => `Kayıt kaydedildi: #${id} - ${name}`,
        emptyLogs: 'Henüz olay tetiklenmedi. Tabloda bir satır seçin.',
      },
    },
    app: {
      loadingData: 'Yerel products.json verisi yükleniyor...',
      viewCode: 'React Kullanım Kodu:',
    },
    common: {
      columns: {
        id: '#',
        product: 'Ürün & Tedarikçi',
        productName: 'Ürün Adı',
        category: 'Kategori',
        country: 'Ülke',
        price: 'Fiyat',
        stock: 'Stok',
        status: 'Durum',
        rating: 'Puan',
        targetSales: 'Hedef Satış',
        actions: 'İşlemler',
        supplier: 'Tedarikçi',
      },
      status: {
        inStock: 'Stokta',
        outOfStock: 'Tükendi',
      },
      paging: {
        recordsPerPage: 'Sayfa Başına Kayıt:',
        recordsUnit: 'Kayıt',
        total: 'Toplam:',
        totalPages: 'Toplam Sayfa:',
      },
      quickFilter: 'Hızlı Filtre:',
      allCategories: 'Tüm Kategoriler',
      quickSort: 'Hızlı Sıralama:',
      highestPrice: '💰 En Yüksek Fiyat',
      highestRating: '⭐ En Yüksek Puan',
      lowestStock: '📦 En Düşük Stok',
      reactUsageCode: 'React Kullanım Kodu:',
    },
  },
  en: {
    header: {
      brandSubtitle: 'React 19 Enterprise Suite',
      badge: '44 Enterprise UI Components',
      catalogButton: 'Component Catalog & Capabilities',
      catalogButtonShort: 'Catalog',
    },
    sidebar: {
      searchPlaceholder: 'Search components... (44 components)',
      emptyMatch: 'No matching components found.',
      catalogBannerBadge: 'FEATURED',
      catalogBannerTitle: 'Component Catalog & Capabilities',
      catalogBannerDesc: 'Explore all enterprise components →',
    },
    banner: {
      suiteTitle: 'Panoptes UI Enterprise',
      suiteSubtitle: 'Enterprise React UI Component Suite',
      zeroDependency: 'Zero External Dependencies / 100% Client-Side',
      exploreCatalog: 'Explore Component Catalog',
    },
    footer: {
      copyright: 'Panoptes UI for React',
      subtitle: 'Modern Enterprise UI & Data Grid Library',
      stack: 'React 19 + TypeScript + Tailwind CSS',
      zeroDep: 'Zero External Server Dependency / 100% Local Data',
    },
    subNav: {
      overview: 'Overview',
      paging: 'Paging',
      sorting: 'Sorting',
      filtering: 'Filtering',
      grouping: 'Grouping',
      selection: 'Selection',
      hierarchy: 'Hierarchy',
      columns: 'Columns',
      incell: 'In-Cell Edit',
      inline: 'Inline Edit',
      popup: 'Popup Modal',
      templates: 'Templates',
      export: 'Export',
      api: 'Props API',
      events: 'Events',
    },
    overview: {
      badge: 'Panoptes Enterprise Data Grid',
      localData: '100% Standalone & Local JSON',
      heroTitle: 'Panoptes UI for React - Data Grid Overview',
      heroDesc: 'Zero external server dependencies; instantaneous client-side paging, multi-column sorting, filtering, drag-and-drop grouping, in-cell batch editing, multi-selection, rich cell templates, and Excel/PDF export.',
      totalProducts: 'Total Products',
      totalProductsUnit: 'Items',
      totalRevenue: 'Total Revenue',
      avgRating: 'Average Rating',
      supplierCountries: 'Supplier Countries',
      supplierCountriesUnit: 'Countries',
      currencySymbol: '$',
      currencyLocale: 'en-US',
      colProductSupplier: 'Product & Supplier',
      colCategory: 'Category',
      colCountry: 'Country',
      colPrice: 'Price',
      colStock: 'Stock',
      colStatus: 'Status',
      colRating: 'Rating',
      colTargetSales: 'Sales Target',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
    },
    catalog: {
      heroBadge: 'Enterprise Ecosystem & Capabilities Dashboard',
      heroTitlePrefix: 'Panoptes UI — ',
      heroHighlight: '44 Enterprise Components',
      heroTitleSuffix: ' Catalog',
      heroDesc: 'Comprehensive capabilities matrix and live demo links for all advanced UI components, data grids, form controls, and visualization tools in the Panoptes React ecosystem.',
      totalComponents: 'Total Components',
      fullyReady: '✅ Fully Ready',
      partial: '⚠️ Partial',
      planned: '⏳ Planned',
      coreTitle: 'React Enterprise Core (Data Grid & 15 Sub-Modules)',
      coreCompleted: '100% Completed',
      maturityTitle: 'Overall Enterprise UI Library Maturity',
      maturityReady: (ready, total, percent) => `${percent}% Ready (${ready} / ${total} Components)`,
      searchPlaceholder: 'Search immediately by component name, feature, or keyword (e.g. Paging, Excel, Batch, Modal, TreeList)...',
      statusAll: 'All',
      statusReady: 'Ready',
      statusPartial: 'Partial',
      statusPlanned: 'Planned',
      categories: {
        all: 'All Categories',
        data: 'Data Management & Grid',
        forms: 'Forms & Editors',
        nav: 'Navigation & Layout',
        popups: 'Popups & Modals',
        scheduling: 'Scheduling & Calendar',
        charts: 'Charts & Visualization',
        tools: 'Media & Documents',
      },
      statuses: {
        ready: '100% READY',
        partial: '75% PARTIAL',
        planned: 'PLANNED',
      },
      showing: 'Showing: ',
      componentsUnit: ' Components',
      legendReady: 'Ready & Live',
      legendPartial: 'Partial / With Template',
      legendPlanned: 'Planned / On Roadmap',
      cardReadiness: 'Component Readiness',
      cardKeyCapabilities: 'Key Capabilities:',
      cardMoreFeatures: (count) => `+${count} features`,
      cardSupportedFeatures: 'Supported Features:',
      cardRoadmap: 'Roadmap (Additional Features):',
      cardLivePages: 'Panoptes Live Pages',
      cardDemoButton: (name) => `${name} Demo (Live + Code)`,
      emptyTitle: 'No components found matching your search',
      emptyDesc: 'You can change the search term or reset filters.',
      clearFilters: 'Clear Filters',
      gridPages: {
        overview: '1. Overview',
        paging: '2. Paging',
        sorting: '3. Multi-Column Sorting',
        filtering: '4. Filtering & Search',
        grouping: '5. Grouping & Aggregates',
        selection: '6. Row & Checkbox Selection',
        hierarchy: '7. Hierarchy & Detail Grid',
        columns: '8. Column Management & Visibility',
        incell: '9. In-Cell (Batch Edit)',
        inline: '10. Inline Editing',
        popup: '11. Modal Editing (Popup)',
        templates: '12. Custom Cell Templates',
        export: '13. Excel & PDF Export',
        api: '14. React Props & State API',
        events: '15. Live Events Console',
      },
    },
    pages: {
      paging: {
        title: 'Client-Side Paging (Client-Side Paging)',
        badge: 'Client-Side Paging',
        desc: 'Panoptes Data Grid pages thousands of records in browser memory with zero latency. Users can change page size, jump directly to page numbers, or use first/last navigation buttons.',
        recordsPerPage: 'Records per page:',
        recordsUnit: 'Items',
        total: 'Total:',
        productsUnit: 'products',
        totalPages: 'Total Pages:',
        codeTitle: 'React Usage Code:',
      },
      sorting: {
        title: 'Multi-Column Sorting (Multi-Column Sorting)',
        badge: 'sortable=true',
        desc: 'Click column headers to toggle ascending (▲), descending (▼), or default ordering. Numeric fields sort numerically, strings alphabetically, and dates chronologically.',
        quickSort: 'Quick Sort:',
        highestPrice: '💰 Highest Price',
        highestRating: '⭐ Highest Rating',
        lowestStock: '⚠️ Low Stock (Asc)',
        reset: 'Reset',
        tip: '💡 Tip: Click column headers directly to toggle sort direction.',
        codeTitle: 'React Sorting Configuration:',
      },
      filtering: {
        title: 'Filtering & Search (Filtering & Search)',
        badge: 'filterable & searchable',
        desc: 'Click filter icons in column headers to filter with operators like Contains, Starts With, Equals, Greater Than, Less Than. The global search box searches text across all columns instantaneously.',
        quickFilter: 'Quick Filter:',
        allCategories: 'All Categories',
        codeTitle: 'Filtering Configuration:',
      },
      grouping: {
        title: 'Grouping & Aggregates (Grouping & Aggregates)',
        badge: 'groupable=true',
        desc: 'Click the ⊞ icon next to column headers to perform instant hierarchical grouping by categories, countries, or suppliers, and inspect item counts per group.',
        colRevenue: 'Revenue',
      },
      selection: {
        title: 'Row Selection & Checkboxes (Row Selection)',
        badge: 'selectable=true',
        desc: 'Select individual or multiple rows using the row checkboxes. The header master checkbox selects or deselects all items on the current page in a single click. Selected records sync directly to React state.',
        selectionState: 'Selection State:',
        rowsSelected: 'Rows Selected',
        totalAmount: 'Total Amount:',
        clearSelection: 'Clear Selection',
        jsonOutput: 'Selected Records JSON Output',
        currencySymbol: '$',
        currencyLocale: 'en-US',
      },
      columns: {
        title: 'Column Management & Visibility (Column Visibility)',
        badge: 'Dynamic Columns',
        desc: 'Dynamically toggle column visibility at runtime, and configure custom widths and text alignments.',
        columnChooser: 'Column Chooser:',
        countryCol: '🌍 Country Column',
        stockCol: '📦 Stock Column',
        ratingCol: '⭐ Rating Column',
        targetSalesCol: '📈 Target Sales Column',
      },
      hierarchy: {
        title: 'Hierarchy & Master-Detail View',
        badge: 'renderDetail prop',
        desc: 'Click the expansion arrow (▶) at the row start to reveal detailed product analytics, specifications, and order history.',
        analysisCard: 'Product Analysis Card',
        supplierInfo: 'Supplier Info',
        warehouseLogistics: 'Warehouse & Logistics',
        itemsInStock: (stock) => `${stock} items in stock`,
        fastDelivery: 'Fast Delivery Available',
        annualRevenue: 'Annual Revenue',
        targetAchieved: 'Target Achievement: 100%+',
        currencySymbol: '$',
        currencyLocale: 'en-US',
      },
      incell: {
        title: 'In-Cell Batch Editing (In-Cell / Batch Edit)',
        badge: 'editable="incell"',
        desc: 'Click any cell to edit value directly in place. A red indicator appears in modified cells. Clicking "Save Changes" on the toolbar commits all modifications simultaneously.',
        colNameEditable: 'Product Name (Editable)',
      },
      inline: {
        title: 'Inline Row Editing (Inline Editing)',
        badge: 'editable="inline"',
        desc: 'When clicking "Edit" at the end of a row or "Add New Record" on the toolbar, the entire row transforms into active inputs. Changes are confirmed with ✓ (Save) or ✕ (Cancel).',
        codeTitle: 'Inline Editing Code:',
      },
      popup: {
        title: 'Modal Dialog Editing (Popup / Dialog Edit)',
        badge: 'editable="popup"',
        desc: 'Clicking "+ Add New Record" on the toolbar or "Edit" on any row opens a modern dialog window. Saving the form updates the grid state instantaneously.',
        codeTitle: 'Modal Popup Editing Code:',
      },
      export: {
        title: 'Excel and PDF Export (Export)',
        badge: 'Client-Side Export',
        desc: 'Generate instant Excel (.xlsx/.xls) and print-friendly PDF reports purely client-side without sending requests to the server. Filtered and sorted data are exported accurately.',
        codeTitle: 'Export Configuration:',
      },
      templates: {
        title: 'Custom Cell Templates & Formats (Cell Templates)',
        badge: 'Custom JSX Cells',
        desc: 'Panoptes Data Grid allows you to seamlessly insert custom JSX components (images, avatars, micro-charts, badges, star ratings) into any cell.',
        colProductImage: 'Product & Image',
        colCountryFlag: 'Country & Flag',
        inStockBadge: 'In Stock',
        outOfStockBadge: 'Out of Stock',
      },
      api: {
        title: 'React Props & Callback API',
        badge: 'Interactive State',
        desc: 'External page size controls, row selection callbacks, and live interactive state inspection.',
        selectedCount: 'Selected Items Count:',
        jsonOutput: 'Selected Rows JSON Output:',
      },
      events: {
        title: 'Client Events & Console (Client Events)',
        badge: 'Live Event Bus',
        desc: 'All user interactions such as row selections, cell clicks, searches, and inline edits are intercepted instantaneously by React event listeners.',
        consoleTitle: 'Live Event Console',
        clearConsole: 'Clear Console',
        readyLog: (count) => `Panoptes Grid loaded successfully (${count} records ready)`,
        rowSelectedLog: (count) => `${count} rows selected`,
        rowSavedLog: (id, name) => `Record saved: #${id} - ${name}`,
        emptyLogs: 'No events fired yet. Select a row in the grid.',
      },
    },
    app: {
      loadingData: 'Loading local products.json dataset...',
      viewCode: 'React Usage Code:',
    },
    common: {
      columns: {
        id: '#',
        product: 'Product & Supplier',
        productName: 'Product Name',
        category: 'Category',
        country: 'Country',
        price: 'Price',
        stock: 'Stock',
        status: 'Status',
        rating: 'Rating',
        targetSales: 'Sales Target',
        actions: 'Actions',
        supplier: 'Supplier',
      },
      status: {
        inStock: 'In Stock',
        outOfStock: 'Out of Stock',
      },
      paging: {
        recordsPerPage: 'Records per page:',
        recordsUnit: 'Items',
        total: 'Total:',
        totalPages: 'Total Pages:',
      },
      quickFilter: 'Quick Filter:',
      allCategories: 'All Categories',
      quickSort: 'Quick Sort:',
      highestPrice: '💰 Highest Price',
      highestRating: '⭐ Highest Rating',
      lowestStock: '📦 Lowest Stock',
      reactUsageCode: 'React Usage Code:',
    },
  },
};

export interface LanguageOption {
  code: string;
  label: string;
  flag: string;
  currency: string;
  currencyLocale: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷', currency: '₺', currencyLocale: 'tr-TR' },
  { code: 'en', label: 'English', flag: '🇬🇧', currency: '$', currencyLocale: 'en-US' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', currency: '€', currencyLocale: 'de-DE' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', currency: '€', currencyLocale: 'fr-FR' },
  { code: 'es', label: 'Español', flag: '🇪🇸', currency: '€', currencyLocale: 'es-ES' },
];

export function registerTranslation(locale: string, translation: SiteTranslation): void {
  (siteTranslations as Record<string, SiteTranslation>)[locale] = translation;
}

export function getSiteTranslation(locale: string): SiteTranslation {
  const dict = siteTranslations as Record<string, SiteTranslation>;
  if (dict[locale]) {
    return dict[locale];
  }
  if (locale.startsWith('tr')) {
    return dict.tr;
  }
  return dict.en || dict.tr;
}

export interface NavGroupLocalized {
  title: string;
  items: Array<{ id: string; label: string; sub?: boolean }>;
}

export function getNavGroups(localeOrIsEnglish: string | boolean = 'tr'): NavGroupLocalized[] {
  const isTr = typeof localeOrIsEnglish === 'boolean' ? !localeOrIsEnglish : localeOrIsEnglish === 'tr';
  if (!isTr) {
    return [
      {
        title: 'Data Grid (Data Management)',
        items: [
          { id: 'overview', label: '1. Overview' },
          { id: 'paging', label: 'Paging', sub: true },
          { id: 'sorting', label: 'Multi-Column Sorting', sub: true },
          { id: 'filtering', label: 'Filtering & Search', sub: true },
          { id: 'grouping', label: 'Grouping & Aggregates', sub: true },
          { id: 'selection', label: 'Row Selection & Checkbox', sub: true },
          { id: 'hierarchy', label: 'Hierarchy & Detail Grid', sub: true },
          { id: 'columns', label: 'Column Management & Visibility', sub: true },
          { id: 'incell', label: 'In-Cell (Batch Edit)', sub: true },
          { id: 'inline', label: 'Inline Editing', sub: true },
          { id: 'popup', label: 'Popup Modal Editing', sub: true },
          { id: 'templates', label: 'Custom Cell Templates', sub: true },
          { id: 'export', label: 'Excel & PDF Export', sub: true },
          { id: 'api', label: 'React Props & State API', sub: true },
          { id: 'events', label: 'Live Events Console', sub: true },
        ],
      },
      {
        title: 'Advanced Data & Grids',
        items: [
          { id: 'treelist', label: 'TreeList (Hierarchical Tree Grid)' },
          { id: 'pivotgrid', label: 'PivotGrid (Cross-Tab Matrix)' },
          { id: 'spreadsheet', label: 'Spreadsheet (Excel & Formula Bar)' },
          { id: 'listview', label: 'ListView (Templated Card List)' },
          { id: 'pager', label: 'Pager (Standalone Paginator)' },
          { id: 'propertygrid', label: 'PropertyGrid (Property Inspector)' },
        ],
      },
      {
        title: 'Date & Time Pickers',
        items: [
          { id: 'datepicker', label: 'DatePicker (Date Picker)' },
          { id: 'daterangepicker', label: 'DateRangePicker (Date Range)' },
          { id: 'timepicker', label: 'TimePicker (Time Picker)' },
          { id: 'datetimepicker', label: 'DateTimePicker (Date & Time)' },
        ],
      },
      {
        title: 'Dropdowns & Selectors',
        items: [
          { id: 'dropdownlist', label: 'DropDownList (Select Menu)' },
          { id: 'combobox', label: 'ComboBox (Editable Select)' },
          { id: 'autocomplete', label: 'AutoComplete (Search Suggest)' },
          { id: 'multiselect', label: 'MultiSelect (Multi-Tag Select)' },
          { id: 'dropdowntree', label: 'DropDownTree (Tree Dropdown)' },
          { id: 'multicolumncombobox', label: 'MultiColumnComboBox (Multi-Col Select)' },
        ],
      },
      {
        title: 'Inputs & Form Controls',
        items: [
          { id: 'textbox', label: 'TextBox (Text Field)' },
          { id: 'numerictextbox', label: 'NumericTextBox (Number Input)' },
          { id: 'textarea', label: 'TextArea (Multi-Line Text)' },
          { id: 'maskedtextbox', label: 'MaskedTextBox (Input Mask)' },
          { id: 'switch', label: 'Switch (Toggle Button)' },
          { id: 'checkbox', label: 'CheckBox (Check Box)' },
          { id: 'radiogroup', label: 'RadioGroup (Radio Option)' },
          { id: 'slider', label: 'Slider (Range Selector)' },
          { id: 'rating', label: 'Rating (Star Rating)' },
          { id: 'colorpicker', label: 'ColorPicker (Color Palette)' },
          { id: 'otp', label: 'OTP (Verification Code)' },
          { id: 'signature', label: 'Signature (Digital Signature)' },
          { id: 'upload', label: 'Upload (Drag & Drop File Upload)' },
          { id: 'editor', label: 'Editor (Rich Text WYSIWYG)' },
          { id: 'form', label: 'Form (Form Validation Engine)' },
        ],
      },
      {
        title: 'Navigation & Layout',
        items: [
          { id: 'menu', label: 'Menu (Context & App Menu)' },
          { id: 'tabstrip', label: 'TabStrip (Tabbed Container)' },
          { id: 'panelbar', label: 'PanelBar (Accordion Panel)' },
          { id: 'drawer', label: 'Drawer (Collapsible Sidebar)' },
          { id: 'treeview', label: 'TreeView (Tree Directory)' },
          { id: 'stepper', label: 'Stepper (Step Wizard)' },
          { id: 'breadcrumb', label: 'Breadcrumb (Breadcrumb Path)' },
          { id: 'toolbar', label: 'ToolBar (Command Toolbar)' },
          { id: 'splitter', label: 'Splitter (Resizable Pane)' },
          { id: 'tilelayout', label: 'TileLayout (Dashboard Grid)' },
          { id: 'scrollview', label: 'ScrollView (Carousel)' },
          { id: 'actionsheet', label: 'ActionSheet (Bottom Sheet)' },
        ],
      },
      {
        title: 'Popups & Dialogs',
        items: [
          { id: 'window', label: 'Window (Movable Modal Window)' },
          { id: 'dialog', label: 'Dialog (Confirmation Dialog)' },
          { id: 'notification', label: 'Notification (Toast Banner)' },
          { id: 'tooltip', label: 'Tooltip (Hover Info Balloon)' },
        ],
      },
      {
        title: 'Scheduling & Planning',
        items: [
          { id: 'scheduler', label: 'Scheduler (Calendar & Events)' },
          { id: 'gantt', label: 'Gantt (Project Timeline)' },
          { id: 'taskboard', label: 'TaskBoard (Kanban Board)' },
        ],
      },
      {
        title: 'Charts & Visualization',
        items: [
          { id: 'charts', label: 'Charts (Area, Line, Column)' },
          { id: 'stockchart', label: 'StockChart (Financial Chart)' },
          { id: 'gauges', label: 'Gauges (Speedometer & Linear)' },
          { id: 'barcode', label: 'Barcode & QR (Code Generator)' },
          { id: 'diagram', label: 'Diagram (Flowchart & Node Graph)' },
          { id: 'map', label: 'Map (Interactive Vector Map)' },
        ],
      },
      {
        title: 'Media & Document Tools',
        items: [
          { id: 'pdfviewer', label: 'PDFViewer (PDF Reader)' },
          { id: 'filter', label: 'Filter (Advanced Query Builder)' },
          { id: 'mediaplayer', label: 'MediaPlayer (Video/Audio Player)' },
          { id: 'chat', label: 'Chat (AI Messaging Interface)' },
        ],
      },
    ];
  }

  return [
    {
      title: 'Data Grid (Veri Yönetimi)',
      items: [
        { id: 'overview', label: '1. Genel Bakış (Overview)' },
        { id: 'paging', label: 'Sayfalama (Paging)', sub: true },
        { id: 'sorting', label: 'Çoklu Sıralama (Sorting)', sub: true },
        { id: 'filtering', label: 'Filtreleme & Arama (Filtering)', sub: true },
        { id: 'grouping', label: 'Gruplama & Özetler (Grouping)', sub: true },
        { id: 'selection', label: 'Satır Seçimi & Checkbox', sub: true },
        { id: 'hierarchy', label: 'Hiyerarşi & Alt Grid (Detail)', sub: true },
        { id: 'columns', label: 'Sütun Yönetimi & Görünürlük', sub: true },
        { id: 'incell', label: 'Hücre İçi (In-Cell / Batch Edit)', sub: true },
        { id: 'inline', label: 'Satır İçi Düzenleme (Inline)', sub: true },
        { id: 'popup', label: 'Modal ile Düzenleme (Popup)', sub: true },
        { id: 'templates', label: 'Özel Hücre Şablonları (Templates)', sub: true },
        { id: 'export', label: 'Excel & PDF Dışa Aktarma', sub: true },
        { id: 'api', label: 'React Props & State API', sub: true },
        { id: 'events', label: 'Canlı Olaylar Konsolu (Events)', sub: true },
      ],
    },
    {
      title: 'Gelişmiş Veri & Izgara',
      items: [
        { id: 'treelist', label: 'TreeList (Hiyerarşik Ağaç Tablo)' },
        { id: 'pivotgrid', label: 'PivotGrid (Çapraz Matris Tablosu)' },
        { id: 'spreadsheet', label: 'Spreadsheet (Excel & Formül Barı)' },
        { id: 'listview', label: 'ListView (Şablonlu Kart Listesi)' },
        { id: 'pager', label: 'Pager (Bağımsız Sayfalayıcı)' },
        { id: 'propertygrid', label: 'PropertyGrid (Özellik Denetçisi)' },
      ],
    },
    {
      title: 'Tarih & Zaman Seçiciler',
      items: [
        { id: 'datepicker', label: 'DatePicker (Tarih Seçici)' },
        { id: 'daterangepicker', label: 'DateRangePicker (Tarih Aralığı)' },
        { id: 'timepicker', label: 'TimePicker (Saat Seçici)' },
        { id: 'datetimepicker', label: 'DateTimePicker (Tarih & Saat)' },
      ],
    },
    {
      title: 'Açılır Menüler & Seçiciler',
      items: [
        { id: 'dropdownlist', label: 'DropDownList (Açılır Liste)' },
        { id: 'combobox', label: 'ComboBox (Yazılabilir Seçici)' },
        { id: 'autocomplete', label: 'AutoComplete (Otomatik Tamamlama)' },
        { id: 'multiselect', label: 'MultiSelect (Çoklu Etiket Seçici)' },
        { id: 'dropdowntree', label: 'DropDownTree (Ağaç Yapılı Açılır Menü)' },
        { id: 'multicolumncombobox', label: 'MultiColumnComboBox (Çok Sütunlu Açılır Menü)' },
      ],
    },
    {
      title: 'Form & Girdi Alanları',
      items: [
        { id: 'textbox', label: 'TextBox (Metin Kutusu)' },
        { id: 'numerictextbox', label: 'NumericTextBox (Sayısal Giriş)' },
        { id: 'textarea', label: 'TextArea (Çok Satırlı Metin)' },
        { id: 'maskedtextbox', label: 'MaskedTextBox (Maskeli Metin Girişi)' },
        { id: 'switch', label: 'Switch (Aç/Kapa Anahtar)' },
        { id: 'checkbox', label: 'CheckBox (Onay Kutusu)' },
        { id: 'radiogroup', label: 'RadioGroup (Radyo Buton Grubu)' },
        { id: 'slider', label: 'Slider (Aralık Kaydırıcı)' },
        { id: 'rating', label: 'Rating (Yıldızlı Puanlama)' },
        { id: 'colorpicker', label: 'ColorPicker (Renk Seçici)' },
        { id: 'otp', label: 'OTP (Tek Kullanımlık Şifre Girişi)' },
        { id: 'signature', label: 'Signature (Dijital İmza Alanı)' },
        { id: 'upload', label: 'Upload (Sürükle-Bırak Dosya Yükleyici)' },
        { id: 'editor', label: 'Editor (Zengin Metin / WYSIWYG)' },
        { id: 'form', label: 'Form (Doğrulama Motorlu Form)' },
      ],
    },
    {
      title: 'Navigasyon & Yerleşim',
      items: [
        { id: 'menu', label: 'Menu (Bağlam & Uygulama Menüsü)' },
        { id: 'tabstrip', label: 'TabStrip (Sekmeli Kapsayıcı)' },
        { id: 'panelbar', label: 'PanelBar (Akordiyon Panel)' },
        { id: 'drawer', label: 'Drawer (Açılır/Kapanır Kenar Çubuğu)' },
        { id: 'treeview', label: 'TreeView (Ağaç Dizin Görünümü)' },
        { id: 'stepper', label: 'Stepper (Adım Adım İlerleme Çubuğu)' },
        { id: 'breadcrumb', label: 'Breadcrumb (Sayfa Yolu Gezgini)' },
        { id: 'toolbar', label: 'ToolBar (Komut Araç Çubuğu)' },
        { id: 'splitter', label: 'Splitter (Yeniden Boyutlandırılabilir Panel)' },
        { id: 'tilelayout', label: 'TileLayout (Gösterge Panosu Izgarası)' },
        { id: 'scrollview', label: 'ScrollView (Görsel Karusel)' },
        { id: 'actionsheet', label: 'ActionSheet (Alt Eylem Menüsü)' },
      ],
    },
    {
      title: 'Popuplar & Modallar',
      items: [
        { id: 'window', label: 'Window (Taşınabilir Modal Pencere)' },
        { id: 'dialog', label: 'Dialog (Onay & Uyarı İletişim Kutusu)' },
        { id: 'notification', label: 'Notification (Bildirim / Toast Kutusu)' },
        { id: 'tooltip', label: 'Tooltip (Hover Bilgi Baloncuğu)' },
      ],
    },
    {
      title: 'Planlama & Ajanda',
      items: [
        { id: 'scheduler', label: 'Scheduler (Etkinlik & Takvim Ajandası)' },
        { id: 'gantt', label: 'Gantt (Proje Zaman Çizelgesi)' },
        { id: 'taskboard', label: 'TaskBoard (Kanban Görev Panosu)' },
      ],
    },
    {
      title: 'Grafikler & Görselleştirme',
      items: [
        { id: 'charts', label: 'Grafikler (Alan, Çizgi, Sütun)' },
        { id: 'stockchart', label: 'StockChart (Finansal Mum Grafik)' },
        { id: 'gauges', label: 'Gauges (Hız Göstergesi & İbreler)' },
        { id: 'barcode', label: 'Barkod & QR (Kod Üretici)' },
        { id: 'diagram', label: 'Diagram (Akış Şeması & Düğüm Grafiği)' },
        { id: 'map', label: 'Harita (Vektörel Dünya & Bölge Haritası)' },
      ],
    },
    {
      title: 'Medya & Döküman Araçları',
      items: [
        { id: 'pdfviewer', label: 'PDFViewer (Döküman Okuyucu)' },
        { id: 'filter', label: 'Filter (Gelişmiş Sorgu Oluşturucu)' },
        { id: 'mediaplayer', label: 'MediaPlayer (Video/Ses Oynatıcı)' },
        { id: 'chat', label: 'Chat (Yapay Zeka Mesajlaşma Arayüzü)' },
      ],
    },
  ];
}
