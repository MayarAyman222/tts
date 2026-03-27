// main categories
export const mainCategories = [
  { name: "Real Life Activities" },
  { name: "Reminder Me" },
  { name: "Emergency" },
  { name: "Try and Train to Speak" }
];
 
export const emergencyNumbers = [
  { number: "01063930981", label: "رقم طوارئ 1" },
  { number: "01062021589", label: "رقم طوارئ 2" }
];


export const timePeriods = [
  { name: "Morning", mainCategory: "Real Life Activities", order: 1 },
  { name: "Noon", mainCategory: "Real Life Activities", order: 2 },
  { name: "Afternoon", mainCategory: "Real Life Activities", order: 3 },
  { name: "Evening", mainCategory: "Real Life Activities", order: 4 }
];

export const icons = [
  {
    title: "أكل",
    expression: "أنا جائع",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    audioUrl: "/public/recordss/Eating.m4a",
    category: "Food and Drink",
    timePeriod: "Morning",
    mainCategory: "Real Life Activities"
  },
  {
    title: "ملابس",
    expression: "أريد ارتداء ملابسي",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    audioUrl: "/public/recordss/Clothes.m4a",
    category: "Clothes",
    timePeriod: "Morning",
    mainCategory: "Real Life Activities"
  },
  {
    title: "دواء",
    expression: "أحتاج دوائي",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/3034/3034690.png",
    audioUrl: "/public/recordss/Medicine.m4a",
    category: "Medicine",
    mainCategory: "Reminder Me"
  },
  {
    title: "عائلتي",
    expression: "أريد رؤية عائلتي",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
    audioUrl: "/public/recordss/Family.m4a",
    category: "Family",
    mainCategory: "Reminder Me"
  },
  {
    title: "مشاعر",
    expression: "أشعر بالحزن",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/742/742751.png",
    audioUrl: "/public/recordss/Feelings.m4a",
    category: "Feelings",
    timePeriod: "Evening",
    mainCategory: "Real Life Activities"
  },
  {
    title: "حيوان",
    expression: "أحب الحيوانات",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    audioUrl: "/public/recordss/Animals.m4a",
    category: "Animals",
    timePeriod: "Afternoon",
    mainCategory: "Real Life Activities"
  },
  {
    title: "مكان",
    expression: "أريد الذهاب إلى مكان",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    audioUrl: "/public/recordss/Places.m4a",
    category: "Places",
    timePeriod: "Noon",
    mainCategory: "Real Life Activities"
  },
  {
    title: "سؤال",
    expression: "لدي سؤال",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/471/471664.png",
    audioUrl: "/public/recordss/Q.m4a",
    category: "Questions",
    timePeriod: "Evening",
    mainCategory: "Real Life Activities"
  },
  {
    title: "علاقة",
    expression: "هذا شخص قريب مني",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
    audioUrl: "/public/recordss/Relations.m4a",
    category: "Relations",
    timePeriod: "Evening",
    mainCategory: "Real Life Activities"
  },
  {
    title: "وقت",
    expression: "الوقت الآن",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/992/992700.png",
    audioUrl: "/public/recordss/Times.m4a",
    category: "Times",
    timePeriod: "Evening",
    mainCategory: "Real Life Activities"
  },
  {
    title: "ذكرني",
    expression: "تذكير",
    imageUrl: "/public/memories/memories.png",
    category: "Reminder Mee",
    mainCategory: "Reminder Me"
  },
  {
    title: "جيراني",
    expression: "جيراني",
    imageUrl: "/public/memories/neighborhood.png",
    category: "Neighbours",
    mainCategory: "Reminder Me"
  },
  {
    title: "أدوات",
    expression: "أحتاج أداة",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/3079/3079169.png",
    audioUrl: "/public/recordss/Tools.m4a",
    category: "Tools",
    timePeriod: "Morning",
    mainCategory: "Real Life Activities"
  },
  {
    title: "مواصلات",
    expression: "أريد الذهاب بالمواصلات",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/3774/3774278.png",
    audioUrl: "/public/recordss/Transport.m4a",
    category: "Transport",
    timePeriod: "Noon",
    mainCategory: "Real Life Activities"
  },
  {
    title: "فعل",
    expression: "أريد أن أفعل شيئًا",
    imageUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
    audioUrl: "/public/recordss/Verbs.m4a",
    category: "Verbs",
    timePeriod: "Afternoon",
    mainCategory: "Real Life Activities"
  },
  // ── New top-level categories from second data source ──
  {
    title: "نوم",
    expression: "أريد أن أنام",
    imageUrl: "/public/icons/Sleeping.png",
    category: "Sleeping",
    timePeriod: "Evening",
    mainCategory: "Real Life Activities"
  },
  {
    title: "شرب",
    expression: "أريد أن أشرب",
    imageUrl: "/public/icons/Drinking.png",
    category: "Drinking",
    timePeriod: "Morning",
    mainCategory: "Real Life Activities"
  },
  {
    title: "إفطار",
    expression: "أريد الإفطار",
    imageUrl: "/public/icons/Breakfast.png",
    category: "Breakfast",
    timePeriod: "Morning",
    mainCategory: "Real Life Activities"
  },
  {
    title: "غداء",
    expression: "أريد الغداء",
    imageUrl: "/public/icons/Lunch.png",
    category: "Lunch",
    timePeriod: "Noon",
    mainCategory: "Real Life Activities"
  },
  {
    title: "عشاء",
    expression: "أريد العشاء",
    imageUrl: "/public/icons/Dinner.png",
    category: "Dinner",
    timePeriod: "Evening",
    mainCategory: "Real Life Activities"
  },
  {
    title: "وجبة خفيفة",
    expression: "أريد وجبة خفيفة",
    imageUrl: "/public/icons/Snack.png",
    category: "Snack",
    timePeriod: "Afternoon",
    mainCategory: "Real Life Activities"
  },
  {
    title: "ارتداء ملابس",
    expression: "أريد أن أرتدي ملابسي",
    imageUrl: "/public/icons/GetDressed.png",
    category: "Get Dressed",
    timePeriod: "Morning",
    mainCategory: "Real Life Activities"
  },
  {
    title: "تلفاز",
    expression: "أريد مشاهدة التلفاز",
    imageUrl: "/public/icons/TV.png",
    category: "TV",
    timePeriod: "Evening",
    mainCategory: "Real Life Activities"
  },
  {
    title: "لعب",
    expression: "أريد اللعب",
    imageUrl: "/public/icons/Play.png",
    category: "Play",
    timePeriod: "Afternoon",
    mainCategory: "Real Life Activities"
  },
  {
    title: "موسيقى",
    expression: "أريد الاستماع للموسيقى",
    imageUrl: "/public/icons/Music.png",
    category: "Music",
    timePeriod: "Afternoon",
    mainCategory: "Real Life Activities"
  },
  {
    title: "طبيب",
    expression: "أحتاج لرؤية الطبيب",
    imageUrl: "/public/icons/Doctor.png",
    category: "Doctor",
    mainCategory: "Reminder Me"
  },
  {
    title: "استحمام",
    expression: "أريد الاستحمام",
    imageUrl: "/public/icons/Shower.png",
    category: "Shower",
    timePeriod: "Morning",
    mainCategory: "Real Life Activities"
  },
  {
    title: "خائف",
    expression: "أشعر بالخوف",
    imageUrl: "/public/Feelings/4.png",
    category: "Afraid",
    timePeriod: "Evening",
    mainCategory: "Real Life Activities"
  },
  {
    title: "اتصال",
    expression: "أريد إجراء مكالمة",
    imageUrl: "/public/icons/Call.png",
    category: "Call",
    mainCategory: "Real Life Activities"
  },
  {
    title: "تحدث",
    expression: "أريد أن أتحدث",
    imageUrl: "/public/icons/Talk.png",
    category: "Talk",
    mainCategory: "Real Life Activities"
  },
  {
    title: "استمع",
    expression: "أريد الاستماع",
    imageUrl: "/public/icons/Listen.png",
    category: "Listen",
    mainCategory: "Real Life Activities"
  },
  {
    title: "المنزل",
    expression: "أريد الذهاب إلى المنزل",
    imageUrl: "/public/icons/Home.png",
    category: "Home",
    mainCategory: "Real Life Activities"
  },
  {
    title: "أماكن",
    expression: "أريد الذهاب إلى مكان",
    imageUrl: "/public/icons/Places.png",
    category: "places",
    mainCategory: "Real Life Activities"
  }
];

// ─────────────────────────────────────────────
//  SUB-ICONS
// ─────────────────────────────────────────────

export const animalSubIcons = [
  { title: "طائر", expression: "هذا طائر", imageUrl: "/public/Animals/Bird.png", audioUrl: "/public/recordss/Bird.m4a", category: "Animals" },
  { title: "قطة", expression: "هذه قطة", imageUrl: "/public/Animals/Cat.png", audioUrl: "/public/recordss/Cat.m4a", category: "Animals" },
  { title: "كلب", expression: "هذا كلب", imageUrl: "/public/Animals/Dog.png", audioUrl: "/public/recordss/Dog.m4a", category: "Animals" },
  { title: "سمكة", expression: "هذه سمكة", imageUrl: "/public/Animals/Fish.png", audioUrl: "/public/recordss/Fish.m4a", category: "Animals" },
  { title: "حشرة", expression: "هذه حشرة", imageUrl: "/public/Animals/7shraat.png", category: "Animals" }
];

export const clothesSubIcons = [
  { title: "قميص", expression: "هذا قميص", imageUrl: "/public/Clothes/2amis.png", audioUrl: "/public/recordss/Chemise.m4a", category: "Clothes" },
  { title: "بدلة", expression: "هذه بدلة", imageUrl: "/public/Clothes/Badla.png", audioUrl: "/public/recordss/Suit.m4a", category: "Clothes" },
  { title: "بلوزة", expression: "هذه بلوزة", imageUrl: "/public/Clothes/blouse.png", audioUrl: "/public/recordss/Blouse.m4a", category: "Clothes" },
  { title: "بنطلون", expression: "هذا بنطلون", imageUrl: "/public/Clothes/Bntlon.png", audioUrl: "/public/recordss/Pantalon.m4a", category: "Clothes" },
  { title: "فستان", expression: "هذا فستان", imageUrl: "/public/Clothes/Dress.png", audioUrl: "/public/recordss/Dress.m4a", category: "Clothes" },
  { title: "جاكيت", expression: "هذا جاكيت", imageUrl: "/public/Clothes/Jacket.png", audioUrl: "/public/recordss/Jacket.m4a", category: "Clothes" },
  { title: "بيجامة", expression: "هذه بيجامة", imageUrl: "/public/Clothes/Pijama.png", audioUrl: "/public/recordss/Pyjama.m4a", category: "Clothes" },
  { title: "أحذية", expression: "هذه أحذية", imageUrl: "/public/Clothes/Shoes.png", audioUrl: "/public/recordss/Shoes.m4a", category: "Clothes" },
  { title: "جوارب", expression: "هذه جوارب", imageUrl: "/public/Clothes/Shrab.png", category: "Clothes" },
  { title: "تنورة", expression: "هذه تنورة", imageUrl: "/public/Clothes/Skirt.png", audioUrl: "/public/recordss/Skirt.m4a", category: "Clothes" }
];

export const familySubIcons = [
  { title: "أم", expression: "هذه أمي", imageUrl: "/public/Family/3.png", audioUrl: "/public/recordss/Mother.m4a", category: "Family" },
  { title: "أب", expression: "هذا أبي", imageUrl: "/public/Family/4.png", audioUrl: "/public/recordss/Father.m4a", category: "Family" },
  { title: "أخ", expression: "هذا أخي", imageUrl: "/public/Family/7.png", audioUrl: "/public/recordss/Brother.m4a", category: "Family" },
  { title: "أخت", expression: "هذه أختي", imageUrl: "/public/Family/1.png", audioUrl: "/public/recordss/Sister.m4a", category: "Family" },
  { title: "جد", expression: "هذا جدي", imageUrl: "/public/Family/2.png", category: "Family" },
  { title: "جدة", expression: "هذه جدتي", imageUrl: "/public/Family/10.png", audioUrl: "/public/recordss/Auntt.m4a", category: "Family" },
  { title: "عم", expression: "هذا عمي", imageUrl: "/public/Family/6.png", audioUrl: "/public/recordss/Uncle.m4a", category: "Family" },
  { title: "عمة", expression: "هذه عمتي", imageUrl: "/public/Family/5.png", audioUrl: "/public/recordss/Aunt.m4a", category: "Family" },
  { title: "ابن/بنت العم", expression: "هذا ابن عمي", imageUrl: "/public/Family/9.png", audioUrl: "/public/recordss/Cousin.m4a", category: "Family" },
  { title: "طفل", expression: "هذا طفل", imageUrl: "/public/Family/8.png", category: "Family" },
  { title: "خالي", expression: "هذا خالي", imageUrl: "/public/Family/9.png", audioUrl: "/public/recordss/Unclee.m4a", category: "Family" },
  { title: "خالتي", expression: "هذه خالتي", imageUrl: "/public/Family/10.png", audioUrl: "/public/recordss/Auntt.m4a", category: "Family" }
];

export const feelingsSubIcons = [
  { title: "سعيد", expression: "أنا سعيد", imageUrl: "/public/Feelings/1.png", audioUrl: "/public/records/happy.m4a", category: "Feelings" },
  { title: "منبهر", expression: "أنا منبهر", imageUrl: "/public/Feelings/2.png", audioUrl: "/public/records/sad.m4a", category: "Feelings" },
  { title: "غاضب", expression: "أنا غاضب", imageUrl: "/public/Feelings/3.png", audioUrl: "/public/records/angry.m4a", category: "Feelings" },
  { title: "خائف", expression: "أنا خائف", imageUrl: "/public/Feelings/4.png", audioUrl: "/public/records/afraid.m4a", category: "Feelings" },
  { title: "متعب", expression: "أنا متعب", imageUrl: "/public/Feelings/5.png", audioUrl: "/public/records/tired.m4a", category: "Feelings" },
  { title: "متحمس", expression: "أنا متحمس", imageUrl: "/public/Feelings/6.png", audioUrl: "/public/records/excited.m4a", category: "Feelings" },
  { title: "مندهش", expression: "أنا مندهش", imageUrl: "/public/Feelings/7.png", category: "Feelings" },
  { title: "مرتاح", expression: "أنا مرتاح", imageUrl: "/public/Feelings/8.png", category: "Feelings" },
  { title: "مضطرب", expression: "أنا مضطرب", imageUrl: "/public/Feelings/9.png", audioUrl: "/public/records/edtrab.m4a", category: "Feelings" },
  { title: "مستغرب", expression: "أنا مستغرب", imageUrl: "/public/Feelings/10.png", category: "Feelings" },
  { title: "محبط", expression: "أنا محبط", imageUrl: "/public/Feelings/11.png", category: "Feelings" },
  { title: "فخور", expression: "أنا فخور", imageUrl: "/public/Feelings/12.png", audioUrl: "/public/records/e7bat.m4a", category: "Feelings" },
  { title: "متفائل", expression: "أنا متفائل", imageUrl: "/public/Feelings/13.png", audioUrl: "/public/records/tafa2ol.m4a", category: "Feelings" }
];

export const foodAndDrinkSubIcons = [
  { title: "تفاح", expression: "هذا تفاح", imageUrl: "/public/Food and Drink/apple.png", audioUrl: "/public/recordss/Apple.m4a", category: "Food and Drink" },
  { title: "بسكوت", expression: "هذا بسكوت", imageUrl: "/public/Food and Drink/baskot.png", category: "Food and Drink" },
  { title: "بطيخ", expression: "هذا بطيخ", imageUrl: "/public/Food and Drink/batek.png", audioUrl: "/public/recordss/Watermelon.m4a", category: "Food and Drink" },
  { title: "بطاطس", expression: "هذه بطاطس", imageUrl: "/public/Food and Drink/btats.png", category: "Food and Drink" },
  { title: "شوكولاتة", expression: "هذه شوكولاتة", imageUrl: "/public/Food and Drink/chocolate.png", audioUrl: "/public/recordss/Chocolate.m4a", category: "Food and Drink" },
  { title: "بيض", expression: "هذا بيض", imageUrl: "/public/Food and Drink/egg.png", audioUrl: "/public/recordss/Egg.m4a", category: "Food and Drink" },
  { title: "عنب", expression: "هذا عنب", imageUrl: "/public/Food and Drink/enab.png", audioUrl: "/public/recordss/Grapps.m4a", category: "Food and Drink" },
  { title: "عيش", expression: "هذا عيش", imageUrl: "/public/Food and Drink/esh.png", category: "Food and Drink" },
  { title: "سمك", expression: "هذا سمك", imageUrl: "/public/Food and Drink/fish.png", audioUrl: "/public/recordss/Fish.m4a", category: "Food and Drink" },
  { title: "فراخ", expression: "هذه فراخ", imageUrl: "/public/Food and Drink/frahk.png", category: "Food and Drink" },
  { title: "فراولة", expression: "هذه فراولة", imageUrl: "/public/Food and Drink/frawla.png", audioUrl: "/public/recordss/Strawberry.m4a", category: "Food and Drink" },
  { title: "فشار", expression: "هذا فشار", imageUrl: "/public/Food and Drink/fshaar.png", category: "Food and Drink" },
  { title: "جزر", expression: "هذا جزر", imageUrl: "/public/Food and Drink/gazr.png", category: "Food and Drink" },
  { title: "جبنة", expression: "هذه جبنة", imageUrl: "/public/Food and Drink/gebna.png", audioUrl: "/public/recordss/Cheese.m4a", category: "Food and Drink" },
  { title: "جوافة", expression: "هذه جوافة", imageUrl: "/public/Food and Drink/gwafa.png", category: "Food and Drink" },
  { title: "آيس كريم", expression: "هذا آيس كريم", imageUrl: "/public/Food and Drink/icecream.png", category: "Food and Drink" },
  { title: "لبن", expression: "هذا لبن", imageUrl: "/public/Food and Drink/labn.png", category: "Food and Drink" },
  { title: "مانجو", expression: "هذه مانجو", imageUrl: "/public/Food and Drink/mango.png", category: "Food and Drink" },
  { title: "مربى", expression: "هذه مربى", imageUrl: "/public/Food and Drink/marba.png", category: "Food and Drink" },
  { title: "لحم", expression: "هذا لحم", imageUrl: "/public/Food and Drink/meat.png", category: "Food and Drink" },
  { title: "كمثرى", expression: "هذه كمثرى", imageUrl: "/public/Food and Drink/komtra.png", category: "Food and Drink" },
  { title: "خيار", expression: "هذا خيار", imageUrl: "/public/Food and Drink/kyar.png", category: "Food and Drink" },
  { title: "برتقال", expression: "هذا برتقال", imageUrl: "/public/Food and Drink/orange.png", category: "Food and Drink" },
  { title: "بيتزا", expression: "هذه بيتزا", imageUrl: "/public/Food and Drink/pizza.png", audioUrl: "/public/recordss/Pizza.m4a", category: "Food and Drink" },
  { title: "أرز", expression: "هذا أرز", imageUrl: "/public/Food and Drink/roz.png", category: "Food and Drink" },
  { title: "ساندوتش", expression: "هذا ساندوتش", imageUrl: "/public/Food and Drink/sandwich.png", category: "Food and Drink" },
  { title: "شوربة", expression: "هذه شوربة", imageUrl: "/public/Food and Drink/shorba.png", category: "Food and Drink" },
  { title: "طماطم", expression: "هذه طماطم", imageUrl: "/public/Food and Drink/tomato.png", category: "Food and Drink" },
  { title: "خضار", expression: "هذه خضار", imageUrl: "/public/Food and Drink/vegetablesz.png", audioUrl: "/public/recordss/vegetables.m4a", category: "Food and Drink" },
  { title: "ماء", expression: "هذا ماء", imageUrl: "/public/Food and Drink/water.png", audioUrl: "/public/recordss/Water.m4a", category: "Food and Drink" },
  { title: "زبادي", expression: "هذا زبادي", imageUrl: "/public/Food and Drink/zbady.png", audioUrl: "/public/recordss/Yogurt.m4a", category: "Food and Drink" }
];

export const drinkingSubIcons = [
  { title: "ماء", expression: "أريد ماء", imageUrl: "/public/Food and Drink/water.png", audioUrl: "/public/recordss/Water.m4a", category: "Drinking" },
  { title: "عصير مانجو", expression: "أريد عصير مانجو", imageUrl: "/public/Food and Drink/mango.png", category: "Drinking" },
  { title: "عصير تفاح", expression: "أريد عصير تفاح", imageUrl: "/public/Food and Drink/apple.png", category: "Drinking" },
  { title: "عصير جوافة", expression: "أريد عصير جوافة", imageUrl: "/public/Food and Drink/gwafa.png", category: "Drinking" },
  { title: "عصير فراولة", expression: "أريد عصير فراولة", imageUrl: "/public/Food and Drink/frawla.png", category: "Drinking" },
  { title: "عصير شوكولاتة", expression: "أريد عصير شوكولاتة", imageUrl: "/public/Food and Drink/chocolate.png", category: "Drinking" },
  { title: "عصير", expression: "أريد عصير", imageUrl: "/public/Food and Drink/aser.png", category: "Drinking" },
  { title: "لبن", expression: "أريد لبن", imageUrl: "/public/Food and Drink/labn.png", category: "Drinking" },
  { title: "فيروز", expression: "أريد فيروز", imageUrl: "/public/Food and Drink/fayrouz.jpg", category: "Drinking" },
  { title: "شويبس", expression: "أريد شويبس", imageUrl: "/public/Food and Drink/schweppes.jpg", category: "Drinking" },
  { title: "عصير رمان", expression: "أريد عصير رمان", imageUrl: "/public/Food and Drink/roman.jpg", category: "Drinking" },
  { title: "عصير نعناع", expression: "أريد عصير نعناع", imageUrl: "/public/Food and Drink/mint.jpg", category: "Drinking" },
  { title: "سوبيا", expression: "أريد سوبيا", imageUrl: "/public/Food and Drink/sobia.png", category: "Drinking" },
  { title: "شاي", expression: "أريد شاي", imageUrl: "/public/Food and Drink/tea.png", category: "Drinking" },
  { title: "قهوة", expression: "أريد قهوة", imageUrl: "/public/Food and Drink/coffe.png", category: "Drinking" },
  { title: "نسكافيه", expression: "أريد نسكافيه", imageUrl: "/public/Food and Drink/nescafe.png", category: "Drinking" },
  { title: "عصير برتقال", expression: "أريد عصير برتقال", imageUrl: "/public/Food and Drink/orange.png", category: "Drinking" },
  { title: "عصير ليمون", expression: "أريد عصير ليمون", imageUrl: "/public/Food and Drink/lemon.png", category: "Drinking" },
  { title: "بيبسي", expression: "أريد بيبسي", imageUrl: "/public/Food and Drink/pepsi.png", category: "Drinking" },
  { title: "كوكاكولا", expression: "أريد كوكاكولا", imageUrl: "/public/Food and Drink/cocacola.png", category: "Drinking" },
  { title: "سبعة أب", expression: "أريد سبعة أب", imageUrl: "/public/Food and Drink/7up.png", category: "Drinking" },
  { title: "مشروب طاقة", expression: "أريد مشروب طاقة", imageUrl: "/public/Food and Drink/energy-drink.png", category: "Drinking" }
];

export const sleepingSubIcons = [
  { title: "٦ ساعات", expression: "أريد النوم ٦ ساعات", imageUrl: "/public/sleeping/6.png", category: "Sleeping" },
  { title: "٧ ساعات", expression: "أريد النوم ٧ ساعات", imageUrl: "/public/sleeping/7.png", category: "Sleeping" },
  { title: "٨ ساعات", expression: "أريد النوم ٨ ساعات", imageUrl: "/public/Sleeping/8.png", category: "Sleeping" },
  { title: "قيلولة فقط", expression: "أريد قيلولة فقط", imageUrl: "/public/sleeping/siesta.png", category: "Sleeping" },
  { title: "خذني إلى السرير", expression: "خذني إلى السرير", imageUrl: "/public/sleeping/bed.png", category: "Sleeping" },
  { title: "وسادة", expression: "أحتاج وسادة", imageUrl: "/public/sleeping/pillow.png", category: "Sleeping" },
  { title: "غطيني بالبطانية", expression: "غطيني بالبطانية", imageUrl: "/public/sleeping/blanket.png", category: "Sleeping" },
  { title: "أطفئ مصباح الليل", expression: "أطفئ مصباح الليل", imageUrl: "/public/sleeping/night-lamp.png", category: "Sleeping" },
  { title: "للاسترخاء", expression: "أريد الاسترخاء", imageUrl: "/public/sleeping/relax.png", category: "Sleeping" },
  { title: "أشعر بالتعب", expression: "أشعر بالتعب", imageUrl: "/public/sleeping/tired.png", category: "Sleeping" },
  { title: "للاستيقاظ مبكراً", expression: "أريد الاستيقاظ مبكراً", imageUrl: "/public/sleeping/wake-up.png", category: "Sleeping" }
];

export const getDressedSubIcons = [
  { title: "قميص", expression: "أريد قميصاً", imageUrl: "/public/Clothes/2amis.png", audioUrl: "/public/recordss/Chemise.m4a", category: "Get Dressed" },
  { title: "بدلة", expression: "أريد بدلة", imageUrl: "/public/Clothes/Badla.png", audioUrl: "/public/recordss/Suit.m4a", category: "Get Dressed" },
  { title: "بلوزة", expression: "أريد بلوزة", imageUrl: "/public/Clothes/blouse.png", audioUrl: "/public/recordss/Blouse.m4a", category: "Get Dressed" },
  { title: "بنطلون", expression: "أريد بنطلوناً", imageUrl: "/public/Clothes/Bntlon.png", audioUrl: "/public/recordss/Pantalon.m4a", category: "Get Dressed" },
  { title: "فستان", expression: "أريد فستاناً", imageUrl: "/public/Clothes/Dress.png", audioUrl: "/public/recordss/Dress.m4a", category: "Get Dressed" },
  { title: "جاكيت", expression: "أريد جاكيت", imageUrl: "/public/Clothes/Jacket.png", audioUrl: "/public/recordss/Jacket.m4a", category: "Get Dressed" },
  { title: "بيجامة", expression: "أريد بيجامة", imageUrl: "/public/Clothes/Pijama.png", audioUrl: "/public/recordss/Pyjama.m4a", category: "Get Dressed" },
  { title: "أحذية", expression: "أريد أحذية", imageUrl: "/public/Clothes/Shoes.png", audioUrl: "/public/recordss/Shoes.m4a", category: "Get Dressed" },
  { title: "جوارب", expression: "أريد جوارب", imageUrl: "/public/Clothes/Shrab.png", category: "Get Dressed" },
  { title: "تنورة", expression: "أريد تنورة", imageUrl: "/public/Clothes/Skirt.png", audioUrl: "/public/recordss/Skirt.m4a", category: "Get Dressed" }
];

export const transportSubIcons = [
  { title: "عجلة", expression: "أريد استخدام عجلة", imageUrl: "/public/Transport/1.png", audioUrl: "/public/recordss/Bicycle.m4a", category: "Transport" },
  { title: "تاكسي", expression: "أريد استخدام تاكسي", imageUrl: "/public/Transport/2.png", audioUrl: "/public/recordss/Taxi.m4a", category: "Transport" },
  { title: "دراجة نارية", expression: "أريد ركوب دراجة نارية", imageUrl: "/public/Transport/3.png", audioUrl: "/public/recordss/Motorcycle.m4a", category: "Transport" },
  { title: "طائرة", expression: "أريد السفر بالطائرة", imageUrl: "/public/Transport/4.png", audioUrl: "/public/recordss/plan.m4a", category: "Transport" },
  { title: "باص", expression: "أريد ركوب الباص", imageUrl: "/public/Transport/5.png", audioUrl: "/public/recordss/Bus.m4a", category: "Transport" },
  { title: "سيارة", expression: "أريد ركوب السيارة", imageUrl: "/public/Transport/6.png", audioUrl: "/public/recordss/Car.m4a", category: "Transport" },
  { title: "ترام", expression: "أريد ركوب الترام", imageUrl: "/public/Transport/7.png", category: "Transport" },
  { title: "أسانسير", expression: "أريد استخدام الأسانسير", imageUrl: "/public/Transport/8.png", audioUrl: "/public/recordss/Elevator.m4a", category: "Transport" },
  { title: "سفينة", expression: "أريد ركوب السفينة", imageUrl: "/public/Transport/9.png", audioUrl: "/public/recordss/Ship.m4a", category: "Transport" },
  { title: "قطار", expression: "أريد ركوب القطار", imageUrl: "/public/Transport/10.png", audioUrl: "/public/recordss/Train.m4a", category: "Transport" }
];

export const medicineSubIcons = [
  { title: "بروفين", expression: "أحتاج بروفين", imageUrl: "/public/medicine/Profen.png", audioUrl: "/public/recordss/Profeen.m4a", category: "Medicine" },
  { title: "بانادول", expression: "أحتاج بانادول", imageUrl: "/public/medicine/Panadol.png", audioUrl: "/public/recordss/Panadol.m4a", category: "Medicine" },
  { title: "أوجمنتين", expression: "أحتاج أوجمنتين", imageUrl: "/public/medicine/Augmentin.png", audioUrl: "/public/recordss/Aug.m4a", category: "Medicine" },
  { title: "فينادون", expression: "أحتاج فينادون", imageUrl: "/public/medicine/Phenadone.png", audioUrl: "/public/recordss/Phenadon.m4a", category: "Medicine" },
  { title: "فيتامين سي", expression: "أحتاج فيتامين سي", imageUrl: "/public/medicine/VitaminC.png", audioUrl: "/public/recordss/Vitamins.m4a", category: "Medicine" },
  { title: "فيتامين د", expression: "أحتاج فيتامين د", imageUrl: "/public/medicine/VitaminD.png", audioUrl: "/public/recordss/Vitamind.m4a", category: "Medicine" },
  { title: "أسبرين", expression: "أحتاج أسبرين", imageUrl: "/public/medicine/Aspirin.png", audioUrl: "/public/recordss/Asperin.m4a", category: "Medicine" },
  { title: "إيبوبروفين", expression: "أحتاج إيبوبروفين", imageUrl: "/public/medicine/Ibuprofen.png", audioUrl: "/public/recordss/Iprofeen.m4a", category: "Medicine" },
  { title: "زيرتك", expression: "أحتاج زيرتك", imageUrl: "/public/medicine/Zyrtec.png", audioUrl: "/public/recordss/Zertek.m4a", category: "Medicine" },
  { title: "كلاريناس", expression: "أحتاج كلاريناس", imageUrl: "/public/medicine/Clarinase.png", audioUrl: "/public/recordss/Clarinaz.m4a", category: "Medicine" },
  { title: "باراسيتامول", expression: "أحتاج باراسيتامول", imageUrl: "/public/medicine/Paracetamol.png", audioUrl: "/public/recordss/Paracitamol.m4a", category: "Medicine" },
  { title: "فلاجيل", expression: "أحتاج فلاجيل", imageUrl: "/public/medicine/Flagyl.png", audioUrl: "/public/recordss/Phlageel.m4a", category: "Medicine" },
  { title: "سيتيريزين", expression: "أحتاج سيتيريزين", imageUrl: "/public/medicine/Cetirizine.png", audioUrl: "/public/recordss/Sceterezeen.mps.m4a", category: "Medicine" },
  { title: "بيسولفون", expression: "أحتاج بيسولفون", imageUrl: "/public/medicine/Bisolvon.png", audioUrl: "/public/recordss/Bisolovon.m4a", category: "Medicine" },
  { title: "فينتولين", expression: "أحتاج فينتولين", imageUrl: "/public/medicine/Ventolin.png", audioUrl: "/public/recordss/Ventolin.m4a", category: "Medicine" },
  { title: "كاتافلام", expression: "أحتاج كاتافلام", imageUrl: "/public/medicine/Cataflam.png", audioUrl: "/public/recordss/Cataflam.m4a", category: "Medicine" },
  { title: "بروفين (Brufen)", expression: "أحتاج بروفين", imageUrl: "/public/medicine/Brufen.png", audioUrl: "/public/recordss/Brufen.m4a", category: "Medicine" },
  { title: "أوميبرازول", expression: "أحتاج أوميبرازول", imageUrl: "/public/medicine/Omeprazole.png", audioUrl: "/public/recordss/Omperazol.m4a", category: "Medicine" },
  { title: "أنتينال", expression: "أحتاج أنتينال", imageUrl: "/public/medicine/Antinal.png", audioUrl: "/public/recordss/antinal.m4a", category: "Medicine" },
  { title: "ستربسيلز", expression: "أحتاج ستربسيلز", imageUrl: "/public/medicine/Strepsils.png", audioUrl: "/public/recordss/strepsils.m4a", category: "Medicine" }
];

export const doctorSubIcons = [
  { title: "صداع", expression: "أعاني من صداع", imageUrl: "/public/Health/headache.png", category: "Doctor" },
  { title: "حمى", expression: "لدي حمى", imageUrl: "/public/Health/fever.png", category: "Doctor" },
  { title: "سعال", expression: "لدي سعال", imageUrl: "/public/Health/cough.png", category: "Doctor" },
  { title: "نزلة برد", expression: "أعاني من نزلة برد", imageUrl: "/public/Health/cold.png", category: "Doctor" },
  { title: "التهاب حلق", expression: "أعاني من التهاب الحلق", imageUrl: "/public/Health/sore-throat.png", category: "Doctor" },
  { title: "ألم في المعدة", expression: "أعاني من ألم في المعدة", imageUrl: "/public/Health/stomachache.png", category: "Doctor" },
  { title: "ألم في الأسنان", expression: "أعاني من ألم في الأسنان", imageUrl: "/public/Health/toothache.png", category: "Doctor" },
  { title: "ألم في الأذن", expression: "أعاني من ألم في الأذن", imageUrl: "/public/Health/earache.png", category: "Doctor" },
  { title: "ألم في الظهر", expression: "أعاني من ألم في الظهر", imageUrl: "/public/Health/back-pain.png", category: "Doctor" },
  { title: "دوار", expression: "أشعر بالدوار", imageUrl: "/public/Health/dizzy.png", category: "Doctor" },
  { title: "تعب", expression: "أشعر بالتعب", imageUrl: "/public/Health/tired.png", category: "Doctor" },
  { title: "حساسية", expression: "لدي حساسية", imageUrl: "/public/Health/allergies.png", category: "Doctor" },
  { title: "إسهال", expression: "أعاني من إسهال", imageUrl: "/public/Health/diarrhea.png", category: "Doctor" },
  { title: "غثيان", expression: "أشعر بالغثيان", imageUrl: "/public/Health/nausea.png", category: "Doctor" },
  { title: "طفح جلدي", expression: "لدي طفح جلدي", imageUrl: "/public/Health/rash.png", category: "Doctor" }
];

export const afraidSubIcons = [
  { title: "حشرة", expression: "أنا خائف من حشرة", imageUrl: "/public/Animals/7shraat.png", category: "Afraid" },
  { title: "طائر", expression: "أنا خائف من طائر", imageUrl: "/public/Animals/Bird.png", category: "Afraid" },
  { title: "قطة", expression: "أنا خائف من قطة", imageUrl: "/public/Animals/Cat.png", category: "Afraid" },
  { title: "كلب", expression: "أنا خائف من كلب", imageUrl: "/public/Animals/Dog.png", category: "Afraid" },
  { title: "سمك", expression: "أنا خائف من سمك", imageUrl: "/public/Animals/Fish.png", category: "Afraid" }
];

export const callSubIcons = [
  { title: "موبايل", expression: "أريد استخدام الموبايل", imageUrl: "/public/call/moble.png", category: "Call" },
  { title: "سماعة رأس", expression: "أريد سماعة رأس", imageUrl: "/public/call/Headset.png", category: "Call" },
  { title: "لوحة الاتصال", expression: "أريد لوحة الاتصال", imageUrl: "/public/call/DialPad.png", category: "Call" },
  { title: "مكالمة فيديو", expression: "أريد مكالمة فيديو", imageUrl: "/public/call/Videocall.png", category: "Call" },
  { title: "هاتف أرضي", expression: "أريد هاتفاً أرضياً", imageUrl: "/public/call/Landline.png", category: "Call" },
  { title: "رسائل", expression: "أريد إرسال رسائل", imageUrl: "/public/call/Messenger.png", category: "Call" },
  { title: "مؤتمر", expression: "أريد مؤتمر", imageUrl: "/public/call/Conference.png", category: "Call" },
  { title: "مركز اتصال", expression: "أريد مركز اتصال", imageUrl: "/public/call/CallCenter.png", category: "Call" },
  { title: "مكالمة طوارئ", expression: "أريد مكالمة طوارئ", imageUrl: "/public/call/EmergencyCall.png", category: "Call" }
];

export const talkSubIcons = [
  { title: "مناقشة", expression: "أريد مناقشة", imageUrl: "/public/talk/Discussion.png", category: "Talk" },
  { title: "دردشة جماعية", expression: "أريد دردشة جماعية", imageUrl: "/public/talk/GroupChat.png", category: "Talk" },
  { title: "فقاعة رسالة", expression: "أريد إرسال رسالة", imageUrl: "/public/talk/MessageBubble.png", category: "Talk" },
  { title: "فقاعة كلام", expression: "أريد التحدث", imageUrl: "/public/talk/SpeechBubble.png", category: "Talk" },
  { title: "ميكروفون", expression: "أريد ميكروفون", imageUrl: "/public/talk/Microphone.png", category: "Talk" },
  { title: "محادثة", expression: "أريد محادثة", imageUrl: "/public/talk/Conversation.png", category: "Talk" },
  { title: "دردشة صوتية", expression: "أريد دردشة صوتية", imageUrl: "/public/talk/VoiceChat.png", category: "Talk" },
  { title: "إرسال مباشر", expression: "أريد إرسالاً مباشراً", imageUrl: "/public/talk/Broadcast.png", category: "Talk" },
  { title: "إعلان", expression: "أريد إعلاناً", imageUrl: "/public/talk/Announcement.png", category: "Talk" },
  { title: "حوار", expression: "أريد حواراً", imageUrl: "/public/talk/Dialog.png", category: "Talk" }
];

export const listenSubIcons = [
  { title: "سماعات أذن", expression: "أريد سماعات أذن", imageUrl: "/public/listen/Earphones.png", category: "Listen" },
  { title: "موسيقى", expression: "أريد الاستماع للموسيقى", imageUrl: "/public/listen/Music.png", category: "Listen" },
  { title: "بودكاست", expression: "أريد الاستماع لبودكاست", imageUrl: "/public/listen/Podcast.png", category: "Listen" },
  { title: "محاضرة", expression: "أريد الاستماع لمحاضرة", imageUrl: "/public/listen/Lecture.png", category: "Listen" },
  { title: "كتاب صوتي", expression: "أريد الاستماع لكتاب صوتي", imageUrl: "/public/listen/Audiobook.png", category: "Listen" },
  { title: "راديو", expression: "أريد الاستماع للراديو", imageUrl: "/public/listen/Radio.png", category: "Listen" },
  { title: "ملاحظة صوتية", expression: "أريد ملاحظة صوتية", imageUrl: "/public/listen/VoiceNote.png", category: "Listen" },
  { title: "إعلان", expression: "أريد الاستماع لإعلان", imageUrl: "/public/listen/Announcementt.png", category: "Listen" },
  { title: "تنبيه", expression: "أريد تنبيهاً", imageUrl: "/public/listen/Alert.png", category: "Listen" },
  { title: "محادثة", expression: "أريد الاستماع لمحادثة", imageUrl: "/public/listen/Conversationn.png", category: "Listen" }
];

export const homeSubIcons = [
  { title: "غرفة النوم", expression: "أريد الذهاب لغرفة النوم", imageUrl: "/public/Places/bedroom.png", audioUrl: "/public/recordss/Bedroom.m4a", category: "Home" },
  { title: "المطبخ", expression: "أريد الذهاب للمطبخ", imageUrl: "/public/Places/kitchen.png", audioUrl: "/public/recordss/Kitchen.m4a", category: "Home" },
  { title: "غرفة المعيشة", expression: "أريد الذهاب لغرفة المعيشة", imageUrl: "/public/Places/livingroom.png", audioUrl: "/public/recordss/Livingroom.m4a", category: "Home" },
  { title: "الحمام", expression: "أريد الذهاب للحمام", imageUrl: "/public/Places/toilet.png", audioUrl: "/public/recordss/Toilet.m4a", category: "Home" }
];

export const SubIcons = [
  { title: "دراجة نارية", expression: "أريد الذهاب بدراجة نارية", imageUrl: "/public/Places/3.png", audioUrl: "/public/recordss/Motorcycle.m4a", category: "places" },
  { title: "طائرة", expression: "أريد الذهاب بطائرة", imageUrl: "/public/Places/4.png", audioUrl: "/public/recordss/plan.m4a", category: "places" },
  { title: "حافلة", expression: "أريد الذهاب بحافلة", imageUrl: "/public/Places/5.png", audioUrl: "/public/recordss/Bus.m4a", category: "places" },
  { title: "سيارة", expression: "أريد الذهاب بسيارة", imageUrl: "/public/Places/6.png", audioUrl: "/public/recordss/Car.m4a", category: "places" },
  { title: "ترام", expression: "أريد الذهاب بترام", imageUrl: "/public/Places/7.png", category: "places" },
  { title: "أسانسير", expression: "أريد استخدام الأسانسير", imageUrl: "/public/Places/8.png", audioUrl: "/public/recordss/Elevator.m4a", category: "places" },
  { title: "سفينة", expression: "أريد الذهاب بسفينة", imageUrl: "/public/Places/9.png", audioUrl: "/public/recordss/Ship.m4a", category: "places" },
  { title: "قطار", expression: "أريد الذهاب بقطار", imageUrl: "/public/Places/10.png", audioUrl: "/public/recordss/Train.m4a", category: "places" },
  { title: "محطة أتوبيس", expression: "أريد الذهاب إلى محطة أتوبيس", imageUrl: "/public/Places/busstation.png", audioUrl: "/public/recordss/Busstation.m4a", category: "places" },
  { title: "المستشفى", expression: "أريد الذهاب إلى المستشفى", imageUrl: "/public/Places/hospital.png", audioUrl: "/public/recordss/Hospital.m4a", category: "places" },
  { title: "المنزل", expression: "أريد الذهاب إلى المنزل", imageUrl: "/public/Places/home.png", audioUrl: "/public/recordss/Home.m4a", category: "places" },
  { title: "الحديقة", expression: "أريد الذهاب إلى الحديقة", imageUrl: "/public/Places/park.png", audioUrl: "/public/recordss/Park.m4a", category: "places" },
  { title: "المدرسة", expression: "أريد الذهاب إلى المدرسة", imageUrl: "/public/Places/school.png", audioUrl: "/public/recordss/School.m4a", category: "places" },
  { title: "السوبرماركت", expression: "أريد الذهاب إلى السوبرماركت", imageUrl: "/public/Places/supermarket.png", audioUrl: "/public/recordss/Supermarket.m4a", category: "places" },
  { title: "الجامعة", expression: "أريد الذهاب إلى الجامعة", imageUrl: "/public/Places/university.png", audioUrl: "/public/recordss/University.m4a", category: "places" },
  { title: "العمل", expression: "أريد الذهاب إلى العمل", imageUrl: "/public/Places/work.png", audioUrl: "/public/recordss/Work.m4a", category: "places" }
];

export const breakfastSubIcons = [
  { title: "خبز", expression: "أريد خبزاً", imageUrl: "/public/breakfast/breadd.png", category: "Breakfast" },
  { title: "بيض", expression: "أريد بيضاً", imageUrl: "/public/breakfast/eggs.png", category: "Breakfast" },
  { title: "جبن", expression: "أريد جبناً", imageUrl: "/public/breakfast/cheese.png", category: "Breakfast" },
  { title: "حليب", expression: "أريد حليباً", imageUrl: "/public/breakfast/milk.png", category: "Breakfast" },
  { title: "عصير", expression: "أريد عصيراً", imageUrl: "/public/breakfast/juice.png", category: "Breakfast" },
  { title: "حبوب إفطار", expression: "أريد حبوب إفطار", imageUrl: "/public/breakfast/cereal.png", category: "Breakfast" },
  { title: "فطائر", expression: "أريد فطائر", imageUrl: "/public/breakfast/pancakes.png", category: "Breakfast" },
  { title: "فواكه", expression: "أريد فواكه", imageUrl: "/public/breakfast/fruits.png", category: "Breakfast" },
  { title: "قهوة", expression: "أريد قهوة", imageUrl: "/public/breakfast/coffee.png", category: "Breakfast" },
  { title: "شاي", expression: "أريد شاياً", imageUrl: "/public/breakfast/tea.png", category: "Breakfast" },
  { title: "فول", expression: "أريد فولاً", imageUrl: "/public/breakfast/beans.png", category: "Breakfast" },
  { title: "طماطم", expression: "أريد طماطم", imageUrl: "/public/breakfast/tomato.png", category: "Breakfast" },
  { title: "فتيرة", expression: "أريد فتيرة", imageUrl: "/public/breakfast/fetera.png", category: "Breakfast" },
  { title: "زبادي", expression: "أريد زبادي", imageUrl: "/public/breakfast/yogurt.png", category: "Breakfast" },
  { title: "عسل", expression: "أريد عسلاً", imageUrl: "/public/breakfast/honey.png", category: "Breakfast" },
  { title: "طعمية", expression: "أريد طعمية", imageUrl: "/public/breakfast/taameya.png", category: "Breakfast" }
];

export const lunchSubIcons = [
  { title: "أرز", expression: "أريد أرزاً", imageUrl: "/public/lunch/rice.png", category: "Lunch" },
  { title: "مكرونة", expression: "أريد مكرونة", imageUrl: "/public/lunch/pasta.png", category: "Lunch" },
  { title: "دجاج", expression: "أريد دجاجاً", imageUrl: "/public/lunch/chicken.png", category: "Lunch" },
  { title: "لحم", expression: "أريد لحماً", imageUrl: "/public/lunch/meat.png", category: "Lunch" },
  { title: "سمك", expression: "أريد سمكاً", imageUrl: "/public/lunch/fish.png", category: "Lunch" },
  { title: "سلطة", expression: "أريد سلطة", imageUrl: "/public/lunch/salad.png", category: "Lunch" },
  { title: "شوربة", expression: "أريد شوربة", imageUrl: "/public/lunch/soup.png", category: "Lunch" },
  { title: "خبز", expression: "أريد خبزاً", imageUrl: "/public/lunch/bread.png", category: "Lunch" },
  { title: "عصير", expression: "أريد عصيراً", imageUrl: "/public/lunch/juice.png", category: "Lunch" },
  { title: "تحلية", expression: "أريد تحلية", imageUrl: "/public/lunch/dessert.png", category: "Lunch" }
];

export const dinnerSubIcons = [
  { title: "أرز", expression: "أريد أرزاً", imageUrl: "/public/dinner/rice.png", category: "Dinner" },
  { title: "مكرونة", expression: "أريد مكرونة", imageUrl: "/public/dinner/pasta.png", category: "Dinner" },
  { title: "دجاج", expression: "أريد دجاجاً", imageUrl: "/public/dinner/chicken.png", category: "Dinner" },
  { title: "لحم", expression: "أريد لحماً", imageUrl: "/public/dinner/meat.png", category: "Dinner" },
  { title: "سمك", expression: "أريد سمكاً", imageUrl: "/public/dinner/fish.png", category: "Dinner" },
  { title: "سلطة", expression: "أريد سلطة", imageUrl: "/public/dinner/salad.png", category: "Dinner" },
  { title: "شوربة", expression: "أريد شوربة", imageUrl: "/public/dinner/soup.png", category: "Dinner" },
  { title: "خبز", expression: "أريد خبزاً", imageUrl: "/public/dinner/bread.png", category: "Dinner" },
  { title: "عصير", expression: "أريد عصيراً", imageUrl: "/public/dinner/juice.png", category: "Dinner" },
  { title: "تحلية", expression: "أريد تحلية", imageUrl: "/public/dinner/dessert.png", category: "Dinner" }
];

export const snackSubIcons = [
  { title: "رقائق", expression: "أريد رقائق", imageUrl: "/public/snack/chips.png", category: "Snack" },
  { title: "كوكيز", expression: "أريد كوكيز", imageUrl: "/public/snack/cookies.png", category: "Snack" },
  { title: "شوكولاتة", expression: "أريد شوكولاتة", imageUrl: "/public/snack/chocolate.png", category: "Snack" },
  { title: "فواكه", expression: "أريد فواكه", imageUrl: "/public/snack/fruits.png", category: "Snack" },
  { title: "مكسرات", expression: "أريد مكسرات", imageUrl: "/public/snack/nuts.png", category: "Snack" },
  { title: "زبادي", expression: "أريد زبادي", imageUrl: "/public/snack/yogurt.png", category: "Snack" },
  { title: "ساندوتش", expression: "أريد ساندوتش", imageUrl: "/public/snack/sandwich.png", category: "Snack" },
  { title: "عصير", expression: "أريد عصيراً", imageUrl: "/public/snack/juice.png", category: "Snack" },
  { title: "شاي", expression: "أريد شاياً", imageUrl: "/public/snack/tea.png", category: "Snack" },
  { title: "قهوة", expression: "أريد قهوة", imageUrl: "/public/snack/coffee.png", category: "Snack" }
];

export const tvSubIcons = [
  { title: "أخبار", expression: "أريد مشاهدة الأخبار", imageUrl: "/public/TV/news.png", category: "TV" },
  { title: "مسلسلات", expression: "أريد مشاهدة مسلسلات", imageUrl: "/public/TV/series.png", category: "TV" },
  { title: "أفلام", expression: "أريد مشاهدة فيلم", imageUrl: "/public/TV/movie.png", category: "TV" },
  { title: "رسوم متحركة", expression: "أريد مشاهدة رسوم متحركة", imageUrl: "/public/TV/cartoon.png", category: "TV" },
  { title: "وثائقي", expression: "أريد مشاهدة وثائقي", imageUrl: "/public/TV/documentary.png", category: "TV" },
  { title: "رياضة", expression: "أريد مشاهدة الرياضة", imageUrl: "/public/TV/sports.png", category: "TV" },
  { title: "موسيقى", expression: "أريد مشاهدة موسيقى", imageUrl: "/public/TV/music.png", category: "TV" },
  { title: "أطفال", expression: "أريد مشاهدة قناة أطفال", imageUrl: "/public/TV/kids.png", category: "TV" },
  { title: "كوميديا", expression: "أريد مشاهدة كوميديا", imageUrl: "/public/TV/comedy.png", category: "TV" },
  { title: "دراما", expression: "أريد مشاهدة دراما", imageUrl: "/public/TV/drama.png", category: "TV" }
];

export const playSubIcons = [
  { title: "كرة قدم", expression: "أريد لعب كرة القدم", imageUrl: "/public/Play/football.png", category: "Play" },
  { title: "كرة سلة", expression: "أريد لعب كرة السلة", imageUrl: "/public/Play/basketball.png", category: "Play" },
  { title: "تنس", expression: "أريد لعب التنس", imageUrl: "/public/Play/tennis.png", category: "Play" },
  { title: "شطرنج", expression: "أريد لعب الشطرنج", imageUrl: "/public/Play/chess.png", category: "Play" },
  { title: "ألعاب فيديو", expression: "أريد لعب ألعاب فيديو", imageUrl: "/public/Play/video-games.png", category: "Play" },
  { title: "ألعاب لوحية", expression: "أريد لعب ألعاب لوحية", imageUrl: "/public/Play/board-games.png", category: "Play" },
  { title: "سباحة", expression: "أريد السباحة", imageUrl: "/public/Play/swimming.png", category: "Play" },
  { title: "جري", expression: "أريد الجري", imageUrl: "/public/Play/running.png", category: "Play" },
  { title: "ركوب الدراجات", expression: "أريد ركوب الدراجة", imageUrl: "/public/Play/cycling.png", category: "Play" },
  { title: "صالة رياضية", expression: "أريد الذهاب للصالة الرياضية", imageUrl: "/public/Play/gym.png", category: "Play" }
];

export const musicSubIcons = [
  { title: "غيتار", expression: "أريد العزف على الغيتار", imageUrl: "/public/Music/guitar.png", category: "Music" },
  { title: "بيانو", expression: "أريد العزف على البيانو", imageUrl: "/public/Music/piano.png", category: "Music" },
  { title: "طبول", expression: "أريد العزف على الطبول", imageUrl: "/public/Music/drums.png", category: "Music" },
  { title: "كمان", expression: "أريد العزف على الكمان", imageUrl: "/public/Music/violin.png", category: "Music" },
  { title: "ساكسفون", expression: "أريد العزف على الساكسفون", imageUrl: "/public/Music/saxophone.png", category: "Music" },
  { title: "ميكروفون", expression: "أريد ميكروفوناً", imageUrl: "/public/Music/microphone.png", category: "Music" },
  { title: "سماعات", expression: "أريد سماعات", imageUrl: "/public/Music/headphones.png", category: "Music" },
  { title: "مكبر صوت", expression: "أريد مكبر صوت", imageUrl: "/public/Music/speaker.png", category: "Music" },
  { title: "دي جي", expression: "أريد دي جي", imageUrl: "/public/Music/dj.png", category: "Music" },
  { title: "نوتات موسيقية", expression: "أريد نوتات موسيقية", imageUrl: "/public/Music/music-notes.png", category: "Music" }
];

export const questionsSubIcons = [
  { title: "متى", expression: "متى يحدث هذا؟", imageUrl: "/public/Questions/date.png", audioUrl: "/public/recordss/When.m4a", category: "Questions" },
  { title: "أين", expression: "أين هذا المكان؟", imageUrl: "/public/Questions/where.png", audioUrl: "/public/recordss/Where.m4a", category: "Questions" },
  { title: "من", expression: "من هذا الشخص؟", imageUrl: "/public/Questions/who.png", audioUrl: "/public/recordss/Who.m4a", category: "Questions" },
  { title: "أي واحد", expression: "أي واحد تختار؟", imageUrl: "/public/Questions/whichone.png", audioUrl: "/public/recordss/Which.m4a", category: "Questions" },
  { title: "كم", expression: "كم العدد؟", imageUrl: "/public/Questions/money.png", audioUrl: "/public/recordss/Kam.m4a", category: "Questions" },
  { title: "علامة استفهام", expression: "لدي سؤال", imageUrl: "/public/Questions/?.png", category: "Questions" },
  { title: "وقت", expression: "ما الوقت الآن؟", imageUrl: "/public/Questions/time.png", audioUrl: "/public/recordss/Whattime.m4a", category: "Questions" }
];

export const relationsSubIcons = [
  { title: "أعلى", expression: "إنه فوق", imageUrl: "/public/Relations/up.png", category: "Relations" },
  { title: "أسفل", expression: "إنه تحت", imageUrl: "/public/Relations/down.png", category: "Relations" },
  { title: "يمين", expression: "إنه على اليمين", imageUrl: "/public/Relations/right.png", category: "Relations" },
  { title: "يسار", expression: "إنه على اليسار", imageUrl: "/public/Relations/left.png", category: "Relations" },
  { title: "داخل", expression: "إنه بالداخل", imageUrl: "/public/Relations/inside.png", category: "Relations" },
  { title: "خارج", expression: "إنه بالخارج", imageUrl: "/public/Relations/outside.png", category: "Relations" },
  { title: "منتصف", expression: "إنه في المنتصف", imageUrl: "/public/Relations/middle.png", category: "Relations" },
  { title: "جنب", expression: "إنه بجانب شيء", imageUrl: "/public/Relations/ganb.png", category: "Relations" },
  { title: "حول", expression: "إنه حول المكان", imageUrl: "/public/Relations/around.png", category: "Relations" },
  { title: "أداة", expression: "إنه أداة", imageUrl: "/public/Relations/alatol.png", category: "Relations" }
];

export const timesSubIcons = [
  { title: "شروق الشمس", expression: "الوقت الآن وقت شروق الشمس", imageUrl: "/public/Times/1.png", audioUrl: "/public/recordss/Sunrise.m4a", category: "Times" },
  { title: "وقت الفجر", expression: "الوقت الآن وقت الفجر", imageUrl: "/public/Times/2.png", audioUrl: "/public/recordss/Fagr.m4a", category: "Times" },
  { title: "ظهراً", expression: "الوقت الآن ظهراً", imageUrl: "/public/Times/3.png", audioUrl: "/public/recordss/Dohr.m4a", category: "Times" },
  { title: "الساعة 4", expression: "الوقت الآن الساعة 4", imageUrl: "/public/Times/4.png", category: "Times" },
  { title: "الساعة 5", expression: "الوقت الآن الساعة 5", imageUrl: "/public/Times/5.png", category: "Times" },
  { title: "الساعة 6", expression: "الوقت الآن الساعة 6", imageUrl: "/public/Times/6.png", category: "Times" }
];

export const toolsSubIcons = [
  { title: "معلقة", expression: "أحتاج إلى معلقة", imageUrl: "/public/Tools/1.png", audioUrl: "/public/recordss/Spoon.m4a", category: "Tools" },
  { title: "لعبة", expression: "أحتاج لعبة", imageUrl: "/public/Tools/2.png", audioUrl: "/public/recordss/Le3ba.m4a", category: "Tools" },
  { title: "كرة", expression: "أحتاج كرة", imageUrl: "/public/Tools/3.png", audioUrl: "/public/recordss/Ball.m4a", category: "Tools" },
  { title: "شنطة", expression: "أحتاج شنطة", imageUrl: "/public/Tools/4.png", audioUrl: "/public/recordss/Bag.m4a", category: "Tools" },
  { title: "نظارة", expression: "أحتاج نظارة", imageUrl: "/public/Tools/5.png", audioUrl: "/public/recordss/Glasses.m4a", category: "Tools" },
  { title: "ساعة", expression: "أحتاج ساعة", imageUrl: "/public/Tools/6.png", audioUrl: "/public/recordss/Clock.m4a", category: "Tools" },
  { title: "كمبيوتر", expression: "أحتاج كمبيوتر", imageUrl: "/public/Tools/7.png", audioUrl: "/public/recordss/Computer.m4a", category: "Tools" },
  { title: "لابتوب", expression: "أحتاج لابتوب", imageUrl: "/public/Tools/8.png", audioUrl: "/public/recordss/Computer.m4a", category: "Tools" },
  { title: "سكين", expression: "أحتاج سكين", imageUrl: "/public/Tools/9.png", audioUrl: "/public/recordss/Knife.m4a", category: "Tools" },
  { title: "مقص", expression: "أحتاج مقص", imageUrl: "/public/Tools/10.png", audioUrl: "/public/recordss/Ma2as.m4a", category: "Tools" },
  { title: "قلم جاف", expression: "أحتاج قلم جاف", imageUrl: "/public/Tools/11.png", audioUrl: "/public/recordss/Pen.m4a", category: "Tools" },
  { title: "كتاب", expression: "أحتاج كتاب", imageUrl: "/public/Tools/12.png", audioUrl: "/public/recordss/Book.m4a", category: "Tools" },
  { title: "طبق", expression: "أحتاج طبق", imageUrl: "/public/Tools/13.png", audioUrl: "/public/recordss/Dish.m4a", category: "Tools" },
  { title: "كرسي", expression: "أحتاج كرسي", imageUrl: "/public/Tools/14.png", audioUrl: "/public/recordss/Chair.m4a", category: "Tools" },
  { title: "طاولة", expression: "أحتاج طاولة", imageUrl: "/public/Tools/15.png", audioUrl: "/public/recordss/Table.m4a", category: "Tools" },
  { title: "فنجان", expression: "أحتاج فنجان", imageUrl: "/public/Tools/16.png", audioUrl: "/public/recordss/Cup.m4a", category: "Tools" }
];

export const verbsSubIcons = [
  { title: "يحضر", expression: "أريد أن أحضر شيئًا", imageUrl: "/public/Verbs/1.png", audioUrl: "/public/recordss/Prepare.m4a", category: "Verbs" },
  { title: "يلبس", expression: "أريد أن ألبس شيئًا", imageUrl: "/public/Verbs/2.png", audioUrl: "/public/recordss/Wear.m4a", category: "Verbs" },
  { title: "ينام", expression: "أريد أن أنام", imageUrl: "/public/Verbs/3.png", audioUrl: "/public/recordss/Sleep.m4a", category: "Verbs" },
  { title: "يفكر", expression: "أريد أن أفكر", imageUrl: "/public/Verbs/4.png", audioUrl: "/public/recordss/Think.m4a", category: "Verbs" },
  { title: "يقرأ", expression: "أريد أن أقرأ", imageUrl: "/public/Verbs/5.png", audioUrl: "/public/recordss/Read.m4a", category: "Verbs" },
  { title: "يكتب", expression: "أريد أن أكتب", imageUrl: "/public/Verbs/6.png", audioUrl: "/public/recordss/Write.m4a", category: "Verbs" },
  { title: "يجري", expression: "أريد أن أجري", imageUrl: "/public/Verbs/7.png", audioUrl: "/public/recordss/Run.m4a", category: "Verbs" },
  { title: "يمشي بسرعة", expression: "أريد المشي بسرعة", imageUrl: "/public/Verbs/8.png", audioUrl: "/public/recordss/Walkspeed.m4a", category: "Verbs" },
  { title: "يغسل أسنانه", expression: "أريد أن أغسل أسناني", imageUrl: "/public/Verbs/10.png", audioUrl: "/public/recordss/Teeth.m4a", category: "Verbs" },
  { title: "صارح", expression: "أريد أن أصارح", imageUrl: "/public/Verbs/11.png", audioUrl: "/public/recordss/Shout.m4a", category: "Verbs" }
];

export const memoriesSubIcons = [
  { title: "سنة 2018 – زيارة الحديقة", expression: "في سنة 2018 ذهبت إلى الحديقة", imageUrl: "/public/memories/park_2018.png", audioUrl: "/public/recordss/Parkk.m4a", category: "Reminder Mee" },
  { title: "سنة 2018 – عيد ميلاد", expression: "في سنة 2018 احتفلت بعيد ميلادي", imageUrl: "/public/memories/birthday_2018.png", audioUrl: "/public/recordss/Birthday.m4a", category: "Reminder Mee" },
  { title: "سنة 2018 – رحلة مدرسية", expression: "في سنة 2018 ذهبت في رحلة مدرسية", imageUrl: "/public/memories/school_trip_2018.png", audioUrl: "/public/recordss/Trip.m4a", category: "Reminder Mee" },
  { title: "سنة 2019 – زيارة المزرعة", expression: "في سنة 2019 زرت المزرعة", imageUrl: "/public/memories/farm_2019.png", audioUrl: "/public/recordss/Mzra3a.m4a", category: "Reminder Mee" },
  { title: "سنة 2019 – حفلة", expression: "في سنة 2019 حضرت حفلة في المدرسة", imageUrl: "/public/memories/party_2019.png", audioUrl: "/public/recordss/Party.m4a", category: "Reminder Mee" },
  { title: "سنة 2019 – زيارة المكتبة", expression: "في سنة 2019 ذهبت إلى المكتبة", imageUrl: "/public/memories/library_2019.png", audioUrl: "/public/recordss/library_2019.m4a", category: "Reminder Mee" },
  { title: "سنة 2020 – رحلة مدرسية", expression: "في سنة 2020 ذهبت في رحلة مدرسية", imageUrl: "/public/memories/school_trip_2020.png", audioUrl: "/public/recordss/Library.m4a", category: "Reminder Mee" },
  { title: "سنة 2020 – يوم رياضي", expression: "في سنة 2020 حضرت اليوم الرياضي", imageUrl: "/public/memories/sports_day_2020.png", audioUrl: "/public/recordss/Sport.m4a", category: "Reminder Mee" },
  { title: "سنة 2020 – زيارة المتحف", expression: "في سنة 2020 زرت المتحف", imageUrl: "/public/memories/museum_2020.png", audioUrl: "/public/recordss/Museum.m4a", category: "Reminder Mee" },
  { title: "سنة 2020 – حفلة عيد ميلاد", expression: "في سنة 2020 حضرت حفلة عيد ميلاد صديقي", imageUrl: "/public/memories/birthday_2020.png", audioUrl: "/public/recordss/Birthday_friend.m4a", category: "Reminder Mee" },
  { title: "سنة 2021 – زيارة الحديقة", expression: "في سنة 2021 ذهبت إلى الحديقة مع أسرتي", imageUrl: "/public/memories/park_2021.png", audioUrl: "/public/recordss/Parkk-1.m4a", category: "Reminder Mee" },
  { title: "سنة 2021 – زيارة المدرسة", expression: "في سنة 2021 زرت المدرسة", imageUrl: "/public/memories/school_2021.png", audioUrl: "/public/recordss/Schooll.m4a", category: "Reminder Mee" }
];

export const neighboursSubIcons = [
  { title: "شكر علي وفاطمة", expression: "أريد شكر علي وفاطمة من الجيران", imageUrl: "/public/Neighbours/ali_fatma_thank.png", audioUrl: "/public/recordss/Ali_and_fatma.m4a", category: "Neighbours" },
  { title: "جارتنا منى", expression: "أريد التحدث إلى جارتنا منى", imageUrl: "/public/Neighbours/mona.png", audioUrl: "/public/recordss/Mona.m4a", category: "Neighbours" },
  { title: "لعب مع سالم وهند", expression: "أريد اللعب مع سالم وهند من الجيران", imageUrl: "/public/Neighbours/salem_hind_play.png", audioUrl: "/public/recordss/Salem_hend.m4a", category: "Neighbours" },
  { title: "زيارة جاري خالد", expression: "أريد زيارة جاري خالد", imageUrl: "/public/Neighbours/khaled_visit.png", audioUrl: "/public/recordss/Khaled.m4a", category: "Neighbours" },
  { title: "شكر يوسف وليلى", expression: "أريد شكر يوسف وليلى من الجيران", imageUrl: "/public/Neighbours/youssef_lyla_thank.png", audioUrl: "/public/recordss/Yousef_laila.m4a", category: "Neighbours" },
  { title: "لعب مع جارتنا سارة", expression: "أريد اللعب مع جارتنا سارة", imageUrl: "/public/Neighbours/sara_play.png", audioUrl: "/public/recordss/Sara.m4a", category: "Neighbours" },
  { title: "طلب مساعدة من جاري عمرو", expression: "أحتاج مساعدة من جاري عمرو", imageUrl: "/public/Neighbours/amr_help.png", audioUrl: "/public/recordss/Amr.m4a", category: "Neighbours" }
];