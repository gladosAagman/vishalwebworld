export type Service = {
  id: number;
  name: string;
  desc: string;
  category: string;
  link: string;
  /** Zaroori documents / checklist for this service */
  docs: string[];
};

export const services: Service[] = [
  {
    id: 1,
    name: "Samagra ID",
    desc: "Nayi Samagra ID, correction, family & member ID download.",
    category: "Documents",
    link: "https://samagra.gov.in/",
    docs: [
      "Aadhaar card (parivaar ke sabhi members ke)",
      "Passport size photo",
      "Address proof (electricity bill / rent agreement)",
      "Mobile number (Aadhaar se linked)",
      "Bank passbook copy",
      "Age proof (birth certificate / marksheet)",
    ],
  },
  {
    id: 2,
    name: "Ayushman Card",
    desc: "PM-JAY Ayushman Bharat card banwaayein aur download karein.",
    category: "Health",
    link: "https://beneficiary.nha.gov.in/",
    docs: [
      "Aadhaar card",
      "Ration card / Samagra ID",
      "Mobile number (OTP ke liye)",
      "Family ID ya SECC list ka naam",
      "Live face / fingerprint eKYC",
    ],
  },
  {
    id: 3,
    name: "Khasra / Khatauni / Naksha",
    desc: "Digitally signed land records aur khet ka map.",
    category: "Land Records",
    link: "https://mpbhulekh.gov.in/",
    docs: [
      "Khasra number ya bhu-swami ka naam",
      "Village / Tehsil / District ka naam",
      "Aadhaar card (applicant ka)",
      "Mobile number",
    ],
  },
  {
    id: 4,
    name: "PAN Card",
    desc: "New PAN, correction, e-PAN aur Aadhaar linking.",
    category: "Finance",
    link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
    docs: [
      "Aadhaar card (mobile linked)",
      "Passport size photo",
      "Signature (white paper par, scan)",
      "Date of birth proof (birth certificate / 10th marksheet)",
      "Mobile number aur email id",
    ],
  },
  {
    id: 5,
    name: "Driving Licence",
    desc: "Learning, permanent DL, renewal aur address change.",
    category: "Transport",
    link: "https://sarathi.parivahan.gov.in/",
    docs: [
      "Aadhaar card (mobile linked eKYC)",
      "Age proof (10th marksheet / birth certificate)",
      "Address proof",
      "Passport size photo aur signature",
      "Form 1A medical certificate (commercial / 40+ age)",
      "Learning licence number (permanent DL ke liye)",
      "Blood group aur mobile number",
    ],
  },
  {
    id: 6,
    name: "Income / Domicile / Caste / Birth / EWS",
    desc: "Sabhi government certificates ke applications.",
    category: "Documents",
    link: "https://mpedistrict.gov.in/",
    docs: [
      "Aadhaar card + Samagra ID",
      "Passport size photo",
      "Address proof (electricity bill / ration card)",
      "Income ke liye: salary slip / self declaration / patwari report",
      "Caste ke liye: purana caste certificate ya parivaar ka record",
      "Birth ke liye: hospital record / school certificate",
      "Mobile number",
    ],
  },
  {
    id: 7,
    name: "Marriage Certificate",
    desc: "Marriage registration apply aur certificate download.",
    category: "Documents",
    link: "https://mpenagarpalika.gov.in/",
    docs: [
      "Dono ka Aadhaar card",
      "Dono ke passport size photo + joint photo",
      "Age proof (10th marksheet / birth certificate)",
      "Shaadi ka card ya proof",
      "2 witnesses ke Aadhaar aur photo",
      "Address proof",
      "Affidavit (agar zaroori ho)",
    ],
  },
  {
    id: 8,
    name: "e-Shram Card",
    desc: "Unorganised worker registration, update aur UAN card.",
    category: "Workers",
    link: "https://eshram.gov.in/",
    docs: [
      "Aadhaar card (mobile linked)",
      "Bank passbook (IFSC ke saath)",
      "Mobile number",
      "Kaam / occupation ki detail",
      "Nominee ki detail",
    ],
  },
  {
    id: 9,
    name: "Railway Reservation",
    desc: "IRCTC train tickets, Tatkal booking aur cancellation.",
    category: "Travel",
    link: "https://www.irctc.co.in/",
    docs: [
      "Passenger ka naam, age aur gender",
      "Ek valid ID (Aadhaar / voter / DL) travel ke time",
      "Journey date, train aur class",
      "Mobile number",
    ],
  },
  {
    id: 10,
    name: "Electricity Bill",
    desc: "Bill payment, duplicate bill aur naya connection.",
    category: "Bill Payment",
    link: "https://portal.mpcz.in/",
    docs: [
      "IVRS / consumer number",
      "Naye connection ke liye: Aadhaar card",
      "Property papers ya rent agreement",
      "Passport size photo",
      "Mobile number",
    ],
  },
  {
    id: 11,
    name: "LIC Premium",
    desc: "LIC installment aur doosre insurance premium payment.",
    category: "Bill Payment",
    link: "https://licindia.in/",
    docs: [
      "Policy number",
      "Premium due amount / last receipt",
      "Registered mobile number",
    ],
  },
  {
    id: 12,
    name: "Aadhaar Card",
    desc: "Aadhaar update, mobile link, PVC card aur download.",
    category: "Documents",
    link: "https://myaadhaar.uidai.gov.in/",
    docs: [
      "Purana Aadhaar number",
      "Name change: gazette / marriage certificate / PAN",
      "Address change: electricity bill / rent agreement / bank passbook",
      "DOB change: birth certificate / 10th marksheet",
      "Registered mobile number (OTP)",
    ],
  },
  {
    id: 13,
    name: "Sambal Card",
    desc: "MP Jan Kalyan Sambal Yojana registration aur card.",
    category: "Schemes",
    link: "https://sambal.mp.gov.in/",
    docs: [
      "Samagra ID (parivaar aur member)",
      "Aadhaar card",
      "Bijli bill (BPL / 100 unit se kam)",
      "Bank passbook",
      "Mobile number",
    ],
  },
  {
    id: 14,
    name: "Voter ID Card",
    desc: "New voter ID, correction aur e-EPIC download.",
    category: "Documents",
    link: "https://voters.eci.gov.in/",
    docs: [
      "Aadhaar card",
      "Passport size photo",
      "Age proof (birth certificate / 10th marksheet)",
      "Address proof (bijli bill / passbook / rent agreement)",
      "Mobile number aur email id",
    ],
  },
  {
    id: 15,
    name: "Vehicle Insurance",
    desc: "Bike, car aur commercial vehicle insurance — instant.",
    category: "Insurance",
    link: "https://parivahan.gov.in/",
    docs: [
      "RC (Registration Certificate) copy",
      "Purani policy copy (renewal ke liye)",
      "Aadhaar / PAN card",
      "Driving licence",
      "Vehicle ke photo (break-in case)",
      "Mobile number aur email id",
    ],
  },
  {
    id: 16,
    name: "PF Work",
    desc: "EPF claim, KYC, UAN aur pension related kaam.",
    category: "Workers",
    link: "https://unifiedportal-mem.epfindia.gov.in/memberinterface/",
    docs: [
      "UAN number",
      "Aadhaar card (mobile linked)",
      "PAN card",
      "Bank passbook / cancelled cheque (IFSC)",
      "Date of exit aur company detail",
      "Form 15G (tax ke liye, agar lage)",
    ],
  },
  {
    id: 17,
    name: "RTO Work",
    desc: "RC transfer, fitness, permit, NOC aur tax.",
    category: "Transport",
    link: "https://vahan.parivahan.gov.in/",
    docs: [
      "Original RC book",
      "Valid insurance aur PUC certificate",
      "Aadhaar card (buyer aur seller)",
      "Form 29 / 30 (transfer ke liye)",
      "Passport size photo",
      "Tax receipt aur chassis number print",
    ],
  },
  {
    id: 18,
    name: "Passport Service",
    desc: "Naya passport, re-issue aur appointment booking.",
    category: "Travel",
    link: "https://www.passportindia.gov.in/",
    docs: [
      "Aadhaar card",
      "Birth certificate / 10th marksheet",
      "Address proof (bijli bill / bank passbook / rent agreement)",
      "PAN card / voter ID",
      "Purana passport (re-issue ke liye)",
      "Annexure / affidavit (case ke hisaab se)",
      "Mobile number aur email id",
    ],
  },
  {
    id: 19,
    name: "Flight Booking",
    desc: "Domestic aur international flight tickets.",
    category: "Travel",
    link: "https://www.irctc.co.in/air/",
    docs: [
      "Passenger ka naam (ID ke exactly jaisa)",
      "Aadhaar / passport (international ke liye passport zaroori)",
      "Travel date aur city",
      "Mobile number aur email id",
    ],
  },
  {
    id: 20,
    name: "All Exam Forms",
    desc: "MPPSC, SSC, Railway, Police, ESB aur university forms.",
    category: "Exam Forms",
    link: "https://esb.mp.gov.in/",
    docs: [
      "10th / 12th / graduation marksheet",
      "Aadhaar card",
      "Passport size photo aur signature (scan)",
      "Caste / EWS / domicile certificate (agar lagu ho)",
      "Category ke hisaab se fees",
      "Mobile number aur email id",
    ],
  },
  {
    id: 21,
    name: "Banking / Cash Withdrawal",
    desc: "AEPS se paise nikaalna, deposit, balance aur mini statement.",
    category: "Finance",
    link: "https://digitalseva.csc.gov.in/",
    docs: [
      "Aadhaar number",
      "Bank ka naam",
      "Fingerprint (biometric verification)",
      "Account holder ka khud aana zaroori",
    ],
  },
  {
    id: 22,
    name: "GST Registration",
    desc: "Individual / proprietorship, firm aur company ka GST number.",
    category: "Business",
    link: "https://www.gst.gov.in/",
    docs: [
      "Passport size photo (proprietor ka)",
      "PAN card",
      "Aadhaar card",
      "Electricity bill (proprietor ke naam par)",
      "Bijli bill naam par nahi ho toh Rent Agreement ya Consent Letter (NOC)",
      "Mobile number",
      "Email id",
      "Business ki details (naam, nature, HSN/SAC)",
      "Gumasta / Shop & Establishment licence",
      "Bank passbook ya cancelled cheque",
    ],
  },
  {
    id: 23,
    name: "Company Registration",
    desc: "Proprietorship, LLP, Pvt Ltd aur Udyam registration.",
    category: "Business",
    link: "https://www.mca.gov.in/",
    docs: [
      "Sabhi directors / partners ka PAN aur Aadhaar",
      "Passport size photo",
      "Address proof (bijli bill / bank statement — 2 month se naya)",
      "Registered office ka bijli bill + Rent Agreement / NOC",
      "Proposed company ke 2-3 naam",
      "Mobile number aur email id (DSC ke liye)",
      "Digital signature (DSC) aur DIN",
    ],
  },
  {
    id: 24,
    name: "Counselling Help",
    desc: "College admission counselling, choice filling aur verification.",
    category: "Education",
    link: "https://epravesh.mponline.gov.in/",
    docs: [
      "10th aur 12th marksheet",
      "Aadhaar card + Samagra ID",
      "Domicile aur caste certificate (agar lagu ho)",
      "Income certificate (scholarship ke liye)",
      "TC / migration certificate",
      "Passport size photo aur signature",
      "Mobile number aur email id",
    ],
  },
  {
    id: 25,
    name: "Print / Scan / Lamination",
    desc: "Photocopy, colour print, scanning aur document lamination.",
    category: "Other",
    link: "#contact",
    docs: [
      "Jo document print / scan karna hai (hard copy ya soft copy)",
      "Pen drive, email ya WhatsApp par file",
      "Size aur colour ki requirement",
    ],
  },
];

export const categories = [
  "All",
  ...Array.from(new Set(services.map((s) => s.category))),
];

export type Scheme = {
  name: string;
  benefit: string;
  who: string;
  link: string;
};

/** Official logo/icon served from the scheme's own government portal. */
export function schemeLogo(link: string) {
  try {
    const host = new URL(link).hostname;
    return `https://www.google.com/s2/favicons?sz=128&domain=${host}`;
  } catch {
    return undefined;
  }
}

export const schemes: Scheme[] = [
  {
    name: "Ayushman Bharat PM-JAY",
    benefit: "Free treatment up to ₹5 lakh per family per year",
    who: "Eligible low-income families",
    link: "https://pmjay.gov.in/",
  },
  {
    name: "PM Kisan Samman Nidhi",
    benefit: "₹6,000 per year, 3 installments direct in bank account",
    who: "Landholding farmer families",
    link: "https://pmkisan.gov.in/",
  },
  {
    name: "Ladli Behna Yojana (MP)",
    benefit: "Monthly financial support for eligible women",
    who: "Married / widowed / divorced women aged 21-60",
    link: "https://cmladlibahna.mp.gov.in/",
  },
  {
    name: "PM Awas Yojana",
    benefit: "Financial help to build a pucca house",
    who: "Homeless or kutcha-house families",
    link: "https://pmaymis.gov.in/",
  },
  {
    name: "PM Vishwakarma Yojana",
    benefit: "Toolkit support, training stipend & low-interest loan",
    who: "18 traditional artisan & craft trades",
    link: "https://pmvishwakarma.gov.in/",
  },
  {
    name: "Atal Pension Yojana",
    benefit: "₹1,000 - ₹5,000 monthly pension after age 60",
    who: "Savings account holders aged 18-40",
    link: "https://www.npscra.nsdl.co.in/scheme-details.php",
  },
  {
    name: "PM Suraksha & Jeevan Jyoti Bima",
    benefit: "₹2 lakh cover for ₹20 / ₹436 yearly premium",
    who: "Bank account holders (18-70 / 18-50 yrs)",
    link: "https://www.jansuraksha.gov.in/",
  },
  {
    name: "PM Mudra Loan",
    benefit: "Business loan up to ₹10 lakh without collateral",
    who: "Small traders & self-employed",
    link: "https://www.mudra.org.in/",
  },
  {
    name: "Sukanya Samriddhi Yojana",
    benefit: "High-interest savings account in your daughter's name",
    who: "Parents of a girl child up to 10 years",
    link: "https://www.nsiindia.gov.in/",
  },
];
