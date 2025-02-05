// TypeScript Interface
export type TClientForm = {
    name: string;
    address: {
      city: string;
      state: string;
      zip: string;
    };
    phoneNumber: string;
    email: string;
    other: string;
    selectedAnimal: string; // Allows predefined options or custom input
  }