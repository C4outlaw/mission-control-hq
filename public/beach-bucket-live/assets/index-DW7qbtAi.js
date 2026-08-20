(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(n){if(n.ep)return;n.ep=!0;const i=t(n);fetch(n.href,i)}})();const R="/mission-control-hq/",a=(e="")=>{const s=String(e).replace(/%2520/g,"%20");return s.startsWith("/assets/")?`${R}${s.replace(/^\//,"")}`:s},N=(e=document)=>{e.querySelectorAll("[src],[href],[poster],[data-img]").forEach(t=>{["src","href","poster","data-img"].forEach(l=>{const n=t.getAttribute(l);if(!n)return;const i=a(n);i!==n&&t.setAttribute(l,i)})})},C=["/assets/facebook/all/1015235283944365.jpg","/assets/facebook/all/1022110573256836.jpg","/assets/facebook/all/1023028749831685.jpg","/assets/facebook/all/1013958157405411.jpg","/assets/facebook/all/1013949587406268.jpg","/assets/facebook/all/1020445076756719.jpg","/assets/facebook/all/1008387387962488.jpg","/assets/facebook/all/1019508686850358.jpg"],A=[{name:"Bucket Burger",img:"/assets/dishes/lunch-cards/Bucket Burger.png"},{name:"Buffalo Shrimp",img:"/assets/dishes/lunch-cards/Buffalo Shrimp.png"},{name:"Fried Calamari",img:"/assets/dishes/lunch-cards/Fried Calamari.png"},{name:"Loaded Chicken Panini",img:"/assets/dishes/lunch-cards/Loaded Chicken Panini.png"},{name:"Chicken Tenders",img:"/assets/dishes/lunch-cards/Chicken Tenders.png"},{name:"Wings",img:"/assets/dishes/lunch-cards/Wings.png"},{name:"Conch Fritters",img:"/assets/dishes/lunch-cards/Conch Fritters.png"},{name:"Corn Nuggets",img:"/assets/dishes/lunch-cards/Corn Nuggets.png"},{name:"Crab Cakes",img:"/assets/dishes/lunch-cards/Crab Cakes.png"},{name:"Smoked Fish Dip",img:"/assets/dishes/lunch-cards/Smoked Fish Dip.png"},{name:"Fried Shrimp",img:"/assets/dishes/lunch-cards/Fried Shrimp.png"},{name:"Key West Chicken",img:"/assets/dishes/lunch-cards/Key West Chicken.png"},{name:"Mahi Sandwich",img:"/assets/dishes/lunch-cards/Mahi Sandwich.png"},{name:"Mahi Tacos",img:"/assets/dishes/lunch-cards/Mahi Tacos.png"},{name:"Mozzarella Sticks",img:"/assets/dishes/lunch-cards/Mozzarella Sticks.png"},{name:"Onion Rings",img:"/assets/dishes/lunch-cards/Onion Rings.png"},{name:"Pulled Pork Tacos",img:"/assets/dishes/lunch-cards/Pulled Pork Tacos.png"},{name:"Shrimp & Bacon Panini",img:"/assets/dishes/lunch-cards/Shrimp & Bacon Panini.png"},{name:"Caesar Salad",img:"/assets/dishes/lunch-cards/Caesar Salad.png"},{name:"House Salad",img:"/assets/dishes/lunch-cards/House Salad.png"},{name:"Steak Panini",img:"/assets/dishes/lunch-cards/Steak Panini.png"},{name:"Tuna Melt",img:"/assets/dishes/lunch-cards/Tuna Melt.png"},{name:"Ahi Tuna Wrap",img:"/assets/dishes/lunch-cards/Ahi Tuna Wrap.png"},{name:"Shrimp Tacos",img:"/assets/dishes/lunch-cards/Shrimp Tacos.png"}],T=[{name:"Monday Specials",img:"/assets/dishes/drinks-cards/Monday.png"},{name:"Tuesday Specials",img:"/assets/dishes/drinks-cards/Tuesday.png"},{name:"Wednesday Specials",img:"/assets/dishes/drinks-cards/Wednesday.png"},{name:"Thursday Specials",img:"/assets/dishes/drinks-cards/Thursday.png"},{name:"Friday Specials",img:"/assets/dishes/drinks-cards/Friday.png"},{name:"Saturday Specials",img:"/assets/dishes/drinks-cards/Saturday.png"},{name:"Sunday Specials",img:"/assets/dishes/drinks-cards/Sunday.png"},{name:"Cucumber Cooler",img:"/assets/dishes/drinks-cards/Cucumber Cooler.png"},{name:"Orange Crush",img:"/assets/dishes/drinks-cards/Orange Crush.png"},{name:"Cherry Lemonade",img:"/assets/dishes/drinks-cards/Cherry Lemonade.png"},{name:"Raspberry Lemonade",img:"/assets/dishes/drinks-cards/Rapsberry Lemonade.png"},{name:"Grape Pop",img:"/assets/dishes/drinks-cards/Grape Pop.png"},{name:"Blueberry Bay Breeze",img:"/assets/dishes/drinks-cards/Blueberry Bay Breeze.png"},{name:"Citrus Seabreeze",img:"/assets/dishes/drinks-cards/Citrus Seabreeze.png"},{name:"All Drinks Menu",img:"/assets/dishes/drinks-cards/All Drinks.png"}],O=[{category:"breakfast",label:"The Big Beach",img:"/assets/dishes/breakfast-cards/The Big Beach.png"},{category:"breakfast",label:"Early Bird",img:"/assets/dishes/breakfast-cards/Early Bird.png"},{category:"breakfast",label:"The Sunrise",img:"/assets/dishes/breakfast-cards/The Sunrise.png"},{category:"breakfast",label:"Biscuits and Gravy",img:"/assets/dishes/breakfast-cards/Biscuits and Gravy.png"},{category:"breakfast",label:"Seafood Omelet",img:"/assets/dishes/breakfast-cards/Seafood Omelet.png"},{category:"breakfast",label:"Chorizo Omelet",img:"/assets/dishes/breakfast-cards/Chorizo Omelet.png"},{category:"breakfast",label:"Veggie Omelet",img:"/assets/dishes/breakfast-cards/Veggie Omelet.png"},{category:"breakfast",label:"French Toast",img:"/assets/dishes/breakfast-cards/French Toast.png"},{category:"breakfast",label:"Healthy Surfer",img:"/assets/dishes/breakfast-cards/Healthy Surfer.png"},{category:"breakfast",label:"Classic Eggs Benedict",img:"/assets/dishes/breakfast-cards/Classic Eggs Benedict.png"},{category:"lunch",label:"Bucket Burger",img:"/assets/dishes/lunch-cards/Bucket Burger.png"},{category:"lunch",label:"Buffalo Shrimp",img:"/assets/dishes/lunch-cards/Buffalo Shrimp.png"},{category:"lunch",label:"Fried Calamari",img:"/assets/dishes/lunch-cards/Fried Calamari.png"},{category:"lunch",label:"Loaded Chicken Panini",img:"/assets/dishes/lunch-cards/Loaded Chicken Panini.png"},{category:"lunch",label:"Chicken Tenders",img:"/assets/dishes/lunch-cards/Chicken Tenders.png"},{category:"lunch",label:"Wings",img:"/assets/dishes/lunch-cards/Wings.png"},{category:"lunch",label:"Conch Fritters",img:"/assets/dishes/lunch-cards/Conch Fritters.png"},{category:"lunch",label:"Corn Nuggets",img:"/assets/dishes/lunch-cards/Corn Nuggets.png"},{category:"lunch",label:"Crab Cakes",img:"/assets/dishes/lunch-cards/Crab Cakes.png"},{category:"lunch",label:"Smoked Fish Dip",img:"/assets/dishes/lunch-cards/Smoked Fish Dip.png"},{category:"lunch",label:"Fried Shrimp",img:"/assets/dishes/lunch-cards/Fried Shrimp.png"},{category:"lunch",label:"Key West Chicken",img:"/assets/dishes/lunch-cards/Key West Chicken.png"},{category:"lunch",label:"Mahi Sandwich",img:"/assets/dishes/lunch-cards/Mahi Sandwich.png"},{category:"lunch",label:"Mahi Tacos",img:"/assets/dishes/lunch-cards/Mahi Tacos.png"},{category:"lunch",label:"Mozzarella Sticks",img:"/assets/dishes/lunch-cards/Mozzarella Sticks.png"},{category:"lunch",label:"Onion Rings",img:"/assets/dishes/lunch-cards/Onion Rings.png"},{category:"lunch",label:"Pulled Pork Tacos",img:"/assets/dishes/lunch-cards/Pulled Pork Tacos.png"},{category:"lunch",label:"Shrimp & Bacon Panini",img:"/assets/dishes/lunch-cards/Shrimp & Bacon Panini.png"},{category:"lunch",label:"Caesar Salad",img:"/assets/dishes/lunch-cards/Caesar Salad.png"},{category:"lunch",label:"House Salad",img:"/assets/dishes/lunch-cards/House Salad.png"},{category:"lunch",label:"Steak Panini",img:"/assets/dishes/lunch-cards/Steak Panini.png"},{category:"lunch",label:"Tuna Melt",img:"/assets/dishes/lunch-cards/Tuna Melt.png"},{category:"lunch",label:"Ahi Tuna Wrap",img:"/assets/dishes/lunch-cards/Ahi Tuna Wrap.png"},{category:"lunch",label:"Shrimp Tacos",img:"/assets/dishes/lunch-cards/Shrimp Tacos.png"},{category:"atmosphere",label:"Sunset Patio Vibe",img:"/assets/atmosphere-sunset-1.jpg"},{category:"atmosphere",label:"Guests & Oceanfront Seating",img:"/assets/atmosphere-sunset-2.jpg"}],w=[{title:"Breakfast Omelettes (Served 7AM to 11AM)",items:[["Seafood Omelet","$16.49","House specialty. A beach favorite stuffed with blue swimming crab and shrimp, then topped with creamy hollandaise sauce."],["Swiss Bacon Mushroom Omelet","$12.79","Crispy bacon, sauteed mushrooms, and melted Swiss cheese folded into a fluffy 3-egg omelet."],["Ormond Omelet","$13.29","Grilled ham, onions, and sweet peppers in a fluffy omelet. Add cheese for $1.99."],["Meat Lover's Omelet","$14.29","Loaded with sausage, bacon, and ham, finished with melted cheddar cheese."],["Cheese Omelet","$13.29","Extra cheesy omelet with a double portion of your choice of American, Swiss, provolone, or cheddar."],["Chorizo Omelet","$13.79","Spicy chorizo, peppers, onions, and provolone, topped with sweet chili sauce for the perfect sweet-heat bite."],["Veggie Omelet","$13.29","Tomatoes, onions, mushrooms, and peppers with cheddar cheese, fresh and full of flavor."]]},{title:"Benedicts",items:[["CHORIZO","$13.99","Toasted English muffin topped with spicy chorizo patties, poached eggs, and creamy hollandaise."],["CLASSIC","$13.99","Smoky Canadian bacon, poached eggs, and rich hollandaise on a toasted English muffin."],["BLUE SWIMMING CRAB (House Specialty)","$16.29","Coastal benedict topped with blue swimming crabmeat, poached eggs, and creamy hollandaise."]]},{title:"Breakfast Combos",items:[["#1 Early Bird","$10.99","Two eggs cooked your way with your choice of bacon (2), sausage links (2), or sausage patty (1)."],["#2 The Sunrise","$10.79","Two eggs with thick sliced smoked ham, hearty and classic."],["#3 Biscuits and Gravy","$11.29","Two eggs with a warm biscuit split and covered in rich sausage gravy. Does not include toast."],["#4 The Big Beach","$12.49","Two eggs, two slices of bacon, and two sausage links for a big breakfast."]]},{title:"Breakfast Favorites",items:[["Breakfast Sandwich","$11.29","Two eggs with your choice of toast (substitute biscuit or English muffin for $0.99), plus your choice of bacon (2), sausage patty, or chorizo patty. Served with home fries. Add cheese for $0.99."],["Healthy Surfer","$13.49","Scrambled egg whites with tomato slices, a fresh fruit cup, and a toasted English muffin."]]},{title:"French Toast",items:[["Three Slices French Toast","$11.99","Three thick slices grilled golden and dusted with powdered sugar."],["French Toast Breakfast Combo","$13.79","Three slices of French toast with your choice of 2 pieces of bacon or sausage links and one egg."]]},{title:"Breakfast Beverages",items:[["Coffee","","Fresh-brewed, hot, and smooth. The classic breakfast drink."],["Hot Tea","","A warm cup of tea, steeped fresh and served hot."],["Fresh Squeezed Orange Juice (Small/Large)","","Bright, fresh-squeezed Florida orange juice, served small or large."],["Iced Tea","","Cold, crisp iced tea served over ice."],["Sweet Tea","","Classic Southern sweet tea, cold and refreshing."],["Pepsi Products","","A full selection of Pepsi soft drinks served ice-cold."],["Mimosa's","","Chilled sparkling wine mixed with fruit juice, perfect for brunch."],["Bloody Mary's","","Our famous Bloody Mary, bold, savory, and brunch-ready."],["Full Bar","","Cocktails, beer, and wine available all day."]]},{title:"Breakfast Sides",items:[["Slice of French Toast","$3.99","One thick slice grilled golden and dusted with powdered sugar."],["Grits","$3.29","Creamy, buttery grits cooked smooth and served hot."],["Sausage Links (Four)","$4.29","Four juicy sausage links cooked until browned."],["Toast","$2.99","Warm toast served with butter and your choice of bread."],["Home Fries","$2.99","Crispy breakfast potatoes, golden outside and tender inside."],["Sausage Patty (Two)","$4.29","Two savory sausage patties, grilled and seasoned."],["English Muffin","$2.99","Toasted English muffin with a buttery, crisp edge."],["One Egg","$2.99","One fresh egg cooked your way."],["Chorizo Sausage Patty (Two)","$4.29","Two spicy chorizo patties with big flavor and a little kick."],["Biscuit","$2.99","Fluffy buttermilk biscuit served warm."],["Fresh Fruit Cup","$3.79","A light mix of fresh, chilled fruit."],["Bacon (Four)","$4.29","Four strips of crispy, smoky bacon."],["Sausage Gravy","$1.99","Rich, peppery sausage gravy, perfect for biscuits or dipping."],["Fresh Fruit Bowl","$5.79","A larger bowl of fresh fruit, cool and refreshing."],["Ham Slice","$5.29","Thick sliced ham, grilled and lightly smoky."]]},{title:"Lunch & Dinner Starters",items:[["Peel & Eat Shrimp (1/2 Pound / Full Pound)","$16.49 / $23.49","Shell-on shrimp steamed warm and seasoned with our secret coastal blend. Served with cocktail sauce and melted butter."],["Conch Fritters","$15.49","Tender conch mixed with island spices, fried golden and crisp. Served with creamy remoulade."],["Fried Calamari","$13.79","Lightly seasoned calamari, fried crispy and golden brown. Served with marinara or remoulade."],["Fried Mozzarella Sticks","$11.99","Golden-fried mozzarella sticks with a melty cheese pull in every bite. Served with marinara or ranch."],["Smoked Fish Dip","$14.29","House-smoked wahoo and mahi mahi blended with signature seasoning and creamy spread. Served with tortilla chips."],["Wings","$16.99","One pound of wings tossed in Bucket Sauce or Buffalo (mild/hot), teriyaki, garlic butter, or BBQ. Add fries for $3.99."],["Buffalo Shrimp","$15.49","Hand-breaded shrimp tossed in Buffalo sauce (mild or hot). Add fries for $3.99."],["Crab Cakes","$16.99","Lump crab cakes pan-seared until golden and flavorful. Served with remoulade."],["Onion Rings","$11.49","Thick-cut onion rings fried crispy and golden. Served with remoulade."],["Sweet Potato Fries","$8.99","Crispy sweet potato fries seasoned with a light touch of salt and pepper."],["Pork Nachos","$15.49","Pulled pork in Bucket Sauce over crispy tortilla chips with queso, tomatoes, onions, salsa, and sour cream."],["Corn Nuggets","$8.99","Sweet corn bites fried golden and dusted with powdered sugar. Served with ranch and maple syrup."],["Pretzels","$11.99","Soft Bavarian pretzels, warm and lightly salted. Served with queso cheese dip."]]},{title:"Lunch & Dinner Salads",items:[["Tomato Avocado Salsa Salad","$12.99","Fresh mixed greens with tomatoes, onions, cheddar, croutons, and house tomato avocado salsa."],["Caesar Salad (Small)","$6.99","Crisp romaine tossed with creamy Caesar dressing, parmesan, and crunchy croutons."],["Caesar Salad (Large)","$10.99","Crisp romaine tossed with creamy Caesar dressing, parmesan, and crunchy croutons."],["Bucket House Salad (Small)","$6.99","Fresh mixed greens with garden toppings and croutons, served with your choice of dressing."],["Bucket House Salad (Large)","$10.99","Fresh mixed greens with garden toppings and croutons, served with your choice of dressing."],["Add: Grilled Chicken Breast or Tuna Salad","$6.99","Add extra protein with grilled chicken breast or house-made tuna salad."],["Add: Grilled Mahi, Ahi Tuna Steak, or Grilled Shrimp","$7.99","Add fresh grilled seafood for a hearty beach-style meal."]]},{title:"Lunch & Dinner Entrees",items:[["Key West Chicken Sandwich","$13.49","Juicy grilled chicken seasoned with house Key West spice blend, served on a toasted bun with lettuce and tomato."],["Tuna Melt Sandwich (House Specialty)","$13.29","House tuna salad topped with melted cheddar on parmesan-encrusted sourdough."],["Shrimp and Bacon Panini","$16.29","Crispy fried shrimp in Bucket Sauce, pressed hot with bacon and cheddar."],["Steak and Mozzarella Panini","$15.49","Tender shaved steak with grilled tomatoes, fresh basil, and mozzarella, finished with balsamic reduction."],["Mozzarella Caprese Panini","$13.99","Melted mozzarella, grilled tomatoes, and fresh basil with balsamic reduction."],["Loaded Chicken Panini","$15.29","Grilled chicken with sauteed peppers, mushrooms, onions, and cheddar; served with tzatziki."],["Shrimp Tacos (House Specialty)","$15.79","Two flour tortillas with grilled/blackened/fried shrimp, spring mix, tomato avocado salsa, and cilantro aioli."],["Fish Tacos (House Specialty)","$15.29","Two flour tortillas with grilled/blackened/fried white fish, spring mix, tomato avocado salsa, and cilantro aioli."],["Pulled Pork and Slaw Tacos","$13.99","Two flour tortillas with pulled pork in Bucket Sauce, topped with creamy coleslaw."],["BBQ Burger","$15.99","Half-pound burger topped with BBQ pulled pork, crispy bacon, and BBQ sauce on a toasted bun."],["Bucket Burger","$14.99","Half-pound burger on a toasted bun with lettuce, tomato, raw onion, and pickles."],["Fish & Chips","$13.99","Mild white fish fried golden and crispy, served with tartar sauce and malt vinegar."],["Chicken Tender","$13.79","Golden fried chicken tenders seasoned with our special spice blend."],["Fried Shrimp","$15.99","Large sweet shrimp hand-breaded in house batter, fried golden and tender."],["Ahi Tuna Wrap","$16.49","Seasoned ahi tuna grilled medium-rare in a jalapeno cheese tortilla with spring mix and tomato avocado salsa."],["Bucket Fish Sandwich","$14.99","Mild white fish grilled, blackened, or fried on a toasted bun with lettuce, tomato, and tartar sauce."],["Fish & Shrimp Combo (House Specialty)","$25.99","Your choice of fried, blackened, or grilled fish and shrimp, with tartar, cocktail sauce, lemon wedge, and coleslaw."]]},{title:"Desserts",items:[["Chocolate Peanut Butter Pie","$8.49","Creamy chocolate and peanut butter in a rich, chilled pie slice."],["Key Lime Pie","$8.49","Tangy key lime filling with a sweet, crunchy crust."],["Salted Caramel Cheesecake","$8.49","Smooth cheesecake topped with salted caramel."]]}];O.forEach(e=>{e.img=a(e.img)});let W=0;const V=()=>a(C[W++%C.length]),U={"Seafood Omelet":a("/assets/menu/seafood-omelet.jpg"),"Swiss Bacon Mushroom Omelet":a("/assets/menu/swiss-bacon-mushroom-omelet.jpg"),"Ormond Omelet":a("/assets/menu/ormond-omelet.jpg"),"Meat Lover's Omelet":a("/assets/menu/meat-lovers-omelet.jpg"),"Cheese Omelet":a("/assets/menu/cheese-omelet.jpg"),"Chorizo Omelet":a("/assets/menu/chorizo-omelet.jpg"),"Veggie Omelet":a("/assets/menu/veggie-omelet.jpg"),CHORIZO:a("/assets/menu/chorizo-benedict.jpg"),CLASSIC:a("/assets/menu/classic-benedict.jpg"),"BLUE SWIMMING CRAB (House Specialty)":a("/assets/menu/blue-swimming-crab-benedict.jpg"),"#1 Early Bird":a("/assets/menu/early-bird-breakfast.jpg"),"#2 The Sunrise":a("/assets/menu/the-sunrise-breakfast.jpg"),"#3 Biscuits and Gravy":a("/assets/menu/biscuits-and-gravy.jpg"),"#4 The Big Beach":a("/assets/menu/the-big-beach-breakfast.jpg"),"Breakfast Sandwich":a("/assets/menu/breakfast-sandwich.jpg"),"Healthy Surfer":a("/assets/menu/healthy-surfer-breakfast.jpg"),"Three Slices French Toast":a("/assets/menu/french-toast-three-slices.jpg"),"French Toast Breakfast Combo":a("/assets/menu/french-toast-combo.jpg"),"Peel & Eat Shrimp (1/2 Pound / Full Pound)":a("/assets/menu/peel-and-eat-shrimp.jpg"),"Conch Fritters":a("/assets/menu/conch-fritters.jpg"),"Fried Calamari":a("/assets/menu/fried-calamari.jpg"),"Fried Mozzarella Sticks":a("/assets/menu/fried-mozzarella-sticks.jpg"),"Smoked Fish Dip":a("/assets/menu/smoked-fish-dip.jpg"),Wings:a("/assets/menu/wings.jpg"),"Buffalo Shrimp":a("/assets/menu/buffalo-shrimp.jpg"),"Crab Cakes":a("/assets/menu/crab-cakes.jpg"),"Onion Rings":a("/assets/menu/onion-rings.jpg"),"Sweet Potato Fries":a("/assets/menu/sweet-potato-fries.jpg"),"Pork Nachos":a("/assets/menu/pork-nachos.jpg"),"Corn Nuggets":a("/assets/menu/corn-nuggets.jpg"),Pretzels:a("/assets/menu/soft-pretzels.jpg"),"Tomato Avocado Salsa Salad":a("/assets/menu/tomato-avocado-salsa-salad.jpg"),"Caesar Salad (Small)":a("/assets/menu/caesar-salad.jpg"),"Caesar Salad (Large)":a("/assets/menu/caesar-salad.jpg"),"Bucket House Salad (Small)":a("/assets/menu/bucket-house-salad.jpg"),"Bucket House Salad (Large)":a("/assets/menu/bucket-house-salad.jpg"),"Key West Chicken Sandwich":a("/assets/menu/key-west-chicken-sandwich.jpg"),"Tuna Melt Sandwich (House Specialty)":a("/assets/menu/tuna-melt-sandwich.jpg"),"Shrimp and Bacon Panini":a("/assets/menu/shrimp-and-bacon-panini.jpg"),"Steak and Mozzarella Panini":a("/assets/menu/steak-and-mozzarella-panini.jpg"),"Mozzarella Caprese Panini":a("/assets/menu/mozzarella-caprese-panini.jpg"),"Loaded Chicken Panini":a("/assets/menu/loaded-chicken-panini.jpg"),"Shrimp Tacos (House Specialty)":a("/assets/menu/shrimp-tacos.jpg"),"Fish Tacos (House Specialty)":a("/assets/menu/fish-tacos.jpg"),"Pulled Pork and Slaw Tacos":a("/assets/menu/pulled-pork-and-slaw-tacos.jpg"),"BBQ Burger":a("/assets/menu/bbq-burger.jpg"),"Bucket Burger":a("/assets/menu/bucket-burger.jpg"),"Fish & Chips":a("/assets/menu/fish-and-chips.jpg"),"Chicken Tender":a("/assets/menu/chicken-tenders.jpg"),"Fried Shrimp":a("/assets/menu/fried-shrimp-plate.jpg"),"Ahi Tuna Wrap":a("/assets/menu/ahi-tuna-wrap.jpg"),"Bucket Fish Sandwich":a("/assets/menu/bucket-fish-sandwich.jpg"),"Fish & Shrimp Combo (House Specialty)":a("/assets/menu/fish-and-shrimp-combo.jpg"),"Chocolate Peanut Butter Pie":a("/assets/menu/chocolate-peanut-butter-pie.jpg"),"Key Lime Pie":a("/assets/menu/key-lime-pie.jpg"),"Salted Caramel Cheesecake":a("/assets/menu/salted-caramel-cheesecake.jpg"),Coffee:a("/assets/menu/coffee.jpg"),"Hot Tea":a("/assets/menu/hot-tea.jpg"),"Fresh Squeezed Orange Juice (Small/Large)":a("/assets/menu/fresh-squeezed-orange-juice.jpg"),"Iced Tea":a("/assets/menu/iced-tea.jpg"),"Sweet Tea":a("/assets/menu/sweet-tea.jpg"),"Pepsi Products":a("/assets/menu/pepsi-products.jpg"),"Mimosa's":a("/assets/menu/mimosa.jpg"),"Bloody Mary's":a("/assets/menu/bloody-mary.jpg"),"Full Bar":a("/assets/menu/full-bar.jpg"),"Slice of French Toast":a("/assets/menu/slice-of-french-toast.jpg"),Grits:a("/assets/menu/grits.jpg"),"Sausage Links (Four)":a("/assets/menu/sausage-links.jpg"),Toast:a("/assets/menu/toast.jpg"),"Home Fries":a("/assets/menu/home-fries.jpg"),"Sausage Patty (Two)":a("/assets/menu/sausage-patty.jpg"),"English Muffin":a("/assets/menu/english-muffin.jpg"),"One Egg":a("/assets/menu/one-egg.jpg"),"Chorizo Sausage Patty (Two)":a("/assets/menu/chorizo-sausage-patty.jpg"),Biscuit:a("/assets/menu/biscuit.jpg"),"Fresh Fruit Cup":a("/assets/menu/fresh-fruit-cup.jpg"),"Bacon (Four)":a("/assets/menu/bacon.jpg"),"Sausage Gravy":a("/assets/menu/sausage-gravy.jpg"),"Fresh Fruit Bowl":a("/assets/menu/fresh-fruit-bowl.jpg"),"Ham Slice":a("/assets/menu/ham-slice.jpg"),"Add: Grilled Chicken Breast or Tuna Salad":a("/assets/menu/grilled-chicken-breast.jpg"),"Add: Grilled Mahi, Ahi Tuna Steak, or Grilled Shrimp":a("/assets/menu/grilled-mahi.jpg")},M=w.flatMap(e=>e.items.map(s=>s[0])),F=w.flatMap(e=>e.items.map(s=>s[2]));let K=0;const _=w.map(e=>{const s=e.items.map(t=>{const l=U[t[0]]||V(),n=K++;return`
      <li class="item-row">
        <button class="item-thumb-btn" data-img="${l}" data-name="${t[0]}" aria-label="Open image for ${t[0]}">
          <img src="${l}" alt="${t[0]}" loading="lazy" />
        </button>
        <div class="item-body">
          <div class="item-head">
            <button class="item-name-btn" data-img="${l}" data-name="${t[0]}" aria-label="View photo of ${t[0]}">
              <span class="item-name" data-menu-name="${n}">${t[0]}</span>
            </button>
            <span class="item-price">${t[1]}</span>
          </div>
          <p data-menu-desc="${n}">${t[2]}</p>
        </div>
      </li>`}).join("");return`
    <div class="menu-section">
      <h3 class="menu-section-title" data-i18n="menu.section.${e.title}">${e.title}</h3>
      <ul class="item-list">${s}</ul>
    </div>`}).join("");document.querySelector("#app").innerHTML=`
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
          <li><a href="#our-dishes">Our Dishes</a></li>
          <li><a href="#gallery" data-i18n="nav.gallery">Gallery</a></li>
          <li><a href="#giftcards" data-i18n="nav.giftcards">Gift Cards</a></li>
          <li><a href="#faq" data-i18n="nav.faq">FAQ</a></li>
          <li><a href="#contact" data-i18n="nav.contact">Contact</a></li>
        </ul>
      </nav>
      <a class="btn btn-small" href="https://order.online/business/The%20Beach%20Bucket-185350" target="_blank" rel="noopener noreferrer">Order Online</a>
    </div>
  </header>

  <section class="hero" aria-label="The Beach Bucket — oceanfront dining in Ormond Beach">
    <video id="heroVideo" class="hero-bg" autoplay loop muted playsinline preload="metadata" poster="/assets/hero-beachbucket-premium.jpg" aria-hidden="true">
      <source src="/assets/hero-video.mp4" type="video/mp4" />
    </video>
    <div class="hero-veil" aria-hidden="true"></div>
    <div class="hero-content">
      <span class="hero-locale" data-i18n="hero.locale">Ormond Beach &middot; Florida</span>
      <h1 class="hero-title" data-i18n="hero.title">The Beach Bucket</h1>
      <p class="hero-tagline" data-i18n="hero.tagline">Oceanfront breakfast &amp; lunch</p>
      <div class="hero-cta-row">
        <a class="btn primary" href="#menu" data-i18n="hero.cta_menu">View the menu</a>
      </div>
    </div>
    <button id="muteToggle" class="mute-toggle" type="button" aria-pressed="true">Sound</button>
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
            <div class="hours-right">
              <h3 data-i18n="hours.find_us">Find us</h3>
              <p data-i18n="hours.address">867 South Atlantic Avenue, Ormond Beach, FL 32176</p>
              <a class="location-btn"
                 href="https://maps.google.com/?q=The+Beach+Bucket+867+S+Atlantic+Ave+Ormond+Beach+FL+32176"
                 target="_blank"
                 rel="noopener noreferrer"
                 aria-label="Open Google Maps directions to The Beach Bucket">
                <span class="location-btn-pulse" aria-hidden="true"></span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <span data-i18n="hours.click_for_location">Click for directions</span>
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section id="menu" class="section" aria-labelledby="menu-heading">
      <div class="container">
        <h2 id="menu-heading" data-i18n="menu.title">Menu</h2>
        ${_}

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

    <section id="our-dishes" class="section dish-stack-section" aria-labelledby="our-dishes-heading">
      <video class="cloud-video" data-rate="0.5" autoplay muted loop playsinline preload="metadata" poster="/assets/textures/dream-clouds.jpg" aria-hidden="true">
        <source src="/assets/videos/clouds-loop.mp4" type="video/mp4" />
      </video>
      <div class="container">
        <h2 id="our-dishes-heading">Our Dishes</h2>
        <p class="muted">Flip through our full lunch lineup &mdash; Daily Specials, sandwiches, paninis, tacos &amp; salads.</p>
        <div class="dish-stack-stage" id="dishStackStage" role="region" aria-roledescription="carousel" aria-label="Beach Bucket lunch dishes">
          <button class="ds-arrow ds-prev" aria-label="Previous dish" type="button">&#10094;</button>
          <div class="dish-stack" id="dishStack">
            ${A.map((e,s)=>`
              <figure class="ds-card" data-i="${s}" role="group" aria-roledescription="slide" aria-label="${s+1} of ${A.length}: ${e.name}">
                <img src="${a(e.img)}" alt="${e.name}" loading="lazy" draggable="false" />
              </figure>
            `).join("")}
          </div>
          <button class="ds-arrow ds-next" aria-label="Next dish" type="button">&#10095;</button>
        </div>
        <div class="ds-meta" id="dishStackMeta" aria-live="polite"></div>
      </div>
    </section>

    <section id="gallery" class="section alt" aria-labelledby="gallery-heading">
      <div class="container">
        <h2 id="gallery-heading" data-i18n="gallery.title">Gallery</h2>
        <p class="muted">Browse by category: Breakfast, Lunch, Drink Specials, and Atmosphere.</p>

        <div class="gallery-filters" role="tablist" aria-label="Gallery categories">
          <button class="chip is-active" data-filter="all">All</button>
          <button class="chip" data-filter="breakfast">Breakfast</button>
          <button class="chip" data-filter="lunch">Lunch</button>
          <button class="chip" data-filter="atmosphere">Atmosphere</button>
        </div>

        <div class="gallery-grid" id="galleryGrid">
          ${O.map(e=>`
            <figure class="gallery-card" data-category="${e.category}">
              <button class="gallery-open" data-img="${e.img}" data-name="${e.label}">
                <img src="${e.img}" alt="${e.label}" loading="lazy" />
              </button>
              <figcaption>${e.label}</figcaption>
            </figure>
          `).join("")}
        </div>

      </div>

      <div class="drink-clouds-wrap">
        <video class="cloud-video" autoplay muted loop playsinline preload="metadata" poster="/assets/textures/dream-clouds.jpg" aria-hidden="true">
          <source src="/assets/videos/clouds-loop.mp4" type="video/mp4" />
        </video>
        <div class="drink-clouds-inner">
          <h3 class="drink-stack-heading">Drink Specials</h3>
          <p class="muted" style="text-align:center">Flip through our weekday combos &amp; signature drinks &mdash; full cards, no cropping.</p>
          <div class="dish-stack-stage" id="drinkStackStage" role="region" aria-roledescription="carousel" aria-label="Beach Bucket drink specials">
            <button class="ds-arrow ds-prev" data-stack="drink" aria-label="Previous drink" type="button">&#10094;</button>
            <div class="dish-stack" id="drinkStack">
              ${T.map((e,s)=>`
                <figure class="ds-card" data-i="${s}" role="group" aria-roledescription="slide" aria-label="${s+1} of ${T.length}: ${e.name}">
                  <img src="${a(e.img)}" alt="${e.name}" loading="lazy" draggable="false" />
                </figure>
              `).join("")}
            </div>
            <button class="ds-arrow ds-next" data-stack="drink" aria-label="Next drink" type="button">&#10095;</button>
          </div>
          <div class="ds-meta" id="drinkStackMeta" aria-live="polite"></div>
        </div>
      </div>
    </section>

    <section id="giftcards" class="section" aria-labelledby="giftcards-heading">
      <div class="container">
        <h2 id="giftcards-heading" data-i18n="gift.title">Gift Cards</h2>
        <p class="section-lead">A piece of the beach for anyone you love. Choose an amount, write a note, send instantly by email.</p>

        <div class="giftcard-layout">
          <div class="giftcard-preview">
            <a class="giftcard-link" href="#giftcards" aria-label="Buy a Beach Bucket gift card">
              <img src="/assets/gift-card.jpg" alt="The Beach Bucket gift card preview" loading="lazy" />
            </a>
            <p class="giftcard-fineprint">Delivered by email · valid at The Beach Bucket Bar &amp; Grill, Ormond Beach</p>
          </div>

          <div class="giftcard-side">
            <span class="section-eyebrow">Choose an amount</span>
            <div class="gift-amounts" role="radiogroup" aria-label="Gift card amount">
              <button type="button" class="gift-amount-btn" data-amount="15" role="radio" aria-checked="false">
                <span class="amount">$15</span>
                <span class="amount-label">Treat</span>
              </button>
              <button type="button" class="gift-amount-btn is-active" data-amount="25" role="radio" aria-checked="true">
                <span class="amount">$25</span>
                <span class="amount-label">Lunch</span>
              </button>
              <button type="button" class="gift-amount-btn" data-amount="50" role="radio" aria-checked="false">
                <span class="amount">$50</span>
                <span class="amount-label">Date night</span>
              </button>
              <button type="button" class="gift-amount-btn" data-amount="100" role="radio" aria-checked="false">
                <span class="amount">$100</span>
                <span class="amount-label">Celebration</span>
              </button>
            </div>

            <form class="gift-form" aria-label="Gift card request">
              <label for="giftName">Recipient name</label>
              <input id="giftName" type="text" placeholder="Their full name" autocomplete="name" />
              <label for="giftEmail">Recipient email</label>
              <input id="giftEmail" type="email" placeholder="name@example.com" autocomplete="email" />
              <label for="giftMessage">Personal note <span class="muted">(optional)</span></label>
              <textarea id="giftMessage" rows="2" placeholder="Add a short message..."></textarea>
              <input id="giftAmount" type="hidden" value="25" />
              <button class="btn primary gift-submit" type="submit" id="giftSubmit">
                Purchase $25 Gift Card
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </button>
            </form>
          </div>
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
`;N(document.getElementById("app"));document.getElementById("year").textContent=new Date().getFullYear();document.querySelector(".contact")?.addEventListener("submit",e=>{e.preventDefault(),alert("Thanks!")});document.querySelector(".gift-form")?.addEventListener("submit",e=>{e.preventDefault(),alert("Gift card request captured. Next step: connect this to your payment checkout.")});document.querySelector(".giftcard-link")?.addEventListener("click",e=>{e.preventDefault(),document.getElementById("giftAmount")?.focus()});const m=document.getElementById("heroVideo"),g=document.getElementById("muteToggle");m&&g&&(m.muted=!0,m.volume=1,g.textContent="Unmute",g.setAttribute("aria-pressed","true"),g.addEventListener("click",()=>{m.muted=!m.muted;const e=m.muted;g.textContent=e?"Unmute":"Mute",g.setAttribute("aria-pressed",String(e))}));const $={en:{"top.hours":"Every Day 7AM-9PM","nav.home":"Home","nav.menu":"Menu","nav.hours":"Hours","nav.gallery":"Gallery","nav.giftcards":"Gift Cards","nav.faq":"FAQ","nav.contact":"Contact","intro.title":"The Beach Bucket","intro.tagline":"Ormond Beach's Only Oceanfront Dining","intro.desc":"Discover oceanfront breakfast and lunch in Ormond Beach, Florida. Enjoy fresh seafood, beachside drinks, and a relaxed coastal dining experience just steps from the water.","hours.title":"Hours","hours.everyday":"<strong>Every Day:</strong> 7:00 AM - 9:00 PM","hours.breakfast":"<strong>Breakfast:</strong> 7:00 AM - 11:00 AM","hours.lunch":"<strong>Lunch:</strong> Starts at 11:00 AM","hours.kitchen":"<strong>Kitchen Closes:</strong> 8:30 PM","menu.title":"Menu","gallery.title":"Gallery","gift.title":"Gift Cards","faq.findus":"Find Us","faq.address":"<strong>The Beach Bucket</strong><br/>867 South Atlantic Avenue, Ormond Beach, FL 32176","faq.parkingTitle":"Parking Information","faq.park1":"If you are a <strong>Volusia County resident</strong> and are registered with the county for beach access parking, you may park at the <strong>Harvard ramp at no charge</strong>. For <strong>non-residents of Volusia County</strong>, parking at this location is <strong>$20</strong>.","faq.park2":'Additional parking is available in the <strong>Ocean East parking lot</strong> in spaces designated <strong>"Restaurant Patron Parking Only"</strong>, most of which are located along <strong>A1A</strong> within the lot.',"faq.park3":"If further parking is needed, you may park at <strong>Andy Romano Park</strong> (located on the north side of our property) and walk to our location.","faq.q1":"What time does The Beach Bucket open?","faq.a1":"We're open daily from 7:00 AM to 9:00 PM.","faq.q2":"Do you serve breakfast and lunch?","faq.a2":"Yes. Breakfast is served 7:00 AM to 11:00 AM, and lunch starts at 11:00 AM.","faq.q3":"Do you have oceanfront patio seating?","faq.a3":"Yes - we offer oceanfront patio seating with a beachside atmosphere and water views.","menu.section.Breakfast Omelettes (7:00 AM - 11:00 AM)":"Breakfast Omelettes (7:00 AM - 11:00 AM)","menu.section.Benedicts":"Benedicts","menu.section.Egg Dishes":"Egg Dishes","menu.section.Breakfast Favorites":"Breakfast Favorites","menu.section.Lunch Favorites":"Lunch Favorites"},es:{"top.hours":"Todos los dÃ­as 7AM-9PM","nav.home":"Inicio","nav.menu":"MenÃº","nav.hours":"Horario","nav.gallery":"GalerÃ­a","nav.giftcards":"Tarjetas","nav.faq":"Preguntas","nav.contact":"Contacto","intro.title":"The Beach Bucket","intro.tagline":"El Unico Restaurante Frente al Mar en Ormond Beach","intro.desc":"Disfruta desayuno y almuerzo frente al mar en Ormond Beach, Florida. Mariscos frescos, bebidas frente al mar y un ambiente relajado a pasos del oceano.","hours.title":"Horario","hours.everyday":"<strong>Todos los dÃ­as:</strong> 7:00 AM - 9:00 PM","hours.breakfast":"<strong>Desayuno:</strong> 7:00 AM - 11:00 AM","hours.lunch":"<strong>Almuerzo:</strong> Desde las 11:00 AM","hours.kitchen":"<strong>Cocina cierra:</strong> 8:30 PM","menu.title":"MenÃº","gallery.title":"GalerÃ­a","gift.title":"Tarjetas de Regalo","faq.findus":"UbicaciÃ³n","faq.address":"<strong>The Beach Bucket</strong><br/>867 South Atlantic Avenue, Ormond Beach, FL 32176","faq.parkingTitle":"InformaciÃ³n de Estacionamiento","faq.park1":"Si usted es <strong>residente del condado de Volusia</strong> y estÃ¡ registrado con el condado para estacionamiento de acceso a la playa, puede estacionar en la <strong>rampa Harvard sin costo</strong>. Para <strong>no residentes del condado de Volusia</strong>, estacionar allÃ­ cuesta <strong>$20</strong>.","faq.park2":'Hay estacionamiento adicional en el <strong>lote Ocean East</strong> en espacios marcados <strong>"Restaurant Patron Parking Only"</strong>, la mayorÃ­a ubicados a lo largo de <strong>A1A</strong> dentro del lote.',"faq.park3":"Si necesita mÃ¡s estacionamiento, puede estacionar en <strong>Andy Romano Park</strong> (lado norte de nuestra propiedad) y caminar hasta el restaurante.","faq.q1":"Â¿A quÃ© hora abre The Beach Bucket?","faq.a1":"Abrimos todos los dÃ­as de 7:00 AM a 9:00 PM.","faq.q2":"Â¿Sirven desayuno y almuerzo?","faq.a2":"SÃ­. El desayuno se sirve de 7:00 AM a 11:00 AM, y el almuerzo comienza a las 11:00 AM.","faq.q3":"Â¿Tienen patio frente al mar?","faq.a3":"SÃ­, ofrecemos patio frente al mar con ambiente playero y vista al agua.","menu.section.Breakfast Omelettes (7:00 AM - 11:00 AM)":"Omelettes de Desayuno (7:00 AM - 11:00 AM)","menu.section.Benedicts":"Benedictinos","menu.section.Egg Dishes":"Platos con Huevo","menu.section.Breakfast Favorites":"Favoritos del Desayuno","menu.section.Lunch Favorites":"Favoritos del Almuerzo"},fr:{"top.hours":"Tous les jours 7h-21h","nav.home":"Accueil","nav.menu":"Menu","nav.hours":"Horaires","nav.gallery":"Galerie","nav.giftcards":"Cartes Cadeaux","nav.faq":"FAQ","nav.contact":"Contact","intro.title":"The Beach Bucket","intro.tagline":"Le Seul Restaurant en Bord de Mer a Ormond Beach","intro.desc":"Profitez du petit-dejeuner et du dejeuner face a l ocean a Ormond Beach, Floride. Fruits de mer frais, boissons en bord de mer et ambiance detendue a deux pas de l eau.","hours.title":"Horaires","hours.everyday":"<strong>Tous les jours :</strong> 7:00 AM - 9:00 PM","hours.breakfast":"<strong>Petit-dÃ©jeuner :</strong> 7:00 AM - 11:00 AM","hours.lunch":"<strong>DÃ©jeuner :</strong> Ã€ partir de 11:00 AM","hours.kitchen":"<strong>Fermeture cuisine :</strong> 8:30 PM","menu.title":"Menu","gallery.title":"Galerie","gift.title":"Cartes Cadeaux","faq.findus":"Nous Trouver","faq.address":"<strong>The Beach Bucket</strong><br/>867 South Atlantic Avenue, Ormond Beach, FL 32176","faq.parkingTitle":"Informations de Stationnement","faq.park1":"Si vous etes resident du comte de Volusia et enregistre pour le stationnement plage, vous pouvez utiliser la rampe Harvard gratuitement. Pour les non-residents du comte de Volusia, le stationnement est de 20 $.","faq.park2":'Un stationnement supplÃ©mentaire est disponible dans le <strong>parking Ocean East</strong> dans les places marquÃ©es <strong>"Restaurant Patron Parking Only"</strong>, principalement le long de <strong>A1A</strong>.',"faq.park3":"Si necessaire, vous pouvez vous garer a <strong>Andy Romano Park</strong> (au nord de la propriete) puis marcher jusqu'au restaurant.","faq.q1":"Ã€ quelle heure ouvre The Beach Bucket ?","faq.a1":"Nous sommes ouverts tous les jours de 7h00 Ã  21h00.","faq.q2":"Servez-vous le petit-dÃ©jeuner et le dÃ©jeuner ?","faq.a2":"Oui. Le petit-dÃ©jeuner est servi de 7h00 Ã  11h00 et le dÃ©jeuner commence Ã  11h00.","faq.q3":"Avez-vous une terrasse en bord de mer ?","faq.a3":"Oui - nous proposons une terrasse en bord de mer avec ambiance plage et vue sur l'ocean.","menu.section.Breakfast Omelettes (7:00 AM - 11:00 AM)":"Omelettes du Matin (7h00 - 11h00)","menu.section.Benedicts":"Benedicts","menu.section.Egg Dishes":"Plats aux Å’ufs","menu.section.Breakfast Favorites":"Favoris du Petit-dÃ©jeuner","menu.section.Lunch Favorites":"Favoris du DÃ©jeuner"},pt:{"top.hours":"Todos os dias 7h-21h","nav.home":"InÃ­cio","nav.menu":"CardÃ¡pio","nav.hours":"HorÃ¡rios","nav.gallery":"Galeria","nav.giftcards":"Gift Cards","nav.faq":"FAQ","nav.contact":"Contato","intro.title":"The Beach Bucket","intro.tagline":"O Unico Restaurante a Beira-Mar em Ormond Beach","intro.desc":"Aproveite cafe da manha e almoco a beira-mar em Ormond Beach, Florida. Frutos do mar frescos, bebidas a beira-mar e um clima relaxante a poucos passos da agua.","hours.title":"HorÃ¡rios","hours.everyday":"<strong>Todos os dias:</strong> 7:00 AM - 9:00 PM","hours.breakfast":"<strong>CafÃ© da manhÃ£:</strong> 7:00 AM - 11:00 AM","hours.lunch":"<strong>AlmoÃ§o:</strong> A partir de 11:00 AM","hours.kitchen":"<strong>Cozinha fecha:</strong> 8:30 PM","menu.title":"CardÃ¡pio","gallery.title":"Galeria","gift.title":"Gift Cards","faq.findus":"Encontre-nos","faq.address":"<strong>The Beach Bucket</strong><br/>867 South Atlantic Avenue, Ormond Beach, FL 32176","faq.parkingTitle":"InformaÃ§Ãµes de Estacionamento","faq.park1":"Se vocÃª Ã© <strong>residente do condado de Volusia</strong> e estÃ¡ registrado para estacionamento de acesso Ã  praia, pode estacionar na <strong>rampa Harvard sem custo</strong>. Para <strong>nÃ£o residentes do condado de Volusia</strong>, o valor Ã© <strong>$20</strong>.","faq.park2":'Estacionamento adicional estÃ¡ disponÃ­vel no <strong>Ocean East parking lot</strong> em vagas marcadas <strong>"Restaurant Patron Parking Only"</strong>, a maioria ao longo da <strong>A1A</strong>.',"faq.park3":"Se precisar de mais estacionamento, vocÃª pode parar no <strong>Andy Romano Park</strong> (lado norte da propriedade) e caminhar atÃ© o restaurante.","faq.q1":"Que horas o The Beach Bucket abre?","faq.a1":"Estamos abertos todos os dias das 7:00 AM Ã s 9:00 PM.","faq.q2":"VocÃªs servem cafÃ© da manhÃ£ e almoÃ§o?","faq.a2":"Sim. CafÃ© da manhÃ£ das 7:00 AM Ã s 11:00 AM, e almoÃ§o a partir das 11:00 AM.","faq.q3":"VocÃªs tÃªm pÃ¡tio Ã  beira-mar?","faq.a3":"Sim - temos pÃ¡tio Ã  beira-mar com clima de praia e vista para a Ã¡gua.","menu.section.Breakfast Omelettes (7:00 AM - 11:00 AM)":"Omeletes do CafÃ© da ManhÃ£ (7h00 - 11h00)","menu.section.Benedicts":"Benedicts","menu.section.Egg Dishes":"Pratos com Ovos","menu.section.Breakfast Favorites":"Favoritos do CafÃ© da ManhÃ£","menu.section.Lunch Favorites":"Favoritos do AlmoÃ§o"}},q={es:{names:["Omelette de Mariscos","Omelette Suizo con Tocino y ChampiÃ±ones","Omelette Ormond","Omelette CarnÃ­voro","Omelette de Queso","Omelette de Chorizo","Omelette Vegetal","Benedictino (ClÃ¡sico/Chorizo)","Benedictino de Cangrejo Azul","Combo Early Bird","The Sunrise","Biscuits con Gravy","The Big Beach","SÃ¡ndwich de Desayuno","Healthy Surfer","Tres Rebanadas de French Toast","Combo de French Toast","CamarÃ³n para Pelar (1/2 lb / 1 lb)","BuÃ±uelos de Caracol","Calamares Fritos","Dip de Pescado Ahumado","Alitas","Camarones Buffalo","Tortitas de Cangrejo","Nachos de Cerdo","SÃ¡ndwich de Pollo Key West","Tuna Melt (Especial de la Casa)","Panini de CamarÃ³n y Tocino","Tacos de CamarÃ³n (Especial de la Casa)","Tacos de Pescado (Especial de la Casa)","Hamburguesa Bucket","Fish & Chips","Camarones Fritos","SÃ¡ndwich de Pescado Bucket"],descs:["Carne de cangrejo azul y camarones, cubierto con salsa holandesa.","Tocino, champiÃ±ones y queso suizo.","JamÃ³n, cebolla y pimientos verdes/rojos. Agrega queso +$1.99.","Salchicha, tocino, jamÃ³n y queso cheddar.","Queso americano, suizo, provolone o cheddar.","Pimientos, provolone, chorizo y salsa dulce de chile.","Tomate, cebolla, champiÃ±ones, pimientos y cheddar.","Pan muffin inglÃ©s, huevos pochados y holandesa.","Especial de la casa con cangrejo azul.","Dos huevos + tocino/salchicha.","Dos huevos + jamÃ³n en loncha gruesa.","Dos huevos + biscuit partido con gravy.","Dos huevos, dos tiras de tocino y dos salchichas.","Dos huevos, pan tostado, tocino/salchicha/chorizo y papas caseras.","Claras revueltas, rodajas de tomate, fruta y muffin inglÃ©s.","Espolvoreado con azÃºcar en polvo y jarabe de caramelo.","French toast + un huevo + tocino o salchicha.","Camarones al vapor con cÃ¡scara y condimento.","Servidos con salsa remoulade.","Servidos con marinara o remoulade.","Wahoo y mahi ahumado con chips de tortilla.","Bucket, buffalo, teriyaki, mantequilla de ajo o BBQ.","Camarones empanizados en salsa buffalo.","Cangrejo en trozos, dorados a la plancha con remoulade.","Cerdo desmenuzado, queso, tomate, cebolla, salsa y crema agria.","Pollo a la parrilla con sazÃ³n estilo Key West.","Ensalada de atÃºn, cheddar y pan parmesano sourdough.","Salsa Bucket dulce/picante, tocino y cheddar.","CamarÃ³n a la parrilla/ennegrecido/frito, salsa y aioli de cilantro.","Pescado blanco a la parrilla/ennegrecido/frito, salsa y aioli.","Hamburguesa sazonada de 1/2 lb con lechuga, tomate, cebolla y pepinillos.","Pescado blanco frito con tÃ¡rtara y vinagre de malta.","Camarones grandes empanizados, salsa cÃ³ctel o tÃ¡rtara.","Pescado a la parrilla/ennegrecido/frito con lechuga, tomate y tÃ¡rtara."]}},v=new Map;async function S(e,s){if(!s||e==="en")return s;const t=`${e}::${s}`;if(v.has(t))return v.get(t);try{const l=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${e}&dt=t&q=${encodeURIComponent(s)}`,r=((await(await fetch(l)).json())?.[0]||[]).map(u=>u?.[0]||"").join("")||s;return v.set(t,r),r}catch{return s}}async function L(e){const s=$[e]||$.en;document.querySelectorAll("[data-i18n]").forEach(i=>{const r=i.dataset.i18n;s[r]&&(r.startsWith("hours.")||r.startsWith("faq.")?i.innerHTML=s[r]:i.textContent=s[r])});const t=[...document.querySelectorAll("[data-menu-name]")],l=[...document.querySelectorAll("[data-menu-desc]")];await Promise.all(t.map(async i=>{const r=Number(i.dataset.menuName),u=q[e]?.names?.[r];i.textContent=u||(e==="en"?M[r]:await S(e,M[r]))})),await Promise.all(l.map(async i=>{const r=Number(i.dataset.menuDesc),u=q[e]?.descs?.[r];i.textContent=u||(e==="en"?F[r]:await S(e,F[r]))}));const n=[...document.querySelectorAll('.menu-section-title[data-i18n^="menu.section."]')];await Promise.all(n.map(async i=>{const r=i.dataset.i18n,u=r.replace("menu.section.","");i.textContent=s[r]||(e==="en"?u:await S(e,u))}))}const Q=document.getElementById("langSelect");Q?.addEventListener("change",async e=>L(e.target.value));L("en");document.querySelectorAll("video.cloud-video").forEach(e=>{const s=parseFloat(e.dataset.rate||"0.5");e.playbackRate=s,e.addEventListener("loadedmetadata",()=>{e.playbackRate=s})});function z(e,s,t){if(!s)return;const l=[...s.querySelectorAll(".ds-card")];if(l.length===0)return;const n=l.length,i=e.querySelector(".ds-prev"),r=e.querySelector(".ds-next"),u=l.map(o=>o.querySelector("img")?.alt||"");let h=0;const G=o=>{let c=o-h;const d=n/2;return c>d?c-=n:c<=-d&&(c+=n),c},k=()=>{l.forEach((o,c)=>{const d=G(c);o.classList.remove("is-active","is-near-left","is-near-right","is-far-left","is-far-right","is-deep-left","is-deep-right","is-hidden"),d===0?o.classList.add("is-active"):d===-1?o.classList.add("is-near-left"):d===1?o.classList.add("is-near-right"):d===-2?o.classList.add("is-far-left"):d===2?o.classList.add("is-far-right"):d===-3?o.classList.add("is-deep-left"):d===3?o.classList.add("is-deep-right"):o.classList.add("is-hidden"),o.setAttribute("aria-hidden",d===0?"false":"true")}),t&&(t.textContent=`${h+1} / ${n}  ·  ${u[h]}`)},p=o=>{h=((h+o)%n+n)%n,k()};i?.addEventListener("click",()=>p(-1)),r?.addEventListener("click",()=>p(1)),l.forEach(o=>{o.addEventListener("click",()=>{const c=Number(o.dataset.i);c!==h&&(h=c,k())})}),document.addEventListener("keydown",o=>{const c=s.getBoundingClientRect();c.bottom<0||c.top>window.innerHeight||(o.key==="ArrowLeft"&&(o.preventDefault(),p(-1)),o.key==="ArrowRight"&&(o.preventDefault(),p(1)))});let f=null;s.addEventListener("touchstart",o=>{f=o.touches[0].clientX},{passive:!0}),s.addEventListener("touchend",o=>{if(f==null)return;const c=o.changedTouches[0].clientX-f;Math.abs(c)>40&&p(c<0?1:-1),f=null},{passive:!0}),k()}z(document.querySelector(".dish-stack-section .dish-stack-stage"),document.getElementById("dishStack"),document.getElementById("dishStackMeta"));z(document.getElementById("drinkStackStage"),document.getElementById("drinkStack"),document.getElementById("drinkStackMeta"));const x=document.querySelectorAll(".menu-section, .item-row, .gallery-card, .dish-slide, .feature-grid article, .pdf-links, .contact");x.forEach(e=>e.classList.add("reveal"));const D=new IntersectionObserver(e=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("show"),D.unobserve(s.target))})},{threshold:.08});x.forEach(e=>D.observe(e));const y=document.getElementById("lightbox"),j=document.getElementById("lightboxImg"),H=document.getElementById("closeLightbox");document.querySelectorAll(".item-thumb-btn, .item-name-btn, .gallery-open").forEach(e=>{e.addEventListener("click",()=>{j.src=e.dataset.img,j.alt=e.dataset.name,y.hidden=!1,H.focus()})});const P=document.querySelectorAll(".chip"),Y=document.querySelectorAll(".gallery-card");P.forEach(e=>{e.addEventListener("click",()=>{P.forEach(t=>t.classList.remove("is-active")),e.classList.add("is-active");const s=e.dataset.filter;Y.forEach(t=>{t.style.display=s==="all"||t.dataset.category===s?"":"none"})})});H.addEventListener("click",()=>y.hidden=!0);y.addEventListener("click",e=>{e.target.dataset.close==="true"&&(y.hidden=!0)});const I=document.querySelectorAll(".gift-amount-btn"),B=document.getElementById("giftAmount"),b=document.getElementById("giftSubmit");function J(e){if(B&&(B.value=String(e)),I.forEach(s=>{const t=s.dataset.amount===String(e);s.classList.toggle("is-active",t),s.setAttribute("aria-checked",t?"true":"false")}),b){const s=`Purchase $${e} Gift Card`,t=b.querySelector("svg");b.textContent=s+" ",t&&b.appendChild(t)}}I.forEach(e=>{e.addEventListener("click",()=>J(e.dataset.amount))});const E=document.querySelector(".gift-form");E&&E.addEventListener("submit",e=>{e.preventDefault();const s=B?.value||"25",t=document.getElementById("giftName")?.value||"",l=document.getElementById("giftEmail")?.value||"",n=document.getElementById("giftMessage")?.value||"",i=encodeURIComponent(`Beach Bucket gift card — $${s}`),r=encodeURIComponent(`Recipient: ${t}
Email: ${l}
Amount: $${s}
Message: ${n}
`);window.location.href=`mailto:beachbucketob@gmail.com?subject=${i}&body=${r}`});
