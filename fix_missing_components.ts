import fs from 'fs';

let tempContent = fs.readFileSync('src/components_temp.tsx', 'utf-8');
let landingContent = fs.readFileSync('src/pages/Landing.tsx', 'utf-8');

// The missing components start from StatBar to CohortPlacementQuiz
// I need to inject these missing components right before the `export default function Landing` line

// 1. Refactor the colors and shadows in tempContent to match the new design
tempContent = tempContent.replace(/#111111/g, '#0F172A');
tempContent = tempContent.replace(/bg-white/g, 'bg-[#FAFAFA]');
tempContent = tempContent.replace(/bg-gray-50/g, 'bg-[#F8FAFC]');
tempContent = tempContent.replace(/shadow-\[.*?_#0F172A\]/g, 'shadow-brutal-soft');
tempContent = tempContent.replace(/shadow-\[.*?_#FFD600\]/g, 'shadow-brutal-yellow');

// Replace the video URLs in the SuccessStories component inside tempContent
tempContent = tempContent.replace(/https:\/\/chesswize\.com\/wp-content\/uploads\/2026\/03\/WhatsApp-Video-2026-03-07-at-22\.51\.22\.mp4/g, '/20250924_224436.mp4');
tempContent = tempContent.replace(/https:\/\/chesswize\.com\/wp-content\/uploads\/2026\/03\/WhatsApp-Video-2026-03-07-at-22\.51\.22-1\.mp4/g, '/VID-20250914-WA0001.mp4');
tempContent = tempContent.replace(/\]\.map/g, ',\n              "/VID-20250916-WA0013.mp4",\n              "/VID-20251006-WA0003.mp4"\n            ].map');
tempContent = tempContent.replace(/<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">/g, '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">');
tempContent = tempContent.replace(/aspect-video/g, 'aspect-[9/16]');

// Change handleQuizSubmit inside CohortPlacementQuiz to use the BookingForm
const cohortFormRegex = /<form onSubmit=\{handleQuizSubmit\} className="space-y-4 text-left">[\s\S]*?<\/form>/g;
tempContent = tempContent.replace(cohortFormRegex, '<BookingForm buttonTheme="yellow" buttonText="Book Trial For This Cohort" />');

// 2. Inject the components
const insertIndex = landingContent.indexOf('export default function Landing() {');
const newLandingContent = landingContent.substring(0, insertIndex) + '\n\n' + tempContent + '\n\n' + landingContent.substring(insertIndex);

// 3. Render the components in the Landing return statement
const returnStatementRegex = /<ContactFormSection \/>\s*<Footer \/>/m;
const renderComponents = `<ContactFormSection />
      <StatBar />
      <ScreenTimeCalculator />
      <GrowthProjector />
      <SuccessStories />
      <StarPerformers />
      <CohortPlacementQuiz />
      <Footer />`;
const finalLandingContent = newLandingContent.replace(returnStatementRegex, renderComponents);

fs.writeFileSync('src/pages/Landing.tsx', finalLandingContent);
console.log('Restored missing components to Landing.tsx');
