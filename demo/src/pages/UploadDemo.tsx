import React, { useState } from 'react';
import { ComponentShowcase } from '../components/ComponentShowcase';
import { Upload } from '@panoptes/react';

export function UploadDemo() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<string[]>([]);

  const handleUploadDocs = (files: File[]) => {
    setUploadedFiles(files.map(f => `${f.name} (${(f.size / 1024).toFixed(1)} KB)`));
  };

  const handleUploadImages = (files: File[]) => {
    setImageFiles(files.map(f => `${f.name} (${(f.size / 1024).toFixed(1)} KB)`));
  };

  const sourceCode = `import React, { useState } from 'react';
import { Upload } from '@panoptes/react';

export function UploadExample() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Çoklu Belge Yükleme */}
      <Upload
        label="Sözleşme ve Belgeleri Yükleyin"
        multiple={true}
        accept=".pdf,.doc,.docx,.xlsx"
        onUpload={(uploaded) => setFiles(uploaded)}
      />

      {/* 2. Tekil Resim Yükleyici */}
      <Upload
        label="Profil Fotoğrafı Yükle"
        multiple={false}
        accept="image/*"
        maxFileSize={5 * 1024 * 1024}
        onUpload={(uploaded) => console.log('Resim yüklendi:', uploaded)}
      />
    </div>
  );
}`;

  return (
    <ComponentShowcase
      title="Upload"
      description="Sürükle-bırak (drag and drop) ve dosya gezgini destekli, dosya uzantısı/boyut doğrulama mekanizmalarına sahip zengin dosya yükleme bileşeni."
      sourceCode={sourceCode}
      props={[
        { name: 'label', type: 'string', description: 'Yükleme kutusunun üstündeki başlık etiketi.' },
        { name: 'accept', type: 'string', description: 'Kabul edilen dosya MIME veya uzantı filtreleri (örn: image/*, .pdf).' },
        { name: 'multiple', type: 'boolean', defaultValue: 'true', description: 'Aynı anda birden fazla dosya seçimine izin verir.' },
        { name: 'maxFileSize', type: 'number', description: 'İzin verilen maksimum dosya boyutu (bayt cinsinden).' },
        { name: 'onUpload', type: '(files: File[]) => void', description: 'Dosyalar seçildiğinde tetiklenen yükleme olayı.' },
        { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Bileşeni kilitler ve yüklemeyi devre dışı bırakır.' }
      ]}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
        {/* Örnek 1: Genel Belge Yükleyici */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            1. Çoklu Belge Yükleyici (PDF, DOCX, XLSX)
          </h4>
          <Upload
            label="Fatura & İrsaliye Belgeleri"
            multiple={true}
            accept=".pdf,.doc,.docx,.xlsx"
            onUpload={handleUploadDocs}
          />
          {uploadedFiles.length > 0 && (
            <div style={{ marginTop: '12px', fontSize: '13px', color: '#0369a1' }}>
              <strong>Yüklenen Dosyalar:</strong>
              <ul style={{ margin: '4px 0 0 16px', padding: 0 }}>
                {uploadedFiles.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Örnek 2: Resim Yükleme */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            2. Görsel Yükleyici (Sadece Resimler, Tekil)
          </h4>
          <Upload
            label="Kullanıcı Profil Resmi"
            multiple={false}
            accept="image/png,image/jpeg,image/webp"
            onUpload={handleUploadImages}
          />
          {imageFiles.length > 0 && (
            <div style={{ marginTop: '10px', fontSize: '13px', color: '#15803d' }}>
              Seçilen Görsel: {imageFiles[0]}
            </div>
          )}
        </div>

        {/* Örnek 3: Devre Dışı */}
        <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#1e293b' }}>
            3. Devre Dışı Yükleme Alanı
          </h4>
          <Upload
            label="Arşivlenmiş Alan (Salt Okunur)"
            disabled={true}
          />
        </div>
      </div>
    </ComponentShowcase>
  );
}
