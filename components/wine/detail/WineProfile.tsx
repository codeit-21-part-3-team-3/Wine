import { cn } from '@/utils/cn';

export default function WineProfile() {
  return (
    <section className="flex flex-col lg:flex-row gap-y-12 lg:gap-y-0 lg:gap-x-20 py-6 md:py-10 lg:py-20 border-b border-border">
      <div className="flex-1 space-y-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-0 lg:gap-0 mb-6">
          <h3 className="text-2xl font-bold">어떤 맛이 나나요?</h3>
          <span className="text-sm text-muted-foreground">(417명 참여)</span>
        </div>
      </div>
      <div className="flex-1 space-y-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-0 lg:gap-0 mb-6">
          <h3 className="text-2xl font-bold">어떤 향이 나나요?</h3>
          <span className="text-sm text-muted-foreground">(417명 참여)</span>
        </div>
      </div>
    </section>
  );
}
