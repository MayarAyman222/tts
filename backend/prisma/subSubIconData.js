const DEFAULT_IMAGE_URL = "/public/default.jpg";

const createGroup = (category, parentTitle, items) =>
  items.map((item) => ({
    category,
    parentTitle,
    title: item.title,
    expression: item.expression,
    imageUrl: item.imageUrl || DEFAULT_IMAGE_URL,
    audioUrl: item.audioUrl,
  }));

const breakfastBreadChoices = createGroup("Breakfast", "خبز", [
  { title: "عيش بلدي", expression: "أريد عيش بلدي", imageUrl: "/public/Food and Drink/esh_baladi.png", audioUrl: "/public/recordss/esh_baladi.m4a" },
  { title: "عيش فينو", expression: "أريد عيش فينو", imageUrl: "/public/Food and Drink/esh_fino.png", audioUrl: "/public/recordss/esh_fino.m4a" },
  { title: "عيش شامي", expression: "أريد عيش شامي", imageUrl: "/public/Food and Drink/esh_shamy.png", audioUrl: "/public/recordss/esh_shamy.m4a" },
  { title: "توست", expression: "أريد توست", imageUrl: "/public/Food and Drink/toast.png", audioUrl: "/public/recordss/toast.m4a" },
]);

const breakfastEggChoices = createGroup("Breakfast", "بيض", [
  { title: "أومليت", expression: "أريد بيض أومليت", imageUrl: "/public/Food and Drink/egg_omlet.png", audioUrl: "/public/recordss/egg_omlet.m4a" },
  { title: "بيض مسلوق", expression: "أريد بيض مسلوق", imageUrl: "/public/Food and Drink/eggs_maslo2.png", audioUrl: "/public/recordss/eggs_maslo2.m4a" },
  { title: "بيض مقلي", expression: "أريد بيض مقلي", imageUrl: "/public/Food and Drink/egg_m2ly.png", audioUrl: "/public/recordss/egg_m2ly.m4a" },
]);

const breakfastCheeseChoices = createGroup("Breakfast", "جبن", [
  { title: "جبنة رومي", expression: "أريد جبنة رومي", imageUrl: "/public/Food and Drink/gebna_romy.png", audioUrl: "/public/recordss/gebna_romy.m4a" },
  { title: "جبنة بيضاء", expression: "أريد جبنة بيضاء", imageUrl: "/public/Food and Drink/gebna_beda.png", audioUrl: "/public/recordss/gebna_beda.m4a" },
  { title: "جبنة شيدر", expression: "أريد جبنة شيدر", imageUrl: "/public/Food and Drink/cheese_cheddar.png", audioUrl: "/public/recordss/cheese_cheddar.m4a" },
  { title: "جبنة مثلثات", expression: "أريد جبنة مثلثات", imageUrl: "/public/Food and Drink/triangle_cheese.png", audioUrl: "/public/recordss/triangle_cheese.m4a" },
]);

const breakfastMilkChoices = createGroup("Breakfast", "حليب", [
  { title: "لبن رايب", expression: "أريد لبن رايب", imageUrl: "/public/Food and Drink/rayeb_milk.png", audioUrl: "/public/recordss/rayeb_milk.m4a" },
  { title: "لبن كامل الدسم", expression: "أريد لبن كامل الدسم", imageUrl: "/public/Food and Drink/full_fat_milk.png", audioUrl: "/public/recordss/full_fat_milk.m4a" },
  { title: "لبن قليل الدسم", expression: "أريد لبن قليل الدسم", imageUrl: "/public/Food and Drink/low_fat_milk.png", audioUrl: "/public/recordss/low_fat_milk.m4a" },
  { title: "لبن بالشوكولاتة", expression: "أريد لبن بالشوكولاتة", imageUrl: "/public/Food and Drink/chocolate_milk.png", audioUrl: "/public/recordss/chocolate_milk.m4a" },
]);

const breakfastCoffeeChoices = createGroup("Breakfast", "قهوة", [
  { title: "قهوة سادة", expression: "أريد قهوة سادة", imageUrl: "/public/Food and Drink/dark_coffee.png", audioUrl: "/public/recordss/dark_coffee.m4a" },
  { title: "قهوة بلبن", expression: "أريد قهوة بلبن", imageUrl: "/public/Food and Drink/coffee_with_milk.png", audioUrl: "/public/recordss/coffee_with_milk.m4a" },
  { title: "نسكافيه", expression: "أريد نسكافيه", imageUrl: "/public/Food and Drink/nescafee.png", audioUrl: "/public/recordss/nescafee.m4a" },
]);

const breakfastTeaChoices = createGroup("Breakfast", "شاي", [
  { title: "شاي بلبن", expression: "أريد شاي بلبن", imageUrl: "/public/Food and Drink/milk_tea.png", audioUrl: "/public/recordss/milk_tea.m4a" },
  { title: "شاي أخضر", expression: "أريد شاي أخضر", imageUrl: "/public/Food and Drink/green_tea.png", audioUrl: "/public/recordss/green_tea.m4a" },
  { title: "شاي أحمر", expression: "أريد شاي أحمر", imageUrl: "/public/Food and Drink/red_tea.png", audioUrl: "/public/recordss/red_tea.m4a" },
]);

const breakfastJuiceChoices = createGroup("Breakfast", "عصير", [
  { title: "عصير برتقال", expression: "أريد عصير برتقال", imageUrl: "/public/Food and Drink/orange.png", audioUrl: "/public/recordss/orange.m4a" },
  { title: "عصير مانجو", expression: "أريد عصير مانجو", imageUrl: "/public/Food and Drink/mango.png", audioUrl: "/public/recordss/mango.m4a" },
  { title: "عصير جوافة", expression: "أريد عصير جوافة", imageUrl: "/public/Food and Drink/gwafa.png", audioUrl: "/public/recordss/gwafa.m4a" },
]);

const breakfastBeansChoices = createGroup("Breakfast", "فول", [
  { title: "فول سادة", expression: "أريد فول سادة", imageUrl: "/public/Food and Drink/vegetableszz.png", audioUrl: "/public/recordss/vegetableszz.m4a" },
  { title: "فول بالزيت", expression: "أريد فول بالزيت", imageUrl: "/public/Food and Drink/vegetablessz.png", audioUrl: "/public/recordss/vegetablessz.m4a" },
  { title: "فول بالطحينة", expression: "أريد فول بالطحينة", imageUrl: "/public/Food and Drink/133.png", audioUrl: "/public/recordss/133.m4a" },
]);

const breakfastFruitChoices = createGroup("Breakfast", "فواكه", [
  { title: "تفاح", expression: "أريد تفاح", imageUrl: "/public/Food and Drink/apple.png", audioUrl: "/public/recordss/apple.m4a" },
  { title: "موز", expression: "أريد موز", imageUrl: "/public/Food and Drink/mozz.png", audioUrl: "/public/recordss/mozz.m4a" },
  { title: "بلح", expression: "أريد بلح", imageUrl: "/public/Food and Drink/11.png", audioUrl: "/public/recordss/11.m4a" },
]);

const breakfastCerealChoices = createGroup("Breakfast", "حبوب إفطار", [
  { title: "كورن فليكس", expression: "أريد كورن فليكس", imageUrl: "/public/Food and Drink/cereal.png", audioUrl: "/public/recordss/cereal.m4a" },
  { title: "حبوب شوكولاتة", expression: "أريد حبوب شوكولاتة", imageUrl: "/public/Food and Drink/chocolateee.png", audioUrl: "/public/recordss/chocolateee.m4a" },
  { title: "شوفان", expression: "أريد شوفان", imageUrl: "/public/Food and Drink/oats.png", audioUrl: "/public/recordss/oats.m4a" },
]);

const breakfastHoneyChoices = createGroup("Breakfast", "عسل", [
  { title: "عسل أبيض", expression: "أريد عسل أبيض", imageUrl: "/public/Food and Drink/White Honey.png", audioUrl: "/public/recordss/White_Honey.m4a" },
  { title: "عسل أسود", expression: "أريد عسل أسود", imageUrl: "/public/Food and Drink/Black Honey.png", audioUrl: "/public/recordss/Black_Honey.m4a" },
]);

const lunchRiceChoices = createGroup("Lunch", "أرز", [
  { title: "أرز أبيض", expression: "أريد أرز أبيض", imageUrl: "/public/Food and Drink/White_Rice.png", audioUrl: "/public/recordss/White_Rice.m4a" },
  { title: "أرز بالخضار", expression: "أريد أرز بالخضار", imageUrl: "/public/Food and Drink/rice.png", audioUrl: "/public/recordss/rice.m4a" },
  { title: "أرز بالفراخ", expression: "أريد أرز بالفراخ", imageUrl: "/public/Food and Drink/frahkkk.png", audioUrl: "/public/recordss/frahkkk.m4a" },
]);

const lunchPastaChoices = createGroup("Lunch", "مكرونة", [
  { title: "مكرونة بالصلصة", expression: "أريد مكرونة بالصلصة", imageUrl: "/public/Food and Drink/pasta.png", audioUrl: "/public/recordss/pasta.m4a" },
  { title: "مكرونة بشاميل", expression: "أريد مكرونة بشاميل", imageUrl: "/public/Food and Drink/155.png", audioUrl: "/public/recordss/155.m4a" },
  { title: "مكرونة وايت صوص", expression: "أريد مكرونة وايت صوص", imageUrl: "/public/Food and Drink/pastas.png", audioUrl: "/public/recordss/pastas.m4a" },
]);

const lunchChickenChoices = createGroup("Lunch", "دجاج", [
  { title: "فراخ مشوية", expression: "أريد فراخ مشوية", imageUrl: "/public/Food and Drink/frahkkkkk.png", audioUrl: "/public/recordss/frahkkkkk.m4a" },
  { title: "فراخ مقلية", expression: "أريد فراخ مقلية", imageUrl: "/public/Food and Drink/chicken.png", audioUrl: "/public/recordss/chicken.m4a" },
  { title: "فراخ في الفرن", expression: "أريد فراخ في الفرن", imageUrl: "/public/Food and Drink/frahkkkkkkkkkkk.png", audioUrl: "/public/recordss/frahkkkkkkkkkkk.m4a" },
]);

const lunchMeatChoices = createGroup("Lunch", "لحم", [
  { title: "كفتة", expression: "أريد كفتة", imageUrl: "/public/Food and Drink/kofta.png", audioUrl: "/public/recordss/kofta.m4a" },
  { title: "ستيك", expression: "أريد ستيك", imageUrl: "/public/talk/meat.png", audioUrl: "/public/recordss/meat.m4a" },
  { title: "لحمة مفرومة", expression: "أريد لحمة مفرومة", imageUrl: "/public/Food and Drink/meat.png", audioUrl: "/public/recordss/meat.m4a" },
]);

const lunchFishChoices = createGroup("Lunch", "سمك", [
  { title: "سمك مشوي", expression: "أريد سمك مشوي", imageUrl: "/public/Food and Drink/grilled_fish.png", audioUrl: "/public/recordss/grilled_fish.m4a" },
  { title: "سمك مقلي", expression: "أريد سمك مقلي", imageUrl: "/public/Food and Drink/fried_fish.png", audioUrl: "/public/recordss/fried_fish.m4a" },
  { title: "فيليه سمك", expression: "أريد فيليه سمك", imageUrl: "/public/Food and Drink/fillet_fish.png", audioUrl: "/public/recordss/fillet_fish.m4a" },
]);

const lunchSaladChoices = createGroup("Lunch", "سلطة", [
  { title: "سلطة خضراء", expression: "أريد سلطة خضراء", imageUrl: "/public/Food and Drink/green_salad.png", audioUrl: "/public/recordss/green_salad.m4a" },
  { title: "سلطة طحينة", expression: "أريد سلطة طحينة", imageUrl: "/public/Food and Drink/tahini_salad.png", audioUrl: "/public/recordss/tahini_salad.m4a" },
  { title: "سلطة زبادي", expression: "أريد سلطة زبادي", imageUrl: "/public/Food and Drink/yogurt_salad.png", audioUrl: "/public/recordss/yogurt_salad.m4a" },
]);

const lunchSoupChoices = createGroup("Lunch", "شوربة", [
  { title: "شوربة عدس", expression: "أريد شوربة عدس", imageUrl: "/public/Food and Drink/lentil_soup.png", audioUrl: "/public/recordss/lentil_soup.m4a" },
  { title: "شوربة فراخ", expression: "أريد شوربة فراخ", imageUrl: "/public/Food and Drink/chicken_soup.png", audioUrl: "/public/recordss/chicken_soup.m4a" },
  { title: "شوربة خضار", expression: "أريد شوربة خضار", imageUrl: "/public/Food and Drink/vegetable_soup.png", audioUrl: "/public/recordss/vegetable_soup.m4a" },
]);

const lunchBreadChoices = createGroup("Lunch", "خبز", [
  { title: "عيش بلدي", expression: "أريد عيش بلدي", imageUrl: "/public/Food and Drink/esh_baladi.png", audioUrl: "/public/recordss/esh_baladi.m4a" },
  { title: "عيش فينو", expression: "أريد عيش فينو", imageUrl: "/public/Food and Drink/esh_fino.png", audioUrl: "/public/recordss/esh_fino.m4a" },
  { title: "عيش شامي", expression: "أريد عيش شامي", imageUrl: "/public/Food and Drink/esh_shamy.png", audioUrl: "/public/recordss/esh_shamy.m4a" },
  { title: "توست", expression: "أريد توست", imageUrl: "/public/Food and Drink/toast.png", audioUrl: "/public/recordss/toast.m4a" },
]);

const lunchJuiceChoices = createGroup("Lunch", "عصير", [
  { title: "عصير برتقال", expression: "أريد عصير برتقال", imageUrl: "/public/Food and Drink/orange.png", audioUrl: "/public/recordss/orange.m4a" },
  { title: "عصير مانجو", expression: "أريد عصير مانجو", imageUrl: "/public/Food and Drink/mango.png", audioUrl: "/public/recordss/mango.m4a" },
  { title: "عصير جوافة", expression: "أريد عصير جوافة", imageUrl: "/public/Food and Drink/gwafa.png", audioUrl: "/public/recordss/gwafa.m4a" },
]);

const dinnerRiceChoices = createGroup("Dinner", "أرز", [
  { title: "أرز أبيض", expression: "أريد أرز أبيض", imageUrl: "/public/Food and Drink/White_Rice.png", audioUrl: "/public/recordss/White_Rice.m4a" },
  { title: "أرز بالخضار", expression: "أريد أرز بالخضار", imageUrl: "/public/Food and Drink/rice.png", audioUrl: "/public/recordss/rice.m4a" },
  { title: "أرز بالفراخ", expression: "أريد أرز بالفراخ", imageUrl: "/public/Food and Drink/frahkkk.png", audioUrl: "/public/recordss/frahkkk.m4a" },
]);

const dinnerPastaChoices = createGroup("Dinner", "مكرونة", [
  { title: "مكرونة بالصلصة", expression: "أريد مكرونة بالصلصة", imageUrl: "/public/Food and Drink/pasta.png", audioUrl: "/public/recordss/pasta.m4a" },
  { title: "مكرونة بشاميل", expression: "أريد مكرونة بشاميل", imageUrl: "/public/Food and Drink/155.png", audioUrl: "/public/recordss/155.m4a" },
  { title: "مكرونة وايت صوص", expression: "أريد مكرونة وايت صوص", imageUrl: "/public/Food and Drink/pastas.png", audioUrl: "/public/recordss/pastas.m4a" },
]);

const dinnerChickenChoices = createGroup("Dinner", "دجاج", [
  { title: "فراخ مشوية", expression: "أريد فراخ مشوية", imageUrl: "/public/Food and Drink/frahkkkkk.png", audioUrl: "/public/recordss/frahkkkkk.m4a" },
  { title: "فراخ مقلية", expression: "أريد فراخ مقلية", imageUrl: "/public/Food and Drink/chicken.png", audioUrl: "/public/recordss/chicken.m4a" },
  { title: "فراخ في الفرن", expression: "أريد فراخ في الفرن", imageUrl: "/public/Food and Drink/frahkkkkkkkkkkk.png", audioUrl: "/public/recordss/frahkkkkkkkkkkk.m4a" },
]);

const dinnerMeatChoices = createGroup("Dinner", "لحم", [
  { title: "كفتة", expression: "أريد كفتة", imageUrl: "/public/Food and Drink/kofta.png", audioUrl: "/public/recordss/kofta.m4a" },
  { title: "ستيك", expression: "أريد ستيك", imageUrl: "/public/talk/meat.png", audioUrl: "/public/recordss/meat.m4a" },
  { title: "لحمة مفرومة", expression: "أريد لحمة مفرومة", imageUrl: "/public/Food and Drink/meat.png", audioUrl: "/public/recordss/meat.m4a" },
]);

const dinnerFishChoices = createGroup("Dinner", "سمك", [
  { title: "سمك مشوي", expression: "أريد سمك مشوي", imageUrl: "/public/Food and Drink/grilled_fish.png", audioUrl: "/public/recordss/grilled_fish.m4a" },
  { title: "سمك مقلي", expression: "أريد سمك مقلي", imageUrl: "/public/Food and Drink/fried_fish.png", audioUrl: "/public/recordss/fried_fish.m4a" },
  { title: "فيليه سمك", expression: "أريد فيليه سمك", imageUrl: "/public/Food and Drink/fillet_fish.png", audioUrl: "/public/recordss/fillet_fish.m4a" },
]);

const dinnerSaladChoices = createGroup("Dinner", "سلطة", [
  { title: "سلطة خضراء", expression: "أريد سلطة خضراء", imageUrl: "/public/Food and Drink/green_salad.png", audioUrl: "/public/recordss/green_salad.m4a" },
  { title: "سلطة طحينة", expression: "أريد سلطة طحينة", imageUrl: "/public/Food and Drink/tahini_salad.png", audioUrl: "/public/recordss/tahini_salad.m4a" },
  { title: "سلطة زبادي", expression: "أريد سلطة زبادي", imageUrl: "/public/Food and Drink/yogurt_salad.png", audioUrl: "/public/recordss/yogurt_salad.m4a" },
]);

const dinnerSoupChoices = createGroup("Dinner", "شوربة", [
  { title: "شوربة عدس", expression: "أريد شوربة عدس", imageUrl: "/public/Food and Drink/lentil_soup.png", audioUrl: "/public/recordss/lentil_soup.m4a" },
  { title: "شوربة فراخ", expression: "أريد شوربة فراخ", imageUrl: "/public/Food and Drink/chicken_soup.png", audioUrl: "/public/recordss/chicken_soup.m4a" },
  { title: "شوربة خضار", expression: "أريد شوربة خضار", imageUrl: "/public/Food and Drink/vegetable_soup.png", audioUrl: "/public/recordss/vegetable_soup.m4a" },
]);

const dinnerBreadChoices = createGroup("Dinner", "خبز", [
  { title: "عيش بلدي", expression: "أريد عيش بلدي", imageUrl: "/public/Food and Drink/esh_baladi.png", audioUrl: "/public/recordss/esh_baladi.m4a" },
  { title: "عيش فينو", expression: "أريد عيش فينو", imageUrl: "/public/Food and Drink/esh_fino.png", audioUrl: "/public/recordss/esh_fino.m4a" },
  { title: "عيش شامي", expression: "أريد عيش شامي", imageUrl: "/public/Food and Drink/esh_shamy.png", audioUrl: "/public/recordss/esh_shamy.m4a" },
  { title: "توست", expression: "أريد توست", imageUrl: "/public/Food and Drink/toast.png", audioUrl: "/public/recordss/toast.m4a" },
]);

const dinnerJuiceChoices = createGroup("Dinner", "عصير", [
  { title: "عصير برتقال", expression: "أريد عصير برتقال", imageUrl: "/public/Food and Drink/orange.png", audioUrl: "/public/recordss/orange.m4a" },
  { title: "عصير مانجو", expression: "أريد عصير مانجو", imageUrl: "/public/Food and Drink/mango.png", audioUrl: "/public/recordss/mango.m4a" },
  { title: "عصير جوافة", expression: "أريد عصير جوافة", imageUrl: "/public/Food and Drink/gwafa.png", audioUrl: "/public/recordss/gwafa.m4a" },
]);

const snackChipsChoices = createGroup("Snack", "رقائق", [
  { title: "شيبسي جبنة", expression: "أريد شيبسي جبنة", imageUrl: "/public/Food and Drink/cheese_chips.png", audioUrl: "/public/recordss/cheese_chips.m4a" },
  { title: "شيبسي حار", expression: "أريد شيبسي حار", imageUrl: "/public/Food and Drink/chili_chips.png", audioUrl: "/public/recordss/chili_chips.m4a" },
  { title: "شيبسي ملح", expression: "أريد شيبسي ملح", imageUrl: "/public/Food and Drink/salted_chips.png", audioUrl: "/public/recordss/salted_chips.m4a" },
]);

const snackCookieChoices = createGroup("Snack", "كوكيز", [
  { title: "كوكيز شوكولاتة", expression: "أريد كوكيز شوكولاتة", imageUrl: "/public/Food and Drink/chocolate_cookies.png", audioUrl: "/public/recordss/chocolate_cookies.m4a" },
  { title: "كوكيز فانيليا", expression: "أريد كوكيز فانيليا", imageUrl: "/public/Food and Drink/vanilla_cookies.png", audioUrl: "/public/recordss/vanilla_cookies.m4a" },
  { title: "بسكويت", expression: "أريد بسكويت", imageUrl: "/public/Food and Drink/biscuits.png", audioUrl: "/public/recordss/biscuits.m4a" },
]);

const snackChocolateChoices = createGroup("Snack", "شوكولاتة", [
  { title: "شوكولاتة دارك", expression: "أريد شوكولاتة دارك", imageUrl: "/public/Food and Drink/dark_chocolate.png", audioUrl: "/public/recordss/dark_chocolate.m4a" },
  { title: "شوكولاتة بالحليب", expression: "أريد شوكولاتة بالحليب", imageUrl: "/public/Food and Drink/milk_chocolate.png", audioUrl: "/public/recordss/milk_chocolate.m4a" },
  { title: "شوكولاتة ويفر", expression: "أريد شوكولاتة ويفر", imageUrl: "/public/Food and Drink/wafer_chocolate.png", audioUrl: "/public/recordss/wafer_chocolate.m4a" },
]);

const snackFruitChoices = createGroup("Snack", "فواكه", [
  { title: "تفاح", expression: "أريد تفاح", imageUrl: "/public/Food and Drink/apple.png", audioUrl: "/public/recordss/apple.m4a" },
  { title: "موز", expression: "أريد موز", imageUrl: "/public/Food and Drink/mozz.png", audioUrl: "/public/recordss/mozz.m4a" },
  { title: "فراولة", expression: "أريد فراولة", imageUrl: "/public/Food and Drink/frawla.png", audioUrl: "/public/recordss/frawla.m4a" },
]);

const snackNutChoices = createGroup("Snack", "مكسرات", [
  { title: "فول سوداني", expression: "أريد فول سوداني", imageUrl: "/public/Food and Drink/peanuts.png", audioUrl: "/public/recordss/peanuts.m4a" },
  { title: "لوز", expression: "أريد لوز", imageUrl: "/public/Food and Drink/lmonds.png", audioUrl: "/public/recordss/lmonds.m4a" },
  { title: "كاجو", expression: "أريد كاجو", imageUrl: "/public/Food and Drink/cashews.png", audioUrl: "/public/recordss/cashews.m4a" },
]);

const snackYogurtChoices = createGroup("Snack", "زبادي", [
  { title: "زبادي سادة", expression: "أريد زبادي سادة", imageUrl: "/public/Food and Drink/zbady.png", audioUrl: "/public/recordss/zbady.m4a" },
  { title: "زبادي فراولة", expression: "أريد زبادي فراولة", imageUrl: "/public/Food and Drink/frawla.png", audioUrl: "/public/recordss/frawla.m4a" },
  { title: "زبادي بالعسل", expression: "أريد زبادي بالعسل", imageUrl: "/public/Food and Drink/asl.png", audioUrl: "/public/recordss/asl.m4a" },
]);

const snackSandwichChoices = createGroup("Snack", "ساندوتش", [
  { title: "ساندوتش جبنة", expression: "أريد ساندوتش جبنة", imageUrl: "/public/Food and Drink/sandwich.png", audioUrl: "/public/recordss/sandwich.m4a" },
  { title: "ساندوتش مربى", expression: "أريد ساندوتش مربى", imageUrl: "/public/Food and Drink/marba.png", audioUrl: "/public/recordss/marba.m4a" },
  { title: "ساندوتش عسل", expression: "أريد ساندوتش عسل", imageUrl: "/public/Food and Drink/asl.png", audioUrl: "/public/recordss/asl.m4a" },
]);

const snackJuiceChoices = createGroup("Snack", "عصير", [
  { title: "عصير برتقال", expression: "أريد عصير برتقال", imageUrl: "/public/Food and Drink/orange.png", audioUrl: "/public/recordss/orange.m4a" },
  { title: "عصير مانجو", expression: "أريد عصير مانجو", imageUrl: "/public/Food and Drink/mango.png", audioUrl: "/public/recordss/mango.m4a" },
  { title: "عصير تفاح", expression: "أريد عصير تفاح", imageUrl: "/public/Food and Drink/apple.png", audioUrl: "/public/recordss/apple.m4a" },
]);

const snackTeaChoices = createGroup("Snack", "شاي", [
  { title: "شاي بلبن", expression: "أريد شاي بلبن", imageUrl: "/public/Food and Drink/milk_tea.png", audioUrl: "/public/recordss/milk_tea.m4a" },
  { title: "شاي أخضر", expression: "أريد شاي أخضر", imageUrl: "/public/Food and Drink/green_tea.png", audioUrl: "/public/recordss/green_tea.m4a" },
  { title: "شاي أحمر", expression: "أريد شاي أحمر", imageUrl: "/public/Food and Drink/red_tea.png", audioUrl: "/public/recordss/red_tea.m4a" },
]);

const snackCoffeeChoices = createGroup("Snack", "قهوة", [
  { title: "قهوة سادة", expression: "أريد قهوة سادة", imageUrl: "/public/Food and Drink/dark_coffee.png", audioUrl: "/public/recordss/dark_coffee.m4a" },
  { title: "قهوة بلبن", expression: "أريد قهوة بلبن", imageUrl: "/public/Food and Drink/coffee_with_milk.png", audioUrl: "/public/recordss/coffee_with_milk.m4a" },
  { title: "نسكافيه", expression: "أريد نسكافيه", imageUrl: "/public/Food and Drink/nescafee.png", audioUrl: "/public/recordss/nescafee.m4a" },
  { title: "قهوة مثلجة", expression: "أريد قهوة مثلجة", imageUrl: "/public/Food and Drink/iced_coffee.png", audioUrl: "/public/recordss/iced_coffee.m4a" },
]);
const familyMotherChoices = createGroup("Family", "أم", [
  { title: "جدة من ناحية الأم", expression: "هذه جدتي مروة", imgUrl: "/public/Family/mothers_mother.png" },
  { title: "جد من ناحية الأم", expression: "هذا جدي أحمد", imgUrl: "/public/Family/mothers_father.png" },
  { title: "خالة", expression: "هذه خالتي دعاد", imgUrl: "/public/Family/mothers_sister.png" },
  { title: "خال", expression: "هذا خالي محمد", imgUrl: "/public/Family/mothers_brother.png" },
]);

const familyFatherChoices = createGroup("Family", "أب", [
  { title: "جدة من ناحية الأب", expression: "هذه جدتي أمل", imgUrl: "/public/Family/fathers_mother.png" },
  { title: "جد من ناحية الأب", expression: "هذا جدي حسن", imgUrl: "/public/Family/fathers_father.png" },
  { title: "عمة", expression: "هذه عمتي سلمى", imgUrl: "/public/Family/fathers_sister.png" },
  { title: "عم", expression: "هذا عمي علي", imgUrl: "/public/Family/fathers_brother.png" },
]);

const familyBrotherChoices = createGroup("Family", "أخ", [
  { title: "أخ كبير", expression: "هذا أخي الكبير عمر", imgUrl: "/public/Family/793.png" },
  { title: "أخ صغير", expression: "هذا أخي الصغير يوسف", imgUrl: "/public/Family/993.png" },
  { title: "أخ توأم", expression: "هذا أخي التوأم آدم", imgUrl: "/public/Family/663.png" },
]);

const familySisterChoices = createGroup("Family", "أخت", [
  { title: "أخت كبيرة", expression: "هذه أختي الكبيرة جنى", imgUrl: "/public/Family/5.png" },
  { title: "أخت صغيرة", expression: "هذه أختي الصغيرة فرح", imgUrl: "/public/Family/1.png" },
  { title: "أخت توأم", expression: "هذه أختي التوأم ملك", imgUrl: "/public/Family/10.png" },
]);

const familyGrandfatherChoices = createGroup("Family", "جد", [
  { title: "جد لأمي", expression: "هذا جدي أحمد", imgUrl: "/public/Family/2.png" },
  { title: "جد لأبي", expression: "هذا جدي حسن", imgUrl: "/public/Family/4.png" },
]);

const familyGrandmotherChoices = createGroup("Family", "جدة", [
  { title: "جدة لأمي", expression: "هذه جدتي مروة", imgUrl: "/public/Family/10.png" },
  { title: "جدة لأبي", expression: "هذه جدتي أمل", imgUrl: "/public/Family/3.png" },
]);

const familyUncleChoices = createGroup("Family", "عم", [
  { title: "عم", expression: "هذا عمي علي", imgUrl: "/public/Family/4.png" },
  { title: "خال", expression: "هذا خالي محمد", imgUrl: "/public/Family/6.png" },
]);

const familyAuntChoices = createGroup("Family", "عمة", [
  { title: "عمة", expression: "هذه عمتي سلمى", imgUrl: "/public/Family/3.png" },
  { title: "خالة", expression: "هذه خالتي دعاد", imgUrl: "/public/Family/5.png" },
]);

const familyCousinChoices = createGroup("Family", "ابن/بنت العم", [
  { title: "ابن عم", expression: "هذا ابن عمي كريم", imgUrl: "/public/Family/9.png" },
  { title: "بنت عم", expression: "هذه بنت عمي نور", imgUrl: "/public/Family/1.png" },
  { title: "ابن خال", expression: "هذا ابن خالي زياد", imgUrl: "/public/Family/7.png" },
]);

const familyBabyChoices = createGroup("Family", "طفل", [
  { title: "ولد صغير", expression: "هذا الطفل تيمو", imgUrl: "/public/Family/8.png" },
  { title: "بنت صغيرة", expression: "هذه الطفلة لولو", imgUrl: "/public/Family/9.png" },
]);
const feelingsHappyChoices = createGroup("Feelings", "سعيد", [
  { title: "سعيد مع العائلة", expression: "أنا سعيد مع عائلتي", imageUrl: "/public/icons/Family.png", audioUrl: "/public/recordss/Family.m4a" },
  { title: "سعيد لأني لعبت", expression: "أنا سعيد لأني لعبت", imageUrl: "/public/icons/Play.png", audioUrl: "/public/recordss/Play.m4a" },
  { title: "سعيد لأني أكلت", expression: "أنا سعيد لأني أكلت", imageUrl: "/public/icons/Eating.png", audioUrl: "/public/recordss/Eating.m4a" },
]);

const feelingsAngryChoices = createGroup("Feelings", "غاضب", [
  { title: "غاضب من الصوت", expression: "أنا غاضب بسبب الصوت", imageUrl: "/public/listen/Alert.png", audioUrl: "/public/recordss/Alert.m4a" },
  { title: "غاضب من الانتظار", expression: "أنا غاضب من الانتظار", imageUrl: "/public/Questions/time.png", audioUrl: "/public/recordss/time.m4a" },
  { title: "غاضب من شخص", expression: "أنا غاضب من شخص", imageUrl: "/public/talk/Conversation.png", audioUrl: "/public/recordss/Conversation.m4a" },
]);

const feelingsAfraidChoices = createGroup("Feelings", "خائف", [
  { title: "خائف من الحشرات", expression: "أنا خائف من الحشرات", imageUrl: "/public/Animals/7shraat.png", audioUrl: "/public/recordss/7shraat.m4a" },
  { title: "خائف من الظلام", expression: "أنا خائف من الظلام", imageUrl: "/public/sleeping/night-lamp.png", audioUrl: "/public/recordss/night_lamp.m4a" },
  { title: "خائف من الصوت العالي", expression: "أنا خائف من الصوت العالي", imageUrl: "/public/listen/Alert.png", audioUrl: "/public/recordss/Alert.m4a" },
  { title: "خائف من الكلاب", expression: "أنا خائف من الكلاب", imageUrl: "/public/Animals/Dog.png", audioUrl: "/public/recordss/Dog.m4a" },
]);

const feelingsTiredChoices = createGroup("Feelings", "متعب", [
  { title: "متعب بعد المدرسة", expression: "أنا متعب بعد المدرسة", imageUrl: "/public/Places/school.png", audioUrl: "/public/recordss/school.m4a" },
  { title: "متعب من المشي", expression: "أنا متعب من المشي", imageUrl: "/public/icons/Walk.png", audioUrl: "/public/recordss/Walk.m4a" },
  { title: "أحتاج أن أنام", expression: "أنا متعب وأحتاج أن أنام", imageUrl: "/public/sleeping/bed.png", audioUrl: "/public/recordss/bed.m4a" },
]);

const feelingsExcitedChoices = createGroup("Feelings", "متحمس", [
  { title: "متحمس للخروج", expression: "أنا متحمس للخروج", imageUrl: "/public/icons/outside.png", audioUrl: "/public/recordss/outside.m4a" },
  { title: "متحمس للعب", expression: "أنا متحمس للعب", imageUrl: "/public/icons/Playy.png", audioUrl: "/public/recordss/Playy.m4a" },
  { title: "متحمس لعيد الميلاد", expression: "أنا متحمس لعيد الميلاد", imageUrl: "/public/icons/Excited.png", audioUrl: "/public/recordss/Excited.m4a" },
]);

const feelingsRelaxedChoices = createGroup("Feelings", "مرتاح", [
  { title: "مرتاح في البيت", expression: "أنا مرتاح في البيت", imageUrl: "/public/Places/home.png", audioUrl: "/public/recordss/home.m4a" },
  { title: "مرتاح مع الموسيقى", expression: "أنا مرتاح مع الموسيقى", imageUrl: "/public/Music/music-notes.png", audioUrl: "/public/recordss/music_notes.m4a" },
  { title: "مرتاح بعد الاستحمام", expression: "أنا مرتاح بعد الاستحمام", imageUrl: "/public/icons/Shower.png", audioUrl: "/public/recordss/Shower.m4a" },
]);

const feelingsAnxiousChoices = createGroup("Feelings", "مضطرب", [
  { title: "قلقان من مكان جديد", expression: "أنا قلقان من مكان جديد", imageUrl: "/public/icons/Places.png", audioUrl: "/public/recordss/Places.m4a" },
  { title: "قلقان من الزحمة", expression: "أنا قلقان من الزحمة", imageUrl: "/public/icons/crowded.png", audioUrl: "/public/recordss/crowded.m4a" },
  { title: "قلقان من الامتحان", expression: "أنا قلقان من الامتحان", imageUrl: "/public/icons/exam.png", audioUrl: "/public/recordss/exam.m4a" },
]);

const feelingsFrustratedChoices = createGroup("Feelings", "محبط", [
  { title: "لا أستطيع الشرح", expression: "أنا محبط لأني لا أستطيع الشرح", imageUrl: "/public/talk/MessageBubble.png", audioUrl: "/public/recordss/MessageBubble.m4a" },
  { title: "الجهاز لا يعمل", expression: "أنا محبط لأن الجهاز لا يعمل", imageUrl: "/public/icons/Computer.png", audioUrl: "/public/recordss/Computer.m4a" },
  { title: "المهمة صعبة", expression: "أنا محبط لأن المهمة صعبة", imageUrl: "/public/icons/task.png", audioUrl: "/public/recordss/task.m4a" },
]);

const feelingsProudChoices = createGroup("Feelings", "فخور", [
  { title: "أنهيت مهمتي", expression: "أنا فخور لأني أنهيت مهمتي", imageUrl: "/public/icons/Yes.png", audioUrl: "/public/recordss/Yes.m4a" },
  { title: "تعلمت شيئًا جديدًا", expression: "أنا فخور لأني تعلمت شيئًا جديدًا", imageUrl: "/public/icons/Read.png", audioUrl: "/public/recordss/Read.m4a" },
  { title: "ساعدت شخصًا", expression: "أنا فخور لأني ساعدت شخصًا", imageUrl: "/public/icons/Friend.png", audioUrl: "/public/recordss/Friend.m4a" },
]);

const schoolReasonChoices = createGroup("places", "المدرسة", [
  { title: "للتعلم", expression: "أريد الذهاب إلى المدرسة للتعلم", imageUrl: "/public/icons/Read.png", audioUrl: "/public/recordss/Read.m4a" },
  { title: "لرؤية أصدقائي", expression: "أريد الذهاب إلى المدرسة لرؤية أصدقائي", imageUrl: "/public/icons/Friend.png", audioUrl: "/public/recordss/Friend.m4a" },
  { title: "لحضور الحصة", expression: "أريد الذهاب إلى المدرسة لحضور الحصة", imageUrl: "/public/talk/Lecture.png", audioUrl: "/public/recordss/Lecture.m4a" },
  { title: "للعب", expression: "أريد الذهاب إلى المدرسة للعب", imageUrl: "/public/icons/Play.png", audioUrl: "/public/recordss/Play.m4a" },
]);

const parkReasonChoices = createGroup("places", "الحديقة", [
  { title: "للعب", expression: "أريد الذهاب إلى الحديقة للعب", imageUrl: "/public/icons/Play.png", audioUrl: "/public/recordss/Play.m4a" },
  { title: "للمشي", expression: "أريد الذهاب إلى الحديقة للمشي", imageUrl: "/public/icons/Walk.png", audioUrl: "/public/recordss/Walk.m4a" },
  { title: "لمقابلة الأصدقاء", expression: "أريد الذهاب إلى الحديقة لمقابلة الأصدقاء", imageUrl: "/public/icons/Friend.png", audioUrl: "/public/recordss/Friend.m4a" },
]);

const homeReasonChoices = createGroup("places", "المنزل", [
  { title: "للراحة", expression: "أريد الذهاب إلى المنزل للراحة", imageUrl: "/public/icons/Relax.png", audioUrl: "/public/recordss/Relax.m4a" },
  { title: "للنوم", expression: "أريد الذهاب إلى المنزل للنوم", imageUrl: "/public/sleeping/bed.png", audioUrl: "/public/recordss/bed.m4a" },
  { title: "لرؤية العائلة", expression: "أريد الذهاب إلى المنزل لرؤية العائلة", imageUrl: "/public/icons/Family.png", audioUrl: "/public/recordss/Family.m4a" },
]);

const hospitalReasonChoices = createGroup("places", "المستشفى", [
  { title: "لرؤية الطبيب", expression: "أريد الذهاب إلى المستشفى لرؤية الطبيب", imageUrl: "/public/icons/Doctor.png", audioUrl: "/public/recordss/Doctor.m4a" },
  { title: "لإحضار دواء", expression: "أريد الذهاب إلى المستشفى لإحضار دواء", imageUrl: "/public/icons/Medicine.png", audioUrl: "/public/recordss/Medicine.m4a" },
  { title: "لزيارة شخص", expression: "أريد الذهاب إلى المستشفى لزيارة شخص", imageUrl: "/public/icons/Friend.png", audioUrl: "/public/recordss/Friend.m4a" },
]);

const supermarketReasonChoices = createGroup("places", "السوبرماركت", [
  { title: "لشراء أكل", expression: "أريد الذهاب إلى السوبرماركت لشراء أكل", imageUrl: "/public/icons/Eating.png", audioUrl: "/public/recordss/Eating.m4a" },
  { title: "لشراء عيش", expression: "أريد الذهاب إلى السوبرماركت لشراء عيش", imageUrl: "/public/Food and Drink/esh.png", audioUrl: "/public/recordss/esh.m4a" },
  { title: "لشراء سناكس", expression: "أريد الذهاب إلى السوبرماركت لشراء سناكس", imageUrl: "/public/icons/Snack.png", audioUrl: "/public/recordss/Snack.m4a" },
]);

const universityReasonChoices = createGroup("places", "الجامعة", [
  { title: "للمذاكرة", expression: "أريد الذهاب إلى الجامعة للمذاكرة", imageUrl: "/public/icons/Read.png", audioUrl: "/public/recordss/Read.m4a" },
  { title: "للمحاضرة", expression: "أريد الذهاب إلى الجامعة للمحاضرة", imageUrl: "/public/talk/Lecture.png", audioUrl: "/public/recordss/Lecture.m4a" },
  { title: "للامتحان", expression: "أريد الذهاب إلى الجامعة للامتحان", imageUrl: "/public/Questions/whichone.png", audioUrl: "/public/recordss/whichone.m4a" },
]);

const workReasonChoices = createGroup("places", "العمل", [
  { title: "للعمل", expression: "أريد الذهاب إلى العمل", imageUrl: "/public/Places/work.png", audioUrl: "/public/recordss/work.m4a" },
  { title: "لمقابلة الزملاء", expression: "أريد الذهاب إلى العمل لمقابلة الزملاء", imageUrl: "/public/icons/Friend.png", audioUrl: "/public/recordss/Friend.m4a" },
  { title: "لإنهاء مهمتي", expression: "أريد الذهاب إلى العمل لإنهاء مهمتي", imageUrl: "/public/icons/Yes.png", audioUrl: "/public/recordss/Yes.m4a" },
]);

const busStationReasonChoices = createGroup("places", "محطة أتوبيس", [
  { title: "للسفر", expression: "أريد الذهاب إلى محطة الأتوبيس للسفر", imageUrl: "/public/Transport/10.png", audioUrl: "/public/recordss/10.m4a" },
  { title: "لركوب الباص", expression: "أريد الذهاب إلى محطة الأتوبيس لركوب الباص", imageUrl: "/public/Transport/5.png", audioUrl: "/public/recordss/5.m4a" },
  { title: "للذهاب إلى البيت", expression: "أريد الذهاب إلى محطة الأتوبيس للذهاب إلى البيت", imageUrl: "/public/Places/home.png", audioUrl: "/public/recordss/home.m4a" },
]);

const transportBusChoices = createGroup("Transport", "باص", [
  { title: "باص إلى المدرسة", expression: "أريد باص إلى المدرسة", imageUrl: "/public/Places/school.png", audioUrl: "/public/recordss/school.m4a" },
  { title: "باص إلى البيت", expression: "أريد باص إلى البيت", imageUrl: "/public/Places/home.png", audioUrl: "/public/recordss/home.m4a" },
  { title: "باص إلى المستشفى", expression: "أريد باص إلى المستشفى", imageUrl: "/public/Places/hospital.png", audioUrl: "/public/recordss/hospital.m4a" },
]);

const transportCarChoices = createGroup("Transport", "سيارة", [
  { title: "سيارة مع بابا", expression: "أريد الذهاب بالسيارة مع بابا", imageUrl: "/public/Family/4.png", audioUrl: "/public/recordss/4.m4a" },
  { title: "سيارة مع ماما", expression: "أريد الذهاب بالسيارة مع ماما", imageUrl: "/public/Family/3.png", audioUrl: "/public/recordss/3.m4a" },
  { title: "سيارة إلى المدرسة", expression: "أريد سيارة إلى المدرسة", imageUrl: "/public/Places/school.png", audioUrl: "/public/recordss/school.m4a" },
]);

const transportTaxiChoices = createGroup("Transport", "تاكسي", [
  { title: "تاكسي إلى البيت", expression: "أريد تاكسي إلى البيت", imageUrl: "/public/Places/home.png", audioUrl: "/public/recordss/home.m4a" },
  { title: "تاكسي إلى المستشفى", expression: "أريد تاكسي إلى المستشفى", imageUrl: "/public/Places/hospital.png", audioUrl: "/public/recordss/hospital.m4a" },
  { title: "تاكسي بسرعة", expression: "أريد تاكسي بسرعة", imageUrl: "/public/Transport/2.png", audioUrl: "/public/recordss/2.m4a" },
]);

const transportTrainChoices = createGroup("Transport", "قطار", [
  { title: "قطار للسفر", expression: "أريد قطارًا للسفر", imageUrl: "/public/Transport/10.png", audioUrl: "/public/recordss/10.m4a" },
  { title: "قطار لزيارة العائلة", expression: "أريد قطارًا لزيارة العائلة", imageUrl: "/public/icons/Family.png", audioUrl: "/public/recordss/Family.m4a" },
  { title: "قطار إلى العمل", expression: "أريد قطارًا إلى العمل", imageUrl: "/public/Places/work.png", audioUrl: "/public/recordss/work.m4a" },
]);

const transportBicycleChoices = createGroup("Transport", "عجلة", [
  { title: "عجلة للعب", expression: "أريد عجلة للعب", imageUrl: "/public/icons/Play.png", audioUrl: "/public/recordss/Play.m4a" },
  { title: "عجلة للرياضة", expression: "أريد عجلة للرياضة", imageUrl: "/public/icons/Walk.png", audioUrl: "/public/recordss/Walk.m4a" },
  { title: "عجلة لمشوار قريب", expression: "أريد عجلة لمشوار قريب", imageUrl: "/public/Transport/1.png", audioUrl: "/public/recordss/1.m4a" },
]);

const transportMotorcycleChoices = createGroup("Transport", "دراجة نارية", [
  { title: "موتوسيكل مع بابا", expression: "أريد ركوب الموتوسيكل مع بابا", imageUrl: "/public/Family/4.png", audioUrl: "/public/recordss/4.m4a" },
  { title: "موتوسيكل بسرعة", expression: "أريد موتوسيكل بسرعة", imageUrl: "/public/Transport/3.png", audioUrl: "/public/recordss/3.m4a" },
]);

const transportAirplaneChoices = createGroup("Transport", "طائرة", [
  { title: "طائرة للسفر", expression: "أريد طائرة للسفر", imageUrl: "/public/Transport/4.png", audioUrl: "/public/recordss/4.m4a" },
  { title: "طائرة للإجازة", expression: "أريد طائرة للإجازة", imageUrl: "/public/Transport/4.png", audioUrl: "/public/recordss/4.m4a" },
  { title: "طائرة لزيارة الأقارب", expression: "أريد طائرة لزيارة الأقارب", imageUrl: "/public/icons/Family.png", audioUrl: "/public/recordss/Family.m4a" },
]);

const transportTramChoices = createGroup("Transport", "ترام", [
  { title: "ترام إلى المدرسة", expression: "أريد ترامًا إلى المدرسة", imageUrl: "/public/Places/school.png", audioUrl: "/public/recordss/school.m4a" },
  { title: "ترام إلى السوق", expression: "أريد ترامًا إلى السوق", imageUrl: "/public/icons/Shopping.png", audioUrl: "/public/recordss/Shopping.m4a" },
  { title: "ترام إلى البيت", expression: "أريد ترامًا إلى البيت", imageUrl: "/public/Places/home.png", audioUrl: "/public/recordss/home.m4a" },
]);

const transportShipChoices = createGroup("Transport", "سفينة", [
  { title: "سفينة للسفر", expression: "أريد سفينة للسفر", imageUrl: "/public/Transport/9.png", audioUrl: "/public/recordss/9.m4a" },
  { title: "سفينة لرحلة", expression: "أريد سفينة لرحلة", imageUrl: "/public/Transport/9.png", audioUrl: "/public/recordss/9.m4a" },
]);

const transportElevatorChoices = createGroup("Transport", "أسانسير", [
  { title: "أطلع فوق", expression: "أريد استخدام الأسانسير لأطلع فوق", imageUrl: "/public/Relations/up.png", audioUrl: "/public/recordss/up.m4a" },
  { title: "أنزل تحت", expression: "أريد استخدام الأسانسير لأنزل تحت", imageUrl: "/public/Relations/down.png", audioUrl: "/public/recordss/down.m4a" },
  { title: "أطلع للشقة", expression: "أريد استخدام الأسانسير لأطلع للشقة", imageUrl: "/public/Places/home.png", audioUrl: "/public/recordss/home.m4a" },
]);

const callMobileChoices = createGroup("Call", "موبايل", [
  { title: "أكلم ماما", expression: "أريد أكلم ماما", imageUrl: "/public/Family/3.png", audioUrl: "/public/recordss/3.m4a" },
  { title: "أكلم بابا", expression: "أريد أكلم بابا", imageUrl: "/public/Family/4.png", audioUrl: "/public/recordss/4.m4a" },
  { title: "أكلم أختي", expression: "أريد أكلم أختي", imageUrl: "/public/Family/1.png", audioUrl: "/public/recordss/1.m4a" },
  { title: "أكلم أخويا", expression: "أريد أكلم أخويا", imageUrl: "/public/Family/7.png", audioUrl: "/public/recordss/7.m4a" },
  { title: "أكلم عمي", expression: "أريد أكلم عمي", imageUrl: "/public/Family/6.png", audioUrl: "/public/recordss/6.m4a" },
  { title: "أكلم خالي", expression: "أريد أكلم خالي", imageUrl: "/public/Family/6.png", audioUrl: "/public/recordss/6.m4a" },
]);

const callVideoChoices = createGroup("Call", "مكالمة فيديو", [
  { title: "فيديو كول لماما", expression: "أريد فيديو كول مع ماما", imageUrl: "/public/Family/3.png", audioUrl: "/public/recordss/3.m4a" },
  { title: "فيديو كول لبابا", expression: "أريد فيديو كول مع بابا", imageUrl: "/public/Family/4.png", audioUrl: "/public/recordss/4.m4a" },
  { title: "فيديو كول لأختي", expression: "أريد فيديو كول مع أختي", imageUrl: "/public/Family/1.png", audioUrl: "/public/recordss/1.m4a" },
  { title: "فيديو كول لصاحبي", expression: "أريد فيديو كول مع صاحبي", imageUrl: "/public/icons/Friend.png", audioUrl: "/public/recordss/Friend.m4a" },
]);

const callLandlineChoices = createGroup("Call", "هاتف أرضي", [
  { title: "أكلم البيت", expression: "أريد أكلم البيت", imageUrl: "/public/Places/home.png", audioUrl: "/public/recordss/home.m4a" },
  { title: "أكلم جدي", expression: "أريد أكلم جدي", imageUrl: "/public/Family/2.png", audioUrl: "/public/recordss/2.m4a" },
  { title: "أكلم جدتي", expression: "أريد أكلم جدتي", imageUrl: "/public/Family/10.png", audioUrl: "/public/recordss/10.m4a" },
]);

const callMessengerChoices = createGroup("Call", "رسائل", [
  { title: "أبعت لماما", expression: "أريد أبعت لماما", imageUrl: "/public/Family/3.png", audioUrl: "/public/recordss/3.m4a" },
  { title: "أبعت لبابا", expression: "أريد أبعت لبابا", imageUrl: "/public/Family/4.png", audioUrl: "/public/recordss/4.m4a" },
  { title: "أبعت لصاحبي", expression: "أريد أبعت لصاحبي", imageUrl: "/public/icons/Friend.png", audioUrl: "/public/recordss/Friend.m4a" },
  { title: "أبعت للجار", expression: "أريد أبعت للجار", imageUrl: "/public/memories/neighborhood.png", audioUrl: "/public/recordss/neighborhood.m4a" },
]);

const callConferenceChoices = createGroup("Call", "مؤتمر", [
  { title: "مكالمة جماعية للعيلة", expression: "أريد مكالمة جماعية للعيلة", imageUrl: "/public/icons/Family.png", audioUrl: "/public/recordss/Family.m4a" },
  { title: "مكالمة جماعية للأصحاب", expression: "أريد مكالمة جماعية للأصحاب", imageUrl: "/public/talk/GroupChat.png", audioUrl: "/public/recordss/GroupChat.m4a" },
]);

const emergencyCallChoices = createGroup("Call", "مكالمة طوارئ", [
  { title: "أكلم الإسعاف", expression: "أريد أكلم الإسعاف", imageUrl: "/public/icons/Doctor.png", audioUrl: "/public/recordss/Doctor.m4a" },
  { title: "أكلم الشرطة", expression: "أريد أكلم الشرطة", imageUrl: "/public/call/DialPad.png", audioUrl: "/public/recordss/DialPad.m4a" },
  { title: "أكلم المطافي", expression: "أريد أكلم المطافي", imageUrl: "/public/listen/Alert.png", audioUrl: "/public/recordss/Alert.m4a" },
  { title: "أكلم الدكتور", expression: "أريد أكلم الدكتور", imageUrl: "/public/icons/Doctor.png", audioUrl: "/public/recordss/Doctor.m4a" },
]);

const showerChoices = createGroup("Bathroom", "استحمام", [
  { title: "فتح الماء", expression: "افتح الماء", imageUrl: "/public/icons/TurnOnWater.png", audioUrl: "/public/recordss/TurnOnWater.m4a" },
  { title: "استخدم الصابون", expression: "استخدم الصابون", imageUrl: "/public/icons/Soap.png", audioUrl: "/public/recordss/Soap.m4a" },
  { title: "غسل الجسم", expression: "اغسل جسمك", imageUrl: "/public/icons/WashBody.png", audioUrl: "/public/recordss/WashBody.m4a" },
  { title: "استخدم المنشفة", expression: "جفف بالمنشفة", imageUrl: "/public/icons/Towel.png", audioUrl: "/public/recordss/Towel.m4a" },
]);

const toiletChoices = createGroup("Bathroom", "المرحاض", [
  { title: "اجلس", expression: "اجلس على المرحاض", imageUrl: "/public/icons/Sit.png", audioUrl: "/public/recordss/Sit.m4a" },
  { title: "اسحب السيفون", expression: "اسحب السيفون", imageUrl: "/public/icons/Flush.png", audioUrl: "/public/recordss/Flush.m4a" },
  { title: "استخدم ورق التواليت", expression: "استخدم ورق التواليت", imageUrl: "/public/icons/ToiletPaper.png", audioUrl: "/public/recordss/ToiletPaper.m4a" },
  { title: "نظف نفسك", expression: "نظف نفسك", imageUrl: "/public/icons/Clean.png", audioUrl: "/public/recordss/Clean.m4a" },
]);

const brushTeethChoices = createGroup("Bathroom", "تنظيف الأسنان", [
  { title: "فرشاة أسنان", expression: "استخدم الفرشاة", imageUrl: "/public/icons/Toothbrush.png", audioUrl: "/public/recordss/Toothbrush.m4a" },
  { title: "معجون أسنان", expression: "ضع المعجون", imageUrl: "/public/icons/Toothpaste.png", audioUrl: "/public/recordss/Toothpaste.m4a" },
  { title: "نظف أسنانك", expression: "نظف أسنانك", imageUrl: "/public/icons/BrushTeeth.png", audioUrl: "/public/recordss/BrushTeeth.m4a" },
  { title: "تمضمض", expression: "تمضمض", imageUrl: "/public/icons/Rinse.png", audioUrl: "/public/recordss/Rinse.m4a" },
]);

const washHandsChoices = createGroup("Bathroom", "غسل اليدين", [
  { title: "فتح الماء", expression: "افتح الماء", imageUrl: "/public/icons/TurnOnWater.png", audioUrl: "/public/recordss/TurnOnWater.m4a" },
  { title: "استخدم الصابون", expression: "استخدم الصابون", imageUrl: "/public/icons/Soap.png", audioUrl: "/public/recordss/Soap.m4a" },
  { title: "اغسل يديك", expression: "اغسل يديك", imageUrl: "/public/icons/WashHands.png", audioUrl: "/public/recordss/WashHands.m4a" },
  { title: "جفف يديك", expression: "جفف يديك", imageUrl: "/public/icons/Towel.png", audioUrl: "/public/recordss/Towel.m4a" },
]);

const leisureSportsChoices = createGroup("Leisure", "رياضة", [
  { title: "كرة قدم", expression: "أريد لعب كرة القدم", imageUrl: "/public/leisure/sports/football.png", audioUrl: "/public/recordss/football.m4a" },
  { title: "كرة سلة", expression: "أريد لعب كرة السلة", imageUrl: "/public/leisure/sports/basketball.png", audioUrl: "/public/recordss/basketball.m4a" },
  { title: "سباحة", expression: "أريد السباحة", imageUrl: "/public/leisure/beach/swimming.png", audioUrl: "/public/recordss/swimming.m4a" },
  { title: "جري", expression: "أريد الجري", imageUrl: "/public/leisure/sports/running.png", audioUrl: "/public/recordss/running.m4a" },
]);

const leisureGamesChoices = createGroup("Leisure", "ألعاب", [
  { title: "ألعاب لوحية", expression: "أريد لعب ألعاب لوحية", imageUrl: "/public/leisure/games/boardgames.png", audioUrl: "/public/recordss/boardgames.m4a" },
  { title: "شطرنج", expression: "أريد لعب الشطرنج", imageUrl: "/public/leisure/games/chess.png", audioUrl: "/public/recordss/chess.m4a" },
  { title: "ألغاز", expression: "أريد حل لغز", imageUrl: "/public/leisure/games/puzzle.png", audioUrl: "/public/recordss/puzzle.m4a" },
  { title: "ألعاب ورق", expression: "أريد لعب ألعاب ورق", imageUrl: "/public/leisure/games/cards.png", audioUrl: "/public/recordss/cards.m4a" },
]);

const leisureVideoGamesChoices = createGroup("Leisure", "ألعاب فيديو", [
  { title: "سباق سيارات", expression: "أريد لعب سباق سيارات", imageUrl: "/public/leisure/videogames/racing.png", audioUrl: "/public/recordss/racing.m4a" },
  { title: "لعبة كرة قدم", expression: "أريد لعب لعبة كرة قدم", imageUrl: "/public/leisure/videogames/football.png", audioUrl: "/public/recordss/football.m4a" },
  { title: "لعبة مغامرات", expression: "أريد لعب لعبة مغامرات", imageUrl: "/public/leisure/videogames/adventure.png", audioUrl: "/public/recordss/adventure.m4a" },
  { title: "لعبة ألغاز", expression: "أريد لعب لعبة ألغاز", imageUrl: "/public/leisure/videogames/puzzle.png", audioUrl: "/public/recordss/puzzle.m4a" },
]);

const leisureBeachChoices = createGroup("Leisure", "شاطئ", [
  { title: "سباحة", expression: "أريد السباحة", imageUrl: "/public/leisure/beach/swimming.png", audioUrl: "/public/recordss/swimming.m4a" },
  { title: "المشي على الشاطئ", expression: "أريد المشي على الشاطئ", imageUrl: "/public/leisure/beach/walk.png", audioUrl: "/public/recordss/walk.m4a" },
  { title: "اللعب في الرمل", expression: "أريد اللعب في الرمل", imageUrl: "/public/leisure/beach/sand.png", audioUrl: "/public/recordss/sand.m4a" },
  { title: "جمع الأصداف", expression: "أريد جمع الأصداف", imageUrl: "/public/leisure/beach/shells.png", audioUrl: "/public/recordss/shells.m4a" },
]);

const leisureHobbyChoices = createGroup("Leisure", "هواية", [
  { title: "رسم", expression: "أريد الرسم", imageUrl: "/public/leisure/hobby/drawing.png", audioUrl: "/public/recordss/drawing.m4a" },
  { title: "قراءة", expression: "أريد القراءة", imageUrl: "/public/leisure/hobby/reading.png", audioUrl: "/public/recordss/reading.m4a" },
  { title: "كتابة", expression: "أريد الكتابة", imageUrl: "/public/leisure/hobby/writing.png", audioUrl: "/public/recordss/writing.m4a" },
  { title: "موسيقى", expression: "أريد الموسيقى", imageUrl: "/public/leisure/hobby/music.png", audioUrl: "/public/recordss/music.m4a" },
]);

const leisureEntertainmentChoices = createGroup("Leisure", "ترفيه", [
  { title: "مشاهدة التلفاز", expression: "أريد مشاهدة التلفاز", imageUrl: "/public/leisure/entertainment/tv.png", audioUrl: "/public/recordss/tv.m4a" },
  { title: "مشاهدة فيلم", expression: "أريد مشاهدة فيلم", imageUrl: "/public/leisure/entertainment/movie.png", audioUrl: "/public/recordss/movie.m4a" },
  { title: "الاستماع للموسيقى", expression: "أريد الاستماع للموسيقى", imageUrl: "/public/leisure/entertainment/music.png", audioUrl: "/public/recordss/music.m4a" },
  { title: "الخروج", expression: "أريد الخروج", imageUrl: "/public/leisure/entertainment/out.png", audioUrl: "/public/recordss/out.m4a" },
]);

const leisureShowChoices = createGroup("Leisure", "عرض", [
  { title: "سيرك", expression: "أريد مشاهدة سيرك", imageUrl: "/public/leisure/show/circus.png", audioUrl: "/public/recordss/circus.m4a" },
  { title: "مسرح", expression: "أريد مشاهدة مسرح", imageUrl: "/public/leisure/show/theater.png", audioUrl: "/public/recordss/theater.m4a" },
  { title: "عرض رقص", expression: "أريد مشاهدة عرض رقص", imageUrl: "/public/leisure/show/dance.png", audioUrl: "/public/recordss/dance.m4a" },
  { title: "عرض سحري", expression: "أريد مشاهدة عرض سحري", imageUrl: "/public/leisure/show/magic.png", audioUrl: "/public/recordss/magic.m4a" },
]);

const animalAnatomyChoices = createGroup("Animals", "تشريح", [
  { title: "رأس", expression: "هذا رأس الحيوان", imageUrl: "/public/animals/head.png", audioUrl: "/public/recordss/head.m4a" },
  { title: "جسم", expression: "هذا جسم الحيوان", imageUrl: "/public/animals/body.png", audioUrl: "/public/recordss/body.m4a" },
  { title: "أرجل", expression: "هذه أرجل الحيوان", imageUrl: "/public/animals/legs.png", audioUrl: "/public/recordss/legs.m4a" },
  { title: "ذيل", expression: "هذا ذيل الحيوان", imageUrl: "/public/animals/tail.png", audioUrl: "/public/recordss/tail.m4a" },
  { title: "أجنحة", expression: "هذه أجنحة الحيوان", imageUrl: "/public/animals/wings.png", audioUrl: "/public/recordss/wings.m4a" },
]);

const animalNutritionChoices = createGroup("Animals", "تغذية", [
  { title: "عشب", expression: "الحيوان يأكل عشب", imageUrl: "/public/animals/grass.png", audioUrl: "/public/recordss/grass.m4a" },
  { title: "لحم", expression: "الحيوان يأكل لحم", imageUrl: "/public/animals/meat.png", audioUrl: "/public/recordss/meat.m4a" },
  { title: "سمك", expression: "الحيوان يأكل سمك", imageUrl: "/public/animals/fish.png", audioUrl: "/public/recordss/fish.m4a" },
  { title: "بذور", expression: "الحيوان يأكل بذور", imageUrl: "/public/animals/seeds.png", audioUrl: "/public/recordss/seeds.m4a" },
  { title: "ماء", expression: "الحيوان يشرب ماء", imageUrl: "/public/animals/water.png", audioUrl: "/public/recordss/water.m4a" },
]);

const animalTypesChoices = createGroup("Animals", "أنواع الحيوانات", [
  { title: "ثدييات", expression: "هذا حيوان ثديي", imageUrl: "/public/animals/mammal.png", audioUrl: "/public/recordss/mammal.m4a" },
  { title: "طيور", expression: "هذا طائر", imageUrl: "/public/Animals/Bird.png", audioUrl: "/public/recordss/Bird.m4a" },
  { title: "أسماك", expression: "هذا سمك", imageUrl: "/public/Animals/Fish.png", audioUrl: "/public/recordss/Fish.m4a" },
  { title: "حشرات", expression: "هذه حشرة", imageUrl: "/public/animals/insect.png", audioUrl: "/public/recordss/insect.m4a" },
]);

const animalReproductionChoices = createGroup("Animals", "التكاثر", [
  { title: "بيضة", expression: "الحيوان يبيض", imageUrl: "/public/animals/egg.png", audioUrl: "/public/recordss/egg.m4a" },
  { title: "ولادة", expression: "الحيوان يلد", imageUrl: "/public/animals/birth.png", audioUrl: "/public/recordss/birth.m4a" },
  { title: "صغير الحيوان", expression: "هذا صغير الحيوان", imageUrl: "/public/animals/baby.png", audioUrl: "/public/recordss/baby.m4a" },
  { title: "نمو", expression: "هذا نمو الحيوان", imageUrl: "/public/animals/growth.png", audioUrl: "/public/recordss/growth.m4a" },
]);

const animalPhysiologyChoices = createGroup("Animals", "فسيولوجيا", [
  { title: "تنفس", expression: "الحيوان يتنفس", imageUrl: "/public/animals/breath.png", audioUrl: "/public/recordss/breath.m4a" },
  { title: "قلب", expression: "هذا قلب الحيوان", imageUrl: "/public/animals/heart.png", audioUrl: "/public/recordss/heart.m4a" },
  { title: "دم", expression: "هذا دم الحيوان", imageUrl: "/public/animals/blood.png", audioUrl: "/public/recordss/blood.m4a" },
  { title: "نوم", expression: "الحيوان ينام", imageUrl: "/public/animals/sleep.png", audioUrl: "/public/recordss/sleep.m4a" },
]);

const animalEnvironmentChoices = createGroup("Animals", "البيئة", [
  { title: "غابة", expression: "هذا حيوان الغابة", imageUrl: "/public/animals/forest.png", audioUrl: "/public/recordss/forest.m4a" },
  { title: "صحراء", expression: "هذا حيوان الصحراء", imageUrl: "/public/animals/desert.png", audioUrl: "/public/recordss/desert.m4a" },
  { title: "محيط", expression: "هذا حيوان المحيط", imageUrl: "/public/animals/ocean.png", audioUrl: "/public/recordss/ocean.m4a" },
  { title: "مزرعة", expression: "هذا حيوان المزرعة", imageUrl: "/public/animals/farm.png", audioUrl: "/public/recordss/farm.m4a" },
]);

const animalBehaviorChoices = createGroup("Animals", "سلوك", [
  { title: "يجري", expression: "الحيوان يجري", imageUrl: "/public/animals/run.png", audioUrl: "/public/recordss/run.m4a" },
  { title: "يأكل", expression: "الحيوان يأكل", imageUrl: "/public/animals/eat.png", audioUrl: "/public/recordss/eat.m4a" },
  { title: "ينام", expression: "الحيوان ينام", imageUrl: "/public/animals/sleep.png", audioUrl: "/public/recordss/sleep.m4a" },
  { title: "يصطاد", expression: "الحيوان يصطاد", imageUrl: "/public/animals/hunt.png", audioUrl: "/public/recordss/hunt.m4a" },
]);

const animalHousingChoices = createGroup("Animals", "سكن الحيوانات", [
  { title: "عش", expression: "هذا عش طائر", imageUrl: "/public/animals/nest.png", audioUrl: "/public/recordss/nest.m4a" },
  { title: "مزرعة", expression: "هذه مزرعة حيوانات", imageUrl: "/public/animals/farm.png", audioUrl: "/public/recordss/farm.m4a" },
  { title: "قفص", expression: "هذا قفص حيوان", imageUrl: "/public/animals/cage.png", audioUrl: "/public/recordss/cage.m4a" },
  { title: "موطن", expression: "هذا موطن الحيوان", imageUrl: "/public/animals/home.png", audioUrl: "/public/recordss/home.m4a" },
]);

const animalTherapyChoices = createGroup("Animals", "العلاج بالحيوانات", [
  { title: "علاج بالكلاب", expression: "العلاج بالكلاب", imageUrl: "/public/animals/dogtherapy.png", audioUrl: "/public/recordss/dogtherapy.m4a" },
  { title: "علاج بالخيول", expression: "العلاج بالخيول", imageUrl: "/public/animals/horse.png", audioUrl: "/public/recordss/horse.m4a" },
  { title: "حيوانات هادئة", expression: "الحيوانات الهادئة تساعد", imageUrl: "/public/animals/calm.png", audioUrl: "/public/recordss/calm.m4a" },
]);

const animalPetsWildChoices = createGroup("Animals", "أليفة وبرية", [
  { title: "كلب أليف", expression: "هذا كلب أليف", imageUrl: "/public/Animals/Dog.png", audioUrl: "/public/recordss/Dog.m4a" },
  { title: "قطة أليفة", expression: "هذه قطة أليفة", imageUrl: "/public/Animals/Cat.png", audioUrl: "/public/recordss/Cat.m4a" },
  { title: "أسد بري", expression: "هذا أسد بري", imageUrl: "/public/Animals/Dog.png", audioUrl: "/public/recordss/Dog.m4a" },
  { title: "فيل بري", expression: "هذا فيل بري", imageUrl: "/public/Animals/Dog.png", audioUrl: "/public/recordss/Dog.m4a" },
]);

const educationActivityChoices = createGroup("Education", "نشاط تعليمي", [
  { title: "شرح الدرس", expression: "اشرح الدرس", imageUrl: "/public/education/explain.png", audioUrl: "/public/recordss/explain.m4a" },
  { title: "طرح سؤال", expression: "اطرح سؤال", imageUrl: "/public/education/question.png", audioUrl: "/public/recordss/question.m4a" },
  { title: "إجابة", expression: "أجب على السؤال", imageUrl: "/public/education/answer.png", audioUrl: "/public/recordss/answer.m4a" },
  { title: "مناقشة", expression: "ناقش مع الآخرين", imageUrl: "/public/education/discuss.png", audioUrl: "/public/recordss/discuss.m4a" },
]);

const educationSubjectChoices = createGroup("Education", "مادة دراسية", [
  { title: "رياضيات", expression: "أريد دراسة الرياضيات", imageUrl: "/public/education/math.png", audioUrl: "/public/recordss/math.m4a" },
  { title: "علوم", expression: "أريد دراسة العلوم", imageUrl: "/public/education/science.png", audioUrl: "/public/recordss/science.m4a" },
  { title: "إنجليزي", expression: "أريد دراسة الإنجليزي", imageUrl: "/public/education/english.png", audioUrl: "/public/recordss/english.m4a" },
  { title: "تاريخ", expression: "أريد دراسة التاريخ", imageUrl: "/public/education/history.png", audioUrl: "/public/recordss/history.m4a" },
]);

const educationInstitutionChoices = createGroup("Education", "مؤسسة تعليمية", [
  { title: "مدرسة", expression: "اذهب إلى المدرسة", imageUrl: "/public/education/school.png", audioUrl: "/public/recordss/school.m4a" },
  { title: "جامعة", expression: "اذهب إلى الجامعة", imageUrl: "/public/education/university.png", audioUrl: "/public/recordss/university.m4a" },
  { title: "مركز تدريب", expression: "اذهب إلى مركز تدريب", imageUrl: "/public/education/training.png", audioUrl: "/public/recordss/training.m4a" },
]);

const educationTaskChoices = createGroup("Education", "مهمة تعليمية", [
  { title: "واجب", expression: "اعمل الواجب", imageUrl: "/public/education/homework.png", audioUrl: "/public/recordss/homework.m4a" },
  { title: "امتحان", expression: "أدخل الامتحان", imageUrl: "/public/education/exam.png", audioUrl: "/public/recordss/exam.m4a" },
  { title: "تكليف", expression: "أنهِ التكليف", imageUrl: "/public/education/assignment.png", audioUrl: "/public/recordss/assignment.m4a" },
]);

const educationMaterialChoices = createGroup("Education", "مواد تعليمية", [
  { title: "كتاب", expression: "استخدم الكتاب", imageUrl: "/public/education/book.png", audioUrl: "/public/recordss/book.m4a" },
  { title: "كراسة", expression: "اكتب في الكراسة", imageUrl: "/public/education/notebook.png", audioUrl: "/public/recordss/notebook.m4a" },
  { title: "ورقة عمل", expression: "حل ورقة العمل", imageUrl: "/public/education/worksheet.png", audioUrl: "/public/recordss/worksheet.m4a" },
]);

const educationEquipmentChoices = createGroup("Education", "معدات تعليمية", [
  { title: "قلم", expression: "استخدم القلم", imageUrl: "/public/education/pen.png", audioUrl: "/public/recordss/pen.m4a" },
  { title: "لاب توب", expression: "استخدم اللاب توب", imageUrl: "/public/education/laptop.png", audioUrl: "/public/recordss/laptop.m4a" },
  { title: "بروجكتور", expression: "استخدم البروجكتور", imageUrl: "/public/education/projector.png", audioUrl: "/public/recordss/projector.m4a" },
]);

const educationSpaceChoices = createGroup("Education", "مكان تعليمي", [
  { title: "فصل", expression: "اذهب إلى الفصل", imageUrl: "/public/education/classroom.png", audioUrl: "/public/recordss/classroom.m4a" },
  { title: "مكتبة", expression: "اذهب إلى المكتبة", imageUrl: "/public/education/library.png", audioUrl: "/public/recordss/library.m4a" },
  { title: "معمل", expression: "اذهب إلى المعمل", imageUrl: "/public/education/lab.png", audioUrl: "/public/recordss/lab.m4a" },
]);

const educationStaffChoices = createGroup("Education", "طاقم تعليمي", [
  { title: "مدرس", expression: "تحدث مع المدرس", imageUrl: "/public/education/teacher.png", audioUrl: "/public/recordss/teacher.m4a" },
  { title: "مساعد", expression: "اسأل المساعد", imageUrl: "/public/education/assistant.png", audioUrl: "/public/recordss/assistant.m4a" },
  { title: "مدير", expression: "قابل المدير", imageUrl: "/public/education/principal.png", audioUrl: "/public/recordss/principal.m4a" },
]);

const educationStudentsChoices = createGroup("Education", "طلاب", [
  { title: "زميل", expression: "تحدث مع زميل", imageUrl: "/public/education/classmate.png", audioUrl: "/public/recordss/classmate.m4a" },
  { title: "عمل جماعي", expression: "اعمل في مجموعة", imageUrl: "/public/education/group.png", audioUrl: "/public/recordss/group.m4a" },
]);

const educationMethodChoices = createGroup("Education", "منهجية", [
  { title: "شرح", expression: "اشرح بوضوح", imageUrl: "/public/education/explain.png", audioUrl: "/public/recordss/explain.m4a" },
  { title: "تدريب", expression: "تدرب أكثر", imageUrl: "/public/education/practice.png", audioUrl: "/public/recordss/practice.m4a" },
  { title: "مراجعة", expression: "راجع الدرس", imageUrl: "/public/education/review.png", audioUrl: "/public/recordss/review.m4a" },
]);

const educationVocabChoices = createGroup("Education", "مفردات أساسية", [
  { title: "اقرأ", expression: "اقرأ النص", imageUrl: "/public/education/read.png", audioUrl: "/public/recordss/read.m4a" },
  { title: "اكتب", expression: "اكتب الإجابة", imageUrl: "/public/education/write.png", audioUrl: "/public/recordss/write.m4a" },
  { title: "استمع", expression: "استمع جيدًا", imageUrl: "/public/education/listen.png", audioUrl: "/public/recordss/listen.m4a" },
]);

const agricultureChoices = createGroup("work", "القطاع الأولي", [
  { title: "زراعة", expression: "أريد العمل في الزراعة", imageUrl: "/public/Food and Drink/vegetablesz.png", audioUrl: "/public/recordss/vegetablesz.m4a" },
  { title: "صيد", expression: "أريد العمل في الصيد", imageUrl: "/public/Food and Drink/fish.png", audioUrl: "/public/recordss/fish.m4a" },
]);

const industryChoices = createGroup("work", "القطاع الثانوي", [
  { title: "صناعة", expression: "أريد العمل في الصناعة", imageUrl: "/public/icons/Computer.png", audioUrl: "/public/recordss/Computer.m4a" },
  { title: "بناء", expression: "أريد العمل في البناء", imageUrl: "/public/Places/home.png", audioUrl: "/public/recordss/home.m4a" },
]);

const tradeChoices = createGroup("work", "القطاع الثالثي", [
  { title: "تجارة", expression: "أريد العمل في التجارة", imageUrl: "/public/icons/Shopping.png", audioUrl: "/public/recordss/Shopping.m4a" },
  { title: "خدمات نقل", expression: "أريد العمل في خدمات النقل", imageUrl: "/public/icons/Transport.png", audioUrl: "/public/recordss/Transport.m4a" },
]);

export const subSubIconsData = [
  ...breakfastBreadChoices,
  ...breakfastEggChoices,
  ...breakfastCheeseChoices,
  ...breakfastMilkChoices,
  ...breakfastCoffeeChoices,
  ...breakfastTeaChoices,
  ...breakfastJuiceChoices,
  ...breakfastBeansChoices,
  ...breakfastFruitChoices,
  ...breakfastCerealChoices,
  ...breakfastHoneyChoices,
  ...lunchRiceChoices,
  ...lunchPastaChoices,
  ...lunchChickenChoices,
  ...lunchMeatChoices,
  ...lunchFishChoices,
  ...lunchSaladChoices,
  ...lunchSoupChoices,
  ...lunchBreadChoices,
  ...lunchJuiceChoices,
  ...dinnerRiceChoices,
  ...dinnerPastaChoices,
  ...dinnerChickenChoices,
  ...dinnerMeatChoices,
  ...dinnerFishChoices,
  ...dinnerSaladChoices,
  ...dinnerSoupChoices,
  ...dinnerBreadChoices,
  ...dinnerJuiceChoices,
  ...snackChipsChoices,
  ...snackCookieChoices,
  ...snackChocolateChoices,
  ...snackFruitChoices,
  ...snackNutChoices,
  ...snackYogurtChoices,
  ...snackSandwichChoices,
  ...snackJuiceChoices,
  ...snackTeaChoices,
  ...snackCoffeeChoices,
  ...familyMotherChoices,
  ...familyFatherChoices,
  ...familyBrotherChoices,
  ...familySisterChoices,
  ...familyGrandfatherChoices,
  ...familyGrandmotherChoices,
  ...familyUncleChoices,
  ...familyAuntChoices,
  ...familyCousinChoices,
  ...familyBabyChoices,
  ...feelingsHappyChoices,
  ...feelingsAngryChoices,
  ...feelingsAfraidChoices,
  ...feelingsTiredChoices,
  ...feelingsExcitedChoices,
  ...feelingsRelaxedChoices,
  ...feelingsAnxiousChoices,
  ...feelingsFrustratedChoices,
  ...feelingsProudChoices,
  ...schoolReasonChoices,
  ...parkReasonChoices,
  ...homeReasonChoices,
  ...hospitalReasonChoices,
  ...supermarketReasonChoices,
  ...universityReasonChoices,
  ...workReasonChoices,
  ...busStationReasonChoices,
  ...transportBusChoices,
  ...transportCarChoices,
  ...transportTaxiChoices,
  ...transportTrainChoices,
  ...transportBicycleChoices,
  ...transportMotorcycleChoices,
  ...transportAirplaneChoices,
  ...transportTramChoices,
  ...transportShipChoices,
  ...transportElevatorChoices,
  ...callMobileChoices,
  ...callVideoChoices,
  ...callLandlineChoices,
  ...callMessengerChoices,
  ...callConferenceChoices,
  ...emergencyCallChoices,
  ...showerChoices,
  ...toiletChoices,
  ...brushTeethChoices,
  ...washHandsChoices,
  ...leisureSportsChoices,
  ...leisureGamesChoices,
  ...leisureVideoGamesChoices,
  ...leisureBeachChoices,
  ...leisureHobbyChoices,
  ...leisureEntertainmentChoices,
  ...leisureShowChoices,
  ...animalAnatomyChoices,
  ...animalNutritionChoices,
  ...animalTypesChoices,
  ...animalReproductionChoices,
  ...animalPhysiologyChoices,
  ...animalEnvironmentChoices,
  ...animalBehaviorChoices,
  ...animalHousingChoices,
  ...animalTherapyChoices,
  ...animalPetsWildChoices,
  ...educationActivityChoices,
  ...educationSubjectChoices,
  ...educationInstitutionChoices,
  ...educationTaskChoices,
  ...educationMaterialChoices,
  ...educationEquipmentChoices,
  ...educationSpaceChoices,
  ...educationStaffChoices,
  ...educationStudentsChoices,
  ...educationMethodChoices,
  ...educationVocabChoices,
  ...agricultureChoices,
  ...industryChoices,
  ...tradeChoices,
];

export const subSubIconsMap = subSubIconsData.reduce((acc, item) => {
  const key = `${item.category}::${item.parentTitle}`;
  if (!acc[key]) {
    acc[key] = [];
  }
  acc[key].push(item);
  return acc;
}, {});
