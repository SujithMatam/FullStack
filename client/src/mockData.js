export const mockBlogs = [
  {
    id: "1",
    title: "The Ultimate Guide to Neapolitan Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Discover the secrets of authentic Neapolitan pizza, from the perfect dough hydration to the ideal San Marzano tomato sauce.",
    content: "Neapolitan pizza is more than just a meal; it's a culinary tradition protected by UNESCO. The secret lies in the simplicity of its ingredients: double zero (00) flour, water, salt, and yeast. The dough must be hand-kneaded and fermented for at least 24 hours to develop that signature airy crust. When baked in a wood-fired oven at 900°F for just 60 to 90 seconds, the result is a soft, elastic, tender, and fragrant pizza. \n\nWe visited 'Napoli Centrale' to see the masters at work. The key takeaway? Never compromise on the tomatoes. San Marzano tomatoes, grown on the volcanic plains to the south of Mount Vesuvius, are non-negotiable for true authenticity.",
    author: "Luigi Moretti",
    date: "October 12, 2023",
    restaurant: "Napoli Centrale"
  },
  {
    id: "2",
    title: "Hidden Gems: Sushi in the Heart of the City",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "We explore a tiny, unassuming sushi bar that's serving up some of the freshest and most innovative omakase in the city.",
    content: "Tucked away in an alley off the main square, 'Sakura Dreams' is easy to miss. But those who find it are rewarded with an unforgettable omakase experience. Chef Kenji, with over 30 years of experience, curates a daily menu based on what's freshest at the morning market.\n\nThe progression of flavors is masterful. Starting with delicate white fish like flounder, moving to rich, fatty tuna (otoro), and finishing with a perfectly sweet tamago. The attention to detail is evident in every bite, down to the temperature of the rice, which is meticulously controlled.",
    author: "Sarah Jenkins",
    date: "November 5, 2023",
    restaurant: "Sakura Dreams"
  },
  {
    id: "3",
    title: "Mastering the Art of French Pastry",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "A deep dive into the world of croissants, macarons, and éclairs, and the local bakery doing it right.",
    content: "French pastry is a delicate balance of science and art. Lamination, the process of folding butter into dough to create flaky layers, requires precision and patience. 'Le Petit Four' has perfected this craft.\n\nTheir croissants shatter upon the first bite, revealing a honeycomb interior that is incredibly light and buttery. But the real star is their Ispahan macaron—a delicate almond shell filled with rose petal cream, lychee, and fresh raspberries. It's a flavor combination that transports you straight to Paris.",
    author: "Emily Chen",
    date: "December 1, 2023",
    restaurant: "Le Petit Four"
  },
  {
    id: "4",
    title: "Spicy & Sour: A Journey Through Thai Street Food",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Experience the vibrant, bold flavors of authentic Thai street food, from fiery Som Tum to comforting Pad Kra Pao.",
    content: "Thai street food is an explosion of the senses. It's a masterful balancing act of the five fundamental taste senses in each dish or the overall meal: hot (spicy), sour, sweet, salty, and (optional) bitter.\n\nAt 'Bangkok Bites', the wok hei (breath of the wok) is palpable. Their Pad Kra Pao (holy basil stir-fry) packs a serious punch of bird's eye chili, perfectly offset by a crispy-edged fried egg with a runny yolk. Don't skip the Som Tum (green papaya salad)—it's refreshingly tart, sweet, and aggressively spicy.",
    author: "David Ross",
    date: "January 20, 2024",
    restaurant: "Bangkok Bites"
  }
];

export const mockReviews = {
  "1": [
    { id: "r1", user: "JohnD", rating: 5, comment: "Absolutely incredible! The crust was exactly as described.", date: "2023-10-15" },
    { id: "r2", user: "PizzaLover99", rating: 4, comment: "Great article. The restaurant recommendation was spot on, though a bit pricey.", date: "2023-10-18" }
  ],
  "2": [
    { id: "r3", user: "FoodieAdventurer", rating: 5, comment: "Sakura Dreams is my new favorite spot. Thanks for the tip!", date: "2023-11-06" }
  ],
  "3": [
    { id: "r4", user: "SweetTooth", rating: 5, comment: "The Ispahan macaron changed my life.", date: "2023-12-05" },
    { id: "r5", user: "BakerBob", rating: 3, comment: "The croissants were good, but I've had better in Paris.", date: "2023-12-10" }
  ],
  "4": [
    { id: "r6", user: "SpiceKing", rating: 4, comment: "Love the heat! Bangkok Bites doesn't hold back on the chili.", date: "2024-01-22" }
  ]
};

export const initialRestaurants = [
  { 
    id: "1", 
    name: "The Grand Curry House", 
    rating: 4.8, 
    location: "Downtown City Center", 
    food: "Authentic Indian",
    images: ["/grandcurryhouse.png"], 
    description: "Experience the ultimate authentic taste of India right in the heart of the city. Our master chefs use traditional, centuries-old recipes passed down through generations, utilizing only the freshest hand-ground spices and organic ingredients. Whether you crave a fiery, spicy vindaloo that tingles your tastebuds or a rich, creamy butter chicken that melts in your mouth, our extensive menu has something to satisfy every single palate. Enjoy our warm, inviting, and culturally rich ambiance which makes it the perfect setting for family dinners, business lunches, or romantic dates. Come join us today for a mesmerizing culinary journey you won't easily forget."
  },
  { 
    id: "2", 
    name: "Oceanic Seafood Grill", 
    rating: 4.5, 
    location: "Westside Pier", 
    food: "Fresh Seafood",
    images: ["/oceanic.png"], 
    description: "Located right on the edge of the beautiful Westside Pier, Oceanic Seafood Grill offers breathtaking sunset views alongside the freshest catches of the day. We pride ourselves on our sustainable fishing partnerships, ensuring that every plate of grilled salmon, garlic butter prawns, and crispy calamari is both ethical and delicious. Our signature oyster bar is renowned across the city, featuring seasonal selections paired perfectly with our house-made zesty mignonettes. The interior features a relaxing, nautical theme that transports you straight to a luxurious cruise experience. Reserve a table on our open-air deck to enjoy the cool ocean breeze while you dine in absolute paradise."
  },
  { 
    id: "3", 
    name: "Skyline Continental Cafe", 
    rating: 4.6, 
    location: "Uptown Financial District", 
    food: "Continental & European",
    images: ["/skyline.png"], 
    description: "Elevate your dining experience at the Skyline Continental Cafe, situated on the top floor of the Uptown high-rise with panoramic views of the entire metropolitan area. We bring the finest European dining traditions straight to your table, offering a sophisticated menu that ranges from classic French escargot to hearty Italian truffle risottos. Our world-class sommeliers are always on hand to help you pair your meal with the perfect vintage from our award-winning, floor-to-ceiling glass wine cellar. During the day, sunlight floods the dining room making it ideal for high-stakes business meetings, while nightfall transforms the space into an intimately lit, romantic heaven. Dress to impress and prepare for top-tier hospitality."
  },
  { 
    id: "4", 
    name: "The Rustic Urban Oven", 
    rating: 4.2, 
    location: "Creative Arts District", 
    food: "Wood-fired Pizza & Bakery",
    images: ["/rustic.png"], 
    description: "Step away from the hustle and bustle and step into the warm, comforting embrace of The Rustic Urban Oven. Famous for our traditional, Neapolitan-style wood-fired pizzas, you can literally smell the beautiful aroma of baking dough and melting mozzarella from a block away. We source our tomatoes straight from local organic farms to create a perfectly balanced, tangy marinara sauce that perfectly complements our 48-hour fermented sourdough crusts. Beyond pizza, our bakery counter is loaded daily with freshly baked artisan breads, decadent chocolate lava cakes, and flaky morning pastries. Grab a slice, sit by the exposed brick fireplace, and enjoy the cozy, vintage atmosphere."
  },
];
