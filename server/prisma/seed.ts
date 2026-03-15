import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // --- Етап 1: очищення бази ---
  //Видаляємо дані спочатку ті шов кінці і тка до верху, шоб не зламати зв'язок (Foreign Keys)
  // спочатку видаляю залежності таблиці розмір і кольори, потімтовари
  await prisma.productSize.deleteMany();
  await prisma.productColor.deleteMany();
  await prisma.product.deleteMany();
  console.log("Старе видалив, залив нового товару...");

  // ---Етап 2 створення стола ---
  const table = await prisma.product.create({
    data: {
      name: "Стіл 'Rodos light'",
      description: " Стиль та комфорт у кожній деталі ✨/nНаш стіл- трансформер не лише економить простір, а й створює атмосферу справжнього затишку./nЗасервірований, він готовий дивувати гостей своєю функціональністю та сучасним дизайном.🍽️/nСтіл, що підлаштовується під ваш настрій та компанію!💫/nВід романтичної вечері на двох до гучних зустрічей з друзями — цей стіл створений, щоб дарувати комфорт у будь- якій ситуації.🍷 ",
      category: "Столи",

      //створення кольорів, які будуть автоматчно підв'язані до цього стола через productId
      colors: {
        create: [
          // написати сюди цілу  тьому кольорів
          {
            name: "Акація австрійська", imageUrl: "/colors/Akacia avstriyska 0356.jpg"
          },
          {
            name: "Аляска", imageUrl: "/colors/Aliaska 0433.jpg"
          },
          {
            name: "Аліканте світлий", imageUrl: "/colors/Alikante svitliy 0509.jpg"
          },
          {
            name: "Аліканте темний", imageUrl: "/colors/Alikante temniy 0508.jpg"
          },
          {
            name: "Алюміній", imageUrl: "/colors/Alyuminiy 0079.jpg"
          },
          {
            name: "Ансберг сріблястий", imageUrl: "/colors/Ansberg sriblastiy 0404.jpg"
          },
          {
            name: "Антарктік", imageUrl: "/colors/Antracit 0477.jpg"
          },
          {
            name: "Апельсин", imageUrl: "/colors/Apelsin 0242.jpg"
          },
          {
            name: "Артізан", imageUrl: "/colors/Artizan 0525.jpg"
          },
          {
            name: "Аруша венге", imageUrl: "/colors/Arusha venge 0336.jpg"
          },
          {
            name: "Аспен", imageUrl: "/colors/Aspen 0503.jpg"
          },
          {
            name: "Батурін", imageUrl: "/colors/Baturin 0558.jpg"
          },
          {
            name: "Бетоний кмінь", imageUrl: "/colors/Betoniy kaminy 0559.jpg"
          },
          {
            name: "Біла Аляска", imageUrl: "/colors/Bila aliaska 0440.jpg"
          },
          {
            name: "Біле дерево", imageUrl: "/colors/Bile derevo 0449.jpg"
          },
          {
            name: "Бірюзови", imageUrl: "/colors/Biriuzoviy 0075.jpg"
          },
          {
            name: "Блакитний", imageUrl: "/colors/Blakytny 0074.jpg"
          },
          {
            name: "Блекрок", imageUrl: "/colors/Blekrok 0510.jpg"
          },
          {
            name: "Бук баварія світлий", imageUrl: "/colors/Buk bavariya svitlyiy 0038.jpg"
          },
          {
            name: "Черешня", imageUrl: "/colors/Chereshnya 0052.png"
          },
          {
            name: "Червоний", imageUrl: "/colors/Chervoniy 0069.jpg"
          },
          {
            name: "Чигирін", imageUrl: "/colors/Chygyrin 0555.jpg"
          },
          {
            name: "Делно світлий", imageUrl: "/colors/Delano svitliy 0516.jpg"
          },
          {
            name: "Делно темний", imageUrl: "/colors/Delano temniy 0517.jpg"
          },
          {
            name: "Десмонд", imageUrl: "/colors/Desmond 0511.jpg"
          },
          {
            name: "Дракар", imageUrl: "/colors/Drakar 0491.jpg"
          },
          {
            name: "Дуб ансберг світлий", imageUrl: "/colors/Dub ansberg svitliy 0348.jpg"
          },
          {
            name: "Дуб ансберг темний", imageUrl: "/colors/Dub ansberg temniy 0347.jpg"
          },
          {
            name: "Дуб античний", imageUrl: "/colors/Dub antichniy 0319.jpg"
          },
          {
            name: "Дуб аркашан світлий", imageUrl: "/colors/Dub arkanzas svitliy 0367.jpg"
          },
          {
            name: "Дуб атланта", imageUrl: "/colors/Dub atlanta 0027.jpg"
          },
          {
            name: "Дуб белвер", imageUrl: "/colors/Dub belver 0512.jpg"
          },
          {
            name: "Дуб Кембрідж", imageUrl: "/colors/Dub Kembridj 0279.jpg"
          },
          {
            name: "Дуб клондайк", imageUrl: "/colors/Dub klondayk 0426.jpg"
          },
          {
            name: "Дуб корабельни", imageUrl: "/colors/Dub korabelniy 0349.jpg"
          },
          {
            name: "Дуб ліванський", imageUrl: "/colors/Dub livanski 0355.jpg"
          },
          {
            name: "Дуб молочний", imageUrl: "/colors/Dub molochniy 0029.jpg"
          },
          {
            name: "Дуб морас", imageUrl: "/colors/Dub moras 0484.jpg"
          },
          {
            name: "Дуб платиновий", imageUrl: "/colors/Dub platinoviy 0154.jpg"
          },
          {
            name: "Дуб родос світлий", imageUrl: "/colors/Dub rodos svitliy 0020.jpg"
          },
          {
            name: "Дуб родос темний", imageUrl: "/colors/Dub rodos temniy 0019.jpg"
          },
          {
            name: "Дуб шамоні світлий", imageUrl: "/colors/Dub shamoni svitliy 0239.jpg"
          },
          {
            name: "Дуб шервуд", imageUrl: "/colors/Dub shervud 0424.jpg"
          },
          {
            name: "Дуб скельний", imageUrl: "/colors/Dub skelniy 0353.jpg"
          },
          {
            name: "Дуб сонома", imageUrl: "/colors/Dub sonoma 0331.jpg"
          },
          {
            name: "Дуб сонома темний", imageUrl: "/colors/Dub sonoma temniy 0362.jpg"
          },
          {
            name: "Дуб сонома труфель", imageUrl: "/colors/Dub sonoma tryifel 0423.jpg"
          },
          {
            name: "Дуб тахо", imageUrl: "/colors/Dub taho 0474.jpg"
          },
          {
            name: "Дуб таверна", imageUrl: "/colors/Dub taverna 0442.jpg"
          },
          {
            name: "Дуб усурійський", imageUrl: "/colors/Dub usuriyskiy 0377.jpg"
          },
          {
            name: "Дуб венге", imageUrl: "/colors/Dub venge 0028.jpg"
          },
          {
            name: "Дуб венге магія", imageUrl: "/colors/Dub venge magiya 0282.jpg"
          },
          {
            name: "Дуб ясний", imageUrl: "/colors/Dub yasniy 0022.jpg"
          },
          {
            name: "Дуб золотий", imageUrl: "/colors/Dub zolotiy 0475.jpg"
          },
          {
            name: "Дубарканзас темний", imageUrl: "/colors/Dubarkanzas temniy 0368.jpg"
          },
          {
            name: "Фаєрвуд", imageUrl: "/colors/Fayervud 0490.jpg"
          },
          {
            name: "Гасієнда білий", imageUrl: "/colors/Gasienda bilyi 0394.jpg"
          },
          {
            name: "Глясе", imageUrl: "/colors/Glyase 0471.jpg"
          },
          {
            name: "Горіх артемда", imageUrl: "/colors/Gorih artemida 0235.jpg"
          },
          {
            name: "Горіх Болонія темний", imageUrl: "/colors/Gorih Bolonya temniy 0003.jpg"
          },
          {
            name: "Горіх екко", imageUrl: "/colors/Gorih ecco 0006.jpg"
          },
          {
            name: "Горіх італійський", imageUrl: "/colors/Gorih italiyski 0002.jpg"
          },
          {
            name: "Горіх каліфорнійський", imageUrl: "/colors/Gorih kaliforniyski 0236.jpg"
          },
          {
            name: "Горіх класік", imageUrl: "/colors/Gorih klasik 0001.jpg"
          },
          {
            name: "Горіх лісовий", imageUrl: "/colors/Gorih lisovyi 0008.jpg"
          },
          {
            name: "Горіх верона", imageUrl: "/colors/Gorih verona 0443.jpg"
          },
          {
            name: "Готленд", imageUrl: "/colors/Gotland 0515.jpg"
          },
          {
            name: "Графіт", imageUrl: "/colors/Grafit 0321.jpg"
          },
          {
            name: "Херсонес", imageUrl: "/colors/Hersones 0560.jpg"
          },
          {
            name: "Холодний сірий", imageUrl: "/colors/Holodniy siriy 0536.jpg"
          },
          {
            name: "Хортиця", imageUrl: "/colors/Hortica 0559.jpg"
          },
          {
            name: "Хотин", imageUrl: "/colors/Hotyn 0557.jpg"
          },
          {
            name: "Індастріал", imageUrl: "/colors/Industrial 0489.jpg"
          },
          {
            name: "Індіго", imageUrl: "/colors/Indigo 0420.jpg"
          },
          {
            name: "Іржавий камінь", imageUrl: "/colors/Irzhaviy kamin 0524.jpg"
          },
          {
            name: "Кам'янець", imageUrl: "/colors/Kamiyanets 0528.jpg"
          },
          {
            name: "Кантрі", imageUrl: "/colors/Kantri 0429.jpg"
          },
          {
            name: "Кантрі браун", imageUrl: "/colors/Kantri braun 0485.jpg"
          },
          {
            name: "Кашемір", imageUrl: "/colors/Keshemir 0535.jpg"
          },
          {
            name: "Коломбо", imageUrl: "/colors/Kolombo 0518.jpg"
          },
          {
            name: "Корабельний лейбл", imageUrl: "/colors/Korabelniy leybl 0445.jpg"
          },
          {
            name: "Корал супрім", imageUrl: "/colors/Koral suprim 0540.jpg"
          },
          {
            name: "Кремовий", imageUrl: "/colors/Kremovy 0081.jpg"
          },
          {
            name: "Латте", imageUrl: "/colors/Latte 0437.jpg"
          },
          {
            name: "Лаванда", imageUrl: "/colors/Lavanda 0084.jpg"
          },
          {
            name: "Любарт", imageUrl: "/colors/Lubart 0561.jpg"
          },
          {
            name: "Мадагаскар", imageUrl: "/colors/Madagaskar 0369.jpg"
          },
          {
            name: "Мангове дерево", imageUrl: "/colors/Mangove derevo 0469.jpg"
          },
          {
            name: "Матера білий", imageUrl: "/colors/Matera bily 0552.jpg"
          },
          {
            name: "Матера чорний", imageUrl: "/colors/Matera chorniy 0554.jpg"
          },
          {
            name: "Матера сірий", imageUrl: "/colors/Matera siry 0553.jpg"
          },
          {
            name: "Мольфар", imageUrl: "/colors/Molfar 0519.jpg"
          },
          {
            name: "Моноліт", imageUrl: "/colors/Monolit 0434.jpg"
          },
          {
            name: "Нордік пейн", imageUrl: "/colors/Nordik payn 0493.jpg"
          },
          {
            name: "Нордленд", imageUrl: "/colors/Nordlend 0436.jpg"
          },
          {
            name: "Норфолк", imageUrl: "/colors/Norfolk 0513.jpg"
          },
          {
            name: "Оксид", imageUrl: "/colors/Oksid 0483.jpg"
          },
          {
            name: "Патагонія", imageUrl: "/colors/Patagonia 0520.jpg"
          },
          {
            name: "Портер", imageUrl: "/colors/Porter 0506.jpg"
          },
          {
            name: "Ріголето світлий", imageUrl: "/colors/Rigoleto svitliy 0431.jpg"
          },
          {
            name: "Ріголето темний", imageUrl: "/colors/Rigoleto temniy 0432.jpg"
          },
          {
            name: "Сакура", imageUrl: "/colors/Sacura 0086.jpg"
          },
          {
            name: "Севілей", imageUrl: "/colors/Sevilay 0514.jpg"
          },
          {
            name: "Шовковий камінь", imageUrl: "/colors/Shovkoviy kamin 0558.jpg"
          },
          {
            name: "Симфонія", imageUrl: "/colors/Simfonia 0438.jpg"
          },
          {
            name: "Сірий графіт", imageUrl: "/colors/Siriy grafit 0538.jpg"
          },
          {
            name: "Сірий", imageUrl: "/colors/Siryi 0077.jpg"
          },
          {
            name: "Слонова кістка", imageUrl: "/colors/Slonova kistka 0533.jpg"
          },
          {
            name: "Сосна Хельга", imageUrl: "/colors/Sosna helga 0479.jpg"
          },
          {
            name: "Тасманія", imageUrl: "/colors/Tasmania 0492.jpg"
          },
          {
            name: "Титан", imageUrl: "/colors/Titan 0080.jpg"
          },
          {
            name: "Тунія локарно темна", imageUrl: "/colors/Tunia lokarno temna 0041.jpg"
          },
          {
            name: "Урбан лайт", imageUrl: "/colors/Urban layt 0428.jpg"
          },
          {
            name: "Ваніль", imageUrl: "/colors/Vanilya 0243.jpg"
          },
          {
            name: "Венге", imageUrl: "/colors/Venge 2227 0325.jpg"
          },
          {
            name: "Венге світлий", imageUrl: "/colors/Venge svitlyi 0289.jpg"
          },
          {
            name: "Вествуд", imageUrl: "/colors/Vestvud 0476.jpg"
          },
          {
            name: "Вільха гірська темна", imageUrl: "/colors/Vilha girska temna 0032.jpg"
          },
          {
            name: "Вільний синій", imageUrl: "/colors/Vilny siniy 0073.jpg"
          },
          {
            name: "Вишневий оксворт", imageUrl: "/colors/Vishnay oksvord 0045.jpg"
          },
          {
            name: "Вудлін кремовий", imageUrl: "/colors/Vudlyn kremovyi 0384.jpg"
          },
          {
            name: "Вугільний камінь", imageUrl: "/colors/Vugilny kamin.jpg"
          },
          {
            name: "Ясен", imageUrl: "/colors/Yasen 0252.jpg"
          },
          {
            name: "Ясен королівський світлий", imageUrl: "/colors/Yasen korolivskiy svitliy 0378.jpg"
          },
          {
            name: "Ясен Ніагара білий", imageUrl: "/colors/Yasen niagara biliy 0351.jpg"
          },
          {
            name: "Ясен Ніагара натуральний", imageUrl: "/colors/Yasen niagara naturalniy 0350.jpg"
          },
          {
            name: "Ясен Шімо темний", imageUrl: "/colors/Yasen shimo temniy 0448.jpg"
          },
          {
            name: "Ясен Сніжний", imageUrl: "/colors/Yasen Snijniy 0364.jpg"
          },
          {
            name: "Явір", imageUrl: "/colors/Yavir 0233.jpg"
          },
          {
            name: "Юкон", imageUrl: "/colors/Yukon 0523.jpg"
          },
          {
            name: "Закізний камінь", imageUrl: "/colors/Zakizniy kamin.jpg"
          },
          {
            name: "Зелена вода", imageUrl: "/colors/Zelenavoda 0082.jpg"
          },
          {
            name: "Зелений", imageUrl: "/colors/Zeleniy  0071.jpg"
          },
          {
            name: "Жовтий", imageUrl: "/colors/Zhovtyi 0070.jpg"
          },
        ]
      },
      // Добавити розміри тут:
      sizes: {
        create: [
        // від 700 на 2000 до 1100 на 2000
          { name: "700x2000", price: 10900, comment: "8-10 осіб" }, // Ціни вказати нормальні, це приклад
          { name: "800x2000", price: 11100, comment: "8-10 осіб" },
          { name: "900x2000", price: 11300, comment: "8-10 осіб" },
          { name: "1000x2000", price: 11500, comment: "8-10 осіб" },
          { name: "1100x2000", price: 12300, comment: "8-10 осіб" },
        // від 700 на 2400 до 1100 на 2400
          { name: "700x2400", price: 11200, comment: "10-12 осіб" },
          { name: "800x2400", price: 11400, comment: "10-12 осіб" },
          { name: "900x2400", price: 11600, comment: "10-12 осіб" },
          { name: "1000x2400", price: 11800, comment: "10-12 осіб" },
          { name: "1100x2400", price: 12600, comment: "10-12 осіб" },
        // від 700 на 2800 до 1100 на 2800
          { name: "700x2800", price: 11500, comment: "12-14 осіб" },
          { name: "800x2800", price: 11700, comment: "12-14 осіб" },
          { name: "900x2800", price: 11900, comment: "12-14 осіб" },
          { name: "1000x2800", price: 12100, comment: "12-14 осіб" },
          { name: "1100x2800", price: 12900, comment: "12-14 осіб" },
        // від 700 на 3200 до 1100 на 3200
          { name: "700x3200", price: 12300, comment: "14-16 осіб" },
          { name: "800x3200", price: 12500, comment: "14-16 осіб" },
          { name: "900x3200", price: 12700, comment: "14-16 осіб" },
          { name: "1000x3200", price: 12900, comment: "14-16 осіб" },
          { name: "1100x3200", price: 13200, comment: "14-16 осіб" },
        // від 800 на 3600 до 1100 на 3600
          { name: "800x3600", price: 13600, comment: "16-18 осіб" },
          { name: "900x3600", price: 13900, comment: "16-18 осіб" },
          { name: "1000x3600", price: 14200, comment: "16-18 осіб" },
          { name: "1100x3600", price: 14800, comment: "16-18 осіб" },
        // від 800 на 4000 до 1100 на 4000
          { name: "800x4000", price: 14500, comment: "18-20 осіб" },
          { name: "900x4000", price: 15000, comment: "18-20 осіб" },
          { name: "1000x4000", price: 15500, comment: "18-20 осіб" },
          { name: "1100x4000", price: 16500, comment: "18-20 осіб" },
          // Додай сюда всі розміри і виправити ці, це приклад
        ]
      }
    }
  })
  const pufik = await prisma.product.create({
  data: {
    name: "Пуф-трансформер 5в1",
    description: "Унікальний пуф, який перетворюється на 5 повноцінних стільців! 🛋️\n Міцний металевий каркас та зносостійка тканина.",
    category: "Пуфи",
    
    // Додаємо і кольори каркаса, і варіанти тканини в один масив colors
    colors: {
      create: [
        // Тканини
        { name: "Тканина: Стандарт" , imageUrl: "/fabrics/standard.jpg" },
        { name: "Тканина: Преміум", imageUrl: "/fabrics/emerald-rogozhka.jpg" },
        
        // Кольори каркаса (металу/основи)
        { name: "Каркас: Чорний матовий", imageUrl: "/colors/black-metal.jpg" },
      ]
    },
    sizes: {
      create: [
        { name: "Стандарт", price: 3290 },
        { name: "Преміум", price: 3790 }
      ]
    }
  }
});
  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });