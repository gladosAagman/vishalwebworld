export type Testimonial = {
  name: string;
  rating: number;
  text: string;
  /** service ka naam, e.g. "Ayushman Card" */
  service?: string;
  /** e.g. "2 months ago" */
  when?: string;
};

/**
 * Google reviews. Naye reviews yahin add karein — page automatically update ho jaayega.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Rajesh Patel",
    rating: 5,
    service: "Ayushman Card",
    when: "2 weeks ago",
    text: "Ayushman card 10 minute mein ban gaya. Staff ne poori family ka card bana diya, koi extra charge nahi.",
  },
  {
    name: "Sunita Verma",
    rating: 5,
    service: "Samagra ID",
    when: "1 month ago",
    text: "Samagra ID mein naam correction ka kaam kahin nahi ho raha tha, yahan same day ho gaya. Bahut helpful.",
  },
  {
    name: "Amit Kumar",
    rating: 5,
    service: "PAN Card",
    when: "3 weeks ago",
    text: "New PAN card apply kiya, documents ka pura guidance mila. WhatsApp par status bhi update karte rahe.",
  },
  {
    name: "Pooja Sahu",
    rating: 4,
    service: "Banking / Cash Withdrawal",
    when: "2 months ago",
    text: "Gaon mein bank door hai, yahan cash withdrawal easily ho jata hai. Bhid ho to thoda wait karna padta hai.",
  },
  {
    name: "Mohan Yadav",
    rating: 5,
    service: "Ladli Behna Yojana",
    when: "1 month ago",
    text: "Behen ka Ladli Behna form yahin se bhara, eligibility bhi check karke bataya. Very professional service.",
  },
  {
    name: "Farhan Ali",
    rating: 5,
    service: "GST Registration",
    when: "3 months ago",
    text: "Meri shop ka GST registration 3 din mein complete. Checklist pehle hi de di thi to ek hi visit mein kaam ho gaya.",
  },
  {
    name: "Neha Thakur",
    rating: 5,
    service: "Counselling / Admission",
    when: "4 months ago",
    text: "College counselling form fill karwaya, choice filling mein bhi guide kiya. Bahut dhanyawad sir.",
  },
  {
    name: "Devendra Singh",
    rating: 5,
    service: "Driving Licence",
    when: "2 months ago",
    text: "Learning licence ka slot yahin se book hua, RTO ka pura process samjha diya. Time bach gaya.",
  },
  {
    name: "Kavita Jain",
    rating: 4,
    service: "PF Withdrawal",
    when: "5 months ago",
    text: "PF claim online file kiya, paisa 12 din mein account mein aa gaya. Follow-up bhi khud karte rahe.",
  },
  {
    name: "Shubham Lodhi",
    rating: 5,
    service: "Aadhaar Update",
    when: "1 month ago",
    text: "Aadhaar mein mobile number aur address update karwaya. Behaviour ekdum friendly hai.",
  },
  {
    name: "Anita Chouhan",
    rating: 5,
    service: "Ration Card / e-KYC",
    when: "2 months ago",
    text: "Ration card e-KYC ka kaam bina line lagaye ho gaya. Poore parivaar ka ek saath kar diya.",
  },
  {
    name: "Ravi Prajapati",
    rating: 5,
    service: "Company Registration",
    when: "6 months ago",
    text: "Apni firm register karwayi — DSC, documents, sab kuch inhone handle kiya. Rate bhi reasonable hai.",
  },
  {
    name: "Meena Bai",
    rating: 5,
    service: "Pension Yojana",
    when: "3 months ago",
    text: "Vridha pension ka form aur documents inhone lagaye, ab pension aana shuru ho gayi hai.",
  },
  {
    name: "Ankit Sharma",
    rating: 5,
    service: "Income / Caste Certificate",
    when: "2 weeks ago",
    text: "Income aur caste certificate dono apply ho gaye, SMS aane par turant bata diya. Recommended.",
  },
  {
    name: "Salman Khan",
    rating: 4,
    service: "Bijli Bill / Recharge",
    when: "1 month ago",
    text: "Bijli bill aur mobile recharge ke liye best jagah hai. Receipt bhi turant deta hai.",
  },
  {
    name: "Priyanka Dubey",
    rating: 5,
    service: "PM Kisan",
    when: "4 months ago",
    text: "Papa ka PM Kisan e-KYC pending tha, yahan 5 minute mein ho gaya aur next installment aa gayi.",
  },
];

export const GOOGLE_RATING = 4.6;
export const GOOGLE_REVIEWS_LINK = "https://maps.app.goo.gl/Unt5CueHyR4E5uLZ6";
export const GOOGLE_ADDRESS =
  "Shop No 3, Imaliya Mod, Pariyat, Panagar, Jabalpur, Madhya Pradesh 483220";
