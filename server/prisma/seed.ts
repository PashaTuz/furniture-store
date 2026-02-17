const { PrismaClient } = require('@prisma/client');

// ЖОДНИХ параметрів у конструкторі. Prisma 7 сама знайде DATABASE_URL 
// у системних змінних, якщо ми їх правильно передамо.
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Спроба №1001: Автоматичне підключення...');
  
  try {
    await prisma.$connect();
    console.log('📡 База відповіла!');

    await prisma.product.deleteMany();
    await prisma.product.create({
      data: {
        name: "Стіл 'Трансформер'",
        description: "Я таки змусив Prisma 7 працювати",
        price: 13400,
        category: "Столи",
        imageUrl: "/products/stil/transformer.jpg",
        stock: 5
      }
    });

    console.log('✅ ПЕРЕМОГА!');
  } catch (error: any) {
    console.error('❌ Помилка:', error.message);
    console.log('Деталі:', error);
  }
}

main().finally(() => prisma.$disconnect());