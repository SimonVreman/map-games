export const metadata = { robots: { index: false, follow: false } };

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      <div className="max-w-prose mx-auto w-full">{children}</div>
    </div>
  );
}
