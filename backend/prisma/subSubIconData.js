const DEFAULT_IMAGE_URL = "/public/default.jpg";

const createGroup = (category, parentTitle, items) =>
  items.map((item) => ({
    category,
    parentTitle,
    title: item.title,
    expression: item.expression,
    imageUrl: item.imageUrl || DEFAULT_IMAGE_URL,
    recordingUrl: item.recordingUrl,
  }));

const breakfastBreadChoices = createGroup("Breakfast", "خبز", [
  { title: "عيش بلدي", expression: "أريد عيش بلدي", imageUrl: "/public/Food and Drink/esh.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عيش فينو", expression: "أريد عيش فينو", imageUrl: "/public/Food and Drink/sandwich.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عيش شامي", expression: "أريد عيش شامي", imageUrl: "/public/talk/bread.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "توست", expression: "أريد توست", imageUrl: "/public/breakfast/breadd.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const breakfastEggChoices = createGroup("Breakfast", "بيض", [
  { title: "أومليت", expression: "أريد بيض أومليت", imageUrl: "/public/Food and Drink/egg.png", recordingUrl: "/public/recordss/Egg.m4a" },
  { title: "بيض مسلوق", expression: "أريد بيض مسلوق", imageUrl: "/public/talk/eggs.png", recordingUrl: "/public/recordss/Egg.m4a" },
  { title: "بيض مقلي", expression: "أريد بيض مقلي", imageUrl: "/public/Food and Drink/egg.png", recordingUrl: "/public/recordss/Egg.m4a" },
]);

const breakfastCheeseChoices = createGroup("Breakfast", "جبن", [
  { title: "جبنة رومي", expression: "أريد جبنة رومي", imageUrl: "/public/Food and Drink/gebna.png", recordingUrl: "/public/recordss/Cheese.m4a" },
  { title: "جبنة بيضاء", expression: "أريد جبنة بيضاء", imageUrl: "/public/talk/cheese.png", recordingUrl: "/public/recordss/Cheese.m4a" },
  { title: "جبنة شيدر", expression: "أريد جبنة شيدر", imageUrl: "/public/Food and Drink/gebna.png", recordingUrl: "/public/recordss/Cheese.m4a" },
  { title: "جبنة مثلثات", expression: "أريد جبنة مثلثات", imageUrl: "/public/talk/cheese.png", recordingUrl: "/public/recordss/Cheese.m4a" },
]);

const breakfastMilkChoices = createGroup("Breakfast", "حليب", [
  { title: "لبن رايب", expression: "أريد لبن رايب", imageUrl: "/public/Food and Drink/labn.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "لبن كامل الدسم", expression: "أريد لبن كامل الدسم", imageUrl: "/public/talk/milk.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "لبن قليل الدسم", expression: "أريد لبن قليل الدسم", imageUrl: "/public/Food and Drink/labn.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "لبن بالشوكولاتة", expression: "أريد لبن بالشوكولاتة", imageUrl: "/public/Food and Drink/chocolate.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const breakfastCoffeeChoices = createGroup("Breakfast", "قهوة", [
  { title: "قهوة سادة", expression: "أريد قهوة سادة", imageUrl: "/public/Food and Drink/coffe.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "قهوة بلبن", expression: "أريد قهوة بلبن", imageUrl: "/public/talk/coffee.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "نسكافيه", expression: "أريد نسكافيه", imageUrl: "/public/Food and Drink/nescafe.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const breakfastTeaChoices = createGroup("Breakfast", "شاي", [
  { title: "شاي بلبن", expression: "أريد شاي بلبن", imageUrl: "/public/talk/tea.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "شاي أخضر", expression: "أريد شاي أخضر", imageUrl: "/public/Food and Drink/tea.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "شاي أحمر", expression: "أريد شاي أحمر", imageUrl: "/public/breakfast/tea.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const breakfastJuiceChoices = createGroup("Breakfast", "عصير", [
  { title: "عصير برتقال", expression: "أريد عصير برتقال", imageUrl: "/public/Food and Drink/orange.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عصير مانجو", expression: "أريد عصير مانجو", imageUrl: "/public/Food and Drink/mango.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عصير جوافة", expression: "أريد عصير جوافة", imageUrl: "/public/Food and Drink/gwafa.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const breakfastBeansChoices = createGroup("Breakfast", "فول", [
  { title: "فول سادة", expression: "أريد فول سادة", imageUrl: "/public/Food and Drink/vegetablesz.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "فول بالزيت", expression: "أريد فول بالزيت", imageUrl: "/public/Food and Drink/13.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "فول بالطحينة", expression: "أريد فول بالطحينة", imageUrl: "/public/Food and Drink/13.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const breakfastFruitChoices = createGroup("Breakfast", "فواكه", [
  { title: "تفاح", expression: "أريد تفاح", imageUrl: "/public/Food and Drink/apple.png", recordingUrl: "/public/recordss/Apple.m4a" },
  { title: "موز", expression: "أريد موز", imageUrl: "/public/Food and Drink/mozz.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "بلح", expression: "أريد بلح", imageUrl: "/public/Food and Drink/1.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const breakfastCerealChoices = createGroup("Breakfast", "حبوب إفطار", [
  { title: "كورن فليكس", expression: "أريد كورن فليكس", imageUrl: "/public/talk/cereal.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "حبوب شوكولاتة", expression: "أريد حبوب شوكولاتة", imageUrl: "/public/Food and Drink/chocolate.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "شوفان", expression: "أريد شوفان", imageUrl: "/public/Food and Drink/16.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const breakfastHoneyChoices = createGroup("Breakfast", "عسل", [
  { title: "عسل أبيض", expression: "أريد عسل أبيض", imageUrl: "/public/Food and Drink/asl.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عسل أسود", expression: "أريد عسل أسود", imageUrl: "/public/Food and Drink/marba.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const lunchRiceChoices = createGroup("Lunch", "أرز", [
  { title: "أرز أبيض", expression: "أريد أرز أبيض", imageUrl: "/public/Food and Drink/roz.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "أرز بالخضار", expression: "أريد أرز بالخضار", imageUrl: "/public/Food and Drink/vegetablesz.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "أرز بالفراخ", expression: "أريد أرز بالفراخ", imageUrl: "/public/Food and Drink/frahk.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const lunchPastaChoices = createGroup("Lunch", "مكرونة", [
  { title: "مكرونة بالصلصة", expression: "أريد مكرونة بالصلصة", imageUrl: "/public/talk/pasta.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "مكرونة بشاميل", expression: "أريد مكرونة بشاميل", imageUrl: "/public/Food and Drink/15.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "مكرونة وايت صوص", expression: "أريد مكرونة وايت صوص", imageUrl: "/public/talk/pasta.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const lunchChickenChoices = createGroup("Lunch", "دجاج", [
  { title: "فراخ مشوية", expression: "أريد فراخ مشوية", imageUrl: "/public/Food and Drink/frahk.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "فراخ مقلية", expression: "أريد فراخ مقلية", imageUrl: "/public/talk/chicken.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "فراخ في الفرن", expression: "أريد فراخ في الفرن", imageUrl: "/public/Food and Drink/frahk.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const lunchMeatChoices = createGroup("Lunch", "لحم", [
  { title: "كفتة", expression: "أريد كفتة", imageUrl: "/public/Food and Drink/meat.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "ستيك", expression: "أريد ستيك", imageUrl: "/public/talk/meat.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "لحمة مفرومة", expression: "أريد لحمة مفرومة", imageUrl: "/public/Food and Drink/meat.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const lunchFishChoices = createGroup("Lunch", "سمك", [
  { title: "سمك مشوي", expression: "أريد سمك مشوي", imageUrl: "/public/Food and Drink/fish.png", recordingUrl: "/public/recordss/Fish.m4a" },
  { title: "سمك مقلي", expression: "أريد سمك مقلي", imageUrl: "/public/talk/fish.png", recordingUrl: "/public/recordss/Fish.m4a" },
  { title: "فيليه سمك", expression: "أريد فيليه سمك", imageUrl: "/public/Food and Drink/fish.png", recordingUrl: "/public/recordss/Fish.m4a" },
]);

const lunchSaladChoices = createGroup("Lunch", "سلطة", [
  { title: "سلطة خضراء", expression: "أريد سلطة خضراء", imageUrl: "/public/talk/salad.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "سلطة طحينة", expression: "أريد سلطة طحينة", imageUrl: "/public/Food and Drink/vegetablesz.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "سلطة زبادي", expression: "أريد سلطة زبادي", imageUrl: "/public/Food and Drink/zbady.png", recordingUrl: "/public/recordss/Yogurt.m4a" },
]);

const lunchSoupChoices = createGroup("Lunch", "شوربة", [
  { title: "شوربة عدس", expression: "أريد شوربة عدس", imageUrl: "/public/Food and Drink/shorba.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "شوربة فراخ", expression: "أريد شوربة فراخ", imageUrl: "/public/talk/soup.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "شوربة خضار", expression: "أريد شوربة خضار", imageUrl: "/public/Food and Drink/vegetablesz.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const lunchBreadChoices = createGroup("Lunch", "خبز", [
  { title: "عيش بلدي", expression: "أريد عيش بلدي", imageUrl: "/public/Food and Drink/esh.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عيش فينو", expression: "أريد عيش فينو", imageUrl: "/public/Food and Drink/sandwich.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عيش شامي", expression: "أريد عيش شامي", imageUrl: "/public/talk/bread.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "توست", expression: "أريد توست", imageUrl: "/public/lunch/bread.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const lunchJuiceChoices = createGroup("Lunch", "عصير", [
  { title: "عصير برتقال", expression: "أريد عصير برتقال", imageUrl: "/public/Food and Drink/orange.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عصير مانجو", expression: "أريد عصير مانجو", imageUrl: "/public/Food and Drink/mango.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عصير جوافة", expression: "أريد عصير جوافة", imageUrl: "/public/Food and Drink/gwafa.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const dinnerRiceChoices = createGroup("Dinner", "أرز", [
  { title: "أرز أبيض", expression: "أريد أرز أبيض", imageUrl: "/public/Food and Drink/roz.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "أرز بالخضار", expression: "أريد أرز بالخضار", imageUrl: "/public/Food and Drink/vegetablesz.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "أرز بالفراخ", expression: "أريد أرز بالفراخ", imageUrl: "/public/Food and Drink/frahk.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const dinnerPastaChoices = createGroup("Dinner", "مكرونة", [
  { title: "مكرونة بالصلصة", expression: "أريد مكرونة بالصلصة", imageUrl: "/public/talk/pasta.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "مكرونة بشاميل", expression: "أريد مكرونة بشاميل", imageUrl: "/public/Food and Drink/15.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "مكرونة وايت صوص", expression: "أريد مكرونة وايت صوص", imageUrl: "/public/talk/pasta.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const dinnerChickenChoices = createGroup("Dinner", "دجاج", [
  { title: "فراخ مشوية", expression: "أريد فراخ مشوية", imageUrl: "/public/Food and Drink/frahk.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "فراخ مقلية", expression: "أريد فراخ مقلية", imageUrl: "/public/talk/chicken.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "فراخ في الفرن", expression: "أريد فراخ في الفرن", imageUrl: "/public/Food and Drink/frahk.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const dinnerMeatChoices = createGroup("Dinner", "لحم", [
  { title: "كفتة", expression: "أريد كفتة", imageUrl: "/public/Food and Drink/meat.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "ستيك", expression: "أريد ستيك", imageUrl: "/public/talk/meat.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "لحمة مفرومة", expression: "أريد لحمة مفرومة", imageUrl: "/public/Food and Drink/meat.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const dinnerFishChoices = createGroup("Dinner", "سمك", [
  { title: "سمك مشوي", expression: "أريد سمك مشوي", imageUrl: "/public/Food and Drink/fish.png", recordingUrl: "/public/recordss/Fish.m4a" },
  { title: "سمك مقلي", expression: "أريد سمك مقلي", imageUrl: "/public/talk/fish.png", recordingUrl: "/public/recordss/Fish.m4a" },
  { title: "فيليه سمك", expression: "أريد فيليه سمك", imageUrl: "/public/Food and Drink/fish.png", recordingUrl: "/public/recordss/Fish.m4a" },
]);

const dinnerSaladChoices = createGroup("Dinner", "سلطة", [
  { title: "سلطة خضراء", expression: "أريد سلطة خضراء", imageUrl: "/public/talk/salad.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "سلطة طحينة", expression: "أريد سلطة طحينة", imageUrl: "/public/Food and Drink/vegetablesz.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "سلطة زبادي", expression: "أريد سلطة زبادي", imageUrl: "/public/Food and Drink/zbady.png", recordingUrl: "/public/recordss/Yogurt.m4a" },
]);

const dinnerSoupChoices = createGroup("Dinner", "شوربة", [
  { title: "شوربة عدس", expression: "أريد شوربة عدس", imageUrl: "/public/Food and Drink/shorba.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "شوربة فراخ", expression: "أريد شوربة فراخ", imageUrl: "/public/talk/soup.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "شوربة خضار", expression: "أريد شوربة خضار", imageUrl: "/public/Food and Drink/vegetablesz.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const dinnerBreadChoices = createGroup("Dinner", "خبز", [
  { title: "عيش بلدي", expression: "أريد عيش بلدي", imageUrl: "/public/Food and Drink/esh.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عيش فينو", expression: "أريد عيش فينو", imageUrl: "/public/Food and Drink/sandwich.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عيش شامي", expression: "أريد عيش شامي", imageUrl: "/public/talk/bread.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "توست", expression: "أريد توست", imageUrl: "/public/lunch/bread.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const dinnerJuiceChoices = createGroup("Dinner", "عصير", [
  { title: "عصير برتقال", expression: "أريد عصير برتقال", imageUrl: "/public/Food and Drink/orange.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عصير مانجو", expression: "أريد عصير مانجو", imageUrl: "/public/Food and Drink/mango.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عصير جوافة", expression: "أريد عصير جوافة", imageUrl: "/public/Food and Drink/gwafa.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const snackChipsChoices = createGroup("Snack", "رقائق", [
  { title: "شيبسي جبنة", expression: "أريد شيبسي جبنة", imageUrl: "/public/Food and Drink/btats.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "شيبسي حار", expression: "أريد شيبسي حار", imageUrl: "/public/snack/chips.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "شيبسي ملح", expression: "أريد شيبسي ملح", imageUrl: "/public/Food and Drink/btats.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const snackCookieChoices = createGroup("Snack", "كوكيز", [
  { title: "كوكيز شوكولاتة", expression: "أريد كوكيز شوكولاتة", imageUrl: "/public/snack/cookies.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "كوكيز فانيليا", expression: "أريد كوكيز فانيليا", imageUrl: "/public/Food and Drink/baskot.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "بسكويت", expression: "أريد بسكويت", imageUrl: "/public/Food and Drink/baskot.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const snackChocolateChoices = createGroup("Snack", "شوكولاتة", [
  { title: "شوكولاتة دارك", expression: "أريد شوكولاتة دارك", imageUrl: "/public/Food and Drink/chocolate.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "شوكولاتة بالحليب", expression: "أريد شوكولاتة بالحليب", imageUrl: "/public/snack/chocolate.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "شوكولاتة ويفر", expression: "أريد شوكولاتة ويفر", imageUrl: "/public/Food and Drink/chocolate.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const snackFruitChoices = createGroup("Snack", "فواكه", [
  { title: "تفاح", expression: "أريد تفاح", imageUrl: "/public/Food and Drink/apple.png", recordingUrl: "/public/recordss/Apple.m4a" },
  { title: "موز", expression: "أريد موز", imageUrl: "/public/Food and Drink/mozz.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "فراولة", expression: "أريد فراولة", imageUrl: "/public/Food and Drink/frawla.png", recordingUrl: "/public/recordss/Strawberry.m4a" },
]);

const snackNutChoices = createGroup("Snack", "مكسرات", [
  { title: "فول سوداني", expression: "أريد فول سوداني", imageUrl: "/public/Food and Drink/14.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "لوز", expression: "أريد لوز", imageUrl: "/public/Food and Drink/14.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "كاجو", expression: "أريد كاجو", imageUrl: "/public/Food and Drink/14.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const snackYogurtChoices = createGroup("Snack", "زبادي", [
  { title: "زبادي سادة", expression: "أريد زبادي سادة", imageUrl: "/public/Food and Drink/zbady.png", recordingUrl: "/public/recordss/Yogurt.m4a" },
  { title: "زبادي فراولة", expression: "أريد زبادي فراولة", imageUrl: "/public/Food and Drink/frawla.png", recordingUrl: "/public/recordss/Yogurt.m4a" },
  { title: "زبادي بالعسل", expression: "أريد زبادي بالعسل", imageUrl: "/public/Food and Drink/asl.png", recordingUrl: "/public/recordss/Yogurt.m4a" },
]);

const snackSandwichChoices = createGroup("Snack", "ساندوتش", [
  { title: "ساندوتش جبنة", expression: "أريد ساندوتش جبنة", imageUrl: "/public/Food and Drink/sandwich.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "ساندوتش مربى", expression: "أريد ساندوتش مربى", imageUrl: "/public/Food and Drink/marba.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "ساندوتش عسل", expression: "أريد ساندوتش عسل", imageUrl: "/public/Food and Drink/asl.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const snackJuiceChoices = createGroup("Snack", "عصير", [
  { title: "عصير برتقال", expression: "أريد عصير برتقال", imageUrl: "/public/Food and Drink/orange.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عصير مانجو", expression: "أريد عصير مانجو", imageUrl: "/public/Food and Drink/mango.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "عصير تفاح", expression: "أريد عصير تفاح", imageUrl: "/public/Food and Drink/apple.png", recordingUrl: "/public/recordss/Apple.m4a" },
]);

const snackTeaChoices = createGroup("Snack", "شاي", [
  { title: "شاي بلبن", expression: "أريد شاي بلبن", imageUrl: "/public/talk/tea.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "شاي أخضر", expression: "أريد شاي أخضر", imageUrl: "/public/Food and Drink/tea.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "شاي أحمر", expression: "أريد شاي أحمر", imageUrl: "/public/snack/tea.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const snackCoffeeChoices = createGroup("Snack", "قهوة", [
  { title: "قهوة سادة", expression: "أريد قهوة سادة", imageUrl: "/public/Food and Drink/coffe.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "قهوة بلبن", expression: "أريد قهوة بلبن", imageUrl: "/public/talk/coffee.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "نسكافيه", expression: "أريد نسكافيه", imageUrl: "/public/Food and Drink/nescafe.png", recordingUrl: "/public/recordss/Eating.m4a" },
  { title: "قهوة مثلجة", expression: "أريد قهوة مثلجة", imageUrl: "/public/snack/coffee.png", recordingUrl: "/public/recordss/Eating.m4a" },
]);

const familyMotherChoices = createGroup("Family", "أم", [
  { title: "أم الأم", expression: "هذه جدتي من ناحية الأم", imageUrl: "/public/Family/10.png", recordingUrl: "/public/recordss/Family.m4a" },
  { title: "أب الأم", expression: "هذا جدي من ناحية الأم", imageUrl: "/public/Family/2.png", recordingUrl: "/public/recordss/Family.m4a" },
  { title: "أخت الأم", expression: "هذه خالتي", imageUrl: "/public/Family/5.png", recordingUrl: "/public/recordss/Aunt.m4a" },
  { title: "أخ الأم", expression: "هذا خالي", imageUrl: "/public/Family/6.png", recordingUrl: "/public/recordss/Unclee.m4a" },
]);

const familyFatherChoices = createGroup("Family", "أب", [
  { title: "أم الأب", expression: "هذه جدتي من ناحية الأب", imageUrl: "/public/Family/10.png", recordingUrl: "/public/recordss/Family.m4a" },
  { title: "أب الأب", expression: "هذا جدي من ناحية الأب", imageUrl: "/public/Family/2.png", recordingUrl: "/public/recordss/Family.m4a" },
  { title: "أخت الأب", expression: "هذه عمتي", imageUrl: "/public/Family/5.png", recordingUrl: "/public/recordss/Aunt.m4a" },
  { title: "أخ الأب", expression: "هذا عمي", imageUrl: "/public/Family/6.png", recordingUrl: "/public/recordss/Uncle.m4a" },
]);

const familyBrotherChoices = createGroup("Family", "أخ", [
  { title: "أخ كبير", expression: "هذا أخي الكبير", imageUrl: "/public/Family/7.png", recordingUrl: "/public/recordss/Brother.m4a" },
  { title: "أخ صغير", expression: "هذا أخي الصغير", imageUrl: "/public/Family/9.png", recordingUrl: "/public/recordss/Brother.m4a" },
  { title: "أخ توأم", expression: "هذا أخي التوأم", imageUrl: "/public/Family/6.png", recordingUrl: "/public/recordss/Brother.m4a" },
]);

const familySisterChoices = createGroup("Family", "أخت", [
  { title: "أخت كبيرة", expression: "هذه أختي الكبيرة", imageUrl: "/public/Family/5.png", recordingUrl: "/public/recordss/Sister.m4a" },
  { title: "أخت صغيرة", expression: "هذه أختي الصغيرة", imageUrl: "/public/Family/1.png", recordingUrl: "/public/recordss/Sister.m4a" },
  { title: "أخت توأم", expression: "هذه أختي التوأم", imageUrl: "/public/Family/10.png", recordingUrl: "/public/recordss/Sister.m4a" },
]);

const familyGrandfatherChoices = createGroup("Family", "جد", [
  { title: "جد لأمي", expression: "هذا جدي لأمي", imageUrl: "/public/Family/2.png", recordingUrl: "/public/recordss/Family.m4a" },
  { title: "جد لأبي", expression: "هذا جدي لأبي", imageUrl: "/public/Family/4.png", recordingUrl: "/public/recordss/Family.m4a" },
]);

const familyGrandmotherChoices = createGroup("Family", "جدة", [
  { title: "جدة لأمي", expression: "هذه جدتي لأمي", imageUrl: "/public/Family/10.png", recordingUrl: "/public/recordss/Family.m4a" },
  { title: "جدة لأبي", expression: "هذه جدتي لأبي", imageUrl: "/public/Family/3.png", recordingUrl: "/public/recordss/Family.m4a" },
]);

const familyUncleChoices = createGroup("Family", "عم", [
  { title: "عم", expression: "هذا عمي", imageUrl: "/public/Family/6.png", recordingUrl: "/public/recordss/Uncle.m4a" },
  { title: "عم الأب", expression: "هذا أخو أبي", imageUrl: "/public/Family/4.png", recordingUrl: "/public/recordss/Uncle.m4a" },
]);

const familyMaternalUncleChoices = createGroup("Family", "خالي", [
  { title: "خال", expression: "هذا خالي", imageUrl: "/public/Family/6.png", recordingUrl: "/public/recordss/Unclee.m4a" },
  { title: "أخو الأم", expression: "هذا أخو أمي", imageUrl: "/public/Family/3.png", recordingUrl: "/public/recordss/Unclee.m4a" },
]);

const familyAuntChoices = createGroup("Family", "عمة", [
  { title: "عمة", expression: "هذه عمتي", imageUrl: "/public/Family/5.png", recordingUrl: "/public/recordss/Aunt.m4a" },
  { title: "أخت الأب", expression: "هذه أخت أبي", imageUrl: "/public/Family/3.png", recordingUrl: "/public/recordss/Aunt.m4a" },
]);

const familyMaternalAuntChoices = createGroup("Family", "خالتي", [
  { title: "خالة", expression: "هذه خالتي", imageUrl: "/public/Family/5.png", recordingUrl: "/public/recordss/Auntie.m4a" },
  { title: "أخت الأم", expression: "هذه أخت أمي", imageUrl: "/public/Family/3.png", recordingUrl: "/public/recordss/Auntie.m4a" },
]);

const familyCousinChoices = createGroup("Family", "ابن/بنت العم", [
  { title: "ابن عم", expression: "هذا ابن عمي", imageUrl: "/public/Family/9.png", recordingUrl: "/public/recordss/Cousin.m4a" },
  { title: "بنت عم", expression: "هذه بنت عمي", imageUrl: "/public/Family/1.png", recordingUrl: "/public/recordss/Cousin.m4a" },
  { title: "ابن خال", expression: "هذا ابن خالي", imageUrl: "/public/Family/7.png", recordingUrl: "/public/recordss/Cousins.m4a" },
]);

const familyBabyChoices = createGroup("Family", "طفل", [
  { title: "ولد صغير", expression: "هذا ولد صغير", imageUrl: "/public/Family/8.png", recordingUrl: "/public/recordss/Family.m4a" },
  { title: "بنت صغيرة", expression: "هذه بنت صغيرة", imageUrl: "/public/Family/9.png", recordingUrl: "/public/recordss/Family.m4a" },
]);

const feelingsHappyChoices = createGroup("Feelings", "سعيد", [
  { title: "سعيد مع العائلة", expression: "أنا سعيد مع عائلتي", imageUrl: "/public/icons/Family.png", recordingUrl: "/public/records/happy.m4a" },
  { title: "سعيد لأني لعبت", expression: "أنا سعيد لأني لعبت", imageUrl: "/public/icons/Play.png", recordingUrl: "/public/records/happy.m4a" },
  { title: "سعيد لأني أكلت", expression: "أنا سعيد لأني أكلت", imageUrl: "/public/icons/Eating.png", recordingUrl: "/public/records/happy.m4a" },
]);

const feelingsAngryChoices = createGroup("Feelings", "غاضب", [
  { title: "غاضب من الصوت", expression: "أنا غاضب بسبب الصوت", imageUrl: "/public/listen/Alert.png", recordingUrl: "/public/records/angry.m4a" },
  { title: "غاضب من الانتظار", expression: "أنا غاضب من الانتظار", imageUrl: "/public/Questions/time.png", recordingUrl: "/public/records/angry.m4a" },
  { title: "غاضب من شخص", expression: "أنا غاضب من شخص", imageUrl: "/public/talk/Conversation.png", recordingUrl: "/public/records/angry.m4a" },
]);

const feelingsAfraidChoices = createGroup("Feelings", "خائف", [
  { title: "خائف من الحشرات", expression: "أنا خائف من الحشرات", imageUrl: "/public/Animals/7shraat.png", recordingUrl: "/public/records/afraid.m4a" },
  { title: "خائف من الظلام", expression: "أنا خائف من الظلام", imageUrl: "/public/sleeping/night-lamp.png", recordingUrl: "/public/records/afraid.m4a" },
  { title: "خائف من الصوت العالي", expression: "أنا خائف من الصوت العالي", imageUrl: "/public/listen/Alert.png", recordingUrl: "/public/records/afraid.m4a" },
  { title: "خائف من الكلاب", expression: "أنا خائف من الكلاب", imageUrl: "/public/Animals/Dog.png", recordingUrl: "/public/records/afraid.m4a" },
]);

const feelingsTiredChoices = createGroup("Feelings", "متعب", [
  { title: "متعب بعد المدرسة", expression: "أنا متعب بعد المدرسة", imageUrl: "/public/Places/school.png", recordingUrl: "/public/records/tired.m4a" },
  { title: "متعب من المشي", expression: "أنا متعب من المشي", imageUrl: "/public/icons/Walk.png", recordingUrl: "/public/records/tired.m4a" },
  { title: "أحتاج أن أنام", expression: "أنا متعب وأحتاج أن أنام", imageUrl: "/public/sleeping/bed.png", recordingUrl: "/public/records/tired.m4a" },
]);

const feelingsExcitedChoices = createGroup("Feelings", "متحمس", [
  { title: "متحمس للخروج", expression: "أنا متحمس للخروج", imageUrl: "/public/Relations/outside.png", recordingUrl: "/public/records/excited.m4a" },
  { title: "متحمس للعب", expression: "أنا متحمس للعب", imageUrl: "/public/icons/Play.png", recordingUrl: "/public/records/excited.m4a" },
  { title: "متحمس لعيد الميلاد", expression: "أنا متحمس لعيد الميلاد", imageUrl: "/public/icons/Excited.png", recordingUrl: "/public/records/excited.m4a" },
]);

const feelingsRelaxedChoices = createGroup("Feelings", "مرتاح", [
  { title: "مرتاح في البيت", expression: "أنا مرتاح في البيت", imageUrl: "/public/Places/home.png", recordingUrl: "/public/recordss/Feelings.m4a" },
  { title: "مرتاح مع الموسيقى", expression: "أنا مرتاح مع الموسيقى", imageUrl: "/public/Music/music-notes.png", recordingUrl: "/public/recordss/Feelings.m4a" },
  { title: "مرتاح بعد الاستحمام", expression: "أنا مرتاح بعد الاستحمام", imageUrl: "/public/icons/Shower.png", recordingUrl: "/public/recordss/Feelings.m4a" },
]);

const feelingsAnxiousChoices = createGroup("Feelings", "مضطرب", [
  { title: "قلقان من مكان جديد", expression: "أنا قلقان من مكان جديد", imageUrl: "/public/icons/Places.png", recordingUrl: "/public/records/edtrab.m4a" },
  { title: "قلقان من الزحمة", expression: "أنا قلقان من الزحمة", imageUrl: "/public/talk/GroupChat.png", recordingUrl: "/public/records/edtrab.m4a" },
  { title: "قلقان من الامتحان", expression: "أنا قلقان من الامتحان", imageUrl: "/public/Questions/whichone.png", recordingUrl: "/public/records/edtrab.m4a" },
]);

const feelingsFrustratedChoices = createGroup("Feelings", "محبط", [
  { title: "لا أستطيع الشرح", expression: "أنا محبط لأني لا أستطيع الشرح", imageUrl: "/public/talk/MessageBubble.png", recordingUrl: "/public/records/e7bat.m4a" },
  { title: "الجهاز لا يعمل", expression: "أنا محبط لأن الجهاز لا يعمل", imageUrl: "/public/icons/Computer.png", recordingUrl: "/public/records/e7bat.m4a" },
  { title: "المهمة صعبة", expression: "أنا محبط لأن المهمة صعبة", imageUrl: "/public/icons/Book.png", recordingUrl: "/public/records/e7bat.m4a" },
]);

const feelingsProudChoices = createGroup("Feelings", "فخور", [
  { title: "أنهيت مهمتي", expression: "أنا فخور لأني أنهيت مهمتي", imageUrl: "/public/icons/Yes.png", recordingUrl: "/public/records/proud.m4a" },
  { title: "تعلمت شيئًا جديدًا", expression: "أنا فخور لأني تعلمت شيئًا جديدًا", imageUrl: "/public/icons/Read.png", recordingUrl: "/public/records/proud.m4a" },
  { title: "ساعدت شخصًا", expression: "أنا فخور لأني ساعدت شخصًا", imageUrl: "/public/icons/Friend.png", recordingUrl: "/public/records/proud.m4a" },
]);

const schoolReasonChoices = createGroup("places", "المدرسة", [
  { title: "للتعلم", expression: "أريد الذهاب إلى المدرسة للتعلم", imageUrl: "/public/icons/Read.png", recordingUrl: "/public/records/school.m4a" },
  { title: "لرؤية أصدقائي", expression: "أريد الذهاب إلى المدرسة لرؤية أصدقائي", imageUrl: "/public/icons/Friend.png", recordingUrl: "/public/records/school.m4a" },
  { title: "لحضور الحصة", expression: "أريد الذهاب إلى المدرسة لحضور الحصة", imageUrl: "/public/talk/Lecture.png", recordingUrl: "/public/records/school.m4a" },
  { title: "للعب", expression: "أريد الذهاب إلى المدرسة للعب", imageUrl: "/public/icons/Play.png", recordingUrl: "/public/records/school.m4a" },
]);

const parkReasonChoices = createGroup("places", "الحديقة", [
  { title: "للعب", expression: "أريد الذهاب إلى الحديقة للعب", imageUrl: "/public/icons/Play.png", recordingUrl: "/public/records/park.m4a" },
  { title: "للمشي", expression: "أريد الذهاب إلى الحديقة للمشي", imageUrl: "/public/icons/Walk.png", recordingUrl: "/public/records/park.m4a" },
  { title: "لمقابلة الأصدقاء", expression: "أريد الذهاب إلى الحديقة لمقابلة الأصدقاء", imageUrl: "/public/icons/Friend.png", recordingUrl: "/public/records/park.m4a" },
]);

const homeReasonChoices = createGroup("places", "المنزل", [
  { title: "للراحة", expression: "أريد الذهاب إلى المنزل للراحة", imageUrl: "/public/icons/Relax.png", recordingUrl: "/public/records/home.m4a" },
  { title: "للنوم", expression: "أريد الذهاب إلى المنزل للنوم", imageUrl: "/public/sleeping/bed.png", recordingUrl: "/public/records/home.m4a" },
  { title: "لرؤية العائلة", expression: "أريد الذهاب إلى المنزل لرؤية العائلة", imageUrl: "/public/icons/Family.png", recordingUrl: "/public/records/home.m4a" },
]);

const hospitalReasonChoices = createGroup("places", "المستشفى", [
  { title: "لرؤية الطبيب", expression: "أريد الذهاب إلى المستشفى لرؤية الطبيب", imageUrl: "/public/icons/Doctor.png", recordingUrl: "/public/records/hospital.m4a" },
  { title: "لإحضار دواء", expression: "أريد الذهاب إلى المستشفى لإحضار دواء", imageUrl: "/public/icons/Medicine.png", recordingUrl: "/public/records/hospital.m4a" },
  { title: "لزيارة شخص", expression: "أريد الذهاب إلى المستشفى لزيارة شخص", imageUrl: "/public/icons/Friend.png", recordingUrl: "/public/records/hospital.m4a" },
]);

const supermarketReasonChoices = createGroup("places", "السوبرماركت", [
  { title: "لشراء أكل", expression: "أريد الذهاب إلى السوبرماركت لشراء أكل", imageUrl: "/public/icons/Eating.png", recordingUrl: "/public/recordss/Supermarket.m4a" },
  { title: "لشراء عيش", expression: "أريد الذهاب إلى السوبرماركت لشراء عيش", imageUrl: "/public/Food and Drink/esh.png", recordingUrl: "/public/recordss/Supermarket.m4a" },
  { title: "لشراء سناكس", expression: "أريد الذهاب إلى السوبرماركت لشراء سناكس", imageUrl: "/public/icons/Snack.png", recordingUrl: "/public/recordss/Supermarket.m4a" },
]);

const universityReasonChoices = createGroup("places", "الجامعة", [
  { title: "للمذاكرة", expression: "أريد الذهاب إلى الجامعة للمذاكرة", imageUrl: "/public/icons/Read.png", recordingUrl: "/public/recordss/University.m4a" },
  { title: "للمحاضرة", expression: "أريد الذهاب إلى الجامعة للمحاضرة", imageUrl: "/public/talk/Lecture.png", recordingUrl: "/public/recordss/University.m4a" },
  { title: "للامتحان", expression: "أريد الذهاب إلى الجامعة للامتحان", imageUrl: "/public/Questions/whichone.png", recordingUrl: "/public/recordss/University.m4a" },
]);

const workReasonChoices = createGroup("places", "العمل", [
  { title: "للعمل", expression: "أريد الذهاب إلى العمل", imageUrl: "/public/Places/work.png", recordingUrl: "/public/records/work.m4a" },
  { title: "لمقابلة الزملاء", expression: "أريد الذهاب إلى العمل لمقابلة الزملاء", imageUrl: "/public/icons/Friend.png", recordingUrl: "/public/records/work.m4a" },
  { title: "لإنهاء مهمتي", expression: "أريد الذهاب إلى العمل لإنهاء مهمتي", imageUrl: "/public/icons/Yes.png", recordingUrl: "/public/records/work.m4a" },
]);

const busStationReasonChoices = createGroup("places", "محطة أتوبيس", [
  { title: "للسفر", expression: "أريد الذهاب إلى محطة الأتوبيس للسفر", imageUrl: "/public/Transport/10.png", recordingUrl: "/public/recordss/Bus_station.m4a" },
  { title: "لركوب الباص", expression: "أريد الذهاب إلى محطة الأتوبيس لركوب الباص", imageUrl: "/public/Transport/5.png", recordingUrl: "/public/recordss/Bus_station.m4a" },
  { title: "للذهاب إلى البيت", expression: "أريد الذهاب إلى محطة الأتوبيس للذهاب إلى البيت", imageUrl: "/public/Places/home.png", recordingUrl: "/public/recordss/Bus_station.m4a" },
]);

const transportBusChoices = createGroup("Transport", "باص", [
  { title: "باص إلى المدرسة", expression: "أريد باص إلى المدرسة", imageUrl: "/public/Places/school.png", recordingUrl: "/public/recordss/Bus.m4a" },
  { title: "باص إلى البيت", expression: "أريد باص إلى البيت", imageUrl: "/public/Places/home.png", recordingUrl: "/public/recordss/Bus.m4a" },
  { title: "باص إلى المستشفى", expression: "أريد باص إلى المستشفى", imageUrl: "/public/Places/hospital.png", recordingUrl: "/public/recordss/Bus.m4a" },
]);

const transportCarChoices = createGroup("Transport", "سيارة", [
  { title: "سيارة مع بابا", expression: "أريد الذهاب بالسيارة مع بابا", imageUrl: "/public/Family/4.png", recordingUrl: "/public/recordss/Car.m4a" },
  { title: "سيارة مع ماما", expression: "أريد الذهاب بالسيارة مع ماما", imageUrl: "/public/Family/3.png", recordingUrl: "/public/recordss/Car.m4a" },
  { title: "سيارة إلى المدرسة", expression: "أريد سيارة إلى المدرسة", imageUrl: "/public/Places/school.png", recordingUrl: "/public/recordss/Car.m4a" },
]);

const transportTaxiChoices = createGroup("Transport", "تاكسي", [
  { title: "تاكسي إلى البيت", expression: "أريد تاكسي إلى البيت", imageUrl: "/public/Places/home.png", recordingUrl: "/public/recordss/Taxi-1.m4a" },
  { title: "تاكسي إلى المستشفى", expression: "أريد تاكسي إلى المستشفى", imageUrl: "/public/Places/hospital.png", recordingUrl: "/public/recordss/Taxi-1.m4a" },
  { title: "تاكسي بسرعة", expression: "أريد تاكسي بسرعة", imageUrl: "/public/Transport/2.png", recordingUrl: "/public/recordss/Taxi-1.m4a" },
]);

const transportTrainChoices = createGroup("Transport", "قطار", [
  { title: "قطار للسفر", expression: "أريد قطارًا للسفر", imageUrl: "/public/Transport/10.png", recordingUrl: "/public/recordss/Train.m4a" },
  { title: "قطار لزيارة العائلة", expression: "أريد قطارًا لزيارة العائلة", imageUrl: "/public/icons/Family.png", recordingUrl: "/public/recordss/Train.m4a" },
  { title: "قطار إلى العمل", expression: "أريد قطارًا إلى العمل", imageUrl: "/public/Places/work.png", recordingUrl: "/public/recordss/Train.m4a" },
]);

const transportBicycleChoices = createGroup("Transport", "عجلة", [
  { title: "عجلة للعب", expression: "أريد عجلة للعب", imageUrl: "/public/icons/Play.png", recordingUrl: "/public/recordss/Bicycle-1.m4a" },
  { title: "عجلة للرياضة", expression: "أريد عجلة للرياضة", imageUrl: "/public/icons/Walk.png", recordingUrl: "/public/recordss/Bicycle-1.m4a" },
  { title: "عجلة لمشوار قريب", expression: "أريد عجلة لمشوار قريب", imageUrl: "/public/Transport/1.png", recordingUrl: "/public/recordss/Bicycle-1.m4a" },
]);

const transportMotorcycleChoices = createGroup("Transport", "دراجة نارية", [
  { title: "موتوسيكل مع بابا", expression: "أريد ركوب الموتوسيكل مع بابا", imageUrl: "/public/Family/4.png", recordingUrl: "/public/recordss/Motorcycle.m4a" },
  { title: "موتوسيكل بسرعة", expression: "أريد موتوسيكل بسرعة", imageUrl: "/public/Transport/3.png", recordingUrl: "/public/recordss/Motorcycle.m4a" },
]);

const transportAirplaneChoices = createGroup("Transport", "طائرة", [
  { title: "طائرة للسفر", expression: "أريد طائرة للسفر", imageUrl: "/public/Transport/4.png", recordingUrl: "/public/recordss/Transport.m4a" },
  { title: "طائرة للإجازة", expression: "أريد طائرة للإجازة", imageUrl: "/public/Transport/4.png", recordingUrl: "/public/recordss/Transport.m4a" },
  { title: "طائرة لزيارة الأقارب", expression: "أريد طائرة لزيارة الأقارب", imageUrl: "/public/icons/Family.png", recordingUrl: "/public/recordss/Transport.m4a" },
]);

const transportTramChoices = createGroup("Transport", "ترام", [
  { title: "ترام إلى المدرسة", expression: "أريد ترامًا إلى المدرسة", imageUrl: "/public/Places/school.png", recordingUrl: "/public/recordss/Transport.m4a" },
  { title: "ترام إلى السوق", expression: "أريد ترامًا إلى السوق", imageUrl: "/public/icons/Shopping.png", recordingUrl: "/public/recordss/Transport.m4a" },
  { title: "ترام إلى البيت", expression: "أريد ترامًا إلى البيت", imageUrl: "/public/Places/home.png", recordingUrl: "/public/recordss/Transport.m4a" },
]);

const transportShipChoices = createGroup("Transport", "سفينة", [
  { title: "سفينة للسفر", expression: "أريد سفينة للسفر", imageUrl: "/public/Transport/9.png", recordingUrl: "/public/recordss/Ship.m4a" },
  { title: "سفينة لرحلة", expression: "أريد سفينة لرحلة", imageUrl: "/public/Transport/9.png", recordingUrl: "/public/recordss/Ship.m4a" },
]);

const transportElevatorChoices = createGroup("Transport", "أسانسير", [
  { title: "أطلع فوق", expression: "أريد استخدام الأسانسير لأطلع فوق", imageUrl: "/public/Relations/up.png", recordingUrl: "/public/recordss/Transport.m4a" },
  { title: "أنزل تحت", expression: "أريد استخدام الأسانسير لأنزل تحت", imageUrl: "/public/Relations/down.png", recordingUrl: "/public/recordss/Transport.m4a" },
  { title: "أطلع للشقة", expression: "أريد استخدام الأسانسير لأطلع للشقة", imageUrl: "/public/Places/home.png", recordingUrl: "/public/recordss/Transport.m4a" },
]);

const callMobileChoices = createGroup("Call", "موبايل", [
  { title: "أكلم ماما", expression: "أريد أكلم ماما", imageUrl: "/public/Family/3.png", recordingUrl: "/public/recordss/Mother.m4a" },
  { title: "أكلم بابا", expression: "أريد أكلم بابا", imageUrl: "/public/Family/4.png", recordingUrl: "/public/recordss/Father.m4a" },
  { title: "أكلم أختي", expression: "أريد أكلم أختي", imageUrl: "/public/Family/1.png", recordingUrl: "/public/recordss/Sister.m4a" },
  { title: "أكلم أخويا", expression: "أريد أكلم أخويا", imageUrl: "/public/Family/7.png", recordingUrl: "/public/recordss/Brother.m4a" },
  { title: "أكلم عمي", expression: "أريد أكلم عمي", imageUrl: "/public/Family/6.png", recordingUrl: "/public/recordss/Uncle.m4a" },
  { title: "أكلم خالي", expression: "أريد أكلم خالي", imageUrl: "/public/Family/6.png", recordingUrl: "/public/recordss/Unclee.m4a" },
]);

const callVideoChoices = createGroup("Call", "مكالمة فيديو", [
  { title: "فيديو كول لماما", expression: "أريد فيديو كول مع ماما", imageUrl: "/public/Family/3.png", recordingUrl: "/public/recordss/Family.m4a" },
  { title: "فيديو كول لبابا", expression: "أريد فيديو كول مع بابا", imageUrl: "/public/Family/4.png", recordingUrl: "/public/recordss/Family.m4a" },
  { title: "فيديو كول لأختي", expression: "أريد فيديو كول مع أختي", imageUrl: "/public/Family/1.png", recordingUrl: "/public/recordss/Family.m4a" },
  { title: "فيديو كول لصاحبي", expression: "أريد فيديو كول مع صاحبي", imageUrl: "/public/icons/Friend.png", recordingUrl: "/public/recordss/Family.m4a" },
]);

const callLandlineChoices = createGroup("Call", "هاتف أرضي", [
  { title: "أكلم البيت", expression: "أريد أكلم البيت", imageUrl: "/public/Places/home.png", recordingUrl: "/public/recordss/Home.m4a" },
  { title: "أكلم جدي", expression: "أريد أكلم جدي", imageUrl: "/public/Family/2.png", recordingUrl: "/public/recordss/Home.m4a" },
  { title: "أكلم جدتي", expression: "أريد أكلم جدتي", imageUrl: "/public/Family/10.png", recordingUrl: "/public/recordss/Home.m4a" },
]);

const callMessengerChoices = createGroup("Call", "رسائل", [
  { title: "أبعت لماما", expression: "أريد أبعت لماما", imageUrl: "/public/Family/3.png", recordingUrl: "/public/recordss/Mother.m4a" },
  { title: "أبعت لبابا", expression: "أريد أبعت لبابا", imageUrl: "/public/Family/4.png", recordingUrl: "/public/recordss/Father.m4a" },
  { title: "أبعت لصاحبي", expression: "أريد أبعت لصاحبي", imageUrl: "/public/icons/Friend.png", recordingUrl: "/public/recordss/Family.m4a" },
  { title: "أبعت للجار", expression: "أريد أبعت للجار", imageUrl: "/public/memories/neighborhood.png", recordingUrl: "/public/recordss/Family.m4a" },
]);

const callConferenceChoices = createGroup("Call", "مؤتمر", [
  { title: "مكالمة جماعية للعيلة", expression: "أريد مكالمة جماعية للعيلة", imageUrl: "/public/icons/Family.png", recordingUrl: "/public/recordss/Family.m4a" },
  { title: "مكالمة جماعية للأصحاب", expression: "أريد مكالمة جماعية للأصحاب", imageUrl: "/public/talk/GroupChat.png", recordingUrl: "/public/recordss/Family.m4a" },
]);

const emergencyCallChoices = createGroup("Call", "مكالمة طوارئ", [
  { title: "أكلم الإسعاف", expression: "أريد أكلم الإسعاف", imageUrl: "/public/icons/Doctor.png", recordingUrl: "/public/recordss/Hospital.m4a" },
  { title: "أكلم الشرطة", expression: "أريد أكلم الشرطة", imageUrl: "/public/call/DialPad.png", recordingUrl: "/public/recordss/Hospital.m4a" },
  { title: "أكلم المطافي", expression: "أريد أكلم المطافي", imageUrl: "/public/listen/Alert.png", recordingUrl: "/public/recordss/Hospital.m4a" },
  { title: "أكلم الدكتور", expression: "أريد أكلم الدكتور", imageUrl: "/public/icons/Doctor.png", recordingUrl: "/public/recordss/Hospital.m4a" },
]);

const showerChoices = createGroup("Bathroom", "استحمام", [
  { title: "فتح الماء", expression: "افتح الماء", imageUrl: "/public/icons/Shower.png", recordingUrl: "/public/records/water.m4a" },
  { title: "استخدم الصابون", expression: "استخدم الصابون", imageUrl: "/public/icons/Shower.png", recordingUrl: "/public/records/water.m4a" },
  { title: "غسل الجسم", expression: "اغسل جسمك", imageUrl: "/public/icons/Shower.png", recordingUrl: "/public/records/water.m4a" },
  { title: "استخدم المنشفة", expression: "جفف بالمنشفة", imageUrl: "/public/icons/Shower.png", recordingUrl: "/public/records/water.m4a" },
]);

const toiletChoices = createGroup("Bathroom", "المرحاض", [
  { title: "اجلس", expression: "اجلس على المرحاض", imageUrl: "/public/icons/Toilet.png", recordingUrl: "/public/recordss/Toilet.m4a" },
  { title: "اسحب السيفون", expression: "اسحب السيفون", imageUrl: "/public/icons/Toilet.png", recordingUrl: "/public/recordss/Toilet.m4a" },
  { title: "استخدم ورق التواليت", expression: "استخدم ورق التواليت", imageUrl: "/public/icons/Toilet.png", recordingUrl: "/public/recordss/Toilet.m4a" },
  { title: "نظف نفسك", expression: "نظف نفسك", imageUrl: "/public/icons/Toilet.png", recordingUrl: "/public/recordss/Toilet.m4a" },
]);

const brushTeethChoices = createGroup("Bathroom", "تنظيف الأسنان", [
  { title: "فرشاة أسنان", expression: "استخدم الفرشاة", imageUrl: "/public/icons/BrushTeeth.png", recordingUrl: "/public/recordss/Teeth.m4a" },
  { title: "معجون أسنان", expression: "ضع المعجون", imageUrl: "/public/icons/BrushTeeth.png", recordingUrl: "/public/recordss/Teeth.m4a" },
  { title: "نظف أسنانك", expression: "نظف أسنانك", imageUrl: "/public/icons/BrushTeeth.png", recordingUrl: "/public/recordss/Teeth.m4a" },
  { title: "تمضمض", expression: "تمضمض", imageUrl: "/public/icons/BrushTeeth.png", recordingUrl: "/public/recordss/Teeth.m4a" },
]);

const washHandsChoices = createGroup("Bathroom", "غسل اليدين", [
  { title: "فتح الماء", expression: "افتح الماء", imageUrl: "/public/icons/WashHands.png", recordingUrl: "/public/records/water.m4a" },
  { title: "استخدم الصابون", expression: "استخدم الصابون", imageUrl: "/public/icons/WashHands.png", recordingUrl: "/public/records/water.m4a" },
  { title: "اغسل يديك", expression: "اغسل يديك", imageUrl: "/public/icons/WashHands.png", recordingUrl: "/public/records/water.m4a" },
  { title: "جفف يديك", expression: "جفف يديك", imageUrl: "/public/icons/WashHands.png", recordingUrl: "/public/records/water.m4a" },
]);

const leisureSportsChoices = createGroup("Leisure", "رياضة", [
  { title: "كرة قدم", expression: "أريد لعب كرة القدم", imageUrl: "/public/Play/football.png", recordingUrl: "/public/recordss/Sport.m4a" },
  { title: "كرة سلة", expression: "أريد لعب كرة السلة", imageUrl: "/public/Play/basketball.png", recordingUrl: "/public/recordss/Sport.m4a" },
  { title: "سباحة", expression: "أريد السباحة", imageUrl: "/public/Play/swimming.png", recordingUrl: "/public/recordss/Sport.m4a" },
  { title: "جري", expression: "أريد الجري", imageUrl: "/public/Play/running.png", recordingUrl: "/public/recordss/Sport.m4a" },
]);

const leisureGamesChoices = createGroup("Leisure", "ألعاب", [
  { title: "ألعاب لوحية", expression: "أريد لعب ألعاب لوحية", imageUrl: "/public/Play/board-games.png", recordingUrl: "/public/records/game.m4a" },
  { title: "شطرنج", expression: "أريد لعب الشطرنج", imageUrl: "/public/Play/chess.png", recordingUrl: "/public/records/game.m4a" },
  { title: "ألغاز", expression: "أريد حل لغز", imageUrl: "/public/Questions/whichone.png", recordingUrl: "/public/records/game.m4a" },
  { title: "ألعاب ورق", expression: "أريد لعب ألعاب ورق", imageUrl: "/public/icons/Game.png", recordingUrl: "/public/records/game.m4a" },
]);

const leisureVideoGamesChoices = createGroup("Leisure", "ألعاب فيديو", [
  { title: "سباق سيارات", expression: "أريد لعب سباق سيارات", imageUrl: "/public/Play/video-games.png", recordingUrl: "/public/records/game.m4a" },
  { title: "لعبة كرة قدم", expression: "أريد لعب لعبة كرة قدم", imageUrl: "/public/Play/football.png", recordingUrl: "/public/records/game.m4a" },
  { title: "لعبة مغامرات", expression: "أريد لعب لعبة مغامرات", imageUrl: "/public/Play/video-games.png", recordingUrl: "/public/records/game.m4a" },
  { title: "لعبة ألغاز", expression: "أريد لعب لعبة ألغاز", imageUrl: "/public/Questions/whichone.png", recordingUrl: "/public/records/game.m4a" },
]);

const leisureBeachChoices = createGroup("Leisure", "شاطئ", [
  { title: "سباحة", expression: "أريد السباحة", imageUrl: "/public/Play/swimming.png", recordingUrl: "/public/records/park.m4a" },
  { title: "المشي على الشاطئ", expression: "أريد المشي على الشاطئ", imageUrl: "/public/Relations/outside.png", recordingUrl: "/public/records/park.m4a" },
  { title: "اللعب في الرمل", expression: "أريد اللعب في الرمل", imageUrl: "/public/Places/park.png", recordingUrl: "/public/records/park.m4a" },
  { title: "جمع الأصداف", expression: "أريد جمع الأصداف", imageUrl: "/public/Places/park.png", recordingUrl: "/public/records/park.m4a" },
]);

const leisureHobbyChoices = createGroup("Leisure", "هواية", [
  { title: "رسم", expression: "أريد الرسم", imageUrl: "/public/icons/Read.png", recordingUrl: "/public/recordss/Read.m4a" },
  { title: "قراءة", expression: "أريد القراءة", imageUrl: "/public/icons/Book.png", recordingUrl: "/public/recordss/Read.m4a" },
  { title: "كتابة", expression: "أريد الكتابة", imageUrl: "/public/icons/Read.png", recordingUrl: "/public/recordss/Read.m4a" },
  { title: "موسيقى", expression: "أريد الموسيقى", imageUrl: "/public/Music/music-notes.png", recordingUrl: "/public/recordss/Read.m4a" },
]);

const leisureEntertainmentChoices = createGroup("Leisure", "ترفيه", [
  { title: "مشاهدة التلفاز", expression: "أريد مشاهدة التلفاز", imageUrl: "/public/icons/TV.png", recordingUrl: "/public/records/game.m4a" },
  { title: "مشاهدة فيلم", expression: "أريد مشاهدة فيلم", imageUrl: "/public/TV/movie.png", recordingUrl: "/public/records/game.m4a" },
  { title: "الاستماع للموسيقى", expression: "أريد الاستماع للموسيقى", imageUrl: "/public/Music/music-notes.png", recordingUrl: "/public/records/game.m4a" },
  { title: "الخروج", expression: "أريد الخروج", imageUrl: "/public/Relations/outside.png", recordingUrl: "/public/records/game.m4a" },
]);

const leisureShowChoices = createGroup("Leisure", "عرض", [
  { title: "سيرك", expression: "أريد مشاهدة سيرك", imageUrl: "/public/TV/cartoon.png", recordingUrl: "/public/records/game.m4a" },
  { title: "مسرح", expression: "أريد مشاهدة مسرح", imageUrl: "/public/TV/drama.png", recordingUrl: "/public/records/game.m4a" },
  { title: "عرض رقص", expression: "أريد مشاهدة عرض رقص", imageUrl: "/public/icons/Excited.png", recordingUrl: "/public/records/game.m4a" },
  { title: "عرض سحري", expression: "أريد مشاهدة عرض سحري", imageUrl: "/public/icons/TV.png", recordingUrl: "/public/records/game.m4a" },
]);

const animalAnatomyChoices = createGroup("Animals", "تشريح", [
  { title: "رأس", expression: "هذا رأس الحيوان", imageUrl: "/public/Animals/Dog.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "جسم", expression: "هذا جسم الحيوان", imageUrl: "/public/Animals/Cat.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "أرجل", expression: "هذه أرجل الحيوان", imageUrl: "/public/Animals/Dog.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "ذيل", expression: "هذا ذيل الحيوان", imageUrl: "/public/Animals/Cat.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "أجنحة", expression: "هذه أجنحة الحيوان", imageUrl: "/public/Animals/Bird.png", recordingUrl: "/public/recordss/Animals.m4a" },
]);

const animalNutritionChoices = createGroup("Animals", "تغذية", [
  { title: "عشب", expression: "الحيوان يأكل عشب", imageUrl: "/public/Food and Drink/vegetablesz.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "لحم", expression: "الحيوان يأكل لحم", imageUrl: "/public/Food and Drink/meat.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "سمك", expression: "الحيوان يأكل سمك", imageUrl: "/public/Food and Drink/fish.png", recordingUrl: "/public/recordss/Fish.m4a" },
  { title: "بذور", expression: "الحيوان يأكل بذور", imageUrl: "/public/Food and Drink/16.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "ماء", expression: "الحيوان يشرب ماء", imageUrl: "/public/Food and Drink/water.png", recordingUrl: "/public/records/water.m4a" },
]);

const animalTypesChoices = createGroup("Animals", "أنواع الحيوانات", [
  { title: "ثدييات", expression: "هذا حيوان ثديي", imageUrl: "/public/Animals/Dog.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "طيور", expression: "هذا طائر", imageUrl: "/public/Animals/Bird.png", recordingUrl: "/public/recordss/Bird.m4a" },
  { title: "أسماك", expression: "هذا سمك", imageUrl: "/public/Animals/Fish.png", recordingUrl: "/public/recordss/Fish.m4a" },
  { title: "حشرات", expression: "هذه حشرة", imageUrl: "/public/Animals/7shraat.png", recordingUrl: "/public/recordss/Animals.m4a" },
]);

const animalReproductionChoices = createGroup("Animals", "التكاثر", [
  { title: "بيضة", expression: "الحيوان يبيض", imageUrl: "/public/Food and Drink/egg.png", recordingUrl: "/public/recordss/Egg.m4a" },
  { title: "ولادة", expression: "الحيوان يلد", imageUrl: "/public/Family/8.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "صغير الحيوان", expression: "هذا صغير الحيوان", imageUrl: "/public/Family/8.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "نمو", expression: "هذا نمو الحيوان", imageUrl: "/public/Feelings/12.png", recordingUrl: "/public/recordss/Animals.m4a" },
]);

const animalPhysiologyChoices = createGroup("Animals", "فسيولوجيا", [
  { title: "تنفس", expression: "الحيوان يتنفس", imageUrl: "/public/Animals/Dog.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "قلب", expression: "هذا قلب الحيوان", imageUrl: "/public/Family/3.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "دم", expression: "هذا دم الحيوان", imageUrl: "/public/Feelings/3.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "نوم", expression: "الحيوان ينام", imageUrl: "/public/sleeping/bed.png", recordingUrl: "/public/recordss/Animals.m4a" },
]);

const animalEnvironmentChoices = createGroup("Animals", "البيئة", [
  { title: "غابة", expression: "هذا حيوان الغابة", imageUrl: "/public/Places/park.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "صحراء", expression: "هذا حيوان الصحراء", imageUrl: "/public/Places/park.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "محيط", expression: "هذا حيوان المحيط", imageUrl: "/public/Animals/Fish.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "مزرعة", expression: "هذا حيوان المزرعة", imageUrl: "/public/memories/farm_2019.png", recordingUrl: "/public/recordss/Animals.m4a" },
]);

const animalBehaviorChoices = createGroup("Animals", "سلوك", [
  { title: "يجري", expression: "الحيوان يجري", imageUrl: "/public/Play/running.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "يأكل", expression: "الحيوان يأكل", imageUrl: "/public/icons/Eating.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "ينام", expression: "الحيوان ينام", imageUrl: "/public/sleeping/bed.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "يصطاد", expression: "الحيوان يصطاد", imageUrl: "/public/Animals/Dog.png", recordingUrl: "/public/recordss/Animals.m4a" },
]);

const animalHousingChoices = createGroup("Animals", "سكن الحيوانات", [
  { title: "عش", expression: "هذا عش طائر", imageUrl: "/public/Animals/Bird.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "مزرعة", expression: "هذه مزرعة حيوانات", imageUrl: "/public/memories/farm_2019.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "قفص", expression: "هذا قفص حيوان", imageUrl: "/public/Animals/Cat.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "موطن", expression: "هذا موطن الحيوان", imageUrl: "/public/Places/home.png", recordingUrl: "/public/recordss/Animals.m4a" },
]);

const animalTherapyChoices = createGroup("Animals", "العلاج بالحيوانات", [
  { title: "علاج بالكلاب", expression: "العلاج بالكلاب", imageUrl: "/public/Animals/Dog.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "علاج بالخيول", expression: "العلاج بالخيول", imageUrl: "/public/Transport/1.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "حيوانات هادئة", expression: "الحيوانات الهادئة تساعد", imageUrl: "/public/icons/Relax.png", recordingUrl: "/public/recordss/Animals.m4a" },
]);

const animalPetsWildChoices = createGroup("Animals", "أليفة وبرية", [
  { title: "كلب أليف", expression: "هذا كلب أليف", imageUrl: "/public/Animals/Dog.png", recordingUrl: "/public/recordss/Dog.m4a" },
  { title: "قطة أليفة", expression: "هذه قطة أليفة", imageUrl: "/public/Animals/Cat.png", recordingUrl: "/public/recordss/Cat.m4a" },
  { title: "أسد بري", expression: "هذا أسد بري", imageUrl: "/public/Animals/Dog.png", recordingUrl: "/public/recordss/Animals.m4a" },
  { title: "فيل بري", expression: "هذا فيل بري", imageUrl: "/public/Animals/Dog.png", recordingUrl: "/public/recordss/Animals.m4a" },
]);

const educationActivityChoices = createGroup("Education", "نشاط تعليمي", [
  { title: "شرح الدرس", expression: "اشرح الدرس", imageUrl: "/public/icons/Read.png", recordingUrl: "/public/recordss/Read.m4a" },
  { title: "طرح سؤال", expression: "اطرح سؤال", imageUrl: "/public/Questions/who.png", recordingUrl: "/public/recordss/Who.m4a" },
  { title: "إجابة", expression: "أجب على السؤال", imageUrl: "/public/icons/Yes.png", recordingUrl: "/public/recordss/Read.m4a" },
  { title: "مناقشة", expression: "ناقش مع الآخرين", imageUrl: "/public/talk/Discussion.png", recordingUrl: "/public/recordss/Read.m4a" },
]);

const educationSubjectChoices = createGroup("Education", "مادة دراسية", [
  { title: "رياضيات", expression: "أريد دراسة الرياضيات", imageUrl: "/public/icons/Book.png", recordingUrl: "/public/recordss/Book.m4a" },
  { title: "علوم", expression: "أريد دراسة العلوم", imageUrl: "/public/icons/Read.png", recordingUrl: "/public/recordss/Read.m4a" },
  { title: "إنجليزي", expression: "أريد دراسة الإنجليزي", imageUrl: "/public/icons/Book.png", recordingUrl: "/public/recordss/Book.m4a" },
  { title: "تاريخ", expression: "أريد دراسة التاريخ", imageUrl: "/public/icons/Read.png", recordingUrl: "/public/recordss/Read.m4a" },
]);

const educationInstitutionChoices = createGroup("Education", "مؤسسة تعليمية", [
  { title: "مدرسة", expression: "اذهب إلى المدرسة", imageUrl: "/public/Places/school.png", recordingUrl: "/public/recordss/School.m4a" },
  { title: "جامعة", expression: "اذهب إلى الجامعة", imageUrl: "/public/Places/university.png", recordingUrl: "/public/recordss/University.m4a" },
  { title: "مركز تدريب", expression: "اذهب إلى مركز تدريب", imageUrl: "/public/icons/Read.png", recordingUrl: "/public/recordss/Read.m4a" },
]);

const educationTaskChoices = createGroup("Education", "مهمة تعليمية", [
  { title: "واجب", expression: "اعمل الواجب", imageUrl: "/public/icons/Book.png", recordingUrl: "/public/recordss/Book.m4a" },
  { title: "امتحان", expression: "أدخل الامتحان", imageUrl: "/public/Questions/whichone.png", recordingUrl: "/public/recordss/Book.m4a" },
  { title: "تكليف", expression: "أنهِ التكليف", imageUrl: "/public/icons/Yes.png", recordingUrl: "/public/recordss/Book.m4a" },
]);

const educationMaterialChoices = createGroup("Education", "مواد تعليمية", [
  { title: "كتاب", expression: "استخدم الكتاب", imageUrl: "/public/icons/Book.png", recordingUrl: "/public/recordss/Book.m4a" },
  { title: "كراسة", expression: "اكتب في الكراسة", imageUrl: "/public/icons/Read.png", recordingUrl: "/public/recordss/Book.m4a" },
  { title: "ورقة عمل", expression: "حل ورقة العمل", imageUrl: "/public/icons/Read.png", recordingUrl: "/public/recordss/Book.m4a" },
]);

const educationEquipmentChoices = createGroup("Education", "معدات تعليمية", [
  { title: "قلم", expression: "استخدم القلم", imageUrl: "/public/Tools/11.png", recordingUrl: "/public/recordss/Pen.m4a" },
  { title: "لاب توب", expression: "استخدم اللاب توب", imageUrl: "/public/Tools/8.png", recordingUrl: "/public/recordss/Computer.m4a" },
  { title: "بروجكتور", expression: "استخدم البروجكتور", imageUrl: "/public/icons/TV.png", recordingUrl: "/public/recordss/Tool.m4a" },
]);

const educationSpaceChoices = createGroup("Education", "مكان تعليمي", [
  { title: "فصل", expression: "اذهب إلى الفصل", imageUrl: "/public/Places/school.png", recordingUrl: "/public/recordss/School.m4a" },
  { title: "مكتبة", expression: "اذهب إلى المكتبة", imageUrl: "/public/icons/Book.png", recordingUrl: "/public/recordss/Book.m4a" },
  { title: "معمل", expression: "اذهب إلى المعمل", imageUrl: "/public/icons/Computer.png", recordingUrl: "/public/recordss/Computer.m4a" },
]);

const educationStaffChoices = createGroup("Education", "طاقم تعليمي", [
  { title: "مدرس", expression: "تحدث مع المدرس", imageUrl: "/public/icons/Friend.png", recordingUrl: "/public/recordss/School.m4a" },
  { title: "مساعد", expression: "اسأل المساعد", imageUrl: "/public/icons/Friend.png", recordingUrl: "/public/recordss/School.m4a" },
  { title: "مدير", expression: "قابل المدير", imageUrl: "/public/icons/Friend.png", recordingUrl: "/public/recordss/School.m4a" },
]);

const educationStudentsChoices = createGroup("Education", "طلاب", [
  { title: "زميل", expression: "تحدث مع زميل", imageUrl: "/public/icons/Friend.png", recordingUrl: "/public/recordss/School.m4a" },
  { title: "عمل جماعي", expression: "اعمل في مجموعة", imageUrl: "/public/talk/GroupChat.png", recordingUrl: "/public/recordss/School.m4a" },
]);

const educationMethodChoices = createGroup("Education", "منهجية", [
  { title: "شرح", expression: "اشرح بوضوح", imageUrl: "/public/icons/Read.png", recordingUrl: "/public/recordss/Read.m4a" },
  { title: "تدريب", expression: "تدرب أكثر", imageUrl: "/public/icons/Play.png", recordingUrl: "/public/recordss/Read.m4a" },
  { title: "مراجعة", expression: "راجع الدرس", imageUrl: "/public/icons/Book.png", recordingUrl: "/public/recordss/Book.m4a" },
]);

const educationVocabChoices = createGroup("Education", "مفردات أساسية", [
  { title: "اقرأ", expression: "اقرأ النص", imageUrl: "/public/icons/Read.png", recordingUrl: "/public/recordss/Read.m4a" },
  { title: "اكتب", expression: "اكتب الإجابة", imageUrl: "/public/Tools/11.png", recordingUrl: "/public/recordss/Write.m4a" },
  { title: "استمع", expression: "استمع جيدًا", imageUrl: "/public/icons/Listen.png", recordingUrl: "/public/recordss/Read.m4a" },
]);

const agricultureChoices = createGroup("work", "القطاع الأولي", [
  { title: "زراعة", expression: "أريد العمل في الزراعة", imageUrl: "/public/Food and Drink/vegetablesz.png", recordingUrl: "/public/recordss/Work.m4a" },
  { title: "صيد", expression: "أريد العمل في الصيد", imageUrl: "/public/Food and Drink/fish.png", recordingUrl: "/public/recordss/Fish.m4a" },
]);

const industryChoices = createGroup("work", "القطاع الثانوي", [
  { title: "صناعة", expression: "أريد العمل في الصناعة", imageUrl: "/public/icons/Computer.png", recordingUrl: "/public/recordss/Work.m4a" },
  { title: "بناء", expression: "أريد العمل في البناء", imageUrl: "/public/Places/home.png", recordingUrl: "/public/recordss/Work.m4a" },
]);

const tradeChoices = createGroup("work", "القطاع الثالثي", [
  { title: "تجارة", expression: "أريد العمل في التجارة", imageUrl: "/public/icons/Shopping.png", recordingUrl: "/public/recordss/Work.m4a" },
  { title: "خدمات نقل", expression: "أريد العمل في خدمات النقل", imageUrl: "/public/icons/Transport.png", recordingUrl: "/public/recordss/Transport.m4a" },
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
  ...familyMaternalUncleChoices,
  ...familyAuntChoices,
  ...familyMaternalAuntChoices,
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
