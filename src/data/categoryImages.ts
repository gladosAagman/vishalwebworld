export const categoryImages: Record<string, string> = {
  Documents: "/assets/cat-documents.jpg",
  Health: "/assets/cat-health.jpg",
  "Land Records": "/assets/cat-land-records.jpg",
  Finance: "/assets/cat-finance.jpg",
  Transport: "/assets/cat-transport.jpg",
  Workers: "/assets/cat-workers.jpg",
  Travel: "/assets/cat-travel.jpg",
  "Bill Payment": "/assets/cat-bill-payment.jpg",
  Schemes: "/assets/cat-schemes.jpg",
  Insurance: "/assets/cat-insurance.jpg",
  "Exam Forms": "/assets/cat-exam-forms.jpg",
  Business: "/assets/cat-business.jpg",
  Education: "/assets/cat-education.jpg",
  Other: "/assets/cat-other.jpg",
};

export function categoryImage(category: string) {
  return categoryImages[category] ?? "/assets/cat-other.jpg";
}
