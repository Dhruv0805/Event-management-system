/**
 * Seeds the database with an initial Admin account and a few event
 * categories so the app is usable immediately after setup.
 *
 * Run with: npm run seed
 */
require('dotenv').config();
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const Category = require('../models/Category');

const run = async () => {
  await connectDB();

  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'Admin@123';

  const existingAdmin = await Admin.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await Admin.create({ name: 'Office Admin', email: adminEmail, password: adminPassword });
    console.log(`Admin account created -> email: ${adminEmail} | password: ${adminPassword}`);
  } else {
    console.log('Admin account already exists, skipping.');
  }

  const defaultCategories = ['Technical', 'Cultural', 'Sports', 'Workshop', 'Seminar', 'Competition', 'Other'];
  for (const name of defaultCategories) {
    // eslint-disable-next-line no-await-in-loop
    await Category.findOneAndUpdate({ name }, { name }, { upsert: true, new: true });
  }
  console.log('Default categories ensured.');

  console.log('Seeding complete.');
  process.exit(0);
};

run().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
