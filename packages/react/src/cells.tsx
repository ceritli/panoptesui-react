import React from 'react';

export function RatingCell({ value }: { value: number }) {
  const rating = Math.max(0, Math.min(5, Math.round(Number(value) || 0)));
  return (
    <div className="flex items-center gap-0.5" title={`${rating} / 5 Yıldız`}>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={`text-sm ${
            star <= rating ? 'text-amber-400' : 'text-slate-200'
          }`}
        >
          ★
        </span>
      ))}
      <span className="text-xs font-semibold text-slate-500 ml-1.5">{rating}.0</span>
    </div>
  );
}

export function SparklineCell({ value }: { value: number }) {
  const percent = Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
  const colorClass =
    percent >= 80
      ? 'bg-emerald-500'
      : percent >= 50
      ? 'bg-indigo-500'
      : percent >= 25
      ? 'bg-amber-500'
      : 'bg-rose-500';

  return (
    <div className="w-full flex items-center gap-2">
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-[11px] font-mono font-bold text-slate-600 w-9 text-right">
        %{percent}
      </span>
    </div>
  );
}

export function CountryCell({
  country,
  countryCode
}: {
  country: string;
  countryCode?: string;
}) {
  const code = (countryCode || 'tr').toLowerCase();
  return (
    <div className="flex items-center gap-2">
      <img
        src={`https://flagcdn.com/20x15/${code}.png`}
        width="20"
        height="15"
        alt={country}
        className="rounded-xs shadow-xs object-cover"
        onError={(e: any) => {
          e.target.style.display = 'none';
        }}
      />
      <span className="text-xs font-medium text-slate-700">{country}</span>
    </div>
  );
}

export function BadgeCell({
  active,
  activeText = 'Stokta',
  inactiveText = 'Tükendi'
}: {
  active: boolean;
  activeText?: string;
  inactiveText?: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${
        active
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          : 'bg-rose-50 text-rose-700 border border-rose-200'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          active ? 'bg-emerald-500' : 'bg-rose-500'
        }`}
      />
      {active ? activeText : inactiveText}
    </span>
  );
}

export function ProductPhotoCell({
  name,
  imageUrl,
  category,
  supplier
}: {
  name: string;
  imageUrl?: string;
  category?: string;
  supplier?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
          {name.charAt(0)}
        </div>
      )}
      <div className="min-w-0">
        <div className="text-xs font-bold text-slate-900 truncate">{name}</div>
        <div className="text-[11px] text-slate-400 truncate">
          {supplier || category || ''}
        </div>
      </div>
    </div>
  );
}

export function CurrencyCell({
  value,
  currency = 'TRY'
}: {
  value: number;
  currency?: string;
}) {
  const formatted = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency
  }).format(Number(value) || 0);

  return <span className="font-mono font-medium text-slate-800">{formatted}</span>;
}
