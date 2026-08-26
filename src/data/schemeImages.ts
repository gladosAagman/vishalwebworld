const map: Record<string, string> = {
  "Ayushman Bharat PM-JAY": "/assets/scheme-pmjay.jpg",
  "PM Kisan Samman Nidhi": "/assets/scheme-kisan.jpg",
  "Ladli Behna Yojana (MP)": "/assets/scheme-women.jpg",
  "PM Awas Yojana": "/assets/scheme-awas.jpg",
  "PM Vishwakarma Yojana": "/assets/scheme-vishwakarma.jpg",
  "Atal Pension Yojana": "/assets/scheme-pension.jpg",
  "PM Suraksha & Jeevan Jyoti Bima": "/assets/scheme-bima.jpg",
  "PM Mudra Loan": "/assets/scheme-mudra.jpg",
  "Sukanya Samriddhi Yojana": "/assets/scheme-sukanya.jpg",
};

export function schemeImage(name: string) {
  return map[name] ?? "/assets/scheme-pmjay.jpg";
}
