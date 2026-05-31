import './style.css'

const itemImagePool = [
  'assets/dishes/lunch/bucket-burger.jpg',
  'assets/dishes/lunch/fried-shrimp-plate.jpg',
  'assets/dishes/lunch/wings.jpg',
  'assets/dishes/lunch/shrimp-tacos.jpg',
  'assets/dishes/breakfast/the-big-beach-breakfast.jpg',
  'assets/dishes/breakfast/seafood-omelet.jpg',
  'assets/dishes/lunch/crab-cakes.jpg',
  'assets/dishes/lunch/caesar-salad.jpg'
]

const dishCarouselItems = [
  { name: 'Bucket Burger',            img: 'assets/dishes/lunch/bucket-burger.jpg' },
  { name: 'Bucket Fish Sandwich',     img: 'assets/dishes/lunch/bucket-fish-sandwich.jpg' },
  { name: 'Key West Chicken',         img: 'assets/dishes/lunch/key-west-chicken-sandwich.jpg' },
  { name: 'Tuna Melt',                img: 'assets/dishes/lunch/tuna-melt-sandwich.jpg' },
  { name: 'Ahi Tuna Wrap',            img: 'assets/dishes/lunch/ahi-tuna-wrap.jpg' },
  { name: 'Loaded Chicken Panini',    img: 'assets/dishes/lunch/loaded-chicken-panini.jpg' },
  { name: 'Shrimp & Bacon Panini',    img: 'assets/dishes/lunch/shrimp-and-bacon-panini.jpg' },
  { name: 'Steak & Mozzarella Panini',img: 'assets/dishes/lunch/steak-and-mozzarella-panini.jpg' },
  { name: 'Fish Tacos',               img: 'assets/dishes/lunch/fish-tacos.jpg' },
  { name: 'Shrimp Tacos',             img: 'assets/dishes/lunch/shrimp-tacos.jpg' },
  { name: 'Pulled Pork Tacos',        img: 'assets/dishes/lunch/pulled-pork-and-slaw-tacos.jpg' },
  { name: 'Caesar Salad',             img: 'assets/dishes/lunch/caesar-salad.jpg' },
  { name: 'House Salad',              img: 'assets/dishes/lunch/bucket-house-salad.jpg' },
  { name: 'Buffalo Shrimp',           img: 'assets/dishes/lunch/buffalo-shrimp.jpg' },
  { name: 'Chicken Tenders',          img: 'assets/dishes/lunch/chicken-tenders.jpg' },
  { name: 'Conch Fritters',           img: 'assets/dishes/lunch/conch-fritters.jpg' },
  { name: 'Corn Nuggets',             img: 'assets/dishes/lunch/corn-nuggets.jpg' },
  { name: 'Crab Cakes',               img: 'assets/dishes/lunch/crab-cakes.jpg' },
  { name: 'Fried Calamari',           img: 'assets/dishes/lunch/fried-calamari.jpg' },
  { name: 'Mozzarella Sticks',        img: 'assets/dishes/lunch/fried-mozzarella-sticks.jpg' },
  { name: 'Fried Shrimp',             img: 'assets/dishes/lunch/fried-shrimp-plate.jpg' },
  { name: 'Onion Rings',              img: 'assets/dishes/lunch/onion-rings.jpg' },
  { name: 'Smoked Fish Dip',          img: 'assets/dishes/lunch/smoked-fish-dip.jpg' },
  { name: 'Wings',                    img: 'assets/dishes/lunch/wings.jpg' }
]

const breakfastPhotos = [
  ['The Big Beach', 'the-big-beach-breakfast'], ['The Early Bird', 'early-bird-breakfast'],
  ['The Sunrise', 'the-sunrise-breakfast'], ['Biscuits & Gravy', 'biscuits-and-gravy'],
  ['Seafood Omelet', 'seafood-omelet'], ['Chorizo Omelet', 'chorizo-omelet'],
  ['Veggie Omelet', 'veggie-omelet'], ['French Toast', 'french-toast-three-slices'],
  ['Healthy Surfer', 'healthy-surfer-breakfast'], ['Classic Benedict', 'classic-benedict']
]
const drinkPhotos = [
  ['Blueberry Bay Breeze', 'blueberry-bay-breeze'], ['Cherry Limeade', 'cherry-lemonade'],
  ['Citrus Seabreeze', 'citrus-seabreeze'], ['Cucumber Cooler', 'cucumber-cooler'],
  ['Grape Pop', 'grape-pop'], ['Orange Crush', 'orange-crush'], ['Raspberry Lemonade', 'rapsberry-lemonade']
]

const galleryItems = [
  ...breakfastPhotos.map(([label, slug]) => ({ category: 'breakfast', label, img: `assets/dishes/breakfast/${slug}.jpg` })),
  ...dishCarouselItems.map(d => ({ category: 'lunch', label: d.name, img: d.img })),
  ...drinkPhotos.map(([label, slug]) => ({ category: 'drinks', label, img: `assets/drinks/${slug}.png` })),
  { category: 'atmosphere', label: 'Oceanfront Patio at Sunset', img: 'assets/venue/deck-sunrise.jpg' },
  { category: 'atmosphere', label: 'The Full Bar', img: 'assets/venue/bar.jpg' },
  { category: 'atmosphere', label: 'Indoor Dining', img: 'assets/venue/indoor-dining.jpg' },
  { category: 'atmosphere', label: 'Beachfront Exterior', img: 'assets/venue/exterior.jpg' },
  { category: 'atmosphere', label: 'Sunset Deck Views', img: 'assets/atmosphere/atmosphere-sunset-1.jpg' },
  { category: 'atmosphere', label: 'Evening on the Atlantic', img: 'assets/atmosphere/atmosphere-sunset-2.jpg' }
]

const menuSections = [
  {
    title: 'Breakfast Omelettes (Served 7AM to 11AM)',
    items: [
      ['Seafood Omelet', '$16.49', 'House specialty. A beach favorite stuffed with blue swimming crab and shrimp, then topped with creamy hollandaise sauce.'],
      ['Swiss Bacon Mushroom Omelet', '$12.79', 'Crispy bacon, sauteed mushrooms, and melted Swiss cheese folded into a fluffy 3-egg omelet.'],
      ['Ormond Omelet', '$13.29', 'Grilled ham, onions, and sweet peppers in a fluffy omelet. Add cheese for $1.99.'],
      ['Meat Lover\'s Omelet', '$14.29', 'Loaded with sausage, bacon, and ham, finished with melted cheddar cheese.'],
      ['Cheese Omelet', '$13.29', 'Extra cheesy omelet with a double portion of your choice of American, Swiss, provolone, or cheddar.'],
      ['Chorizo Omelet', '$13.79', 'Spicy chorizo, peppers, onions, and provolone, topped with sweet chili sauce for the perfect sweet-heat bite.'],
      ['Veggie Omelet', '$13.29', 'Tomatoes, onions, mushrooms, and peppers with cheddar cheese, fresh and full of flavor.']
    ]
  },
  {
    title: 'Benedicts',
    items: [
      ['Chorizo', '$13.99', 'Toasted English muffin topped with spicy chorizo patties, poached eggs, and creamy hollandaise.'],
      ['Classic', '$13.99', 'Smoky Canadian bacon, poached eggs, and rich hollandaise on a toasted English muffin.'],
      ['Blue Swimming Crab (House Specialty)', '$16.29', 'Coastal benedict topped with blue swimming crabmeat, poached eggs, and creamy hollandaise.']
    ]
  },
  {
    title: 'Breakfast Combos',
    items: [
      ['#1 Early Bird', '$10.99', 'Two eggs cooked your way with your choice of bacon (2), sausage links (2), or sausage patty (1).'],
      ['#2 The Sunrise', '$10.79', 'Two eggs with thick sliced smoked ham, hearty and classic.'],
      ['#3 Biscuits and Gravy', '$11.29', 'Two eggs with a warm biscuit split and covered in rich sausage gravy. Does not include toast.'],
      ['#4 The Big Beach', '$12.49', 'Two eggs, two slices of bacon, and two sausage links for a big breakfast.']
    ]
  },
  {
    title: 'Breakfast Favorites',
    items: [
      ['Breakfast Sandwich', '$11.29', 'Two eggs with your choice of toast (substitute biscuit or English muffin for $0.99), plus your choice of bacon (2), sausage patty, or chorizo patty. Served with home fries. Add cheese for $0.99.'],
      ['Healthy Surfer', '$13.49', 'Scrambled egg whites with tomato slices, a fresh fruit cup, and a toasted English muffin.']
    ]
  },
  {
    title: 'French Toast',
    items: [
      ['Three Slices French Toast', '$11.99', 'Three thick slices grilled golden and dusted with powdered sugar.'],
      ['French Toast Breakfast Combo', '$13.79', 'Three slices of French toast with your choice of 2 pieces of bacon or sausage links and one egg.']
    ]
  },
  {
    title: 'Breakfast Beverages',
    items: [
      ['Coffee', '', 'Fresh-brewed, hot, and smooth. The classic breakfast drink.'],
      ['Hot Tea', '', 'A warm cup of tea, steeped fresh and served hot.'],
      ['Fresh Squeezed Orange Juice (Small/Large)', '', 'Bright, fresh-squeezed Florida orange juice, served small or large.'],
      ['Iced Tea', '', 'Cold, crisp iced tea served over ice.'],
      ['Sweet Tea', '', 'Classic Southern sweet tea, cold and refreshing.'],
      ['Pepsi Products', '', 'A full selection of Pepsi soft drinks served ice-cold.'],
      ['Mimosa\'s', '', 'Chilled sparkling wine mixed with fruit juice, perfect for brunch.'],
      ['Bloody Mary\'s', '', 'Our famous Bloody Mary, bold, savory, and brunch-ready.'],
      ['Full Bar', '', 'Cocktails, beer, and wine available all day.']
    ]
  },
  {
    title: 'Breakfast Sides',
    items: [
      ['Slice of French Toast', '$3.99', 'One thick slice grilled golden and dusted with powdered sugar.'],
      ['Grits', '$3.29', 'Creamy, buttery grits cooked smooth and served hot.'],
      ['Sausage Links (Four)', '$4.29', 'Four juicy sausage links cooked until browned.'],
      ['Toast', '$2.99', 'Warm toast served with butter and your choice of bread.'],
      ['Home Fries', '$2.99', 'Crispy breakfast potatoes, golden outside and tender inside.'],
      ['Sausage Patty (Two)', '$4.29', 'Two savory sausage patties, grilled and seasoned.'],
      ['English Muffin', '$2.99', 'Toasted English muffin with a buttery, crisp edge.'],
      ['One Egg', '$2.99', 'One fresh egg cooked your way.'],
      ['Chorizo Sausage Patty (Two)', '$4.29', 'Two spicy chorizo patties with big flavor and a little kick.'],
      ['Biscuit', '$2.99', 'Fluffy buttermilk biscuit served warm.'],
      ['Fresh Fruit Cup', '$3.79', 'A light mix of fresh, chilled fruit.'],
      ['Bacon (Four)', '$4.29', 'Four strips of crispy, smoky bacon.'],
      ['Sausage Gravy', '$1.99', 'Rich, peppery sausage gravy, perfect for biscuits or dipping.'],
      ['Fresh Fruit Bowl', '$5.79', 'A larger bowl of fresh fruit, cool and refreshing.'],
      ['Ham Slice', '$5.29', 'Thick sliced ham, grilled and lightly smoky.']
    ]
  },
  {
    title: 'Lunch & Dinner Starters',
    items: [
      ['Peel & Eat Shrimp (1/2 Pound / Full Pound)', '$16.49 / $23.49', 'Shell-on shrimp steamed warm and seasoned with our secret coastal blend. Served with cocktail sauce and melted butter.'],
      ['Conch Fritters', '$15.49', 'Tender conch mixed with island spices, fried golden and crisp. Served with creamy remoulade.'],
      ['Fried Calamari', '$13.79', 'Lightly seasoned calamari, fried crispy and golden brown. Served with marinara or remoulade.'],
      ['Fried Mozzarella Sticks', '$11.99', 'Golden-fried mozzarella sticks with a melty cheese pull in every bite. Served with marinara or ranch.'],
      ['Smoked Fish Dip', '$14.29', 'House-smoked wahoo and mahi mahi blended with signature seasoning and creamy spread. Served with tortilla chips.'],
      ['Wings', '$16.99', 'One pound of wings tossed in Bucket Sauce or Buffalo (mild/hot), teriyaki, garlic butter, or BBQ. Add fries for $3.99.'],
      ['Buffalo Shrimp', '$15.49', 'Hand-breaded shrimp tossed in Buffalo sauce (mild or hot). Add fries for $3.99.'],
      ['Crab Cakes', '$16.99', 'Lump crab cakes pan-seared until golden and flavorful. Served with remoulade.'],
      ['Onion Rings', '$11.49', 'Thick-cut onion rings fried crispy and golden. Served with remoulade.'],
      ['Sweet Potato Fries', '$8.99', 'Crispy sweet potato fries seasoned with a light touch of salt and pepper.'],
      ['Pork Nachos', '$15.49', 'Pulled pork in Bucket Sauce over crispy tortilla chips with queso, tomatoes, onions, salsa, and sour cream.'],
      ['Corn Nuggets', '$8.99', 'Sweet corn bites fried golden and dusted with powdered sugar. Served with ranch and maple syrup.'],
      ['Pretzels', '$11.99', 'Soft Bavarian pretzels, warm and lightly salted. Served with queso cheese dip.']
    ]
  },
  {
    title: 'Lunch & Dinner Salads',
    items: [
      ['Tomato Avocado Salsa Salad', '$12.99', 'Fresh mixed greens with tomatoes, onions, cheddar, croutons, and house tomato avocado salsa.'],
      ['Caesar Salad (Small)', '$6.99', 'Crisp romaine tossed with creamy Caesar dressing, parmesan, and crunchy croutons.'],
      ['Caesar Salad (Large)', '$10.99', 'Crisp romaine tossed with creamy Caesar dressing, parmesan, and crunchy croutons.'],
      ['Bucket House Salad (Small)', '$6.99', 'Fresh mixed greens with garden toppings and croutons, served with your choice of dressing.'],
      ['Bucket House Salad (Large)', '$10.99', 'Fresh mixed greens with garden toppings and croutons, served with your choice of dressing.'],
      ['Add: Grilled Chicken Breast or Tuna Salad', '$6.99', 'Add extra protein with grilled chicken breast or house-made tuna salad.'],
      ['Add: Grilled Mahi, Ahi Tuna Steak, or Grilled Shrimp', '$7.99', 'Add fresh grilled seafood for a hearty beach-style meal.']
    ]
  },
  {
    title: 'Lunch & Dinner Entrees',
    items: [
      ['Key West Chicken Sandwich', '$13.49', 'Juicy grilled chicken seasoned with house Key West spice blend, served on a toasted bun with lettuce and tomato.'],
      ['Tuna Melt Sandwich (House Specialty)', '$13.29', 'House tuna salad topped with melted cheddar on parmesan-encrusted sourdough.'],
      ['Shrimp and Bacon Panini', '$16.29', 'Crispy fried shrimp in Bucket Sauce, pressed hot with bacon and cheddar.'],
      ['Steak and Mozzarella Panini', '$15.49', 'Tender shaved steak with grilled tomatoes, fresh basil, and mozzarella, finished with balsamic reduction.'],
      ['Mozzarella Caprese Panini', '$13.99', 'Melted mozzarella, grilled tomatoes, and fresh basil with balsamic reduction.'],
      ['Loaded Chicken Panini', '$15.29', 'Grilled chicken with sauteed peppers, mushrooms, onions, and cheddar; served with tzatziki.'],
      ['Shrimp Tacos (House Specialty)', '$15.79', 'Two flour tortillas with grilled/blackened/fried shrimp, spring mix, tomato avocado salsa, and cilantro aioli.'],
      ['Fish Tacos (House Specialty)', '$15.29', 'Two flour tortillas with grilled/blackened/fried white fish, spring mix, tomato avocado salsa, and cilantro aioli.'],
      ['Pulled Pork and Slaw Tacos', '$13.99', 'Two flour tortillas with pulled pork in Bucket Sauce, topped with creamy coleslaw.'],
      ['BBQ Burger', '$15.99', 'Half-pound burger topped with BBQ pulled pork, crispy bacon, and BBQ sauce on a toasted bun.'],
      ['Bucket Burger', '$14.99', 'Half-pound burger on a toasted bun with lettuce, tomato, raw onion, and pickles.'],
      ['Fish & Chips', '$13.99', 'Mild white fish fried golden and crispy, served with tartar sauce and malt vinegar.'],
      ['Chicken Tender', '$13.79', 'Golden fried chicken tenders seasoned with our special spice blend.'],
      ['Fried Shrimp', '$15.99', 'Large sweet shrimp hand-breaded in house batter, fried golden and tender.'],
      ['Ahi Tuna Wrap', '$16.49', 'Seasoned ahi tuna grilled medium-rare in a jalapeno cheese tortilla with spring mix and tomato avocado salsa.'],
      ['Bucket Fish Sandwich', '$14.99', 'Mild white fish grilled, blackened, or fried on a toasted bun with lettuce, tomato, and tartar sauce.'],
      ['Fish & Shrimp Combo (House Specialty)', '$25.99', 'Your choice of fried, blackened, or grilled fish and shrimp, with tartar, cocktail sauce, lemon wedge, and coleslaw.']
    ]
  },
  {
    title: 'Desserts',
    items: [
      ['Chocolate Peanut Butter Pie', '$8.49', 'Creamy chocolate and peanut butter in a rich, chilled pie slice.'],
      ['Key Lime Pie', '$8.49', 'Tangy key lime filling with a sweet, crunchy crust.'],
      ['Salted Caramel Cheesecake', '$8.49', 'Smooth cheesecake topped with salted caramel.']
    ]
  }
]

let menuImageCounter = 0
const nextImage = () => itemImagePool[(menuImageCounter++) % itemImagePool.length]

const B = 'assets/dishes/breakfast/', L = 'assets/dishes/lunch/'
const featuredItemImages = {
  // breakfast
  'Seafood Omelet': B + 'seafood-omelet.jpg',
  'Chorizo Omelet': B + 'chorizo-omelet.jpg',
  'Veggie Omelet': B + 'veggie-omelet.jpg',
  'Ormond Omelet': B + 'veggie-omelet.jpg',
  'Classic': B + 'classic-benedict.jpg',
  'Blue Swimming Crab (House Specialty)': B + 'blue-swimming-crab-benedict.jpg',
  '#1 Early Bird': B + 'early-bird-breakfast.jpg',
  '#2 The Sunrise': B + 'the-sunrise-breakfast.jpg',
  '#3 Biscuits and Gravy': B + 'biscuits-and-gravy.jpg',
  '#4 The Big Beach': B + 'the-big-beach-breakfast.jpg',
  'Healthy Surfer': B + 'healthy-surfer-breakfast.jpg',
  'Three Slices French Toast': B + 'french-toast-three-slices.jpg',
  'French Toast Breakfast Combo': B + 'french-toast-three-slices.jpg',
  // starters & sides
  'Conch Fritters': L + 'conch-fritters.jpg',
  'Fried Calamari': L + 'fried-calamari.jpg',
  'Fried Mozzarella Sticks': L + 'fried-mozzarella-sticks.jpg',
  'Smoked Fish Dip': L + 'smoked-fish-dip.jpg',
  'Wings': L + 'wings.jpg',
  'Buffalo Shrimp': L + 'buffalo-shrimp.jpg',
  'Crab Cakes': L + 'crab-cakes.jpg',
  'Onion Rings': L + 'onion-rings.jpg',
  'Corn Nuggets': L + 'corn-nuggets.jpg',
  // salads
  'Caesar Salad (Small)': L + 'caesar-salad.jpg',
  'Caesar Salad (Large)': L + 'caesar-salad.jpg',
  'Bucket House Salad (Small)': L + 'bucket-house-salad.jpg',
  'Bucket House Salad (Large)': L + 'bucket-house-salad.jpg',
  // entrees
  'Key West Chicken Sandwich': L + 'key-west-chicken-sandwich.jpg',
  'Tuna Melt Sandwich (House Specialty)': L + 'tuna-melt-sandwich.jpg',
  'Shrimp and Bacon Panini': L + 'shrimp-and-bacon-panini.jpg',
  'Steak and Mozzarella Panini': L + 'steak-and-mozzarella-panini.jpg',
  'Loaded Chicken Panini': L + 'loaded-chicken-panini.jpg',
  'Shrimp Tacos (House Specialty)': L + 'shrimp-tacos.jpg',
  'Fish Tacos (House Specialty)': L + 'fish-tacos.jpg',
  'Pulled Pork and Slaw Tacos': L + 'pulled-pork-and-slaw-tacos.jpg',
  'Bucket Burger': L + 'bucket-burger.jpg',
  'Chicken Tender': L + 'chicken-tenders.jpg',
  'Fried Shrimp': L + 'fried-shrimp-plate.jpg',
  'Ahi Tuna Wrap': L + 'ahi-tuna-wrap.jpg',
  'Bucket Fish Sandwich': L + 'bucket-fish-sandwich.jpg'
}

// Menu-engineering "stars": high-margin signatures featured in the golden-triangle (top of menu)
const SIGNATURES_LUNCH = [
  { name: 'Steak & Mozzarella Panini', img: L + 'steak-and-mozzarella-panini.jpg', blurb: 'Shaved steak, fresh mozzarella, grilled tomato & basil, balsamic reduction.', price: '15.49' },
  { name: 'Shrimp Tacos', img: L + 'shrimp-tacos.jpg', blurb: 'Blackened shrimp, avocado, tomato salsa & cilantro aioli in soft tortillas.', price: '15.79' },
  { name: 'Crab Cakes', img: L + 'crab-cakes.jpg', blurb: 'Lump crab cakes pan-seared golden, served with house remoulade.', price: '16.99' },
  { name: 'Fried Shrimp', img: L + 'fried-shrimp-plate.jpg', blurb: 'Large sweet shrimp hand-breaded in our house batter, fried golden and tender.', price: '15.99' },
  { name: 'Tuna Melt', img: L + 'tuna-melt-sandwich.jpg', blurb: 'House tuna salad & melted cheddar on parmesan-crusted sourdough.', price: '13.29' },
  { name: 'Bucket Burger', img: L + 'bucket-burger.jpg', blurb: 'Half-pound char-grilled burger, lettuce, tomato, onion & pickles on a toasted bun.', price: '14.99' },
  { name: 'Fish Tacos', img: L + 'fish-tacos.jpg', blurb: 'Grilled, blackened or fried white fish with pico, cilantro-lime crema & avocado.', price: '15.29' },
  { name: 'Wings', img: L + 'wings.jpg', blurb: 'A pound of jumbo wings tossed in Bucket Sauce, Buffalo, teriyaki, garlic butter or BBQ.', price: '16.99' },
  { name: 'Ahi Tuna Wrap', img: L + 'ahi-tuna-wrap.jpg', blurb: 'Seared ahi tuna in a jalapeno cheese tortilla with spring mix and tomato avocado salsa.', price: '16.49' }
]
const SIGNATURES_BREAKFAST = [
  { name: 'Seafood Omelet', img: B + 'seafood-omelet.jpg', blurb: 'Blue swimming crab & shrimp folded into a fluffy omelet, finished with creamy hollandaise.', price: '16.49' },
  { name: 'Blue Swimming Crab Benedict', img: B + 'blue-swimming-crab-benedict.jpg', blurb: 'House specialty: blue crabmeat, poached eggs & creamy hollandaise on a toasted muffin.', price: '16.29' },
  { name: 'Classic Eggs Benedict', img: B + 'classic-benedict.jpg', blurb: 'Smoky Canadian bacon, poached eggs & rich hollandaise on a toasted English muffin.', price: '13.99' },
  { name: 'The Big Beach', img: B + 'the-big-beach-breakfast.jpg', blurb: 'Two eggs, two bacon strips and two sausage links for a hearty big breakfast.', price: '12.49' },
  { name: 'Healthy Surfer', img: B + 'healthy-surfer-breakfast.jpg', blurb: 'Scrambled egg whites with tomato slices, fresh fruit cup and a toasted English muffin.', price: '13.49' },
  { name: 'French Toast', img: B + 'french-toast-three-slices.jpg', blurb: 'Three thick slices grilled golden and dusted with powdered sugar, with warm syrup.', price: '11.99' },
  { name: 'Chorizo Omelet', img: B + 'chorizo-omelet.jpg', blurb: 'Spicy chorizo, peppers, onions & provolone, topped with sweet chili for the perfect kick.', price: '13.79' },
  { name: 'Biscuits & Gravy', img: B + 'biscuits-and-gravy.jpg', blurb: 'Two eggs with a warm split biscuit covered in rich, peppery sausage gravy.', price: '11.29' },
  { name: 'The Sunrise', img: B + 'the-sunrise-breakfast.jpg', blurb: 'Two eggs with a thick-sliced smoked ham steak and seasoned home fries.', price: '10.79' }
]

const menuNamesEn = menuSections.flatMap(s => s.items.map(i => i[0]))
const menuDescsEn = menuSections.flatMap(s => s.items.map(i => i[2]))

let menuIdx = 0
const sectionsHtml = menuSections.map((section) => {
  const items = section.items.map((item) => {
    const idx = menuIdx++
    const isSpec = /\(House Specialty\)/i.test(item[0])
    const cleanName = item[0].replace(/\s*\(House Specialty\)/i, '')
    const priceNum = (item[1] || '').replace(/\$/g, '')
    const price = priceNum ? `<span class="m-price">${priceNum}</span>` : ''
    const badge = isSpec ? `<span class="m-badge">Signature Dishes</span>` : ''
    const img = featuredItemImages[item[0]]
    const thumb = img
      ? `<button class="m-thumb item-thumb-btn" data-img="${img}" data-name="${cleanName}" aria-label="View photo of ${cleanName}"><img src="${img}" alt="${cleanName}" loading="lazy" /></button>`
      : ''
    return `
      <li class="m-item${img ? ' has-thumb' : ''}">
        ${thumb}
        <div class="m-item-text">
          <div class="m-item-head">
            <span class="m-name" data-menu-name="${idx}">${cleanName}</span>
            ${price}
          </div>
          ${badge}
          <p class="m-desc" data-menu-desc="${idx}">${item[2]}</p>
        </div>
      </li>`
  }).join('')

  const secKey = /Entrees/i.test(section.title) ? 'entrees' : /Desserts/i.test(section.title) ? 'desserts' : ''
  const secId = /Lunch & Dinner Starters/i.test(section.title) ? ' id="lunch-dinner"' : ''
  const sec = `
    <section class="m-section" data-sec="${secKey}"${secId}>
      <h3 class="m-section-title" data-i18n="menu.section.${section.title}">${section.title}</h3>
      <ul class="m-list">${items}</ul>
    </section>`
  if (/Salads/i.test(section.title)) {
    const withLogo = sec.replace('</section>', `<figure class="m-logo"><img src="assets/menu-logo.jpg" alt="The Beach Bucket Bar & Grill" loading="lazy" /></figure></section>`)
    return withLogo + `
    <figure class="m-video m-video--salads">
      <video src="assets/video/menu-feature.mp4" autoplay loop muted playsinline preload="metadata" aria-label="The Beach Bucket dishes"></video>
    </figure>`
  }
  if (/French Toast/i.test(section.title)) {
    return sec.replace('</section>', `<figure class="m-video m-video--french"><video src="assets/video/menu-feature-3.mp4" autoplay loop muted playsinline preload="metadata" aria-label="The Beach Bucket dishes"></video></figure></section>`)
  }
  if (/Desserts/i.test(section.title)) {
    return sec + `
    <figure class="m-video m-video--desserts">
      <video src="assets/video/menu-feature-2.mp4" autoplay loop muted playsinline preload="metadata" aria-label="The Beach Bucket dishes"></video>
    </figure>`
  }
  return sec
}).join('')

const featCard = s => `
  <article class="feat-card">
    <button class="feat-img item-thumb-btn" data-img="${s.img}" data-name="${s.name}" aria-label="View ${s.name}"><img src="${s.img}" alt="${s.name}" loading="lazy" /></button>
    <div class="feat-body">
      <span class="m-badge">Signature Dishes</span>
      <h3 class="feat-name">${s.name}</h3>
      <p class="feat-desc">${s.blurb}</p>
      <span class="feat-price">${s.price}</span>
    </div>
  </article>`
const signaturesLunchHtml = SIGNATURES_LUNCH.map(featCard).join('')
const signaturesBreakfastHtml = SIGNATURES_BREAKFAST.map(featCard).join('')

document.querySelector('#app').innerHTML = `
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header class="site-header" role="banner">
    <div class="container topbar">
      <a class="brand" href="#main-content" aria-label="The Beach Bucket home">
        <img class="brand-logo-full" src="assets/beachbucket-logo-full.jpg" alt="The Beach Bucket Bar and Grill logo" />
      </a>
      <div class="social-links" aria-label="Social media links">
        <a class="social-icon social-fb" href="https://www.facebook.com/beachbucketob/" target="_blank" rel="noopener noreferrer" aria-label="Beach Bucket on Facebook"><img src="https://cdn.simpleicons.org/facebook/1877F2" alt="" aria-hidden="true" /></a>
        <a class="social-icon social-ig" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Beach Bucket on Instagram"><img src="https://cdn.simpleicons.org/instagram/E4405F" alt="" aria-hidden="true" /></a>
        <a class="social-icon social-tk" href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="Beach Bucket on TikTok"><img src="https://cdn.simpleicons.org/tiktok/000000" alt="" aria-hidden="true" /></a>
        <a class="social-icon social-x" href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Beach Bucket on X"><img src="https://cdn.simpleicons.org/x/0c3c49" alt="" aria-hidden="true" /></a>
      </div>
      <nav class="mobile-tabs" aria-label="Quick tabs">
        <a href="#main-content">Home</a>
        <a href="#menu">Breakfast</a>
        <a href="#lunch-dinner">Lunch/Dinner</a>
      </nav>
      <button class="nav-toggle" id="navToggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="primaryNav"><span></span><span></span><span></span></button>
      <nav class="quick-nav" aria-label="Quick links">
        <a href="#main-content" data-i18n="nav.home">Home</a>
        <a href="#menu" data-i18n="nav.menu">Menu</a>
        <a href="#menu">Breakfast</a>
        <a href="#lunch-dinner">Lunch/Dinner</a>
        <a href="#gallery" data-i18n="nav.gallery">Gallery</a>
      </nav>
      <div class="topbar-right">
        <a class="quick-pill quick-location" href="https://maps.google.com/?q=The+Beach+Bucket+867+S+Atlantic+Ave+Ormond+Beach+FL+32176" target="_blank" rel="noopener noreferrer" aria-label="Get directions to The Beach Bucket">Location</a>
        <a class="quick-pill quick-print" href="assets/menu/food-menu.pdf" target="_blank" rel="noopener noreferrer" aria-label="Print or download the menu (PDF)">Print Menu</a>
      </div>
      <nav id="primaryNav" aria-label="Main navigation">
        <ul class="nav-list">
          <li><a href="#main-content" aria-current="page" data-i18n="nav.home">Home</a></li>
          <li><a href="#menu" data-i18n="nav.menu">Menu</a></li>
          <li><a href="#menu">Breakfast</a></li>
          <li><a href="#lunch-dinner">Lunch / Dinner</a></li>
          <li><a href="#gallery" data-i18n="nav.gallery">Gallery</a></li>
          <li><a href="#giftcards" data-i18n="nav.giftcards">Gift Cards</a></li>
          <li><a href="#faq" data-i18n="nav.faq">FAQ</a></li>
          <li><a href="#contact" data-i18n="nav.contact">Contact</a></li>
          <li><a href="https://maps.google.com/?q=The+Beach+Bucket+867+S+Atlantic+Ave+Ormond+Beach+FL+32176" target="_blank" rel="noopener noreferrer">Location</a></li>
          <li><a href="assets/menu/food-menu.pdf" target="_blank" rel="noopener noreferrer">Print Menu (PDF)</a></li>
          <li><a class="nav-order" href="https://order.online/business/The%20Beach%20Bucket-185350" target="_blank" rel="noopener noreferrer">Order Online</a></li>
        </ul>
        <div class="nav-social" aria-label="Social media links">
          <a class="social-icon social-fb" href="https://www.facebook.com/beachbucketob/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src="https://cdn.simpleicons.org/facebook/1877F2" alt="" aria-hidden="true" /></a>
          <a class="social-icon social-ig" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="https://cdn.simpleicons.org/instagram/E4405F" alt="" aria-hidden="true" /></a>
          <a class="social-icon social-tk" href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><img src="https://cdn.simpleicons.org/tiktok/000000" alt="" aria-hidden="true" /></a>
          <a class="social-icon social-x" href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X"><img src="https://cdn.simpleicons.org/x/0c3c49" alt="" aria-hidden="true" /></a>
        </div>
      </nav>
    </div>
  </header>

  <section class="hero" aria-label="The Beach Bucket oceanfront">
    <video id="heroVideo" class="hero-bg" autoplay loop muted playsinline preload="auto" poster="assets/venue/patio-dusk.jpg" aria-label="The Beach Bucket oceanfront">
      <source src="assets/hero-video.mp4" type="video/mp4" />
    </video>
    <button id="muteToggle" class="mute-toggle" type="button" aria-pressed="false">Unmute</button>
    <span class="hero-scroll">Scroll</span>
  </section>

  <nav class="mobile-quick-actions" aria-label="Quick actions">
    <a href="tel:+13863081134" class="qa-btn qa-call" aria-label="Call The Beach Bucket">Call</a>
    <a href="https://maps.google.com/?q=867+South+Atlantic+Avenue+Ormond+Beach+FL+32176" target="_blank" rel="noopener noreferrer" class="qa-btn qa-map" aria-label="Open directions to The Beach Bucket">Directions</a>
    <a href="https://order.online/business/The%20Beach%20Bucket-185350" target="_blank" rel="noopener noreferrer" class="qa-btn qa-order" aria-label="Order online from The Beach Bucket">Order</a>
  </nav>

  <main id="main-content" tabindex="-1">
    <section class="section intro"><div class="container"><h1 class="intro-brand"><img class="intro-logo" src="assets/beachbucket-logo-mascot.png" alt="The Beach Bucket Bar & Grill" /></h1><p class="intro-tagline" data-i18n="intro.tagline">Ormond Beach's Only Oceanfront Dining</p><p class="intro-lead" data-i18n="intro.desc">Discover oceanfront breakfast and lunch in Ormond Beach, Florida. Enjoy fresh seafood, beachside drinks, and a relaxed coastal dining experience just steps from the water.</p></div></section>



    <section id="menu" class="section" aria-labelledby="menu-heading">
      <div class="container">
        <h2 id="menu-heading" data-i18n="menu.title">The Menu</h2>
        <p class="muted">Fresh Florida seafood, oceanfront breakfast, and coastal favorites &mdash; breakfast served daily 7&ndash;11 AM, lunch &amp; dinner to follow.</p>
        <h3 class="menu-feature-title"><span id="sig-label">Breakfast</span> Signature Dishes</h3>
        <div class="menu-feature" id="sigBreakfast">${signaturesBreakfastHtml}</div>
        <div class="menu-feature" id="sigLunch" hidden>${signaturesLunchHtml}</div>
        <div class="menu-divider" aria-hidden="true"></div>
        <h3 class="menu-full-title">The Full Menu</h3>
        <div class="menu-wrap">${sectionsHtml}</div>

        <div class="menu-notes">
          <h3>Breakfast Notes</h3>
          <p><strong>Omelets:</strong> Fluffy 3-egg omelets served with choice of home fries, grits, or tomato slices. Substitute fresh fruit for $2.49. Choice of toast: white, wheat, sourdough, rye (substitute biscuit or English muffin for $1.99). Substitute egg whites for $2.49.</p>
          <p><strong>Benedicts:</strong> Served on a toasted English muffin with poached eggs and creamy hollandaise. Choice of home fries, grits, or tomato slices (substitute fresh fruit $2.49).</p>
          <p><strong>Breakfast Combos:</strong> Served with choice of home fries, grits, or tomato slices (substitute fresh fruit $2.99) and choice of toast (substitute biscuit or English muffin for $1.99). Substitute scrambled egg whites for $2.49.</p>
          <p><strong>Toast Choices:</strong> White, Wheat, Rye, Sourdough (English Muffin or Buttermilk Biscuit add $0.99)</p>
          <p><strong>Cheese Choices:</strong> American, Swiss, Provolone, or Cheddar</p>
          <p><em>*Consuming raw or undercooked meats, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness, especially if you have certain medical conditions.</em></p>
        </div>

        <div class="pdf-links">
          <h3>Full Official Menu PDFs</h3>
          <a href="assets/menu/BREAKFAST%2520MENU%2520FRONT%2520%252011%2520by%252017%2520inches%25202023-pag.pdf" target="_blank">Breakfast Menu Front (PDF)</a>
          <a href="assets/menu/BREAKFAST%2520MENU%2520BACK%252011%2520by%252017%2520inches%25202023-pages.pdf" target="_blank">Breakfast Menu Back (PDF)</a>
          <a href="assets/menu/DINNER%2520MENU%2520FRONT%2520%252011%2520by%252017%2520inches%25202025.pdf" target="_blank">Lunch & Dinner Menu Front (PDF)</a>
          <a href="assets/menu/DINNER%2520MENU%2520%2520BACK%252011%2520by%252017%2520inches%25202025.pdf" target="_blank">Lunch & Dinner Menu Back (PDF)</a>
        </div>
      </div>
    </section>

    <section id="our-dishes" class="section dish-carousel-section" aria-labelledby="our-dishes-heading">
      <div class="container">
        <h2 id="our-dishes-heading">Our Dishes</h2>
        <p class="muted">Slide through our full lunch lineup — from House Specialties to fresh-off-the-grill favorites.</p>
        <div class="dish-carousel-wrap">
          <button class="dc-arrow dc-prev" aria-label="Previous dish" type="button">&#10094;</button>
          <div class="dish-carousel-track" id="dishCarouselTrack" role="region" aria-roledescription="carousel" aria-label="Beach Bucket dishes">
            ${dishCarouselItems.map((d, i) => `
              <figure class="dish-slide" role="group" aria-roledescription="slide" aria-label="${i+1} of ${dishCarouselItems.length}: ${d.name}">
                <div class="dish-slide-img"><img src="${d.img}" alt="${d.name}" loading="lazy" /></div>
                <figcaption>${d.name}</figcaption>
              </figure>
            `).join('')}
          </div>
          <button class="dc-arrow dc-next" aria-label="Next dish" type="button">&#10095;</button>
        </div>
        <div class="dc-dots" id="dishCarouselDots" aria-hidden="true"></div>
      </div>
    </section>

    <section id="gallery" class="section alt" aria-labelledby="gallery-heading">
      <div class="container">
        <h2 id="gallery-heading" data-i18n="gallery.title">Gallery</h2>
        <p class="muted">Browse by category: Breakfast, Lunch, Drinks, and Atmosphere.</p>

        <div class="gallery-filters" role="tablist" aria-label="Gallery categories">
          <button class="chip is-active" data-filter="all">All</button>
          <button class="chip" data-filter="breakfast">Breakfast</button>
          <button class="chip" data-filter="lunch">Lunch</button>
          <button class="chip" data-filter="drinks">Drinks</button>
          <button class="chip" data-filter="atmosphere">Atmosphere</button>
        </div>

        <div class="gallery-grid" id="galleryGrid">
          ${galleryItems.map(g => `
            <figure class="gallery-card" data-category="${g.category}">
              <button class="gallery-open" data-img="${g.img}" data-name="${g.label}">
                <img src="${g.img}" alt="${g.label}" loading="lazy" />
              </button>
              <figcaption>${g.label}</figcaption>
            </figure>
          `).join('')}
        </div>
      </div>
    </section>

    <section id="giftcards" class="section" aria-labelledby="giftcards-heading">
      <div class="container">
        <h2 id="giftcards-heading" data-i18n="gift.title">Gift Cards</h2>
        <p class="muted">Give the gift of The Beach Bucket. Click the card below to purchase an e-gift card.</p>
        <div class="giftcard-wrap">
          <a class="giftcard-link" href="#" aria-label="Buy Beach Bucket gift card">
            <img src="assets/gift-card.jpg" alt="The Beach Bucket E-Gift Card" loading="lazy" />
          </a>
          <div class="gift-amounts" role="group" aria-label="Gift card amount options">
            <button type="button" class="gift-amount" data-amount="$15">$15</button>
            <button type="button" class="gift-amount" data-amount="$25">$25</button>
            <button type="button" class="gift-amount" data-amount="$50">$50</button>
            <button type="button" class="gift-amount" data-amount="$100">$100</button>
          </div>
          <form class="gift-form" aria-label="Gift card request form">
            <label for="giftName">Recipient Name</label>
            <input id="giftName" type="text" placeholder="Recipient full name" />
            <label for="giftEmail">Recipient Email</label>
            <input id="giftEmail" type="email" placeholder="name@example.com" />
            <label for="giftAmount">Gift Amount</label>
            <select id="giftAmount">
              <option>$15</option>
              <option>$25</option>
              <option>$50</option>
              <option>$100</option>
            </select>
            <button class="btn" type="submit">Continue to Purchase</button>
          </form>
        </div>
      </div>
    </section>

    <section id="faq" class="section alt" aria-labelledby="faq-heading">
      <div class="container">
        <h2 id="faq-heading" data-i18n="nav.faq">Frequently Asked Questions</h2>

        <div class="two-col" style="margin-bottom:1rem;">
          <div>
            <h3 data-i18n="faq.findus">Find Us</h3>
            <p data-i18n="faq.address"><strong>The Beach Bucket</strong><br/>867 South Atlantic Avenue, Ormond Beach, FL 32176</p>
            <iframe
              title="Map to The Beach Bucket"
              src="https://www.google.com/maps?q=867+S+Atlantic+Ave,+Ormond+Beach,+FL+32176&output=embed"
              width="100%"
              height="280"
              style="border:0;border-radius:10px;"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div>
            <h3 data-i18n="faq.parkingTitle">Parking Information</h3>
            <p data-i18n="faq.park1">If you are a <strong>Volusia County resident</strong> and are registered with the county for beach access parking, you may park at the <strong>Harvard ramp at no charge</strong>. For <strong>non-residents of Volusia County</strong>, parking at this location is <strong>$20</strong>.</p>
            <p data-i18n="faq.park2">Additional parking is available in the <strong>Ocean East parking lot</strong> in spaces designated <strong>"Restaurant Patron Parking Only"</strong>, most of which are located along <strong>A1A</strong> within the lot.</p>
            <p data-i18n="faq.park3">If further parking is needed, you may park at <strong>Andy Romano Park</strong> (located on the north side of our property) and walk to our location.</p>
          </div>
        </div>

        <div class="faq-list">
          <details>
            <summary data-i18n="faq.q1">What time does The Beach Bucket open?</summary>
            <p data-i18n="faq.a1">We're open daily from 7:00 AM to 9:00 PM.</p>
          </details>
          <details>
            <summary data-i18n="faq.q2">Do you serve breakfast and lunch?</summary>
            <p data-i18n="faq.a2">Yes. Breakfast is served 7:00 AM to 11:00 AM, and lunch starts at 11:00 AM.</p>
          </details>
          <details>
            <summary data-i18n="faq.q3">Do you have oceanfront patio seating?</summary>
            <p data-i18n="faq.a3">Yes - we offer oceanfront patio seating with a beachside atmosphere and water views.</p>
          </details>
        </div>
      </div>
    </section>

    <section id="contact" class="section">
      <div class="container two-col">
        <div>
          <h2>Visit Us</h2>
          <address>The Beach Bucket<br/>867 South Atlantic Avenue<br/>Ormond Beach, FL 32176</address>
          <p><a href="tel:+13863081134">(386) 308-1134</a></p>
          <p><a href="mailto:info@thebeachbucket.com">info@thebeachbucket.com</a></p>
        </div>
        <form class="contact" aria-label="contact form">
          <h3>Contact Us</h3>
          <label for="name">Name</label><input id="name" type="text" />
          <label for="email">Email</label><input id="email" type="email" />
          <label for="msg">Message</label><textarea id="msg" rows="5"></textarea>
          <button class="btn" type="submit">Send</button>
        </form>
      </div>
    </section>
  </main>

  <footer class="site-footer"><div class="container">Â© <span id='year'></span> The Beach Bucket</div></footer>

  <div class="lightbox" id="lightbox" hidden>
    <div class="lightbox-backdrop" data-close="true"></div>
    <div class="lightbox-panel" role="dialog" aria-modal="true">
      <button class="close-btn" id="closeLightbox" aria-label="Close image preview">Close</button>
      <img id="lightboxImg" alt="Expanded photo" />
    </div>
  </div>
`

document.getElementById('year').textContent = new Date().getFullYear()
document.querySelector('.contact')?.addEventListener('submit', (e) => { e.preventDefault(); alert('Thanks!') })
document.querySelector('.gift-form')?.addEventListener('submit', (e) => {
  e.preventDefault()
  alert('Gift card request captured. Next step: connect this to your payment checkout.')
})
document.querySelectorAll('.gift-amount').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gift-amount').forEach((b) => b.classList.remove('is-active'))
    btn.classList.add('is-active')
    const sel = document.getElementById('giftAmount')
    if (sel) sel.value = btn.dataset.amount
    document.querySelector('.gift-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
})
document.querySelector('.giftcard-link')?.addEventListener('click', (e) => {
  e.preventDefault()
  document.getElementById('giftAmount')?.focus()
})

const heroVideo = document.getElementById('heroVideo')
const muteToggle = document.getElementById('muteToggle')
if (heroVideo && muteToggle) {
  heroVideo.muted = true
  heroVideo.volume = 1
  muteToggle.textContent = 'Unmute'
  muteToggle.setAttribute('aria-pressed', 'true')

  muteToggle.addEventListener('click', () => {
    heroVideo.muted = !heroVideo.muted
    const isMuted = heroVideo.muted
    muteToggle.textContent = isMuted ? 'Unmute' : 'Mute'
    muteToggle.setAttribute('aria-pressed', String(isMuted))
  })
}

const translations = {
  en: {
    'top.hours': 'Every Day 7AM-9PM',
    'nav.home': 'Home', 'nav.menu': 'Menu', 'nav.hours': 'Hours', 'nav.gallery': 'Gallery', 'nav.giftcards': 'Gift Cards', 'nav.faq': 'FAQ', 'nav.contact': 'Contact',
    'intro.title': 'The Beach Bucket',
    'intro.tagline': 'Ormond Beach\'s Only Oceanfront Dining',
    'intro.desc': 'Discover oceanfront breakfast and lunch in Ormond Beach, Florida. Enjoy fresh seafood, beachside drinks, and a relaxed coastal dining experience just steps from the water.',
    'hours.title': 'Hours',
    'hours.everyday': '<strong>Every Day:</strong> 7:00 AM - 9:00 PM',
    'hours.breakfast': '<strong>Breakfast:</strong> 7:00 AM - 11:00 AM',
    'hours.lunch': '<strong>Lunch:</strong> Starts at 11:00 AM',
    'hours.kitchen': '<strong>Kitchen Closes:</strong> 8:30 PM',
    'menu.title': 'Menu', 'gallery.title': 'Gallery', 'gift.title': 'Gift Cards',
    'faq.findus': 'Find Us', 'faq.address': '<strong>The Beach Bucket</strong><br/>867 South Atlantic Avenue, Ormond Beach, FL 32176',
    'faq.parkingTitle': 'Parking Information',
    'faq.park1': 'If you are a <strong>Volusia County resident</strong> and are registered with the county for beach access parking, you may park at the <strong>Harvard ramp at no charge</strong>. For <strong>non-residents of Volusia County</strong>, parking at this location is <strong>$20</strong>.',
    'faq.park2': 'Additional parking is available in the <strong>Ocean East parking lot</strong> in spaces designated <strong>"Restaurant Patron Parking Only"</strong>, most of which are located along <strong>A1A</strong> within the lot.',
    'faq.park3': 'If further parking is needed, you may park at <strong>Andy Romano Park</strong> (located on the north side of our property) and walk to our location.',
    'faq.q1': 'What time does The Beach Bucket open?', 'faq.a1': 'We\'re open daily from 7:00 AM to 9:00 PM.',
    'faq.q2': 'Do you serve breakfast and lunch?', 'faq.a2': 'Yes. Breakfast is served 7:00 AM to 11:00 AM, and lunch starts at 11:00 AM.',
    'faq.q3': 'Do you have oceanfront patio seating?', 'faq.a3': 'Yes - we offer oceanfront patio seating with a beachside atmosphere and water views.',
    'menu.section.Breakfast Omelettes (7:00 AM - 11:00 AM)': 'Breakfast Omelettes (7:00 AM - 11:00 AM)',
    'menu.section.Benedicts': 'Benedicts',
    'menu.section.Egg Dishes': 'Egg Dishes',
    'menu.section.Breakfast Favorites': 'Breakfast Favorites',
    'menu.section.Lunch Favorites': 'Lunch Favorites'
  },
  es: {
    'top.hours': 'Todos los dÃ­as 7AM-9PM',
    'nav.home': 'Inicio', 'nav.menu': 'MenÃº', 'nav.hours': 'Horario', 'nav.gallery': 'GalerÃ­a', 'nav.giftcards': 'Tarjetas', 'nav.faq': 'Preguntas', 'nav.contact': 'Contacto',
    'intro.title': 'The Beach Bucket',
    'intro.tagline': 'El Unico Restaurante Frente al Mar en Ormond Beach',
    'intro.desc': 'Disfruta desayuno y almuerzo frente al mar en Ormond Beach, Florida. Mariscos frescos, bebidas frente al mar y un ambiente relajado a pasos del oceano.',
    'hours.title': 'Horario',
    'hours.everyday': '<strong>Todos los dÃ­as:</strong> 7:00 AM - 9:00 PM',
    'hours.breakfast': '<strong>Desayuno:</strong> 7:00 AM - 11:00 AM',
    'hours.lunch': '<strong>Almuerzo:</strong> Desde las 11:00 AM',
    'hours.kitchen': '<strong>Cocina cierra:</strong> 8:30 PM',
    'menu.title': 'MenÃº', 'gallery.title': 'GalerÃ­a', 'gift.title': 'Tarjetas de Regalo',
    'faq.findus': 'UbicaciÃ³n', 'faq.address': '<strong>The Beach Bucket</strong><br/>867 South Atlantic Avenue, Ormond Beach, FL 32176',
    'faq.parkingTitle': 'InformaciÃ³n de Estacionamiento',
    'faq.park1': 'Si usted es <strong>residente del condado de Volusia</strong> y estÃ¡ registrado con el condado para estacionamiento de acceso a la playa, puede estacionar en la <strong>rampa Harvard sin costo</strong>. Para <strong>no residentes del condado de Volusia</strong>, estacionar allÃ­ cuesta <strong>$20</strong>.',
    'faq.park2': 'Hay estacionamiento adicional en el <strong>lote Ocean East</strong> en espacios marcados <strong>"Restaurant Patron Parking Only"</strong>, la mayorÃ­a ubicados a lo largo de <strong>A1A</strong> dentro del lote.',
    'faq.park3': 'Si necesita mÃ¡s estacionamiento, puede estacionar en <strong>Andy Romano Park</strong> (lado norte de nuestra propiedad) y caminar hasta el restaurante.',
    'faq.q1': 'Â¿A quÃ© hora abre The Beach Bucket?', 'faq.a1': 'Abrimos todos los dÃ­as de 7:00 AM a 9:00 PM.',
    'faq.q2': 'Â¿Sirven desayuno y almuerzo?', 'faq.a2': 'SÃ­. El desayuno se sirve de 7:00 AM a 11:00 AM, y el almuerzo comienza a las 11:00 AM.',
    'faq.q3': 'Â¿Tienen patio frente al mar?', 'faq.a3': 'SÃ­, ofrecemos patio frente al mar con ambiente playero y vista al agua.',
    'menu.section.Breakfast Omelettes (7:00 AM - 11:00 AM)': 'Omelettes de Desayuno (7:00 AM - 11:00 AM)',
    'menu.section.Benedicts': 'Benedictinos',
    'menu.section.Egg Dishes': 'Platos con Huevo',
    'menu.section.Breakfast Favorites': 'Favoritos del Desayuno',
    'menu.section.Lunch Favorites': 'Favoritos del Almuerzo'
  },
  fr: {
    'top.hours': 'Tous les jours 7h-21h',
    'nav.home': 'Accueil', 'nav.menu': 'Menu', 'nav.hours': 'Horaires', 'nav.gallery': 'Galerie', 'nav.giftcards': 'Cartes Cadeaux', 'nav.faq': 'FAQ', 'nav.contact': 'Contact',
    'intro.title': 'The Beach Bucket',
    'intro.tagline': 'Le Seul Restaurant en Bord de Mer a Ormond Beach',
    'intro.desc': 'Profitez du petit-dejeuner et du dejeuner face a l ocean a Ormond Beach, Floride. Fruits de mer frais, boissons en bord de mer et ambiance detendue a deux pas de l eau.',
    'hours.title': 'Horaires',
    'hours.everyday': '<strong>Tous les jours :</strong> 7:00 AM - 9:00 PM',
    'hours.breakfast': '<strong>Petit-dÃ©jeuner :</strong> 7:00 AM - 11:00 AM',
    'hours.lunch': '<strong>DÃ©jeuner :</strong> Ã€ partir de 11:00 AM',
    'hours.kitchen': '<strong>Fermeture cuisine :</strong> 8:30 PM',
    'menu.title': 'Menu', 'gallery.title': 'Galerie', 'gift.title': 'Cartes Cadeaux',
    'faq.findus': 'Nous Trouver', 'faq.address': '<strong>The Beach Bucket</strong><br/>867 South Atlantic Avenue, Ormond Beach, FL 32176',
    'faq.parkingTitle': 'Informations de Stationnement',
    'faq.park1': 'Si vous etes resident du comte de Volusia et enregistre pour le stationnement plage, vous pouvez utiliser la rampe Harvard gratuitement. Pour les non-residents du comte de Volusia, le stationnement est de 20 $.',
    'faq.park2': 'Un stationnement supplÃ©mentaire est disponible dans le <strong>parking Ocean East</strong> dans les places marquÃ©es <strong>"Restaurant Patron Parking Only"</strong>, principalement le long de <strong>A1A</strong>.',
    'faq.park3': 'Si necessaire, vous pouvez vous garer a <strong>Andy Romano Park</strong> (au nord de la propriete) puis marcher jusqu\'au restaurant.',
    'faq.q1': 'Ã€ quelle heure ouvre The Beach Bucket ?', 'faq.a1': 'Nous sommes ouverts tous les jours de 7h00 Ã  21h00.',
    'faq.q2': 'Servez-vous le petit-dÃ©jeuner et le dÃ©jeuner ?', 'faq.a2': 'Oui. Le petit-dÃ©jeuner est servi de 7h00 Ã  11h00 et le dÃ©jeuner commence Ã  11h00.',
    'faq.q3': 'Avez-vous une terrasse en bord de mer ?', 'faq.a3': 'Oui - nous proposons une terrasse en bord de mer avec ambiance plage et vue sur l\'ocean.',
    'menu.section.Breakfast Omelettes (7:00 AM - 11:00 AM)': 'Omelettes du Matin (7h00 - 11h00)',
    'menu.section.Benedicts': 'Benedicts',
    'menu.section.Egg Dishes': 'Plats aux Å’ufs',
    'menu.section.Breakfast Favorites': 'Favoris du Petit-dÃ©jeuner',
    'menu.section.Lunch Favorites': 'Favoris du DÃ©jeuner'
  },
  pt: {
    'top.hours': 'Todos os dias 7h-21h',
    'nav.home': 'InÃ­cio', 'nav.menu': 'CardÃ¡pio', 'nav.hours': 'HorÃ¡rios', 'nav.gallery': 'Galeria', 'nav.giftcards': 'Gift Cards', 'nav.faq': 'FAQ', 'nav.contact': 'Contato',
    'intro.title': 'The Beach Bucket',
    'intro.tagline': 'O Unico Restaurante a Beira-Mar em Ormond Beach',
    'intro.desc': 'Aproveite cafe da manha e almoco a beira-mar em Ormond Beach, Florida. Frutos do mar frescos, bebidas a beira-mar e um clima relaxante a poucos passos da agua.',
    'hours.title': 'HorÃ¡rios',
    'hours.everyday': '<strong>Todos os dias:</strong> 7:00 AM - 9:00 PM',
    'hours.breakfast': '<strong>CafÃ© da manhÃ£:</strong> 7:00 AM - 11:00 AM',
    'hours.lunch': '<strong>AlmoÃ§o:</strong> A partir de 11:00 AM',
    'hours.kitchen': '<strong>Cozinha fecha:</strong> 8:30 PM',
    'menu.title': 'CardÃ¡pio', 'gallery.title': 'Galeria', 'gift.title': 'Gift Cards',
    'faq.findus': 'Encontre-nos', 'faq.address': '<strong>The Beach Bucket</strong><br/>867 South Atlantic Avenue, Ormond Beach, FL 32176',
    'faq.parkingTitle': 'InformaÃ§Ãµes de Estacionamento',
    'faq.park1': 'Se vocÃª Ã© <strong>residente do condado de Volusia</strong> e estÃ¡ registrado para estacionamento de acesso Ã  praia, pode estacionar na <strong>rampa Harvard sem custo</strong>. Para <strong>nÃ£o residentes do condado de Volusia</strong>, o valor Ã© <strong>$20</strong>.',
    'faq.park2': 'Estacionamento adicional estÃ¡ disponÃ­vel no <strong>Ocean East parking lot</strong> em vagas marcadas <strong>"Restaurant Patron Parking Only"</strong>, a maioria ao longo da <strong>A1A</strong>.',
    'faq.park3': 'Se precisar de mais estacionamento, vocÃª pode parar no <strong>Andy Romano Park</strong> (lado norte da propriedade) e caminhar atÃ© o restaurante.',
    'faq.q1': 'Que horas o The Beach Bucket abre?', 'faq.a1': 'Estamos abertos todos os dias das 7:00 AM Ã s 9:00 PM.',
    'faq.q2': 'VocÃªs servem cafÃ© da manhÃ£ e almoÃ§o?', 'faq.a2': 'Sim. CafÃ© da manhÃ£ das 7:00 AM Ã s 11:00 AM, e almoÃ§o a partir das 11:00 AM.',
    'faq.q3': 'VocÃªs tÃªm pÃ¡tio Ã  beira-mar?', 'faq.a3': 'Sim - temos pÃ¡tio Ã  beira-mar com clima de praia e vista para a Ã¡gua.',
    'menu.section.Breakfast Omelettes (7:00 AM - 11:00 AM)': 'Omeletes do CafÃ© da ManhÃ£ (7h00 - 11h00)',
    'menu.section.Benedicts': 'Benedicts',
    'menu.section.Egg Dishes': 'Pratos com Ovos',
    'menu.section.Breakfast Favorites': 'Favoritos do CafÃ© da ManhÃ£',
    'menu.section.Lunch Favorites': 'Favoritos do AlmoÃ§o'
  }
}

const menuTranslations = {
  es: {
    names: [
      'Omelette de Mariscos','Omelette Suizo con Tocino y ChampiÃ±ones','Omelette Ormond','Omelette CarnÃ­voro','Omelette de Queso','Omelette de Chorizo','Omelette Vegetal',
      'Benedictino (ClÃ¡sico/Chorizo)','Benedictino de Cangrejo Azul',
      'Combo Early Bird','The Sunrise','Biscuits con Gravy','The Big Beach','SÃ¡ndwich de Desayuno','Healthy Surfer',
      'Tres Rebanadas de French Toast','Combo de French Toast',
      'CamarÃ³n para Pelar (1/2 lb / 1 lb)','BuÃ±uelos de Caracol','Calamares Fritos','Dip de Pescado Ahumado','Alitas','Camarones Buffalo','Tortitas de Cangrejo','Nachos de Cerdo',
      'SÃ¡ndwich de Pollo Key West','Tuna Melt (Especial de la Casa)','Panini de CamarÃ³n y Tocino','Tacos de CamarÃ³n (Especial de la Casa)','Tacos de Pescado (Especial de la Casa)','Hamburguesa Bucket','Fish & Chips','Camarones Fritos','SÃ¡ndwich de Pescado Bucket'
    ],
    descs: [
      'Carne de cangrejo azul y camarones, cubierto con salsa holandesa.','Tocino, champiÃ±ones y queso suizo.','JamÃ³n, cebolla y pimientos verdes/rojos. Agrega queso +$1.99.','Salchicha, tocino, jamÃ³n y queso cheddar.','Queso americano, suizo, provolone o cheddar.','Pimientos, provolone, chorizo y salsa dulce de chile.','Tomate, cebolla, champiÃ±ones, pimientos y cheddar.',
      'Pan muffin inglÃ©s, huevos pochados y holandesa.','Especial de la casa con cangrejo azul.',
      'Dos huevos + tocino/salchicha.','Dos huevos + jamÃ³n en loncha gruesa.','Dos huevos + biscuit partido con gravy.','Dos huevos, dos tiras de tocino y dos salchichas.','Dos huevos, pan tostado, tocino/salchicha/chorizo y papas caseras.','Claras revueltas, rodajas de tomate, fruta y muffin inglÃ©s.',
      'Espolvoreado con azÃºcar en polvo y jarabe de caramelo.','French toast + un huevo + tocino o salchicha.',
      'Camarones al vapor con cÃ¡scara y condimento.','Servidos con salsa remoulade.','Servidos con marinara o remoulade.','Wahoo y mahi ahumado con chips de tortilla.','Bucket, buffalo, teriyaki, mantequilla de ajo o BBQ.','Camarones empanizados en salsa buffalo.','Cangrejo en trozos, dorados a la plancha con remoulade.','Cerdo desmenuzado, queso, tomate, cebolla, salsa y crema agria.',
      'Pollo a la parrilla con sazÃ³n estilo Key West.','Ensalada de atÃºn, cheddar y pan parmesano sourdough.','Salsa Bucket dulce/picante, tocino y cheddar.','CamarÃ³n a la parrilla/ennegrecido/frito, salsa y aioli de cilantro.','Pescado blanco a la parrilla/ennegrecido/frito, salsa y aioli.','Hamburguesa sazonada de 1/2 lb con lechuga, tomate, cebolla y pepinillos.','Pescado blanco frito con tÃ¡rtara y vinagre de malta.','Camarones grandes empanizados, salsa cÃ³ctel o tÃ¡rtara.','Pescado a la parrilla/ennegrecido/frito con lechuga, tomate y tÃ¡rtara.'
    ]
  }
}

function translateLite(lang, text) {
  if (lang === 'en') return text
  const maps = {
    es: [['Breakfast','Desayuno'],['Lunch','Almuerzo'],['Dinner','Cena'],['Seafood','Mariscos'],['Shrimp','CamarÃ³n'],['Fish','Pescado'],['Chicken','Pollo'],['Cheese','Queso'],['Egg','Huevo'],['Eggs','Huevos'],['Grilled','A la parrilla'],['Fried','Frito'],['Served','Servido'],['with','con'],['and','y'],['Sauce','Salsa'],['Sandwich','SÃ¡ndwich'],['Salad','Ensalada'],['Fries','Papas fritas'],['Mushroom','Hongo'],['Bacon','Tocino']],
    fr: [['Breakfast','Petit-dÃ©jeuner'],['Lunch','DÃ©jeuner'],['Dinner','DÃ®ner'],['Seafood','Fruits de mer'],['Shrimp','Crevette'],['Fish','Poisson'],['Chicken','Poulet'],['Cheese','Fromage'],['Egg','Å’uf'],['Eggs','Å’ufs'],['Grilled','GrillÃ©'],['Fried','Frit'],['Served','Servi'],['with','avec'],['and','et'],['Sauce','Sauce'],['Sandwich','Sandwich'],['Salad','Salade'],['Fries','Frites'],['Mushroom','Champignon'],['Bacon','Bacon']],
    pt: [['Breakfast','CafÃ© da manhÃ£'],['Lunch','AlmoÃ§o'],['Dinner','Jantar'],['Seafood','Frutos do mar'],['Shrimp','CamarÃ£o'],['Fish','Peixe'],['Chicken','Frango'],['Cheese','Queijo'],['Egg','Ovo'],['Eggs','Ovos'],['Grilled','Grelhado'],['Fried','Frito'],['Served','Servido'],['with','com'],['and','e'],['Sauce','Molho'],['Sandwich','SanduÃ­che'],['Salad','Salada'],['Fries','Batatas fritas'],['Mushroom','Cogumelo'],['Bacon','Bacon']]
  }
  let out = text
  ;(maps[lang] || []).forEach(([from, to]) => {
    out = out.replace(new RegExp(`\\b${from}\\b`, 'g'), to)
  })
  return out
}

const translationCache = new Map()
async function translateRemote(lang, text) {
  if (!text || lang === 'en') return text
  const key = `${lang}::${text}`
  if (translationCache.has(key)) return translationCache.get(key)
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`
    const res = await fetch(url)
    const data = await res.json()
    const out = (data?.[0] || []).map(part => part?.[0] || '').join('') || text
    translationCache.set(key, out)
    return out
  } catch {
    return text
  }
}

async function applyLanguage(lang) {
  const t = translations[lang] || translations.en
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n
    if (!t[key]) return
    if (key.startsWith('hours.') || key.startsWith('faq.')) el.innerHTML = t[key]
    else el.textContent = t[key]
  })

  const nameEls = [...document.querySelectorAll('[data-menu-name]')]
  const descEls = [...document.querySelectorAll('[data-menu-desc]')]

  await Promise.all(nameEls.map(async (el) => {
    const i = Number(el.dataset.menuName)
    const local = menuTranslations[lang]?.names?.[i]
    el.textContent = local || (lang === 'en' ? menuNamesEn[i] : await translateRemote(lang, menuNamesEn[i]))
  }))

  await Promise.all(descEls.map(async (el) => {
    const i = Number(el.dataset.menuDesc)
    const local = menuTranslations[lang]?.descs?.[i]
    el.textContent = local || (lang === 'en' ? menuDescsEn[i] : await translateRemote(lang, menuDescsEn[i]))
  }))

  const sectionEls = [...document.querySelectorAll('.menu-section-title[data-i18n^="menu.section."]')]
  await Promise.all(sectionEls.map(async (el) => {
    const key = el.dataset.i18n
    const enTitle = key.replace('menu.section.', '')
    el.textContent = t[key] || (lang === 'en' ? enTitle : await translateRemote(lang, enTitle))
  }))
}

const langSelect = document.getElementById('langSelect')
langSelect?.addEventListener('change', async (e) => applyLanguage(e.target.value))
applyLanguage('en')

// === Dish Carousel: prev/next buttons + dot indicators ===
const dcTrack = document.getElementById('dishCarouselTrack')
const dcDots = document.getElementById('dishCarouselDots')
if (dcTrack) {
  const slides = [...dcTrack.querySelectorAll('.dish-slide')]
  const prevBtn = document.querySelector('.dc-prev')
  const nextBtn = document.querySelector('.dc-next')
  // Build dots
  slides.forEach((_, i) => {
    const b = document.createElement('button')
    b.className = 'dc-dot'
    b.type = 'button'
    b.setAttribute('aria-label', `Go to dish ${i + 1}`)
    b.addEventListener('click', () => { slides[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' }) })
    dcDots.appendChild(b)
  })
  const dots = [...dcDots.children]
  const slideStep = () => {
    const first = slides[0]
    const second = slides[1]
    return second ? (second.getBoundingClientRect().left - first.getBoundingClientRect().left) : first.getBoundingClientRect().width
  }
  prevBtn?.addEventListener('click', () => dcTrack.scrollBy({ left: -slideStep() * 2, behavior: 'smooth' }))
  nextBtn?.addEventListener('click', () => dcTrack.scrollBy({ left:  slideStep() * 2, behavior: 'smooth' }))
  // Active-dot tracker
  const updateActive = () => {
    const scrollLeft = dcTrack.scrollLeft
    const step = slideStep()
    const idx = Math.min(slides.length - 1, Math.max(0, Math.round(scrollLeft / step)))
    dots.forEach((d, i) => d.classList.toggle('is-active', i === idx))
  }
  dcTrack.addEventListener('scroll', updateActive, { passive: true })
  updateActive()
}

// subtle futuristic motion: reveal-on-scroll
const revealTargets = document.querySelectorAll('.menu-section, .item-row, .gallery-card, .dish-slide, .feature-grid article, .pdf-links, .contact')
revealTargets.forEach(el => el.classList.add('reveal'))
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
      io.unobserve(entry.target)
    }
  })
}, { threshold: 0.08 })
revealTargets.forEach(el => io.observe(el))

const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightboxImg')
const closeLightbox = document.getElementById('closeLightbox')

document.querySelectorAll('.item-thumb-btn, .gallery-open').forEach((btn) => {
  btn.addEventListener('click', () => {
    lightboxImg.src = btn.dataset.img
    lightboxImg.alt = btn.dataset.name
    lightbox.hidden = false
    closeLightbox.focus()
  })
})

const chips = document.querySelectorAll('.chip')
const cards = document.querySelectorAll('.gallery-card')
chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('is-active'))
    chip.classList.add('is-active')
    const filter = chip.dataset.filter
    cards.forEach((card) => {
      card.style.display = filter === 'all' || card.dataset.category === filter ? '' : 'none'
    })
  })
})

closeLightbox.addEventListener('click', () => (lightbox.hidden = true))
lightbox.addEventListener('click', (e) => { if (e.target.dataset.close === 'true') lightbox.hidden = true })

// Mobile hamburger menu
const navToggle = document.getElementById('navToggle')
const siteHeader = document.querySelector('.site-header')
const primaryNav = document.getElementById('primaryNav')
function setNav(open) {
  siteHeader?.classList.toggle('nav-open', open)
  navToggle?.setAttribute('aria-expanded', String(open))
  navToggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  if (primaryNav) {
    primaryNav.style.opacity = open ? '1' : '0'
    primaryNav.style.visibility = open ? 'visible' : 'hidden'
    primaryNav.style.transform = open ? 'none' : 'translateY(-10px)'
    primaryNav.style.pointerEvents = open ? 'auto' : 'none'
  }
}
if (navToggle && siteHeader) {
  navToggle.addEventListener('click', () => setNav(!siteHeader.classList.contains('nav-open')))
  siteHeader.querySelectorAll('.nav-list a').forEach((a) => a.addEventListener('click', () => setNav(false)))
}

// Signature Dishes auto-cycle (America/New_York):
//   7:00 AM – 11:00 AM  → Breakfast 9
//   11:01 AM – 9:00 PM  → Lunch & Dinner 9
//   9:01 PM – 6:59 AM   → Breakfast 9 (closed-hours default)
function timeMode() {
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date())
    const h = parseInt(parts.find(p => p.type === 'hour').value, 10)
    const m = parseInt(parts.find(p => p.type === 'minute').value, 10)
    const mins = h * 60 + m
    if (mins >= 7 * 60 && mins <= 11 * 60) return 'breakfast'
    if (mins > 11 * 60 && mins <= 21 * 60) return 'lunch'
    return 'breakfast'
  } catch { return 'breakfast' }
}
function showSignatures(mode) {
  const lunch = document.getElementById('sigLunch')
  const bfast = document.getElementById('sigBreakfast')
  const label = document.getElementById('sig-label')
  if (!lunch || !bfast) return
  if (mode === 'breakfast') { lunch.hidden = true; bfast.hidden = false; if (label) label.textContent = 'Breakfast' }
  else { lunch.hidden = false; bfast.hidden = true; if (label) label.textContent = 'Lunch & Dinner' }
}
showSignatures(timeMode())
setInterval(() => showSignatures(timeMode()), 60 * 1000)

// Signature Dishes slideshow (mobile ≤640px): auto-advance every 4.5s, swipe-to-pause, dots
;(function initSigSlideshow() {
  const mq = window.matchMedia('(max-width: 640px)')
  const SLIDE_MS = 2500
  const PAUSE_MS = 7000
  let timer = null, pauseUntil = 0
  function setup() {
    document.querySelectorAll('.menu-feature').forEach((grid) => {
      if (grid.dataset.slideshowReady) return
      grid.dataset.slideshowReady = '1'
      const dots = document.createElement('div')
      dots.className = 'sig-dots'
      ;[...grid.children].forEach((_, i) => {
        const d = document.createElement('button')
        d.type = 'button'
        d.className = 'sig-dot'
        d.setAttribute('aria-label', 'Go to dish ' + (i + 1))
        d.addEventListener('click', () => {
          pauseUntil = Date.now() + PAUSE_MS
          grid.scrollTo({ left: grid.children[i].offsetLeft - grid.offsetLeft, behavior: 'smooth' })
        })
        dots.appendChild(d)
      })
      grid.insertAdjacentElement('afterend', dots)
      grid.addEventListener('scroll', () => updateDots(grid), { passive: true })
      grid.addEventListener('touchstart', () => { pauseUntil = Date.now() + PAUSE_MS }, { passive: true })
      grid.addEventListener('mousedown', () => { pauseUntil = Date.now() + PAUSE_MS })
      updateDots(grid)
    })
  }
  function updateDots(grid) {
    const dots = grid.nextElementSibling
    if (!dots || !dots.classList.contains('sig-dots')) return
    const cw = grid.children[0]?.offsetWidth || 1
    const idx = Math.round(grid.scrollLeft / cw)
    dots.querySelectorAll('.sig-dot').forEach((d, i) => d.classList.toggle('on', i === idx))
  }
  function tick() {
    if (!mq.matches) return
    if (Date.now() < pauseUntil) return
    document.querySelectorAll('.menu-feature:not([hidden])').forEach((grid) => {
      const cw = grid.children[0]?.offsetWidth || 1
      const maxIdx = grid.children.length - 1
      const curIdx = Math.round(grid.scrollLeft / cw)
      const nextIdx = curIdx >= maxIdx ? 0 : curIdx + 1
      grid.scrollTo({ left: grid.children[nextIdx].offsetLeft - grid.offsetLeft, behavior: 'smooth' })
    })
  }
  setup()
  // Re-setup after the time-of-day swap may have toggled visibility
  setInterval(setup, 5 * 1000)
  if (timer) clearInterval(timer)
  timer = setInterval(tick, SLIDE_MS)
})()



