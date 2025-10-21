import { PrismaClient } from '@prisma/client'

export async function seedSports(prisma: PrismaClient) {
  const sports = [
    { 
      id: 1,
      name: 'Soccer', 
      abbr: 'SCR',
      note: 'Association football',
      isActive: true,
      ord: 1
    },
    { 
      id: 2,
      name: 'Basketball', 
      abbr: 'BSK',
      note: 'Indoor basketball',
      isActive: true,
      ord: 2
    },
    { 
      id: 3,
      name: 'American Football', 
      abbr: 'FTB',
      note: 'Gridiron football',
      isActive: true,
      ord: 3
    },
    { 
      id: 4,
      name: 'Hockey', 
      abbr: 'HCK',
      note: 'Ice hockey or field hockey',
      isActive: true,
      ord: 4
    },
    { 
      id: 5,
      name: 'Baseball', 
      abbr: 'BSB',
      note: 'North American baseball',
      isActive: true,
      ord: 5
    }
  ]

  for (const sport of sports) {
    // First, try to find by id
    const existingSport = await prisma.baseSport.findUnique({
      where: { id: sport.id }
    })

    if (existingSport) {
      // If exists, update 
      await prisma.baseSport.update({
        where: { id: sport.id },
        data: sport
      })
    } else {
      // If not exists, create with specified ID
      await prisma.baseSport.create({
        data: sport
      })
    }
  }

  console.log('Sports seeding completed')
}

export default seedSports
