const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function main() {
  console.log("Seeding Database");

  //CREATING BRANDS

  console.log("Creating Brands...");

  const tuftAndNeedle = await prisma.brand.create({
    data: {
      name: "Tuft & Needle",
      logo_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCF4nHAwk4GcpSnP4qPlc4Kz6Kzzcnpwl_pg&s",
    },
  });

  const tempurpedic = await prisma.brand.create({
    data: {
      name: "Tempur-Pedic",
      logo_url:
        "https://www.tempurpedic.com/static/06e31e74/img/tempurpedic-logo.dad6272d4ddb.png",
    },
  });

  //CREATE MATTRESSES
  console.log("Creating Mattresses...");

  const tn_Original_mattress = await prisma.mattress.create({
    data: {
      name: "Essential T&N Original",
      size: "Queen",
      firmness: "medium-firm",
      type: "Foam",
      price: 516.0,
      brand_id: tuftAndNeedle.id,
    },
  });

  const tn_other_mattress = await prisma.mattress.create({
    data: {
      name: "Another T & N",
      size: "Queen",
      firmness: "medium-firm",
      type: "Foam",
      price: 516.0,
      brand_id: tuftAndNeedle.id,
    },
  });

  const tempurCloud = await prisma.mattress.create({
    data: {
      name: "TEMPUR-Cloud",
      size: "Twin",
      firmness: "Firm",
      type: "Memory Foam",
      price: 1189.3,
      brand_id: tempurpedic.id,
    },
  });

  //CREATE USERS
  console.log("Creating Users");

  let tyler = undefined;
  try {
    tyler = await prisma.user.create({
      data: {
        username: "tyler",
        password: await bcrypt.hash("password", saltRounds), 
        firstName: "Tyler",
        lastName: "Wright",
      },
    });
  } catch (err) {
    throw err;
  }

  //CREATE REVIEWS
  console.log("Creating reviews...");
  await prisma.review.create({
    data: {
      title: "Feels Just like a Cloud",
      content: "Wow what a great mattress",
      rating: 5,
      user_id: tyler.id,
      mattress_id: tempurCloud.id,
    },
  });

  await prisma.review.create({
    data: {
      title: "Tuft and Needle dropped the ball",
      content: "This matress sucks. I expected better",
      rating: 2,
      user_id: tyler.id,
      mattress_id: tn_other_mattress.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
