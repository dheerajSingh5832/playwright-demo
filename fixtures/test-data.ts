import * as fs from 'fs';
import * as path from 'path';

export interface UserData {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  expectedError?: string;
}

export interface ProductData {
  name: string;
  category: string;
  price: number;
  quantity: number;
  sku: string;
}

export class TestDataManager {
  private static dataPath = path.join(process.cwd(), 'test-data');

  /**
   * Read JSON file
   */
  static readJson<T>(fileName: string): T {
    const filePath = path.join(this.dataPath, fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent) as T;
  }

  /**
   * Get user data
   */
  static getUser(userType: string): UserData {
    const users = this.readJson<Record<string, UserData>>('users.json');
    return users[userType];
  }

  /**
   * Get product data
   */
  static getProduct(productKey: string): ProductData {
    const products = this.readJson<Record<string, ProductData>>('products.json');
    return products[productKey];
  }

  /**
   * Get all users
   */
  static getAllUsers(): Record<string, UserData> {
    return this.readJson<Record<string, UserData>>('users.json');
  }

  /**
   * Get all products
   */
  static getAllProducts(): Record<string, ProductData> {
    return this.readJson<Record<string, ProductData>>('products.json');
  }
}

// Pre-defined test users
export const TestUsers = {
  validUser: () => TestDataManager.getUser('validUser'),
  invalidUser: () => TestDataManager.getUser('invalidUser'),
  adminUser: () => TestDataManager.getUser('adminUser'),
  lockedUser: () => TestDataManager.getUser('lockedUser'),
};

// Pre-defined test products
export const TestProducts = {
  product1: () => TestDataManager.getProduct('product1'),
  product2: () => TestDataManager.getProduct('product2'),
  product3: () => TestDataManager.getProduct('product3'),
};
