import type { PanicCategory } from "../../types/panic";

type CategoryOption = {
  label: string;
  category: PanicCategory;
};

type CategorySelectProps = {
  onSelect: (category: Exclude<PanicCategory, "other">) => void;
  onNeedsDetail: () => void;
};

const categoryOptions: CategoryOption[] = [
  {
    label: "Someone's faking my website or business online",
    category: "fake_identity",
  },
  {
    label: "A suspicious email or fake invoice",
    category: "email_scam",
  },
  {
    label: "My employee's account or device looks off",
    category: "employee_issue",
  },
  {
    label: "Something else",
    category: "other",
  },
];

export function CategorySelect({ onNeedsDetail, onSelect }: CategorySelectProps) {
  function handleSelect(category: PanicCategory) {
    if (category === "other") {
      onNeedsDetail();
      return;
    }

    onSelect(category);
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-white px-4 py-8"
      role="dialog"
    >
      <div className="w-full max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--color-action-amber-600)]">
          What happened?
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-normal text-[var(--color-neutral-900)] sm:text-4xl">
          Choose the closest option
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--color-neutral-700)]">
          Pick the situation that best matches what you are seeing. This helps us
          start with the right next step.
        </p>

        <div className="mt-8 grid gap-3">
          {categoryOptions.map((option) => (
            <button
              className="flex min-h-16 w-full items-center justify-between rounded-lg border border-[var(--color-neutral-200)] bg-white px-4 py-4 text-left text-base font-semibold text-[var(--color-neutral-900)] shadow-sm hover:border-[var(--color-action-amber-500)] hover:bg-[var(--color-action-amber-50)] focus:outline-none focus:ring-2 focus:ring-[var(--color-action-amber-600)] focus:ring-offset-2"
              key={option.category}
              onClick={() => handleSelect(option.category)}
              type="button"
            >
              <span>{option.label}</span>
              <span className="ml-4 text-[var(--color-action-amber-600)]" aria-hidden="true">
                Select
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
