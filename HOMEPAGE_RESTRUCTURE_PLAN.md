# Agaate Homepage Restructure Plan

## Current Issues
1. Sections 3+ are too dense and lack clear narrative flow
2. "Talk to Agronomist" and "Kisaan Mall" (core products) don't have dedicated, focused sections
3. Investor narrative is too long (5 subsections) and overwhelming
4. Missing clear visual hierarchy and proper spacing after Section 2
5. Not enough images and illustrations

## New Section Flow

### Section 1: Hero (KEEP AS-IS)
- Loading screen
- Hero with video background
- Main headline, subheadline, CTA buttons

### Section 2: Product Story Intro (KEEP AS-IS)  
- "Where Agaate begins"
- Problem statement
- The two-product preview cards (Talk to Agronomist / Kisaan Mall)

### Section 3: Value Proposition (REFINED)
- Keep: Manifesto with word-by-word reveal
- Keep: Three pillars (Seeds to sales, Science over superstition, Partnerships that hold)
- Keep: Dark paradigm panel with metrics comparison
- **MOVE**: Founder quote → to end of page (Section 10)

### Section 4: Talk to Agronomist (NEW - DEDICATED SECTION)
**Goal**: Full product showcase for the agronomist consultation service

Structure:
1. **Hero Area**
   - Kicker: "Core offering / 01"
   - Headline: "Talk to an Agronomist"
   - Subheadline: Get expert guidance for every stage of your crop

2. **How It Works** (3-4 step process)
   - Step 1: Share your crop situation (photo/question)
   - Step 2: Get timely guidance from experts  
   - Step 3: Implement with confidence

3. **Key Features** (4-6 feature cards)
   - Expert agronomists on call
   - Crop-stage specific advice
   - Photo-based diagnosis
   - Regional language support
   - Timely reminders
   - Follow-up support

4. **Trust Signals**
   - Number of farmers helped
   - Response time stats
   - Testimonial/farmer quote
   - CTA: "Start a conversation"

5. **Visual Elements**
   - Large hero image of farmer with agronomist
   - Step illustrations/icons
   - Feature icons

### Section 5: Kisaan Mall (EXPANDED DEDICATED SECTION)
**Goal**: Full product showcase for the e-commerce/input marketplace

Structure:
1. **Hero Area**
   - Kicker: "Core offering / 02"
   - Headline: "Kisaan Mall"
   - Subheadline: Quality inputs, trusted sources, delivered

2. **Category Showcase** (4 main categories with imagery)
   - Seeds & Saplings
   - Nutrition (Fertilizers)
   - Irrigation
   - Tools & Support

3. **Why Kisaan Mall** (4-5 benefit cards)
   - Quality assured products
   - Crop-specific recommendations
   - Competitive pricing
   - Reliable delivery
   - Expert-backed selection

4. **How It Works** (Simple 3-step)
   - Browse/Select
   - Order
   - Receive

5. **Trust Signals**
   - 500+ products
   - 25+ supply partners
   - Delivery coverage
   - CTA: "Explore Kisaan Mall"

6. **Visual Elements**
   - Large product/category images
   - Store/warehouse imagery
   - Product grid preview

### Section 6: The Connected Model (Streamlined)
- Keep the flywheel visualization (4 steps)
- Show how Talk to Agronomist and Kisaan Mall work together
- Focus on the ecosystem/compounding value

### Section 7: Investor Snapshot (Condensed)
- Single section replacing 5 separate subsections
- Key metrics grid (15,000+ acres, 2,000+ farmers, 25+ partners, 500+ SKUs)
- Brief narrative on model strength
- Visual: Network/scale diagram or key stats visualization
- Reduced from ~5 sections to 1 focused section

### Section 8: Testimonials / Social Proof
- 2-3 farmer testimonials with photos
- Focus on real results and experiences

### Section 9: Closing CTA
- Large headline: "Better crop decisions should feel within reach"
- Two clear CTAs: "Talk to an Agronomist" | "Explore Kisaan Mall"
- Contact info/location

### Section 10: Founder Quote (MOVED FROM SECTION 3)
- The founder pull-quote ends the page on a human, mission-driven note

---

## Implementation Notes

### Keep Locked (No Changes):
- LoadingScreen component
- SectionHero component
- SectionProductStory (first 2 sections: ProductStoryIntro)

### Major New Sections to Create:
1. `SectionTalkToAgronomist.tsx` - Full dedicated product page
2. `SectionKisaanMallExpanded.tsx` - Full dedicated product page

### Sections to Refactor:
1. `SectionValueProp.tsx` - Remove founder quote (move to end)
2. `SectionInvestorNarrative.tsx` - Condense 5 subsections into 1
3. `SectionProductStory.tsx` - Remove KisaanMall subsections (now standalone)

### Visual Assets Needed:
- More farmer/agronomist interaction photos
- Product category images
- Step/process illustrations
- Testimonial portraits

### Section Order in index.tsx:
```
1. LoadingScreen
2. SectionHero (locked)
3. SectionProductStory / ProductStoryIntro (locked)
4. SectionValueProp (refined - no quote)
5. SectionTalkToAgronomist (NEW)
6. SectionKisaanMallExpanded (NEW - replaces inline KisaanMall)
7. ConnectedModel (streamlined)
8. SectionInvestorNarrative (condensed)
9. Testimonials (NEW)
10. ClosingAction (with both CTAs)
11. FounderQuote (MOVED from Section 3)
12. SectionFooter
```

---

## Success Criteria
1. Clear narrative flow from problem → solution → products → proof → action
2. Each core product (Talk to Agronomist, Kisaan Mall) has its own dedicated, comprehensive section
3. Investor-facing content is concise but impactful (not overwhelming)
4. Visual hierarchy guides the eye naturally through the page
5. Page feels polished, intentional, and professional
6. Clear CTAs throughout leading to the two core products
