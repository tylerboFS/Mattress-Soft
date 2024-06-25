const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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

  await prisma.mattress.create({
    data: {
      name: "Essential T&N Original",
      size: "Queen",
      firmness: "medium-firm",
      type: "Foam",
      price: 516.00,
      brand_id: tuftAndNeedle.id
    },
  });

  await prisma.mattress.create({
    data: {
      name: "Another T & N",
      size: "Queen",
      firmness: "medium-firm",
      type: "Foam",
      price: 516.00,
      brand_id: tuftAndNeedle.id
    },
  });

  await prisma.mattress.create({
    data: {
      name: "TEMPUR-Cloud",
      size: "Twin",
      firmness: "Firm",
      type: "Memory Foam",
      price: 1189.30,
      brand_id: tempurpedic.id
    },
  });

  //CREATE USERS
  console.log("Creating Users");

  await prisma.user.create({
    data:{
       username: "tyler",
       password: "password",  //not secure, needs to be encypted
       firstName: "Tyler", 
       lastName: "Wright"
    }
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
