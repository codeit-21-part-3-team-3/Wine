interface MyProfileLayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}

export default function MyProfileLayout({ sidebar, content }: MyProfileLayoutProps) {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-7">
      <aside className="self-start">{sidebar}</aside>
      <div>{content}</div>
    </main>
  );
}
