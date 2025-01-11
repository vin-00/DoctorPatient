const Patient = require("./models/Patient");
const Doctor = require("./models/Doctor");

const seedData = async () => {
    try {
      // Clear existing data
      await Patient.deleteMany();
      await Doctor.deleteMany();
  
      // Create 10 doctors
      const doctors = [
        { username: "dr_smith", name: "Dr. Smith", password: "password123", specialty: "Cardiology", fees: 500 },
        { username: "dr_jones", name: "Dr. Jones", password: "password123", specialty: "Neurology", fees: 600 },
        { username: "dr_adams", name: "Dr. Adams", password: "password123", specialty: "Orthopedics", fees: 450 },
        { username: "dr_white", name: "Dr. White", password: "password123", specialty: "Pediatrics", fees: 400 },
        { username: "dr_brown", name: "Dr. Brown", password: "password123", specialty: "Dermatology", fees: 550 },
        { username: "dr_williams", name: "Dr. Williams", password: "password123", specialty: "Gynecology", fees: 500 },
        { username: "dr_davis", name: "Dr. Davis", password: "password123", specialty: "Psychiatry", fees: 700 },
        { username: "dr_moore", name: "Dr. Moore", password: "password123", specialty: "Endocrinology", fees: 650 },
        { username: "dr_taylor", name: "Dr. Taylor", password: "password123", specialty: "Oncology", fees: 800 },
        { username: "dr_anderson", name: "Dr. Anderson", password: "password123", specialty: "Gastroenterology", fees: 550 },
      ];
  
      await Doctor.insertMany(doctors);
  
      // Create 5 patients
      const patients = [
        { username: "john_doe", password: "password123", balance: 10000 },
        { username: "jane_doe", password: "password123", balance: 12000 },
        { username: "mark_smith", password: "password123", balance: 15000 },
        { username: "lucy_brown", password: "password123", balance: 8000 },
        { username: "emma_white", password: "password123", balance: 11000 },
      ];
  
      await Patient.insertMany(patients);
  
      console.log("Database seeded successfully!");
      mongoose.connection.close();
    } catch (error) {
      console.error("Error seeding database:", error);
      mongoose.connection.close();
    }
  };
  
seedData();