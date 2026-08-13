export default function YesNoBar({ yes, no, yesPool, noPool, size = 'md' }) {
  const big = size === 'lg';
  return (
    <div className={`flex items-center ${big ? 'gap-4' : 'gap-3'}`}>
      <div
        className={`flex flex-1 flex-col items-center justify-center rounded-2xl bg-yes-bg ${
          big ? 'py-8' : 'py-3'
        }`}
      >
        <span className={`font-display font-extrabold text-yes ${big ? 'text-4xl' : 'text-lg'}`}>
          {yes}%
        </span>
        <span className={`font-semibold text-yes/80 ${big ? 'mt-1 text-sm' : 'text-[11px]'}`}>YES</span>
        {yesPool !== undefined && (
          <span className={`text-yes/70 ${big ? 'mt-1 text-sm' : 'text-[10px]'}`}>
            ${yesPool.toLocaleString()}
          </span>
        )}
      </div>
      <span className={`shrink-0 font-semibold text-muted ${big ? 'text-base' : 'text-xs'}`}>VS</span>
      <div
        className={`flex flex-1 flex-col items-center justify-center rounded-2xl bg-no-bg ${
          big ? 'py-8' : 'py-3'
        }`}
      >
        <span className={`font-display font-extrabold text-no ${big ? 'text-4xl' : 'text-lg'}`}>
          {no}%
        </span>
        <span className={`font-semibold text-no/80 ${big ? 'mt-1 text-sm' : 'text-[11px]'}`}>NO</span>
        {noPool !== undefined && (
          <span className={`text-no/70 ${big ? 'mt-1 text-sm' : 'text-[10px]'}`}>
            ${noPool.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}
