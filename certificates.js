// Certificate wall data — edit this list to add, remove, or reorder certificates.
//
// Each entry:
//   title     (required) Name of the certificate
//   issuer    (required) Organization that issued it
//   date      (required) Any display string, e.g. "March 2026"
//   image     (required) Path to the image, relative to /public.
//                        Drop files in public/assets/certificates/ and use
//                        "/assets/certificates/your-file.png" here.
//   verifyUrl (optional) Link to the issuer's verification page
//
// Certificates are shown in the order listed here.

export const certificates = [
  {
    title: "Basic Military Training — Certificate of Training",
    issuer: "U.S. Air Force, 737th Training Group",
    date: "September 18, 2026",
    image: "/assets/certificates/bmt-certificate-of-training.jpg",
  },
];
