import './style.css'

const BASE_URL = import.meta.env.BASE_URL || '/'
const withBase = (url = '') => {
  const normalized = String(url).replace(/%2520/g, '%20')
  if (!normalized.startsWith('/assets/')) return normalized
  return `${BASE_URL}${normalized.replace(/^\//, '')}`
}

const rewriteAssetPaths = (root = document) => {
  const nodes = root.querySelectorAll('[src],[href],[poster],[data-img]')
  nodes.forEach((el) => {
    ;['src', 'href', 'poster', 'data-img'].forEach((attr) => {
      const v = el.getAttribute(attr)
      if (!v) return
      const next = withBase(v)
      if (next !== v) el.setAttribute(attr, next)
    })
  })
}

const itemImagePool = [
  '/assets/facebook/all/1015235283944365.jpg',
  '/assets/facebook/all/1022110573256836.jpg',
  '/assets/facebook/all/1023028749831685.jpg',
  '/assets/facebook/all/1013958157405411.jpg',
  '/assets/facebook/all/1013949587406268.jpg',
  '/assets/facebook/all/1020445076756719.jpg',
  '/assets/facebook/all/1008387387962488.jpg',
  '/assets/facebook/all/1019508686850358.jpg'
]

const galleryItems = [
  { category: 'breakfast', label: 'Seafood Omelet Style', img: '/assets/facebook/all/1022110573256836.jpg' },
  { category: 'breakfast', label: 'Morning Brunch Favorite', img: '/assets/facebook/all/1013958157405411.jpg' },
  { category: 'lunch', label: 'Fresh Lunch Plate', img: '/assets/facebook/all/1015235283944365.jpg' },
  { category: 'lunch', label: 'Coastal Seafood Lunch', img: '/assets/facebook/all/1013949587406268.jpg' },
  { category: 'drinks', label: 'Signature Beach Cocktail', img: '/assets/facebook/all/1020445076756719.jpg' },
  { category: 'drinks', label: 'Bar Feature Drink', img: '/assets/facebook/all/1008387387962488.jpg' },
  { category: 'atmosphere', label: 'Sunset Patio Vibe', img: '/assets/atmosphere-sunset-1.jpg' },
  { category: 'atmosphere', label: 'Guests & Oceanfront Seating', img: '/assets/atmosphere-sunset-2.jpg' }
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
      ['CHORIZO', '$13.99', 'Toasted English muffin topped with spicy chorizo patties, poached eggs, and creamy hollandaise.'],
      ['CLASSIC', '$13.99', 'Smoky Canadian bacon, poached eggs, and rich hollandaise on a toasted English muffin.'],
      ['BLUE SWIMMING CRAB (House Specialty)', '$16.29', 'Coastal benedict topped with blue swimming crabmeat, poached eggs, and creamy hollandaise.']
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

galleryItems.forEach((item) => {
  item.img = withBase(item.img)
})

let menuImageCounter = 0
const nextImage = () => withBase(itemImagePool[(menuImageCounter++) % itemImagePool.length])

const featuredItemImages = {
  'Smoked Fish Dip': withBase('/assets/menu/smoked-fish-dip.jpg'),
  'Conch Fritters': withBase('/assets/menu/conch-fritters.jpg')
}

const menuNamesEn = menuSections.flatMap(s => s.items.map(i => i[0]))
const menuDescsEn = menuSections.flatMap(s => s.items.map(i => i[2]))

let menuIdx = 0
const sectionsHtml = menuSections.map((section) => {
  const items = section.items.map((item) => {
    const img = featuredItemImages[item[0]] || nextImage()
    const idx = menuIdx++
    return `
      <li class="item-row">
        <button class="item-thumb-btn" data-img="${img}" data-name="${item[0]}" aria-label="Open image for ${item[0]}">
          <img src="${img}" alt="${item[0]}" loading="lazy" />
        </button>
        <div class="item-body">
          <div class="item-head">
            <span class="item-name" data-menu-name="${idx}">${item[0]}</span>
            <span class="item-price">${item[1]}</span>
          </div>
          <p data-menu-desc="${idx}">${item[2]}</p>
        </div>
      </li>`
  }).join('')

  return `
    <div class="menu-section">
      <h3 class="menu-section-title" data-i18n="menu.section.${section.title}">${section.title}</h3>
      <ul class="item-list">${items}</ul>
    </div>`
}).join('')

document.querySelector('#app').innerHTML = `
  <a class="skip-link" href="#main-content">Skip to main content</a>

  <header class="site-header" role="banner">
    <div class="top-strip" aria-label="Social and quick links">
      <div class="container top-strip-inner">
        <div class="social-links" aria-label="Social media links">
          <a class="social-icon social-fb" href="https://www.facebook.com/beachbucketob/" target="_blank" rel="noopener noreferrer" aria-label="Beach Bucket on Facebook">
            <img src="https://cdn.simpleicons.org/facebook/1877F2" alt="" aria-hidden="true" />
          </a>
          <a class="social-icon social-ig" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Beach Bucket on Instagram">
            <img src="https://cdn.simpleicons.org/instagram/E4405F" alt="" aria-hidden="true" />
          </a>
          <a class="social-icon social-tk" href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="Beach Bucket on TikTok">
            <img src="https://cdn.simpleicons.org/tiktok/25F4EE" alt="" aria-hidden="true" />
          </a>
          <a class="social-icon social-x" href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="Beach Bucket on X">
            <img src="https://cdn.simpleicons.org/x/FFFFFF" alt="" aria-hidden="true" />
          </a>
        </div>
        <div class="quick-links">
          <a class="quick-pill quick-hours" href="#hours" data-i18n="top.hours">Every Day 7AM-9PM</a>
          <a class="quick-pill quick-contact" href="#contact" data-i18n="nav.contact">Contact</a>
          <label for="langSelect" class="sr-only">Language</label>
          <select id="langSelect" aria-label="Select language">
            <option value="en">English</option>
            <option value="es">EspaÃ±ol</option>
            <option value="fr">FranÃ§ais</option>
            <option value="pt">PortuguÃªs</option>
          </select>
        </div>
      </div>
    </div>
    <div class="container header-inner">
      <a class="brand" href="#" aria-label="The Beach Bucket home">
        <img class="brand-logo-full" src="/assets/beachbucket-logo-full.jpg" alt="The Beach Bucket Bar and Grill logo" />
      </a>
      <nav aria-label="Main navigation">
        <ul class="nav-list">
          <li><a href="#main-content" aria-current="page" data-i18n="nav.home">Home</a></li>
          <li><a href="#menu" data-i18n="nav.menu">Menu</a></li>
          <li><a href="#hours" data-i18n="nav.hours">Hours</a></li>
          <li><a href="#gallery" data-i18n="nav.gallery">Gallery</a></li>
          <li><a href="#giftcards" data-i18n="nav.giftcards">Gift Cards</a></li>
          <li><a href="#faq" data-i18n="nav.faq">FAQ</a></li>
          <li><a href="#contact" data-i18n="nav.contact">Contact</a></li>
        </ul>
      </nav>
      <a class="btn btn-small" href="https://order.online/business/The%20Beach%20Bucket-185350" target="_blank" rel="noopener noreferrer">Order Online</a>
    </div>
  </header>

  <section class="hero" aria-label="Beach Bucket restaurant hero video">
    <img class="hero-side-logo hero-side-left" src="/assets/logo-bird-left.jpg" alt="Beach Bucket bird logo" />
    <video id="heroVideo" class="hero-bg" autoplay loop playsinline preload="metadata" poster="/assets/hero-beachbucket-premium.jpg" aria-label="Oceanfront view at The Beach Bucket">
      <source src="/assets/hero-video.mp4" type="video/mp4" />
    </video>
    <img class="hero-side-logo hero-side-right" src="/assets/logo-shark-right.jpg" alt="Beach Bucket shark logo" />
    <button id="muteToggle" class="mute-toggle" type="button" aria-pressed="false">Mute</button>
  </section>

  <nav class="mobile-quick-actions" aria-label="Quick actions">
    <a href="tel:+13863081134" class="qa-btn qa-call" aria-label="Call The Beach Bucket">Call</a>
    <a href="https://maps.google.com/?q=867+South+Atlantic+Avenue+Ormond+Beach+FL+32176" target="_blank" rel="noopener noreferrer" class="qa-btn qa-map" aria-label="Open directions to The Beach Bucket">Directions</a>
    <a href="https://order.online/business/The%20Beach%20Bucket-185350" target="_blank" rel="noopener noreferrer" class="qa-btn qa-order" aria-label="Order online from The Beach Bucket">Order</a>
  </nav>

  <main id="main-content" tabindex="-1">
    <section class="section intro"><div class="container"><h2 class="intro-subtitle" data-i18n="intro.title">The Beach Bucket</h2><p class="intro-tagline" data-i18n="intro.tagline">Ormond Beach's Only Oceanfront Dining</p><p class="intro-lead" data-i18n="intro.desc">Discover oceanfront breakfast and lunch in Ormond Beach, Florida. Enjoy fresh seafood, beachside drinks, and a relaxed coastal dining experience just steps from the water.</p></div></section>

    <section class="escape-tabs" aria-label="Explore sections quickly">
      <div class="container escape-tabs-grid" role="navigation" aria-label="Quick explore">
        <a class="escape-tab" href="#menu">Breakfast</a>
        <a class="escape-tab" href="#menu">Starters</a>
        <a class="escape-tab" href="#gallery">Oceanfront Patio</a>
        <a class="escape-tab" href="#gallery">Atmosphere</a>
        <a class="escape-tab" href="#contact">Location</a>
      </div>
    </section>

    <section id="hours" class="feature-band">
      <div class="container feature-grid one">
        <article class="hours-card" aria-label="Hours and location preview">
          <div class="hours-layout">
            <div class="hours-left">
              <h2 data-i18n="hours.title">Hours</h2>
              <p data-i18n="hours.everyday"><strong>Every Day:</strong> 7:00 AM - 9:00 PM</p>
              <p data-i18n="hours.breakfast"><strong>Breakfast:</strong> 7:00 AM - 11:00 AM</p>
              <p data-i18n="hours.lunch"><strong>Lunch:</strong> Starts at 11:00 AM</p>
              <p data-i18n="hours.kitchen"><strong>Kitchen Closes:</strong> 8:30 PM</p>
            </div>
            <div class="hours-right" aria-label="Aerial map preview of restaurant location">
              <h3>Find Us Fast</h3>
              <p>867 South Atlantic Avenue, Ormond Beach, FL 32176</p>
              <div class="map-frame-wrap">
                <iframe
                  title="3D-style aerial map of The Beach Bucket location"
                  src="https://www.google.com/maps?q=The+Beach+Bucket+867+S+Atlantic+Ave+Ormond+Beach+FL+32176&t=k&z=19&output=embed"
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"></iframe>
                <div class="map-guide" aria-hidden="true">
                  <div class="guide-chip chip-entrance">Beach Bucket Entrance</div>
                  <svg class="guide-arrow" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                      <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                        <path d="M0,0 L8,4 L0,8 z" fill="#ffd74a" />
                      </marker>
                    </defs>
                    <line x1="86" y1="16" x2="53" y2="50" marker-end="url(#arrowHead)" />
                  </svg>
                  <div class="target-ring"></div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section id="menu" class="section" aria-labelledby="menu-heading">
      <div class="container">
        <h2 id="menu-heading" data-i18n="menu.title">Menu</h2>
        <p class="muted">Every menu item has a left thumbnail. Click it to expand, then close and continue.</p>
        ${sectionsHtml}

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
          <a href="/assets/menu/BREAKFAST%2520MENU%2520FRONT%2520%252011%2520by%252017%2520inches%25202023-pag.pdf" target="_blank">Breakfast Menu Front (PDF)</a>
          <a href="/assets/menu/BREAKFAST%2520MENU%2520BACK%252011%2520by%252017%2520inches%25202023-pages.pdf" target="_blank">Breakfast Menu Back (PDF)</a>
          <a href="/assets/menu/DINNER%2520MENU%2520FRONT%2520%252011%2520by%252017%2520inches%25202025.pdf" target="_blank">Lunch & Dinner Menu Front (PDF)</a>
          <a href="/assets/menu/DINNER%2520MENU%2520%2520BACK%252011%2520by%252017%2520inches%25202025.pdf" target="_blank">Lunch & Dinner Menu Back (PDF)</a>
        </div>
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
            <img src="/assets/gift-card.jpg" alt="The Beach Bucket E-Gift Card" loading="lazy" />
          </a>
          <div class="gift-amounts" aria-label="Gift card amount options">
            <span>$15</span>
            <span>$25</span>
            <span>$50</span>
            <span>$100</span>
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

rewriteAssetPaths(document.getElementById('app'))

document.getElementById('year').textContent = new Date().getFullYear()
document.querySelector('.contact')?.addEventListener('submit', (e) => { e.preventDefault(); alert('Thanks!') })
document.querySelector('.gift-form')?.addEventListener('submit', (e) => {
  e.preventDefault()
  alert('Gift card request captured. Next step: connect this to your payment checkout.')
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

// subtle futuristic motion: reveal-on-scroll
const revealTargets = document.querySelectorAll('.menu-section, .item-row, .gallery-card, .feature-grid article, .pdf-links, .contact')
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



