// Certificate wall data — edit this list to add, remove, or reorder certificates.
//
// Each entry:
//   title     (required) Name of the certificate
//   issuer    (required) Organization that issued it
//   date      (required) Any display string, e.g. "March 2026"
//   image     (optional) Path to the image, relative to /public.
//                        Drop files in public/assets/certificates/ and use
//                        "/assets/certificates/your-file.png" here.
//                        Leave unset for an "upcoming" placeholder card —
//                        it renders a dashed outline instead of a broken image.
//   verifyUrl (optional) Link to the issuer's verification page
//   upcoming  (optional) true = render as a pending/placeholder card
//
// Certificates are shown in the order listed here. Earned ones first,
// upcoming ones last.

export const certificates = [
  {
    title: "Basic Military Training — Certificate of Training",
    issuer: "U.S. Air Force, 737th Training Group",
    date: "September 18, 2026",
    image: "/assets/certificates/bmt-certificate-of-training.jpg",
  },
  {
    title: "Avionics Test Station, Components & EW Systems (2A031) — Tech School",
    issuer: "U.S. Air Force, 365th Training Squadron, Sheppard AFB",
    date: "Expected December 4, 2026",
    upcoming: true,
  },
  {
    title: "Community College of the Air Force (CCAF) Degree",
    issuer: "Community College of the Air Force",
    date: "In progress",
    upcoming: true,
  },
  {
    title: "Add your next certificate here",
    issuer: "Issuer name",
    date: "Date",
    upcoming: true,
  },
];

// Accomplishments / highlight stats shown above the certificate grid.
// Edit, add, or remove entries — each needs a value and a label.
export const achievements = [
  { value: "96%", label: "BMT end-of-course test score" },
  { value: "99", label: "BMT composite PT score" },
  { value: "2A031", label: "AFSC — Avionics Test Station, Components & EW Systems" },
  { value: "A1C", label: "Current rank" },
];
