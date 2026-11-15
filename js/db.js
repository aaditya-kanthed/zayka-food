///////////////////////////////////////////////////////////
// ZAYKA IndexedDB Database Manager
// Stores user sign-up data locally in the browser
///////////////////////////////////////////////////////////

const ZaykaDB = {
  DB_NAME: "ZaykaFoodDB",
  DB_VERSION: 1,
  STORE_USERS: "users",
  STORE_ORDERS: "orders",
  db: null,

  // Initialize the database
  init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.DB_VERSION);

      request.onerror = () => {
        console.error("Failed to open ZAYKA database");
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log("✅ ZAYKA Database connected successfully");
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Users table
        if (!db.objectStoreNames.contains(this.STORE_USERS)) {
          const userStore = db.createObjectStore(this.STORE_USERS, {
            keyPath: "id",
            autoIncrement: true,
          });
          userStore.createIndex("email", "email", { unique: true });
          userStore.createIndex("fullName", "fullName", { unique: false });
          userStore.createIndex("createdAt", "createdAt", { unique: false });
        }

        // Orders table
        if (!db.objectStoreNames.contains(this.STORE_ORDERS)) {
          const orderStore = db.createObjectStore(this.STORE_ORDERS, {
            keyPath: "id",
            autoIncrement: true,
          });
          orderStore.createIndex("userId", "userId", { unique: false });
          orderStore.createIndex("plan", "plan", { unique: false });
          orderStore.createIndex("createdAt", "createdAt", { unique: false });
        }

        console.log("📦 ZAYKA Database schema created");
      };
    });
  },

  // Add a new user
  addUser(fullName, email, source) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_USERS], "readwrite");
      const store = transaction.objectStore(this.STORE_USERS);

      const user = {
        fullName: fullName,
        email: email,
        source: source,
        createdAt: new Date().toISOString(),
        plan: null,
        isActive: true,
      };

      const request = store.add(user);

      request.onsuccess = () => {
        user.id = request.result;
        console.log("👤 User added:", user);
        resolve(user);
      };

      request.onerror = () => {
        if (request.error.name === "ConstraintError") {
          reject(new Error("This email is already registered!"));
        } else {
          reject(request.error);
        }
      };
    });
  },

  // Get all users
  getAllUsers() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_USERS], "readonly");
      const store = transaction.objectStore(this.STORE_USERS);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  // Get user by email
  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_USERS], "readonly");
      const store = transaction.objectStore(this.STORE_USERS);
      const index = store.index("email");
      const request = index.get(email);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  // Update user
  updateUser(user) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_USERS], "readwrite");
      const store = transaction.objectStore(this.STORE_USERS);
      const request = store.put(user);

      request.onsuccess = () => resolve(user);
      request.onerror = () => reject(request.error);
    });
  },

  // Delete user by ID
  deleteUser(id) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_USERS], "readwrite");
      const store = transaction.objectStore(this.STORE_USERS);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  },

  // Add order
  addOrder(userId, plan, amount) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(
        [this.STORE_ORDERS],
        "readwrite"
      );
      const store = transaction.objectStore(this.STORE_ORDERS);

      const order = {
        userId: userId,
        plan: plan,
        amount: amount,
        status: "active",
        createdAt: new Date().toISOString(),
      };

      const request = store.add(order);

      request.onsuccess = () => {
        order.id = request.result;
        resolve(order);
      };
      request.onerror = () => reject(request.error);
    });
  },

  // Get all orders
  getAllOrders() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_ORDERS], "readonly");
      const store = transaction.objectStore(this.STORE_ORDERS);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  // Get user count
  getUserCount() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.STORE_USERS], "readonly");
      const store = transaction.objectStore(this.STORE_USERS);
      const request = store.count();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  // Clear all data (for testing)
  clearAll() {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(
        [this.STORE_USERS, this.STORE_ORDERS],
        "readwrite"
      );
      transaction.objectStore(this.STORE_USERS).clear();
      transaction.objectStore(this.STORE_ORDERS).clear();

      transaction.oncomplete = () => {
        console.log("🗑️ All data cleared");
        resolve(true);
      };
      transaction.onerror = () => reject(transaction.error);
    });
  },
};
