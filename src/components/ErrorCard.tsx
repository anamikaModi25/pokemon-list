interface ErrorCardProps {
  title: string;
  message?: string;
}

export default function ErrorCard({ title, message }: ErrorCardProps) {
  return (
    <div className="mx-auto mt-20 max-w-3xl rounded-3xl border border-ink-200 bg-white/80 p-10 text-center shadow-xl">
      <p role="alert" className="text-lg font-semibold text-ink-700">
        {title}
      </p>
      {message ? (
        <p className="mt-2 text-sm text-ink-500">{message}</p>
      ) : null}
    </div>
  );
}
